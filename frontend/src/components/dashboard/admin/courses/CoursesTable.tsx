
import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Archive
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  provider: string;
  providerId: string;
  category: string;
  type: string;
  status: string;
  sessionsCount: number;
  enrollmentsCount: number;
}

interface CoursesTableProps {
  courses: Course[];
  onAction: (id: string, action: string) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses, onAction }) => {
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Publiée</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500">Brouillon</Badge>;
      case 'archived':
        return <Badge variant="outline">Archivée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'in-person':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Présentiel</Badge>;
      case 'online':
        return <Badge variant="outline" className="border-green-500 text-green-500">En ligne</Badge>;
      case 'virtual':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Virtuel</Badge>;
      case 'blended':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Mixte</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Formation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Inscrits</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Aucune formation trouvée
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Badge variant="outline" className="text-xs">{course.category}</Badge>
                  </div>
                </TableCell>
                <TableCell>{getTypeBadge(course.type)}</TableCell>
                <TableCell>{course.provider}</TableCell>
                <TableCell>{course.sessionsCount}</TableCell>
                <TableCell>{course.enrollmentsCount}</TableCell>
                <TableCell>{getStatusBadge(course.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link to={`/courses/${course.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(course.id, 'edit')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {course.status === 'published' ? (
                        <DropdownMenuItem onClick={() => onAction(course.id, 'unpublish')}>
                          <Archive className="h-4 w-4 mr-2" />
                          Dépublier
                        </DropdownMenuItem>
                      ) : course.status === 'draft' ? (
                        <DropdownMenuItem onClick={() => onAction(course.id, 'publish')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Publier
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => onAction(course.id, 'restore')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Restaurer
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;
