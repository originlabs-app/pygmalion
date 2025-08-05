
import React, { createContext, useState, useContext } from 'react';
import logger from '@/services/logger.service';
import { Enrollment } from '../types';
import { useAuth } from './AuthContext';
import { useCourses } from './CourseContext';

interface EnrollmentContextType {
  enrollments: Enrollment[];
  loading: boolean;
  enrollInCourse: (courseId: string, sessionId: string) => Promise<void>;
  getStudentEnrollments: (userId: string) => Enrollment[];
  getEnrollmentsForSession: (sessionId: string) => Enrollment[];
  getEnrollmentsForManager: (managerId: string) => Enrollment[];
}

const EnrollmentContext = createContext<EnrollmentContextType | undefined>(undefined);

// Demo enrollments
const DEMO_ENROLLMENTS: Enrollment[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    sessionId: '1-1',
    status: 'approved',
    paymentStatus: 'paid',
    enrollmentDate: '2025-05-10'
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    sessionId: '2-1',
    status: 'completed',
    paymentStatus: 'paid',
    enrollmentDate: '2025-04-15'
  }
];

export const EnrollmentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>(DEMO_ENROLLMENTS);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const { getCourse } = useCourses();

  const enrollInCourse = async (courseId: string, sessionId: string) => {
    if (!currentUser) {
      throw new Error('User must be logged in to enroll');
    }

    setLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const course = getCourse(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
      
      const session = course.sessions.find(s => s.id === sessionId);
      if (!session) {
        throw new Error('Session not found');
      }
      
      if (session.availableSeats <= 0) {
        throw new Error('No available seats');
      }
      
      // Check if already enrolled
      const existingEnrollment = enrollments.find(
        e => e.userId === currentUser.id && e.courseId === courseId && e.sessionId === sessionId
      );
      
      if (existingEnrollment) {
        throw new Error('Already enrolled in this session');
      }
      
      const newEnrollment: Enrollment = {
        id: String(Date.now()),
        userId: currentUser.id,
        courseId,
        sessionId,
        status: currentUser.role === 'student' ? 'approved' : 'pending',
        paymentStatus: currentUser.role === 'student' ? 'paid' : 'pending',
        enrollmentDate: new Date().toISOString().split('T')[0]
      };
      
      setEnrollments(prev => [...prev, newEnrollment]);
      
      // Update available seats
      // In a real app, this would be handled by the API
    } catch (error) {
      logger.error('Enrollment failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getStudentEnrollments = (userId: string) => {
    return enrollments.filter(e => e.userId === userId);
  };

  const getEnrollmentsForSession = (sessionId: string) => {
    return enrollments.filter(e => e.sessionId === sessionId);
  };

  const getEnrollmentsForManager = (managerId: string) => {
    // In a real app, this would get enrollments for team members managed by this manager
    // For the demo, we'll just return all enrollments
    return enrollments;
  };

  return (
    <EnrollmentContext.Provider value={{
      enrollments,
      loading,
      enrollInCourse,
      getStudentEnrollments,
      getEnrollmentsForSession,
      getEnrollmentsForManager
    }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollments = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined) {
    throw new Error('useEnrollments must be used within an EnrollmentProvider');
  }
  return context;
};
