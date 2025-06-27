
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { QuizQuestion } from '@/types';

interface QuizQuestionItemProps {
  question: QuizQuestion;
  qIndex: number;
  updateQuestion: (index: number, field: keyof QuizQuestion, value: string | number | { index: number, value: string }) => void;
  handleRemoveQuestion: (index: number) => void;
  canRemove: boolean;
}

const QuizQuestionItem: React.FC<QuizQuestionItemProps> = ({
  question,
  qIndex,
  updateQuestion,
  handleRemoveQuestion,
  canRemove
}) => {
  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Question {qIndex + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleRemoveQuestion(qIndex)}
          disabled={!canRemove}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Supprimer</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`question-${qIndex}`}>Question*</Label>
        <Input
          id={`question-${qIndex}`}
          value={question.question}
          onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
          placeholder="Saisissez votre question..."
          required
        />
      </div>
      
      <div className="space-y-3">
        <Label>Options de réponse*</Label>
        {question.options.map((option, oIndex) => (
          <div key={oIndex} className="flex gap-2">
            <div className="flex-grow">
              <Input
                value={option}
                onChange={(e) => updateQuestion(qIndex, 'options', { 
                  index: oIndex, 
                  value: e.target.value 
                })}
                placeholder={`Option ${oIndex + 1}`}
                required
              />
            </div>
            <Button
              type="button"
              variant={question.correctAnswer === oIndex ? "default" : "outline"}
              size="sm"
              className={question.correctAnswer === oIndex ? "" : "text-muted-foreground"}
              onClick={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
            >
              Correcte
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestionItem;
