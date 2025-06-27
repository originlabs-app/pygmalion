
import React from 'react';

const LoadingCourseAccess: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-24 bg-gray-200 rounded w-full mx-auto mt-8"></div>
      </div>
    </div>
  );
};

export default LoadingCourseAccess;
