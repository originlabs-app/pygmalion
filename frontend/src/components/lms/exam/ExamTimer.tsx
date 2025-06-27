
import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';

interface ExamTimerProps {
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  onTimeUp: () => void;
  isSubmitted: boolean;
}

const ExamTimer: React.FC<ExamTimerProps> = ({
  remainingTime,
  setRemainingTime,
  onTimeUp,
  isSubmitted
}) => {
  // Format remaining time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;
    
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [setRemainingTime, onTimeUp, isSubmitted]);

  return (
    <div className="bg-amber-100 text-amber-800 px-4 py-1 rounded-md flex items-center">
      <Clock className="h-4 w-4 mr-2" />
      <span className="font-medium">{formatTime(remainingTime)}</span>
    </div>
  );
};

export default ExamTimer;
