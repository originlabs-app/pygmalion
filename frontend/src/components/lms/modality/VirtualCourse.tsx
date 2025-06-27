
import React from 'react';
import { Course, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/dateFormatters';

interface VirtualCourseProps {
  course: Course;
  session: Session;
  onAccessContent: () => void;
}

const VirtualCourse: React.FC<VirtualCourseProps> = ({
  course,
  session,
  onAccessContent,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video className="mr-2 h-5 w-5 text-primary" />
          Classe Virtuelle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Cette formation se déroule en classe virtuelle. Vous devez vous connecter 
          à la date et l'heure indiquées ci-dessous.
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" /> 
            {formatDate(session.startDate)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" /> 
            {formatTime(session.startDate)}
          </div>
        </div>
        
        <div className="space-y-4">
          <Button onClick={onAccessContent} className="w-full">
            Accéder à la classe virtuelle
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Documents préparatoires :</p>
            <div className="bg-muted p-2 rounded">
              <Link to="#" className="text-primary hover:underline block">
                Guide préparatoire.pdf
              </Link>
              <Link to="#" className="text-primary hover:underline block">
                Présentation introduction.pdf
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualCourse;
