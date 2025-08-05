import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AttemptStatus, ExamAttempt, ExamSession } from '@prisma/client';
import {
  StartExamAttemptDto,
  SubmitExamAttemptDto,
} from '../dto/submit-exam-attempt.dto';
import { ExamValidationService } from './exam-validation.service';

export interface ExamAttemptWithSession extends ExamAttempt {
  exam_session: ExamSession | null;
}

export interface StartAttemptResponse extends ExamAttemptWithSession {
  session_token: string;
  time_limit: number;
  security_config: {
    proctoring_enabled: boolean;
    webcam_required: boolean;
    browser_lockdown: boolean;
  };
}

@Injectable()
export class ExamAttemptService {
  constructor(
    private prisma: PrismaService,
    private validationService: ExamValidationService,
  ) {}

  async startAttempt(
    examId: string,
    startDto: StartExamAttemptDto,
    userId: string,
  ): Promise<StartAttemptResponse> {
    // Vérifier que l'utilisateur est inscrit au cours
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        id: startDto.enrollment_id,
        user_id: userId,
        course: {
          modules: {
            some: {
              exams: {
                some: { id: examId },
              },
            },
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Inscription non trouvée');
    }

    // Récupérer la configuration de l'examen
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: { exam_config: true },
    });

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    // Vérifier le nombre de tentatives
    const existingAttempts = await this.prisma.examAttempt.count({
      where: {
        exam_id: examId,
        user_id: userId,
      },
    });

    const allowedAttempts = exam.exam_config?.allowed_attempts ?? 1;
    if (existingAttempts >= allowedAttempts) {
      throw new ForbiddenException('Nombre maximum de tentatives atteint');
    }

    // Créer une session d'examen sécurisée
    const sessionToken = this.validationService.generateSecureToken();

    // Créer une nouvelle tentative
    const attempt = await this.prisma.examAttempt.create({
      data: {
        exam_id: examId,
        user_id: userId,
        enrollment_id: startDto.enrollment_id,
        attempt_number: existingAttempts + 1,
        start_time: new Date(),
        status: AttemptStatus.in_progress,
        max_score: 100, // Sera calculé selon les points des questions
        exam_session: {
          create: {
            session_token: sessionToken,
            client_ip: startDto.client_ip,
            user_agent: startDto.user_agent,
            screen_resolution: startDto.screen_resolution,
            timezone: startDto.timezone,
            proctoring_enabled: exam.exam_config?.default_proctoring ?? false,
            webcam_required: exam.exam_config?.default_webcam ?? false,
            browser_lockdown: exam.exam_config?.default_lockdown ?? false,
            started_at: new Date(),
          },
        },
      },
      include: {
        exam_session: true,
      },
    });

    return {
      ...attempt,
      session_token: sessionToken,
      time_limit: exam.time_limit,
      security_config: {
        proctoring_enabled: exam.exam_config?.default_proctoring ?? false,
        webcam_required: exam.exam_config?.default_webcam ?? false,
        browser_lockdown: exam.exam_config?.default_lockdown ?? false,
      },
    };
  }

  async submitAttempt(
    submitDto: SubmitExamAttemptDto,
    userId: string,
  ): Promise<ExamAttempt> {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        exam_id: submitDto.exam_id,
        enrollment_id: submitDto.enrollment_id,
        user_id: userId,
        status: AttemptStatus.in_progress,
      },
      include: {
        exam: {
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
      const question = attempt.exam.questions.find(
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
    await this.prisma.examResponse.createMany({
      data: responses,
    });

    // Calculer le score final
    const finalScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed =
      finalScore >= parseFloat(attempt.exam.passing_score.toString());

    // Mettre à jour la tentative
    const completedAttempt = await this.prisma.examAttempt.update({
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

    // Fermer la session d'examen
    await this.prisma.examSession.updateMany({
      where: { exam_attempt_id: attempt.id },
      data: { ended_at: new Date() },
    });

    // Générer un certificat si l'examen est réussi et génère des certificats
    if (passed && attempt.exam.generates_certificate) {
      // Logique de génération de certificat (à implémenter selon vos besoins)
    }

    return completedAttempt;
  }
}