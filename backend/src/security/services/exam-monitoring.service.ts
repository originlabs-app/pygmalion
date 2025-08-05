import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma, ExamSession, SecurityEvent } from '@prisma/client';
import { SecurityEventFilterDto } from '@/security/dto/security.dto';

@Injectable()
export class ExamMonitoringService {
  constructor(private prisma: PrismaService) {}

  async getActiveExams(providerId: string) {
    const activeAttempts = await this.prisma.examAttempt.findMany({
      where: {
        status: 'in_progress',
        exam: {
          module: {
            course: {
              provider_id: providerId,
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
          select: {
            id: true,
            title: true,
            module: {
              select: {
                title: true,
                course: {
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
        exam_session: {
          include: {
            security_events: {
              orderBy: { timestamp: 'desc' },
              take: 5,
            },
          },
        },
      },
      orderBy: {
        start_time: 'desc',
      },
    });

    return activeAttempts.map((attempt) => ({
      attemptId: attempt.id,
      examId: attempt.exam.id,
      examTitle: attempt.exam.title,
      moduleTitle: attempt.exam.module.title,
      courseTitle: attempt.exam.module.course.title,
      student: {
        id: attempt.user.id,
        email: attempt.user.email,
        fullName: `${attempt.user.first_name} ${attempt.user.last_name}`,
      },
      startTime: attempt.start_time,
      elapsedTime: Math.floor(
        (Date.now() - new Date(attempt.start_time).getTime()) / 1000,
      ),
      session: attempt.exam_session
        ? {
            id: attempt.exam_session.id,
            clientIp: attempt.exam_session.client_ip,
            proctoring: attempt.exam_session.proctoring_enabled,
            webcam: attempt.exam_session.webcam_required,
            lockdown: attempt.exam_session.browser_lockdown,
            recentEvents: attempt.exam_session.security_events,
            totalEvents: attempt.exam_session.security_events.length,
          }
        : null,
      riskLevel: this.calculateRiskLevel(attempt.exam_session),
    }));
  }

  async getExamSession(examId: string, providerId: string) {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        exam_id: examId,
        status: 'in_progress',
        exam: {
          module: {
            course: {
              provider_id: providerId,
            },
          },
        },
      },
      include: {
        exam_session: {
          include: {
            security_events: {
              orderBy: { timestamp: 'desc' },
            },
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Aucune session active pour cet examen');
    }

    return attempt.exam_session;
  }

  async getSecurityEvents(providerId: string, filters: SecurityEventFilterDto) {
    const where: Prisma.SecurityEventWhereInput = {
      exam_session: {
        exam_attempt: {
          exam: {
            module: {
              course: {
                provider_id: providerId,
              },
            },
          },
        },
      },
    };

    if (filters.exam_id && where.exam_session) {
      where.exam_session = {
        exam_attempt: {
          exam_id: filters.exam_id,
          exam: {
            module: {
              course: {
                provider_id: providerId,
              },
            },
          },
        },
      };
    }

    if (filters.severity) {
      where.severity = filters.severity;
    }

    if (filters.event_type) {
      where.event_type = filters.event_type as any;
    }

    if (filters.resolved !== undefined) {
      where.auto_resolved = filters.resolved;
    }

    const events = await this.prisma.securityEvent.findMany({
      where,
      include: {
        exam_session: {
          include: {
            exam_attempt: {
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
                  select: {
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: filters.limit || 100,
      skip: filters.offset || 0,
    });

    return events.map((event) => ({
      id: event.id,
      timestamp: event.timestamp,
      eventType: event.event_type,
      severity: event.severity,
      description: event.description,
      metadata: event.metadata,
      flaggedForReview: event.flagged_for_review,
      autoResolved: event.auto_resolved,
      resolvedAt: null, // TODO: Add resolved_at field to schema
      exam: event.exam_session.exam_attempt
        ? {
            id: event.exam_session.exam_attempt.exam_id,
            title: event.exam_session.exam_attempt.exam.title,
          }
        : null,
      student: event.exam_session.exam_attempt
        ? {
            id: event.exam_session.exam_attempt.user.id,
            email: event.exam_session.exam_attempt.user.email,
            fullName: `${event.exam_session.exam_attempt.user.first_name} ${event.exam_session.exam_attempt.user.last_name}`,
          }
        : null,
    }));
  }

  async suspendExam(examId: string, reason: string, providerId: string) {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        exam_id: examId,
        status: 'in_progress',
        exam: {
          module: {
            course: {
              provider_id: providerId,
            },
          },
        },
      },
      include: {
        exam_session: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Aucune tentative active trouvée');
    }

    if (!attempt.exam_session) {
      throw new BadRequestException("Aucune session d'examen active");
    }

    // Créer un événement de suspension
    await this.prisma.securityEvent.create({
      data: {
        exam_session_id: attempt.exam_session.id,
        event_type: 'tab_switch',
        severity: 'high',
        description: `Examen suspendu par l'administrateur: ${reason}`,
        timestamp: new Date(),
        flagged_for_review: true,
      },
    });

    // Mettre à jour le statut de la tentative
    await this.prisma.examAttempt.update({
      where: { id: attempt.id },
      data: {
        status: 'abandoned',
        end_time: new Date(),
      },
    });

    // Fermer la session
    await this.prisma.examSession.update({
      where: { id: attempt.exam_session.id },
      data: {
        ended_at: new Date(),
      },
    });

    return {
      success: true,
      message: 'Examen suspendu avec succès',
      attemptId: attempt.id,
      sessionId: attempt.exam_session.id,
    };
  }

  async resolveSecurityEvent(eventId: string, providerId: string) {
    const event = await this.prisma.securityEvent.findFirst({
      where: {
        id: eventId,
        exam_session: {
          exam_attempt: {
            exam: {
              module: {
                course: {
                  provider_id: providerId,
                },
              },
            },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Événement non trouvé ou accès non autorisé');
    }

    return this.prisma.securityEvent.update({
      where: { id: eventId },
      data: {
        auto_resolved: true,
        flagged_for_review: false,
      },
    });
  }

  private calculateRiskLevel(
    session: (ExamSession & { security_events?: SecurityEvent[] }) | null,
  ): 'low' | 'medium' | 'high' {
    if (!session || !session.security_events) return 'low';

    const highSeverityCount = session.security_events.filter(
      (e) => e.severity === 'high',
    ).length;
    const totalEvents = session.security_events.length;

    if (highSeverityCount > 2 || totalEvents > 10) return 'high';
    if (highSeverityCount > 0 || totalEvents > 5) return 'medium';
    return 'low';
  }
}
