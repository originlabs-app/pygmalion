
import { Course, Session } from '@/types';
import { AVIATION_CATEGORIES } from '@/constants/aviationCategories';

export interface CourseContextType {
  courses: Course[];
  loading: boolean;
  addCourse: (course: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  addSession: (courseId: string, session: Omit<Session, 'id'>) => void;
  getCourse: (id: string) => Course | undefined;
  getFilteredCourses: (searchTerm?: string, category?: string, type?: string) => Course[];
  AVIATION_CATEGORIES: typeof AVIATION_CATEGORIES;
}
