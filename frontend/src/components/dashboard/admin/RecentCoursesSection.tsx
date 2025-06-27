
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  provider: string;
  status: string;
  date: string;
}

interface RecentCoursesSectionProps {
  recentCourses: Course[];
}

const RecentCoursesSection: React.FC<RecentCoursesSectionProps> = ({ recentCourses }) => {
  return (
    <DashboardCard 
      title="Recent Courses" 
      description="Latest courses added to the platform"
    >
      <div className="space-y-4">
        {recentCourses.map((course) => (
          <div key={course.id} className="flex items-start justify-between border-b pb-4">
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-muted-foreground">Provider: {course.provider}</p>
              <div className="mt-1">
                <Badge variant={course.status === 'published' ? 'success' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                {new Date(course.date).toLocaleDateString()}
              </div>
              <Button variant="ghost" size="sm" className="mt-2">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentCoursesSection;
