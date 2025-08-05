import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class QuizResponseDto {
  @IsNotEmpty()
  @IsString()
  question_id: string;

  @IsOptional()
  @IsString()
  answer_id?: string; // Pour les questions à choix multiples

  @IsOptional()
  @IsString()
  response_text?: string; // Pour les questions ouvertes
}

export class SubmitQuizAttemptDto {
  @IsNotEmpty()
  @IsString()
  quiz_id: string;

  @IsNotEmpty()
  @IsString()
  enrollment_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizResponseDto)
  responses: QuizResponseDto[];
}
