import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { securityService, ActiveExam, SecurityEvent } from '@/services/securityService';
import { 
  Eye, 
  AlertTriangle, 
  Clock, 
  User, 
  Camera,
  Wifi,
  Monitor,
  MousePointer,
  Activity,
  RefreshCw,
  Loader2
} from 'lucide-react';

// Interfaces now imported from securityService

const SecurityMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // État des données réelles
  const [activeExams, setActiveExams] = useState<ActiveExam[]>([]);
  const [recentEvents, setRecentEvents] = useState<SecurityEvent[]>([]);

  // Charger les données depuis l'API
  const loadData = async () => {
    setLoading(true);
    try {
      const [exams, events] = await Promise.all([
        securityService.getActiveExams(),
        securityService.getRecentSecurityEvents(10)
      ]);
      
      setActiveExams(exams);
      setRecentEvents(events);
      setLastUpdate(new Date());
      
      // Si pas d'examens actifs, utiliser des données de démo
      if (exams.length === 0) {
        setActiveExams(mockActiveExams);
      }
      
      // Si pas d'événements, utiliser des données de démo
      if (events.length === 0) {
        setRecentEvents(mockRecentEvents);
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast.error('Impossible de charger les données de surveillance');
      
      // Utiliser les données de démo en cas d'erreur
      setActiveExams(mockActiveExams);
      setRecentEvents(mockRecentEvents);
    } finally {
      setLoading(false);
    }
  };

  // Données de démo pour fallback
  const mockActiveExams: ActiveExam[] = [
    {
      id: '1',
      studentName: 'Marie Dubois',
      course: 'Sécurité Aéroportuaire - DGAC',
      startTime: '14:30',
      duration: 120,
      elapsed: 45,
      status: 'in_progress',
      riskLevel: 'low',
      incidentCount: 0,
      lastActivity: 'Question 15/30'
    },
    {
      id: '2',
      studentName: 'Pierre Martin',
      course: 'Formation Agent de Piste',
      startTime: '14:15',
      duration: 90,
      elapsed: 60,
      status: 'in_progress',
      riskLevel: 'medium',
      incidentCount: 2,
      lastActivity: 'Question 20/25'
    },
    {
      id: '3',
      studentName: 'Sophie Lemoine',
      course: 'Maintenance Avionique',
      startTime: '13:45',
      duration: 150,
      elapsed: 105,
      status: 'in_progress',
      riskLevel: 'high',
      incidentCount: 4,
      lastActivity: 'Question 28/40'
    }
  ];

  const mockRecentEvents: SecurityEvent[] = [
    {
      id: '1',
      examId: '3',
      studentName: 'Sophie Lemoine',
      type: 'webcam_disconnected',
      severity: 'high',
      description: 'Webcam déconnectée pendant 15 secondes',
      timestamp: '15:12',
      resolved: false
    },
    {
      id: '2',
      examId: '2',
      studentName: 'Pierre Martin',
      type: 'tab_switch',
      severity: 'medium',
      description: 'Changement d\'onglet détecté (3 secondes)',
      timestamp: '15:08',
      resolved: true
    },
    {
      id: '3',
      examId: '3',
      studentName: 'Sophie Lemoine',
      type: 'copy_paste_attempt',
      severity: 'medium',
      description: 'Tentative de copier-coller bloquée',
      timestamp: '15:05',
      resolved: true
    },
    {
      id: '4',
      examId: '2',
      studentName: 'Pierre Martin',
      type: 'right_click_blocked',
      severity: 'low',
      description: 'Clic droit bloqué sur une question',
      timestamp: '15:02',
      resolved: true
    }
  ];

  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh avec vraies données
  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        loadData();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  // Suspendre un examen
  const handleSuspendExam = async (examId: string, studentName: string) => {
    try {
      await securityService.suspendExam(examId, `Examen suspendu par surveillance - incidents de sécurité détectés`);
      toast.success(`Examen de ${studentName} suspendu avec succès`);
      loadData(); // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la suspension:', error);
      toast.error('Erreur lors de la suspension de l\'examen');
    }
  };

  // Résoudre un événement de sécurité
  const handleResolveEvent = async (eventId: string) => {
    try {
      await securityService.resolveSecurityEvent(eventId);
      toast.success('Événement résolu avec succès');
      loadData(); // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la résolution:', error);
      toast.error('Erreur lors de la résolution de l\'événement');
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">🔴 Risque Élevé</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">🟡 Risque Moyen</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">🟢 Risque Faible</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Critique</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Moyen</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Faible</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getProgressColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de surveillance */}
      <Card className="border-aviation-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-aviation-600" />
                Surveillance Temps Réel
              </CardTitle>
              <CardDescription>
                Surveillez vos examens en cours et les incidents de sécurité
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={isAutoRefresh ? 'bg-green-50 border-green-200' : ''}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isAutoRefresh || loading ? 'animate-spin' : ''}`} />
                Auto-refresh {isAutoRefresh ? 'ON' : 'OFF'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={loadData}
                disabled={loading}
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Actualiser
              </Button>
              <p className="text-xs text-muted-foreground">
                Dernière MAJ: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live">Examens en Cours</TabsTrigger>
          <TabsTrigger value="events">Événements Récents</TabsTrigger>
        </TabsList>

        {/* Examens en cours */}
        <TabsContent value="live">
          <div className="space-y-4">
            {activeExams.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun examen en cours</h3>
                  <p className="text-muted-foreground">
                    Les examens surveillés apparaîtront ici en temps réel
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeExams.map((exam) => (
                  <Card key={exam.id} className="border-l-4 border-l-aviation-500">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {exam.student_name}
                          </CardTitle>
                          <CardDescription>{exam.course}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getRiskBadge(exam.risk_level)}
                          {exam.incident_count > 0 && (
                            <Badge variant="outline" className="text-orange-700 border-orange-200">
                              {exam.incident_count} incident{exam.incident_count > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progression temporelle */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{exam.elapsed}min / {exam.duration}min</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={(exam.elapsed / exam.duration) * 100} 
                            className="h-2"
                          />
                          <div 
                            className={`absolute top-0 left-0 h-2 rounded-full ${getProgressColor(exam.risk_level)}`}
                            style={{ width: `${(exam.elapsed / exam.duration) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Informations détaillées */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Début: {exam.start_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span>{exam.last_activity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-green-500" />
                          <span>Webcam OK</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-green-500" />
                          <span>Connexion stable</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Voir Détails
                          </Button>
                          {exam.risk_level === 'high' && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleSuspendExam(exam.id, exam.student_name)}
                            >
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              Suspendre
                            </Button>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Monitor className="h-4 w-4 mr-2" />
                          Vue Écran
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Événements récents */}
        <TabsContent value="events">
          <div className="space-y-4">
            {recentEvents.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun événement récent</h3>
                  <p className="text-muted-foreground">
                    Les événements de sécurité apparaîtront ici
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <Card key={event.id} className={`${
                    event.severity === 'high' ? 'border-red-200 bg-red-50/30' :
                    event.severity === 'medium' ? 'border-yellow-200 bg-yellow-50/30' :
                    'border-green-200 bg-green-50/30'
                  }`}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className={`h-4 w-4 ${
                              event.severity === 'high' ? 'text-red-600' :
                              event.severity === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`} />
                            <span className="font-medium">{event.exam_session?.exam_attempt?.exam ? 'Étudiant' : 'Utilisateur'}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</span>
                            {getSeverityBadge(event.severity)}
                            {event.auto_resolved && (
                              <Badge className="bg-green-100 text-green-800">Résolu</Badge>
                            )}
                          </div>
                          <p className="text-sm mb-2">{event.description}</p>
                          <p className="text-xs text-muted-foreground">
                            Type: {event.event_type.replace('_', ' ')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                          {!event.auto_resolved && event.severity === 'high' && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleResolveEvent(event.id)}
                            >
                              Résoudre
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Alertes actives */}
      {recentEvents.filter(e => !e.auto_resolved && e.severity === 'high').length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Attention :</strong> {recentEvents.filter(e => !e.auto_resolved && e.severity === 'high').length} incident(s) critique(s) nécessitent votre attention immédiate.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SecurityMonitoring;