
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import CourseModalityHandler from '@/components/lms/CourseModalityHandler';
import CourseHeader from './courseAccess/CourseHeader';
import SecurityAlert from './courseAccess/SecurityAlert';

interface CourseAccessPageProps {
  course: unknown;
  session: unknown;
  onAccessContent: () => void;
}

const CourseAccessPage: React.FC<CourseAccessPageProps> = ({ course, session, onAccessContent }) => {
  return (
    <div className="space-y-6">
      <CourseHeader 
        title={course.title}
        provider={course.provider}
        category={course.category}
      />
      
      {course.type === 'online' && (
        <SecurityAlert />
      )}
      
      <CourseModalityHandler 
        course={course}
        session={session}
        onAccessContent={onAccessContent}
      />
    </div>
  );
};

export default CourseAccessPage;
