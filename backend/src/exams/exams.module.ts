import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ExamMapperService } from './services/exam-mapper.service';
import { ExamValidationService } from './services/exam-validation.service';
import { ExamAttemptService } from './services/exam-attempt.service';
import { ExamReportingService } from './services/exam-reporting.service';
import { ExamStatisticsService } from './services/exam-statistics.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExamsController],
  providers: [
    ExamsService,
    ExamMapperService,
    ExamValidationService,
    ExamAttemptService,
    ExamReportingService,
    ExamStatisticsService,
  ],
  exports: [
    ExamsService,
    ExamAttemptService,
    ExamReportingService,
    ExamStatisticsService,
  ],
})
export class ExamsModule {}
