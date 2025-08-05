import React, { createContext, useState, useContext, useEffect } from 'react';
import { Course, Session } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { CourseContextType } from '@/contexts/courses/types';
import { AVIATION_CATEGORIES } from '@/constants/aviationCategories';
import { courseService, UpdateCourseData } from '@/services/courseService';
import { demoCoursesData } from '@/data/demoData';
import logger from '@/services/logger.service';

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Interface pour les données brutes de l'API
interface ApiCourse {
  id: string;
  title: string;
  provider?: {
    id: string;
    organization_name: string;
    logo_url?: string;
    qualiopi_certified: boolean;
  };
  provider_id: string;
  description?: string;
  category: string;
  objectives?: string;
  requirements?: string;
  target_audience?: string;
  program?: string;
  qualiopi_indicators?: string[];
  course_type: 'in_person' | 'online' | 'blended';
  image_url?: string;
  status: 'draft' | 'published' | 'archived' | 'suspended';
  duration_hours?: number;
  certification_type?: string;
  certification_validity_months?: number;
  language?: string;
  classification_number?: string;
  success_rate?: number | string;
  satisfaction_rate?: number | string;
  validity_duration?: string;
  target_certification?: string;
  program_pdf_url?: string;
  duration?: string;
  cpf_eligible?: boolean;
  opco_eligible?: boolean;
  created_at: string;
  updated_at: string;
  sessions?: Array<{
    id: string;
    start_date?: string;
    end_date?: string;
    startDate?: string;
    endDate?: string;
    location: string;
    price: number;
    available_seats?: number;
    availableSeats?: number;
    max_seats?: number;
    maxSeats?: number;
  }>;
  _count?: {
    enrollments: number;
    sessions: number;
  };
}

// Fonction pour transformer les données de l'API vers le format frontend
const transformApiCourse = (apiCourse: ApiCourse): Course => {
  return {
    ...apiCourse,
    // Ajouter les champs de compatibilité
    providerId: apiCourse.provider_id,
    provider: apiCourse.provider?.organization_name || apiCourse.provider_id,
    targetAudience: apiCourse.target_audience,
    qualiopiIndicators: apiCourse.qualiopi_indicators || [],
    type: apiCourse.course_type === 'in_person' ? 'in-person' : apiCourse.course_type,
    image: apiCourse.image_url,
    classificationNumber: apiCourse.classification_number,
    successRate: typeof apiCourse.success_rate === 'string' ? parseFloat(apiCourse.success_rate) : apiCourse.success_rate,
    satisfactionRate: typeof apiCourse.satisfaction_rate === 'string' ? parseFloat(apiCourse.satisfaction_rate) : apiCourse.satisfaction_rate,
    validityDuration: apiCourse.validity_duration,
    targetCertification: apiCourse.target_certification,
    programPdfUrl: apiCourse.program_pdf_url,
    cpfEligible: apiCourse.cpf_eligible,
    opcoEligible: apiCourse.opco_eligible,
    sessions: (apiCourse.sessions || []).map(session => ({
      id: session.id,
      courseId: apiCourse.id,
      startDate: session.start_date || session.startDate,
      endDate: session.end_date || session.endDate,
      location: session.location,
      price: session.price,
      availableSeats: session.available_seats || session.availableSeats,
      maxSeats: session.max_seats || session.maxSeats
    }))
  };
};

