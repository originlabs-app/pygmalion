
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { QuizQuestion } from '@/types';
import QuizQuestionItem from './QuizQuestionItem';

interface QuizContentFormProps {
  quizQuestions: QuizQuestion[];
  updateQuestion: (index: number, field: keyof QuizQuestion, value: string | number | { index: number, value: string }) => void;
  handleAddQuestion: () => void;
  handleRemoveQuestion: (index: number) => void;
}

const QuizContentForm: React.FC<QuizContentFormProps> = ({
  quizQuestions,
  updateQuestion,
  handleAddQuestion,
  handleRemoveQuestion
}) => {
  return (
    <div className="space-y-6">
      {quizQuestions.map((question, qIndex) => (
        <QuizQuestionItem
          key={qIndex}
          question={question}
          qIndex={qIndex}
          updateQuestion={updateQuestion}
          handleRemoveQuestion={handleRemoveQuestion}
          canRemove={quizQuestions.length > 1}
        />
      ))}
      
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddQuestion}
      >
        <Plus className="h-4 w-4 mr-2" /> Ajouter une question
      </Button>
    </div>
  );
};

export default QuizContentForm;
