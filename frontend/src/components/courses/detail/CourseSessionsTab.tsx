
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SessionsTable from '@/components/courses/SessionsTable';
import { Session } from '@/types';

interface CourseSessionsTabProps {
  sessions: Session[];
  userEnrollments: any[];
  enrollingSession: string | null;
  loading: boolean;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
  handleEnroll: (sessionId: string) => void;
}

const CourseSessionsTab: React.FC<CourseSessionsTabProps> = ({
  sessions,
  userEnrollments,
  enrollingSession,
  loading,
  formatDate,
  formatPrice,
  handleEnroll
}) => {
  // Added a session selection handler that triggers enrollment
  const handleSessionSelect = (sessionId: string) => {
    const isSessionEnrolled = userEnrollments.some(e => e.sessionId === sessionId);
    const session = sessions.find(s => s.id === sessionId);
    
    if (!isSessionEnrolled && session && session.availableSeats > 0 && !loading) {
      handleEnroll(sessionId);
    }
  };
  
  return (
    <>
      {sessions.length > 0 ? (
        <div>
          <SessionsTable
            sessions={sessions}
            formatDate={formatDate}
            formatPrice={formatPrice}
            isInteractive={true}
            onSessionSelect={handleSessionSelect}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            Cliquez sur une session pour vous inscrire
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No sessions available</h3>
          <p className="text-muted-foreground">
            There are currently no scheduled sessions for this course.
          </p>
        </div>
      )}
    </>
  );
};

export default CourseSessionsTab;
