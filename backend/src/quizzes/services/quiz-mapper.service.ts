import { Injectable } from '@nestjs/common';
import {
  QuizResponseDto,
  QuestionResponseDto,
  AnswerResponseDto,
} from '../dto/quiz-response.dto';
import { Quiz, Question, Answer } from '@prisma/client';

type QuizWithRelations = Quiz & {
  questions?: (Question & { answers?: Answer[] })[];
};

@Injectable()
export class QuizMapperService {
  toAnswerResponse(answer: Answer): AnswerResponseDto {
    return {
      id: answer.id,
      question_id: answer.question_id,
      answer_text: answer.answer_text,
      is_correct: answer.is_correct,
      order_index: answer.order_index,
      created_at: answer.created_at,
    };
  }

  toQuestionResponse(question: Question & { answers?: Answer[] }): QuestionResponseDto {
    return {
      id: question.id,
      quiz_id: question.quiz_id,
      question_text: question.question_text,
      question_type: question.question_type,
      points: question.points,
      order_index: question.order_index,
      explanation: question.explanation || undefined,
      media_url: question.media_url || undefined,
      created_at: question.created_at,
      updated_at: question.updated_at,
      answers:
        question.answers?.map((answer) => this.toAnswerResponse(answer)) || [],
    };
  }

  toQuizResponse(quiz: QuizWithRelations): QuizResponseDto {
    return {
      id: quiz.id,
      module_id: quiz.module_id,
      title: quiz.title,
      description: quiz.description || undefined,
      time_limit: quiz.time_limit || undefined,
      attempts_allowed: quiz.attempts_allowed,
      passing_score: quiz.passing_score ? parseFloat(quiz.passing_score.toString()) : undefined,
      shuffle_questions: quiz.shuffle_questions,
      show_results: quiz.show_results,
      created_at: quiz.created_at,
      updated_at: quiz.updated_at,
      questions:
        quiz.questions?.map((question) =>
          this.toQuestionResponse(question),
        ) || [],
    };
  }
}