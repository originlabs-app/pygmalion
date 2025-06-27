import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  Award,
  Star,
  Download,
  Trophy,
  Target,
  BookOpen,
  CheckCircle,
  User,
  MapPin,
  ExternalLink,
  Share2,
  Eye,
  Sparkles,
  TrendingUp,
  FileText,
  Gift,
  ChevronRight,
  Zap,
  Crown,
  Search,
  Filter
} from 'lucide-react';

interface CompletedFormation {
  id: string;
  courseId: string;
  title: string;
  provider: string;
  category: string;
  type: 'online' | 'virtual' | 'in-person' | 'blended';
  completionDate: string;
  startDate: string;
  duration: string;
  finalScore: number;
  maxScore: number;
  passingScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  status: 'passed' | 'failed' | 'excellent';
  certificateId: string;
  certificateUrl: string;
  location: string;
  instructor?: string;
  hoursCompleted: number;
  achievements: string[];
  skills: string[];
  rating?: number;
  review?: string;
  certificationLevel: string;
  validUntil?: string;
  renewalRequired: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedDate: string;
  points: number;
}

interface Stat {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const StudentFormationsCompleted = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('completion-date');
  const [activeTab, setActiveTab] = useState('formations');

  // Données mockées des formations terminées - basées sur le catalogue réel
  const completedFormations: CompletedFormation[] = [
    {
      id: 'completed-1',
      courseId: '6',
      title: 'Agent de Piste - Certification Complete IATA',
      provider: 'Ground Handling Academy',
      category: 'Operations Aéroportuaires',
      type: 'blended',
      completionDate: '2024-01-15',
      startDate: '2023-12-01',
      duration: '120 heures (4 semaines)',
      finalScore: 87,
      maxScore: 100,
      passingScore: 70,
      grade: 'B',
      status: 'excellent',
      certificateId: 'GHA-2024-001-AP',
      certificateUrl: '/certificates/agent-piste-certification.pdf',
      location: 'Aéroport Paris-Orly',
      instructor: 'Jean-Pierre Leclerc - Expert GSE',
      hoursCompleted: 120,
      achievements: ['Premier de la promo', 'Manipulation GSE Expert', 'Sécurité FOD Master'],
      skills: ['Manipulation bagages', 'Équipements GSE', 'Push-back', 'Sécurité aéroportuaire'],
      rating: 5,
      review: 'Formation excellente avec beaucoup de pratique terrain. Instructeur très compétent.',
      certificationLevel: 'Agent de Piste Certifié IATA',
      validUntil: '2027-01-15',
      renewalRequired: true
    },
    {
      id: 'completed-2',
      courseId: '8',
      title: 'Soudage Aéronautique - Certification EN 4179',
      provider: 'AeroWeld Training Center',
      category: 'Fabrication Aéronautique',
      type: 'in-person',
      completionDate: '2023-11-20',
      startDate: '2023-10-30',
      duration: '120 heures (3 semaines)',
      finalScore: 94,
      maxScore: 100,
      passingScore: 80,
      grade: 'A',
      status: 'excellent',
      certificateId: 'AWTC-2023-EN4179-142',
      certificateUrl: '/certificates/soudage-aeronautique-en4179.pdf',
      location: 'Centre technique Bordeaux',
      instructor: 'Marie Dubois - Ingénieur Soudage Senior',
      hoursCompleted: 120,
      achievements: ['Score Parfait TIG', 'Maîtrise Alliages', 'Contrôle Qualité Expert'],
      skills: ['Soudage TIG', 'Alliages aviation', 'Contrôle qualité', 'Normes EN 4179'],
      rating: 5,
      review: 'Formation technique de très haut niveau. Les équipements sont professionnels.',
      certificationLevel: 'Soudeur Aéronautique Certifié EN 4179',
      validUntil: '2026-11-20',
      renewalRequired: true
    },
    {
      id: 'completed-3',
      courseId: '7',
      title: 'Management Aviation Safety (SMS)',
      provider: 'Aviation Safety Institute',
      category: 'Management Sécurité',
      type: 'virtual',
      completionDate: '2023-09-10',
      startDate: '2023-08-01',
      duration: '80 heures (6 semaines)',
      finalScore: 76,
      maxScore: 100,
      passingScore: 70,
      grade: 'C',
      status: 'passed',
      certificateId: 'ASI-2023-SMS-089',
      certificateUrl: '/certificates/aviation-safety-management.pdf',
      location: 'Formation virtuelle',
      instructor: 'Dr. Philippe Martin - Expert SMS',
      hoursCompleted: 80,
      achievements: ['Analyste Risques', 'Culture Sécurité'],
      skills: ['Analyse de risques', 'Système SMS', 'Investigation incidents', 'Culture sécurité'],
      rating: 4,
      review: 'Contenu dense mais très intéressant. Beaucoup d\'études de cas pratiques.',
      certificationLevel: 'Manager Sécurité Aviation',
      validUntil: '2025-09-10',
      renewalRequired: false
    }
  ];

