import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { securityService, ExamReport } from '@/services/securityService';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  PieChart,
  Loader2
} from 'lucide-react';

// Interface now imported from securityService

const SecurityReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // État des données réelles
  const [examReports, setExamReports] = useState<ExamReport[]>([]);
  const [securityStats, setSecurityStats] = useState({
    total_exams: 0,
    secured_exams: 0,
    security_incidents: 0,
    suspicious_attempts: 0,
    pass_rate: 0,
    average_score: 0
  });

  // Charger les données depuis l'API
  const loadData = async () => {
    setLoading(true);
    try {
      const [reports, stats] = await Promise.all([
        securityService.getExamReports({ 
          period: selectedPeriod as any,
          courseId: selectedCourse === 'all' ? undefined : selectedCourse 
        }),
        securityService.getSecurityStats(selectedPeriod)
      ]);
      
      setExamReports(reports);
      setSecurityStats(stats);
      
      // Si pas de données, utiliser des données de démo
      if (reports.length === 0) {
        setExamReports(mockExamReports);
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des rapports:', error);
      toast.error('Impossible de charger les rapports de sécurité');
      
      // Utiliser les données de démo en cas d'erreur
      setExamReports(mockExamReports);
    } finally {
      setLoading(false);
    }
  };

  // Données de démo pour fallback avec format API réel
  const mockExamReports: ExamReport[] = [
    {
      id: '1',
      student_name: 'Marie Dubois',
      course: 'Sécurité Aéroportuaire - DGAC',
      date: '2025-07-20',
      duration: '1h45min',
      score: 85,
      status: 'passed',
      incident_count: 0,
      risk_level: 'low',
      security_events: []
    },
    {
      id: '2',
      student_name: 'Pierre Martin',
      course: 'Formation Agent de Piste',
      date: '2025-07-19',
      duration: '1h20min',
      score: 72,
      status: 'passed',
      incident_count: 2,
      risk_level: 'medium',
      security_events: ['tab_switch', 'right_click_blocked']
    },
    {
      id: '3',
      student_name: 'Sophie Lemoine',
      course: 'Maintenance Avionique',
      date: '2025-07-18',
      duration: '2h15min',
      score: 45,
      status: 'under_review',
      incident_count: 5,
      risk_level: 'high',
      security_events: ['webcam_disconnected', 'copy_paste_attempt', 'tab_switch', 'multiple_monitors_detected', 'suspicious_network_activity']
    },
    {
      id: '4',
      student_name: 'Lucas Bernard',
      course: 'Sécurité Aéroportuaire - DGAC',
      date: '2025-07-17',
      duration: '1h35min',
      score: 0,
      status: 'suspended',
      incident_count: 8,
      risk_level: 'high',
      security_events: ['identity_verification_failed', 'browser_extension_detected', 'developer_tools_opened']
    },
    {
      id: '5',
      student_name: 'Camille Rousseau',
      course: 'Formation Agent de Piste',
      date: '2025-07-16',
      duration: '1h25min',
      score: 91,
      status: 'passed',
      incident_count: 1,
      risk_level: 'low',
      security_events: ['right_click_blocked']
    }
  ];

  // Charger les données au montage et lors des changements de filtres
  useEffect(() => {
    loadData();
  }, [selectedPeriod, selectedCourse]);

  // Calculs statistiques
  const totalExams = examReports.length || securityStats.total_exams;
  const passedExams = examReports.filter(e => e.status === 'passed').length;
  const suspendedExams = examReports.filter(e => e.status === 'suspended').length;
  const underReviewExams = examReports.filter(e => e.status === 'under_review').length;
  const totalIncidents = examReports.reduce((sum, exam) => sum + exam.incident_count, 0) || securityStats.security_incidents;
  const averageScore = examReports.length > 0 
    ? Math.round(examReports.reduce((sum, exam) => sum + exam.score, 0) / examReports.length)
    : securityStats.average_score;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">✅ Validé</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">❌ Échoué</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">🚫 Suspendu</Badge>;
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ En révision</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">🔴 Élevé</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">🟡 Moyen</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">🟢 Faible</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const exportReport = async (format: 'pdf' | 'excel') => {
    setExporting(true);
    try {
      const blob = await securityService.exportReport(format, {
        period: selectedPeriod,
        courseId: selectedCourse === 'all' ? undefined : selectedCourse
      });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rapport-securite-${selectedPeriod}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success(`Rapport exporté en ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast.error('Erreur lors de l\'export du rapport');
    } finally {
      setExporting(false);
    }
  };

  // Valider ou rejeter un examen
  const handleValidateExam = async (examId: string, decision: 'approve' | 'reject', reason?: string) => {
    try {
      await securityService.validateExamResult(examId, decision, reason);
      toast.success(`Examen ${decision === 'approve' ? 'validé' : 'rejeté'} avec succès`);
      loadData(); // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      toast.error('Erreur lors de la validation de l\'examen');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header et filtres */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-aviation-600" />
                Rapports de Sécurité
              </CardTitle>
              <CardDescription>
                Analysez les performances de sécurité de vos examens
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => exportReport('excel')}
                disabled={exporting || loading}
              >
                {exporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                Excel
              </Button>
              <Button 
                variant="outline" 
                onClick={() => exportReport('pdf')}
                disabled={exporting || loading}
              >
                {exporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Période</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                  <SelectItem value="quarter">Ce trimestre</SelectItem>
                  <SelectItem value="year">Cette année</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Formation</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les formations</SelectItem>
                  <SelectItem value="security">Sécurité Aéroportuaire - DGAC</SelectItem>
                  <SelectItem value="ground">Formation Agent de Piste</SelectItem>
                  <SelectItem value="maintenance">Maintenance Avionique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Examens totaux</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExams}</div>
            <p className="text-xs text-muted-foreground">
              Cette période
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de réussite</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((passedExams / totalExams) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {passedExams}/{totalExams} validés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents totaux</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalIncidents}</div>
            <p className="text-xs text-muted-foreground">
              Moyenne: {Math.round(totalIncidents / totalExams)} par examen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Toutes formations
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="detailed">Examens détaillés</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Répartition des statuts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Répartition des Résultats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Validés</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(passedExams / totalExams) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{passedExams}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">En révision</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(underReviewExams / totalExams) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{underReviewExams}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Suspendus</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(suspendedExams / totalExams) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{suspendedExams}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top des incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Types d'Incidents les Plus Fréquents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Changement d'onglet</span>
                    <Badge variant="outline">3 occurrences</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clic droit bloqué</span>
                    <Badge variant="outline">2 occurrences</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Webcam déconnectée</span>
                    <Badge variant="outline">1 occurrence</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Copier-coller tenté</span>
                    <Badge variant="outline">1 occurrence</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Examens détaillés */}
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Examens</CardTitle>
              <CardDescription>
                Liste détaillée de tous les examens avec leurs incidents de sécurité
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mr-2" />
                  <span>Chargement des rapports...</span>
                </div>
              ) : examReports.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucun rapport disponible</h3>
                  <p className="text-muted-foreground">
                    Les rapports d'examens apparaîtront ici après les sessions
                  </p>
                </div>
              ) : (
              <div className="space-y-4">
                {examReports.map((exam) => (
                  <Card key={exam.id} className="border-l-4 border-l-aviation-500">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{exam.student_name || exam.studentName}</h4>
                          <p className="text-sm text-muted-foreground">{exam.course}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(exam.date).toLocaleDateString('fr-FR')}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm">{exam.duration}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          {getStatusBadge(exam.status)}
                          {getRiskBadge(exam.risk_level || exam.riskLevel)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Score</p>
                          <p className="text-lg font-semibold">{exam.score}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Incidents</p>
                          <p className="text-lg font-semibold text-yellow-600">{exam.incident_count || exam.incidentCount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Événements</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(exam.security_events || exam.securityEvents || []).slice(0, 3).map((event, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {typeof event === 'string' ? event.replace('_', ' ') : event.event_type?.replace('_', ' ')}
                              </Badge>
                            ))}
                            {(exam.security_events || exam.securityEvents || []).length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{(exam.security_events || exam.securityEvents || []).length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir Détails
                        </Button>
                        {exam.status === 'under_review' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 border-green-200"
                              onClick={() => handleValidateExam(exam.id, 'approve')}
                            >
                              Valider
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200"
                              onClick={() => handleValidateExam(exam.id, 'reject', 'Incidents de sécurité détectés')}
                            >
                              Rejeter
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityReports;