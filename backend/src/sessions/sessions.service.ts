import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionQueryDto } from './dto/session-query.dto';
import { Session, Prisma } from '@prisma/client';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const { course_id, start_date, end_date, max_seats, ...rest } =
      createSessionDto;

    // Vérifier que le cours existe
    const course = await this.prisma.course.findUnique({
      where: { id: course_id },
      include: { provider: true },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Vérifier que les dates sont cohérentes
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (startDate >= endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (startDate < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    // Vérifier les conflits de planning pour le cours
    const conflictingSessions = await this.prisma.session.findMany({
      where: {
        course_id,
        OR: [
          {
            start_date: { lte: endDate },
            end_date: { gte: startDate },
          },
        ],
      },
    });

    if (conflictingSessions.length > 0) {
      throw new ConflictException(
        'Session dates conflict with existing sessions for this course',
      );
    }

    try {
      return await this.prisma.session.create({
        data: {
          course_id,
          start_date: startDate,
          end_date: endDate,
          max_seats,
          available_seats: rest.available_seats ?? max_seats,
          ...rest,
        },
        include: {
          course: {
            include: {
              provider: {
                select: {
                  id: true,
                  organization_name: true,
                },
              },
            },
          },
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error creating session');
      }
      throw error;
    }
  }

  async findAll(query: SessionQueryDto) {
    const {
      course_id,
      start_date_from,
      start_date_to,
      location,
      session_type,
      page = 1,
      limit = 20,
      sortBy = 'start_date',
      sortOrder = 'asc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.SessionWhereInput = {};

    if (course_id) {
      where.course_id = course_id;
    }

    if (start_date_from || start_date_to) {
      where.start_date = {};
      if (start_date_from) {
        where.start_date.gte = new Date(start_date_from);
      }
      if (start_date_to) {
        where.start_date.lte = new Date(start_date_to);
      }
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (session_type) {
      where.session_type = session_type;
    }

    const [sessions, total] = await Promise.all([
      this.prisma.session.findMany({
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
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.session.count({ where }),
    ]);

    return {
      data: sessions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            provider: true,
          },
        },
        enrollments: {
          include: {
            // Ne pas inclure les détails des utilisateurs pour la confidentialité
            // mais on peut inclure le statut et la progression
          },
          orderBy: { enrollment_date: 'desc' },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const existingSession = await this.prisma.session.findUnique({
      where: { id },
      include: {
        enrollments: true,
      },
    });

    if (!existingSession) {
      throw new NotFoundException('Session not found');
    }

    // Si la session a déjà commencé, limiter les modifications
    if (existingSession.start_date < new Date()) {
      // Seules certaines modifications sont autorisées pour les sessions en cours
      const allowedUpdates = [
        'virtual_meeting_url',
        'virtual_meeting_password',
        'location',
      ];
      const requestedUpdates = Object.keys(updateSessionDto);
      const unauthorizedUpdates = requestedUpdates.filter(
        (key) => !allowedUpdates.includes(key),
      );

      if (unauthorizedUpdates.length > 0) {
        throw new BadRequestException(
          `Cannot modify ${unauthorizedUpdates.join(', ')} for sessions that have already started`,
        );
      }
    }

    // Vérifier les conflits de dates si on modifie les dates
    if (updateSessionDto.start_date || updateSessionDto.end_date) {
      const startDate = updateSessionDto.start_date
        ? new Date(updateSessionDto.start_date)
        : existingSession.start_date;
      const endDate = updateSessionDto.end_date
        ? new Date(updateSessionDto.end_date)
        : existingSession.end_date;

      if (startDate >= endDate) {
        throw new BadRequestException('Start date must be before end date');
      }

      // Vérifier les conflits avec d'autres sessions du même cours
      const conflictingSessions = await this.prisma.session.findMany({
        where: {
          course_id: existingSession.course_id,
          id: { not: id },
          OR: [
            {
              start_date: { lte: endDate },
              end_date: { gte: startDate },
            },
          ],
        },
      });

      if (conflictingSessions.length > 0) {
        throw new ConflictException(
          'Session dates conflict with existing sessions for this course',
        );
      }
    }

    // Si on réduit le nombre de places max, vérifier qu'on ne dépasse pas les inscriptions existantes
    if (
      updateSessionDto.max_seats &&
      updateSessionDto.max_seats < existingSession.enrollments.length
    ) {
      throw new BadRequestException(
        `Cannot reduce max seats below current enrollment count (${existingSession.enrollments.length})`,
      );
    }

    try {
      const updateData: Record<string, unknown> = { ...updateSessionDto };

      if (updateSessionDto.start_date) {
        updateData.start_date = new Date(updateSessionDto.start_date);
      }
      if (updateSessionDto.end_date) {
        updateData.end_date = new Date(updateSessionDto.end_date);
      }

      // Ajuster available_seats si max_seats change
      if (updateSessionDto.max_seats) {
        const enrolledCount = existingSession.enrollments.filter(
          (e) => e.status === 'approved' || e.status === 'pending',
        ).length;
        updateData.available_seats = updateSessionDto.max_seats - enrolledCount;
      }

      updateData.updated_at = new Date();

      return await this.prisma.session.update({
        where: { id },
        data: updateData,
        include: {
          course: {
            include: {
              provider: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Error updating session');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: {
        enrollments: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    // Vérifier qu'il n'y a pas d'inscriptions actives
    const activeEnrollments = session.enrollments.filter(
      (enrollment) =>
        enrollment.status === 'approved' || enrollment.status === 'pending',
    );

    if (activeEnrollments.length > 0) {
      throw new BadRequestException(
        'Cannot delete session with active enrollments',
      );
    }

    // Vérifier que la session n'a pas encore commencé
    if (session.start_date <= new Date()) {
      throw new BadRequestException(
        'Cannot delete session that has already started or is in progress',
      );
    }

    await this.prisma.session.delete({
      where: { id },
    });
  }

  async findByCourse(courseId: string): Promise<Session[]> {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return this.prisma.session.findMany({
      where: { course_id: courseId },
      include: {
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: { start_date: 'asc' },
    });
  }

  async updateAvailableSeats(sessionId: string): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        enrollments: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const enrolledCount = session.enrollments.filter(
      (e) => e.status === 'approved' || e.status === 'pending',
    ).length;

    const availableSeats = session.max_seats - enrolledCount;

    return this.prisma.session.update({
      where: { id: sessionId },
      data: {
        available_seats: Math.max(0, availableSeats),
        updated_at: new Date(),
      },
    });
  }
}
