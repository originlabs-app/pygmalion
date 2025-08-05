import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizResponseDto } from './dto/quiz-response.dto';
import { QuizMapperService } from './services/quiz-mapper.service';
import { QuizValidationService } from './services/quiz-validation.service';

@Injectable()
export class QuizzesService {
  constructor(
    private prisma: PrismaService,
    private mapper: QuizMapperService,
    private validator: QuizValidationService,
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
    createDto: CreateQuizDto,
    userId: string,
  ): Promise<QuizResponseDto> {
    await this.verifyModuleAccess(createDto.module_id, userId);

    // Validation des questions
    this.validator.validateQuestions(createDto.questions);

    const quiz = await this.prisma.quiz.create({
      data: {
        module_id: createDto.module_id,
        title: createDto.title,
        description: createDto.description,
        time_limit: createDto.time_limit,
        attempts_allowed: createDto.attempts_allowed ?? 3,
        passing_score: createDto.passing_score,
        shuffle_questions: createDto.shuffle_questions ?? true,
        show_results: createDto.show_results ?? true,
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
      },
    });

    return this.mapper.toQuizResponse(quiz);
  }

  async findOne(id: string, userId: string): Promise<QuizResponseDto> {
    const quiz = await this.prisma.quiz.findFirst({
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
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }

    return this.mapper.toQuizResponse(quiz);
  }

  async findByModule(
    moduleId: string,
    userId: string,
  ): Promise<QuizResponseDto[]> {
    await this.verifyModuleAccess(moduleId, userId);

    const quizzes = await this.prisma.quiz.findMany({
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
      },
    });

    return quizzes.map((quiz) => this.mapper.toQuizResponse(quiz));
  }

  async update(
    id: string,
    updateDto: UpdateQuizDto,
    userId: string,
  ): Promise<QuizResponseDto> {
    const existingQuiz = await this.prisma.quiz.findFirst({
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

    if (!existingQuiz) {
      throw new NotFoundException('Quiz non trouvé');
    }

    // Pour une mise à jour complète avec questions, on supprime et recrée
    if (updateDto.questions) {
      // Supprimer les questions existantes
      await this.prisma.question.deleteMany({
        where: { quiz_id: id },
      });

      // Validation des nouvelles questions
      this.validator.validateQuestions(updateDto.questions);
    }

    const updatedQuiz = await this.prisma.quiz.update({
      where: { id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
        time_limit: updateDto.time_limit,
        attempts_allowed: updateDto.attempts_allowed,
        passing_score: updateDto.passing_score,
        shuffle_questions: updateDto.shuffle_questions,
        show_results: updateDto.show_results,
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
      },
    });

    return this.mapper.toQuizResponse(updatedQuiz);
  }

  async remove(id: string, userId: string): Promise<void> {
    const quiz = await this.prisma.quiz.findFirst({
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

    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }

    await this.prisma.quiz.delete({
      where: { id },
    });
  }
}