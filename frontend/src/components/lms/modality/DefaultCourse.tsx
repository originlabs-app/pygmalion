
import React from 'react';
import { Course, Session } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DefaultCourseProps {
  course: Course;
  session: Session;
  onAccessContent: () => void;
}

const DefaultCourse: React.FC<DefaultCourseProps> = ({
  onAccessContent,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accès à la formation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          Les détails de cette formation sont disponibles. Cliquez ci-dessous pour accéder au contenu.
        </p>
        <Button onClick={onAccessContent} className="w-full">
          Accéder à la formation
        </Button>
      </CardContent>
    </Card>
  );
};

export default DefaultCourse;
