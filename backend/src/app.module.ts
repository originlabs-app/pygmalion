import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrainingOrganizationsModule } from './training-organizations/training-organizations.module';
import { CoursesModule } from './courses/courses.module';
import { SessionsModule } from './sessions/sessions.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { SecurityModule } from './security/security.module';
import { CourseModulesModule } from './course-modules/course-modules.module';
import { CourseResourcesModule } from './course-resources/course-resources.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ExamsModule } from './exams/exams.module';
import { UploadController } from './common/controllers/upload.controller';
import { CommonModule } from './common/common.module';
import { StatsModule } from './stats/stats.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    TrainingOrganizationsModule,
    CoursesModule,
    CourseModulesModule,
    CourseResourcesModule,
    QuizzesModule,
    ExamsModule,
    SessionsModule,
    EnrollmentsModule,
    SecurityModule,
    CommonModule,
    StatsModule,
    TestimonialsModule,
    DashboardModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService],
})
export class AppModule {}
