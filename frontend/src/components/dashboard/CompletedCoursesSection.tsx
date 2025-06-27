
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Enrollment, Course } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CompletedCoursesSectionProps {
  completedEnrollments: Enrollment[];
  getCourse: (id: string) => Course | undefined;
}

const CompletedCoursesSection: React.FC<CompletedCoursesSectionProps> = ({
  completedEnrollments,
  getCourse
}) => {
  return (
    <DashboardCard 
      title="Formations Complétées" 
      description="Votre historique de formation"
    >
      {completedEnrollments.length > 0 ? (
        <div className="space-y-4">
          {completedEnrollments.slice(0, 5).map(enrollment => {
            const course = getCourse(enrollment.courseId);
            return (
              <div key={enrollment.id} className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium">{course?.title || 'Formation inconnue'}</h3>
                  <p className="text-sm text-muted-foreground">Complété: {new Date(enrollment.enrollmentDate).toLocaleDateString()}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/certificate/${enrollment.id}`}>Voir Certificat</Link>
                  </Button>
                  <Button variant="default" size="sm" asChild className="gap-1">
                    <Link to={`/lms-redirect/${enrollment.sessionId}`}>
                      <ArrowRight className="h-4 w-4" />
                      Revoir le cours
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
          {completedEnrollments.length > 5 && (
            <div className="text-center mt-4">
              <Button variant="link" asChild>
                <Link to="/certificates">Voir tout l'historique</Link>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">
          Vous n'avez pas encore complété de formations.
        </p>
      )}
    </DashboardCard>
  );
};

export default CompletedCoursesSection;
