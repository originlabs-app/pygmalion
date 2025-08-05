import { Module } from '@nestjs/common';
import { TrainingOrganizationsService } from './training-organizations.service';
import { TrainingOrganizationsController } from './training-organizations.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [TrainingOrganizationsController],
  providers: [TrainingOrganizationsService],
})
export class TrainingOrganizationsModule {}
