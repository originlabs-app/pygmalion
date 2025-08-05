import { QuestionType } from '@prisma/client';

export class ExamAnswerResponseDto {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
  created_at: Date;
}

export class ExamQuestionResponseDto {
  id: string;
  exam_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  order_index: number;
  explanation?: string;
  media_url?: string;
  created_at: Date;
  updated_at: Date;
  answers: ExamAnswerResponseDto[];
}

export class ExamConfigurationResponseDto {
  id: string;
  exam_id: string;
  default_proctoring: boolean;
  default_webcam: boolean;
  default_lockdown: boolean;
  default_ip_restriction?: string;
  allowed_attempts: number;
  time_limit_strict: boolean;
  question_randomization: boolean;
  answer_randomization: boolean;
  alert_threshold: number;
  auto_suspend: boolean;
  manual_review_required: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ExamResponseDto {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  time_limit: number;
  passing_score: number;
  shuffle_questions: boolean;
  show_results: boolean;
  generates_certificate: boolean;
  created_at: Date;
  updated_at: Date;
  questions: ExamQuestionResponseDto[];
  exam_config?: ExamConfigurationResponseDto;
}
