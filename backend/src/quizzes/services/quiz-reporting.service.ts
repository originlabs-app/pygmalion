import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class QuizReportingService {
  constructor(private prisma: PrismaService) {}

  async getQuizAttempts(quizId: string, userId: string): Promise<unknown> {
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

    return attempts.map((attempt) => ({
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
      maxScore: attempt.max_score
        ? parseFloat(attempt.max_score.toString())
        : null,
      passed: attempt.passed,
      status: attempt.status,
      timeSpent: attempt.time_spent,
    }));
  }

  async getAttemptDetails(attemptId: string, userId: string): Promise<unknown> {
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
      throw new NotFoundException(
        'Tentative non trouvée ou accès non autorisé',
      );
    }

    // Formater les réponses avec détails
    const formattedResponses = attempt.responses.map((response) => {
      const question = attempt.quiz.questions.find(
        (q) => q.id === response.question_id,
      );
      return {
        questionId: response.question_id,
        questionText: question?.question_text,
        questionType: question?.question_type,
        selectedAnswer: response.answer
          ? {
              id: response.answer.id,
              text: response.answer.answer_text,
            }
          : null,
        responseText: response.response_text,
        isCorrect: response.is_correct,
        pointsEarned: response.points_earned
          ? parseFloat(response.points_earned.toString())
          : 0,
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
      maxScore: attempt.max_score
        ? parseFloat(attempt.max_score.toString())
        : null,
      passed: attempt.passed,
      status: attempt.status,
      timeSpent: attempt.time_spent,
      responses: formattedResponses,
    };
  }

  async getCourseQuizResults(
    courseId: string,
    userId: string,
  ): Promise<unknown> {
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
    return quizzes.map((quiz) => {
      const attempts = quiz.attempts;
      const completedAttempts = attempts.filter(
        (a) => a.status === 'completed',
      );
      const passedAttempts = completedAttempts.filter((a) => a.passed);

      const scores = completedAttempts
        .map((a) => (a.score ? parseFloat(a.score.toString()) : 0))
        .filter((s) => s > 0);

      const averageScore =
        scores.length > 0
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
        passingScore: quiz.passing_score
          ? parseFloat(quiz.passing_score.toString())
          : 70,
        students: attempts.reduce(
          (acc, attempt) => {
            const studentId = attempt.user.id;
            if (!acc.find((s) => s.id === studentId)) {
              const studentAttempts = attempts.filter(
                (a) => a.user.id === studentId,
              );
              const bestAttempt = studentAttempts
                .filter((a) => a.status === 'completed')
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
                bestScore: bestAttempt?.score
                  ? parseFloat(bestAttempt.score.toString())
                  : null,
                passed: bestAttempt?.passed || false,
                lastAttempt: studentAttempts[0].created_at,
              });
            }
            return acc;
          },
          [] as Array<{
            id: string;
            email: string;
            fullName: string;
            attempts: number;
            bestScore: number | null;
            passed: boolean;
            lastAttempt: Date;
          }>,
        ),
      };
    });
  }
}
