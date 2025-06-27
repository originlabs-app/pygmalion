
import React from 'react';
import { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Monitor, 
  Video,
  RefreshCw 
} from 'lucide-react';

interface CourseSidebarProps {
  course: Course;
  navigateToSessions: () => void;
  formatDate: (date: string) => string;
  formatPrice: (price: number) => string;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  course,
  navigateToSessions,
  formatDate,
  formatPrice
}) => {
  // Find the earliest upcoming session
  const upcomingSessions = course.sessions
    .filter(session => new Date(session.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  const nextSession = upcomingSessions.length > 0 ? upcomingSessions[0] : null;
  
  // Get the icon based on course type
  const CourseTypeIcon = {
    'in-person': BookOpen,
    'online': Monitor,
    'virtual': Video,
    'blended': RefreshCw
  }[course.type];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CourseTypeIcon className="h-5 w-5 text-primary" />
            <span className="font-semibold">
              {course.type === 'in-person' ? 'In-Person Training' : 
               course.type === 'online' ? 'E-Learning' : 
               course.type === 'virtual' ? 'Virtual Classroom' : 
               'Blended Learning'}
            </span>
          </div>
          
          {nextSession ? (
            <>
              <div className="text-sm space-y-2 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Next session: {formatDate(nextSession.startDate)}</span>
                </div>
                
                {course.type !== 'online' && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{new Date(nextSession.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                
                {course.type !== 'online' && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{nextSession.location}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{nextSession.availableSeats} seats available</span>
                </div>
              </div>
              
              <div className="font-semibold text-lg mb-4">
                {formatPrice(nextSession.price)}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mb-4">No upcoming sessions scheduled</p>
          )}
          
          <Button 
            onClick={navigateToSessions}
            className="w-full"
          >
            {course.sessions.length > 0
              ? 'View Available Sessions'
              : 'Check for Sessions'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSidebar;
