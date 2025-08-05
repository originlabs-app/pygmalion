import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { randomUUID } from 'crypto';
import {
  ValidateExamDto,
  CreateSecurityEventDto,
  StartExamSessionDto,
} from '@/security/dto/security.dto';

@Injectable()
export class ExamSessionService {
  constructor(private prisma: PrismaService) {}

  async startSecureExam(
    examId: string,
    sessionData: StartExamSessionDto,
    userId: string,
  ) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
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
      throw new ForbiddenException("Vous n'êtes pas inscrit à ce cours");
    }

    const examConfig = await this.prisma.examConfiguration.findUnique({
      where: { exam_id: examId },
    });

    const sessionId = randomUUID();

    return {
      sessionId,
      examId,
      config: {
        proctoring: examConfig?.default_proctoring || false,
        webcam: examConfig?.default_webcam || false,
        lockdown: examConfig?.default_lockdown || false,
        ipRestriction: examConfig?.default_ip_restriction || null,
      },
      startTime: new Date(),
    };
  }

  async recordSecurityEvent(eventData: CreateSecurityEventDto, userId: string) {
    const session = await this.prisma.examSession.findFirst({
      where: {
        id: eventData.exam_session_id,
        exam_attempt: {
          user_id: userId,
        },
      },
      include: {
        exam_attempt: true,
      },
    });

    if (!session) {
      throw new NotFoundException("Session d'examen non trouvée");
    }

    if (session.exam_attempt?.user_id !== userId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    return this.prisma.securityEvent.create({
      data: {
        exam_session_id: eventData.exam_session_id,
        event_type: eventData.event_type as any,
        description: eventData.description,
        severity: eventData.severity || 'medium',
        timestamp: new Date(),
        metadata: (eventData.metadata || {}) as any,
        flagged_for_review: eventData.severity === 'high',
      },
    });
  }

  async endSecureExam(examSessionId: string, userId: string) {
    const session = await this.prisma.examSession.findFirst({
      where: {
        id: examSessionId,
        exam_attempt: {
          user_id: userId,
        },
      },
      include: {
        security_events: true,
      },
    });

    if (!session) {
      throw new NotFoundException("Session d'examen non trouvée");
    }

    const highSeverityEvents = session.security_events.filter(
      (e) => e.severity === 'high',
    ).length;

    return this.prisma.examSession.update({
      where: { id: examSessionId },
      data: {
        ended_at: new Date(),
      },
    });
  }

  async validateExamResult(validateDto: ValidateExamDto, providerId: string) {
    const attempt = await this.prisma.examAttempt.findFirst({
      where: {
        id: validateDto.attemptId,
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
            security_events: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException(
        'Tentative non trouvée ou accès non autorisé',
      );
    }

    const securityReport = {
      totalEvents: attempt.exam_session?.security_events?.length || 0,
      highSeverityEvents:
        attempt.exam_session?.security_events?.filter(
          (e) => e.severity === 'high',
        ).length || 0,
      flaggedEvents:
        attempt.exam_session?.security_events?.filter(
          (e) => e.flagged_for_review,
        ).length || 0,
    };

    const isValid =
      validateDto.decision === 'validate' &&
      securityReport.highSeverityEvents === 0;

    // TODO: Add validation fields to schema
    // For now, we'll store the validation result separately

    return {
      attemptId: validateDto.attemptId,
      decision: validateDto.decision,
      isValid,
      securityReport,
      comment: validateDto.comment,
    };
  }
}
