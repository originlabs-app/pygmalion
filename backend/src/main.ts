import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { StorageConfig } from './config/storage.config';
import { CustomValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const corsOrigin = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:8080';
  
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Id', 'X-Device-Name'],
      exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    },
  });
  
  // Validation globale avec pipe personnalisé
  app.useGlobalPipes(new CustomValidationPipe());
  
  // Filtre d'exception global
  app.useGlobalFilters(new HttpExceptionFilter());

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
