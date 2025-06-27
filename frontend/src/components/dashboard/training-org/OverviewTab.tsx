
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EnrollmentsTable from '@/components/dashboard/EnrollmentsTable';
import { Enrollment, Course } from '@/types';
import EnrollmentsByCoursesChart from './EnrollmentsByCoursesChart';
import CourseStatusChart from './CourseStatusChart';
import CourseTypesChart from './CourseTypesChart';
import SalesCard from './SalesCard';

interface OverviewTabProps {
  enrollmentsByCourseName: { name: string; inscriptions: number }[];
  courseStatusData: { name: string; value: number; color: string }[];
  courseTypesCount: { name: string; count: number; color: string }[];
  orgEnrollments: Enrollment[];
  totalEarnings: number;
  enrollmentGrowth: number;
  showStudentInfo?: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  enrollmentsByCourseName,
  courseStatusData,
  courseTypesCount,
  orgEnrollments,
  totalEarnings,
  enrollmentGrowth,
  showStudentInfo = true
}) => {
  return (
    <div className="space-y-6">
      {/* Sales Summary */}
      <SalesCard 
        totalEarnings={totalEarnings}
        enrollmentGrowth={enrollmentGrowth}
      />
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DashboardCard 
          title="Inscriptions par formation" 
          description="Répartition des inscriptions par formation"
        >
          <EnrollmentsByCoursesChart data={enrollmentsByCourseName} />
        </DashboardCard>
        
        <div className="grid grid-cols-1 gap-6">
          <DashboardCard 
            title="Statut des formations" 
            description="Répartition des statuts de vos formations"
          >
            <CourseStatusChart data={courseStatusData} />
          </DashboardCard>
          
          <DashboardCard 
            title="Types de formations" 
            description="Répartition des modalités de formation"
          >
            <CourseTypesChart data={courseTypesCount} />
          </DashboardCard>
        </div>
      </div>
      
      {/* Recent Enrollments */}
      <DashboardCard 
        title="Inscriptions récentes" 
        description="Derniers apprenants inscrits à vos formations"
        action={
          <Button variant="outline" size="sm" asChild>
            <Link to="#students">Voir tout</Link>
          </Button>
        }
      >
        <EnrollmentsTable 
          enrollments={orgEnrollments.slice(0, 5)} 
          showStudentInfo={showStudentInfo} 
        />
      </DashboardCard>
    </div>
  );
};

export default OverviewTab;
