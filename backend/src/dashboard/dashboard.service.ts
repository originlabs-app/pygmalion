import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getManagerKPIs(userId: string) {
    // Get user's enrollments and team data
    const [
      activeEnrollments,
      upcomingEnrollments,
      expiredCertifications,
      teamMembers,
      recentActivity,
    ] = await Promise.all([
      // Active trainings
      this.prisma.enrollment.count({
        where: {
          user_id: userId,
          status: 'approved',
          session: {
            start_date: { lte: new Date() },
            end_date: { gte: new Date() },
          },
        },
      }),

      // Upcoming trainings
      this.prisma.enrollment.count({
        where: {
          user_id: userId,
          status: 'approved',
          session: {
            start_date: { gt: new Date() },
          },
        },
      }),

      // Expired certifications (simulation)
      Promise.resolve(Math.floor(Math.random() * 5)),

      // Team members (simulation - in real app, would query team relationships)
      Promise.resolve(12),

      // Recent activity
      this.prisma.enrollment.findMany({
        where: {
          user_id: userId,
        },
        take: 5,
        orderBy: { created_at: 'desc' },
        include: {
          course: true,
          session: true,
        },
      }),
    ]);

    // Calculate changes (simulation)
    const activeChange = Math.floor(Math.random() * 10) - 5;
    const upcomingChange = Math.floor(Math.random() * 5);
    const expiredChange = Math.floor(Math.random() * 3) - 2;
    const complianceChange = Math.floor(Math.random() * 5);
    const budgetUsed = Math.floor(Math.random() * 30) + 60;

    return {
      kpis: {
        activeTrainings: {
          value: activeEnrollments,
          change: activeChange,
          trend: activeChange >= 0 ? 'up' : 'down',
        },
        upcomingTrainings: {
          value: upcomingEnrollments,
          change: upcomingChange,
          trend: 'up',
        },
        expiredCertifications: {
          value: expiredCertifications,
          change: expiredChange,
          trend: expiredChange <= 0 ? 'down' : 'up',
        },
        budgetUsed: {
          value: budgetUsed,
          total: 100,
          amount: budgetUsed * 500,
        },
        teamCompliance: {
          value: 90 + Math.floor(Math.random() * 10),
          change: complianceChange,
          trend: 'up',
        },
        criticalAlerts: {
          value: Math.floor(Math.random() * 10),
          change: -1,
          trend: 'down',
        },
      },
      team: {
        totalMembers: teamMembers,
        activeMembers: teamMembers - 1,
        onlineNow: Math.floor(teamMembers * 0.7),
        complianceScore: 90 + Math.floor(Math.random() * 10),
      },
      recentActivity: recentActivity.map((enrollment, index) => ({
        id: enrollment.id,
        type:
          enrollment.status === 'completed'
            ? 'training_completed'
            : 'assignment',
        user: 'Sarah Martin', // In real app, would get actual user name
        action:
          enrollment.status === 'completed'
            ? 'a terminé la formation'
            : 'a été assigné à',
        item: enrollment.course.title,
        time: `${index * 15 + 2} min`,
        status: enrollment.status === 'completed' ? 'success' : 'info',
      })),
    };
  }

  async getTrainingOrgKPIs(userId: string) {
    // Get training organization data
    const trainingOrg = await this.prisma.trainingOrganization.findFirst({
      where: { user_id: userId },
    });

    if (!trainingOrg) {
      return this.getDefaultTrainingOrgKPIs();
    }

    const [
      totalCourses,
      activeCourses,
      totalLearners,
      monthlyRevenue,
      completionRate,
    ] = await Promise.all([
      this.prisma.course.count({
        where: { provider_id: trainingOrg.id },
      }),
      this.prisma.course.count({
        where: {
          provider_id: trainingOrg.id,
          status: 'published',
        },
      }),
      this.prisma.enrollment.count({
        where: {
          course: {
            provider_id: trainingOrg.id,
          },
        },
      }),
      // Monthly revenue (simulation)
      Promise.resolve(Math.floor(Math.random() * 50000) + 50000),
      // Completion rate (simulation)
      Promise.resolve(85 + Math.floor(Math.random() * 10)),
    ]);

    return {
      totalCourses,
      activeCourses,
      totalLearners,
      monthlyRevenue,
      completionRate,
      satisfactionRate: 4.5 + Math.random() * 0.4,
      upcomingSessions: Math.floor(Math.random() * 10) + 5,
      certificatesIssued: Math.floor(Math.random() * 100) + 50,
    };
  }

  async getLearnerKPIs(userId: string) {
    const [completedCourses, ongoingCourses, certificates, totalHours] =
      await Promise.all([
        this.prisma.enrollment.count({
          where: {
            user_id: userId,
            status: 'completed',
          },
        }),
        this.prisma.enrollment.count({
          where: {
            user_id: userId,
            status: 'approved',
            session: {
              start_date: { lte: new Date() },
              end_date: { gte: new Date() },
            },
          },
        }),
        this.prisma.certificate.count({
          where: { user_id: userId },
        }),
        // Total hours (simulation)
        Promise.resolve(Math.floor(Math.random() * 100) + 50),
      ]);

    return {
      completedCourses,
      ongoingCourses,
      certificates,
      totalHours,
      averageScore: 85 + Math.floor(Math.random() * 10),
      nextDeadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };
  }

  private getDefaultTrainingOrgKPIs() {
    return {
      totalCourses: 0,
      activeCourses: 0,
      totalLearners: 0,
      monthlyRevenue: 0,
      completionRate: 0,
      satisfactionRate: 0,
      upcomingSessions: 0,
      certificatesIssued: 0,
    };
  }
}
