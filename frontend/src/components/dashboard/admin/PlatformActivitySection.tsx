
import React from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: 'success' | 'info' | 'warning' | 'special';
}

interface PlatformActivitySectionProps {
  activities: ActivityItem[];
}

const PlatformActivitySection: React.FC<PlatformActivitySectionProps> = ({ activities }) => {
  // Helper function to get border and background classes based on activity type
  const getActivityStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'info':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'warning':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'special':
        return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <DashboardCard 
      title="Platform Activity" 
      description="Recent events and notifications"
    >
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`p-3 border-l-4 ${getActivityStyles(activity.type)}`}
          >
            <p className="font-medium">{activity.title}</p>
            <p className="text-sm text-muted-foreground">
              {activity.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{activity.timeAgo}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default PlatformActivitySection;
