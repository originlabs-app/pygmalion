import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { Course, Prisma } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    try {
      // Vérifier que l'organisme de formation existe
      const provider = await this.prisma.trainingOrganization.findUnique({
        where: { id: createCourseDto.provider_id },
      });

      if (!provider) {
        throw new NotFoundException('Training organization not found');
      }

      if (provider.verification_status !== 'verified') {
        throw new BadRequestException('Training organization must be verified to create courses');
      }

      return await this.prisma.course.create({
        data: {
          ...createCourseDto,
          qualiopi_indicators: createCourseDto.qualiopi_indicators || [],
        },
        include: {
          provider: true,
          sessions: true,
          _count: {
            select: {
              enrollments: true,
              sessions: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Course with this title already exists for this provider');
        }
      }
      throw error;
    }
  }

  async findAll(query: CourseQueryDto) {
    const {
      search,
      category,
      course_type,
      status,
      provider_id,
      page = 1,
      limit = 20,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.CourseWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { provider: { organization_name: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (course_type) {
      where.course_type = course_type;
    }

    if (status) {
      where.status = status;
    }

    if (provider_id) {
      where.provider_id = provider_id;
    }

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        include: {
          provider: {
            select: {
              id: true,
              organization_name: true,
              logo_url: true,
              qualiopi_certified: true,
            },
          },
          sessions: {
            select: {
              id: true,
              start_date: true,
              end_date: true,
              price: true,
              available_seats: true,
              max_seats: true,
              location: true,
            },
            orderBy: { start_date: 'asc' },
          },
          _count: {
            select: {
              enrollments: true,
              sessions: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.course.count({ where }),
    ]);

    return {
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        provider: true,
        sessions: {
          include: {
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
          orderBy: { start_date: 'asc' },
        },
        prerequisites: {
          include: {
            prerequisite: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
        prerequisiteFor: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                category: true,
              },
            },
          },
        },
        _count: {
          select: {
            enrollments: true,
            certificates: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const existingCourse = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    try {
      return await this.prisma.course.update({
        where: { id },
        data: {
          ...updateCourseDto,
          updated_at: new Date(),
        },
        include: {
          provider: true,
          sessions: true,
          _count: {
            select: {
              enrollments: true,
              sessions: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Course with this title already exists for this provider');
        }
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        enrollments: true,
        sessions: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Vérifier qu'il n'y a pas d'inscriptions actives
    const activeEnrollments = course.enrollments.filter(
      enrollment => enrollment.status === 'approved' || enrollment.status === 'pending'
    );

    if (activeEnrollments.length > 0) {
      throw new BadRequestException('Cannot delete course with active enrollments');
    }

    // Vérifier qu'il n'y a pas de sessions futures
    const futureSessions = course.sessions.filter(session => session.start_date > new Date());

    if (futureSessions.length > 0) {
      throw new BadRequestException('Cannot delete course with future sessions');
    }

    await this.prisma.course.delete({
      where: { id },
    });
  }

  async findByProvider(providerId: string, query: Partial<CourseQueryDto> = {}): Promise<Course[]> {
    const provider = await this.prisma.trainingOrganization.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      throw new NotFoundException('Training organization not found');
    }

    return this.prisma.course.findMany({
      where: {
        provider_id: providerId,
        ...(query.status && { status: query.status }),
        ...(query.category && { category: query.category }),
      },
      include: {
        sessions: {
          select: {
            id: true,
            start_date: true,
            end_date: true,
            price: true,
            available_seats: true,
            max_seats: true,
          },
          orderBy: { start_date: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
            sessions: true,
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateStatus(id: string, status: 'draft' | 'published' | 'archived' | 'suspended'): Promise<Course> {
    const course = await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: {
        status,
        updated_at: new Date(),
      },
      include: {
        provider: true,
        sessions: true,
      },
    });
  }
} 