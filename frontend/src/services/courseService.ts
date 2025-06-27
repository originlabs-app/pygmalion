
import { Course, Session } from '@/types';
import { DEMO_COURSES } from '@/data/demoData';

// Get a course by its ID
export const getCourseById = (courses: Course[], id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

// Add a new course
export const addNewCourse = (
  courses: Course[], 
  course: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'>,
  provider: string,
  providerId: string
): Course[] => {
  const newCourse: Course = {
    ...course,
    id: String(Date.now()),
    provider: provider,
    providerId: providerId,
    status: 'published',
    sessions: course.sessions || []
  };
  
  return [...courses, newCourse];
};

// Update an existing course
export const updateExistingCourse = (
  courses: Course[], 
  id: string, 
  updates: Partial<Course>
): Course[] => {
  return courses.map(course => 
    course.id === id ? { ...course, ...updates } : course
  );
};

// Add a session to a course
export const addSessionToCourse = (
  courses: Course[], 
  courseId: string, 
  session: Omit<Session, 'id'>
): Course[] => {
  const newSession = {
    ...session,
    id: `${courseId}-${Date.now()}`,
    courseId
  };

  return courses.map(course => 
    course.id === courseId 
      ? { ...course, sessions: [...course.sessions, newSession] }
      : course
  );
};

// Filter courses based on search term, category, and type
export const filterCourses = (
  courses: Course[], 
  searchTerm?: string, 
  category?: string, 
  type?: string
): Course[] => {
  let filtered = [...courses];
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(term) || 
      course.description.toLowerCase().includes(term)
    );
  }
  
  if (category && category !== 'All Categories') {
    filtered = filtered.filter(course => course.category === category);
  }
  
  if (type && type !== 'All Types') {
    filtered = filtered.filter(course => course.type === type);
  }
  
  return filtered;
};
