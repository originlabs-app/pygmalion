import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';

@Injectable()
export class QuizValidationService {
  validateQuestions(
    questions: CreateQuizDto['questions'] | UpdateQuizDto['questions'],
  ): void {
    if (!questions || questions.length === 0) {
      throw new BadRequestException(
        'Un quiz doit contenir au moins une question',
      );
    }

    for (const question of questions) {
      if (question.answers.length < 2) {
        throw new BadRequestException(
          'Chaque question doit avoir au moins 2 réponses',
        );
      }

      const correctAnswers = question.answers.filter(
        (answer) => answer.is_correct,
      );
      if (correctAnswers.length === 0) {
        throw new BadRequestException(
          'Chaque question doit avoir au moins une réponse correcte',
        );
      }

      if (
        question.question_type === 'single_choice' &&
        correctAnswers.length > 1
      ) {
        throw new BadRequestException(
          "Une question à choix unique ne peut avoir qu'une seule réponse correcte",
        );
      }
    }
  }
}