
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ExamHeader from './exam/ExamHeader';
import ExamQuestion from './exam/ExamQuestion';
import ExamResults from './exam/ExamResults';
import ExamExitConfirmation from './exam/ExamExitConfirmation';
import SecurityWarnings from './exam/SecurityWarnings';
import { useFocusedExam } from '@/hooks/useFocusedExam';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface FocusedExamModeProps {
  title: string;
  questions: Question[];
  examId?: string; // ID de l'examen pour la sécurité
  onExitExam: () => void;
  onCompleteExam: (score: number) => void;
}

const FocusedExamMode: React.FC<FocusedExamModeProps> = ({
  title,
  questions,
  examId,
  onExitExam,
  onCompleteExam,
}) => {
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  
  const {
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
  } = useFocusedExam(questions, onCompleteExam, examId);
  
  const handleExitAttempt = () => {
    if (quizSubmitted) {
      onExitExam();
    } else {
      setIsExitConfirmOpen(true);
      toast.warning("Êtes-vous sûr de vouloir quitter l'examen? Vos réponses ne seront pas enregistrées et cette tentative sera signalée.", {
        duration: 8000,
        action: {
          label: "Continuer l'examen",
          onClick: () => setIsExitConfirmOpen(false)
        }
      });
    }
  };
  
  const confirmExit = () => {
    toast.info("Examen interrompu. Cette tentative a été enregistrée comme incomplète.");
    onExitExam();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col overflow-auto">
      {/* Security status indicator */}
      {examSession && (
        <div className="bg-green-600 text-white px-4 py-2 text-sm flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
          Session sécurisée active
          {examSession.configuration.proctoring_enabled && " • Proctoring activé"}
          {examSession.configuration.browser_lockdown && " • Mode verrouillé"}
        </div>
      )}
      
      {/* Header */}
      <ExamHeader 
        title={title}
        remainingTime={remainingTime}
        setRemainingTime={setRemainingTime}
        onTimeUp={handleTimeUp}
        onExitAttempt={handleExitAttempt}
        isSubmitted={quizSubmitted}
      />
      
      {/* Main content */}
      <div className="container py-6 flex-1">
        {isExitConfirmOpen && !quizSubmitted && (
          <ExamExitConfirmation 
            onContinue={() => setIsExitConfirmOpen(false)}
            onExit={confirmExit}
          />
        )}
        
        {quizSubmitted ? (
          <ExamResults 
            score={quizScore} 
            onExit={onExitExam} 
            securityWarnings={securityWarnings}
          />
        ) : (
          <ExamContent
            questions={questions}
            quizAnswers={quizAnswers}
            securityWarnings={securityWarnings}
            handleAnswerSelect={handleAnswerSelect}
            handleQuizSubmit={handleQuizSubmit}
          />
        )}
      </div>
    </div>
  );
};

interface ExamContentProps {
  questions: Question[];
  quizAnswers: number[];
  securityWarnings: number;
  handleAnswerSelect: (questionIndex: number, answerIndex: number) => void;
  handleQuizSubmit: () => void;
}

const ExamContent: React.FC<ExamContentProps> = ({
  questions,
  quizAnswers,
  securityWarnings,
  handleAnswerSelect,
  handleQuizSubmit
}) => {
  return (
    <div className="space-y-8">
      {/* Security warnings section */}
      <SecurityWarnings warnings={securityWarnings} />
      
      {questions.map((question, qIndex) => (
        <ExamQuestion
          key={qIndex}
          question={question.question}
          options={question.options}
          index={qIndex}
          totalQuestions={questions.length}
          selectedAnswer={quizAnswers[qIndex]}
          onAnswerSelect={(answerIndex) => handleAnswerSelect(qIndex, answerIndex)}
        />
      ))}
      
      <div className="flex justify-center pt-4 pb-10">
        <Button 
          onClick={handleQuizSubmit} 
          size="lg"
          disabled={quizAnswers.length < questions.length}
          className="px-8"
        >
          Soumettre l'évaluation
        </Button>
      </div>
    </div>
  );
};

export default FocusedExamMode;
