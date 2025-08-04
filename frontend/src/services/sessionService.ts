import { apiClient } from './api';
import { Session } from '@/types';

export interface SessionQueryParams {
  course_id?: string;
  start_date_from?: string;
  start_date_to?: string;
  location?: string;
  session_type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SessionResponse {
  data: Session[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateSessionData {
  course_id: string;
  start_date: string;
  end_date: string;
  location?: string;
  price: number;
  max_seats: number;
  available_seats?: number;
  lms_course_id?: string;
  virtual_meeting_url?: string;
  virtual_meeting_password?: string;
  session_type?: string;
}

export interface UpdateSessionData extends Partial<Omit<CreateSessionData, 'course_id'>> {}

class SessionService {
  /**
   * Récupérer toutes les sessions avec filtres
   */
  async getSessions(params: SessionQueryParams = {}): Promise<SessionResponse> {
    const response = await apiClient.get('/sessions', { params });
    return response.data;
  }

  /**
   * Récupérer une session par ID
   */
  async getSession(id: string): Promise<Session> {
    const response = await apiClient.get(`/sessions/${id}`);
    return response.data;
  }

  /**
   * Créer une nouvelle session
   */
  async createSession(sessionData: CreateSessionData): Promise<Session> {
    const response = await apiClient.post('/sessions', sessionData);
    return response.data;
  }

  /**
   * Mettre à jour une session
   */
  async updateSession(id: string, sessionData: UpdateSessionData): Promise<Session> {
    const response = await apiClient.patch(`/sessions/${id}`, sessionData);
    return response.data;
  }

  /**
   * Supprimer une session
   */
  async deleteSession(id: string): Promise<void> {
    await apiClient.delete(`/sessions/${id}`);
  }

  /**
   * Récupérer les sessions d'un cours
   */
  async getSessionsByCourse(courseId: string): Promise<Session[]> {
    const response = await apiClient.get(`/sessions/course/${courseId}`);
    return response.data;
  }

  /**
   * Mettre à jour le nombre de places disponibles
   */
  async updateAvailableSeats(sessionId: string): Promise<Session> {
    const response = await apiClient.patch(`/sessions/${sessionId}/available-seats`);
    return response.data;
  }

  /**
   * Récupérer les sessions à venir
   */
  async getUpcomingSessions(limit: number = 20): Promise<Session[]> {
    const today = new Date().toISOString();
    const response = await this.getSessions({
      start_date_from: today,
      limit,
      sortBy: 'start_date',
      sortOrder: 'asc'
    });
    return response.data;
  }

  /**
   * Récupérer les sessions par période
   */
  async getSessionsByDateRange(startDate: string, endDate: string): Promise<Session[]> {
    const response = await this.getSessions({
      start_date_from: startDate,
      start_date_to: endDate,
      sortBy: 'start_date',
      sortOrder: 'asc'
    });
    return response.data;
  }

  /**
   * Vérifier la disponibilité d'une session
   */
  async checkAvailability(sessionId: string): Promise<{ available: boolean; remainingSeats: number }> {
    const session = await this.getSession(sessionId);
    const remainingSeats = session.availableSeats || 0;
    return {
      available: remainingSeats > 0,
      remainingSeats
    };
  }
}

export const sessionService = new SessionService(); 