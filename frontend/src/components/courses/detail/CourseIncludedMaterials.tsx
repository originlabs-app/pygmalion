import React from 'react';
import { Package, Monitor, HardHat, Award, Check } from 'lucide-react';
import { Course } from '@/types';

interface CourseIncludedMaterialsProps {
  course: Course;
}

const CourseIncludedMaterials: React.FC<CourseIncludedMaterialsProps> = ({ course }) => {
  if (!course.included_materials) {
    return null;
  }

  const materialCategories = [
    {
      key: 'physical',
      icon: <Package className="h-5 w-5" />,
      label: 'Matériel physique',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      key: 'digital',
      icon: <Monitor className="h-5 w-5" />,
      label: 'Ressources numériques',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'equipment',
      icon: <HardHat className="h-5 w-5" />,
      label: 'Équipements',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      key: 'certification',
      icon: <Award className="h-5 w-5" />,
      label: 'Certification',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const hasMaterials = materialCategories.some(
    cat => course.included_materials[cat.key]?.length > 0
  );

  if (!hasMaterials) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Matériel inclus dans la formation</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {materialCategories.map(category => {
          const items = course.included_materials[category.key] || [];
          if (items.length === 0) return null;

          return (
            <div key={category.key} className="bg-white rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg ${category.bgColor} ${category.color}`}>
                  {category.icon}
                </div>
                <h4 className="font-medium text-gray-900">{category.label}</h4>
              </div>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
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

export default CourseIncludedMaterials;