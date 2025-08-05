import { apiClient } from './api';

export interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'single_choice' | 'true_false' | 'open_text' | 'matching';
  points: number;
  answers?: {
    id: string;
    answer_text: string;
    is_correct: boolean;
  }[];
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  time_limit?: number;
  attempts_allowed: number;
  passing_score: number;
  shuffle_questions: boolean;
  show_results: boolean;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  enrollment_id: string;
  attempt_number: number;
  start_time: string;
  end_time?: string;
  score?: number;
  max_score: number;
  passed?: boolean;
  time_spent?: number;
  status: 'in_progress' | 'completed' | 'timed_out' | 'abandoned';
  quiz?: Quiz;
  enrollment?: {
    id: string;
    user?: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
}

export interface QuizResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  answer_id?: string;
  response_text?: string;
  is_correct?: boolean;
  points_earned: number;
  question?: QuizQuestion;
}

export interface CourseQuizResults {
  courseId: string;
  quizzes: {
    quiz: Quiz;
    attempts: QuizAttempt[];
    stats: {
      totalAttempts: number;
      averageScore: number;
      passRate: number;
      completionRate: number;
    };
  }[];
}

class QuizService {
  // Récupérer les quiz d'un module
  async getModuleQuizzes(moduleId: string): Promise<Quiz[]> {
    const response = await api.get(`/quizzes/module/${moduleId}`);
    return response.data;
  }

  // Récupérer un quiz spécifique
  async getQuiz(quizId: string): Promise<Quiz> {
    const response = await api.get(`/quizzes/${quizId}`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer les tentatives d'un quiz
  async getQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
    const response = await api.get(`/quizzes/${quizId}/attempts`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer les détails d'une tentative
  async getAttemptDetails(attemptId: string): Promise<any> {
    const response = await api.get(`/quizzes/attempts/${attemptId}`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer tous les résultats de quiz d'un cours
  async getCourseResults(courseId: string): Promise<any[]> {
    const response = await api.get(`/quizzes/course/${courseId}/results`);
    return response.data;
  }

  // Pour les étudiants - Démarrer une tentative de quiz
  async startQuizAttempt(quizId: string, enrollmentId: string): Promise<QuizAttempt> {
    const response = await api.post(`/quizzes/${quizId}/start-attempt`, {
      enrollmentId
    });
    return response.data;
  }

  // Pour les étudiants - Soumettre une tentative de quiz
  async submitQuizAttempt(attemptData: {
    attemptId: string;
    responses: Array<{
      questionId: string;
      answerId?: string;
      responseText?: string;
    }>;
  }): Promise<QuizAttempt> {
    const response = await api.post('/quizzes/submit-attempt', attemptData);
    return response.data;
  }

  // Pour les OF - Mettre à jour un quiz
  async updateQuiz(quizId: string, updateData: any): Promise<Quiz> {
    const response = await api.patch(`/quizzes/${quizId}`, updateData);
    return response.data;
  }

  // Pour les OF - Supprimer un quiz
  async deleteQuiz(quizId: string): Promise<void> {
    await api.delete(`/quizzes/${quizId}`);
  }
}

export const quizService = new QuizService();