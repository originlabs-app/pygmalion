import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import { 
  CreateExamConfigDto, 
  UpdateExamConfigDto,
  SecurityEventFilterDto,
  ExamReportFilterDto,
  ValidateExamDto,
  CreateSecurityEventDto,
  StartExamSessionDto
} from './dto/security.dto';

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  // =================
  // Configuration des examens
  // =================

  async getExamConfiguration(examId: string) {
    return this.prisma.examConfiguration.findUnique({
      where: { exam_id: examId },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                    provider_id: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async createExamConfiguration(createConfigDto: CreateExamConfigDto) {
    // Vérifier que l'examen existe
    const exam = await this.prisma.exam.findUnique({
      where: { id: createConfigDto.exam_id },
      include: {
        module: {
          include: {
            course: true
          }
        }
      }
    });

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    return this.prisma.examConfiguration.create({
      data: createConfigDto,
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                    provider_id: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async updateExamConfiguration(id: string, updateConfigDto: UpdateExamConfigDto) {
    return this.prisma.examConfiguration.update({
      where: { id },
      data: {
        ...updateConfigDto,
        updated_at: new Date()
      },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                    provider_id: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async deleteExamConfiguration(id: string) {
    return this.prisma.examConfiguration.delete({
      where: { id }
    });
  }

  async verifyExamOwnership(examId: string, userId: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id: examId },
      include: {
        module: {
          include: {
            course: {
              select: {
                provider_id: true
              }
            }
          }
        }
      }
    });

    if (!exam) {
      throw new NotFoundException('Examen non trouvé');
    }

    if (exam.module.course.provider_id !== userId) {
      throw new ForbiddenException('Accès non autorisé à cet examen');
    }

    return exam;
  }

  async verifyConfigOwnership(configId: string, userId: string) {
    const config = await this.prisma.examConfiguration.findUnique({
      where: { id: configId },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    provider_id: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!config) {
      throw new NotFoundException('Configuration non trouvée');
    }

    if (config.exam.module.course.provider_id !== userId) {
      throw new ForbiddenException('Accès non autorisé à cette configuration');
    }

    return config;
  }

  // =================
  // Surveillance temps réel
  // =================

  async getActiveExams(providerId: string) {
    const activeAttempts = await this.prisma.examAttempt.findMany({
      where: {
        status: 'in_progress',
        exam: {
          module: {
            course: {
              provider_id: providerId
            }
          }
        }
      },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true
                  }
                }
              }
            }
          }
        },
        enrollment: {
          select: {
            id: true,
            user_id: true
          }
        },
        exam_session: {
          include: {
            security_events: {
              orderBy: {
                timestamp: 'desc'
              },
              take: 5
            }
          }
        }
      }
    });

    // Transformer les données pour le frontend
    return activeAttempts.map(attempt => {
      const incidentCount = attempt.exam_session?.security_events?.length || 0;
      const criticalEvents = attempt.exam_session?.security_events?.filter(e => e.severity === 'high').length || 0;
      
      // Calculer le niveau de risque
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (criticalEvents > 2 || incidentCount > 5) {
        riskLevel = 'high';
      } else if (criticalEvents > 0 || incidentCount > 2) {
        riskLevel = 'medium';
      }

      // Calculer le temps écoulé
      const startTime = new Date(attempt.start_time);
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60)); // en minutes

      return {
        id: attempt.id,
        student_name: `Utilisateur ${attempt.user_id.substring(0, 8)}`, // TODO: récupérer le vrai nom
        course: attempt.exam.module.course.title,
        start_time: startTime.toLocaleTimeString('fr-FR'),
        duration: 120, // TODO: récupérer la vraie durée du quiz
        elapsed,
        status: attempt.status,
        risk_level: riskLevel,
        incident_count: incidentCount,
        last_activity: `Question en cours`, // TODO: récupérer la vraie progression
        exam_session: attempt.exam_session
      };
    });
  }

  async getExamSession(examId: string, providerId: string) {
    const session = await this.prisma.examSession.findFirst({
      where: {
        exam_attempt_id: examId,
        exam_attempt: {
          exam: {
            module: {
              course: {
                provider_id: providerId
              }
            }
          }
        }
      },
      include: {
        security_events: {
          orderBy: {
            timestamp: 'desc'
          }
        },
        exam_attempt: {
          include: {
            exam: {
              include: {
                module: {
                  include: {
                    course: {
                      select: {
                        title: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!session) {
      throw new NotFoundException('Session d\'examen non trouvée');
    }

    return session;
  }

  async getSecurityEvents(providerId: string, filters: SecurityEventFilterDto) {
    const where: any = {
      exam_session: {
        exam_attempt: {
          exam: {
            module: {
              course: {
                provider_id: providerId
              }
            }
          }
        }
      }
    };

    if (filters.severity) {
      where.severity = filters.severity;
    }

    if (filters.event_type) {
      where.event_type = filters.event_type;
    }

    if (filters.resolved !== undefined) {
      where.auto_resolved = filters.resolved;
    }

    if (filters.exam_session_id) {
      where.exam_session_id = filters.exam_session_id;
    }

    if (filters.date_from || filters.date_to) {
      where.timestamp = {};
      if (filters.date_from) {
        where.timestamp.gte = new Date(filters.date_from);
      }
      if (filters.date_to) {
        where.timestamp.lte = new Date(filters.date_to);
      }
    }

    return this.prisma.securityEvent.findMany({
      where,
      include: {
        exam_session: {
          include: {
            exam_attempt: {
              select: {
                user_id: true,
                exam: {
                  select: {
                    module: {
                      select: {
                        course: {
                          select: {
                            title: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: filters.limit || 20
    });
  }

  async suspendExam(examId: string, reason: string, providerId: string) {
    // Vérifier que l'examen appartient au provider
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id: examId },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    provider_id: true
                  }
                }
              }
            }
          }
        },
        exam_session: true
      }
    });

    if (!attempt) {
      throw new NotFoundException('Tentative d\'examen non trouvée');
    }

    if (attempt.exam.module.course.provider_id !== providerId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    // Mettre à jour le statut
    const updatedAttempt = await this.prisma.examAttempt.update({
      where: { id: examId },
      data: {
        status: 'abandoned', // Utiliser le statut existant le plus proche
        end_time: new Date()
      }
    });

    // Enregistrer l'événement de suspension si une session existe
    if (attempt.exam_session?.id) {
      await this.prisma.securityEvent.create({
        data: {
          exam_session_id: attempt.exam_session.id,
          event_type: 'suspicious_behavior', // Utiliser un type existant
          description: `Examen suspendu par l'organisateur: ${reason}`,
          severity: 'high',
          timestamp: new Date(),
          metadata: {
            suspended_by: providerId,
            reason: reason,
            action: 'exam_suspended'
          },
          flagged_for_review: true
        }
      });
    }

    return updatedAttempt;
  }

  async resolveSecurityEvent(eventId: string, providerId: string) {
    // Vérifier que l'événement appartient au provider
    const event = await this.prisma.securityEvent.findUnique({
      where: { id: eventId },
      include: {
        exam_session: {
          include: {
            exam_attempt: {
              include: {
                exam: {
                  include: {
                    module: {
                      include: {
                        course: {
                          select: {
                            provider_id: true
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!event) {
      throw new NotFoundException('Événement non trouvé');
    }

    if (event.exam_session.exam_attempt?.exam.module.course.provider_id !== providerId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    return this.prisma.securityEvent.update({
      where: { id: eventId },
      data: {
        auto_resolved: true,
        flagged_for_review: false
      }
    });
  }

  // =================
  // Rapports et statistiques
  // =================

  async getExamReports(providerId: string, filters: ExamReportFilterDto) {
    const where: any = {
      quiz: {
        module: {
          course: {
            provider_id: providerId
          }
        }
      }
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
        gte: dateFrom
      };
    }

    if (filters.courseId) {
      where.quiz.module.course_id = filters.courseId;
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
                    title: true
                  }
                }
              }
            }
          }
        },
        exam_session: {
          include: {
            security_events: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      },
      take: filters.limit || 50,
      skip: filters.offset || 0
    });

    return attempts.map(attempt => {
      const incidentCount = attempt.exam_session?.security_events?.length || 0;
      const criticalEvents = attempt.exam_session?.security_events?.filter(e => e.severity === 'high').length || 0;
      
      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      if (criticalEvents > 2 || incidentCount > 5) {
        riskLevel = 'high';
      } else if (criticalEvents > 0 || incidentCount > 2) {
        riskLevel = 'medium';
      }

      let status: 'passed' | 'failed' | 'suspended' | 'under_review' = 'passed';
      if (attempt.status === 'abandoned') {
        status = 'suspended';
      } else if (incidentCount > 3) {
        status = 'under_review';
      } else if (attempt.passed === false) {
        status = 'failed';
      }

      return {
        id: attempt.id,
        student_name: `Utilisateur ${attempt.user_id.substring(0, 8)}`,
        course: attempt.exam.module.course.title,
        date: attempt.created_at.toISOString().split('T')[0],
        duration: attempt.time_spent ? `${Math.floor(attempt.time_spent / 60)}min` : 'N/A',
        score: attempt.score ? Math.round(parseFloat(attempt.score.toString())) : 0,
        status,
        incident_count: incidentCount,
        risk_level: riskLevel,
        security_events: attempt.exam_session?.security_events?.map(e => e.event_type) || []
      };
    });
  }

  async getSecurityStats(providerId: string, period: string = 'month') {
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

    const where = {
      quiz: {
        module: {
          course: {
            provider_id: providerId
          }
        }
      },
      created_at: {
        gte: dateFrom
      }
    };

    // Compter les examens
    const totalExams = await this.prisma.examAttempt.count({ where });
    
    const securedExams = await this.prisma.examAttempt.count({
      where: {
        ...where,
        exam_session: {
          isNot: null
        }
      }
    });

    const passedExams = await this.prisma.examAttempt.count({
      where: {
        ...where,
        passed: true
      }
    });

    // Compter les incidents
    const securityIncidents = await this.prisma.securityEvent.count({
      where: {
        exam_session: {
          exam_attempt: {
            exam: {
              module: {
                course: {
                  provider_id: providerId
                }
              }
            }
          }
        },
        timestamp: {
          gte: dateFrom
        }
      }
    });

    const suspiciousAttempts = await this.prisma.securityEvent.count({
      where: {
        exam_session: {
          exam_attempt: {
            exam: {
              module: {
                course: {
                  provider_id: providerId
                }
              }
            }
          }
        },
        timestamp: {
          gte: dateFrom
        },
        flagged_for_review: true
      }
    });

    // Calculer le score moyen
    const avgScoreResult = await this.prisma.examAttempt.aggregate({
      where: {
        ...where,
        score: {
          not: null
        }
      },
      _avg: {
        score: true
      }
    });

    return {
      total_exams: totalExams,
      secured_exams: securedExams,
      security_incidents: securityIncidents,
      suspicious_attempts: suspiciousAttempts,
      pass_rate: totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0,
      average_score: avgScoreResult._avg.score ? Math.round(parseFloat(avgScoreResult._avg.score.toString())) : 0
    };
  }

  async exportReports(providerId: string, format: 'pdf' | 'excel', filters: any) {
    // TODO: Implémenter l'export réel avec une bibliothèque comme puppeteer ou exceljs
    const filename = `security-report-${Date.now()}.${format}`;
    const url = `/exports/${filename}`;

    // Pour l'instant, retourner un mock
    return {
      filename,
      url
    };
  }

  async validateExamResult(examId: string, validateDto: ValidateExamDto, providerId: string) {
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id: examId },
      include: {
        exam: {
          include: {
            module: {
              include: {
                course: {
                  select: {
                    provider_id: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!attempt) {
      throw new NotFoundException('Tentative d\'examen non trouvée');
    }

    if (attempt.exam.module.course.provider_id !== providerId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    // Mettre à jour le statut en fonction de la décision
    const newStatus = validateDto.decision === 'approve' ? 'completed' : 'abandoned';
    const passed = validateDto.decision === 'approve' ? true : false;

    return this.prisma.examAttempt.update({
      where: { id: examId },
      data: {
        status: newStatus,
        passed: passed
      }
    });
  }

  // =================
  // APIs pour étudiants
  // =================

  async startSecureExam(examAttemptId: string, userId: string, sessionData: StartExamSessionDto) {
    // Vérifier que la tentative appartient à l'utilisateur
    const attempt = await this.prisma.examAttempt.findUnique({
      where: { id: examAttemptId },
      include: {
        exam: {
          include: {
            exam_config: true
          }
        }
      }
    });

    if (!attempt) {
      throw new NotFoundException('Tentative d\'examen non trouvée');
    }

    if (attempt.user_id !== userId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    // Créer la session sécurisée
    const examSession = await this.prisma.examSession.create({
      data: {
        exam_attempt_id: examAttemptId,
        proctoring_enabled: attempt.exam.exam_config?.default_proctoring || false,
        webcam_required: attempt.exam.exam_config?.default_webcam || false,
        browser_lockdown: attempt.exam.exam_config?.default_lockdown || false,
        ip_restriction: attempt.exam.exam_config?.default_ip_restriction,
        copy_paste_blocked: true,
        right_click_disabled: true,
        tab_switching_blocked: true,
        session_token: randomUUID(),
        client_ip: sessionData.client_ip,
        user_agent: sessionData.user_agent,
        screen_resolution: sessionData.screen_resolution,
        timezone: sessionData.timezone,
        webcam_snapshot: sessionData.webcam_snapshot,
        identity_verified: !!sessionData.webcam_snapshot,
        started_at: new Date()
      }
    });

    return examSession;
  }

  async recordSecurityEvent(eventData: CreateSecurityEventDto, userId: string) {
    // Vérifier que la session appartient à l'utilisateur
    const session = await this.prisma.examSession.findUnique({
      where: { id: eventData.exam_session_id },
      include: {
        exam_attempt: true
      }
    });

    if (!session) {
      throw new NotFoundException('Session d\'examen non trouvée');
    }

    if (session.exam_attempt?.user_id !== userId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    return this.prisma.securityEvent.create({
      data: {
        exam_session_id: eventData.exam_session_id,
        event_type: eventData.event_type as any, // Cast temporaire pour les types personnalisés
        description: eventData.description,
        severity: eventData.severity || 'medium',
        timestamp: new Date(),
        metadata: eventData.metadata,
        flagged_for_review: eventData.severity === 'high'
      }
    });
  }

  async endSecureExam(examSessionId: string, userId: string) {
    const session = await this.prisma.examSession.findUnique({
      where: { id: examSessionId },
      include: {
        exam_attempt: true
      }
    });

    if (!session) {
      throw new NotFoundException('Session d\'examen non trouvée');
    }

    if (session.exam_attempt?.user_id !== userId) {
      throw new ForbiddenException('Accès non autorisé');
    }

    return this.prisma.examSession.update({
      where: { id: examSessionId },
      data: {
        ended_at: new Date()
      }
    });
  }
}