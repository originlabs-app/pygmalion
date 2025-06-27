
import React from 'react';

interface DateDisplayProps {
  startDate: string;
  endDate: string;
  formatDate: (date: string) => string;
}

export const DateDisplay: React.FC<DateDisplayProps> = ({ 
  startDate, 
  endDate, 
  formatDate 
}) => {
  return (
    <>
      <div>{formatDate(startDate)}</div>
      <div className="text-sm text-muted-foreground">
        au {formatDate(endDate)}
      </div>
    </>
  );
};
