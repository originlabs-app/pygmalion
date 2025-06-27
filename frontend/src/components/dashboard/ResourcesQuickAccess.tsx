
import React from 'react';
import { Link } from 'react-router-dom';
import { Enrollment, Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, FileText, Video, ExternalLink, Download } from 'lucide-react';

interface ResourcesQuickAccessProps {
  activeEnrollments: Enrollment[];
  getCourse: (id: string) => Course | undefined;
}

const ResourcesQuickAccess: React.FC<ResourcesQuickAccessProps> = ({ activeEnrollments, getCourse }) => {
  // Generate some random resource types for demo purposes
  const resourceTypes = ['document', 'video', 'exercise', 'quiz'];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {activeEnrollments.length > 0 ? (
        activeEnrollments.map(enrollment => {
          const course = getCourse(enrollment.courseId);
          
          // Generate random resources for demo purposes
          // In a real application, these would come from an API
          const resources = Array(Math.floor(Math.random() * 3) + 2).fill(null).map((_, index) => {
            const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
            return {
              id: `resource-${enrollment.id}-${index}`,
              name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`,
              type,
              url: '#'
            };
          });
          
          return (
            <Card key={enrollment.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <CardTitle className="text-lg">{course?.title || 'Formation'}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Ressources disponibles pour cette formation
                </p>
                <ul className="space-y-2">
                  {resources.map(resource => (
                    <li key={resource.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        {resource.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                        {resource.type === 'video' && <Video className="h-4 w-4 text-red-600" />}
                        {resource.type === 'exercise' && <Book className="h-4 w-4 text-green-600" />}
                        {resource.type === 'quiz' && <FileText className="h-4 w-4 text-purple-600" />}
                        <span className="text-sm">{resource.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                        <a href={resource.url} target="_blank" rel="noreferrer">
                          {resource.type === 'document' ? (
                            <Download className="h-4 w-4" />
                          ) : (
                            <ExternalLink className="h-4 w-4" />
                          )}
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-muted/30 pt-2">
                <Button variant="default" size="sm" className="w-full" asChild>
                  <a href={`/lms/course/${enrollment.courseId}`} target="_blank" rel="noreferrer">
                    Aller à la formation
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })
      ) : (
        <div className="md:col-span-2 rounded-md bg-muted/20 p-8 text-center">
          <Book className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucune formation active</h3>
          <p className="text-muted-foreground mb-4">
            Vous n'avez pas de formations actives. Inscrivez-vous à des formations pour accéder aux ressources pédagogiques.
          </p>
          <Button asChild>
            <Link to="/courses">Explorer les formations</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResourcesQuickAccess;
