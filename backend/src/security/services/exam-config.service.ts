import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import {
  CreateExamConfigDto,
  UpdateExamConfigDto,
} from '@/security/dto/security.dto';

@Injectable()
export class ExamConfigService {
  constructor(private prisma: PrismaService) {}

  async getExamConfiguration(examId: string) {
    return this.prisma.examConfiguration.findUnique({
      where: { exam_id: examId },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                    provider_id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createExamConfiguration(createConfigDto: CreateExamConfigDto) {
    const { exam_id, ...configData } = createConfigDto;

    // Vérifier que l'examen existe
    const exam = await this.prisma.exam.findUnique({
      where: { id: exam_id },
    });

    if (!exam) {
      throw new NotFoundException("L'examen spécifié n'existe pas");
    }

    // Vérifier qu'il n'y a pas déjà une configuration
    const existingConfig = await this.prisma.examConfiguration.findUnique({
      where: { exam_id },
    });

    if (existingConfig) {
      throw new BadRequestException(
        'Une configuration existe déjà pour cet examen',
      );
    }

    return this.prisma.examConfiguration.create({
      data: {
        exam_id,
        ...configData,
      },
    });
  }

  async updateExamConfiguration(
    configId: string,
    updateConfigDto: UpdateExamConfigDto,
  ) {
    const existingConfig = await this.prisma.examConfiguration.findUnique({
      where: { id: configId },
    });

    if (!existingConfig) {
      throw new NotFoundException('Configuration non trouvée');
    }

    const updateData = { ...updateConfigDto };

    return this.prisma.examConfiguration.update({
      where: { id: configId },
      data: updateData,
    });
  }

  async deleteExamConfiguration(id: string) {
    return this.prisma.examConfiguration.delete({
      where: { id },
    });
  }

  async verifyExamOwnership(examId: string, userId: string) {
    const exam = await this.prisma.exam.findFirst({
      where: {
        id: examId,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
    });

    if (!exam) {
      throw new ForbiddenException(
        "Vous n'avez pas accès à cet examen ou il n'existe pas",
      );
    }

    return exam;
  }

  async verifyConfigOwnership(configId: string, userId: string) {
    const config = await this.prisma.examConfiguration.findFirst({
      where: {
        id: configId,
        exam: {
          module: {
            course: {
              provider: {
                user_id: userId,
              },
            },
          },
        },
      },
    });

    if (!config) {
      throw new ForbiddenException(
        "Vous n'avez pas accès à cette configuration ou elle n'existe pas",
      );
    }

    return config;
  }
}
