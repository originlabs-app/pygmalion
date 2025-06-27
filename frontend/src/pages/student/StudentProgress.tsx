import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Calendar,
  Target,
  Award,
  Clock,
  BookOpen,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Zap,
  Trophy,
  Star,
  ChevronRight,
  Download,
  Eye,
  Filter,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Sparkles
} from 'lucide-react';

interface ProgressData {
  month: string;
  hoursCompleted: number;
  formationsCompleted: number;
  averageScore: number;
}

interface SkillProgress {
  skill: string;
  category: string;
  level: number;
  maxLevel: number;
  progress: number;
  formationsCompleted: number;
  nextMilestone: string;
}

interface LearningStreak {
  current: number;
  longest: number;
  lastActivity: string;
}

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'on-track' | 'behind' | 'completed';
}

const StudentProgress = () => {
  const [timeRange, setTimeRange] = useState<string>('6-months');
  const [activeTab, setActiveTab] = useState('overview');

  // Données de progression mockées
  const progressData: ProgressData[] = [
    { month: 'Juil', hoursCompleted: 25, formationsCompleted: 1, averageScore: 78 },
    { month: 'Août', hoursCompleted: 42, formationsCompleted: 2, averageScore: 85 },
    { month: 'Sept', hoursCompleted: 38, formationsCompleted: 1, averageScore: 76 },
    { month: 'Oct', hoursCompleted: 55, formationsCompleted: 3, averageScore: 89 },
    { month: 'Nov', hoursCompleted: 48, formationsCompleted: 2, averageScore: 94 },
    { month: 'Déc', hoursCompleted: 62, formationsCompleted: 2, averageScore: 87 },
  ];

  // Compétences progressées
  const skillsProgress: SkillProgress[] = [
    {
      skill: 'Sécurité Aéroportuaire',
      category: 'Sécurité',
      level: 3,
      maxLevel: 5,
      progress: 85,
      formationsCompleted: 2,
      nextMilestone: 'Expert en Sûreté Critique'
    },
    {
      skill: 'Maintenance Aéronautique',
      category: 'Technique',
      level: 2,
      maxLevel: 5,
      progress: 45,
      formationsCompleted: 1,
      nextMilestone: 'Spécialiste Avionique'
    },
    {
      skill: 'Contrôle Qualité',
      category: 'Qualité',
      level: 4,
      maxLevel: 5,
      progress: 92,
      formationsCompleted: 3,
      nextMilestone: 'Auditeur Certifié'
    },
    {
      skill: 'Management Équipe',
      category: 'Leadership',
      level: 1,
      maxLevel: 5,
      progress: 25,
      formationsCompleted: 1,
      nextMilestone: 'Team Leader Junior'
    }
  ];

  // Streak d'apprentissage
  const learningStreak: LearningStreak = {
    current: 12,
    longest: 28,
    lastActivity: '2024-01-20'
  };

  // Objectifs d'apprentissage
  const learningGoals: LearningGoal[] = [
    {
      id: 'goal-1',
      title: 'Terminer 10 formations',
      description: 'Objectif pour devenir Collectionneur',
      progress: 6,
      target: 10,
      unit: 'formations',
      deadline: '2024-06-30',
      priority: 'high',
      status: 'on-track'
    },
    {
      id: 'goal-2',
      title: 'Cumuler 500h d\'apprentissage',
      description: 'Devenir un vrai Érudit',
      progress: 320,
      target: 500,
      unit: 'heures',
      deadline: '2024-12-31',
      priority: 'medium',
      status: 'on-track'
    },
    {
      id: 'goal-3',
      title: 'Maintenir 95% de score moyen',
      description: 'Excellence académique',
      progress: 87,
      target: 95,
      unit: '%',
      deadline: '2024-03-31',
      priority: 'high',
      status: 'behind'
    }
  ];

  // Calculs statistiques
  const totalHours = progressData.reduce((sum, month) => sum + month.hoursCompleted, 0);
  const totalFormations = progressData.reduce((sum, month) => sum + month.formationsCompleted, 0);
  const currentMonthHours = progressData[progressData.length - 1]?.hoursCompleted || 0;
  const previousMonthHours = progressData[progressData.length - 2]?.hoursCompleted || 0;
  const hoursGrowth = previousMonthHours ? Math.round(((currentMonthHours - previousMonthHours) / previousMonthHours) * 100) : 0;

  const averageScore = Math.round(progressData.reduce((sum, month) => sum + month.averageScore, 0) / progressData.length);
  const currentScore = progressData[progressData.length - 1]?.averageScore || 0;
  const previousScore = progressData[progressData.length - 2]?.averageScore || 0;
  const scoreGrowth = previousScore ? Math.round(((currentScore - previousScore) / previousScore) * 100) : 0;

  // Utilitaires
  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGoalStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'on-track': return <Target className="h-4 w-4" />;
      case 'behind': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-orange-200 bg-orange-50';
      case 'low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getSkillLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Débutant';
      case 2: return 'Novice';
      case 3: return 'Intermédiaire';
      case 4: return 'Avancé';
      case 5: return 'Expert';
      default: return 'Non défini';
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Ma Progression
            </h1>
            <p className="text-gray-600">
              Analysez votre parcours d'apprentissage et vos accomplissements
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-months">3 mois</SelectItem>
                <SelectItem value="6-months">6 mois</SelectItem>
                <SelectItem value="1-year">1 an</SelectItem>
                <SelectItem value="all-time">Tout</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Rapport
            </Button>
          </div>
        </div>

        {/* KPIs Principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Heures ce Mois</p>
                  <p className="text-3xl font-bold text-blue-600">{currentMonthHours}h</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${hoursGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm ${hoursGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {hoursGrowth >= 0 ? '+' : ''}{hoursGrowth}%
                    </span>
                  </div>
                </div>
                <Clock className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Score Moyen</p>
                  <p className="text-3xl font-bold text-green-600">{currentScore}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-4 w-4 ${scoreGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm ${scoreGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {scoreGrowth >= 0 ? '+' : ''}{scoreGrowth} pts
                    </span>
                  </div>
                </div>
                <Target className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Streak Actuel</p>
                  <p className="text-3xl font-bold text-orange-600">{learningStreak.current}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Record: {learningStreak.longest} jours
                  </p>
                </div>
                <Zap className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Formations Total</p>
                  <p className="text-3xl font-bold text-purple-600">{totalFormations}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {totalHours}h cumulées
                  </p>
                </div>
                <BookOpen className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets Principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
            <TabsTrigger value="goals">Objectifs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Graphique de progression */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600" />
                  Progression Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Simuler un graphique avec des barres */}
                  <div className="grid grid-cols-6 gap-4">
                    {progressData.map((month, index) => (
                      <div key={index} className="text-center">
                        <div className="space-y-2 mb-3">
                          <div className="relative h-32 bg-gray-100 rounded-lg flex items-end">
                            <div 
                              className="w-full bg-blue-500 rounded-lg transition-all duration-500"
                              style={{ height: `${(month.hoursCompleted / 70) * 100}%` }}
                            />
                          </div>
                          <div className="text-sm font-medium">{month.hoursCompleted}h</div>
                        </div>
                        <div className="text-xs text-gray-600">{month.month}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{totalHours}h</div>
                      <div className="text-sm text-gray-600">Total heures</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{averageScore}%</div>
                      <div className="text-sm text-gray-600">Score moyen</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{totalFormations}</div>
                      <div className="text-sm text-gray-600">Formations complétées</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Streak et motivation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Streak d'Apprentissage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-orange-600">
                      🔥 {learningStreak.current} jours
                    </div>
                    <div className="text-sm text-gray-600">
                      Vous apprenez depuis {learningStreak.current} jours consécutifs !
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Votre record</div>
                      <div className="text-lg font-bold text-orange-700">
                        {learningStreak.longest} jours
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continuer à Apprendre
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    Prochains Défis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Weekend Warrior</div>
                      <div className="text-xs text-gray-600">Apprendre 5h ce weekend</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">2/5h</div>
                      <Progress value={40} className="w-16 h-2" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Score Master</div>
                      <div className="text-xs text-gray-600">Obtenir 90%+ sur 3 formations</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">1/3</div>
                      <Progress value={33} className="w-16 h-2" />
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir Tous les Défis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            {/* Compétences acquises */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Développement des Compétences
                </CardTitle>
                <CardDescription>
                  Vos compétences se développent au fur et à mesure de vos formations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillsProgress.map((skill, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{skill.skill}</h4>
                              <p className="text-sm text-gray-600">{skill.category}</p>
                            </div>
                            <Badge variant="outline">
                              Niveau {skill.level}/{skill.maxLevel}
                            </Badge>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                {getSkillLevelLabel(skill.level)}
                              </span>
                              <span className="text-sm text-gray-600">
                                {skill.progress}%
                              </span>
                            </div>
                            <Progress value={skill.progress} className="h-3" />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              {skill.formationsCompleted} formation{skill.formationsCompleted > 1 ? 's' : ''} complétée{skill.formationsCompleted > 1 ? 's' : ''}
                            </span>
                            <span className="text-blue-600 font-medium">
                              → {skill.nextMilestone}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Objectifs d'apprentissage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Mes Objectifs d'Apprentissage
                </CardTitle>
                <CardDescription>
                  Suivez vos objectifs personnels et votre progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningGoals.map((goal) => (
                    <Card key={goal.id} className={`${getPriorityColor(goal.priority)} border-2`}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold flex items-center gap-2">
                                {getGoalStatusIcon(goal.status)}
                                {goal.title}
                              </h4>
                              <p className="text-sm text-gray-600">{goal.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getGoalStatusColor(goal.status)}>
                                {goal.status === 'on-track' ? 'Dans les temps' :
                                 goal.status === 'behind' ? 'En retard' : 'Terminé'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {goal.priority === 'high' ? 'Priorité haute' :
                                 goal.priority === 'medium' ? 'Priorité moyenne' : 'Priorité basse'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">
                                Progression: {goal.progress}/{goal.target} {goal.unit}
                              </span>
                              <span className="text-sm text-gray-600">
                                Échéance: {new Date(goal.deadline).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                            <Progress value={(goal.progress / goal.target) * 100} className="h-3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics détaillées */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    Répartition par Catégorie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm">Sécurité Aéroportuaire</span>
                      </div>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm">Maintenance Technique</span>
                      </div>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span className="text-sm">Contrôle Qualité</span>
                      </div>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm">Management</span>
                      </div>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    Habitudes d'Apprentissage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Lundi - Vendredi</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Weekend</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Matinée (6h-12h)</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soirée (18h-22h)</span>
                        <span>55%</span>
                      </div>
                      <Progress value={55} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights intelligents */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Insights Personnalisés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium">Temps Fort</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Vos meilleures performances sont le soir entre 18h et 22h. 
                      Planifiez vos formations importantes durant ces créneaux.
                    </p>
                  </div>
                  
                  <div className="bg-white/60 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Progression</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Votre score moyen s'améliore de 3% par mois. 
                      Continuez ainsi pour atteindre l'excellence !
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentProgress; 