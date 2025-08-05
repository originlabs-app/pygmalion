import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamResponseDto } from './dto/exam-response.dto';
import { ExamMapperService } from './services/exam-mapper.service';
import { ExamValidationService } from './services/exam-validation.service';

@Injectable()
export class ExamsService {
  constructor(
    private prisma: PrismaService,
    private mapper: ExamMapperService,
    private validator: ExamValidationService,
  ) {}

  private async verifyModuleAccess(moduleId: string, userId: string) {
    const module = await this.prisma.courseModule.findFirst({
      where: {
        id: moduleId,
        course: {
          provider: {
            user_id: userId,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module non trouvé ou accès non autorisé');
    }

    return module;
  }

  async create(
    createDto: CreateExamDto,
    userId: string,
  ): Promise<ExamResponseDto> {
    await this.verifyModuleAccess(createDto.module_id, userId);
    
    // Validation des questions
    this.validator.validateQuestions(createDto.questions);

    const exam = await this.prisma.exam.create({
      data: {
        module_id: createDto.module_id,
        title: createDto.title,
        description: createDto.description,
        time_limit: createDto.time_limit,
        passing_score: createDto.passing_score,
        shuffle_questions: createDto.shuffle_questions ?? true,
        show_results: createDto.show_results ?? false,
        generates_certificate: createDto.generates_certificate ?? true,
        questions: {
          create: createDto.questions.map((question) => ({
            question_text: question.question_text,
            question_type: question.question_type,
            points: question.points ?? 1,
            order_index: question.order_index,
            explanation: question.explanation,
            media_url: question.media_url,
            answers: {
              create: question.answers.map((answer) => ({
                answer_text: answer.answer_text,
                is_correct: answer.is_correct,
                order_index: answer.order_index,
              })),
            },
          })),
        },
        ...(createDto.exam_config && {
          exam_config: {
            create: {
              default_proctoring:
                createDto.exam_config.default_proctoring ?? false,
              default_webcam: createDto.exam_config.default_webcam ?? false,
              default_lockdown: createDto.exam_config.default_lockdown ?? false,
              default_ip_restriction:
                createDto.exam_config.default_ip_restriction,
              allowed_attempts: createDto.exam_config.allowed_attempts ?? 1,
              time_limit_strict:
                createDto.exam_config.time_limit_strict ?? true,
              question_randomization:
                createDto.exam_config.question_randomization ?? true,
              answer_randomization:
                createDto.exam_config.answer_randomization ?? true,
              alert_threshold: createDto.exam_config.alert_threshold ?? 3,
              auto_suspend: createDto.exam_config.auto_suspend ?? false,
              manual_review_required:
                createDto.exam_config.manual_review_required ?? true,
            },
          },
        }),
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order_index: 'asc' },
            },
          },
          orderBy: { order_index: 'asc' },
        },
        exam_config: true,
      },
    });

    return this.mapper.toExamResponse(exam);
  }

  async findOne(id: string, userId: string): Promise<ExamResponseDto> {
    const exam = await this.prisma.exam.findFirst({
      where: {
        id,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order_index: 'asc' },
            },
          },
          orderBy: { order_index: 'asc' },
        },
        exam_config: true,
      },
    });

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    return this.mapper.toExamResponse(exam);
  }

  async findByModule(
    moduleId: string,
    userId: string,
  ): Promise<ExamResponseDto[]> {
    await this.verifyModuleAccess(moduleId, userId);

    const exams = await this.prisma.exam.findMany({
      where: { module_id: moduleId },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order_index: 'asc' },
            },
          },
          orderBy: { order_index: 'asc' },
        },
        exam_config: true,
      },
    });

    return exams.map((exam) => this.mapper.toExamResponse(exam));
  }

  async update(
    id: string,
    updateDto: UpdateExamDto,
    userId: string,
  ): Promise<ExamResponseDto> {
    const existingExam = await this.prisma.exam.findFirst({
      where: {
        id,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
    });

    if (!existingExam) {
      throw new NotFoundException('Examen non trouvé');
    }

    // Pour une mise à jour complète avec questions, on supprime et recrée
    if (updateDto.questions) {
      // Supprimer les questions existantes
      await this.prisma.examQuestion.deleteMany({
        where: { exam_id: id },
      });

      // Validation des nouvelles questions
      this.validator.validateQuestions(updateDto.questions);
    }

    const updatedExam = await this.prisma.exam.update({
      where: { id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
        time_limit: updateDto.time_limit,
        passing_score: updateDto.passing_score,
        shuffle_questions: updateDto.shuffle_questions,
        show_results: updateDto.show_results,
        generates_certificate: updateDto.generates_certificate,
        ...(updateDto.questions && {
          questions: {
            create: updateDto.questions.map((question) => ({
              question_text: question.question_text,
              question_type: question.question_type,
              points: question.points ?? 1,
              order_index: question.order_index,
              explanation: question.explanation,
              media_url: question.media_url,
              answers: {
                create: question.answers.map((answer) => ({
                  answer_text: answer.answer_text,
                  is_correct: answer.is_correct,
                  order_index: answer.order_index,
                })),
              },
            })),
          },
        }),
        ...(updateDto.exam_config && {
          exam_config: {
            upsert: {
              create: updateDto.exam_config,
              update: updateDto.exam_config,
            },
          },
        }),
      },
      include: {
        questions: {
          include: {
            answers: {
              orderBy: { order_index: 'asc' },
            },
          },
          orderBy: { order_index: 'asc' },
        },
        exam_config: true,
      },
    });

    return this.mapper.toExamResponse(updatedExam);
  }

  async remove(id: string, userId: string): Promise<void> {
    const exam = await this.prisma.exam.findFirst({
      where: {
        id,
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
      throw new NotFoundException('Examen non trouvé');
    }

    await this.prisma.exam.delete({
      where: { id },
    });
  }
}