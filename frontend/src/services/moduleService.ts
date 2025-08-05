import { apiClient as api } from './api';
import logger from '@/services/logger.service';

export interface CourseModuleDB {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  duration_minutes?: number;
  module_type: 'lesson' | 'quiz' | 'exam';
  is_mandatory: boolean;
  passing_score?: number;
  created_at: string;
  updated_at: string;
  
  // Relations
  course_resources?: CourseResource[];
  quiz?: Quiz;
  exam?: Exam;
}

export interface CourseResource {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  resource_type: 'video' | 'pdf' | 'text' | 'url';
  content_url?: string;
  text_content?: string;
  duration_minutes?: number;
  order_index: number;
  is_mandatory: boolean;
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
  
  // Relations
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice' | 'open_text';
  points: number;
  order_index: number;
  explanation?: string;
  
  // Relations
  answers?: QuizAnswer[];
}

export interface QuizAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

export interface Exam {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  time_limit: number;
  passing_score: number;
  shuffle_questions: boolean;
  show_results: boolean;
  generates_certificate: boolean;
  
  // Relations
  questions?: ExamQuestion[];
  exam_config?: ExamConfiguration;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_text: string;
  question_type: 'single_choice' | 'multiple_choice' | 'open_text';
  points: number;
  order_index: number;
  explanation?: string;
  
  // Relations
  answers?: ExamAnswer[];
}

export interface ExamAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

export interface ExamConfiguration {
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
}

class ModuleService {
  private baseUrl = '/api/modules';

  // Récupérer les modules d'un cours
  async getCourseModules(courseId: string): Promise<CourseModuleDB[]> {
    try {
      const response = await api.get(`/courses/${courseId}/modules`);
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la récupération des modules:', error);
      return [];
    }
  }

  // Récupérer un module spécifique avec ses ressources
  async getModule(moduleId: string): Promise<CourseModuleDB | null> {
    try {
      const response = await api.get(`${this.baseUrl}/${moduleId}`);
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la récupération du module:', error);
      return null;
    }
  }

  // Récupérer un quiz avec ses questions
  async getQuiz(quizId: string): Promise<Quiz | null> {
    try {
      const response = await api.get(`/quizzes/${quizId}`);
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la récupération du quiz:', error);
      return null;
    }
  }

  // Récupérer un examen avec ses questions
  async getExam(examId: string): Promise<Exam | null> {
    try {
      const response = await api.get(`/exams/${examId}`);
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la récupération de l\'examen:', error);
      return null;
    }
  }

  // Soumettre une réponse de quiz
  async submitQuizAttempt(quizId: string, answers: {
    question_id: string;
    selected_answers: string[];
    text_answer?: string;
  }[]): Promise<{
    score: number;
    passed: boolean;
    attempts_remaining: number;
  }> {
    try {
      const response = await api.post(`/quizzes/${quizId}/attempts`, {
        answers
      });
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la soumission du quiz:', error);
      throw error;
    }
  }

  // Soumettre une réponse d'examen
  async submitExamAttempt(examId: string, answers: {
    question_id: string;
    selected_answers: string[];
    text_answer?: string;
  }[]): Promise<{
    score: number;
    passed: boolean;
    status: 'completed' | 'under_review' | 'suspended';
  }> {
    try {
      const response = await api.post(`/exams/${examId}/attempts`, {
        answers
      });
      return response.data;
    } catch (error) {
      logger.error('Erreur lors de la soumission de l\'examen:', error);
      throw error;
    }
  }

  // Convertir les données DB vers le format legacy pour compatibilité
  convertModuleToLegacy(module: CourseModuleDB): {
    id: string;
    title: string;
    content: unknown[];
    duration: string;
    quiz?: unknown;
  } {
    const legacyContent: unknown[] = [];

    // Convertir les ressources
    if (module.course_resources) {
      module.course_resources.forEach(resource => {
        legacyContent.push({
          type: resource.resource_type,
          title: resource.title,
          content: resource.text_content,
          url: resource.content_url,
          duration: resource.duration_minutes ? `${resource.duration_minutes}min` : undefined
        });
      });
    }

    // Ajouter le quiz/examen à la fin
    let quiz = undefined;
    if (module.quiz) {
      quiz = {
        questions: module.quiz.questions?.map(q => ({
          question: q.question_text,
          options: q.answers?.map(a => a.answer_text) || [],
          correctAnswer: q.answers?.findIndex(a => a.is_correct) || 0
        })) || []
      };
    }

    return {
      id: module.id,
      title: module.title,
      content: legacyContent,
      duration: module.duration_minutes ? `${module.duration_minutes}min` : '30min',
      quiz
    };
  }

  // Convertir un quiz DB vers le format attendu par les composants
  convertQuizToLegacy(quiz: Quiz): {
    title: string;
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
    fraudDetectionActive: boolean;
  } {
    return {
      title: quiz.title,
      questions: quiz.questions?.map(q => ({
        question: q.question_text,
        options: q.answers?.map(a => a.answer_text) || [],
        correctAnswer: q.answers?.findIndex(a => a.is_correct) || 0
      })) || [],
      fraudDetectionActive: false // Quiz formatifs sans anti-fraude
    };
  }

  // Convertir un examen DB vers le format attendu par FocusedExamMode
  convertExamToLegacy(exam: Exam): {
    title: string;
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
    examId: string;
  } {
    return {
      title: exam.title,
      examId: exam.id,
      questions: exam.questions?.map(q => ({
        question: q.question_text,
        options: q.answers?.map(a => a.answer_text) || [],
        correctAnswer: q.answers?.findIndex(a => a.is_correct) || 0
      })) || []
    };
  }
}

export const moduleService = new ModuleService();