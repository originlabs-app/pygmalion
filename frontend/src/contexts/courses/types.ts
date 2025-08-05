
import { Course, Session } from '@/types';
import { AVIATION_CATEGORIES } from '@/constants/aviationCategories';

export interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  useFallback: boolean;
  addCourse: (course: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'>) => void | Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => void | Promise<void>;
  addSession: (courseId: string, session: Omit<Session, 'id'>) => void | Promise<void>;
  getCourse: (id: string) => Course | undefined;
  getFilteredCourses: (searchTerm?: string, category?: string, type?: string) => Course[];
  loadCourses: () => Promise<void>;
  AVIATION_CATEGORIES: typeof AVIATION_CATEGORIES;
}
