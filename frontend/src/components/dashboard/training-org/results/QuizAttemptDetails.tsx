import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Clock, User, Calendar, Award } from 'lucide-react';
import { quizService } from '@/services/quizService';

interface QuizAttemptDetailsProps {
  attemptId: string;
  open: boolean;
  onClose: () => void;
}

const QuizAttemptDetails: React.FC<QuizAttemptDetailsProps> = ({ attemptId, open, onClose }) => {
  const [attemptDetails, setAttemptDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && attemptId) {
      loadAttemptDetails();
    }
  }, [attemptId, open]);

  const loadAttemptDetails = async () => {
    try {
      setLoading(true);
      const details = await quizService.getAttemptDetails(attemptId);
      setAttemptDetails(details);
    } catch (error) {
      logger.error('Erreur lors du chargement des détails:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end.getTime() - start.getTime();
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Détails de la tentative</DialogTitle>
          <DialogDescription>
            Analyse complète des réponses du quiz
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : attemptDetails ? (
          <ScrollArea className="h-[calc(90vh-120px)] pr-4">
            <div className="space-y-6">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations générales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Apprenant:</span>
                      <span className="font-medium">{attemptDetails.user.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="font-medium">
                        {new Date(attemptDetails.startTime).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Durée:</span>
                      <span className="font-medium">
                        {formatDuration(attemptDetails.startTime, attemptDetails.endTime)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Score:</span>
                      <span className="font-medium">{attemptDetails.score?.toFixed(0)}%</span>
                      {attemptDetails.passed ? (
                        <Badge className="bg-green-100 text-green-800 ml-2">Réussi</Badge>
                      ) : (
                        <Badge variant="secondary" className="ml-2">Échoué</Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={attemptDetails.score || 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Quiz info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{attemptDetails.quiz.title}</CardTitle>
                  <CardDescription>{attemptDetails.quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    {attemptDetails.quiz.questionCount} questions • Tentative #{attemptDetails.attemptNumber}
                  </div>
                </CardContent>
              </Card>

              {/* Réponses détaillées */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Réponses détaillées</h3>
                {attemptDetails.responses.map((response: any, index: number) => (
                  <Card key={response.questionId} className={response.isCorrect ? 'border-green-200' : 'border-red-200'}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            Question {index + 1}: {response.questionText}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {response.questionType === 'single_choice' ? 'Choix unique' : 'Choix multiple'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {response.pointsEarned}/{response.pointsPossible} points
                            </Badge>
                          </div>
                        </div>
                        {response.isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {response.selectedAnswer ? (
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm text-muted-foreground">Réponse sélectionnée:</span>
                            <p className={`mt-1 ${response.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                              {response.selectedAnswer.text}
                            </p>
                          </div>
                          {!response.isCorrect && (
                            <div className="mt-2 p-3 bg-muted rounded-md">
                              <p className="text-sm">
                                <span className="font-medium">Réponse correcte:</span> Voir la correction avec l'apprenant
                              </p>
                            </div>
                          )}
                        </div>
                      ) : response.responseText ? (
                        <div>
                          <span className="text-sm text-muted-foreground">Réponse libre:</span>
                          <p className="mt-1">{response.responseText}</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Aucune réponse fournie</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Impossible de charger les détails de la tentative.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuizAttemptDetails;