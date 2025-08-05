import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { EnrollmentStatus, Session } from '@prisma/client';

@Injectable()
export class EnrollmentValidationService {
  constructor(private prisma: PrismaService) {}

  async validateUserExists(userId: string): Promise<void> {
    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  async validateSessionAndCourse(sessionId: string, courseId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        course: true,
        enrollments: true,
      },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.course_id !== courseId) {
      throw new BadRequestException(
        'Session does not belong to the specified course',
      );
    }

    return session;
  }

  async validateNotAlreadyEnrolled(userId: string, sessionId: string): Promise<void> {
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: {
        user_id: userId,
        session_id: sessionId,
        status: {
          notIn: [EnrollmentStatus.cancelled, EnrollmentStatus.failed],
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this session');
    }
  }

  validateAvailableSeats(session: Session): void {
    if (session.available_seats <= 0) {
      throw new BadRequestException('No available seats in this session');
    }
  }

  validateSessionNotStarted(session: Session): void {
    if (session.start_date && new Date(session.start_date) < new Date()) {
      throw new BadRequestException('Cannot enroll in a session that has already started');
    }
  }

  validateStatusTransition(currentStatus: EnrollmentStatus, newStatus: EnrollmentStatus): void {
    const validTransitions: Record<EnrollmentStatus, EnrollmentStatus[]> = {
      pending: ['approved', 'cancelled'],
      approved: ['completed', 'failed', 'cancelled'],
      completed: ['cancelled'], // Peu commun mais possible pour annulations
      cancelled: ['pending'], // Réinscription possible
      failed: ['pending'], // Nouvelle tentative possible
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }

  async validateDeletion(enrollmentId: string): Promise<void> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        session: true,
        _count: {
          select: { progress: true },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    // Vérifier que l'inscription peut être supprimée
    if (enrollment.status === 'completed') {
      throw new BadRequestException('Cannot delete a completed enrollment');
    }

    // Si la session a commencé et qu'il y a des progrès, ne pas supprimer
    if (
      enrollment.session.start_date &&
      new Date(enrollment.session.start_date) < new Date() &&
      enrollment._count.progress > 0
    ) {
      throw new BadRequestException(
        'Cannot delete enrollment with existing progress',
      );
    }
  }
}