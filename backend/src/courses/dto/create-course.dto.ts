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
} from 'class-validator';
import { AviationCategory, CourseModality, CourseStatus } from '@prisma/client';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUUID()
  provider_id: string;

  @IsOptional()
  @IsString()
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
}
