
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const useFocusedExam = (
  questions: Question[],
  onCompleteExam: (score: number) => void
) => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [remainingTime, setRemainingTime] = useState(1800); // 30 minutes
  const [securityWarnings, setSecurityWarnings] = useState(0);
  
  // Track focus and blur events
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !quizSubmitted) {
        setSecurityWarnings(prev => prev + 1);
        toast.warning("ATTENTION: Quitter cette page pendant l'évaluation est considéré comme une tentative de fraude", {
          duration: 5000
        });
      }
    };
    
    // Set up page visibility detection
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Block navigation keys
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block Alt+Tab, Alt+F4, etc.
      if ((e.altKey || e.ctrlKey) && !quizSubmitted) {
        setSecurityWarnings(prev => prev + 1);
        toast.warning("Raccourcis clavier désactivés pendant l'examen", {
          duration: 3000
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setSecurityWarnings(prev => prev + 1);
      toast.warning("Menu contextuel désactivé pendant l'examen", {
        duration: 3000
      });
      return false;
    };
    
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Display initial security message
    toast.warning("Mode examen activé. Toute tentative de fraude sera enregistrée.", {
      duration: 8000,
      description: "Votre webcam et vos actions sont surveillées pendant toute la durée de l'évaluation."
    });
    
    // Clean up
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [quizSubmitted]);
  
  // Handle time up
  const handleTimeUp = () => {
    toast.error("Le temps imparti est écoulé. Vos réponses ont été soumises automatiquement.", {
      duration: 5000
    });
    handleQuizSubmit();
  };
  
  // Handle quiz answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };
  
  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (quizAnswers.length < questions.length) {
      toast.error("Veuillez répondre à toutes les questions");
      return;
    }
    
    // Calculate score
    let correctAnswers = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
    
    // Show success or failure message
    if (score >= 70) {
      toast.success("Félicitations! Vous avez réussi l'évaluation.");
    } else {
      toast.error("Vous n'avez pas atteint le score minimum requis (70%).");
    }
    
    // Pass score to parent
    onCompleteExam(score);
  };

  return {
    quizAnswers,
    quizSubmitted,
    quizScore,
    remainingTime,
    securityWarnings,
    handleAnswerSelect,
    handleQuizSubmit,
    handleTimeUp,
    setRemainingTime,
  };
};
