import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExamResponseDto {
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

export class SubmitExamAttemptDto {
  @IsNotEmpty()
  @IsString()
  exam_id: string;

  @IsNotEmpty()
  @IsString()
  enrollment_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExamResponseDto)
  responses: ExamResponseDto[];
}

export class StartExamAttemptDto {
  @IsNotEmpty()
  @IsString()
  enrollment_id: string;

  @IsOptional()
  @IsString()
  session_token?: string; // Pour la sécurité anti-fraude

  @IsOptional()
  @IsString()
  client_ip?: string;

  @IsOptional()
  @IsString()
  user_agent?: string;

  @IsOptional()
  @IsString()
  screen_resolution?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}