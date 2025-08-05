import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ExamStatisticsService {
  constructor(private prisma: PrismaService) {}

  async getCourseExamResults(
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

    // Récupérer tous les examens du cours
    const exams = await this.prisma.exam.findMany({
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
        exam_config: true,
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
            exam_session: {
              include: {
                security_events: true,
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

    // Formater les résultats par examen
    return exams.map((exam) => {
      const attempts = exam.attempts;
      const completedAttempts = attempts.filter(
        (a) => a.status === 'completed',
      );
      const passedAttempts = completedAttempts.filter((a) => a.passed);
      const suspiciousAttempts = attempts.filter(
        (a) =>
          a.exam_session?.security_events &&
          a.exam_session.security_events.length >
            (exam.exam_config?.alert_threshold || 3),
      );

      const scores = completedAttempts
        .map((a) => (a.score ? parseFloat(a.score.toString()) : 0))
        .filter((s) => s > 0);

      const averageScore =
        scores.length > 0
          ? scores.reduce((sum, score) => sum + score, 0) / scores.length
          : 0;

      return {
        examId: exam.id,
        examTitle: exam.title,
        moduleTitle: exam.module.title,
        moduleOrder: exam.module.order_index,
        securityEnabled: {
          proctoring: exam.exam_config?.default_proctoring || false,
          webcam: exam.exam_config?.default_webcam || false,
          lockdown: exam.exam_config?.default_lockdown || false,
        },
        totalAttempts: attempts.length,
        completedAttempts: completedAttempts.length,
        passedAttempts: passedAttempts.length,
        suspiciousAttempts: suspiciousAttempts.length,
        averageScore: Math.round(averageScore * 100) / 100,
        passingScore: exam.passing_score
          ? parseFloat(exam.passing_score.toString())
          : 70,
        generatesCertificate: exam.generates_certificate,
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

              const totalAlerts = studentAttempts.reduce(
                (sum, att) =>
                  sum + (att.exam_session?.security_events?.length || 0),
                0,
              );

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
                securityAlerts: totalAlerts,
                requiresReview:
                  totalAlerts > (exam.exam_config?.alert_threshold || 3),
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
            securityAlerts: number;
            requiresReview: boolean;
          }>,
        ),
      };
    });
  }
}
