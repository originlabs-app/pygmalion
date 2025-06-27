import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  Clock,
  PlayCircle,
  Download,
  Calendar,
  MapPin,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Search,
  Filter,
  BarChart3,
  ExternalLink,
  User
} from 'lucide-react';

interface ActiveFormation {
  id: string;
  courseId: string;
  title: string;
  provider: string;
  category: string;
  type: 'online' | 'virtual' | 'in-person' | 'blended';
  progress: number;
  startDate: string;
  endDate: string;
  lastActivity: string;
  totalHours: number;
  completedHours: number;
  status: 'on-track' | 'behind' | 'at-risk' | 'completed';
  nextDeadline?: string;
  location: string;
  instructor?: string;
  documents: number;
  hasQuiz: boolean;
  hasExam: boolean;
  certificationType: string;
}

const StudentFormationsActive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('progress');

  // Données mockées des formations en cours - basées sur le catalogue réel
  const activeFormations: ActiveFormation[] = [
    {
      id: 'enrollment-1',
      courseId: '1',
      title: 'Sûreté Aéroportuaire - Module Certification',
      provider: 'AeroSecure Training',
      category: 'Sécurité Aéroportuaire',
      type: 'online',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      lastActivity: '2024-01-20',
      totalHours: 12,
      completedHours: 8,
      status: 'on-track',
      nextDeadline: '2024-01-25',
      location: 'E-learning',
      documents: 4,
      hasQuiz: true,
      hasExam: true,
      certificationType: 'Badge d\'accès zones réglementées'
    },
    {
      id: 'enrollment-2',
      courseId: '3',
      title: 'Maintenance Aéronefs Part 66 - Module Avionique',
      provider: 'TechAero Academy',
      category: 'Maintenance Aéronautique',
      type: 'virtual',
      progress: 45,
      startDate: '2024-01-08',
      endDate: '2024-03-01',
      lastActivity: '2024-01-18',
      totalHours: 80,
      completedHours: 36,
      status: 'behind',
      nextDeadline: '2024-01-28',
      location: 'Classes virtuelles Zoom',
      instructor: 'Marc Dubois - Expert Avionique',
      documents: 12,
      hasQuiz: true,
      hasExam: true,
      certificationType: 'Licence Part 66 Module Avionique'
    }
  ];

  // Fonctions utilitaires
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'behind': return 'text-orange-600 bg-orange-100';
      case 'at-risk': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track': return 'Dans les temps';
      case 'behind': return 'En retard';
      case 'at-risk': return 'À risque';
      case 'completed': return 'Terminé';
      default: return status;
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

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filtrage et tri
  const filteredFormations = activeFormations
    .filter(formation => {
      const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formation.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || formation.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'progress': return b.progress - a.progress;
        case 'deadline': return new Date(a.nextDeadline || '').getTime() - new Date(b.nextDeadline || '').getTime();
        case 'alphabetical': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  const totalProgress = Math.round(activeFormations.reduce((sum, f) => sum + f.progress, 0) / activeFormations.length);
  const totalHours = activeFormations.reduce((sum, f) => sum + f.completedHours, 0);
  const urgentDeadlines = activeFormations.filter(f => f.nextDeadline && getDaysUntilDeadline(f.nextDeadline) <= 7).length;

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Formations En Cours</h1>
            <p className="text-gray-600">
              Suivez vos {activeFormations.length} formations actives et votre progression
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Planning PDF
            </Button>
            <Button size="sm" asChild>
              <Link to="/courses">
                <Search className="h-4 w-4 mr-2" />
                Découvrir Plus
              </Link>
            </Button>
          </div>
        </div>

        {/* KPIs Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Formations Actives</p>
                  <p className="text-3xl font-bold text-blue-600">{activeFormations.length}</p>
                </div>
                <BookOpen className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progression Moyenne</p>
                  <p className="text-3xl font-bold text-green-600">{totalProgress}%</p>
                  <Progress value={totalProgress} className="h-2 mt-2" />
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Heures Effectuées</p>
                  <p className="text-3xl font-bold text-purple-600">{totalHours}h</p>
                </div>
                <Clock className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Échéances Urgentes</p>
                  <p className="text-3xl font-bold text-orange-600">{urgentDeadlines}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Sécurité Aéroportuaire">Sécurité Aéroportuaire</SelectItem>
                  <SelectItem value="Maintenance Aéronautique">Maintenance Aéronautique</SelectItem>
                  <SelectItem value="Langues Techniques">Langues Techniques</SelectItem>
                  <SelectItem value="Contrôle Aérien">Contrôle Aérien</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progression</SelectItem>
                  <SelectItem value="deadline">Échéance</SelectItem>
                  <SelectItem value="alphabetical">Alphabétique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des Formations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFormations.map((formation) => {
            const daysUntilDeadline = formation.nextDeadline ? getDaysUntilDeadline(formation.nextDeadline) : null;
            
            return (
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
                    <Badge className={getStatusColor(formation.status)}>
                      {getStatusLabel(formation.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Progression */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progression</span>
                      <span className="text-sm text-gray-600">{formation.progress}%</span>
                    </div>
                    <Progress value={formation.progress} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{formation.completedHours}h sur {formation.totalHours}h</span>
                      <span>{formation.totalHours - formation.completedHours}h restantes</span>
                    </div>
                  </div>

                  {/* Informations détaillées */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Fin: {new Date(formation.endDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{formation.location}</span>
                    </div>
                    {formation.instructor && (
                      <div className="flex items-center gap-2 col-span-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{formation.instructor}</span>
                      </div>
                    )}
                  </div>

                  {/* Prochaine échéance */}
                  {formation.nextDeadline && daysUntilDeadline !== null && (
                    <div className={`p-3 rounded-lg ${daysUntilDeadline <= 3 ? 'bg-red-50' : daysUntilDeadline <= 7 ? 'bg-orange-50' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-2">
                        <Clock className={`h-4 w-4 ${daysUntilDeadline <= 3 ? 'text-red-600' : daysUntilDeadline <= 7 ? 'text-orange-600' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium ${daysUntilDeadline <= 3 ? 'text-red-800' : daysUntilDeadline <= 7 ? 'text-orange-800' : 'text-blue-800'}`}>
                          Prochaine échéance dans {daysUntilDeadline} jour{daysUntilDeadline > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Ressources disponibles */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {formation.documents} documents
                    </span>
                    {formation.hasQuiz && (
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Quiz
                      </span>
                    )}
                    {formation.hasExam && (
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Examen
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" asChild>
                      <Link to={`/lms/course/${formation.courseId}`}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continuer
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to={`/courses/${formation.courseId}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statistiques globales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Analyse de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{totalProgress}%</div>
                <div className="text-sm text-gray-600">Progression moyenne</div>
                <Progress value={totalProgress} className="h-2 mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">{totalHours}h</div>
                <div className="text-sm text-gray-600">Heures de formation</div>
                <div className="text-xs text-gray-500 mt-1">Ce mois-ci</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {activeFormations.filter(f => f.progress >= 90).length}
                </div>
                <div className="text-sm text-gray-600">Près de la fin</div>
                <div className="text-xs text-gray-500 mt-1">+90% terminé</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentFormationsActive; 