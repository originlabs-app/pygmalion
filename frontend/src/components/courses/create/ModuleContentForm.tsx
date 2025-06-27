
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ModuleContent, QuizQuestion } from '@/types';
import { toast } from 'sonner';
import ContentTypeSelector from './content-forms/ContentTypeSelector';
import TextContentForm from './content-forms/TextContentForm';
import VideoContentForm from './content-forms/VideoContentForm';
import PdfContentForm from './content-forms/PdfContentForm';
import QuizContentForm from './content-forms/QuizContentForm';

interface ModuleContentFormProps {
  onAddContent: (content: ModuleContent) => void;
  onCancel: () => void;
}

const ModuleContentForm: React.FC<ModuleContentFormProps> = ({
  onAddContent,
  onCancel
}) => {
  const [contentType, setContentType] = useState<'text' | 'video' | 'pdf' | 'quiz'>('text');
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  const handleAddQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      { question: '', options: ['', '', '', ''], correctAnswer: 0 }
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (quizQuestions.length > 1) {
      setQuizQuestions(quizQuestions.filter((_, i) => i !== index));
    } else {
      toast.error("Un quiz doit contenir au moins une question");
    }
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: string | number | { index: number, value: string }) => {
    const updatedQuestions = [...quizQuestions];
    if (field === 'options' && typeof value === 'object') {
      const optionIndex = value.index;
      const optionValue = value.value;
      updatedQuestions[index].options[optionIndex] = optionValue;
    } else if (field !== 'options') {
      updatedQuestions[index][field] = value as never;
    }
    setQuizQuestions(updatedQuestions);
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }

    let content: ModuleContent;

    switch (contentType) {
      case 'text':
        if (!textContent.trim()) {
          toast.error('Le contenu textuel est obligatoire');
          return;
        }
        content = {
          type: 'text',
          title,
          content: textContent
        };
        break;
        
      case 'video':
        if (!videoUrl.trim()) {
          toast.error('L\'URL de la vidéo est obligatoire');
          return;
        }
        content = {
          type: 'video',
          title,
          url: videoUrl,
          duration: videoDuration
        };
        break;
        
      case 'pdf':
        if (!selectedFile) {
          toast.error('Veuillez sélectionner un fichier PDF');
          return;
        }
        // Simuler une URL pour le PDF (dans une vraie application, ce serait un lien vers le fichier uploadé)
        content = {
          type: 'pdf',
          title,
          url: URL.createObjectURL(selectedFile),
          fileName: selectedFile.name,
          fileSize: selectedFile.size
        };
        break;
        
      case 'quiz':
        // Vérifier que toutes les questions sont complètes
        const incompleteQuestion = quizQuestions.find(q => 
          !q.question.trim() || 
          q.options.some(opt => !opt.trim())
        );
        
        if (incompleteQuestion) {
          toast.error('Veuillez compléter toutes les questions et options du quiz');
          return;
        }
        
        content = {
          type: 'quiz',
          title,
          questions: quizQuestions
        };
        break;
        
      default:
        toast.error('Type de contenu non reconnu');
        return;
    }

    onAddContent(content);
  };

  return (
    <Card className="mt-6 border-primary/20">
      <CardHeader>
        <CardTitle>Ajouter du contenu au module</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contentTitle">Titre du contenu*</Label>
            <Input
              id="contentTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Introduction au vol"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contentType">Type de contenu</Label>
            <ContentTypeSelector contentType={contentType} setContentType={setContentType} />
          </div>
        </div>

        {/* Formulaire spécifique au type de contenu */}
        {contentType === 'text' && (
          <TextContentForm textContent={textContent} setTextContent={setTextContent} />
        )}

        {contentType === 'video' && (
          <VideoContentForm 
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            videoDuration={videoDuration}
            setVideoDuration={setVideoDuration}
          />
        )}

        {contentType === 'pdf' && (
          <PdfContentForm handleFileSelected={handleFileSelected} />
        )}

        {contentType === 'quiz' && (
          <QuizContentForm
            quizQuestions={quizQuestions}
            updateQuestion={updateQuestion}
            handleAddQuestion={handleAddQuestion}
            handleRemoveQuestion={handleRemoveQuestion}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={handleSubmit}>
          Ajouter ce contenu
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleContentForm;
