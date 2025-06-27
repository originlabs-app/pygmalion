
import React from 'react';
import { Session, Course } from '@/types';
import OnlineCourse from './modality/OnlineCourse';
import VirtualCourse from './modality/VirtualCourse';
import InPersonCourse from './modality/InPersonCourse';
import BlendedCourse from './modality/BlendedCourse';
import DefaultCourse from './modality/DefaultCourse';

interface CourseModalityHandlerProps {
  course: Course | undefined;
  session: Session | undefined;
  onAccessContent: () => void;
}

const CourseModalityHandler: React.FC<CourseModalityHandlerProps> = ({
  course,
  session,
  onAccessContent,
}) => {
  if (!course || !session) {
    return <div>Données de formation non disponibles</div>;
  }

  // Rendu en fonction de la modalité du cours
  switch (course.type) {
    case 'online':
      return (
        <OnlineCourse 
          course={course} 
          session={session} 
          onAccessContent={onAccessContent} 
        />
      );

    case 'virtual':
      return (
        <VirtualCourse 
          course={course} 
          session={session} 
          onAccessContent={onAccessContent} 
        />
      );

    case 'in-person':
      return (
        <InPersonCourse 
          course={course} 
          session={session} 
        />
      );
      
    case 'blended':
      return (
        <BlendedCourse 
          course={course} 
          session={session} 
          onAccessContent={onAccessContent} 
        />
      );

    default:
      return (
        <DefaultCourse 
          course={course} 
          session={session} 
          onAccessContent={onAccessContent} 
        />
      );
  }
};

export default CourseModalityHandler;
