import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CourseResourcesService } from './course-resources.service';
import { CourseResourcesController } from './course-resources.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UploadService } from '../common/services/upload.service';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB pour les vidéos
      },
    }),
  ],
  controllers: [CourseResourcesController],
  providers: [CourseResourcesService, UploadService],
  exports: [CourseResourcesService],
})
export class CourseResourcesModule {}