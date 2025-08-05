import { useState, useEffect, useCallback } from 'react';
import logger from '@/services/logger.service';
import { securityService } from '@/services/securityService';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamSession {
  id: string;
  examId: string;
  sessionToken: string;
  configuration: {
    proctoring_enabled: boolean;
    webcam_required: boolean;
    browser_lockdown: boolean;
    time_limit: number;
    alert_threshold: number;
  };
}

export const useFocusedExam = (
  questions: Question[], 
  onCompleteExam: (score: number) => void,
  examId?: string
) => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [securityWarnings, setSecurityWarnings] = useState(0);
  const [remainingTime, setRemainingTime] = useState(3600); // 1 heure par défaut
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialiser la session d'examen sécurisée
  useEffect(() => {
    if (examId) {
      initializeSecureExam();
    }
  }, [examId]);

  const initializeSecureExam = async () => {
    try {
      // Démarrer une session d'examen sécurisée
      const session = await securityService.startSecureExam(examId!);
      setExamSession(session);
      setRemainingTime(session.configuration.time_limit * 60); // Convertir en secondes
      
      // Activer le mode plein écran si requis
      if (session.configuration.browser_lockdown) {
        enableFullscreen();
      }
      
      // Démarrer la surveillance
      startSecurityMonitoring(session);
      
    } catch (error) {
      logger.error('Erreur lors de l\'initialisation de la session d\'examen:', error);
      toast.error('Impossible de démarrer l\'examen sécurisé');
    }
  };

  const enableFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((error) => {
        logger.warn('Impossible d\'activer le mode plein écran:', error);
        recordSecurityEvent('fullscreen_failed', 'low');
      });
    }
  }, []);

  const startSecurityMonitoring = (session: ExamSession) => {
    // Surveiller les changements de focus de la fenêtre
    const handleVisibilityChange = () => {
      if (document.hidden && !quizSubmitted) {
        recordSecurityEvent('tab_switch', 'medium');
        setSecurityWarnings(prev => prev + 1);
        toast.warning('Changement d\'onglet détecté - Incident de sécurité enregistré');
      }
    };

    // Surveiller la sortie du mode plein écran
    const handleFullscreenChange = () => {
      if (session.configuration.browser_lockdown && !document.fullscreenElement && !quizSubmitted) {
        recordSecurityEvent('fullscreen_exit', 'high');
        setSecurityWarnings(prev => prev + 1);
        toast.error('Sortie du mode plein écran détectée - Incident critique');
      }
    };

    // Bloquer le clic droit
    const handleContextMenu = (e: MouseEvent) => {
      if (session.configuration.browser_lockdown) {
        e.preventDefault();
        recordSecurityEvent('right_click_blocked', 'low');
      }
    };

    // Bloquer copier-coller
    const handleKeyDown = (e: KeyboardEvent) => {
      if (session.configuration.browser_lockdown) {
        // Bloquer Ctrl+C, Ctrl+V, Ctrl+A, F12, etc.
        if ((e.ctrlKey && ['c', 'v', 'a', 'x'].includes(e.key.toLowerCase())) ||
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase()))) {
          e.preventDefault();
          recordSecurityEvent('copy_paste_attempt', 'medium');
          setSecurityWarnings(prev => prev + 1);
          toast.warning('Action bloquée - Tentative de copier-coller détectée');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  };

  const recordSecurityEvent = async (eventType: string, severity: 'low' | 'medium' | 'high') => {
    if (!examSession) return;

    try {
      await securityService.recordSecurityEvent({
        exam_session_id: examSession.id,
        event_type: eventType,
        severity,
        description: `Événement de sécurité: ${eventType}`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      logger.error('Erreur lors de l\'enregistrement de l\'événement de sécurité:', error);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = async () => {
    if (quizAnswers.length < questions.length) {
      toast.error('Veuillez répondre à toutes les questions');
      return;
    }

    // Calculer le score
    let correctAnswers = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    // Vérifier si l'examen doit être suspendu à cause des incidents
    if (examSession && securityWarnings >= examSession.configuration.alert_threshold) {
      toast.error(`Examen suspendu - Trop d'incidents de sécurité détectés (${securityWarnings})`);
      await recordSecurityEvent('exam_suspended', 'high');
    }

    // Terminer la session d'examen
    if (examSession) {
      try {
        await securityService.endExamSession(examSession.id, {
          score,
          completed: true,
          security_warnings: securityWarnings
        });
      } catch (error) {
        logger.error('Erreur lors de la finalisation de la session:', error);
      }
    }

    // Sortir du mode plein écran
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    onCompleteExam(score);
  };

  const handleTimeUp = () => {
    toast.error('Temps écoulé - Soumission automatique de l\'examen');
    handleQuizSubmit();
  };

  return {
    quizAnswers,
    quizSubmitted,
    quizScore,
    remainingTime,
    securityWarnings,
    examSession,
    isFullscreen,
    handleAnswerSelect,
    handleQuizSubmit,
    handleTimeUp,
    setRemainingTime,
  };
};