
import React from 'react';
import { List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationFooterProps {
  onPrevModule: () => void;
  onChangeContentType: (type: 'text' | 'video' | 'pdf' | 'interactive' | 'quiz') => void;
  isPrevDisabled: boolean;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({
  onPrevModule,
  onChangeContentType,
  isPrevDisabled
}) => {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t">
      <Button
        variant="outline"
        onClick={onPrevModule}
        disabled={isPrevDisabled}
        className="text-muted-foreground"
      >
        Module précédent
      </Button>
      <Button 
        onClick={() => onChangeContentType('quiz')}
        className="bg-aviation-600 hover:bg-aviation-700"
      >
        <List className="h-4 w-4 mr-2" />
        Passer au quiz du module
      </Button>
    </div>
  );
};

export default NavigationFooter;
