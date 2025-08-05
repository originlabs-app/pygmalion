import { Injectable } from '@nestjs/common';
import { ExamConfigService } from './services/exam-config.service';
import { ExamMonitoringService } from './services/exam-monitoring.service';
import { ExamReportsService } from './services/exam-reports.service';
import { ExamSessionService } from './services/exam-session.service';
import {
  CreateExamConfigDto,
  UpdateExamConfigDto,
  SecurityEventFilterDto,
  ExamReportFilterDto,
  ValidateExamDto,
  CreateSecurityEventDto,
  StartExamSessionDto,
} from './dto/security.dto';

@Injectable()
export class SecurityService {
  constructor(
    private configService: ExamConfigService,
    private monitoringService: ExamMonitoringService,
    private reportsService: ExamReportsService,
    private sessionService: ExamSessionService,
  ) {}

  // ===== Configuration Methods =====
  async getExamConfiguration(examId: string) {
    return this.configService.getExamConfiguration(examId);
  }

  async createExamConfiguration(createConfigDto: CreateExamConfigDto) {
    return this.configService.createExamConfiguration(createConfigDto);
  }

  async updateExamConfiguration(configId: string, updateConfigDto: UpdateExamConfigDto) {
    return this.configService.updateExamConfiguration(configId, updateConfigDto);
  }

  async deleteExamConfiguration(id: string) {
    return this.configService.deleteExamConfiguration(id);
  }

  async verifyExamOwnership(examId: string, userId: string) {
    return this.configService.verifyExamOwnership(examId, userId);
  }

  async verifyConfigOwnership(configId: string, userId: string) {
    return this.configService.verifyConfigOwnership(configId, userId);
  }

  // ===== Monitoring Methods =====
  async getActiveExams(providerId: string) {
    return this.monitoringService.getActiveExams(providerId);
  }

  async getExamSession(examId: string, providerId: string) {
    return this.monitoringService.getExamSession(examId, providerId);
  }

  async getSecurityEvents(providerId: string, filters: SecurityEventFilterDto) {
    return this.monitoringService.getSecurityEvents(providerId, filters);
  }

  async suspendExam(examId: string, reason: string, providerId: string) {
    return this.monitoringService.suspendExam(examId, reason, providerId);
  }

  async resolveSecurityEvent(eventId: string, providerId: string) {
    return this.monitoringService.resolveSecurityEvent(eventId, providerId);
  }

  // ===== Reports Methods =====
  async getExamReports(providerId: string, filters: ExamReportFilterDto) {
    return this.reportsService.getExamReports(providerId, filters);
  }

  async getSecurityStats(providerId: string, period = 'month') {
    return this.reportsService.getSecurityStats(providerId, period);
  }

  async exportReports(providerId: string, format: 'csv' | 'pdf' | 'excel', filters: ExamReportFilterDto) {
    return this.reportsService.exportReports(providerId, format, filters);
  }

  // ===== Session Methods =====
  async startSecureExam(examId: string, sessionData: StartExamSessionDto, userId: string) {
    return this.sessionService.startSecureExam(examId, sessionData, userId);
  }

  async recordSecurityEvent(eventData: CreateSecurityEventDto, userId: string) {
    return this.sessionService.recordSecurityEvent(eventData, userId);
  }

  async endSecureExam(examSessionId: string, userId: string) {
    return this.sessionService.endSecureExam(examSessionId, userId);
  }

  async validateExamResult(validateDto: ValidateExamDto, providerId: string) {
    return this.sessionService.validateExamResult(validateDto, providerId);
  }
}