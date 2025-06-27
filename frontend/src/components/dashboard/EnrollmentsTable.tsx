
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Enrollment } from '@/types';
import { useCourses } from '@/contexts/CourseContext';
import { Link } from 'react-router-dom';
import { StatusBadge } from './enrollment/StatusBadge';
import { ModalityBadge } from './enrollment/ModalityBadge';
import { CourseAccessButton } from './enrollment/CourseAccessButton';
import { DateDisplay } from './enrollment/DateDisplay';

interface EnrollmentsTableProps {
  enrollments: Enrollment[];
  showCourseInfo?: boolean;
  showStudentInfo?: boolean;
}

const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({ 
  enrollments, 
  showCourseInfo = true,
  showStudentInfo = false
}) => {
  const { getCourse } = useCourses();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {showStudentInfo && <TableHead>Apprenant</TableHead>}
            {showCourseInfo && <TableHead>Formation</TableHead>}
            <TableHead>Dates de Session</TableHead>
            <TableHead>Modalité</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => {
              const course = getCourse(enrollment.courseId);
              const session = course?.sessions.find(s => s.id === enrollment.sessionId);
              
              return (
                <TableRow key={enrollment.id}>
                  {showStudentInfo && (
                    <TableCell>
                      <div className="font-medium">Nom de l'Apprenant</div>
                      <div className="text-sm text-muted-foreground">apprenant@email.com</div>
                    </TableCell>
                  )}
                  
                  {showCourseInfo && (
                    <TableCell>
                      <div className="font-medium">{course?.title || 'Formation inconnue'}</div>
                      <div className="text-sm text-muted-foreground">{course?.provider || 'Organisme inconnu'}</div>
                    </TableCell>
                  )}
                  
                  <TableCell>
                    {session ? (
                      <DateDisplay 
                        startDate={session.startDate} 
                        endDate={session.endDate}
                        formatDate={formatDate}
                      />
                    ) : (
                      'Session inconnue'
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <ModalityBadge type={course?.type} />
                  </TableCell>
                  
                  <TableCell>
                    <StatusBadge 
                      status={enrollment.status}
                      paymentStatus={enrollment.paymentStatus}
                      progress={enrollment.progress} 
                    />
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <CourseAccessButton 
                        enrollment={enrollment}
                        course={course}
                        session={session}
                      />
                      
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${course?.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={showStudentInfo && showCourseInfo ? 6 : showStudentInfo || showCourseInfo ? 5 : 4} className="text-center py-6">
                Aucune inscription trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnrollmentsTable;
