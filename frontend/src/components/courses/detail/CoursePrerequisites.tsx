import React from 'react';
import { GraduationCap, Award, Briefcase, Globe, Heart } from 'lucide-react';
import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CoursePrerequisitesProps {
  course: Course;
}

const CoursePrerequisites: React.FC<CoursePrerequisitesProps> = ({ course }) => {
  if (!course.prerequisites_structured) {
    // Fallback to simple requirements string
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prérequis</h3>
        <p className="text-gray-700">{course.requirements || 'Aucun prérequis spécifique'}</p>
      </div>
    );
  }

  const prereqCategories = [
    {
      key: 'education',
      icon: <GraduationCap className="h-5 w-5" />,
      label: 'Formation',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      key: 'certifications',
      icon: <Award className="h-5 w-5" />,
      label: 'Certifications',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      key: 'experience',
      icon: <Briefcase className="h-5 w-5" />,
      label: 'Expérience',
      color: 'bg-green-100 text-green-700'
    },
    {
      key: 'languages',
      icon: <Globe className="h-5 w-5" />,
      label: 'Langues',
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      key: 'medical',
      icon: <Heart className="h-5 w-5" />,
      label: 'Médical',
      color: 'bg-red-100 text-red-700'
    }
  ];

  const hasPrerequisites = prereqCategories.some(
    cat => course.prerequisites_structured[cat.key]?.length > 0
  );

  if (!hasPrerequisites) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Prérequis</h3>
        <p className="text-green-700 font-medium">✓ Aucun prérequis - Formation accessible à tous</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Prérequis</h3>
      <div className="space-y-4">
        {prereqCategories.map(category => {
          const items = course.prerequisites_structured[category.key] || [];
          if (items.length === 0) return null;

          return (
            <div key={category.key} className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${category.color}`}>
                {category.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">{category.label}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item, idx) => (
                    <Badge key={idx} variant="outline" className="font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoursePrerequisites;