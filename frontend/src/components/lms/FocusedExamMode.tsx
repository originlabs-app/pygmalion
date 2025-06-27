
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
  onExitExam: () => void;
  onCompleteExam: (score: number) => void;
}

const FocusedExamMode: React.FC<FocusedExamModeProps> = ({
  title,
  questions,
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
    handleAnswerSelect,
    handleQuizSubmit,
    handleTimeUp,
    setRemainingTime,
  } = useFocusedExam(questions, onCompleteExam);
  
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
