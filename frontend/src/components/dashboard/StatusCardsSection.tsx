
import React from 'react';
import { Book, Calendar, Award } from 'lucide-react';
import StatusCard from '@/components/dashboard/StatusCard';
import { Enrollment } from '@/types';

interface StatusCardsSectionProps {
  activeEnrollments: Enrollment[];
  upcomingEnrollments: Enrollment[];
  completedEnrollments: Enrollment[];
}

const StatusCardsSection: React.FC<StatusCardsSectionProps> = ({
  activeEnrollments,
  upcomingEnrollments,
  completedEnrollments
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatusCard
        title="Formations En Cours"
        value={String(activeEnrollments.length)}
        trend={{ value: 0, isPositive: true }}
        icon={<Book className="h-5 w-5" />}
      />
      <StatusCard
        title="Formations à Venir"
        value={String(upcomingEnrollments.length)}
        icon={<Calendar className="h-5 w-5" />}
      />
      <StatusCard
        title="Formations Complétées"
        value={String(completedEnrollments.length)}
        icon={<Award className="h-5 w-5" />}
      />
    </div>
  );
};

export default StatusCardsSection;
