import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsUUID,
  Min,
  IsDateString,
  IsDecimal,
  IsUrl,
  Max,
  MaxLength,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { SessionType } from '@prisma/client';
import { Type, Transform } from 'class-transformer';
import { IsSafeString } from '@/common/validators/sanitize.validator';

export class CreateSessionDto {
  @IsNotEmpty({ message: "L'ID du cours est requis" })
  @IsUUID('4', { message: "L'ID du cours doit être un UUID valide" })
  course_id: string;

  @IsNotEmpty({ message: 'La date de début est requise' })
  @IsDateString(
    {},
    { message: 'Format de date invalide pour la date de début' },
  )
  @ValidateIf(
    (o, value) => {
      const now = new Date();
      const startDate = new Date(value);
      return startDate > now;
    },
    { message: 'La date de début doit être dans le futur' },
  )
  start_date: string;

  @IsNotEmpty({ message: 'La date de fin est requise' })
  @IsDateString({}, { message: 'Format de date invalide pour la date de fin' })
  @ValidateIf(
    (o) => {
      const start = new Date(o.start_date);
      const end = new Date(o.end_date);
      return end > start;
    },
    { message: 'La date de fin doit être après la date de début' },
  )
  end_date: string;

  @IsOptional()
  @IsString({ message: 'Le lieu doit être une chaîne de caractères' })
  @Transform(({ value }) => value?.trim())
  @MaxLength(200, { message: 'Le lieu ne peut pas dépasser 200 caractères' })
  @IsSafeString({ message: 'Le lieu contient des caractères non autorisés' })
  location?: string;

  @IsNotEmpty({ message: 'Le prix est requis' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre' })
  @Min(0, { message: 'Le prix ne peut pas être négatif' })
  @Max(99999, { message: 'Le prix ne peut pas dépasser 99999' })
  price: number;

  @IsNotEmpty({ message: 'Le nombre maximum de places est requis' })
  @IsInt({ message: 'Le nombre de places doit être un entier' })
  @Min(1, { message: 'Il doit y avoir au moins 1 place' })
  @Max(1000, { message: 'Le nombre de places ne peut pas dépasser 1000' })
  max_seats: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  available_seats?: number;

  @IsOptional()
  @IsString()
  lms_course_id?: string;

  @IsOptional()
  @IsUrl()
  virtual_meeting_url?: string;

  @IsOptional()
  @IsString()
  virtual_meeting_password?: string;

  @IsOptional()
  @IsEnum(SessionType)
  session_type?: SessionType;
}
