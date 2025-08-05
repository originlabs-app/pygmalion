
import { apiClient } from './api';
import { Course, Session, Enrollment } from '@/types';

export interface CourseQueryParams {
  search?: string;
  category?: string;
  course_type?: string;
  status?: string;
  provider_id?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CourseResponse {
  data: Course[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateCourseData {
  title: string;
  provider_id: string;
  description?: string;
  category: string;
  objectives?: string;
  requirements?: string;
  target_audience?: string;
  program?: string;
  qualiopi_indicators?: string[];
  course_type: string;
  image_url?: string;
  status?: string;
  duration_hours?: number;
  certification_type?: string;
  certification_validity_months?: number;
}

export interface UpdateCourseData extends Partial<CreateCourseData> {}

class CourseService {
  /**
   * Récupérer tous les cours avec filtres
   */
  async getCourses(params: CourseQueryParams = {}): Promise<CourseResponse> {
    const response = await apiClient.get('/courses', { params });
    return response.data;
  }

  /**
   * Récupérer un cours par ID
   */
  async getCourse(id: string): Promise<Course> {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  }

  /**
   * Créer un nouveau cours
   */
  async createCourse(courseData: CreateCourseData): Promise<Course> {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  }

  /**
   * Mettre à jour un cours
   */
  async updateCourse(id: string, courseData: UpdateCourseData): Promise<Course> {
    const response = await apiClient.patch(`/courses/${id}`, courseData);
    return response.data;
  }

  /**
   * Supprimer un cours
   */
  async deleteCourse(id: string): Promise<void> {
    await apiClient.delete(`/courses/${id}`);
  }

  /**
   * Récupérer les cours d'un organisme de formation
   */
  async getCoursesByProvider(providerId: string, params: Partial<CourseQueryParams> = {}): Promise<Course[]> {
    const response = await apiClient.get(`/courses/provider/${providerId}`, { params });
    return response.data;
  }

  /**
   * Mettre à jour le statut d'un cours
   */
  async updateCourseStatus(id: string, status: 'draft' | 'published' | 'archived' | 'suspended'): Promise<Course> {
    const response = await apiClient.patch(`/courses/${id}/status`, { status });
    return response.data;
  }

  /**
   * Récupérer les cours populaires/recommandés
   */
  async getPopularCourses(limit: number = 6): Promise<Course[]> {
    const response = await this.getCourses({
      status: 'published',
      limit,
      sortBy: 'created_at',
      sortOrder: 'desc'
    });
    return response.data;
  }

  /**
   * Rechercher des cours
   */
  async searchCourses(query: string, filters: Partial<CourseQueryParams> = {}): Promise<CourseResponse> {
    return this.getCourses({
      search: query,
      ...filters,
      status: 'published'
    });
  }

  /**
   * Récupérer les cours par catégorie
   */
  async getCoursesByCategory(category: string, limit: number = 20): Promise<Course[]> {
    const response = await this.getCourses({
      category,
      status: 'published',
      limit
    });
    return response.data;
  }
}

export const courseService = new CourseService();

// Export des fonctions individuelles pour compatibilité
export const getCourseById = (id: string) => courseService.getCourse(id);
export const addNewCourse = (courseData: CreateCourseData) => courseService.createCourse(courseData);
export const updateExistingCourse = (id: string, courseData: UpdateCourseData) => courseService.updateCourse(id, courseData);
// Interface pour les données de session
export interface SessionData {
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  availableSeats: number;
  lmsId?: string;
  virtualMeetingInfo?: {
    platform: 'zoom' | 'teams' | 'webex' | 'other';
    meetingId?: string;
    meetingUrl?: string;
    password?: string;
    requirements?: string[];
  };
  inPersonInfo?: {
    address: string;
    room?: string;
    directions?: string;
    contactOnSite?: string;
    specialInstructions?: string;
  };
}

// Interface pour les options de filtre
export interface FilterOptions {
  category?: string;
  type?: string;
  status?: string;
  providerId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  cpfEligible?: boolean;
  opcoEligible?: boolean;
}

export const addSessionToCourse = async (courseId: string, sessionData: SessionData): Promise<Session> => {
  const response = await apiClient.post(`/courses/${courseId}/sessions`, sessionData);
  return response.data;
};

export const filterCourses = (courses: Course[], filters: FilterOptions): Course[] => {
  let filtered = courses;
  
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(search) ||
      course.description?.toLowerCase().includes(search)
    );
  }
  
  if (filters.category) {
    filtered = filtered.filter(course => course.category === filters.category);
  }
  
  if (filters.type) {
    filtered = filtered.filter(course => course.type === filters.type);
  }
  
  if (filters.status) {
    filtered = filtered.filter(course => course.status === filters.status);
  }
  
  if (filters.providerId) {
    filtered = filtered.filter(course => course.providerId === filters.providerId);
  }
  
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    filtered = filtered.filter(course => {
      const coursePrice = course.sessions?.[0]?.price || 0;
      const minOk = filters.minPrice === undefined || coursePrice >= filters.minPrice;
      const maxOk = filters.maxPrice === undefined || coursePrice <= filters.maxPrice;
      return minOk && maxOk;
    });
  }
  
  if (filters.cpfEligible !== undefined) {
    filtered = filtered.filter(course => course.cpfEligible === filters.cpfEligible);
  }
  
  if (filters.opcoEligible !== undefined) {
    filtered = filtered.filter(course => course.opcoEligible === filters.opcoEligible);
  }
  
  return filtered;
};
