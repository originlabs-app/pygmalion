import React from 'react';
import logger from '@/services/logger.service';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import CourseGrid from '@/components/courses/CourseGrid';
import { Course } from '@/types';

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

const FeaturedCoursesSection = ({ courses }: FeaturedCoursesSectionProps) => {
  // Debug: Log seulement si courses changent
  React.useEffect(() => {
    if (courses.length > 0) {
      logger.debug('Featured courses loaded:', courses.length);
    }
  }, [courses]);
  
  return (
    <section className="py-20 px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Sélection Premium
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Formations à la une
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Programmes de formation de qualité reconnus par les professionnels de l'aviation 
            et certifiés conformes aux standards les plus élevés.
          </p>
          
          <Link to="/courses">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 px-8 py-4 rounded-xl border-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 group"
            >
              Voir toutes les formations
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Course Grid */}
        <CourseGrid courses={courses} />
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
