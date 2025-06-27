
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionProps {
  question: string;
  options: string[];
  index: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onAnswerSelect: (answerIndex: number) => void;
}

const ExamQuestion: React.FC<QuestionProps> = ({
  question,
  options,
  index,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Question {index + 1} sur {totalQuestions}
        </CardTitle>
        <CardDescription className="text-base font-medium text-foreground">
          {question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => onAnswerSelect(parseInt(value))}
        >
          <div className="space-y-4">
            {options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center space-x-3 border rounded-md p-3 hover:bg-muted/40 cursor-pointer">
                <RadioGroupItem value={oIndex.toString()} id={`q${index}-o${oIndex}`} />
                <Label 
                  htmlFor={`q${index}-o${oIndex}`}
                  className="flex-1 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ExamQuestion;
