
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CourseHeaderProps {
  category: string;
  type: 'in-person' | 'online' | 'virtual' | 'blended';
  title: string;
  provider: string;
  description: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  category,
  type,
  title,
  provider,
  description
}) => {
  const courseTypeLabel = {
    'in-person': 'In-Person Training',
    'online': 'E-Learning',
    'virtual': 'Virtual Classroom',
    'blended': 'Blended Learning'
  }[type];

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Badge variant="outline">{category}</Badge>
        <Badge variant={
          type === 'in-person' ? 'default' : 
          type === 'online' ? 'secondary' : 
          type === 'blended' ? 'destructive' :
          'outline'
        }>
          {courseTypeLabel}
        </Badge>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">
        Provided by <span className="font-medium">{provider}</span>
      </p>
      <p className="mb-6">{description}</p>
    </div>
  );
};

export default CourseHeader;
