import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Mail,
  MessageSquare,
  ExternalLink,
  Bell,
  Download,
  Pause
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrainingProgressItem {
  id: string;
  courseTitle: string;
  courseDuration: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue' | 'blocked';
  startDate: string;
  dueDate: string;
  daysRemaining: number;
  lastActivity: string;
  category: string;
  modality: 'online' | 'in_person' | 'blended';
}

interface TeamMemberProgress {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  department: string;
  totalTrainings: number;
  completedTrainings: number;
  inProgressTrainings: number;
  averageProgress: number;
  complianceScore: number;
  lastLoginDate: string;
  trainings: TrainingProgressItem[];
  riskLevel: 'low' | 'medium' | 'high';
}

const TrainingProgress = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [memberFilter, setMemberFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Données mockées pour la démonstration
  const teamProgressData: TeamMemberProgress[] = [
    {
      id: '1',
      name: 'Sarah Martin',
      email: 'sarah.martin@company.com',
      avatar: '',
      position: 'Agent de Piste',
      department: 'Opérations',
      totalTrainings: 3,
      completedTrainings: 1,
      inProgressTrainings: 2,
      averageProgress: 65,
      complianceScore: 85,
      lastLoginDate: '2025-01-21',
      riskLevel: 'medium',
      trainings: [
        {
          id: '1-1',
          courseTitle: 'Radiotelephonie Aéronautique',
          courseDuration: '40h',
          progress: 85,
          status: 'in_progress',
          startDate: '2025-01-10',
          dueDate: '2025-01-25',
          daysRemaining: 3,
          lastActivity: '2025-01-21',
          category: 'Communication',
          modality: 'online'
        },
        {
          id: '1-2',
          courseTitle: 'Anglais Aviation',
          courseDuration: '60h',
          progress: 45,
          status: 'in_progress',
          startDate: '2025-01-05',
          dueDate: '2025-02-10',
          daysRemaining: 15,
          lastActivity: '2025-01-19',
          category: 'Langue',
          modality: 'blended'
        },
        {
          id: '1-3',
          courseTitle: 'Sûreté Aéroportuaire',
          courseDuration: '20h',
          progress: 100,
          status: 'completed',
          startDate: '2024-12-15',
          dueDate: '2025-01-15',
          daysRemaining: 0,
          lastActivity: '2025-01-14',
          category: 'Sécurité',
          modality: 'in_person'
        }
      ]
    },
    {
      id: '2',
      name: 'Marc Dubois',
      email: 'marc.dubois@company.com',
      avatar: '',
      position: 'Responsable Bagage',
      department: 'Services',
      totalTrainings: 2,
      completedTrainings: 0,
      inProgressTrainings: 2,
      averageProgress: 38,
      complianceScore: 45,
      lastLoginDate: '2025-01-18',
      riskLevel: 'high',
      trainings: [
        {
          id: '2-1',
          courseTitle: 'Renouvellement Sûreté',
          courseDuration: '16h',
          progress: 12,
          status: 'overdue',
          startDate: '2025-01-01',
          dueDate: '2025-01-20',
          daysRemaining: -2,
          lastActivity: '2025-01-15',
          category: 'Sécurité',
          modality: 'online'
        },
        {
          id: '2-2',
          courseTitle: 'Formation Bagage',
          courseDuration: '24h',
          progress: 78,
          status: 'in_progress',
          startDate: '2025-01-08',
          dueDate: '2025-02-05',
          daysRemaining: 10,
          lastActivity: '2025-01-18',
          category: 'Opérations',
          modality: 'blended'
        }
      ]
    },
    {
      id: '3',
      name: 'Julie Rousseau',
      email: 'julie.rousseau@company.com',
      avatar: '',
      position: 'Agent Check-in',
      department: 'Services Passagers',
      totalTrainings: 4,
      completedTrainings: 3,
      inProgressTrainings: 1,
      averageProgress: 92,
      complianceScore: 95,
      lastLoginDate: '2025-01-22',
      riskLevel: 'low',
      trainings: [
        {
          id: '3-1',
          courseTitle: 'Matières Dangereuses',
          courseDuration: '32h',
          progress: 68,
          status: 'in_progress',
          startDate: '2025-01-15',
          dueDate: '2025-02-20',
          daysRemaining: 25,
          lastActivity: '2025-01-22',
          category: 'Réglementation',
          modality: 'online'
        }
      ]
    },
    {
      id: '4',
      name: 'Pierre Laurent',
      email: 'pierre.laurent@company.com',
      avatar: '',
      position: 'Agent de Sûreté',
      department: 'Sécurité',
      totalTrainings: 1,
      completedTrainings: 0,
      inProgressTrainings: 1,
      averageProgress: 25,
      complianceScore: 70,
      lastLoginDate: '2025-01-20',
      riskLevel: 'medium',
      trainings: [
        {
          id: '4-1',
          courseTitle: 'Formation Anglais Aviation',
          courseDuration: '48h',
          progress: 25,
          status: 'in_progress',
          startDate: '2025-01-12',
          dueDate: '2025-02-25',
          daysRemaining: 30,
          lastActivity: '2025-01-20',
          category: 'Langue',
          modality: 'online'
        }
      ]
    },
    {
      id: '5',
      name: 'Amélie Moreau',
      email: 'amelie.moreau@company.com',
      avatar: '',
      position: 'Coordinatrice Fret',
      department: 'Logistique',
      totalTrainings: 2,
      completedTrainings: 1,
      inProgressTrainings: 1,
      averageProgress: 75,
      complianceScore: 88,
      lastLoginDate: '2025-01-21',
      riskLevel: 'low',
      trainings: [
        {
          id: '5-1',
          courseTitle: 'Certification IATA',
          courseDuration: '80h',
          progress: 50,
          status: 'in_progress',
          startDate: '2025-01-08',
          dueDate: '2025-03-10',
          daysRemaining: 40,
          lastActivity: '2025-01-21',
          category: 'Certification',
          modality: 'blended'
        }
      ]
    }
  ];

  // Calculs des KPI globaux
  const totalTrainings = teamProgressData.reduce((sum, member) => sum + member.totalTrainings, 0);
  const totalInProgress = teamProgressData.reduce((sum, member) => sum + member.inProgressTrainings, 0);
  const totalCompleted = teamProgressData.reduce((sum, member) => sum + member.completedTrainings, 0);
  const averageProgress = Math.round(teamProgressData.reduce((sum, member) => sum + member.averageProgress, 0) / teamProgressData.length);
  
  const urgentTrainings = teamProgressData.reduce((sum, member) => {
    return sum + member.trainings.filter(training => 
      training.status === 'overdue' || (training.daysRemaining <= 3 && training.status === 'in_progress')
    ).length;
  }, 0);
  
  const blockedTrainings = teamProgressData.reduce((sum, member) => {
    return sum + member.trainings.filter(training => training.status === 'blocked').length;
  }, 0);

  // Filtres
  const filteredMembers = teamProgressData.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = memberFilter === 'all' || member.id === memberFilter;
    const matchesPriority = priorityFilter === 'all' || member.riskLevel === priorityFilter;
    return matchesSearch && matchesMember && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Terminé</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">En cours</Badge>;
      case 'overdue':
        return <Badge variant="destructive">En retard</Badge>;
      case 'blocked':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Bloqué</Badge>;
      case 'not_started':
        return <Badge variant="outline">Pas commencé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'online':
        return '💻';
      case 'in_person':
        return '🏢';
      case 'blended':
        return '🔄';
      default:
        return '📚';
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="destructive">Risque élevé</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Risque modéré</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Risque faible</Badge>;
      default:
        return <Badge variant="outline">Non évalué</Badge>;
    }
  };

  const handleSendReminder = (memberId: string, trainingId: string) => {
    toast({
      title: "Relance envoyée",
      description: "Un email de rappel a été envoyé au membre de l'équipe.",
    });
  };

  const handleExtendDeadline = (memberId: string, trainingId: string) => {
    toast({
      title: "Échéance prolongée",
      description: "L'échéance de la formation a été prolongée de 7 jours.",
    });
  };

  const handleContactInstructor = (trainingId: string) => {
    toast({
      title: "Formateur contacté",
      description: "Un message a été envoyé au formateur pour assistance.",
    });
  };

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'airport_manager')) {
    return (
      <ManagerLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground">
            Cette page est réservée aux managers et gestionnaires d'aéroport.
          </p>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Suivi Progression</h1>
            <p className="text-gray-600">
              Suivez l'avancement des formations de votre équipe en temps réel
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter Rapport
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Configurer Alertes
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Formations en cours</p>
                  <p className="text-2xl font-bold text-blue-600">{totalInProgress}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progression moyenne</p>
                  <p className="text-2xl font-bold text-green-600">{averageProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">À risque d'échéance</p>
                  <p className="text-2xl font-bold text-red-600">{urgentTrainings}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                                  <div>
                    <p className="text-sm text-gray-600">Bloquées</p>
                    <p className="text-2xl font-bold text-orange-600">{blockedTrainings}</p>
                  </div>
                <Pause className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Terminées</p>
                  <p className="text-2xl font-bold text-purple-600">{totalCompleted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total équipe</p>
                  <p className="text-2xl font-bold text-gray-600">{teamProgressData.length}</p>
                </div>
                <Users className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={memberFilter} onValueChange={setMemberFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Tous les membres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les membres</SelectItem>
                  {teamProgressData.map(member => (
                    <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Niveau de risque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les niveaux</SelectItem>
                  <SelectItem value="high">Risque élevé</SelectItem>
                  <SelectItem value="medium">Risque modéré</SelectItem>
                  <SelectItem value="low">Risque faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Vue détaillée par membre */}
        <div className="space-y-4">
          {filteredMembers.map(member => (
            <Card key={member.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>
                        {member.position} • {member.department}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {member.totalTrainings} formation(s)
                        </Badge>
                        {getRiskBadge(member.riskLevel)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{member.averageProgress}%</div>
                    <div className="text-sm text-gray-600">Progression moyenne</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Dernière connexion: {new Date(member.lastLoginDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {member.trainings.map(training => (
                    <div key={training.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{training.courseTitle}</h4>
                            <span className="text-sm">{getModalityIcon(training.modality)}</span>
                            <Badge variant="outline" className="text-xs">{training.category}</Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            Durée: {training.courseDuration} • 
                            Échéance: {new Date(training.dueDate).toLocaleDateString('fr-FR')} •
                            {training.daysRemaining > 0 ? (
                              <span className="text-green-600"> {training.daysRemaining} jours restants</span>
                            ) : training.daysRemaining === 0 ? (
                              <span className="text-orange-600"> Échéance aujourd'hui</span>
                            ) : (
                              <span className="text-red-600"> {Math.abs(training.daysRemaining)} jours de retard</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(training.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">Progression</span>
                            <span className="text-sm font-medium">{training.progress}%</span>
                          </div>
                          <Progress value={training.progress} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Dernière activité: {new Date(training.lastActivity).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex gap-2">
                          {training.status === 'in_progress' && training.daysRemaining <= 7 && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSendReminder(member.id, training.id)}
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Relancer
                            </Button>
                          )}
                          {training.status === 'overdue' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleExtendDeadline(member.id, training.id)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Prolonger
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactInstructor(training.id)}
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Formateur
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            LMS
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
                      ))}
          </div>

          {filteredMembers.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun résultat</h3>
                <p className="text-gray-600">
                  Aucun membre ne correspond aux critères de recherche sélectionnés.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </ManagerLayout>
    );
};

export default TrainingProgress; 