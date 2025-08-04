import { IsNotEmpty, IsString, IsOptional, IsInt, IsBoolean, IsDecimal, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '@prisma/client';

export class CreateExamQuestionDto {
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
  @Type(() => CreateExamAnswerDto)
  answers: CreateExamAnswerDto[];
}

export class CreateExamAnswerDto {
  @IsNotEmpty()
  @IsString()
  answer_text: string;

  @IsBoolean()
  is_correct: boolean;

  @IsInt()
  @Min(0)
  order_index: number;
}

export class CreateExamConfigurationDto {
  @IsOptional()
  @IsBoolean()
  default_proctoring?: boolean;

  @IsOptional()
  @IsBoolean()
  default_webcam?: boolean;

  @IsOptional()
  @IsBoolean()
  default_lockdown?: boolean;

  @IsOptional()
  @IsString()
  default_ip_restriction?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  allowed_attempts?: number;

  @IsOptional()
  @IsBoolean()
  time_limit_strict?: boolean;

  @IsOptional()
  @IsBoolean()
  question_randomization?: boolean;

  @IsOptional()
  @IsBoolean()
  answer_randomization?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  alert_threshold?: number;

  @IsOptional()
  @IsBoolean()
  auto_suspend?: boolean;

  @IsOptional()
  @IsBoolean()
  manual_review_required?: boolean;
}

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  module_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  time_limit: number; // Obligatoire pour les examens

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

  @IsOptional()
  @IsBoolean()
  generates_certificate?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExamQuestionDto)
  questions: CreateExamQuestionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateExamConfigurationDto)
  exam_config?: CreateExamConfigurationDto;
}