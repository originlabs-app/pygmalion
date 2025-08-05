import {
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsDecimal,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateExamQuestionDto,
  CreateExamConfigurationDto,
} from './create-exam.dto';

export class UpdateExamDto {
  @IsOptional()
  @IsString()
  module_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  time_limit?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(100)
  passing_score?: number;

  @IsOptional()
  @IsBoolean()
  shuffle_questions?: boolean;

  @IsOptional()
  @IsBoolean()
  show_results?: boolean;

  @IsOptional()
  @IsBoolean()
  generates_certificate?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamQuestionDto)
  questions?: CreateExamQuestionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateExamConfigurationDto)
  exam_config?: CreateExamConfigurationDto;
}
