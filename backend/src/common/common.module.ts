import { Module, Global } from '@nestjs/common';
import { LoggerService } from './services/logger.service';
import { UploadService } from './services/upload.service';
import { StorageConfig } from '@/config/storage.config';

@Global()
@Module({
  providers: [LoggerService, UploadService, StorageConfig],
  exports: [LoggerService, UploadService, StorageConfig],
})
export class CommonModule {}
