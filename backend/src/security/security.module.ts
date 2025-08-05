import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { SecurityService } from './security.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ExamConfigService } from './services/exam-config.service';
import { ExamMonitoringService } from './services/exam-monitoring.service';
import { ExamReportsService } from './services/exam-reports.service';
import { ExamSessionService } from './services/exam-session.service';

@Module({
  imports: [PrismaModule],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    ExamConfigService,
    ExamMonitoringService,
    ExamReportsService,
    ExamSessionService,
  ],
  exports: [SecurityService],
})
export class SecurityModule {}