export const CourseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const { currentUser } = useAuth();

  // Charger les formations depuis l'API
  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await courseService.getCourses({
        status: 'published',
        limit: 100 // Charger plus de formations
      });
      // Transformer les données de l'API vers le format frontend
      const transformedCourses = response.data.map(transformApiCourse);
      setCourses(transformedCourses);
      setUseFallback(false);
      logger.info('Formations chargées depuis l\'API', { count: response.data.length });
    } catch (error) {
      logger.error('Erreur lors du chargement des formations, utilisation du fallback', error);
      setCourses(demoCoursesData);
      setUseFallback(true);
      setError('Impossible de charger les formations. Mode hors ligne activé.');
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (course: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'>) => {
    if (!currentUser || useFallback) return;
    
    try {
      const newCourse = await courseService.createCourse({
        title: course.title,
        description: course.description,
        category: course.category,
        objectives: course.objectives,
        requirements: course.requirements,
        target_audience: course.targetAudience,
        program: course.program,
        qualiopi_indicators: course.qualiopiIndicators,
        course_type: course.type === 'in-person' ? 'in_person' : course.type as 'online' | 'blended',
        image_url: course.image_url || course.image,
        provider_id: currentUser.organization || currentUser.id,
        status: 'draft',
        duration_hours: course.duration_hours,
        certification_type: course.certification_type,
        certification_validity_months: course.certification_validity_months
      });
      
      const transformedCourse = transformApiCourse(newCourse);
      setCourses(prev => [...prev, transformedCourse]);
      logger.info('Formation créée', { courseId: newCourse.id });
    } catch (error) {
      logger.error('Erreur lors de la création de la formation', error);
      throw error;
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    if (useFallback) return;
    
    try {
      // Transformer les updates pour l'API
      const apiUpdates: UpdateCourseData = {};
      if (updates.title !== undefined) apiUpdates.title = updates.title;
      if (updates.description !== undefined) apiUpdates.description = updates.description;
      if (updates.category !== undefined) apiUpdates.category = updates.category;
      if (updates.objectives !== undefined) apiUpdates.objectives = updates.objectives;
      if (updates.requirements !== undefined) apiUpdates.requirements = updates.requirements;
      if (updates.targetAudience !== undefined) apiUpdates.target_audience = updates.targetAudience;
      if (updates.program !== undefined) apiUpdates.program = updates.program;
      if (updates.qualiopiIndicators !== undefined) apiUpdates.qualiopi_indicators = updates.qualiopiIndicators;
      if (updates.type !== undefined) apiUpdates.course_type = updates.type === 'in-person' ? 'in_person' : updates.type;
      if (updates.image !== undefined) apiUpdates.image_url = updates.image;
      if (updates.status !== undefined) apiUpdates.status = updates.status;
      if (updates.duration_hours !== undefined) apiUpdates.duration_hours = updates.duration_hours;
      if (updates.certification_type !== undefined) apiUpdates.certification_type = updates.certification_type;
      if (updates.certification_validity_months !== undefined) apiUpdates.certification_validity_months = updates.certification_validity_months;
      
      const updatedCourse = await courseService.updateCourse(id, apiUpdates);
      const transformedCourse = transformApiCourse(updatedCourse);
      setCourses(prev => prev.map(c => c.id === id ? transformedCourse : c));
      logger.info('Formation mise à jour', { courseId: id });
    } catch (error) {
      logger.error('Erreur lors de la mise à jour de la formation', error);
      throw error;
    }
  };

  const addSession = async (courseId: string, session: Omit<Session, 'id'>) => {
    if (useFallback) {
      logger.warn('Ajout de session impossible en mode hors ligne');
      return;
    }
    
    // TODO: Implémenter l'ajout de session via l'API
    logger.warn('addSession non implémenté avec l\'API');
  };

  const getCourse = (id: string) => {
    return courses.find(c => c.id === id);
  };

  const getFilteredCourses = (searchTerm?: string, category?: string, type?: string) => {
    let filtered = courses;
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(search) ||
        course.description?.toLowerCase().includes(search) ||
        course.provider?.organization_name?.toLowerCase().includes(search)
      );
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(course => course.category === category);
    }
    
    if (type && type !== 'all') {
      // Map frontend type values to API course_type values
      const typeMapping: Record<string, string> = {
        'in-person': 'in_person',
        'online': 'online',
        'virtual': 'online', // virtual maps to online in API
        'blended': 'blended'
      };
      
      const apiType = typeMapping[type] || type;
      filtered = filtered.filter(course => course.course_type === apiType);
    }
    
    return filtered;
  };

  // Charger les formations au montage
  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ 
      courses, 
      loading,
      error,
      useFallback,
      addCourse, 
      updateCourse, 
      addSession, 
      getCourse,
      getFilteredCourses,
      loadCourses,
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
