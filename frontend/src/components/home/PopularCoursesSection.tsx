import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import CourseGrid from '@/components/courses/CourseGrid';
import { Course } from '@/types';

interface PopularCoursesSectionProps {
  courses: Course[];
}

const PopularCoursesSection = ({ courses }: PopularCoursesSectionProps) => {
  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Les Plus Demandées
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Formations populaires
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Les formations les plus appréciées par notre communauté de professionnels aéronautiques. 
            Rejoignez des milliers d'apprenants qui ont déjà fait confiance à ces programmes.
          </p>
          
          <Link to="/courses">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 px-8 py-4 rounded-xl border-2 hover:bg-green-50 hover:border-green-200 transition-all duration-300 group"
            >
              Voir toutes les formations
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Course Grid - Utilise exactement les mêmes cards que FeaturedCoursesSection */}
        <CourseGrid courses={courses} />
      </div>
    </section>
  );
};

export default PopularCoursesSection;
