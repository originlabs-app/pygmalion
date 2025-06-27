
import React from 'react';
import { Course } from '@/types';
import CourseCard from './CourseCard';

interface CourseGridProps {
  courses: Course[];
  loading?: boolean;
  viewMode?: 'grid' | 'list';
  searchTerm?: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, loading = false, viewMode = 'grid', searchTerm = '' }) => {
  if (loading) {
    return (
      <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={viewMode === 'grid' ? "h-[350px] animate-pulse bg-gray-200 rounded-2xl" : "h-[120px] animate-pulse bg-gray-200 rounded-2xl"}></div>
        ))}
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Aucune formation trouvée</h3>
        <p className="text-gray-600">
          Essayez d'ajuster vos critères de recherche ou vos filtres pour trouver ce que vous cherchez.
        </p>
      </div>
    );
  }
  
  return (
    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} viewMode={viewMode} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

export default CourseGrid;
