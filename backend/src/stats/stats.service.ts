import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getGlobalStats() {
    const stats = await this.prisma.globalStats.findMany({
      where: { is_visible: true },
      orderBy: { order: 'asc' },
    });

    // Transformer en objet key-value pour faciliter l'utilisation
    const statsObject: Record<string, any> = {};
    stats.forEach((stat) => {
      statsObject[stat.key] = {
        value: stat.value,
        label: stat.label,
        icon: stat.icon,
      };
    });

    return statsObject;
  }

  async getCoursesStats() {
    const [totalCourses, totalEnrollments, totalOrganizations] =
      await Promise.all([
        this.prisma.course.count({ where: { status: 'published' } }),
        this.prisma.enrollment.count({ where: { status: 'approved' } }),
        this.prisma.trainingOrganization.count({
          where: { verification_status: 'verified' },
        }),
      ]);

    const avgRating = await this.prisma.course.aggregate({
      _avg: { average_rating: true },
      where: { average_rating: { not: null } },
    });

    return {
      totalCourses,
      totalEnrollments,
      totalOrganizations,
      averageRating: avgRating._avg.average_rating || 4.5,
    };
  }
}
