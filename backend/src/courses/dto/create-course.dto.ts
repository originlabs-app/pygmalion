import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsArray,
  IsUUID,
  Min,
  IsUrl,
  IsBoolean,
  IsNumber,
  Max,
  MinLength,
  MaxLength,
  ArrayMaxSize,
  IsDecimal,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { AviationCategory, CourseModality, CourseStatus } from '@prisma/client';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Le titre est requis' })
  @IsString({ message: 'Le titre doit être une chaîne de caractères' })
  @Transform(({ value }) => value?.trim())
  @MinLength(3, { message: 'Le titre doit contenir au moins 3 caractères' })
  @MaxLength(200, { message: 'Le titre ne peut pas dépasser 200 caractères' })
  title: string;

  @IsNotEmpty({ message: "L'ID du fournisseur est requis" })
  @IsUUID('4', { message: "L'ID du fournisseur doit être un UUID valide" })
  provider_id: string;

  @IsOptional()
  @IsString({ message: 'La description doit être une chaîne de caractères' })
  @Transform(({ value }) => value?.trim())
  @MaxLength(2000, {
    message: 'La description ne peut pas dépasser 2000 caractères',
  })
  description?: string;

  @IsNotEmpty()
  @IsEnum(AviationCategory)
  category: AviationCategory;

  @IsOptional()
  @IsString()
  objectives?: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  target_audience?: string;

  @IsOptional()
  @IsString()
  program?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  qualiopi_indicators?: string[];

  @IsNotEmpty()
  @IsEnum(CourseModality)
  course_type: CourseModality;

  @IsOptional()
  @IsUrl()
  image_url?: string;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration_hours?: number;

  @IsOptional()
  @IsString()
  certification_type?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  certification_validity_months?: number;

  // Nouveaux champs pour les données de démo
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  classification_number?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  success_rate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  satisfaction_rate?: number;

  @IsOptional()
  @IsString()
  validity_duration?: string;

  @IsOptional()
  @IsString()
  target_certification?: string;

  @IsOptional()
  @IsUrl()
  program_pdf_url?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsBoolean()
  cpf_eligible?: boolean;

  @IsOptional()
  @IsBoolean()
  opco_eligible?: boolean;
}
