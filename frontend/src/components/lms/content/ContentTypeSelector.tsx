
import React from 'react';
import { Button } from '@/components/ui/button';

interface ContentTypeSelectorProps {
  contentType: 'text' | 'video' | 'pdf' | 'interactive' | 'quiz';
  onChangeContentType: (type: 'text' | 'video' | 'pdf' | 'interactive' | 'quiz') => void;
  moduleValidated: boolean;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  contentType,
  onChangeContentType,
  moduleValidated
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        size="sm" 
        variant={contentType === 'text' ? "default" : "outline"}
        onClick={() => onChangeContentType('text')}
      >
        Texte
      </Button>
      <Button 
        size="sm" 
        variant={contentType === 'video' ? "default" : "outline"}
        onClick={() => onChangeContentType('video')}
      >
        Vidéo
      </Button>
      <Button 
        size="sm" 
        variant={contentType === 'pdf' ? "default" : "outline"}
        onClick={() => onChangeContentType('pdf')}
      >
        PDF
      </Button>
      <Button 
        size="sm" 
        variant={contentType === 'interactive' ? "default" : "outline"}
        onClick={() => onChangeContentType('interactive')}
      >
        Interactif
      </Button>
      <Button 
        size="sm" 
        variant={contentType === 'quiz' ? "default" : "outline"}
        onClick={() => onChangeContentType('quiz')}
        className="relative"
      >
        Quiz
        {!moduleValidated && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </Button>
    </div>
  );
};

export default ContentTypeSelector;
