
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useTestCourse } from '@/hooks/useTestCourse';
import CourseSidebar from '@/components/lms/CourseSidebar';
import CourseHeader from '@/components/lms/CourseHeader';
import CourseMainContent from '@/components/lms/CourseMainContent';
import SecurityAlertBanner from '@/components/lms/SecurityAlertBanner';
import { toast } from 'sonner';

const TestCourse: React.FC = () => {
  const {
    currentUser,
    courseData,
    currentModule,
    progress,
    activeTab,
    securityVerification,
    fraudDetectionActive,
    nextModule,
    prevModule,
    handleSecurityVerificationComplete,
    handleModuleClick,
    handleTabClick
  } = useTestCourse();

  // Handle authentication check - early return for unauthenticated users
  if (!currentUser) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
            <p className="text-muted-foreground mb-6">
              Veuillez vous connecter pour accéder à votre formation.
            </p>
            <Button asChild>
              <Link to="/login">Connexion</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <CourseHeader 
          title={courseData.title} 
          progress={progress} 
        />

        {/* Alert for fraud detection */}
        <SecurityAlertBanner 
          fraudDetectionActive={fraudDetectionActive} 
          warnings={0} 
        />

        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Module Navigation */}
          <CourseSidebar 
            modules={courseData.modules}
            currentModule={currentModule}
            activeTab={activeTab}
            progress={progress}
            securityVerification={securityVerification}
            onModuleClick={handleModuleClick}
            onTabClick={handleTabClick}
          />

          {/* Main Content */}
          <CourseMainContent 
            activeTab={activeTab}
            onTabChange={handleTabClick}
            currentModule={currentModule}
            courseData={courseData}
            onNextModule={nextModule}
            onPrevModule={prevModule}
            securityVerification={securityVerification}
            progress={progress}
            onSecurityVerificationComplete={handleSecurityVerificationComplete}
            fraudDetectionActive={fraudDetectionActive}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TestCourse;
