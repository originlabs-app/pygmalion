
import React from 'react';
import { Clock, Shield } from 'lucide-react';
import { CardTitle, CardDescription } from '@/components/ui/card';

interface QuizHeaderProps {
  title: string;
  remainingTime: number;
  fraudDetectionActive: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ 
  title, 
  remainingTime, 
  fraudDetectionActive 
}) => {
  // Format remaining time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Répondez à toutes les questions pour valider votre formation
        </CardDescription>
      </div>
      <div className="flex flex-col items-end">
        <div className="flex items-center text-amber-600 mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{formatTime(remainingTime)}</span>
        </div>
        {fraudDetectionActive && (
          <div className="flex items-center text-amber-600">
            <Shield className="h-4 w-4 mr-1" />
            <span className="text-sm">Surveillance active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;
