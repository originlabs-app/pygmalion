
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionProps {
  question: string;
  options: string[];
  questionIndex: number;
  selectedAnswer?: number;
  onAnswerSelect: (questionIndex: number, answerIndex: number) => void;
}

const QuizQuestion: React.FC<QuestionProps> = ({ 
  question, 
  options, 
  questionIndex, 
  selectedAnswer,
  onAnswerSelect 
}) => {
  return (
    <div className="border rounded-md p-4">
      <h3 className="font-semibold mb-4">{questionIndex + 1}. {question}</h3>
      <RadioGroup
        value={selectedAnswer?.toString()}
        onValueChange={(value) => onAnswerSelect(questionIndex, parseInt(value))}
      >
        <div className="space-y-3">
          {options.map((option, oIndex) => (
            <div key={oIndex} className="flex items-center space-x-2">
              <RadioGroupItem value={oIndex.toString()} id={`q${questionIndex}-o${oIndex}`} />
              <Label htmlFor={`q${questionIndex}-o${oIndex}`}>{option}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuizQuestion;
