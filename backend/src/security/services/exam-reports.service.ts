import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ExamReportFilterDto } from '../dto/security.dto';

@Injectable()
export class ExamReportsService {
  constructor(private prisma: PrismaService) {}

  async getExamReports(providerId: string, filters: ExamReportFilterDto) {
    const where: Prisma.ExamAttemptWhereInput = {
      exam: {
        module: {
          course: {
            provider_id: providerId,
          },
        },
      },
    };

    // Filtrer par période
    if (filters.period) {
      const now = new Date();
      let dateFrom: Date;

      switch (filters.period) {
        case 'week':
          dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'quarter':
          const quarterStart = Math.floor(now.getMonth() / 3) * 3;
          dateFrom = new Date(now.getFullYear(), quarterStart, 1);
          break;
        case 'year':
          dateFrom = new Date(now.getFullYear(), 0, 1);
          break;
        default:
          dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      where.created_at = {
        gte: dateFrom,
      };
    }

    if (filters.courseId && where.exam && where.exam.module) {
      where.exam.module.course_id = filters.courseId;
    }

    const attempts = await this.prisma.examAttempt.findMany({
      where,
      include: {
        exam: {
          include: {
            module: {
              include: {
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
            security_events: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: filters.limit || 50,
      skip: filters.offset || 0,
    });

    return attempts.map((attempt) => {
      const incidentCount = attempt.exam_session?.security_events?.length || 0;
      const criticalEvents =
        attempt.exam_session?.security_events?.filter(
          (e) => e.severity === 'high',
        ).length || 0;

      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (criticalEvents > 2 || incidentCount > 5) {
        riskLevel = 'high';
      } else if (criticalEvents > 0 || incidentCount > 2) {
        riskLevel = 'medium';
      }

      return {
        attemptId: attempt.id,
        examId: attempt.exam_id,
        examTitle: attempt.exam.title,
        moduleTitle: attempt.exam.module.title,
        course: attempt.exam.module.course.title,
        startTime: attempt.start_time,
        endTime: attempt.end_time,
        duration: attempt.time_spent,
        score: attempt.score ? parseFloat(attempt.score.toString()) : null,
        passed: attempt.passed,
        status: attempt.status,
        securityInfo: {
          incidentCount,
          criticalEvents,
          riskLevel,
          flagged: false, // TODO: Add suspicious_activity_detected to schema
          eventTypes:
            attempt.exam_session?.security_events?.map((e) => e.event_type) || [],
        },
      };
    });
  }

  async getSecurityStats(providerId: string, period = 'month') {
    const now = new Date();
    let dateFrom: Date;

    switch (period) {
      case 'week':
        dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarterStart = Math.floor(now.getMonth() / 3) * 3;
        dateFrom = new Date(now.getFullYear(), quarterStart, 1);
        break;
      case 'year':
        dateFrom = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Récupérer les statistiques
    const [totalExams, suspendedExams, securityEvents] = await Promise.all([
      this.prisma.examAttempt.count({
        where: {
          created_at: { gte: dateFrom },
          exam: {
            module: {
              course: {
                provider_id: providerId,
              },
            },
          },
        },
      }),
      this.prisma.examAttempt.count({
        where: {
          created_at: { gte: dateFrom },
          status: 'abandoned',
          exam: {
            module: {
              course: {
                provider_id: providerId,
              },
            },
          },
        },
      }),
      this.prisma.securityEvent.findMany({
        where: {
          timestamp: { gte: dateFrom },
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
        select: {
          event_type: true,
          severity: true,
        },
      }),
    ]);

    // Compter par type d'événement
    const eventsByType = securityEvents.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Compter par sévérité
    const eventsBySeverity = securityEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const suspensionRate = totalExams > 0 ? (suspendedExams / totalExams) * 100 : 0;

    return {
      period,
      dateFrom,
      dateTo: now,
      summary: {
        totalExams,
        suspendedExams,
        suspensionRate: Math.round(suspensionRate * 100) / 100,
        totalSecurityEvents: securityEvents.length,
        averageEventsPerExam:
          totalExams > 0
            ? Math.round((securityEvents.length / totalExams) * 100) / 100
            : 0,
      },
      eventsByType,
      eventsBySeverity,
      trends: {
        // TODO: Implémenter les tendances temporelles
        daily: [],
        weekly: [],
      },
    };
  }

  async exportReports(providerId: string, format: 'csv' | 'pdf' | 'excel', filters: ExamReportFilterDto) {
    // TODO: Implémenter l'export réel avec une bibliothèque comme puppeteer ou exceljs
    const reports = await this.getExamReports(providerId, filters);
    const filename = `security-report-${Date.now()}.${format}`;
    const url = `/exports/${filename}`;

    return {
      success: true,
      filename,
      url,
      format,
      recordCount: reports.length,
    };
  }
}