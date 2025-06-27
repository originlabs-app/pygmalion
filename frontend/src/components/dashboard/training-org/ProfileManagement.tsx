
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileTab from './ProfileTab';
import StudentsTab from './StudentsTab';
import OverviewTab from './OverviewTab';
import { VerificationStatus } from '@/types/verification';
import { Enrollment, Course } from '@/types';

interface ProfileManagementProps {
  verificationStatus: VerificationStatus;
  enrollmentsByCourseName: { name: string; inscriptions: number }[];
  courseStatusData: { name: string; value: number; color: string }[];
  courseTypesCount: { name: string; count: number; color: string }[];
  orgEnrollments: Enrollment[];
  totalEarnings: number;
  enrollmentGrowth: number;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ 
  verificationStatus,
  enrollmentsByCourseName,
  courseStatusData,
  courseTypesCount,
  orgEnrollments,
  totalEarnings,
  enrollmentGrowth
}) => {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="profile">Profil</TabsTrigger>
        <TabsTrigger value="students">Apprenants</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab 
          enrollmentsByCourseName={enrollmentsByCourseName}
          courseStatusData={courseStatusData}
          courseTypesCount={courseTypesCount}
          orgEnrollments={orgEnrollments}
          totalEarnings={totalEarnings}
          enrollmentGrowth={enrollmentGrowth}
        />
      </TabsContent>
      <TabsContent value="profile">
        <ProfileTab verificationStatus={verificationStatus} />
      </TabsContent>
      <TabsContent value="students">
        <StudentsTab enrollments={orgEnrollments} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileManagement;
