import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDecimal,
  Min,
  Max,
} from 'class-validator';
import { ModuleType } from '@prisma/client';

export class CreateCourseModuleDto {
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(0)
  order_index: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  duration_minutes?: number;

  @IsEnum(ModuleType)
  module_type: ModuleType;

  @IsOptional()
  @IsBoolean()
  is_mandatory?: boolean;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(100)
  passing_score?: number;
}
