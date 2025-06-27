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

  // Initialiser le bucket Supabase
  try {
    const storageConfig = app.get(StorageConfig);
    await storageConfig.initializeBucket();
    console.log('🗄️ Storage Supabase initialisé');
  } catch (error) {
    console.error('❌ Erreur initialisation Storage:', error.message);
  }
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`✅ CORS activé pour ${corsOrigin}`);
}
bootstrap();
