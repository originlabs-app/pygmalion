import React, { useState, useCallback } from 'react';
import logger from '@/services/logger.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { uploadService, CourseContentUpload, ExternalVideoContent } from '@/services/uploadService';
import { 
  Upload, 
  FileText, 
  Video, 
  Image, 
  Trash2, 
  Eye, 
  Download,
  Plus, 
  X,
  Clock,
  FileIcon,
  PlayCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContentFile {
  id: string;
  name: string;
  type: 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm' | 'other';
  size: number;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'failed';
  url?: string;
  duration?: string;
  description?: string;
  thumbnail?: string;
  storagePath?: string; // Pour la suppression
  mimeType?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'open_ended';
  options?: string[];
  correctAnswer?: number | string;
  points: number;
}

interface InteractiveQuiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit?: number; // en minutes
  passingScore: number; // pourcentage
}

const ContentUploadForm: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ContentFile[]>([]);
  const [quizzes, setQuizzes] = useState<InteractiveQuiz[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [showQuizCreator, setShowQuizCreator] = useState(false);
  const [showVideoLinkForm, setShowVideoLinkForm] = useState(false);
  const { toast } = useToast();

  // Upload réel de fichier
  const uploadFile = async (file: File): Promise<ContentFile> => {
    const contentType = getFileType(file.type);
    
    // Créer l'entrée temporaire pour le suivi du progrès
    const tempFile: ContentFile = {
      id: `temp-${Date.now()}-${Math.random()}`,
      name: file.name,
      type: contentType,
      size: file.size,
      uploadProgress: 0,
      status: 'uploading'
    };

    setUploadedFiles(prev => [...prev, tempFile]);

    try {
      const result = await uploadService.uploadCourseContent(
        file,
        {
          contentType: contentType as 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm',
          title: file.name,
          description: `Fichier uploadé: ${file.name}`
        },
        (progress) => {
          // Mise à jour du progrès en temps réel
          setUploadedFiles(prev => prev.map(f => 
            f.id === tempFile.id 
              ? { ...f, uploadProgress: progress }
              : f
          ));
        }
      );

      // Mise à jour avec les données finales
      const finalFile: ContentFile = {
        id: result.id,
        name: result.filename,
        type: contentType,
        size: result.size,
        uploadProgress: 100,
        status: 'completed',
        url: result.url,
        storagePath: result.storagePath,
        mimeType: result.mimeType,
        description: result.description
      };

      setUploadedFiles(prev => prev.map(f => 
        f.id === tempFile.id ? finalFile : f
      ));

      return finalFile;
      
    } catch (error) {
      // Marquer comme échoué
      setUploadedFiles(prev => prev.map(f => 
        f.id === tempFile.id 
          ? { ...f, status: 'failed' as const }
          : f
      ));
      throw error;
    }
  };

  // Ajout de vidéo externe (YouTube/Vimeo)
  const addExternalVideo = async (url: string, title: string, description?: string) => {
    try {
      const result = await uploadService.addExternalVideo({
        url,
        title,
        description,
        moduleId: 'external-video'
      });

      // Ajouter à la liste des fichiers uploadés
      const externalFile: ContentFile = {
        id: result.id,
        name: result.title,
        type: 'video',
        size: 0, // Pas de taille pour les vidéos externes
        uploadProgress: 100,
        status: 'completed',
        url: result.url,
        thumbnail: result.thumbnailUrl,
        description: result.description
      };

      setUploadedFiles(prev => [...prev, externalFile]);

      toast({
        title: "Vidéo ajoutée",
        description: `${result.title} a été ajoutée avec succès`,
      });

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'ajouter la vidéo",
        variant: "destructive"
      });
    }
  };

  const getFileType = (mimeType: string): ContentFile['type'] => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentationml')) return 'presentation';
    if (mimeType.includes('msword') || mimeType.includes('wordprocessingml') || mimeType === 'text/plain') return 'document';
    if (mimeType.includes('zip')) return 'scorm';
    return 'other';
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      // Validation de la taille selon le type
      let maxSize: number;
      let maxSizeMB: number;
      
      if (file.type.startsWith('video/')) {
        maxSize = 50 * 1024 * 1024; // 50MB pour les vidéos
        maxSizeMB = 50;
      } else {
        maxSize = 100 * 1024 * 1024; // 100MB pour les autres
        maxSizeMB = 100;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "Fichier trop volumineux",
          description: file.type.startsWith('video/') 
            ? `${file.name} dépasse ${maxSizeMB}MB. Pour les vidéos plus lourdes, utilisez un lien YouTube/Vimeo.`
            : `${file.name} dépasse la limite de ${maxSizeMB}MB`,
          variant: "destructive"
        });
        continue;
      }

      try {
        await uploadFile(file);
        toast({
          title: "Upload réussi",
          description: `${file.name} a été téléchargé avec succès`,
        });
      } catch (error) {
        toast({
          title: "Erreur d'upload",
          description: `Impossible de télécharger ${file.name}`,
          variant: "destructive"
        });
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  }, []);

  const removeFile = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    
    if (!file) return;

    try {
      // Suppression côté serveur si le fichier est uploadé
      if (file.status === 'completed' && file.storagePath) {
        await uploadService.deleteContent(file.storagePath);
      }

      // Suppression côté client
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
      
      toast({
        title: "Fichier supprimé",
        description: "Le fichier a été retiré de la formation",
      });
    } catch (error) {
      logger.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur de suppression",
        description: "Impossible de supprimer le fichier du serveur",
        variant: "destructive"
      });
      
      // Suppression locale même en cas d'erreur serveur
      setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    }
  };

  const getFileIcon = (type: ContentFile['type']) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'audio': return <PlayCircle className="h-5 w-5 text-green-500" />;
      case 'image': return <Image className="h-5 w-5 text-purple-500" />;
      case 'document': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'presentation': return <FileText className="h-5 w-5 text-orange-500" />;
      case 'scorm': return <FileIcon className="h-5 w-5 text-indigo-500" />;
      default: return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: ContentFile['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  // Créateur de quiz simplifié
  const QuizCreator = () => {
    const [currentQuiz, setCurrentQuiz] = useState<Partial<InteractiveQuiz>>({
      title: '',
      description: '',
      questions: [],
      passingScore: 70
    });

    const addQuestion = () => {
      const newQuestion: QuizQuestion = {
        id: `q-${Date.now()}`,
        question: '',
        type: 'multiple_choice',
        options: ['', '', '', ''],
        points: 1
      };
      
      setCurrentQuiz(prev => ({
        ...prev,
        questions: [...(prev.questions || []), newQuestion]
      }));
    };

    const saveQuiz = () => {
      if (!currentQuiz.title || !currentQuiz.questions?.length) {
        toast({
          title: "Quiz incomplet",
          description: "Veuillez remplir le titre et ajouter au moins une question",
          variant: "destructive"
        });
        return;
      }

      const newQuiz: InteractiveQuiz = {
        id: `quiz-${Date.now()}`,
        title: currentQuiz.title!,
        description: currentQuiz.description || '',
        questions: currentQuiz.questions!,
        passingScore: currentQuiz.passingScore || 70
      };

      setQuizzes(prev => [...prev, newQuiz]);
      setShowQuizCreator(false);
      setCurrentQuiz({ title: '', description: '', questions: [], passingScore: 70 });
      
      toast({
        title: "Quiz créé",
        description: `Le quiz "${newQuiz.title}" a été ajouté à la formation`,
      });
    };

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Créer un Quiz Interactif
            <Button variant="outline" size="sm" onClick={() => setShowQuizCreator(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="quiz-title">Titre du Quiz</Label>
            <Input
              id="quiz-title"
              value={currentQuiz.title}
              onChange={(e) => setCurrentQuiz(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Quiz - Module Sécurité Aéroportuaire"
            />
          </div>
          
          <div>
            <Label htmlFor="quiz-description">Description</Label>
            <Textarea
              id="quiz-description"
              value={currentQuiz.description}
              onChange={(e) => setCurrentQuiz(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description du quiz..."
            />
          </div>

          <div>
            <Label htmlFor="passing-score">Score de réussite (%)</Label>
            <Input
              id="passing-score"
              type="number"
              value={currentQuiz.passingScore}
              onChange={(e) => setCurrentQuiz(prev => ({ ...prev, passingScore: parseInt(e.target.value) }))}
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Questions ({currentQuiz.questions?.length || 0})</Label>
              <Button onClick={addQuestion} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Ajouter une question
              </Button>
            </div>
            
            {currentQuiz.questions?.map((question, index) => (
              <Card key={question.id} className="p-3">
                <div className="space-y-2">
                  <Input
                    placeholder={`Question ${index + 1}`}
                    value={question.question}
                    onChange={(e) => {
                      const updatedQuestions = [...(currentQuiz.questions || [])];
                      updatedQuestions[index] = { ...question, question: e.target.value };
                      setCurrentQuiz(prev => ({ ...prev, questions: updatedQuestions }));
                    }}
                  />
                  {question.type === 'multiple_choice' && question.options?.map((option, optIndex) => (
                    <Input
                      key={optIndex}
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...(question.options || [])];
                        updatedOptions[optIndex] = e.target.value;
                        const updatedQuestions = [...(currentQuiz.questions || [])];
                        updatedQuestions[index] = { ...question, options: updatedOptions };
                        setCurrentQuiz(prev => ({ ...prev, questions: updatedQuestions }));
                      }}
                    />
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowQuizCreator(false)}>
              Annuler
            </Button>
            <Button onClick={saveQuiz}>
              Sauvegarder le Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Formulaire pour ajouter une vidéo externe
  const VideoLinkForm = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');

    const handleSubmit = async () => {
      if (!videoUrl || !videoTitle) {
        toast({
          title: "Champs requis",
          description: "Veuillez remplir l'URL et le titre de la vidéo",
          variant: "destructive"
        });
        return;
      }

      await addExternalVideo(videoUrl, videoTitle, videoDescription);
      
      // Reset form
      setVideoUrl('');
      setVideoTitle('');
      setVideoDescription('');
      setShowVideoLinkForm(false);
    };

    return (
      <Card className="mt-4 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-blue-800">
            <div className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Ajouter une Vidéo YouTube/Vimeo
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowVideoLinkForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="video-url">URL de la vidéo *</Label>
            <Input
              id="video-url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
            />
          </div>
          
          <div>
            <Label htmlFor="video-title">Titre de la vidéo *</Label>
            <Input
              id="video-title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Ex: Formation sécurité aéroportuaire - Module 1"
            />
          </div>

          <div>
            <Label htmlFor="video-description">Description (optionnel)</Label>
            <Textarea
              id="video-description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Description de la vidéo..."
              rows={3}
            />
          </div>

          <div className="text-xs text-blue-600 bg-blue-100 p-3 rounded-lg">
            <p><strong>💡 Astuce :</strong> Les vidéos YouTube/Vimeo sont idéales pour :</p>
            <ul className="mt-1 ml-4 list-disc">
              <li>Les vidéos de plus de 50MB</li>
              <li>Les formations longues (30+ minutes)</li>
              <li>Le contenu déjà hébergé sur ces plateformes</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowVideoLinkForm(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit}>
              Ajouter la Vidéo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Zone d'upload principal */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
        <CardContent 
          className={`p-8 text-center ${dragOver ? 'bg-blue-50 border-blue-400' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <h3 className="text-lg font-medium">Téléchargez vos ressources pédagogiques</h3>
              <p className="text-sm text-gray-500 mt-1">
                Glissez-déposez vos fichiers ou cliquez pour sélectionner
              </p>
            </div>
            
            <div className="flex justify-center gap-2">
              <input
                type="file"
                multiple
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
                accept=".pdf,.mp4,.webm,.mov,.mp3,.wav,.aac,.ogg,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.ppt,.pptx,.zip"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Sélectionner des fichiers
                </label>
              </Button>
              
              <Button onClick={() => setShowQuizCreator(true)} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Créer un Quiz
              </Button>
              
              <Button onClick={() => setShowVideoLinkForm(true)} variant="outline" className="bg-blue-50 hover:bg-blue-100">
                <Video className="h-4 w-4 mr-2" />
                Ajouter Vidéo Externe
              </Button>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>Types acceptés: PDF, Documents (DOC, PPT), Vidéos courtes (MP4, WEBM, MOV), Audio (MP3, WAV), Images, SCORM</p>
              <p>Taille maximum: 50MB pour vidéos, 100MB pour autres fichiers</p>
              <p className="text-amber-600">💡 Pour les vidéos lourdes, utilisez YouTube/Vimeo via "Ajouter Vidéo Externe"</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des fichiers uploadés */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ressources Téléchargées ({uploadedFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      {getStatusIcon(file.status)}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{file.size > 0 ? formatFileSize(file.size) : 'Vidéo externe'}</span>
                      <Badge variant="secondary" className="text-xs">
                        {file.type.toUpperCase()}
                      </Badge>
                      {file.size === 0 && file.type === 'video' && (
                        <Badge variant="outline" className="text-xs text-blue-600">
                          YouTube/Vimeo
                        </Badge>
                      )}
                      {file.duration && <span>⏱️ {file.duration}</span>}
                    </div>
                    
                    {file.status === 'uploading' && file.uploadProgress !== undefined && (
                      <Progress value={file.uploadProgress} className="h-1 mt-2" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === 'completed' && file.url && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(file.url, '_blank')}
                          title="Prévisualiser le fichier"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = file.url!;
                            link.download = file.name;
                            link.click();
                          }}
                          title="Télécharger le fichier"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                      disabled={file.status === 'uploading'}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Liste des quiz créés */}
      {quizzes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Quiz Interactifs ({quizzes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium">{quiz.title}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{quiz.questions.length} questions</span>
                      <span>Réussite: {quiz.passingScore}%</span>
                      {quiz.timeLimit && <span>⏱️ {quiz.timeLimit} min</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setQuizzes(prev => prev.filter(q => q.id !== quiz.id))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Créateur de quiz */}
      {showQuizCreator && <QuizCreator />}

      {/* Formulaire de vidéo externe */}
      {showVideoLinkForm && <VideoLinkForm />}

      {/* Résumé du contenu */}
      {(uploadedFiles.length > 0 || quizzes.length > 0) && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Contenu ajouté: {uploadedFiles.length} fichier(s) + {quizzes.length} quiz
              </span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Votre formation est enrichie de contenus multimédias et interactifs pour une meilleure expérience d'apprentissage.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentUploadForm; 