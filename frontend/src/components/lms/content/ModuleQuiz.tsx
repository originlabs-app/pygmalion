
import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ModuleQuizProps {
  moduleTitle: string;
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
  onComplete: (passed: boolean) => void;
  isLastModule: boolean;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({ 
  moduleTitle, 
  quiz, 
  onComplete,
  isLastModule
}) => {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<{passed: boolean, score: number} | null>(null);
  const [validationAcknowledged, setValidationAcknowledged] = useState(false);

  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  // Handle quiz submission
  const handleQuizSubmit = () => {
    if (quizAnswers.length < quiz.questions.length) {
      setValidationAcknowledged(true);
      return;
    }

    // Calculate score
    let correctAnswers = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const passed = score >= 70; // 70% is passing score
    
    setQuizResult({ passed, score });
    setQuizSubmitted(true);
    onComplete(passed);
  };

  // Reset quiz
  const resetQuiz = () => {
    setQuizSubmitted(false);
    setQuizResult(null);
    setQuizAnswers([]);
    setValidationAcknowledged(false);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6 mb-6 bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center">Quiz du module: {moduleTitle}</h3>
      
      {quizSubmitted ? (
        <div className="text-center py-6">
          <div className={`text-4xl font-bold mb-4 ${quizResult?.passed ? 'text-green-600' : 'text-red-600'}`}>
            {quizResult?.score}%
          </div>
          <p className="mb-6 text-lg">
            {quizResult?.passed 
              ? "Félicitations! Vous avez réussi le quiz de ce module." 
              : "Vous n'avez pas atteint le score minimum requis de 70%."}
          </p>
          {quizResult?.passed ? (
            <Button onClick={() => onComplete(true)} className="gap-2">
              <Check className="h-4 w-4" />
              {isLastModule ? "Passer à l'évaluation" : "Module suivant"}
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Révisez le contenu du module et réessayez.
              </p>
              <Button onClick={resetQuiz}>
                Réessayer le quiz
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-muted-foreground text-center mb-4">
            Répondez correctement aux questions suivantes pour valider ce module.
          </p>
          
          {quiz.questions.map((question, qIndex) => (
            <div key={qIndex} className="p-4 border rounded-md">
              <h4 className="font-medium mb-3">{qIndex + 1}. {question.question}</h4>
              <RadioGroup
                value={quizAnswers[qIndex]?.toString()}
                onValueChange={(value) => handleAnswerSelect(qIndex, parseInt(value))}
                className="space-y-2"
              >
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-md">
                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                    <Label htmlFor={`q${qIndex}-o${oIndex}`} className="cursor-pointer flex-grow">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
          
          {validationAcknowledged && quizAnswers.length < quiz.questions.length && (
            <Alert className="border-amber-200 bg-amber-50 text-amber-900">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                Veuillez répondre à toutes les questions avant de soumettre.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-center mt-4">
            <Button onClick={handleQuizSubmit}>
              Valider mes réponses
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleQuiz;
