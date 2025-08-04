
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { moduleService, CourseModuleDB, Quiz, Exam } from '@/services/moduleService';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

// Import content components
import TextContent from './content/TextContent';
import VideoContent from './content/VideoContent';
import PdfContent from './content/PdfContent';
import InteractiveContent from './content/InteractiveContent';
import ModuleQuiz from './content/ModuleQuiz';
import ContentTypeSelector from './content/ContentTypeSelector';
import NavigationFooter from './content/NavigationFooter';
import FocusedExamMode from './FocusedExamMode';

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
  module: Module; // Interface legacy maintenue pour compatibilité
  moduleId?: string; // ID réel du module DB pour charger les vraies données
  onNextModule: () => void;
  onPrevModule: () => void;
  isPrevDisabled: boolean;
  isLastModule: boolean;
}

const CourseContent: React.FC<CourseContentProps> = ({ 
  module, 
  moduleId,
  onNextModule, 
  onPrevModule, 
  isPrevDisabled,
  isLastModule
}) => {
  const [contentType, setContentType] = useState<'text' | 'video' | 'pdf' | 'interactive' | 'quiz'>('text');
  const [moduleValidated, setModuleValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [realModule, setRealModule] = useState<CourseModuleDB | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [exam, setExam] = useState<Exam | null>(null);
  const [showExam, setShowExam] = useState(false);

  // Charger les données réelles du module si un ID est fourni
  useEffect(() => {
    if (moduleId) {
      loadRealModuleData();
    }
  }, [moduleId]);

  const loadRealModuleData = async () => {
    if (!moduleId) return;
    
    setLoading(true);
    try {
      const moduleData = await moduleService.getModule(moduleId);
      if (moduleData) {
        setRealModule(moduleData);
        
        // Charger les ressources du module si elles existent
        if (moduleData.resources && moduleData.resources.length > 0) {
          setResources(moduleData.resources);
          // Définir le type par défaut selon la première ressource
          const firstResource = moduleData.resources[0];
          if (firstResource.resource_type === 'pdf') {
            setContentType('pdf');
          } else if (firstResource.resource_type === 'video') {
            setContentType('video');
          }
        }
        
        // Charger le quiz ou l'examen selon le type de module
        if (moduleData.module_type === 'quiz' && moduleData.quiz) {
          const quizData = await moduleService.getQuiz(moduleData.quiz.id);
          setQuiz(quizData);
        } else if (moduleData.module_type === 'exam' && moduleData.exam) {
          const examData = await moduleService.getExam(moduleData.exam.id);
          setExam(examData);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement du module:', error);
      toast.error('Impossible de charger le contenu du module');
    } finally {
      setLoading(false);
    }
  };

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
    if (passed && exam) {
      // Si c'est le dernier module avec un examen, proposer de passer l'examen final
      toast.success('Quiz réussi ! Vous pouvez maintenant passer à l\'examen final.');
    }
  };

  // Handle exam start
  const handleStartExam = () => {
    if (exam) {
      setShowExam(true);
    }
  };

  // Handle exam completion
  const handleExamComplete = (score: number) => {
    setShowExam(false);
    const passed = score >= (exam?.passing_score || 70);
    
    if (passed) {
      toast.success(`Félicitations ! Vous avez réussi l'examen avec ${score}%`);
      setModuleValidated(true);
    } else {
      toast.error(`Examen échoué avec ${score}%. Score minimum requis: ${exam?.passing_score || 70}%`);
    }
  };

  // Handle exam exit
  const handleExamExit = () => {
    setShowExam(false);
    toast.info('Examen quitté. Vous pouvez le reprendre plus tard.');
  };

  // Render content based on selected type
  const renderModuleContent = () => {
    // Récupérer la ressource courante si elle existe
    const currentResource = resources[currentResourceIndex];
    
    switch (contentType) {
      case 'video':
        if (currentResource && currentResource.resource_type === 'video') {
          return (
            <VideoContent 
              title={currentResource.title}
              duration={currentResource.duration_minutes ? `${currentResource.duration_minutes}min` : module.duration}
              videoUrl={currentResource.file_url}
              externalUrl={currentResource.external_url}
              storagePath={currentResource.file_url}
            />
          );
        }
        return <VideoContent title={module.title} duration={module.duration} />;
      
      case 'pdf':
        if (currentResource && currentResource.resource_type === 'pdf') {
          return (
            <PdfContent 
              title={currentResource.title}
              description={currentResource.description}
              storagePath={currentResource.file_url}
              fileSize={currentResource.file_size}
              isDownloadable={currentResource.is_downloadable}
            />
          );
        }
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

  // Si on est en mode examen, afficher le composant d'examen en plein écran
  if (showExam && exam) {
    const examData = moduleService.convertExamToLegacy(exam);
    return (
      <FocusedExamMode
        title={examData.title}
        questions={examData.questions}
        examId={examData.examId}
        onExitExam={handleExamExit}
        onCompleteExam={handleExamComplete}
      />
    );
  }

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Chargement du module...</span>
        </div>
      )}
      
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-xl">{realModule?.title || module.title}</CardTitle>
              <CardDescription className="mt-1">
                Durée estimée: {realModule?.duration_minutes ? `${realModule.duration_minutes}min` : module.duration}
                {realModule?.module_type === 'exam' && (
                  <span className="ml-2 text-red-600 font-medium">• Examen final avec anti-fraude</span>
                )}
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
        
          {/* Bouton pour l'examen final */}
          {realModule?.module_type === 'exam' && exam && moduleValidated && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Examen Final Sécurisé</h3>
              <p className="text-sm text-red-700 mb-4">
                Cet examen nécessite une surveillance anti-fraude. Assurez-vous d'être dans un environnement calme 
                avec une webcam fonctionnelle.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-red-600 mb-4">
                <span>• Temps limite: {exam.time_limit} minutes</span>
                <span>• Score minimum: {exam.passing_score}%</span>
                <span>• {exam.exam_config?.allowed_attempts || 1} tentative(s)</span>
              </div>
              <button
                onClick={handleStartExam}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium"
              >
                Commencer l'Examen Final
              </button>
            </div>
          )}
          
          {contentType !== 'quiz' && (
            <NavigationFooter 
              onPrevModule={onPrevModule}
              onChangeContentType={changeContentType}
              isPrevDisabled={isPrevDisabled}
            />
          )}
        </CardContent>
      </Card>
      </div>
  );
};

export default CourseContent;
