import { Injectable } from '@nestjs/common';
import {
  ExamResponseDto,
  ExamQuestionResponseDto,
  ExamAnswerResponseDto,
  ExamConfigurationResponseDto,
} from '@/exams/dto/exam-response.dto';
import {
  Exam,
  ExamQuestion,
  ExamAnswer,
  ExamConfiguration,
} from '@prisma/client';

type ExamWithRelations = Exam & {
  questions?: (ExamQuestion & { answers?: ExamAnswer[] })[];
  exam_config?: ExamConfiguration | null;
};

@Injectable()
export class ExamMapperService {
  toExamAnswerResponse(answer: ExamAnswer): ExamAnswerResponseDto {
    return {
      id: answer.id,
      question_id: answer.question_id,
      answer_text: answer.answer_text,
      is_correct: answer.is_correct,
      order_index: answer.order_index,
      created_at: answer.created_at,
    };
  }

  toExamQuestionResponse(
    question: ExamQuestion & { answers?: ExamAnswer[] },
  ): ExamQuestionResponseDto {
    return {
      id: question.id,
      exam_id: question.exam_id,
      question_text: question.question_text,
      question_type: question.question_type,
      points: question.points,
      order_index: question.order_index,
      explanation: question.explanation || undefined,
      media_url: question.media_url || undefined,
      created_at: question.created_at,
      updated_at: question.updated_at,
      answers:
        question.answers?.map((answer) => this.toExamAnswerResponse(answer)) ||
        [],
    };
  }

  toExamConfigResponse(
    config: ExamConfiguration,
  ): ExamConfigurationResponseDto {
    return {
      id: config.id,
      exam_id: config.exam_id,
      default_proctoring: config.default_proctoring,
      default_webcam: config.default_webcam,
      default_lockdown: config.default_lockdown,
      default_ip_restriction: config.default_ip_restriction || undefined,
      allowed_attempts: config.allowed_attempts,
      time_limit_strict: config.time_limit_strict,
      question_randomization: config.question_randomization,
      answer_randomization: config.answer_randomization,
      alert_threshold: config.alert_threshold,
      auto_suspend: config.auto_suspend,
      manual_review_required: config.manual_review_required,
      created_at: config.created_at,
      updated_at: config.updated_at,
    };
  }

  toExamResponse(exam: ExamWithRelations): ExamResponseDto {
    return {
      id: exam.id,
      module_id: exam.module_id,
      title: exam.title,
      description: exam.description || undefined,
      time_limit: exam.time_limit,
      passing_score: parseFloat(exam.passing_score.toString()),
      shuffle_questions: exam.shuffle_questions,
      show_results: exam.show_results,
      generates_certificate: exam.generates_certificate,
      created_at: exam.created_at,
      updated_at: exam.updated_at,
      questions:
        exam.questions?.map((question) =>
          this.toExamQuestionResponse(question),
        ) || [],
      exam_config: exam.exam_config
        ? this.toExamConfigResponse(exam.exam_config)
        : undefined,
    };
  }
}
