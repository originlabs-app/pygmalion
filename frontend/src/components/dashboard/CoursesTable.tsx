
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface CoursesTableProps {
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Sessions</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="font-medium">{course.title}</div>
                </TableCell>
                
                <TableCell>
                  <Badge variant="outline">{course.category}</Badge>
                </TableCell>
                
                <TableCell>
                  <Badge variant={
                    course.type === 'in-person' ? 'default' : 
                    course.type === 'online' ? 'secondary' : 
                    'outline'
                  }>
                    {course.type === 'in-person' ? 'In-Person' : 
                     course.type === 'online' ? 'E-Learning' : 
                     'Virtual Class'}
                  </Badge>
                </TableCell>
                
                <TableCell>
                  <div className="text-muted-foreground">
                    {course.sessions.length} session{course.sessions.length !== 1 ? 's' : ''}
                  </div>
                </TableCell>
                
                <TableCell>
                  <Badge variant={
                    course.status === 'published' ? 'success' :
                    course.status === 'draft' ? 'secondary' :
                    'outline'
                  }>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </Badge>
                </TableCell>
                
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/courses/${course.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/edit-course/${course.id}`}>Edit Course</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/add-session/${course.id}`}>Add Session</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/enrollments/${course.id}`}>View Enrollments</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No courses found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;
