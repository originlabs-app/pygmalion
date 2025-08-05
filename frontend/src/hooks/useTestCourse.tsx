
import { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { testCourseData } from '@/services/lmsService';
import { toast } from 'sonner';

export const useTestCourse = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { currentUser } = useAuth();
  const { enrollments } = useEnrollments();
  const navigate = useNavigate();

  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  const [securityVerification, setSecurityVerification] = useState<'idle' | 'verifying' | 'completed'>('idle');
  const [fraudDetectionActive, setFraudDetectionActive] = useState(false);

  // Calculate progress whenever current module changes
  useEffect(() => {
    const newProgress = ((currentModule + 1) / testCourseData.modules.length) * 100;
    setProgress(newProgress);
  }, [currentModule]);

  // Update enrollment progress in a real app
  const updateProgress = () => {
    logger.info(`Updating progress for user ${currentUser?.id} - ${progress}% completed`);
  };

  // Handle module navigation
  const nextModule = () => {
    if (currentModule < testCourseData.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      updateProgress();
      window.scrollTo(0, 0);
    } else {
      setSecurityVerification('idle');
      toast.info("L'évaluation finale nécessite une vérification d'identité", {
        duration: 5000
      });
    }
  };

  const prevModule = () => {
    if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSecurityVerificationComplete = () => {
    setSecurityVerification('completed');
    setFraudDetectionActive(true);
    setActiveTab('quiz'); // Automatic redirection to quiz
    
    // Show enhanced security notification
    toast.success("Système de surveillance anti-fraude activé", {
      description: "Mode examen activé. La navigation est restreinte durant l'évaluation.",
      duration: 5000
    });
  };

  const handleModuleClick = (index: number) => {
    // Prevent module navigation during exam
    if (activeTab === 'quiz' && fraudDetectionActive) {
      toast.warning("Navigation désactivée pendant l'examen");
      return;
    }
    setCurrentModule(index);
  };

  const handleTabClick = (tab: string) => {
    // Prevent tab switching if already in exam mode
    if (activeTab === 'quiz' && fraudDetectionActive && tab !== 'quiz') {
      toast.warning("Vous êtes actuellement en mode examen", {
        description: "Terminez d'abord votre évaluation",
        duration: 3000
      });
      return;
    }
    
    if (tab === 'security' && progress < 100) {
      toast.info("Terminez tous les modules avant de passer à l'évaluation");
      return;
    }
    
    if (tab === 'quiz' && securityVerification !== 'completed' && progress >= 100) {
      setActiveTab('security');
      return;
    }
    
    setActiveTab(tab);
  };

  return {
    currentUser,
    courseData: testCourseData,
    currentModule,
    progress,
    activeTab,
    securityVerification,
    fraudDetectionActive,
    setFraudDetectionActive,
    nextModule,
    prevModule,
    handleSecurityVerificationComplete,
    handleModuleClick,
    handleTabClick
  };
};