  // Achievements mockés
  const achievements: Achievement[] = [
    {
      id: 'ach-1',
      title: 'Premier Certificat',
      description: 'Félicitations pour votre première certification !',
      icon: '🎓',
      color: 'text-blue-600',
      rarity: 'common',
      earnedDate: '2023-09-10',
      points: 100
    },
    {
      id: 'ach-2',
      title: 'Excellence Technique',
      description: 'Score supérieur à 90% sur une formation technique',
      icon: '⚡',
      color: 'text-purple-600',
      rarity: 'rare',
      earnedDate: '2023-11-20',
      points: 250
    },
    {
      id: 'ach-3',
      title: 'Maître Soudeur',
      description: 'Certification soudage aéronautique avec mention',
      icon: '🔥',
      color: 'text-orange-600',
      rarity: 'epic',
      earnedDate: '2023-11-20',
      points: 500
    },
    {
      id: 'ach-4',
      title: 'Leader de Promo',
      description: 'Premier de votre promotion avec les félicitations',
      icon: '👑',
      color: 'text-yellow-600',
      rarity: 'legendary',
      earnedDate: '2024-01-15',
      points: 1000
    }
  ];

  // Fonctions utilitaires
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'passed': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'passed': return 'Réussi';
      case 'failed': return 'Échoué';
      default: return status;
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-orange-600 bg-orange-100';
      case 'D': return 'text-red-600 bg-red-100';
      case 'E':
      case 'F': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return '💻';
      case 'virtual': return '🎥';
      case 'in-person': return '🏢';
      case 'blended': return '🔄';
      default: return '📚';
    }
  };

  // Calculs statistiques
  const totalFormations = completedFormations.length;
  const totalHours = completedFormations.reduce((sum, f) => sum + f.hoursCompleted, 0);
  const averageScore = Math.round(completedFormations.reduce((sum, f) => sum + f.finalScore, 0) / totalFormations);
  const excellentCount = completedFormations.filter(f => f.status === 'excellent').length;
  const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0);

  // Filtrage et tri
  const filteredFormations = completedFormations
    .filter(formation => {
      const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formation.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || formation.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || formation.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'completion-date': return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
        case 'score': return b.finalScore - a.finalScore;
        case 'alphabetical': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  // Statistiques pour gamification
  const stats: Stat[] = [
    {
      label: 'Formations Complétées',
      value: totalFormations,
      unit: '',
      icon: <BookOpen className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      label: 'Heures d\'Apprentissage',
      value: totalHours,
      unit: 'h',
      icon: <Clock className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      label: 'Score Moyen',
      value: averageScore,
      unit: '%',
      icon: <Target className="h-5 w-5" />,
      color: 'text-purple-600'
    },
    {
      label: 'Points XP',
      value: totalPoints,
      unit: '',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-yellow-600'
    }
  ];

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              Formations Terminées
            </h1>
            <p className="text-gray-600">
              Vos accomplissements et certifications obtenues
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relevé Complet
            </Button>
            <Button size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager Profil
            </Button>
          </div>
        </div>

        {/* Statistiques Gamifiées */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value.toLocaleString()}{stat.unit}
                    </p>
                  </div>
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badges & Accomplissements Récents */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Accomplissements Récents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.slice(0, 4).map((achievement) => (
                <Card key={achievement.id} className={`${getRarityColor(achievement.rarity)} border-2`}>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        +{achievement.points} XP
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onglets Formations / Accomplissements */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="formations">Mes Formations</TabsTrigger>
              <TabsTrigger value="achievements">Tous les Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="formations" className="space-y-4">
              {/* Filtres et Recherche */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Rechercher une formation..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes catégories</SelectItem>
                        <SelectItem value="Operations Aéroportuaires">Operations Aéroportuaires</SelectItem>
                        <SelectItem value="Fabrication Aéronautique">Fabrication Aéronautique</SelectItem>
                        <SelectItem value="Management Sécurité">Management Sécurité</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Résultat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous résultats</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="passed">Réussi</SelectItem>
                        <SelectItem value="failed">Échoué</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completion-date">Date fin</SelectItem>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="alphabetical">Alphabétique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Liste des Formations Terminées */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredFormations.map((formation) => (
                  <Card key={formation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 flex items-center gap-2">
                            <span>{getTypeIcon(formation.type)}</span>
                            {formation.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {formation.provider}
                            </span>
                            <Badge variant="outline">{formation.category}</Badge>
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getStatusColor(formation.status)}>
                            {getStatusLabel(formation.status)}
                          </Badge>
                          <Badge className={getGradeColor(formation.grade)} variant="outline">
                            Note: {formation.grade}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Score et progression */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Score Final</span>
                          <span className="text-sm font-bold">
                            {formation.finalScore}/{formation.maxScore} points
                          </span>
                        </div>
                        <Progress 
                          value={(formation.finalScore / formation.maxScore) * 100} 
                          className="h-3" 
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Minimum: {formation.passingScore}</span>
                          <span>{Math.round((formation.finalScore / formation.maxScore) * 100)}%</span>
                        </div>
                      </div>

                      {/* Informations détaillées */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>Fini le {new Date(formation.completionDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{formation.hoursCompleted}h complétées</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{formation.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-gray-400" />
                          <span>Certificat #{formation.certificateId.slice(-3)}</span>
                        </div>
                      </div>

                      {formation.instructor && (
                        <div className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded-lg">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-800">{formation.instructor}</span>
                        </div>
                      )}

                      {/* Achievements & Compétences */}
                      {formation.achievements.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-gray-700">Accomplissements :</div>
                          <div className="flex flex-wrap gap-1">
                            {formation.achievements.map((achievement, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                🏆 {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">Compétences acquises :</div>
                        <div className="flex flex-wrap gap-1">
                          {formation.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Note et avis */}
                      {formation.rating && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < formation.rating! 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{formation.rating}/5</span>
                          </div>
                          {formation.review && (
                            <p className="text-sm text-gray-600 italic">"{formation.review}"</p>
                          )}
                        </div>
                      )}

                      {/* Validité du certificat */}
                      {formation.validUntil && (
                        <div className={`p-2 rounded-lg ${
                          formation.renewalRequired ? 'bg-orange-50' : 'bg-green-50'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Award className={`h-4 w-4 ${
                              formation.renewalRequired ? 'text-orange-600' : 'text-green-600'
                            }`} />
                            <span className={`text-xs ${
                              formation.renewalRequired ? 'text-orange-800' : 'text-green-800'
                            }`}>
                              Valide jusqu'au {new Date(formation.validUntil).toLocaleDateString('fr-FR')}
                              {formation.renewalRequired && ' - Renouvellement requis'}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Certificat
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/courses/${formation.courseId}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              {/* Tous les Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={`${getRarityColor(achievement.rarity)} border-2`}>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">{achievement.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Badge variant="secondary">
                            {achievement.rarity}
                          </Badge>
                          <Badge variant="outline">
                            +{achievement.points} XP
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          Obtenu le {new Date(achievement.earnedDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Progression vers nouveaux badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Prochains Objectifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="font-medium">Collectionneur</div>
                        <div className="text-sm text-gray-600">Terminer 10 formations</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{totalFormations}/10</div>
                      <Progress value={(totalFormations / 10) * 100} className="w-24 h-2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📚</div>
                      <div>
                        <div className="font-medium">Érudit</div>
                        <div className="text-sm text-gray-600">Cumuler 500h de formation</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{totalHours}/500h</div>
                      <Progress value={(totalHours / 500) * 100} className="w-24 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentFormationsCompleted; 