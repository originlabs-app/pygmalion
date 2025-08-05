import { apiClient } from './api';

export interface ExamQuestion {
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
  questions: ExamQuestion[];
  exam_config?: ExamConfiguration;
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

export interface ExamAttempt {
  id: string;
  exam_id: string;
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
  exam?: Exam;
  enrollment?: {
    id: string;
    user?: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
    };
  };
  exam_session?: ExamSession;
}

export interface ExamSession {
  id: string;
  proctoring_enabled: boolean;
  webcam_required: boolean;
  screen_recording: boolean;
  browser_lockdown: boolean;
  identity_verified: boolean;
  security_events?: SecurityEvent[];
}

export interface SecurityEvent {
  id: string;
  event_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  flagged_for_review: boolean;
}

export interface ExamResponse {
  id: string;
  attempt_id: string;
  question_id: string;
  answer_id?: string;
  response_text?: string;
  is_correct?: boolean;
  points_earned: number;
  question?: ExamQuestion;
}

export interface CourseExamResults {
  courseId: string;
  exams: {
    exam: Exam;
    attempts: ExamAttempt[];
    stats: {
      totalAttempts: number;
      averageScore: number;
      passRate: number;
      completionRate: number;
      securityIncidents: number;
    };
  }[];
}

class ExamService {
  // Récupérer les examens d'un module
  async getModuleExams(moduleId: string): Promise<Exam[]> {
    const response = await api.get(`/exams/module/${moduleId}`);
    return response.data;
  }

  // Récupérer un examen spécifique
  async getExam(examId: string): Promise<Exam> {
    const response = await api.get(`/exams/${examId}`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer les tentatives d'un examen
  async getExamAttempts(examId: string): Promise<ExamAttempt[]> {
    const response = await api.get(`/exams/${examId}/attempts`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer les détails d'une tentative
  async getAttemptDetails(attemptId: string): Promise<any> {
    const response = await api.get(`/exams/attempts/${attemptId}`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer tous les résultats d'examens d'un cours
  async getCourseResults(courseId: string): Promise<any[]> {
    const response = await api.get(`/exams/course/${courseId}/results`);
    return response.data;
  }

  // Pour les organismes de formation - Récupérer les événements de sécurité d'une tentative
  async getAttemptSecurityEvents(attemptId: string): Promise<any> {
    const response = await api.get(`/exams/attempts/${attemptId}/security-events`);
    return response.data;
  }

  // Pour les étudiants - Démarrer une tentative d'examen
  async startExamAttempt(examId: string, data: {
    enrollmentId: string;
    sessionConfig?: {
      proctoring_enabled?: boolean;
      webcam_required?: boolean;
      screen_recording?: boolean;
      browser_lockdown?: boolean;
    };
  }): Promise<ExamAttempt> {
    const response = await api.post(`/exams/${examId}/start`, data);
    return response.data;
  }

  // Pour les étudiants - Soumettre une tentative d'examen
  async submitExamAttempt(attemptData: {
    attemptId: string;
    responses: Array<{
      questionId: string;
      answerId?: string;
      responseText?: string;
    }>;
  }): Promise<ExamAttempt> {
    const response = await api.post('/exams/submit', attemptData);
    return response.data;
  }

  // Pour les OF - Mettre à jour un examen
  async updateExam(examId: string, updateData: any): Promise<Exam> {
    const response = await api.patch(`/exams/${examId}`, updateData);
    return response.data;
  }

  // Pour les OF - Supprimer un examen
  async deleteExam(examId: string): Promise<void> {
    await api.delete(`/exams/${examId}`);
  }
}

export const examService = new ExamService();