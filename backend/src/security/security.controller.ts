import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch,
  Delete,
  Body, 
  Param, 
  Query, 
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { SecurityService } from './security.service';
import { 
  CreateExamConfigDto, 
  UpdateExamConfigDto,
  SecurityEventFilterDto,
  ExamReportFilterDto,
  ValidateExamDto
} from './dto/security.dto';

@Controller('api/security')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  // =================
  // Configuration des examens
  // =================

  @Get('config/:examId')
  @Roles(UserRole.training_org, UserRole.admin)
  async getExamConfiguration(
    @Param('examId') examId: string,
    @CurrentUser() user: any
  ) {
    try {
      const config = await this.securityService.getExamConfiguration(examId);
      return config;
    } catch (error) {
      throw new HttpException('Configuration non trouvée', HttpStatus.NOT_FOUND);
    }
  }

  @Post('config')
  @Roles(UserRole.training_org, UserRole.admin)
  async createExamConfiguration(
    @Body() createConfigDto: CreateExamConfigDto,
    @CurrentUser() user: any
  ) {
    try {
      // Vérifier que l'utilisateur possède l'examen
      await this.securityService.verifyExamOwnership(createConfigDto.exam_id, user.id);
      
      const config = await this.securityService.createExamConfiguration(createConfigDto);
      return config;
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé à ce quiz', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la création', HttpStatus.BAD_REQUEST);
    }
  }

  @Put('config/:id')
  @Roles(UserRole.training_org, UserRole.admin)
  async updateExamConfiguration(
    @Param('id') id: string,
    @Body() updateConfigDto: UpdateExamConfigDto,
    @CurrentUser() user: any
  ) {
    try {
      // Vérifier la propriété
      await this.securityService.verifyConfigOwnership(id, user.id);
      
      const config = await this.securityService.updateExamConfiguration(id, updateConfigDto);
      return config;
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la mise à jour', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('config/:id')
  @Roles(UserRole.training_org, UserRole.admin)
  async deleteExamConfiguration(
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.securityService.verifyConfigOwnership(id, user.id);
      await this.securityService.deleteExamConfiguration(id);
      return { message: 'Configuration supprimée avec succès' };
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la suppression', HttpStatus.BAD_REQUEST);
    }
  }

  // =================
  // Surveillance temps réel
  // =================

  @Get('monitoring/active')
  @Roles(UserRole.training_org, UserRole.admin)
  async getActiveExams(@CurrentUser() user: any) {
    try {
      const activeExams = await this.securityService.getActiveExams(user.id);
      return activeExams;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des examens actifs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('monitoring/session/:examId')
  @Roles(UserRole.training_org, UserRole.admin)
  async getExamSession(
    @Param('examId') examId: string,
    @CurrentUser() user: any
  ) {
    try {
      const session = await this.securityService.getExamSession(examId, user.id);
      return session;
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Session non trouvée', HttpStatus.NOT_FOUND);
    }
  }

  @Get('monitoring/events')
  @Roles(UserRole.training_org, UserRole.admin)
  async getSecurityEvents(
    @Query() filters: SecurityEventFilterDto,
    @CurrentUser() user: any
  ) {
    try {
      const events = await this.securityService.getSecurityEvents(user.id, filters);
      return events;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des événements', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('monitoring/suspend/:examId')
  @Roles(UserRole.training_org, UserRole.admin)
  async suspendExam(
    @Param('examId') examId: string,
    @Body('reason') reason: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.securityService.suspendExam(examId, reason, user.id);
      return { message: 'Examen suspendu avec succès' };
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la suspension', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('monitoring/events/:eventId/resolve')
  @Roles(UserRole.training_org, UserRole.admin)
  async resolveSecurityEvent(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.securityService.resolveSecurityEvent(eventId, user.id);
      return { message: 'Événement résolu avec succès' };
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la résolution', HttpStatus.BAD_REQUEST);
    }
  }

  // =================
  // Rapports et statistiques
  // =================

  @Get('reports')
  @Roles(UserRole.training_org, UserRole.admin)
  async getExamReports(
    @Query() filters: ExamReportFilterDto,
    @CurrentUser() user: any
  ) {
    try {
      const reports = await this.securityService.getExamReports(user.id, filters);
      return reports;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des rapports', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('reports/stats')
  @Roles(UserRole.training_org, UserRole.admin)
  async getSecurityStats(
    @Query('period') period: string = 'month',
    @CurrentUser() user: any
  ) {
    try {
      const stats = await this.securityService.getSecurityStats(user.id, period);
      return stats;
    } catch (error) {
      throw new HttpException('Erreur lors de la récupération des statistiques', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('reports/export')
  @Roles(UserRole.training_org, UserRole.admin)
  async exportReports(
    @Body('format') format: 'pdf' | 'excel',
    @Body('filters') filters: any,
    @CurrentUser() user: any
  ) {
    try {
      const exportData = await this.securityService.exportReports(user.id, format, filters);
      return {
        downloadUrl: exportData.url,
        filename: exportData.filename
      };
    } catch (error) {
      throw new HttpException('Erreur lors de l\'export', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('reports/validate/:examId')
  @Roles(UserRole.training_org, UserRole.admin)
  async validateExamResult(
    @Param('examId') examId: string,
    @Body() validateDto: ValidateExamDto,
    @CurrentUser() user: any
  ) {
    try {
      await this.securityService.validateExamResult(examId, validateDto, user.id);
      return { message: 'Résultat d\'examen validé avec succès' };
    } catch (error) {
      if (error.message.includes('ownership')) {
        throw new HttpException('Accès non autorisé', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('Erreur lors de la validation', HttpStatus.BAD_REQUEST);
    }
  }

  // =================
  // APIs pour étudiants (session d'examen)
  // =================

  @Post('exam/start/:examAttemptId')
  @Roles(UserRole.student)
  async startSecureExam(
    @Param('examAttemptId') examAttemptId: string,
    @Body() sessionData: {
      client_ip?: string;
      user_agent?: string;
      screen_resolution?: string;
      timezone?: string;
    },
    @CurrentUser() user: any
  ) {
    try {
      const examSession = await this.securityService.startSecureExam(
        examAttemptId, 
        user.id, 
        sessionData
      );
      return examSession;
    } catch (error) {
      throw new HttpException('Erreur lors du démarrage de l\'examen sécurisé', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('exam/event')
  @Roles(UserRole.student)
  async reportSecurityEvent(
    @Body() eventData: {
      exam_session_id: string;
      event_type: string;
      description: string;
      metadata?: any;
    },
    @CurrentUser() user: any
  ) {
    try {
      const event = await this.securityService.recordSecurityEvent(eventData, user.id);
      return event;
    } catch (error) {
      throw new HttpException('Erreur lors de l\'enregistrement de l\'événement', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('exam/end/:examSessionId')
  @Roles(UserRole.student)
  async endSecureExam(
    @Param('examSessionId') examSessionId: string,
    @CurrentUser() user: any
  ) {
    try {
      await this.securityService.endSecureExam(examSessionId, user.id);
      return { message: 'Examen terminé avec succès' };
    } catch (error) {
      throw new HttpException('Erreur lors de la fin de l\'examen', HttpStatus.BAD_REQUEST);
    }
  }
}