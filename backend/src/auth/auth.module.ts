import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '@/config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '@/prisma/prisma.module';
import { MfaService } from './mfa.service';
import { SupabaseModule } from '@/config/supabase.module';
import { SecurityTasksService } from '@/common/tasks/security.tasks';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    PrismaModule,
    SupabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => getJwtConfig(configService),
    }),
  ],
  providers: [AuthService, MfaService, JwtStrategy, SecurityTasksService],
  controllers: [AuthController],
  exports: [AuthService, MfaService],
})
export class AuthModule {}
