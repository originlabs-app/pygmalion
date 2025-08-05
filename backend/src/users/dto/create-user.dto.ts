import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
  IsPhoneNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail({}, { message: "Format d'email invalide" })
  @IsNotEmpty({ message: "L'email est requis" })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @MaxLength(255, { message: "L'email ne peut pas dépasser 255 caractères" })
  email: string;

  @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le prénom est requis' })
  @Transform(({ value }) => value?.trim())
  @MinLength(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
  @MaxLength(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-']+$/, {
    message:
      'Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes',
  })
  firstName: string;

  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom est requis' })
  @Transform(({ value }) => value?.trim())
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
  @Matches(/^[a-zA-ZÀ-ÿ\s\-']+$/, {
    message:
      'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes',
  })
  lastName: string;

  @IsEnum(UserRole, { message: 'Le rôle doit être un rôle valide' })
  @IsNotEmpty({ message: 'Le rôle est requis' })
  role: UserRole;

  @IsString({ message: "L'organisation doit être une chaîne de caractères" })
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @MaxLength(100, {
    message: "Le nom de l'organisation ne peut pas dépasser 100 caractères",
  })
  @Matches(/^[a-zA-ZÀ-ÿ0-9\s\-'&.,]+$/, {
    message: "Le nom de l'organisation contient des caractères non autorisés",
  })
  organization?: string;

  @IsOptional()
  @IsPhoneNumber('FR', { message: 'Format de numéro de téléphone invalide' })
  phone?: string;
}
