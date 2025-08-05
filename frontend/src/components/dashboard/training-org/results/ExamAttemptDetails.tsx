import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, XCircle, Clock, User, Calendar, Award, Shield, 
  AlertTriangle, Camera, Monitor, Globe, MousePointer 
} from 'lucide-react';
import { examService } from '@/services/examService';

interface ExamAttemptDetailsProps {
  attemptId: string;
  open: boolean;
  onClose: () => void;
}

const ExamAttemptDetails: React.FC<ExamAttemptDetailsProps> = ({ attemptId, open, onClose }) => {
  const [attemptDetails, setAttemptDetails] = useState<unknown>(null);
  const [securityEvents, setSecurityEvents] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && attemptId) {
      loadAttemptDetails();
    }
  }, [attemptId, open]);

  const loadAttemptDetails = async () => {
    try {
      setLoading(true);
      const [details, security] = await Promise.all([
        examService.getAttemptDetails(attemptId),
        examService.getAttemptSecurityEvents(attemptId)
      ]);
      setAttemptDetails(details);
      setSecurityEvents(security);
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

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'TAB_SWITCH':
      case 'WINDOW_BLUR':
        return <Monitor className="h-4 w-4" />;
      case 'COPY_ATTEMPT':
      case 'PASTE_ATTEMPT':
        return <MousePointer className="h-4 w-4" />;
      case 'WEBCAM_DISABLED':
      case 'FACE_NOT_DETECTED':
        return <Camera className="h-4 w-4" />;
      case 'MULTIPLE_FACES':
        return <Users className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Détails de la tentative d'examen</DialogTitle>
          <DialogDescription>
            Analyse complète avec informations de sécurité
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        ) : attemptDetails ? (
          <Tabs defaultValue="results" className="h-[calc(90vh-120px)]">
            <TabsList>
              <TabsTrigger value="results">Résultats</TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                Sécurité
                {securityEvents?.summary?.totalEvents > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 px-1">
                    {securityEvents.summary.totalEvents}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="results" className="h-full">
              <ScrollArea className="h-[calc(100%-40px)] pr-4">
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

                  {/* Exam info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{attemptDetails.exam.title}</CardTitle>
                      <CardDescription>{attemptDetails.exam.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{attemptDetails.exam.questionCount} questions</span>
                        <span>Tentative #{attemptDetails.attemptNumber}</span>
                        {attemptDetails.exam.securityConfig && (
                          <div className="flex gap-2">
                            {attemptDetails.exam.securityConfig.default_proctoring && (
                              <Badge variant="outline" className="text-xs">Proctoring</Badge>
                            )}
                            {attemptDetails.exam.securityConfig.default_webcam && (
                              <Badge variant="outline" className="text-xs">Webcam</Badge>
                            )}
                            {attemptDetails.exam.securityConfig.default_lockdown && (
                              <Badge variant="outline" className="text-xs">Lockdown</Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Réponses détaillées */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Réponses détaillées</h3>
                    {attemptDetails.responses.map((response: unknown, index: number) => (
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
            </TabsContent>

            <TabsContent value="security" className="h-full">
              <ScrollArea className="h-[calc(100%-40px)] pr-4">
                {securityEvents && (
                  <div className="space-y-6">
                    {/* Résumé de sécurité */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Analyse de sécurité
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">
                              {securityEvents.summary.highSeverity}
                            </div>
                            <div className="text-sm text-red-600">Haute sévérité</div>
                          </div>
                          <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">
                              {securityEvents.summary.mediumSeverity}
                            </div>
                            <div className="text-sm text-orange-600">Moyenne sévérité</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">
                              {securityEvents.summary.lowSeverity}
                            </div>
                            <div className="text-sm text-yellow-600">Faible sévérité</div>
                          </div>
                        </div>

                        {securityEvents.summary.totalEvents > 3 && (
                          <Alert className="mt-4 border-orange-200 bg-orange-50">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <AlertDescription className="text-orange-800">
                              Cette tentative présente un nombre élevé d'événements de sécurité et nécessite une révision manuelle.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>

                    {/* Informations de session */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Informations de session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">IP:</span>
                            <span className="font-mono">{securityEvents.sessionInfo.clientIp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Résolution:</span>
                            <span>{securityEvents.sessionInfo.screenResolution}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Fuseau horaire:</span>
                            <span>{securityEvents.sessionInfo.timezone}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Timeline des événements */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Chronologie des événements</CardTitle>
                        <CardDescription>
                          {securityEvents.events.length} événements détectés pendant l'examen
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {securityEvents.events.map((event: unknown) => (
                            <div
                              key={event.id}
                              className={`flex items-start gap-3 p-3 rounded-lg ${getSeverityColor(event.severity)}`}
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                {getEventIcon(event.type)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{event.type}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      event.severity === 'high' ? 'border-red-500 text-red-600' :
                                      event.severity === 'medium' ? 'border-orange-500 text-orange-600' :
                                      'border-yellow-500 text-yellow-600'
                                    }`}
                                  >
                                    {event.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm mt-1">{event.description}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(event.timestamp).toLocaleString('fr-FR')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Impossible de charger les détails de la tentative.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamAttemptDetails;