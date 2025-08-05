import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDecimal,
  IsArray,
  ValidateNested,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  question_text: string;

  @IsNotEmpty()
  question_type: QuestionType;

  @IsOptional()
  @IsInt()
  @Min(1)
  points?: number;

  @IsInt()
  @Min(0)
  order_index: number;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsString()
  media_url?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  answer_text: string;

  @IsBoolean()
  is_correct: boolean;

  @IsInt()
  @Min(0)
  order_index: number;
}

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  module_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

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

  @IsDecimal()
  @Min(0)
  @Max(100)
  passing_score: number;

  @IsOptional()
  @IsBoolean()
  shuffle_questions?: boolean;

  @IsOptional()
  @IsBoolean()
  show_results?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
