
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, X } from 'lucide-react';
import ExamTimer from './ExamTimer';

interface ExamHeaderProps {
  title: string;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp: () => void;
  onExitAttempt: () => void;
  isSubmitted: boolean;
}

const ExamHeader: React.FC<ExamHeaderProps> = ({
  title,
  remainingTime,
  setRemainingTime,
  onTimeUp,
  onExitAttempt,
  isSubmitted
}) => {
  return (
    <div className="bg-card shadow sticky top-0 z-10">
      <div className="container py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-muted-foreground text-sm">Évaluation sécurisée - Mode examen</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ExamTimer 
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            onTimeUp={onTimeUp}
            isSubmitted={isSubmitted}
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onExitAttempt}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Quitter l'examen</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
