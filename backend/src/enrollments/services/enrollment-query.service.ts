import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { EnrollmentStatus, Prisma } from '@prisma/client';
import { FilterEnrollmentsDto } from '../dto/filter-enrollments.dto';

@Injectable()
export class EnrollmentQueryService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    filterDto: FilterEnrollmentsDto,
    userId: string,
    userRole: string,
  ) {
    const where: Prisma.EnrollmentWhereInput = {};

    // Filtrage selon le rôle
    if (userRole === 'training_org') {
      where.course = {
        provider: {
          user_id: userId,
        },
      };
    } else if (userRole === 'student') {
      where.user_id = userId;
    }

    // Filtres additionnels
    if (filterDto.course_id) {
      where.course_id = filterDto.course_id;
    }

    if (filterDto.session_id) {
      where.session_id = filterDto.session_id;
    }

    if (filterDto.status) {
      where.status = filterDto.status as EnrollmentStatus;
    }

    if (filterDto.user_id && userRole !== 'student') {
      where.user_id = filterDto.user_id;
    }

    // Pagination
    const page = filterDto.page || 1;
    const limit = filterDto.limit || 10;
    const skip = (page - 1) * limit;

    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where,
        skip,
        take: limit,
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
        orderBy: { enrollment_date: 'desc' },
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

  async findByUser(userId: string) {
    return this.prisma.enrollment.findMany({
      where: { user_id: userId },
      include: {
        course: {
          include: {
            provider: {
              select: {
                organization_name: true,
                logo_url: true,
              },
            },
            _count: {
              select: { modules: true },
            },
          },
        },
        session: true,
        progress: true,
      },
      orderBy: [
        { status: 'asc' },
        { enrollment_date: 'desc' },
      ],
    });
  }

  async findByCourse(courseId: string, status?: EnrollmentStatus) {
    const where: Prisma.EnrollmentWhereInput = {
      course_id: courseId,
    };

    if (status) {
      where.status = status;
    }

    return this.prisma.enrollment.findMany({
      where,
      include: {
        user: true,
        session: true,
      },
      orderBy: { enrollment_date: 'desc' },
    });
  }

  async findBySession(sessionId: string) {
    return this.prisma.enrollment.findMany({
      where: { session_id: sessionId },
      include: {
        user: true,
        course: true,
      },
      orderBy: { enrollment_date: 'desc' },
    });
  }

  async getRecentActivity(providerId: string, days: number = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.prisma.enrollment.findMany({
      where: {
        course: {
          provider: {
            user_id: providerId,
          },
        },
        enrollment_date: {
          gte: startDate,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { enrollment_date: 'desc' },
      take: 20,
    });
  }

  async searchEnrollments(
    searchTerm: string,
    providerId: string,
  ) {
    return this.prisma.enrollment.findMany({
      where: {
        course: {
          provider: {
            user_id: providerId,
          },
        },
        OR: [
          {
            user: {
              email: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              first_name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            user: {
              last_name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            course: {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      include: {
        user: true,
        course: true,
        session: true,
      },
      take: 50,
    });
  }
}