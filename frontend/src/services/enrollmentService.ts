import { apiClient } from './api';
import { Enrollment } from '@/types';

export interface EnrollmentQueryParams {
  user_id?: string;
  course_id?: string;
  session_id?: string;
  status?: string;
  payment_status?: string;
  company_id?: string;
  enrollment_date_from?: string;
  enrollment_date_to?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface EnrollmentResponse {
  data: Enrollment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateEnrollmentData {
  user_id: string;
  course_id: string;
  session_id: string;
  status?: string;
  payment_status?: string;
  assigned_by?: string;
  company_id?: string;
}

export interface UpdateEnrollmentData {
  status?: string;
  payment_status?: string;
  completion_date?: string;
  score?: number;
  assigned_by?: string;
  company_id?: string;
}

export interface ProgressData {
  completed: boolean;
  timeSpentMinutes?: number;
  score?: number;
}

class EnrollmentService {
  /**
   * Récupérer toutes les inscriptions avec filtres
   */
  async getEnrollments(params: EnrollmentQueryParams = {}): Promise<EnrollmentResponse> {
    const response = await apiClient.get('/enrollments', { params });
    return response.data;
  }

  /**
   * Récupérer une inscription par ID
   */
  async getEnrollment(id: string): Promise<Enrollment> {
    const response = await apiClient.get(`/enrollments/${id}`);
    return response.data;
  }

  /**
   * Créer une nouvelle inscription
   */
  async createEnrollment(enrollmentData: CreateEnrollmentData): Promise<Enrollment> {
    const response = await apiClient.post('/enrollments', enrollmentData);
    return response.data;
  }

  /**
   * Mettre à jour une inscription
   */
  async updateEnrollment(id: string, enrollmentData: UpdateEnrollmentData): Promise<Enrollment> {
    const response = await apiClient.patch(`/enrollments/${id}`, enrollmentData);
    return response.data;
  }

  /**
   * Supprimer une inscription
   */
  async deleteEnrollment(id: string): Promise<void> {
    await apiClient.delete(`/enrollments/${id}`);
  }

  /**
   * Récupérer les inscriptions d'un utilisateur
   */
  async getEnrollmentsByUser(userId: string, params: Partial<EnrollmentQueryParams> = {}): Promise<Enrollment[]> {
    const response = await apiClient.get(`/enrollments/user/${userId}`, { params });
    return response.data;
  }

  /**
   * Récupérer mes inscriptions (utilisateur connecté)
   */
  async getMyEnrollments(params: Partial<EnrollmentQueryParams> = {}): Promise<Enrollment[]> {
    const response = await apiClient.get('/enrollments/my-enrollments', { params });
    return response.data;
  }

  /**
   * Mettre à jour le progrès d'un module
   */
  async updateProgress(enrollmentId: string, moduleId: string, progressData: ProgressData): Promise<unknown> {
    const response = await apiClient.patch(`/enrollments/${enrollmentId}/progress/${moduleId}`, progressData);
    return response.data;
  }

  /**
   * S'inscrire à une session (auto-inscription étudiant)
   */
  async enrollInSession(courseId: string, sessionId: string): Promise<Enrollment> {
    return this.createEnrollment({
      user_id: '', // Sera automatiquement rempli côté backend
      course_id: courseId,
      session_id: sessionId,
      status: 'pending',
      payment_status: 'pending'
    });
  }

  /**
   * Approuver une inscription
   */
  async approveEnrollment(id: string): Promise<Enrollment> {
    return this.updateEnrollment(id, { status: 'approved' });
  }

  /**
   * Rejeter/Annuler une inscription
   */
  async cancelEnrollment(id: string): Promise<Enrollment> {
    return this.updateEnrollment(id, { status: 'cancelled' });
  }

  /**
   * Marquer une inscription comme terminée
   */
  async completeEnrollment(id: string, score?: number): Promise<Enrollment> {
    return this.updateEnrollment(id, { 
      status: 'completed', 
      completion_date: new Date().toISOString(),
      ...(score && { score })
    });
  }

  /**
   * Récupérer les inscriptions actives d'un utilisateur
   */
  async getActiveEnrollments(userId?: string): Promise<Enrollment[]> {
    const params: Partial<EnrollmentQueryParams> = {
      status: 'approved'
    };
    
    if (userId) {
      return this.getEnrollmentsByUser(userId, params);
    } else {
      return this.getMyEnrollments(params);
    }
  }

  /**
   * Récupérer les inscriptions terminées d'un utilisateur
   */
  async getCompletedEnrollments(userId?: string): Promise<Enrollment[]> {
    const params: Partial<EnrollmentQueryParams> = {
      status: 'completed'
    };
    
    if (userId) {
      return this.getEnrollmentsByUser(userId, params);
    } else {
      return this.getMyEnrollments(params);
    }
  }

  /**
   * Récupérer les statistiques d'inscription pour un cours
   */
  async getCourseEnrollmentStats(courseId: string): Promise<{
    total: number;
    pending: number;
    approved: number;
    completed: number;
    cancelled: number;
  }> {
    const allEnrollments = await this.getEnrollments({ course_id: courseId, limit: 1000 });
    const enrollments = allEnrollments.data;

    return {
      total: enrollments.length,
      pending: enrollments.filter(e => e.status === 'pending').length,
      approved: enrollments.filter(e => e.status === 'approved').length,
      completed: enrollments.filter(e => e.status === 'completed').length,
      cancelled: enrollments.filter(e => e.status === 'cancelled').length,
    };
  }

  /**
   * Assigner une formation à un utilisateur (par un manager)
   */
  async assignTraining(userId: string, courseId: string, sessionId: string, companyId?: string): Promise<Enrollment> {
    return this.createEnrollment({
      user_id: userId,
      course_id: courseId,
      session_id: sessionId,
      status: 'approved', // Les assignations par manager sont auto-approuvées
      payment_status: 'paid', // Supposons que c'est payé par l'entreprise
      company_id: companyId
    });
  }
}

export const enrollmentService = new EnrollmentService(); 