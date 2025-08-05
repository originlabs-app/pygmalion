
import React from 'react';
import { Course, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/components/lms/utils/dateFormatters';

interface BlendedCourseProps {
  course: Course;
  session: Session;
  onAccessContent: () => void;
}

const BlendedCourse: React.FC<BlendedCourseProps> = ({
  course,
  session,
  onAccessContent,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Formation Mixte
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Cette formation combine plusieurs modalités (présentiel, e-learning et/ou classe virtuelle).
          Veuillez consulter le programme détaillé ci-dessous.
        </p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" /> 
            Du {formatDate(session.startDate)} au {formatDate(session.endDate)}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" /> 
            {session.location.includes('En ligne') ? 'En ligne et ' + session.location.replace('En ligne, ', '') : session.location}
          </div>
        </div>
        
        <div className="space-y-4">
          <Button onClick={onAccessContent} className="w-full">
            Accéder au contenu de la formation
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Documents disponibles :</p>
            <div className="bg-muted p-2 rounded">
              <Link to="#" className="text-primary hover:underline block">
                Programme détaillé.pdf
              </Link>
              <Link to="#" className="text-primary hover:underline block">
                Calendrier des modules.pdf
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlendedCourse;
