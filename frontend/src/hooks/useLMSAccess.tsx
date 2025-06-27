
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { toast } from 'sonner';
import { useSecurityChecks } from '@/hooks/useSecurityChecks';
import { handleLMSRedirect } from '@/services/lmsService';
import { getModalityDetails, isSessionAccessible } from '@/services/modalityService';

export function useLMSAccess(sessionId: string | undefined) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { getCourse } = useCourses();
  const { getStudentEnrollments } = useEnrollments();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { securityChecks, performSecurityChecks } = useSecurityChecks();
  const [course, setCourse] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const validateAccess = async () => {
      // Check if we have all the required data
      if (!sessionId || !currentUser) {
        setErrorMessage("Informations manquantes pour accéder au cours");
        return;
      }

      try {
        // Special case for our test course (2-1)
        if (sessionId === '2-1') {
          console.log("Redirecting to test course");
          navigate('/lms/course/test-aviation-safety');
          return;
        }

        // Verify that the user is enrolled in this session
        const userEnrollments = getStudentEnrollments(currentUser.id);
        const enrollment = userEnrollments.find(e => e.sessionId === sessionId);

        if (!enrollment) {
          toast.error("Vous n'êtes pas inscrit à cette session de formation");
          navigate('/student-dashboard');
          return;
        }

        // Get course info to check if it's valid
        const foundCourse = getCourse(enrollment.courseId);
        const foundSession = foundCourse?.sessions.find(s => s.id === sessionId);

        if (!foundCourse || !foundSession) {
          setErrorMessage("Session de formation introuvable");
          return;
        }

        // Store course and session data
        setCourse(foundCourse);
        setSession(foundSession);

        // Check if session has ended
        if (!isSessionAccessible(foundSession)) {
          if (new Date(foundSession.startDate) > new Date()) {
            setErrorMessage(`Cette session de formation n'a pas encore débuté. Elle commencera le ${new Date(foundSession.startDate).toLocaleDateString('fr-FR')}.`);
          } else {
            setErrorMessage("Cette session de formation est terminée");
          }
          return;
        }

        // Get modality details
        const modalityDetails = getModalityDetails(foundCourse.type);
        
        // Check if this modality requires security verification
        if (modalityDetails.requiresVerification) {
          // Run security and compatibility checks
          performSecurityChecks();
        }
      } catch (error) {
        console.error("LMS access validation error:", error);
        setErrorMessage("Erreur lors de la validation de l'accès au LMS");
      }
    };

    validateAccess();
  }, [sessionId, currentUser, navigate, getCourse, getStudentEnrollments, performSecurityChecks]);

  const handleAccessContent = () => {
    if (!currentUser || !sessionId || !course) return;
    
    setIsRedirecting(true);
    
    if (sessionId === '2-1') {
      navigate('/lms/course/test-aviation-safety');
      return;
    }
    
    // Check security requirements based on modality
    const modalityDetails = getModalityDetails(course.type);
    
    if (modalityDetails.requiresVerification) {
      // Run security checks before access
      performSecurityChecks();
      
      setTimeout(() => {
        handleLMSRedirect(sessionId, currentUser.id)
          .catch(() => {
            setIsRedirecting(false);
            setErrorMessage("Erreur lors de la redirection vers le LMS");
          });
      }, 1500);
    } else {
      // Direct access for modalities that don't require verification
      handleLMSRedirect(sessionId, currentUser.id)
        .catch(() => {
          setIsRedirecting(false);
          setErrorMessage("Erreur lors de la redirection vers le LMS");
        });
    }
  };

  return {
    isRedirecting,
    securityChecks,
    errorMessage,
    course,
    session,
    handleAccessContent,
    handleRetry: () => window.location.reload(),
    handleReturn: () => navigate('/student-dashboard')
  };
}
