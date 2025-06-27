
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import QuizHeader from './quiz/QuizHeader';
import SecurityWarning from './quiz/SecurityWarning';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  title: string;
  questions: Question[];
  fraudDetectionActive: boolean;
  tabFocused: boolean;
}

const CourseQuiz: React.FC<QuizProps> = ({ 
  title, 
  questions, 
  fraudDetectionActive, 
  tabFocused 
}) => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [securityWarnings, setSecurityWarnings] = useState(0);
  const [remainingTime, setRemainingTime] = useState(1800); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);

  // Start timer when component mounts
  useEffect(() => {
    setTimerActive(true);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!timerActive || quizSubmitted) return;
    
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timerActive, quizSubmitted]);

  // Handle time up
  const handleTimeUp = () => {
    toast.error("Le temps imparti est écoulé. Vos réponses ont été soumises automatiquement.", {
      duration: 5000
    });
    handleQuizSubmit();
  };

  // Monitor security warnings when tab focus changes
  useEffect(() => {
    if (fraudDetectionActive && !tabFocused && !quizSubmitted) {
      setSecurityWarnings(prev => prev + 1);
    }
  }, [tabFocused, fraudDetectionActive, quizSubmitted]);

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

    // Check for fraud detection alerts
    if (fraudDetectionActive && securityWarnings > 0) {
      toast.error(`Tentative de fraude détectée (${securityWarnings} avertissement${securityWarnings > 1 ? 's' : ''}). Votre évaluation pourrait être invalidée.`, {
        duration: 5000
      });
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
    setTimerActive(false);

    // Show success or failure message
    if (score >= 70) {
      toast.success("Félicitations! Vous avez réussi l'évaluation.");
    } else {
      toast.error("Vous n'avez pas atteint le score minimum requis. Révisez et réessayez.");
    }
  };

  const resetQuiz = () => {
    setQuizSubmitted(false);
    setQuizAnswers([]);
    setSecurityWarnings(0);
    setRemainingTime(1800);
    setTimerActive(true);
  };

  return (
    <Card>
      <CardHeader>
        <QuizHeader 
          title={title}
          remainingTime={remainingTime}
          fraudDetectionActive={fraudDetectionActive}
        />
      </CardHeader>
      <CardContent>
        {/* Security warning */}
        <SecurityWarning warnings={securityWarnings} />
        
        {quizSubmitted ? (
          <QuizResults 
            score={quizScore}
            securityWarnings={securityWarnings}
            onReset={resetQuiz}
          />
        ) : (
          <>
            <div className="space-y-8">
              {questions.map((question, qIndex) => (
                <QuizQuestion
                  key={qIndex}
                  question={question.question}
                  options={question.options}
                  questionIndex={qIndex}
                  selectedAnswer={quizAnswers[qIndex]}
                  onAnswerSelect={handleAnswerSelect}
                />
              ))}
            </div>
            <div className="mt-6">
              <Button onClick={handleQuizSubmit}>
                Soumettre mes réponses
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseQuiz;
