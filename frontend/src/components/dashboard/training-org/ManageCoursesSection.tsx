
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Course } from '@/types';
import { Edit, Calendar, Play, List, AlertTriangle } from 'lucide-react';

interface ManageCoursesSectionProps {
  courses: Course[];
  isVerified: boolean;
}

const ManageCoursesSection: React.FC<ManageCoursesSectionProps> = ({ courses, isVerified }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="default" className="bg-green-500">Publiée</Badge>;
      case 'draft':
        return <Badge variant="secondary">Brouillon</Badge>;
      case 'archived':
        return <Badge variant="outline">Archivée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAvailableSeats = (course: Course) => {
    return course.sessions.reduce((total, session) => total + session.availableSeats, 0);
  };

  const getModalityBadge = (type: string) => {
    switch (type) {
      case 'in-person':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Présentiel</Badge>;
      case 'online':
        return <Badge variant="outline" className="border-green-500 text-green-500">E-learning</Badge>;
      case 'virtual':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Classe Virtuelle</Badge>;
      case 'blended':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Mixte</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <DashboardCard 
      title="Gérer mes formations" 
      description="Créez et gérez vos formations aéronautiques"
      action={
        isVerified ? (
          <Button asChild>
            <Link to="/courses/create">
              <List className="h-4 w-4 mr-2" />
              Nouvelle formation
            </Link>
          </Button>
        ) : (
          <Button disabled className="opacity-50 cursor-not-allowed">
            <List className="h-4 w-4 mr-2" />
            Nouvelle formation
            <span className="text-xs ml-1">(Validation requise)</span>
          </Button>
        )
      }
    >
      {!isVerified && (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Validation requise :</strong> Votre organisme doit être validé avant de pouvoir publier des formations sur la plateforme.
          </AlertDescription>
        </Alert>
      )}
      
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">Aucune formation créée</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par créer votre première formation pour la proposer sur la plateforme.
          </p>
          <Button asChild>
            <Link to="/courses/create">Créer ma première formation</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Modalité</TableHead>
                <TableHead>Sessions</TableHead>
                <TableHead>Places dispo.</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{getModalityBadge(course.type)}</TableCell>
                  <TableCell>{course.sessions.length}</TableCell>
                  <TableCell>{getAvailableSeats(course)}</TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${course.id}`}>
                          <List className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${course.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/courses/${course.id}/add-session`}>
                          <Calendar className="h-4 w-4" />
                        </Link>
                      </Button>
                      {course.status === "draft" && (
                        isVerified ? (
                          <Button variant="ghost" size="sm" className="text-green-500">
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled 
                            className="opacity-50 cursor-not-allowed"
                            title="Validation d'organisme requise pour publier"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )
                      )}
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

export default ManageCoursesSection;
