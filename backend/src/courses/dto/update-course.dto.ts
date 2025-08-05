import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  IsArray,
  IsUUID,
  Min,
  IsUrl,
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
}
