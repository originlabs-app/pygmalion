import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/enrollment-response.dto';
import { FilterEnrollmentsDto } from './dto/filter-enrollments.dto';
import { EnrollmentStatus } from '@prisma/client';
import { EnrollmentValidationService } from './services/enrollment-validation.service';
import { EnrollmentMapperService } from './services/enrollment-mapper.service';
import { EnrollmentManagementService } from './services/enrollment-management.service';
import { EnrollmentQueryService } from './services/enrollment-query.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService,
    private validator: EnrollmentValidationService,
    private mapper: EnrollmentMapperService,
    private management: EnrollmentManagementService,
    private query: EnrollmentQueryService,
  ) {}

  async create(
    createDto: CreateEnrollmentDto,
    requestingUserId: string,
  ): Promise<EnrollmentResponseDto> {
    // Validation
    await this.validator.validateUserExists(createDto.user_id);
    const session = await this.validator.validateSessionAndCourse(
      createDto.session_id,
      createDto.course_id,
    );
    await this.validator.validateNotAlreadyEnrolled(
      createDto.user_id,
      createDto.session_id,
    );
    this.validator.validateAvailableSeats(session);
    this.validator.validateSessionNotStarted(session);

    // Création
    const enrollment = await this.prisma.enrollment.create({
      data: {
        user_id: createDto.user_id,
        course_id: createDto.course_id,
        session_id: createDto.session_id,
        status: EnrollmentStatus.pending,
        enrollment_date: new Date(),
      },
      include: {
        user: true,
        course: true,
        session: {
          include: {
            _count: {
              select: { enrollments: true },
            },
          },
        },
      },
    });

    // Mise à jour des places disponibles
    await this.management.updateAvailableSeats(createDto.session_id, 1);

    return this.mapper.toEnrollmentResponse(enrollment);
  }

  async findAll(
    filterDto: FilterEnrollmentsDto,
    userId: string,
    userRole: string,
  ) {
    const result = await this.query.findAll(filterDto, userId, userRole);
    
    return {
      data: result.data.map(enrollment => 
        this.mapper.toEnrollmentResponse(enrollment)
      ),
      meta: result.meta,
    };
  }

  async findOne(id: string, userId: string, userRole: string): Promise<EnrollmentResponseDto> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        user: true,
        course: {
          include: {
            provider: true,
          },
        },
        session: {
          include: {
            _count: {
              select: { enrollments: true },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Vérification des droits
    if (userRole === 'student' && enrollment.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }
    if (userRole === 'training_org' && enrollment.course.provider.user_id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.mapper.toEnrollmentResponse(enrollment);
  }

  async findByUser(userId: string): Promise<EnrollmentResponseDto[]> {
    const enrollments = await this.query.findByUser(userId);
    return enrollments.map(enrollment => 
      this.mapper.toEnrollmentResponse(enrollment)
    );
  }

  async update(
    id: string,
    updateDto: UpdateEnrollmentDto,
    userId: string,
    userRole: string,
  ): Promise<EnrollmentResponseDto> {
    const enrollment = await this.findOne(id, userId, userRole);

    if (updateDto.status) {
      this.validator.validateStatusTransition(
        enrollment.status as EnrollmentStatus,
        updateDto.status,
      );
    }

    const updated = await this.prisma.enrollment.update({
      where: { id },
      data: {
        status: updateDto.status,
        score: updateDto.score,
        completion_date: updateDto.status === EnrollmentStatus.completed
          ? new Date()
          : undefined,
      },
      include: {
        user: true,
        course: true,
        session: {
          include: {
            _count: {
              select: { enrollments: true },
            },
          },
        },
      },
    });

    return this.mapper.toEnrollmentResponse(updated);
  }

  async updateProgress(
    id: string,
    progressData: {
      progressPercentage?: number;
      moduleProgress?: { moduleId: string; completed: boolean }[];
    },
    userId: string,
  ): Promise<void> {
    // Vérifier que l'enrollment appartient à l'utilisateur
    const enrollment = await this.findOne(id, userId, 'student');
    
    await this.management.updateProgress(id, progressData);
  }

  async remove(id: string, userId: string, userRole: string): Promise<void> {
    const enrollment = await this.findOne(id, userId, userRole);
    await this.validator.validateDeletion(id);
    
    // Mise à jour des places disponibles si nécessaire
    if (enrollment.status === EnrollmentStatus.approved || enrollment.status === EnrollmentStatus.pending) {
      await this.management.updateAvailableSeats(enrollment.session_id, -1);
    }

    await this.prisma.enrollment.delete({
      where: { id },
    });
  }

  async getStats(courseId: string, userId: string, userRole: string) {
    // Vérifier l'accès au cours
    if (userRole === 'training_org') {
      const course = await this.prisma.course.findFirst({
        where: {
          id: courseId,
          provider: { user_id: userId },
        },
      });
      if (!course) {
        throw new ForbiddenException('Access denied');
      }
    }

    return this.management.getEnrollmentStats(courseId);
  }
}