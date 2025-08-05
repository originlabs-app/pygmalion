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
import { CreateQuestionDto } from './create-quiz.dto';

export class UpdateQuizDto {
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
  @IsInt()
  @Min(1)
  attempts_allowed?: number;

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
