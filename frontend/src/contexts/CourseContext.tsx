import React, { createContext, useState, useContext, useEffect } from 'react';
import { Course, Session } from '../types';
import { useAuth } from './AuthContext';
import { CourseContextType } from './courses/types';
import { AVIATION_CATEGORIES } from '../constants/aviationCategories';
import { 
  getCourseById,
  addNewCourse,
  updateExistingCourse,
  addSessionToCourse,
  filterCourses
} from '../services/courseService';
import { demoCoursesData, demoUsersData, demoEnrollmentsData } from '@/data/demoData';

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>(demoCoursesData);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const addCourse = (course: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'>) => {
    if (!currentUser) return;
    
    setCourses(prev => 
      addNewCourse(
        prev, 
        course, 
        currentUser.organization || `${currentUser.firstName} ${currentUser.lastName}`, 
        currentUser.id
      )
    );
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCourses(prev => updateExistingCourse(prev, id, updates));
  };

  const addSession = (courseId: string, session: Omit<Session, 'id'>) => {
    setCourses(prev => addSessionToCourse(prev, courseId, session));
  };

  const getCourse = (id: string) => {
    return getCourseById(courses, id);
  };

  const getFilteredCourses = (searchTerm?: string, category?: string, type?: string) => {
    return filterCourses(courses, searchTerm, category, type);
  };

  // Simuler des données de formations
  useEffect(() => {
    setCourses(demoCoursesData);
  }, []);

  return (
    <CourseContext.Provider value={{ 
      courses, 
      loading,
      addCourse, 
      updateCourse, 
      addSession, 
      getCourse,
      getFilteredCourses,
      AVIATION_CATEGORIES
    }}>
      {children}
    </CourseContext.Provider>
  );
};

// Export AVIATION_CATEGORIES to maintain backward compatibility
export { AVIATION_CATEGORIES };

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
