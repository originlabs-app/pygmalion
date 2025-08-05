import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AttemptStatus } from '@prisma/client';
import { SubmitQuizAttemptDto } from '@/quizzes/dto/submit-quiz-attempt.dto';

@Injectable()
export class QuizAttemptService {
  constructor(private prisma: PrismaService) {}

  async startAttempt(
    quizId: string,
    enrollmentId: string,
    userId: string,
  ): Promise<unknown> {
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

  async submitAttempt(
    submitDto: SubmitQuizAttemptDto,
    userId: string,
  ): Promise<unknown> {
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

    const responses: Array<{
      attempt_id: string;
      question_id: string;
      answer_id?: string;
      response_text?: string;
      is_correct: boolean;
      points_earned: number;
    }> = [];

    for (const response of submitDto.responses) {
      const question = attempt.quiz.questions.find(
        (q) => q.id === response.question_id,
      );
      if (!question) continue;

      totalPoints += question.points;

      let isCorrect = false;
      let pointsEarned = 0;

      if (response.answer_id) {
        const answer = question.answers.find(
          (a) => a.id === response.answer_id,
        );
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
    const passed =
      finalScore >= parseFloat(attempt.quiz.passing_score.toString());

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
}
