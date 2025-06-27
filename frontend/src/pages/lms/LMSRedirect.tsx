
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLMSAccess } from '@/hooks/useLMSAccess';
import SecurityChecks from '@/components/lms/SecurityChecks';
import RedirectError from '@/components/lms/RedirectError';
import CourseAccessPage from '@/components/lms/CourseAccessPage';
import LoadingCourseAccess from '@/components/lms/LoadingCourseAccess';

const LMSRedirect: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const {
    isRedirecting,
    securityChecks,
    errorMessage,
    course,
    session,
    handleAccessContent,
    handleRetry,
    handleReturn
  } = useLMSAccess(sessionId);

  // Render different content based on state
  const renderContent = () => {
    if (errorMessage) {
      return (
        <RedirectError 
          errorMessage={errorMessage}
          onRetry={handleRetry}
          onReturn={handleReturn}
        />
      );
    }

    if (isRedirecting) {
      return (
        <SecurityChecks 
          isRedirecting={isRedirecting}
          securityChecks={securityChecks}
          onManualRedirect={handleAccessContent}
          sessionId={sessionId || ''}
        />
      );
    }

    if (course && session) {
      return (
        <CourseAccessPage
          course={course}
          session={session}
          onAccessContent={handleAccessContent}
        />
      );
    }

    // Loading state
    return <LoadingCourseAccess />;
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-md mx-auto">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default LMSRedirect;
