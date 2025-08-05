import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { StorageConfig } from './config/storage.config';

async function bootstrap() {
  const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:8080';
  
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: corsOrigin,
      credentials: true,
    },
  });
  
  // Validation globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Import LoggerService et obtenir l'instance
  const { LoggerService } = await import('./common/services/logger.service');
  const logger = app.get(LoggerService);
  
  // Initialiser le bucket Supabase
  try {
    const storageConfig = app.get(StorageConfig);
    await storageConfig.initializeBucket();
    logger.info('🗄️ Storage Supabase initialisé');
  } catch (error) {
    logger.error('❌ Erreur initialisation Storage:', error.message);
  }
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.info(`🚀 Backend running on http://localhost:${port}`);
  logger.info(`✅ CORS activé pour ${corsOrigin}`);
}
bootstrap();
