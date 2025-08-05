
import React, { useEffect, useState } from 'react';
import logger from '@/services/logger.service';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SecurityVerification from './SecurityVerification';
import CourseContent from './CourseContent';
import CourseQuiz from './CourseQuiz';
import FocusedExamMode from './FocusedExamMode';
import { useFraudDetection } from '@/hooks/useFraudDetection';
import { toast } from 'sonner';

interface CourseMainContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentModule: number;
  courseData: unknown;
  onNextModule: () => void;
  onPrevModule: () => void;
  securityVerification: 'idle' | 'verifying' | 'completed';
  progress: number;
  onSecurityVerificationComplete: () => void;
  fraudDetectionActive: boolean;
}

const CourseMainContent: React.FC<CourseMainContentProps> = ({
  activeTab,
  onTabChange,
  currentModule,
  courseData,
  onNextModule,
  onPrevModule,
  securityVerification,
  progress,
  onSecurityVerificationComplete,
  fraudDetectionActive,
}) => {
  const [focusedExamMode, setFocusedExamMode] = useState(false);
  
  // Use the enhanced fraud detection hook with more options
  const { tabFocused, suspiciousActivity, warnings, securityEvents } = useFraudDetection(
    fraudDetectionActive,
    {
      preventTabSwitching: true,
      monitorKeyboard: true,
      preventCopyPaste: true,
      detectMultiplePersons: false // Enable in production with real face detection
    }
  );

  // Log suspicious activity for review
  useEffect(() => {
    if (suspiciousActivity) {
      logger.info("Suspicious activity detected:", securityEvents);
      
      // In a real app, this would send a report to the backend
      if (warnings > 3) {
        toast.error("Activités suspectes détectées. Votre évaluation pourrait être invalidée.", {
          duration: 8000
        });
      }
    }
  }, [suspiciousActivity, warnings, securityEvents]);

  // Activate focused exam mode when the quiz tab is selected and security verification is completed
  useEffect(() => {
    if (activeTab === 'quiz' && securityVerification === 'completed') {
      setFocusedExamMode(true);
    }
  }, [activeTab, securityVerification]);

  const handleExitExam = () => {
    setFocusedExamMode(false);
    onTabChange('content');
  };

  const handleCompleteExam = (score: number) => {
    // Additional logic can be added here to handle exam completion
    logger.info("Exam completed with score:", score);
  };

  if (focusedExamMode) {
    return (
      <FocusedExamMode 
        title={courseData.quiz.title}
        questions={courseData.quiz.questions}
        onExitExam={handleExitExam}
        onCompleteExam={handleCompleteExam}
      />
    );
  }

  return (
    <div className="col-span-1 md:col-span-3">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="quiz" disabled={securityVerification !== 'completed' && progress < 100}>Évaluation</TabsTrigger>
          {progress >= 100 && securityVerification !== 'completed' && (
            <TabsTrigger value="security">Vérification</TabsTrigger>
          )}
        </TabsList>

        {/* Security Verification */}
        <TabsContent value="security">
          <SecurityVerification onVerificationComplete={onSecurityVerificationComplete} />
        </TabsContent>

        {/* Module Content */}
        <TabsContent value="content">
          <CourseContent 
            module={courseData.modules[currentModule]}
            onNextModule={onNextModule}
            onPrevModule={onPrevModule}
            isPrevDisabled={currentModule === 0}
            isLastModule={currentModule === courseData.modules.length - 1}
          />
        </TabsContent>

        {/* Quiz Content */}
        <TabsContent value="quiz">
          <CourseQuiz 
            title={courseData.quiz.title}
            questions={courseData.quiz.questions}
            fraudDetectionActive={fraudDetectionActive}
            tabFocused={tabFocused}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseMainContent;
