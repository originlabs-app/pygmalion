
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Session } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseEnrollmentTabProps {
  enrollments: Array<{
    id: string;
    sessionId: string;
    status: string;
    paymentStatus?: string;
    enrollmentDate: string;
  }>;
  sessions: Session[];
  formatDate: (date: string) => string;
}

const CourseEnrollmentTab: React.FC<CourseEnrollmentTabProps> = ({
  enrollments,
  sessions,
  formatDate
}) => {
  return (
    <div className="space-y-4">
      {enrollments.map(enrollment => {
        const session = sessions.find(s => s.id === enrollment.sessionId);
        
        return (
          <Card key={enrollment.id}>
            <CardHeader>
              <CardTitle>Your Enrollment</CardTitle>
              <CardDescription>
                Enrolled on {formatDate(enrollment.enrollmentDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session dates</span>
                  <span className="font-medium">
                    {session ? `${formatDate(session.startDate)} - ${formatDate(session.endDate)}` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{session?.location || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge>{enrollment.status}</Badge>
                </div>
                {enrollment.paymentStatus && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <Badge variant="outline">{enrollment.paymentStatus}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/certificate/${enrollment.id}`}>Voir Certificat</Link>
              </Button>
              <Button variant="default" asChild className="gap-1">
                <Link to={`/lms-redirect/${enrollment.sessionId}`}>
                  <ArrowRight className="h-4 w-4" />
                  Accéder au Cours
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default CourseEnrollmentTab;
