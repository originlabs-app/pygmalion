
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Calendar, MapPin, Video, BookOpen } from 'lucide-react';
import { Enrollment, Session } from '@/types';
import { isSessionAccessible } from '@/services/modality';

interface CourseAccessButtonProps {
  enrollment: Enrollment;
  course?: { type?: string, id?: string };
  session?: Session;
}

export const CourseAccessButton: React.FC<CourseAccessButtonProps> = ({ 
  enrollment, 
  course, 
  session 
}) => {
  // Return nothing if no course or session
  if (!course || !session) return null;
  
  // Check if the session is accessible
  const sessionAccessible = isSessionAccessible(session);
  
  // Determine button properties based on course type and session status
  let buttonLabel: string;
  let buttonIcon: React.ReactNode;
  let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "default";
  
  if (enrollment.status === 'completed') {
    buttonLabel = 'Revoir le cours';
    buttonIcon = <CheckCircle className="h-4 w-4" />;
    buttonVariant = 'outline';
  } else if (!sessionAccessible) {
    // Session hasn't started yet or has ended
    if (new Date(session.startDate) > new Date()) {
      buttonLabel = 'À venir';
      buttonIcon = <Calendar className="h-4 w-4" />;
      buttonVariant = 'secondary';
    } else {
      buttonLabel = 'Terminé';
      buttonIcon = <CheckCircle className="h-4 w-4" />;
      buttonVariant = 'outline';
    }
  } else {
    // Session is active
    switch (course.type) {
      case 'in-person':
        buttonLabel = 'Détails du cours';
        buttonIcon = <MapPin className="h-4 w-4" />;
        break;
      case 'virtual':
        buttonLabel = 'Rejoindre la classe virtuelle';
        buttonIcon = <Video className="h-4 w-4" />;
        break;
      case 'online':
        buttonLabel = enrollment.progress?.started ? 'Continuer le cours' : 'Accéder au cours';
        buttonIcon = <ArrowRight className="h-4 w-4" />;
        break;
      case 'blended':
        buttonLabel = 'Accéder à la formation';
        buttonIcon = <BookOpen className="h-4 w-4" />;
        break;
      default:
        buttonLabel = 'Accéder au cours';
        buttonIcon = <BookOpen className="h-4 w-4" />;
    }
  }
  
  // Always direct to LMS redirect page regardless of session accessibility
  return (
    <Button variant={buttonVariant} size="sm" asChild className="gap-1">
      <Link to={`/lms-redirect/${enrollment.sessionId}`}>
        {buttonIcon}
        {buttonLabel}
      </Link>
    </Button>
  );
};
