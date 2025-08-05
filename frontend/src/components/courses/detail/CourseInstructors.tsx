import React from 'react';
import { User, Award, Globe, Briefcase } from 'lucide-react';
import { Course } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CourseInstructorsProps {
  course: Course;
}

const CourseInstructors: React.FC<CourseInstructorsProps> = ({ course }) => {
  if (!course.instructor_profiles || course.instructor_profiles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Vos formateurs</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {course.instructor_profiles.map((instructor, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{instructor.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{instructor.title}</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-700">{instructor.experience}</p>
                  </div>
                  
                  {instructor.certifications.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {instructor.certifications.map((cert, certIdx) => (
                          <Badge key={certIdx} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {instructor.languages.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {instructor.languages.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
                
                {instructor.specialties.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {instructor.specialties.map((specialty, specIdx) => (
                      <Badge key={specIdx} className="bg-blue-100 text-blue-700 text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseInstructors;