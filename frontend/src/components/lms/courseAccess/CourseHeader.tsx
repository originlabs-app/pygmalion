
import React from 'react';

interface CourseHeaderProps {
  title: string;
  provider: string;
  category: string;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, provider, category }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">
        {provider} • {category}
      </p>
    </div>
  );
};

export default CourseHeader;
