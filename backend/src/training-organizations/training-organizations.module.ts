import { Module } from '@nestjs/common';
import { TrainingOrganizationsService } from './training-organizations.service';
import { TrainingOrganizationsController } from './training-organizations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { StorageConfig } from '../config/storage.config';
import { UploadService } from '../common/services/upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [TrainingOrganizationsController],
  providers: [TrainingOrganizationsService, StorageConfig, UploadService],
})
export class TrainingOrganizationsModule {}
