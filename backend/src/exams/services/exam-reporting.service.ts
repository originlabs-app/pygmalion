import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ExamReportingService {
  constructor(private prisma: PrismaService) {}

  async getExamAttempts(examId: string, userId: string): Promise<any> {
    // Vérifier l'accès à l'examen
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
      throw new NotFoundException('Examen non trouvé ou accès non autorisé');
    }

    // Récupérer toutes les tentatives avec informations de sécurité
    const attempts = await this.prisma.examAttempt.findMany({
      where: { exam_id: examId },
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
        exam_session: {
          include: {
            security_events: {
              orderBy: { timestamp: 'asc' },
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
      securityInfo: {
        sessionId: attempt.exam_session?.id,
        proctoring: attempt.exam_session?.proctoring_enabled,
        webcam: attempt.exam_session?.webcam_required,
        lockdown: attempt.exam_session?.browser_lockdown,
        alertCount: attempt.exam_session?.security_events?.length || 0,
        suspended: false,
      },
    }));
  }

  async getExamAttemptDetails(attemptId: string, userId: string): Promise<any> {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        id: attemptId,
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
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        },
        exam: {
          include: {
            questions: {
              include: {
                answers: true,
              },
              orderBy: { order_index: 'asc' },
            },
            exam_config: true,
          },
        },
        responses: {
          include: {
            question: true,
            answer: true,
          },
        },
        exam_session: {
          include: {
            security_events: {
              orderBy: { timestamp: 'asc' },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException(
        'Tentative non trouvée ou accès non autorisé',
      );
    }

    // Formater les réponses
    const formattedResponses = attempt.responses.map((response) => {
      const question = attempt.exam.questions.find(
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
      exam: {
        id: attempt.exam.id,
        title: attempt.exam.title,
        description: attempt.exam.description,
        questionCount: attempt.exam.questions.length,
        securityConfig: attempt.exam.exam_config,
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
      session: attempt.exam_session
        ? {
            id: attempt.exam_session.id,
            clientIp: attempt.exam_session.client_ip,
            userAgent: attempt.exam_session.user_agent,
            proctoring: attempt.exam_session.proctoring_enabled,
            webcam: attempt.exam_session.webcam_required,
            lockdown: attempt.exam_session.browser_lockdown,
            startedAt: attempt.exam_session.started_at,
            endedAt: attempt.exam_session.ended_at,
            securityEvents: attempt.exam_session.security_events.map((e) => ({
              id: e.id,
              type: e.event_type,
              severity: e.severity,
              description: e.description,
              timestamp: e.timestamp,
            })),
          }
        : null,
    };
  }

  async getAttemptSecurityEvents(
    attemptId: string,
    userId: string,
  ): Promise<any> {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        id: attemptId,
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
      include: {
        exam_session: {
          include: {
            security_events: {
              orderBy: { timestamp: 'asc' },
            },
          },
        },
      },
    });

    if (!attempt || !attempt.exam_session) {
      throw new NotFoundException("Session d'examen non trouvée");
    }

    return {
      attemptId: attempt.id,
      sessionId: attempt.exam_session.id,
      sessionInfo: {
        clientIp: attempt.exam_session.client_ip,
        userAgent: attempt.exam_session.user_agent,
        screenResolution: attempt.exam_session.screen_resolution,
        timezone: attempt.exam_session.timezone,
        startedAt: attempt.exam_session.started_at,
        endedAt: attempt.exam_session.ended_at,
      },
      securitySettings: {
        proctoring: attempt.exam_session.proctoring_enabled,
        webcam: attempt.exam_session.webcam_required,
        lockdown: attempt.exam_session.browser_lockdown,
      },
      events: attempt.exam_session.security_events.map((event) => ({
        id: event.id,
        timestamp: event.timestamp,
        type: event.event_type,
        severity: event.severity,
        description: event.description,
        metadata: event.metadata,
      })),
      summary: {
        totalEvents: attempt.exam_session.security_events.length,
        highSeverity: attempt.exam_session.security_events.filter(
          (e) => e.severity === 'high',
        ).length,
        mediumSeverity: attempt.exam_session.security_events.filter(
          (e) => e.severity === 'medium',
        ).length,
        lowSeverity: attempt.exam_session.security_events.filter(
          (e) => e.severity === 'low',
        ).length,
      },
    };
  }
}