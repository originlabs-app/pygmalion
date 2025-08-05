import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsArray,
  IsUUID,
  Min,
  IsUrl,
  IsBoolean,
  IsNumber,
  Max,
} from 'class-validator';
import { AviationCategory, CourseModality, CourseStatus } from '@prisma/client';

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(AviationCategory)
  category?: AviationCategory;

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

  @IsOptional()
  @IsEnum(CourseModality)
  course_type?: CourseModality;

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
