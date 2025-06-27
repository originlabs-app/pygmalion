
import React from 'react';
import { Course, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/dateFormatters';

interface InPersonCourseProps {
  course: Course;
  session: Session;
}

const InPersonCourse: React.FC<InPersonCourseProps> = ({
  course,
  session,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Formation Présentielle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Cette formation se déroule en présentiel. Veuillez vous présenter à l'adresse 
          et à l'heure indiquées ci-dessous.
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
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" /> 
            {session.location}
          </div>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Ajouter à mon calendrier
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Documents préparatoires :</p>
            <div className="bg-muted p-2 rounded">
              <Link to="#" className="text-primary hover:underline block">
                Informations logistiques.pdf
              </Link>
              <Link to="#" className="text-primary hover:underline block">
                Plan d'accès.pdf
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InPersonCourse;
