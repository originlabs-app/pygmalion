import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  Matches,
  IsIP,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @MaxLength(255, { message: "L'email ne peut pas dépasser 255 caractères" })
  email: string;

  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @MaxLength(128, {
    message: 'Le mot de passe ne peut pas dépasser 128 caractères',
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'Le code OTP doit être une chaîne de caractères' })
  @Length(6, 6, { message: 'Le code OTP doit contenir exactement 6 chiffres' })
  @Matches(/^\d{6}$/, {
    message: 'Le code OTP doit contenir uniquement des chiffres',
  })
  otpCode?: string;

  // Informations de l'appareil (optionnelles)
  @IsOptional()
  @IsString()
  @MaxLength(100, {
    message: "Le nom de l'appareil ne peut pas dépasser 100 caractères",
  })
  deviceName?: string;

  @IsOptional()
  @IsUUID('4', { message: "L'ID de l'appareil doit être un UUID valide" })
  deviceId?: string;

  @IsOptional()
  @IsIP('4', { message: "L'adresse IP doit être au format IPv4 valide" })
  ipAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, {
    message: 'Le user agent ne peut pas dépasser 500 caractères',
  })
  userAgent?: string;
}
