
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SessionsTable from '@/components/courses/SessionsTable';
import { Session } from '@/types';

interface SessionsDisplayProps {
  sessions: Session[];
  courseTitle: string;
  onSessionSelect?: (sessionId: string) => void;
  isInteractive?: boolean;
}

const SessionsDisplay: React.FC<SessionsDisplayProps> = ({ 
  sessions, 
  courseTitle,
  onSessionSelect,
  isInteractive = false
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sessions existantes</CardTitle>
      </CardHeader>
      <CardContent>
        <SessionsTable 
          sessions={sessions} 
          courseTitle={courseTitle}
          isInteractive={isInteractive}
          onSessionSelect={onSessionSelect}
        />
      </CardContent>
    </Card>
  );
};

export default SessionsDisplay;
