import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { QuizResponseDto, QuestionResponseDto, AnswerResponseDto } from './dto/quiz-response.dto';
import { AttemptStatus } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  private toAnswerResponse(entity: any): AnswerResponseDto {
    return {
      id: entity.id,
      question_id: entity.question_id,
      answer_text: entity.answer_text,
      is_correct: entity.is_correct,
      order_index: entity.order_index,
      created_at: entity.created_at,
    };
  }

  private toQuestionResponse(entity: any): QuestionResponseDto {
    return {
      id: entity.id,
      quiz_id: entity.quiz_id,
      question_text: entity.question_text,
      question_type: entity.question_type,
      points: entity.points,
      order_index: entity.order_index,
      explanation: entity.explanation,
      media_url: entity.media_url,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      answers: entity.answers?.map(answer => this.toAnswerResponse(answer)) || [],
    };
  }

  private toQuizResponse(entity: any): QuizResponseDto {
    return {
      id: entity.id,
      module_id: entity.module_id,
      title: entity.title,
      description: entity.description,
      time_limit: entity.time_limit,
      attempts_allowed: entity.attempts_allowed,
      passing_score: entity.passing_score,
      shuffle_questions: entity.shuffle_questions,
      show_results: entity.show_results,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      questions: entity.questions?.map(question => this.toQuestionResponse(question)) || [],
    };
  }

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

  async create(createDto: CreateQuizDto, userId: string): Promise<QuizResponseDto> {
    await this.verifyModuleAccess(createDto.module_id, userId);

    // Validation des questions
    if (createDto.questions.length === 0) {
      throw new BadRequestException('Un quiz doit contenir au moins une question');
    }

    for (const question of createDto.questions) {
      if (question.answers.length < 2) {
        throw new BadRequestException('Chaque question doit avoir au moins 2 réponses');
      }

      const correctAnswers = question.answers.filter(answer => answer.is_correct);
      if (correctAnswers.length === 0) {
        throw new BadRequestException('Chaque question doit avoir au moins une réponse correcte');
      }

      if (question.question_type === 'single_choice' && correctAnswers.length > 1) {
        throw new BadRequestException('Une question à choix unique ne peut avoir qu\'une seule réponse correcte');
      }
    }

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
          create: createDto.questions.map(question => ({
            question_text: question.question_text,
            question_type: question.question_type,
            points: question.points ?? 1,
            order_index: question.order_index,
            explanation: question.explanation,
            media_url: question.media_url,
            answers: {
              create: question.answers.map(answer => ({
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

    return this.toQuizResponse(quiz);
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

    return this.toQuizResponse(quiz);
  }

  async findByModule(moduleId: string, userId: string): Promise<QuizResponseDto[]> {
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

    return quizzes.map(quiz => this.toQuizResponse(quiz));
  }

  async update(id: string, updateDto: UpdateQuizDto, userId: string): Promise<QuizResponseDto> {
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
      for (const question of updateDto.questions) {
        if (question.answers.length < 2) {
          throw new BadRequestException('Chaque question doit avoir au moins 2 réponses');
        }

        const correctAnswers = question.answers.filter(answer => answer.is_correct);
        if (correctAnswers.length === 0) {
          throw new BadRequestException('Chaque question doit avoir au moins une réponse correcte');
        }
      }
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
            create: updateDto.questions.map(question => ({
              question_text: question.question_text,
              question_type: question.question_type,
              points: question.points ?? 1,
              order_index: question.order_index,
              explanation: question.explanation,
              media_url: question.media_url,
              answers: {
                create: question.answers.map(answer => ({
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

    return this.toQuizResponse(updatedQuiz);
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

  async startAttempt(quizId: string, enrollmentId: string, userId: string): Promise<any> {
    // Vérifier que l'utilisateur est inscrit au cours
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id: enrollmentId,
        user_id: userId,
        course: {
          modules: {
            some: {
              quizzes: {
                some: { id: quizId },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Inscription non trouvée');
    }

    // Vérifier le nombre de tentatives
    const existingAttempts = await this.prisma.quizAttempt.count({
      where: {
        quiz_id: quizId,
        user_id: userId,
      },
    });

    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }

    if (existingAttempts >= quiz.attempts_allowed) {
      throw new ForbiddenException('Nombre maximum de tentatives atteint');
    }

    // Créer une nouvelle tentative
    const attempt = await this.prisma.quizAttempt.create({
      data: {
        quiz_id: quizId,
        user_id: userId,
        enrollment_id: enrollmentId,
        attempt_number: existingAttempts + 1,
        start_time: new Date(),
        status: AttemptStatus.in_progress,
        max_score: 100, // Sera calculé selon les points des questions
      },
    });

    return attempt;
  }

  async submitAttempt(submitDto: SubmitQuizAttemptDto, userId: string): Promise<any> {
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        quiz_id: submitDto.quiz_id,
        enrollment_id: submitDto.enrollment_id,
        user_id: userId,
        status: AttemptStatus.in_progress,
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                answers: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Tentative active non trouvée');
    }

    // Calculer le score
    let totalPoints = 0;
    let earnedPoints = 0;

    const responses: any[] = [];

    for (const response of submitDto.responses) {
      const question = attempt.quiz.questions.find(q => q.id === response.question_id);
      if (!question) continue;

      totalPoints += question.points;

      let isCorrect = false;
      let pointsEarned = 0;

      if (response.answer_id) {
        const answer = question.answers.find(a => a.id === response.answer_id);
        if (answer?.is_correct) {
          isCorrect = true;
          pointsEarned = question.points;
        }
      }

      earnedPoints += pointsEarned;

      responses.push({
        attempt_id: attempt.id,
        question_id: response.question_id,
        answer_id: response.answer_id,
        response_text: response.response_text,
        is_correct: isCorrect,
        points_earned: pointsEarned,
      });
    }

    // Sauvegarder les réponses
    await this.prisma.quizResponse.createMany({
      data: responses,
    });

    // Calculer le score final
    const finalScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = finalScore >= parseFloat(attempt.quiz.passing_score.toString());

    // Mettre à jour la tentative
    const completedAttempt = await this.prisma.quizAttempt.update({
      where: { id: attempt.id },
      data: {
        end_time: new Date(),
        score: finalScore,
        max_score: totalPoints,
        passed,
        status: AttemptStatus.completed,
      },
      include: {
        responses: {
          include: {
            question: true,
            answer: true,
          },
        },
      },
    });

    return completedAttempt;
  }

  // Méthodes pour OF - Récupération des résultats
  async getQuizAttempts(quizId: string, userId: string): Promise<any> {
    // Vérifier que l'utilisateur a accès au quiz
    const quiz = await this.prisma.quiz.findFirst({
      where: {
        id: quizId,
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
      throw new NotFoundException('Quiz non trouvé ou accès non autorisé');
    }

    // Récupérer toutes les tentatives pour ce quiz
    const attempts = await this.prisma.quizAttempt.findMany({
      where: { quiz_id: quizId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        enrollment: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return attempts.map(attempt => ({
      id: attempt.id,
      user: {
        id: attempt.user.id,
        email: attempt.user.email,
        fullName: `${attempt.user.first_name} ${attempt.user.last_name}`,
      },
      course: attempt.enrollment.course,
      attemptNumber: attempt.attempt_number,
      startTime: attempt.start_time,
      endTime: attempt.end_time,
      score: attempt.score ? parseFloat(attempt.score.toString()) : null,
      maxScore: attempt.max_score ? parseFloat(attempt.max_score.toString()) : null,
      passed: attempt.passed,
      status: attempt.status,
      timeSpent: attempt.time_spent,
    }));
  }

  async getAttemptDetails(attemptId: string, userId: string): Promise<any> {
    // Récupérer la tentative avec toutes les réponses
    const attempt = await this.prisma.quizAttempt.findFirst({
      where: {
        id: attemptId,
        quiz: {
          module: {
            course: {
              provider: {
                user_id: userId,
              },
            },
          },
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
        quiz: {
          include: {
            questions: {
              include: {
                answers: true,
              },
              orderBy: { order_index: 'asc' },
            },
          },
        },
        responses: {
          include: {
            question: true,
            answer: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Tentative non trouvée ou accès non autorisé');
    }

    // Formater les réponses avec détails
    const formattedResponses = attempt.responses.map(response => {
      const question = attempt.quiz.questions.find(q => q.id === response.question_id);
      return {
        questionId: response.question_id,
        questionText: question?.question_text,
        questionType: question?.question_type,
        selectedAnswer: response.answer ? {
          id: response.answer.id,
          text: response.answer.answer_text,
        } : null,
        responseText: response.response_text,
        isCorrect: response.is_correct,
        pointsEarned: response.points_earned ? parseFloat(response.points_earned.toString()) : 0,
        pointsPossible: question?.points || 1,
      };
    });

    return {
      id: attempt.id,
      user: {
        id: attempt.user.id,
        email: attempt.user.email,
        fullName: `${attempt.user.first_name} ${attempt.user.last_name}`,
      },
      quiz: {
        id: attempt.quiz.id,
        title: attempt.quiz.title,
        description: attempt.quiz.description,
        questionCount: attempt.quiz.questions.length,
      },
      attemptNumber: attempt.attempt_number,
      startTime: attempt.start_time,
      endTime: attempt.end_time,
      score: attempt.score ? parseFloat(attempt.score.toString()) : null,
      maxScore: attempt.max_score ? parseFloat(attempt.max_score.toString()) : null,
      passed: attempt.passed,
      status: attempt.status,
      timeSpent: attempt.time_spent,
      responses: formattedResponses,
    };
  }

  async getCourseQuizResults(courseId: string, userId: string): Promise<any> {
    // Vérifier l'accès au cours
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

    // Récupérer tous les quiz du cours avec les tentatives
    const quizzes = await this.prisma.quiz.findMany({
      where: {
        module: {
          course_id: courseId,
        },
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            order_index: true,
          },
        },
        attempts: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        module: {
          order_index: 'asc',
        },
      },
    });

    // Formater les résultats par quiz
    return quizzes.map(quiz => {
      const attempts = quiz.attempts;
      const completedAttempts = attempts.filter(a => a.status === 'completed');
      const passedAttempts = completedAttempts.filter(a => a.passed);
      
      const scores = completedAttempts
        .map(a => a.score ? parseFloat(a.score.toString()) : 0)
        .filter(s => s > 0);
      
      const averageScore = scores.length > 0 
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
        : 0;

      return {
        quizId: quiz.id,
        quizTitle: quiz.title,
        moduleTitle: quiz.module.title,
        moduleOrder: quiz.module.order_index,
        totalAttempts: attempts.length,
        completedAttempts: completedAttempts.length,
        passedAttempts: passedAttempts.length,
        averageScore: Math.round(averageScore * 100) / 100,
        passingScore: quiz.passing_score ? parseFloat(quiz.passing_score.toString()) : 70,
        students: attempts.reduce((acc, attempt) => {
          const studentId = attempt.user.id;
          if (!acc.find(s => s.id === studentId)) {
            const studentAttempts = attempts.filter(a => a.user.id === studentId);
            const bestAttempt = studentAttempts
              .filter(a => a.status === 'completed')
              .sort((a, b) => {
                const scoreA = a.score ? parseFloat(a.score.toString()) : 0;
                const scoreB = b.score ? parseFloat(b.score.toString()) : 0;
                return scoreB - scoreA;
              })[0];

            acc.push({
              id: studentId,
              email: attempt.user.email,
              fullName: `${attempt.user.first_name} ${attempt.user.last_name}`,
              attempts: studentAttempts.length,
              bestScore: bestAttempt?.score ? parseFloat(bestAttempt.score.toString()) : null,
              passed: bestAttempt?.passed || false,
              lastAttempt: studentAttempts[0].created_at,
            });
          }
          return acc;
        }, [] as any[]),
      };
    });
  }
}