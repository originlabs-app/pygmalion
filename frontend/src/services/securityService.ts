import { apiClient as api } from './api';

export interface ExamConfiguration {
  id?: string;
  exam_id: string;
  default_proctoring: boolean;
  default_webcam: boolean;
  default_lockdown: boolean;
  default_ip_restriction: string | null;
  allowed_attempts: number;
  time_limit_strict: boolean;
  question_randomization: boolean;
  answer_randomization: boolean;
  alert_threshold: number;
  auto_suspend: boolean;
  manual_review_required: boolean;
}

export interface SecurityEvent {
  id: string;
  exam_session_id: string;
  event_type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  metadata?: any;
  auto_resolved: boolean;
  flagged_for_review: boolean;
}

export interface ExamSession {
  id: string;
  exam_attempt_id: string;
  proctoring_enabled: boolean;
  webcam_required: boolean;
  screen_recording: boolean;
  browser_lockdown: boolean;
  ip_restriction: string | null;
  location_required: string | null;
  copy_paste_blocked: boolean;
  right_click_disabled: boolean;
  tab_switching_blocked: boolean;
  session_token: string;
  client_ip: string | null;
  user_agent: string | null;
  screen_resolution: string | null;
  timezone: string | null;
  identity_verified: boolean;
  webcam_snapshot: string | null;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  security_events: SecurityEvent[];
}

export interface ActiveExam {
  id: string;
  student_name: string;
  course: string;
  start_time: string;
  duration: number;
  elapsed: number;
  status: 'in_progress' | 'completed' | 'suspended';
  risk_level: 'low' | 'medium' | 'high';
  incident_count: number;
  last_activity: string;
  exam_session?: ExamSession;
}

export interface ExamReport {
  id: string;
  student_name: string;
  course: string;
  date: string;
  duration: string;
  score: number;
  status: 'passed' | 'failed' | 'suspended' | 'under_review';
  incident_count: number;
  risk_level: 'low' | 'medium' | 'high';
  security_events: string[];
}

class SecurityService {
  private baseUrl = '/api/security';

  // Configuration des examens
  async getExamConfiguration(examId: string): Promise<ExamConfiguration | null> {
    try {
      const response = await api.get(`${this.baseUrl}/config/${examId}`);
      return response.data;
    } catch (error) {
      if ((error as any)?.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async saveExamConfiguration(config: ExamConfiguration): Promise<ExamConfiguration> {
    try {
      const response = await api.post(`${this.baseUrl}/config`, config);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error);
      throw error;
    }
  }

  async updateExamConfiguration(id: string, config: Partial<ExamConfiguration>): Promise<ExamConfiguration> {
    try {
      const response = await api.put(`${this.baseUrl}/config/${id}`, config);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la configuration:', error);
      throw error;
    }
  }

  // Surveillance en temps réel
  async getActiveExams(): Promise<ActiveExam[]> {
    try {
      const response = await api.get(`${this.baseUrl}/monitoring/active`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des examens actifs:', error);
      return [];
    }
  }

  async getExamSession(examId: string): Promise<ExamSession | null> {
    try {
      const response = await api.get(`${this.baseUrl}/monitoring/session/${examId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la session:', error);
      return null;
    }
  }

  async getRecentSecurityEvents(limit: number = 20): Promise<SecurityEvent[]> {
    try {
      const response = await api.get(`${this.baseUrl}/monitoring/events?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      return [];
    }
  }

  async suspendExam(examId: string, reason: string): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/monitoring/suspend/${examId}`, { reason });
    } catch (error) {
      console.error('Erreur lors de la suspension de l\'examen:', error);
      throw error;
    }
  }

  async resolveSecurityEvent(eventId: string): Promise<void> {
    try {
      await api.patch(`${this.baseUrl}/monitoring/events/${eventId}/resolve`);
    } catch (error) {
      console.error('Erreur lors de la résolution de l\'événement:', error);
      throw error;
    }
  }

  // Rapports de sécurité
  async getExamReports(filters: {
    period?: 'week' | 'month' | 'quarter' | 'year';
    courseId?: string;
    status?: string;
  } = {}): Promise<ExamReport[]> {
    try {
      const params = new URLSearchParams();
      if (filters.period) params.append('period', filters.period);
      if (filters.courseId) params.append('courseId', filters.courseId);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`${this.baseUrl}/reports?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rapports:', error);
      return [];
    }
  }

  async getSecurityStats(period: string = 'month'): Promise<{
    total_exams: number;
    secured_exams: number;
    security_incidents: number;
    suspicious_attempts: number;
    pass_rate: number;
    average_score: number;
  }> {
    try {
      const response = await api.get(`${this.baseUrl}/reports/stats?period=${period}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        total_exams: 0,
        secured_exams: 0,
        security_incidents: 0,
        suspicious_attempts: 0,
        pass_rate: 0,
        average_score: 0
      };
    }
  }

  async exportReport(format: 'pdf' | 'excel', filters: any): Promise<Blob> {
    try {
      const response = await api.post(`${this.baseUrl}/reports/export`, {
        format,
        filters
      }, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      throw error;
    }
  }

  async validateExamResult(examId: string, decision: 'approve' | 'reject', reason?: string): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/reports/validate/${examId}`, {
        decision,
        reason
      });
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      throw error;
    }
  }

  // API pour les sessions d'examen étudiants
  async startSecureExam(examId: string): Promise<{
    id: string;
    examId: string;
    sessionToken: string;
    configuration: {
      proctoring_enabled: boolean;
      webcam_required: boolean;
      browser_lockdown: boolean;
      time_limit: number;
      alert_threshold: number;
    };
  }> {
    try {
      const response = await api.post(`${this.baseUrl}/exam/start/${examId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du démarrage de l\'examen sécurisé:', error);
      throw error;
    }
  }

  async recordSecurityEvent(eventData: {
    exam_session_id: string;
    event_type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    timestamp: string;
  }): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/exam/event`, eventData);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
      throw error;
    }
  }

  async endExamSession(sessionId: string, results: {
    score: number;
    completed: boolean;
    security_warnings: number;
  }): Promise<void> {
    try {
      await api.post(`${this.baseUrl}/exam/end/${sessionId}`, results);
    } catch (error) {
      console.error('Erreur lors de la finalisation de la session:', error);
      throw error;
    }
  }

  // WebSocket pour surveillance temps réel (optionnel)
  connectToRealTimeMonitoring(callbacks: {
    onExamUpdate?: (exam: ActiveExam) => void;
    onSecurityEvent?: (event: SecurityEvent) => void;
    onExamCompleted?: (examId: string) => void;
  }): WebSocket | null {
    try {
      const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/security`;
      const ws = new WebSocket(wsUrl);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'exam_update':
            callbacks.onExamUpdate?.(data.payload);
            break;
          case 'security_event':
            callbacks.onSecurityEvent?.(data.payload);
            break;
          case 'exam_completed':
            callbacks.onExamCompleted?.(data.payload.examId);
            break;
        }
      };

      ws.onerror = (error) => {
        console.error('Erreur WebSocket:', error);
      };

      return ws;
    } catch (error) {
      console.error('Impossible de se connecter au WebSocket:', error);
      return null;
    }
  }
}

export const securityService = new SecurityService();