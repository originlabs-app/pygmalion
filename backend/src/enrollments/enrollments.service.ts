import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SessionsService } from '../sessions/sessions.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { Enrollment, Prisma, EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService,
    private sessionsService: SessionsService
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const { user_id, course_id, session_id, ...rest } = createEnrollmentDto;

    // Vérifier que l'utilisateur existe
    const user = await this.prisma.userProfile.findUnique({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier que le cours et la session existent
    const session = await this.prisma.session.findUnique({
      where: { id: session_id },
      include: {
        course: true,
        enrollments: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.course_id !== course_id) {
      throw new BadRequestException('Session does not belong to the specified course');
    }

    // Vérifier que l'utilisateur n'est pas déjà inscrit à cette session
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: {
        user_id,
        session_id,
        status: { in: ['pending', 'approved'] },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this session');
    }

    // Vérifier qu'il reste des places disponibles
    const approvedEnrollments = session.enrollments.filter(e => 
      e.status === 'approved' || e.status === 'pending'
    ).length;

    if (approvedEnrollments >= session.max_seats) {
      throw new BadRequestException('No seats available for this session');
    }

    // Vérifier que la session n'a pas encore commencé
    if (session.start_date <= new Date()) {
      throw new BadRequestException('Cannot enroll in a session that has already started');
    }

    try {
      const enrollment = await this.prisma.enrollment.create({
        data: {
          user_id,
          course_id,
          session_id,
          status: rest.status || 'pending',
          payment_status: rest.payment_status || 'pending',
          assigned_by: rest.assigned_by,
          company_id: rest.company_id,
        },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              category: true,
              provider: {
                select: {
                  id: true,
                  organization_name: true,
                },
              },
            },
          },
          session: {
            select: {
              id: true,
              start_date: true,
              end_date: true,
              location: true,
              price: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      // Mettre à jour le nombre de places disponibles
      await this.sessionsService.updateAvailableSeats(session_id);

      return enrollment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error creating enrollment');
      }
      throw error;
    }
  }

  async findAll(query: EnrollmentQueryDto) {
    const {
      user_id,
      course_id,
      session_id,
      status,
      payment_status,
      company_id,
      enrollment_date_from,
      enrollment_date_to,
      page = 1,
      limit = 20,
      sortBy = 'enrollment_date',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.EnrollmentWhereInput = {};

    if (user_id) {
      where.user_id = user_id;
    }

    if (course_id) {
      where.course_id = course_id;
    }

    if (session_id) {
      where.session_id = session_id;
    }

    if (status) {
      where.status = status;
    }

    if (payment_status) {
      where.payment_status = payment_status;
    }

    if (company_id) {
      where.company_id = company_id;
    }

    if (enrollment_date_from || enrollment_date_to) {
      where.enrollment_date = {};
      if (enrollment_date_from) {
        where.enrollment_date.gte = new Date(enrollment_date_from);
      }
      if (enrollment_date_to) {
        where.enrollment_date.lte = new Date(enrollment_date_to);
      }
    }

    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where,
        include: {
          course: {
            select: {
              id: true,
              title: true,
              category: true,
              provider: {
                select: {
                  id: true,
                  organization_name: true,
                },
              },
            },
          },
          session: {
            select: {
              id: true,
              start_date: true,
              end_date: true,
              location: true,
              price: true,
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          progress: {
            select: {
              module_id: true,
              completed: true,
              completion_date: true,
              time_spent_minutes: true,
              score: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.enrollment.count({ where }),
    ]);

    return {
      data: enrollments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Enrollment> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            provider: true,
          },
        },
        session: true,
        company: true,
        progress: {
          orderBy: { created_at: 'asc' },
        },
        certificate: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return enrollment;
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        session: true,
      },
    });

    if (!existingEnrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Logique de validation des changements de statut
    if (updateEnrollmentDto.status) {
      const currentStatus = existingEnrollment.status;
      const newStatus = updateEnrollmentDto.status;

      // Valider les transitions de statut autorisées
      const allowedTransitions: Record<EnrollmentStatus, EnrollmentStatus[]> = {
        pending: ['approved', 'cancelled'],
        approved: ['completed', 'cancelled', 'failed'],
        completed: ['cancelled'], // Peu commun mais possible pour annulations
        cancelled: ['pending'], // Réinscription possible
        failed: ['pending'], // Nouvelle tentative possible
      };

      if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
        throw new BadRequestException(
          `Cannot change enrollment status from ${currentStatus} to ${newStatus}`
        );
      }

      // Si on approuve l'inscription, vérifier les places disponibles
      if (newStatus === 'approved' && currentStatus !== 'approved') {
        const sessionEnrollments = await this.prisma.enrollment.findMany({
          where: {
            session_id: existingEnrollment.session_id,
            status: { in: ['approved', 'pending'] },
            id: { not: id },
          },
        });

        if (sessionEnrollments.length >= existingEnrollment.session.max_seats) {
          throw new BadRequestException('No seats available for this session');
        }
      }
    }

    try {
      const updateData: any = { ...updateEnrollmentDto };

      if (updateEnrollmentDto.completion_date) {
        updateData.completion_date = new Date(updateEnrollmentDto.completion_date);
      }

      // Si on marque comme terminé, ajouter la date de completion automatiquement
      if (updateEnrollmentDto.status === 'completed' && !updateData.completion_date) {
        updateData.completion_date = new Date();
      }

      updateData.updated_at = new Date();

      const updatedEnrollment = await this.prisma.enrollment.update({
        where: { id },
        data: updateData,
        include: {
          course: {
            include: {
              provider: true,
            },
          },
          session: true,
          company: true,
          progress: true,
        },
      });

      // Mettre à jour le nombre de places disponibles si le statut a changé
      if (updateEnrollmentDto.status) {
        await this.sessionsService.updateAvailableSeats(existingEnrollment.session_id);
      }

      return updatedEnrollment;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error updating enrollment');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        session: true,
        progress: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Vérifier que l'inscription peut être supprimée
    if (enrollment.status === 'completed') {
      throw new BadRequestException('Cannot delete completed enrollment');
    }

    // Si la session a commencé et qu'il y a des progrès, ne pas supprimer
    if (enrollment.session.start_date <= new Date() && enrollment.progress.length > 0) {
      throw new BadRequestException('Cannot delete enrollment with progress after session start');
    }

    await this.prisma.enrollment.delete({
      where: { id },
    });

    // Mettre à jour le nombre de places disponibles
    await this.sessionsService.updateAvailableSeats(enrollment.session_id);
  }

  async findByUser(userId: string, query: Partial<EnrollmentQueryDto> = {}): Promise<Enrollment[]> {
    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.enrollment.findMany({
      where: {
        user_id: userId,
        ...(query.status && { status: query.status }),
        ...(query.course_id && { course_id: query.course_id }),
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            category: true,
            provider: {
              select: {
                id: true,
                organization_name: true,
              },
            },
          },
        },
        session: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
            location: true,
            price: true,
          },
        },
        progress: {
          select: {
            module_id: true,
            completed: true,
            completion_date: true,
            time_spent_minutes: true,
            score: true,
          },
        },
        certificate: {
          select: {
            id: true,
            certificate_number: true,
            issue_date: true,
            expiry_date: true,
            status: true,
          },
        },
      },
      orderBy: { enrollment_date: 'desc' },
    });
  }

  async updateProgress(
    enrollmentId: string,
    moduleId: string,
    progressData: {
      completed: boolean;
      timeSpentMinutes?: number;
      score?: number;
    }
  ) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    return this.prisma.enrollmentProgress.upsert({
      where: {
        enrollment_id_module_id: {
          enrollment_id: enrollmentId,
          module_id: moduleId,
        },
      },
      update: {
        completed: progressData.completed,
        completion_date: progressData.completed ? new Date() : null,
        time_spent_minutes: progressData.timeSpentMinutes || 0,
        score: progressData.score,
        updated_at: new Date(),
      },
      create: {
        enrollment_id: enrollmentId,
        module_id: moduleId,
        completed: progressData.completed,
        completion_date: progressData.completed ? new Date() : null,
        time_spent_minutes: progressData.timeSpentMinutes || 0,
        score: progressData.score,
      },
    });
  }
} 