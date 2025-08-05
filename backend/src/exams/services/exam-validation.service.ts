import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateExamDto } from '../dto/create-exam.dto';
import { UpdateExamDto } from '../dto/update-exam.dto';

@Injectable()
export class ExamValidationService {
  validateQuestions(questions: CreateExamDto['questions'] | UpdateExamDto['questions']): void {
    if (!questions || questions.length === 0) {
      throw new BadRequestException('Un examen doit contenir au moins une question');
    }

    for (const question of questions) {
      if (question.answers.length < 2) {
        throw new BadRequestException('Chaque question doit avoir au moins 2 réponses');
      }

      const correctAnswers = question.answers.filter((answer) => answer.is_correct);
      if (correctAnswers.length === 0) {
        throw new BadRequestException('Chaque question doit avoir au moins une réponse correcte');
      }

      if (question.question_type === 'single_choice' && correctAnswers.length > 1) {
        throw new BadRequestException(
          "Une question à choix unique ne peut avoir qu'une seule réponse correcte",
        );
      }
    }
  }

  generateSecureToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}