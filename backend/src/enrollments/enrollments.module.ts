import { Module } from '@nestjs/common';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { SessionsModule } from '@/sessions/sessions.module';
import { EnrollmentValidationService } from './services/enrollment-validation.service';
import { EnrollmentMapperService } from './services/enrollment-mapper.service';
import { EnrollmentManagementService } from './services/enrollment-management.service';
import { EnrollmentQueryService } from './services/enrollment-query.service';

@Module({
  imports: [PrismaModule, SessionsModule],
  controllers: [EnrollmentsController],
  providers: [
    EnrollmentsService,
    EnrollmentValidationService,
    EnrollmentMapperService,
    EnrollmentManagementService,
    EnrollmentQueryService,
  ],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}