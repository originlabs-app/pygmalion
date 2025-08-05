import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { QuizMapperService } from './services/quiz-mapper.service';
import { QuizValidationService } from './services/quiz-validation.service';
import { QuizAttemptService } from './services/quiz-attempt.service';
import { QuizReportingService } from './services/quiz-reporting.service';

@Module({
  imports: [PrismaModule],
  controllers: [QuizzesController],
  providers: [
    QuizzesService,
    QuizMapperService,
    QuizValidationService,
    QuizAttemptService,
    QuizReportingService,
  ],
  exports: [
    QuizzesService,
    QuizAttemptService,
    QuizReportingService,
  ],
})
export class QuizzesModule {}
