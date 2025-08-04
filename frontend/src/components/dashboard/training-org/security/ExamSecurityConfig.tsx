import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { securityService, ExamConfiguration } from '@/services/securityService';
import { 
  Settings, 
  Shield, 
  Camera, 
  Lock, 
  Globe, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Shuffle,
  Loader2
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  status: string;
  type: string;
}

interface ExamSecurityConfigProps {
  courses: Course[];
}

interface Exam {
  id: string;
  title: string;
  course: {
    id: string;
    title: string;
  };
  module: {
    id: string;
    title: string;
  };
}

interface SecurityConfig {
  default_proctoring: boolean;
  default_webcam: boolean;
  default_lockdown: boolean;
  default_ip_restriction: string;
  allowed_attempts: number;
  time_limit_strict: boolean;
  question_randomization: boolean;
  answer_randomization: boolean;
  alert_threshold: number;
  auto_suspend: boolean;
  manual_review_required: boolean;
}

const ExamSecurityConfig: React.FC<ExamSecurityConfigProps> = ({ courses }) => {
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [activeConfigTab, setActiveConfigTab] = useState('detection');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [currentConfig, setCurrentConfig] = useState<ExamConfiguration | null>(null);
  
  // Configuration par défaut
  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    default_proctoring: false,
    default_webcam: false,
    default_lockdown: false,
    default_ip_restriction: '',
    allowed_attempts: 1,
    time_limit_strict: true,
    question_randomization: true,
    answer_randomization: true,
    alert_threshold: 3,
    auto_suspend: false,
    manual_review_required: true
  });

  // Simuler le chargement des examens disponibles (en réalité, viendrait d'une API)
  useEffect(() => {
    const loadExams = async () => {
      setLoading(true);
      try {
        // TODO: Remplacer par un appel API réel pour récupérer les examens
        const mockExams: Exam[] = courses
          .filter(c => c.status === 'published')
          .map(course => ({
            id: `exam-${course.id}`,
            title: `Examen final - ${course.title}`,
            course: {
              id: course.id,
              title: course.title
            },
            module: {
              id: `module-${course.id}`,
              title: 'Module d\'évaluation finale'
            }
          }));
        setExams(mockExams);
      } catch (error) {
        console.error('Erreur lors du chargement des examens:', error);
        toast.error('Impossible de charger les examens');
      } finally {
        setLoading(false);
      }
    };

    loadExams();
  }, [courses]);

  // Charger la configuration existante pour l'examen sélectionné
  useEffect(() => {
    const loadConfiguration = async () => {
      if (!selectedExam) {
        setCurrentConfig(null);
        return;
      }

      try {
        const config = await securityService.getExamConfiguration(selectedExam);
        setCurrentConfig(config);
        
        if (config) {
          setSecurityConfig({
            default_proctoring: config.default_proctoring,
            default_webcam: config.default_webcam,
            default_lockdown: config.default_lockdown,
            default_ip_restriction: config.default_ip_restriction || '',
            allowed_attempts: config.allowed_attempts,
            time_limit_strict: config.time_limit_strict,
            question_randomization: config.question_randomization,
            answer_randomization: config.answer_randomization,
            alert_threshold: config.alert_threshold,
            auto_suspend: config.auto_suspend,
            manual_review_required: config.manual_review_required
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration:', error);
      }
    };

    loadConfiguration();
  }, [selectedExam]);

  const handleConfigChange = (key: keyof SecurityConfig, value: boolean | string | number) => {
    setSecurityConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveConfiguration = async () => {
    if (!selectedExam) {
      toast.error('Veuillez sélectionner un examen');
      return;
    }

    setSaving(true);
    try {
      const configData: ExamConfiguration = {
        exam_id: selectedExam,
        default_proctoring: securityConfig.default_proctoring,
        default_webcam: securityConfig.default_webcam,
        default_lockdown: securityConfig.default_lockdown,
        default_ip_restriction: securityConfig.default_ip_restriction || null,
        allowed_attempts: securityConfig.allowed_attempts,
        time_limit_strict: securityConfig.time_limit_strict,
        question_randomization: securityConfig.question_randomization,
        answer_randomization: securityConfig.answer_randomization,
        alert_threshold: securityConfig.alert_threshold,
        auto_suspend: securityConfig.auto_suspend,
        manual_review_required: securityConfig.manual_review_required
      };

      if (currentConfig?.id) {
        await securityService.updateExamConfiguration(currentConfig.id, configData);
        toast.success('Configuration mise à jour avec succès');
      } else {
        const newConfig = await securityService.saveExamConfiguration(configData);
        setCurrentConfig(newConfig);
        toast.success('Configuration sauvegardée avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde de la configuration');
    } finally {
      setSaving(false);
    }
  };

  const getSecurityLevel = () => {
    const activeFeatures = [
      securityConfig.default_proctoring,
      securityConfig.default_webcam,
      securityConfig.default_lockdown,
      securityConfig.default_ip_restriction !== '',
      securityConfig.time_limit_strict,
      securityConfig.question_randomization,
      securityConfig.answer_randomization,
      securityConfig.manual_review_required
    ].filter(Boolean).length;
    
    if (activeFeatures >= 6) return { level: 'Élevé', color: 'text-red-600', bg: 'bg-red-100' };
    if (activeFeatures >= 4) return { level: 'Moyen', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Faible', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const securityLevel = getSecurityLevel();

  return (
    <div className="space-y-6">
      {/* Sélection du cours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Anti-Fraude par Formation
          </CardTitle>
          <CardDescription>
            Paramétrez les mesures de sécurité pour vos examens finaux. 
            Chaque formation peut avoir sa propre configuration selon ses exigences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="exam-select">Sélectionner un examen</Label>
            <Select value={selectedExam} onValueChange={setSelectedExam} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Chargement des examens..." : "Choisir un examen final..."} />
              </SelectTrigger>
              <SelectContent>
                {exams.map(exam => (
                  <SelectItem key={exam.id} value={exam.id}>
                    {exam.title} ({exam.course.title})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedExam && (
            <Alert className="border-aviation-200 bg-aviation-50">
              <CheckCircle className="h-4 w-4 text-aviation-600" />
              <AlertDescription className="text-aviation-800">
                Configuration pour: <strong>{exams.find(e => e.id === selectedExam)?.title}</strong>
                <br />
                Formation: <strong>{exams.find(e => e.id === selectedExam)?.course.title}</strong>
                <br />
                Niveau de sécurité actuel: <Badge className={`${securityLevel.bg} ${securityLevel.color} ml-2`}>
                  {securityLevel.level}
                </Badge>
                {currentConfig && (
                  <Badge variant="outline" className="ml-2">
                    Configuration existante
                  </Badge>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {selectedExam && (
        <Tabs value={activeConfigTab} onValueChange={setActiveConfigTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detection">Détection</TabsTrigger>
            <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
            <TabsTrigger value="policies">Politiques</TabsTrigger>
          </TabsList>

          {/* Onglet Détection */}
          <TabsContent value="detection">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Outils de Détection
                </CardTitle>
                <CardDescription>
                  Activez les outils de surveillance et de détection de fraude
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Proctoring */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <div>
                      <Label className="text-base font-medium">Proctoring Webcam</Label>
                      <p className="text-sm text-muted-foreground">
                        Surveillance vidéo en continu pendant l'examen
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securityConfig.default_proctoring}
                    onCheckedChange={(value) => handleConfigChange('default_proctoring', value)}
                  />
                </div>

                {/* Webcam obligatoire */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Camera className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium">Webcam Obligatoire</Label>
                      <p className="text-sm text-muted-foreground">
                        Vérification de la présence et du fonctionnement de la webcam
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securityConfig.default_webcam}
                    onCheckedChange={(value) => handleConfigChange('default_webcam', value)}
                  />
                </div>

                {/* Enregistrement écran - Désactivé */}
                <div className="flex items-center justify-between p-4 border rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <Label className="text-base font-medium text-gray-600">Enregistrement Écran</Label>
                      <p className="text-sm text-muted-foreground">
                        Fonctionnalité prévue pour une version future
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={false}
                    disabled
                    onCheckedChange={() => {}}
                  />
                </div>

                {/* Restriction IP */}
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-orange-600" />
                    <div>
                      <Label className="text-base font-medium">Restriction IP</Label>
                      <p className="text-sm text-muted-foreground">
                        Limiter l'accès à certaines adresses IP (centre d'examen)
                      </p>
                    </div>
                  </div>
                  <Input
                    placeholder="192.168.1.0/24 ou IP spécifique..."
                    value={securityConfig.default_ip_restriction}
                    onChange={(e) => handleConfigChange('default_ip_restriction', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Restrictions */}
          <TabsContent value="restrictions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-red-600" />
                  Restrictions et Blocages
                </CardTitle>
                <CardDescription>
                  Bloquez les actions susceptibles de faciliter la fraude
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verrouillage navigateur */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-red-600" />
                    <div>
                      <Label className="text-base font-medium">Verrouillage Navigateur</Label>
                      <p className="text-sm text-muted-foreground">
                        Empêcher l'ouverture de nouveaux onglets/fenêtres
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={securityConfig.default_lockdown}
                    onCheckedChange={(value) => handleConfigChange('default_lockdown', value)}
                  />
                </div>

                {/* Blocage copier-coller - Activé automatiquement */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium text-green-800">Bloquer Copier-Coller</Label>
                      <p className="text-sm text-green-600">
                        Automatiquement activé pour tous les examens sécurisés
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={true}
                    disabled
                    onCheckedChange={() => {}}
                  />
                </div>

                {/* Désactiver clic droit - Activé automatiquement */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium text-green-800">Désactiver Clic Droit</Label>
                      <p className="text-sm text-green-600">
                        Automatiquement activé pour tous les examens sécurisés
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={true}
                    disabled
                    onCheckedChange={() => {}}
                  />
                </div>

                {/* Blocage changement d'onglet - Activé automatiquement */}
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <Label className="text-base font-medium text-green-800">Bloquer Changement d'Onglet</Label>
                      <p className="text-sm text-green-600">
                        Automatiquement activé pour tous les examens sécurisés
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={true}
                    disabled
                    onCheckedChange={() => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Politiques */}
          <TabsContent value="policies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Politiques d'Examen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Nombre de tentatives */}
                  <div className="space-y-2">
                    <Label>Tentatives autorisées</Label>
                    <Select 
                      value={securityConfig.allowed_attempts.toString()} 
                      onValueChange={(value) => handleConfigChange('allowed_attempts', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 tentative (Recommandé)</SelectItem>
                        <SelectItem value="2">2 tentatives</SelectItem>
                        <SelectItem value="3">3 tentatives</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Temps limite strict */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Temps limite strict</Label>
                      <p className="text-sm text-muted-foreground">
                        Fermeture automatique en fin de temps
                      </p>
                    </div>
                    <Switch
                      checked={securityConfig.time_limit_strict}
                      onCheckedChange={(value) => handleConfigChange('time_limit_strict', value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shuffle className="h-5 w-5 text-purple-600" />
                    Randomisation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Randomisation questions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mélanger les questions</Label>
                      <p className="text-sm text-muted-foreground">
                        Ordre aléatoire des questions
                      </p>
                    </div>
                    <Switch
                      checked={securityConfig.question_randomization}
                      onCheckedChange={(value) => handleConfigChange('question_randomization', value)}
                    />
                  </div>

                  {/* Randomisation réponses */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mélanger les réponses</Label>
                      <p className="text-sm text-muted-foreground">
                        Ordre aléatoire des choix de réponse
                      </p>
                    </div>
                    <Switch
                      checked={securityConfig.answer_randomization}
                      onCheckedChange={(value) => handleConfigChange('answer_randomization', value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Gestion des Alertes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Seuil d'alerte */}
                  <div className="space-y-2">
                    <Label>Seuil d'alerte (nombre d'incidents)</Label>
                    <Select 
                      value={securityConfig.alert_threshold.toString()}
                      onValueChange={(value) => handleConfigChange('alert_threshold', parseInt(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 incident</SelectItem>
                        <SelectItem value="2">2 incidents</SelectItem>
                        <SelectItem value="3">3 incidents (Recommandé)</SelectItem>
                        <SelectItem value="5">5 incidents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Suspension automatique */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Suspension automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Arrêter l'examen si seuil dépassé
                      </p>
                    </div>
                    <Switch
                      checked={securityConfig.auto_suspend}
                      onCheckedChange={(value) => handleConfigChange('auto_suspend', value)}
                    />
                  </div>

                  {/* Révision manuelle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Révision manuelle requise</Label>
                      <p className="text-sm text-muted-foreground">
                        Validation manuelle après incidents
                      </p>
                    </div>
                    <Switch
                      checked={securityConfig.manual_review_required}
                      onCheckedChange={(value) => handleConfigChange('manual_review_required', value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Boutons d'action */}
      {selectedExam && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Configuration pour: <strong>{exams.find(e => e.id === selectedExam)?.title}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Les paramètres s'appliquent à cet examen spécifique
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSecurityConfig({
                  default_proctoring: false,
                  default_webcam: false,
                  default_lockdown: false,
                  default_ip_restriction: '',
                  allowed_attempts: 1,
                  time_limit_strict: true,
                  question_randomization: true,
                  answer_randomization: true,
                  alert_threshold: 3,
                  auto_suspend: false,
                  manual_review_required: true
                })}>
                  Réinitialiser
                </Button>
                <Button 
                  onClick={saveConfiguration} 
                  disabled={saving}
                  className="bg-aviation-600 hover:bg-aviation-700"
                >
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {currentConfig ? 'Mettre à jour' : 'Sauvegarder'} la Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExamSecurityConfig;