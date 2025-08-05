
import React from 'react';
import { Course, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Laptop, Calendar } from 'lucide-react';
import { formatDate } from '@/components/lms/utils/dateFormatters';

interface OnlineCourseProps {
  course: Course;
  session: Session;
  onAccessContent: () => void;
}

const OnlineCourse: React.FC<OnlineCourseProps> = ({
  course,
  session,
  onAccessContent,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Laptop className="mr-2 h-5 w-5 text-primary" />
          Formation E-Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Cette formation est disponible en ligne. Vous pouvez y accéder à tout moment 
          jusqu'au {formatDate(session.endDate)}.
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" /> 
            Disponible du {formatDate(session.startDate)} au {formatDate(session.endDate)}
          </div>
        </div>
        <Button onClick={onAccessContent} className="w-full">
          Accéder au contenu
        </Button>
      </CardContent>
    </Card>
  );
};

export default OnlineCourse;
