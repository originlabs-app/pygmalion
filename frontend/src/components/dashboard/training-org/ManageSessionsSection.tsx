
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Course, Session } from '@/types';
import { Edit, Users, Calendar } from 'lucide-react';

interface ManageSessionsSectionProps {
  courses: Course[];
}

const ManageSessionsSection: React.FC<ManageSessionsSectionProps> = ({ courses }) => {
  // Get all sessions from all courses
  const allSessions = courses.reduce((sessions, course) => {
    const courseSessions = course.sessions.map(session => ({
      ...session,
      courseTitle: course.title
    }));
    return [...sessions, ...courseSessions];
  }, [] as (Session & { courseTitle: string })[]);

  // Sort sessions by start date (upcoming first)
  const sortedSessions = [...allSessions].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  // Get upcoming sessions (sessions that haven't started yet)
  const today = new Date();
  const upcomingSessions = sortedSessions.filter(session => 
    new Date(session.startDate) > today
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).format(date);
  };

  const getSessionLocation = (session: Session) => {
    return session.location === 'online' ? 'En ligne' : session.location;
  };

  const getAvailabilityBadge = (session: Session) => {
    if (session.availableSeats === 0) {
      return <Badge variant="secondary">Complet</Badge>;
    }
    if (session.availableSeats <= 3) {
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Presque complet</Badge>;
    }
    return <Badge variant="outline" className="border-green-500 text-green-500">Places disponibles</Badge>;
  };

  return (
    <DashboardCard 
      title="Sessions à venir" 
      description="Gérez les prochaines sessions de vos formations"
    >
      {upcomingSessions.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">Aucune session planifiée</h3>
          <p className="text-muted-foreground mb-4">
            Ajoutez des sessions à vos formations pour permettre les inscriptions.
          </p>
          {courses.length > 0 && (
            <Button asChild>
              <Link to={`/courses/${courses[0].id}/add-session`}>Ajouter une session</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Places</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.courseTitle}</TableCell>
                  <TableCell>{formatDate(session.startDate)}</TableCell>
                  <TableCell>{formatDate(session.endDate)}</TableCell>
                  <TableCell>{getSessionLocation(session)}</TableCell>
                  <TableCell>{session.availableSeats}</TableCell>
                  <TableCell>{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(session.price)}</TableCell>
                  <TableCell>{getAvailabilityBadge(session)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${session.courseId}/session/${session.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${session.courseId}/session/${session.id}/enrollments`}>
                          <Users className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardCard>
  );
};

export default ManageSessionsSection;
