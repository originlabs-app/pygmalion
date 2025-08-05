import React from 'react';
import { BookOpen, Wrench, Target, CheckCircle } from 'lucide-react';
import { Course } from '@/types';

interface CourseLearningOutcomesProps {
  course: Course;
}

const CourseLearningOutcomes: React.FC<CourseLearningOutcomesProps> = ({ course }) => {
  if (!course.learning_outcomes) {
    // Fallback to objectives
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Objectifs de la formation</h3>
        <p className="text-gray-700">{course.objectives || 'Objectifs en cours de définition'}</p>
      </div>
    );
  }

  const outcomeCategories = [
    {
      key: 'knowledge',
      icon: <BookOpen className="h-5 w-5" />,
      label: 'Connaissances',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'skills',
      icon: <Wrench className="h-5 w-5" />,
      label: 'Compétences pratiques',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      key: 'competencies',
      icon: <Target className="h-5 w-5" />,
      label: 'Compétences métier',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Ce que vous allez apprendre</h3>
      <div className="space-y-6">
        {outcomeCategories.map(category => {
          const items = course.learning_outcomes[category.key] || [];
          if (items.length === 0) return null;

          return (
            <div key={category.key}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.color}`}>
                  {category.icon}
                </div>
                <h4 className="font-medium text-gray-900">{category.label}</h4>
              </div>
              <ul className="space-y-2 ml-11">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseLearningOutcomes;