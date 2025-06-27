
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCourses } from '@/contexts/CourseContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SessionForm from '@/components/courses/sessions/SessionForm';
import SessionsDisplay from '@/components/courses/sessions/SessionsDisplay';

const AddSession: React.FC = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCourse, addSession } = useCourses();
  
  const course = getCourse(courseId!);
  
  if (!course) {
    return (
      <Layout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Formation introuvable</h1>
          <Button onClick={() => navigate('/training-org-dashboard')}>
            Retour au tableau de bord
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Gestion des sessions</h1>
            <p className="text-muted-foreground">
              {course.title}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" onClick={() => navigate(`/courses/${courseId}`)}>
              Voir la formation
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter une session</CardTitle>
              </CardHeader>
              <CardContent>
                <SessionForm 
                  courseId={courseId!} 
                  courseType={course.type} 
                  onAddSession={addSession}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <SessionsDisplay 
              sessions={course.sessions} 
              courseTitle={course.title} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddSession;
