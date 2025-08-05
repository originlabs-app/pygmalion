import { ConfigService } from '@nestjs/config';

export const getJwtConfig = (configService: ConfigService) => ({
  secret: configService.get<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: configService.get<string>('JWT_EXPIRES_IN', '1h'),
  },
});
