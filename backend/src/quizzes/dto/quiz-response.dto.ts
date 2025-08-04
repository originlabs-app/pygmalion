import { QuestionType } from '@prisma/client';

export class AnswerResponseDto {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
  created_at: Date;
}

export class QuestionResponseDto {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  order_index: number;
  explanation?: string;
  media_url?: string;
  created_at: Date;
  updated_at: Date;
  answers: AnswerResponseDto[];
}

export class QuizResponseDto {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  time_limit?: number;
  attempts_allowed: number;
  passing_score: number;
  shuffle_questions: boolean;
  show_results: boolean;
  created_at: Date;
  updated_at: Date;
  questions: QuestionResponseDto[];
}