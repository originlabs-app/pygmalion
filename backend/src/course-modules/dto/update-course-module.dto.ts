import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsDecimal,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { ModuleType } from '@prisma/client';

export class UpdateCourseModuleDto {
  @IsOptional()
  @IsString()
  course_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order_index?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration_minutes?: number;

  @IsOptional()
  @IsEnum(ModuleType)
  module_type?: ModuleType;

  @IsOptional()
  @IsBoolean()
  is_mandatory?: boolean;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(100)
  passing_score?: number;
}
