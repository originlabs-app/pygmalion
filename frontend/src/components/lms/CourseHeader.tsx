
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';

interface CourseHeaderProps {
  title: string;
  progress: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, progress }) => {
  return (
    <>
      {/* Course Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4">
            <Link to="/student-dashboard">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour au tableau de bord
            </Link>
          </Button>
        </div>
      </div>

      {/* Course Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center">
          <Progress value={progress} className="w-64" />
          <span className="ml-4">{Math.round(progress)}% complété</span>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
