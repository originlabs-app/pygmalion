
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Import content components
import TextContent from './content/TextContent';
import VideoContent from './content/VideoContent';
import PdfContent from './content/PdfContent';
import InteractiveContent from './content/InteractiveContent';
import ModuleQuiz from './content/ModuleQuiz';
import ContentTypeSelector from './content/ContentTypeSelector';
import NavigationFooter from './content/NavigationFooter';

interface Module {
  id: string;
  title: string;
  content: string;
  duration: string;
  quiz?: ModuleQuiz;
}

interface ModuleQuiz {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface CourseContentProps {
  module: Module;
  onNextModule: () => void;
  onPrevModule: () => void;
  isPrevDisabled: boolean;
  isLastModule: boolean;
}

const CourseContent: React.FC<CourseContentProps> = ({ 
  module, 
  onNextModule, 
  onPrevModule, 
  isPrevDisabled,
  isLastModule
}) => {
  const [contentType, setContentType] = useState<'text' | 'video' | 'pdf' | 'interactive' | 'quiz'>('text');
  const [moduleValidated, setModuleValidated] = useState(false);

  // Default quiz for modules that don't have one
  const defaultQuiz = {
    questions: [
      {
        question: "Quelle est l'information principale présentée dans ce module?",
        options: [
          "Les procédures d'urgence en vol",
          "Les méthodes de navigation aérienne",
          module.title,
          "Les règles de communication radio"
        ],
        correctAnswer: 2 // Index de l'option correcte (module.title)
      },
      {
        question: "Quelle est la durée estimée de ce module?",
        options: [
          "15 minutes",
          module.duration,
          "60 minutes",
          "2 heures"
        ],
        correctAnswer: 1 // Index de l'option correcte (module.duration)
      }
    ]
  };

  // Use module quiz if available, otherwise use default
  const currentQuiz = module.quiz || defaultQuiz;

  // Handle content type change
  const changeContentType = (type: 'text' | 'video' | 'pdf' | 'interactive' | 'quiz') => {
    setContentType(type);
  };

  // Handler for next module that checks validation
  const handleNextModule = () => {
    onNextModule();
    // Reset validation for next module
    setModuleValidated(false);
    setContentType('text');
  };

  // Handle quiz completion
  const handleQuizComplete = (passed: boolean) => {
    setModuleValidated(passed);
    if (passed) {
      // The next button will be shown in the quiz component itself
    }
  };

  // Render content based on selected type
  const renderModuleContent = () => {
    switch (contentType) {
      case 'video':
        return <VideoContent title={module.title} duration={module.duration} />;
      
      case 'pdf':
        return <PdfContent title={module.title} />;
      
      case 'interactive':
        return <InteractiveContent />;

      case 'quiz':
        return (
          <ModuleQuiz 
            moduleTitle={module.title} 
            quiz={currentQuiz} 
            onComplete={handleQuizComplete}
            isLastModule={isLastModule}
          />
        );
      
      default: // text
        return <TextContent content={module.content} />;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <CardTitle className="text-xl">{module.title}</CardTitle>
            <CardDescription className="mt-1">
              Durée estimée: {module.duration}
            </CardDescription>
          </div>
          <ContentTypeSelector 
            contentType={contentType} 
            onChangeContentType={changeContentType}
            moduleValidated={moduleValidated}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {renderModuleContent()}
        
        {contentType !== 'quiz' && (
          <NavigationFooter 
            onPrevModule={onPrevModule}
            onChangeContentType={changeContentType}
            isPrevDisabled={isPrevDisabled}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CourseContent;
