import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { SubmitExamAttemptDto, StartExamAttemptDto } from './dto/submit-exam-attempt.dto';
import { 
  ExamResponseDto, 
  ExamQuestionResponseDto, 
  ExamAnswerResponseDto,
  ExamConfigurationResponseDto 
} from './dto/exam-response.dto';
import { AttemptStatus } from '@prisma/client';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  private toExamAnswerResponse(entity: any): ExamAnswerResponseDto {
    return {
      id: entity.id,
      question_id: entity.question_id,
      answer_text: entity.answer_text,
      is_correct: entity.is_correct,
      order_index: entity.order_index,
      created_at: entity.created_at,
    };
  }

  private toExamQuestionResponse(entity: any): ExamQuestionResponseDto {
    return {
      id: entity.id,
      exam_id: entity.exam_id,
      question_text: entity.question_text,
      question_type: entity.question_type,
      points: entity.points,
      order_index: entity.order_index,
      explanation: entity.explanation,
      media_url: entity.media_url,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      answers: entity.answers?.map(answer => this.toExamAnswerResponse(answer)) || [],
    };
  }

  private toExamConfigResponse(entity: any): ExamConfigurationResponseDto {
    return {
      id: entity.id,
      exam_id: entity.exam_id,
      default_proctoring: entity.default_proctoring,
      default_webcam: entity.default_webcam,
      default_lockdown: entity.default_lockdown,
      default_ip_restriction: entity.default_ip_restriction,
      allowed_attempts: entity.allowed_attempts,
      time_limit_strict: entity.time_limit_strict,
      question_randomization: entity.question_randomization,
      answer_randomization: entity.answer_randomization,
      alert_threshold: entity.alert_threshold,
      auto_suspend: entity.auto_suspend,
      manual_review_required: entity.manual_review_required,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  private toExamResponse(entity: any): ExamResponseDto {
    return {
      id: entity.id,
      module_id: entity.module_id,
      title: entity.title,
      description: entity.description,
      time_limit: entity.time_limit,
      passing_score: entity.passing_score,
      shuffle_questions: entity.shuffle_questions,
      show_results: entity.show_results,
      generates_certificate: entity.generates_certificate,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
      questions: entity.questions?.map(question => this.toExamQuestionResponse(question)) || [],
      exam_config: entity.exam_config ? this.toExamConfigResponse(entity.exam_config) : undefined,
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

  async create(createDto: CreateExamDto, userId: string): Promise<ExamResponseDto> {
    await this.verifyModuleAccess(createDto.module_id, userId);

    // Validation des questions
    if (createDto.questions.length === 0) {
      throw new BadRequestException('Un examen doit contenir au moins une question');
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

    const exam = await this.prisma.exam.create({
      data: {
        module_id: createDto.module_id,
        title: createDto.title,
        description: createDto.description,
        time_limit: createDto.time_limit,
        passing_score: createDto.passing_score,
        shuffle_questions: createDto.shuffle_questions ?? true,
        show_results: createDto.show_results ?? false, // Par défaut, pas de feedback immédiat pour les examens
        generates_certificate: createDto.generates_certificate ?? true,
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
        ...(createDto.exam_config && {
          exam_config: {
            create: {
              default_proctoring: createDto.exam_config.default_proctoring ?? false,
              default_webcam: createDto.exam_config.default_webcam ?? false,
              default_lockdown: createDto.exam_config.default_lockdown ?? false,
              default_ip_restriction: createDto.exam_config.default_ip_restriction,
              allowed_attempts: createDto.exam_config.allowed_attempts ?? 1,
              time_limit_strict: createDto.exam_config.time_limit_strict ?? true,
              question_randomization: createDto.exam_config.question_randomization ?? true,
              answer_randomization: createDto.exam_config.answer_randomization ?? true,
              alert_threshold: createDto.exam_config.alert_threshold ?? 3,
              auto_suspend: createDto.exam_config.auto_suspend ?? false,
              manual_review_required: createDto.exam_config.manual_review_required ?? true,
            },
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
        exam_config: true,
      },
    });

    return this.toExamResponse(exam);
  }

  async findOne(id: string, userId: string): Promise<ExamResponseDto> {
    const exam = await this.prisma.exam.findFirst({
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
        exam_config: true,
      },
    });

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    return this.toExamResponse(exam);
  }

  async findByModule(moduleId: string, userId: string): Promise<ExamResponseDto[]> {
    await this.verifyModuleAccess(moduleId, userId);

    const exams = await this.prisma.exam.findMany({
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
        exam_config: true,
      },
    });

    return exams.map(exam => this.toExamResponse(exam));
  }

  async update(id: string, updateDto: UpdateExamDto, userId: string): Promise<ExamResponseDto> {
    const existingExam = await this.prisma.exam.findFirst({
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

    if (!existingExam) {
      throw new NotFoundException('Examen non trouvé');
    }

    // Pour une mise à jour complète avec questions, on supprime et recrée
    if (updateDto.questions) {
      // Supprimer les questions existantes
      await this.prisma.examQuestion.deleteMany({
        where: { exam_id: id },
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

    const updatedExam = await this.prisma.exam.update({
      where: { id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
        time_limit: updateDto.time_limit,
        passing_score: updateDto.passing_score,
        shuffle_questions: updateDto.shuffle_questions,
        show_results: updateDto.show_results,
        generates_certificate: updateDto.generates_certificate,
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
        ...(updateDto.exam_config && {
          exam_config: {
            upsert: {
              create: updateDto.exam_config,
              update: updateDto.exam_config,
            },
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
        exam_config: true,
      },
    });

    return this.toExamResponse(updatedExam);
  }

  async remove(id: string, userId: string): Promise<void> {
    const exam = await this.prisma.exam.findFirst({
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

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    await this.prisma.exam.delete({
      where: { id },
    });
  }

  async startAttempt(examId: string, startDto: StartExamAttemptDto, userId: string): Promise<any> {
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
    const sessionToken = this.generateSecureToken();
    
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

  async submitAttempt(submitDto: SubmitExamAttemptDto, userId: string): Promise<any> {
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

    const responses: any[] = [];

    for (const response of submitDto.responses) {
      const question = attempt.exam.questions.find(q => q.id === response.question_id);
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
    await this.prisma.examResponse.createMany({
      data: responses,
    });

    // Calculer le score final
    const finalScore = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = finalScore >= parseFloat(attempt.exam.passing_score.toString());

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

  private generateSecureToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  // Méthodes pour OF - Récupération des résultats d'examens
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
      securityInfo: {
        sessionId: attempt.exam_session?.id,
        proctoring: attempt.exam_session?.proctoring_enabled,
        webcam: attempt.exam_session?.webcam_required,
        lockdown: attempt.exam_session?.browser_lockdown,
        alertCount: attempt.exam_session?.security_events?.length || 0,
        suspended: attempt.exam_session?.security_events?.some(e => e.event_type === 'EXAM_SUSPENDED'),
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
      throw new NotFoundException('Tentative non trouvée ou accès non autorisé');
    }

    // Formater les réponses
    const formattedResponses = attempt.responses.map(response => {
      const question = attempt.exam.questions.find(q => q.id === response.question_id);
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
      maxScore: attempt.max_score ? parseFloat(attempt.max_score.toString()) : null,
      passed: attempt.passed,
      status: attempt.status,
      timeSpent: attempt.time_spent,
      responses: formattedResponses,
      session: attempt.exam_session ? {
        id: attempt.exam_session.id,
        clientIp: attempt.exam_session.client_ip,
        userAgent: attempt.exam_session.user_agent,
        proctoring: attempt.exam_session.proctoring_enabled,
        webcam: attempt.exam_session.webcam_required,
        lockdown: attempt.exam_session.browser_lockdown,
        startedAt: attempt.exam_session.started_at,
        endedAt: attempt.exam_session.ended_at,
        securityEvents: attempt.exam_session.security_events.map(e => ({
          id: e.id,
          type: e.event_type,
          severity: e.severity,
          description: e.description,
          timestamp: e.timestamp,
        })),
      } : null,
    };
  }

  async getCourseExamResults(courseId: string, userId: string): Promise<any> {
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
    return exams.map(exam => {
      const attempts = exam.attempts;
      const completedAttempts = attempts.filter(a => a.status === 'completed');
      const passedAttempts = completedAttempts.filter(a => a.passed);
      const suspiciousAttempts = attempts.filter(a => 
        a.exam_session?.security_events && a.exam_session.security_events.length > (exam.exam_config?.alert_threshold || 3)
      );
      
      const scores = completedAttempts
        .map(a => a.score ? parseFloat(a.score.toString()) : 0)
        .filter(s => s > 0);
      
      const averageScore = scores.length > 0 
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
        passingScore: exam.passing_score ? parseFloat(exam.passing_score.toString()) : 70,
        generatesCertificate: exam.generates_certificate,
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

            const totalAlerts = studentAttempts.reduce((sum, att) => 
              sum + (att.exam_session?.security_events?.length || 0), 0
            );

            acc.push({
              id: studentId,
              email: attempt.user.email,
              fullName: `${attempt.user.first_name} ${attempt.user.last_name}`,
              attempts: studentAttempts.length,
              bestScore: bestAttempt?.score ? parseFloat(bestAttempt.score.toString()) : null,
              passed: bestAttempt?.passed || false,
              lastAttempt: studentAttempts[0].created_at,
              securityAlerts: totalAlerts,
              requiresReview: totalAlerts > (exam.exam_config?.alert_threshold || 3),
            });
          }
          return acc;
        }, [] as any[]),
      };
    });
  }

  async getAttemptSecurityEvents(attemptId: string, userId: string): Promise<any> {
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
      throw new NotFoundException('Session d\'examen non trouvée');
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
      events: attempt.exam_session.security_events.map(event => ({
        id: event.id,
        timestamp: event.timestamp,
        type: event.event_type,
        severity: event.severity,
        description: event.description,
        metadata: event.metadata,
      })),
      summary: {
        totalEvents: attempt.exam_session.security_events.length,
        highSeverity: attempt.exam_session.security_events.filter(e => e.severity === 'high').length,
        mediumSeverity: attempt.exam_session.security_events.filter(e => e.severity === 'medium').length,
        lowSeverity: attempt.exam_session.security_events.filter(e => e.severity === 'low').length,
      },
    };
  }
}