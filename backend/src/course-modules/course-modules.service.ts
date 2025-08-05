import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModuleResponseDto } from './dto/course-module-response.dto';
import { ModuleType, CourseModule } from '@prisma/client';

@Injectable()
export class CourseModulesService {
  constructor(private prisma: PrismaService) {}

  private toResponse(module: CourseModule & {
    resources?: any[];
    quizzes?: any[];
    exams?: any[];
    progress?: any[];
  }): CourseModuleResponseDto {
    return {
      id: module.id,
      course_id: module.course_id,
      title: module.title,
      description: module.description || undefined,
      order_index: module.order_index,
      duration_minutes: module.duration_minutes || undefined,
      module_type: module.module_type,
      is_mandatory: module.is_mandatory,
      passing_score: module.passing_score ? parseFloat(module.passing_score.toString()) : undefined,
      created_at: module.created_at,
      updated_at: module.updated_at,
      resources: module.resources || [],
      quiz: module.quizzes?.[0] || null,
      exam: module.exams?.[0] || null,
      progress: module.progress || [],
    };
  }

  async create(
    createDto: CreateCourseModuleDto,
    userId: string,
  ): Promise<CourseModuleResponseDto> {
    // Vérifier que l'utilisateur a accès au cours
    const course = await this.prisma.course.findFirst({
      where: {
        id: createDto.course_id,
        provider: {
          user_id: userId,
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Cours non trouvé ou accès non autorisé');
    }

    // Vérifier si l'order_index est unique pour ce cours
    const existingModule = await this.prisma.courseModule.findFirst({
      where: {
        course_id: createDto.course_id,
        order_index: createDto.order_index,
      },
    });

    if (existingModule) {
      throw new BadRequestException('Un module existe déjà à cet index');
    }

    const module = await this.prisma.courseModule.create({
      data: {
        course_id: createDto.course_id,
        title: createDto.title,
        description: createDto.description,
        order_index: createDto.order_index,
        duration_minutes: createDto.duration_minutes,
        module_type: createDto.module_type,
        is_mandatory: createDto.is_mandatory ?? true,
        passing_score: createDto.passing_score,
      },
      include: {
        resources: true,
        quizzes: true,
        exams: true,
      },
    });

    return this.toResponse(module);
  }

  async findAll(
    courseId: string,
    userId: string,
  ): Promise<CourseModuleResponseDto[]> {
    // Vérifier que l'utilisateur a accès au cours
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        provider: {
          user_id: userId,
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Cours non trouvé ou accès non autorisé');
    }

    const modules = await this.prisma.courseModule.findMany({
      where: { course_id: courseId },
      include: {
        resources: {
          orderBy: { order_index: 'asc' },
        },
        quizzes: true,
        exams: true,
      },
      orderBy: { order_index: 'asc' },
    });

    return modules.map((module) => this.toResponse(module));
  }

  async findOne(id: string, userId: string): Promise<CourseModuleResponseDto> {
    const module = await this.prisma.courseModule.findFirst({
      where: {
        id,
        course: {
          provider: {
            user_id: userId,
          },
        },
      },
      include: {
        resources: {
          orderBy: { order_index: 'asc' },
        },
        quizzes: {
          include: {
            questions: {
              include: {
                answers: true,
              },
              orderBy: { order_index: 'asc' },
            },
          },
        },
        exams: {
          include: {
            questions: {
              include: {
                answers: true,
              },
              orderBy: { order_index: 'asc' },
            },
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module non trouvé');
    }

    return this.toResponse(module);
  }

  async update(
    id: string,
    updateDto: UpdateCourseModuleDto,
    userId: string,
  ): Promise<CourseModuleResponseDto> {
    const existingModule = await this.prisma.courseModule.findFirst({
      where: {
        id,
        course: {
          provider: {
            user_id: userId,
          },
        },
      },
    });

    if (!existingModule) {
      throw new NotFoundException('Module non trouvé');
    }

    // Si on change l'order_index, vérifier l'unicité
    if (
      updateDto.order_index !== undefined &&
      updateDto.order_index !== existingModule.order_index
    ) {
      const conflictingModule = await this.prisma.courseModule.findFirst({
        where: {
          course_id: existingModule.course_id,
          order_index: updateDto.order_index,
          id: { not: id },
        },
      });

      if (conflictingModule) {
        throw new BadRequestException('Un module existe déjà à cet index');
      }
    }

    const updatedModule = await this.prisma.courseModule.update({
      where: { id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
        order_index: updateDto.order_index,
        duration_minutes: updateDto.duration_minutes,
        module_type: updateDto.module_type,
        is_mandatory: updateDto.is_mandatory,
        passing_score: updateDto.passing_score,
      },
      include: {
        resources: true,
        quizzes: true,
        exams: true,
      },
    });

    return this.toResponse(updatedModule);
  }

  async remove(id: string, userId: string): Promise<void> {
    const module = await this.prisma.courseModule.findFirst({
      where: {
        id,
        course: {
          provider: {
            user_id: userId,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module non trouvé');
    }

    await this.prisma.courseModule.delete({
      where: { id },
    });
  }

  async reorderModules(
    courseId: string,
    moduleIds: string[],
    userId: string,
  ): Promise<CourseModuleResponseDto[]> {
    // Vérifier que l'utilisateur a accès au cours
    const course = await this.prisma.course.findFirst({
      where: {
        id: courseId,
        provider: {
          user_id: userId,
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Cours non trouvé ou accès non autorisé');
    }

    // Mettre à jour l'ordre des modules
    const updatePromises = moduleIds.map((moduleId, index) =>
      this.prisma.courseModule.update({
        where: { id: moduleId },
        data: { order_index: index },
      }),
    );

    await Promise.all(updatePromises);

    // Retourner les modules mis à jour
    return this.findAll(courseId, userId);
  }
}
