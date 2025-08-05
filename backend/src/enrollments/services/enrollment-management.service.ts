import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollmentManagementService {
  private readonly logger = new Logger(EnrollmentManagementService.name);

  constructor(private prisma: PrismaService) {}

  async updateAvailableSeats(sessionId: string, delta: number): Promise<void> {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        available_seats: {
          decrement: delta, // delta is positive when enrolling, negative when cancelling
        },
        updated_at: new Date(),
      },
    });
  }

  async updateProgress(
    enrollmentId: string,
    progressData: {
      progressPercentage?: number;
      lastAccessedAt?: Date;
      moduleProgress?: { moduleId: string; completed: boolean }[];
    },
  ): Promise<void> {
    const updateData: Partial<{
      score: number;
      updated_at: Date;
      status: EnrollmentStatus;
      completion_date: Date;
    }> = {
      score: progressData.progressPercentage,
      updated_at: progressData.lastAccessedAt || new Date(),
    };

    // Si on marque comme complété (100%)
    if (progressData.progressPercentage === 100) {
      updateData.status = EnrollmentStatus.completed;
      updateData.completion_date = new Date();
    }

    await this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: updateData,
    });

    // Mettre à jour la progression des modules si fournie
    if (progressData.moduleProgress) {
      for (const module of progressData.moduleProgress) {
        await this.updateModuleProgress(
          enrollmentId,
          module.moduleId,
          module.completed,
        );
      }
    }
  }

  private async updateModuleProgress(
    enrollmentId: string,
    moduleId: string,
    completed: boolean,
  ): Promise<void> {
    await this.prisma.enrollmentProgress.upsert({
      where: {
        enrollment_id_module_id: {
          enrollment_id: enrollmentId,
          module_id: moduleId,
        },
      },
      update: {
        completed,
        completion_date: completed ? new Date() : null,
        updated_at: new Date(),
      },
      create: {
        enrollment_id: enrollmentId,
        module_id: moduleId,
        completed,
        completion_date: completed ? new Date() : null,
      },
    });
  }

  async calculateOverallProgress(enrollmentId: string): Promise<number> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        course: {
          include: {
            modules: true,
          },
        },
      },
    });

    if (!enrollment) return 0;

    const totalModules = enrollment.course.modules.length;
    if (totalModules === 0) return 0;

    // Fetch progress separately
    const progress = await this.prisma.enrollmentProgress.findMany({
      where: {
        enrollment_id: enrollmentId,
        completed: true,
      },
    });

    const completedModules = progress.length;

    return Math.round((completedModules / totalModules) * 100);
  }

  async getEnrollmentStats(courseId: string): Promise<{
    total: number;
    pending: number;
    approved: number;
    inProgress: number;
    completed: number;
    failed: number;
    cancelled: number;
  }> {
    const stats = await this.prisma.enrollment.groupBy({
      by: ['status'],
      where: { course_id: courseId },
      _count: true,
    });

    return {
      total: stats.reduce((sum, stat) => sum + stat._count, 0),
      pending: stats.find((s) => s.status === 'pending')?._count || 0,
      approved: stats.find((s) => s.status === 'approved')?._count || 0,
      inProgress: 0, // No in_progress status in the enum
      completed: stats.find((s) => s.status === 'completed')?._count || 0,
      failed: stats.find((s) => s.status === 'failed')?._count || 0,
      cancelled: stats.find((s) => s.status === 'cancelled')?._count || 0,
    };
  }

  async cleanupExpiredEnrollments(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.prisma.enrollment.updateMany({
      where: {
        status: 'pending',
        enrollment_date: {
          lt: thirtyDaysAgo,
        },
      },
      data: {
        status: 'cancelled',
      },
    });

    if (result.count > 0) {
      this.logger.log(`Cleaned up ${result.count} expired pending enrollments`);
    }

    return result.count;
  }
}
