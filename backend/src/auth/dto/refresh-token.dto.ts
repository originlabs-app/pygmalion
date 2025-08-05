import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'Le refresh token doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le refresh token est requis' })
  @MaxLength(64, {
    message: 'Le refresh token ne peut pas dépasser 64 caractères',
  })
  @Matches(/^[a-f0-9]{64}$/, {
    message: 'Format de refresh token invalide',
  })
  refreshToken: string;
}

export class LogoutDto {
  @IsString({ message: 'Le refresh token doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le refresh token est requis' })
  @MaxLength(64, {
    message: 'Le refresh token ne peut pas dépasser 64 caractères',
  })
  @Matches(/^[a-f0-9]{64}$/, {
    message: 'Format de refresh token invalide',
  })
  refreshToken: string;
}
