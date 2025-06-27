import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  Bell,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificationEvent {
  id: string;
  type: 'expiry' | 'renewal' | 'training' | 'reminder';
  employee: {
    id: string;
    name: string;
    position: string;
  };
  certification: {
    name: string;
    category: string;
    authority: string;
  };
  date: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'upcoming' | 'overdue' | 'completed';
  daysUntilDue: number;
}

const ComplianceCalendar = () => {
  const { currentUser } = useAuth();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'agenda'>('month');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Données mockées pour les événements de certification
  const events: CertificationEvent[] = [
    {
      id: '1',
      type: 'expiry',
      employee: {
        id: 'emp_001',
        name: 'Marc Dubois',
        position: 'Agent de Piste'
      },
      certification: {
        name: 'Sûreté Aéroportuaire',
        category: 'Sécurité',
        authority: 'DGAC'
      },
      date: '2025-01-28',
      priority: 'critical',
      status: 'overdue',
      daysUntilDue: -15
    },
    {
      id: '2',
      type: 'expiry',
      employee: {
        id: 'emp_002',
        name: 'Sarah Martin',
        position: 'Responsable Fret'
      },
      certification: {
        name: 'Matières Dangereuses ADR',
        category: 'Réglementation',
        authority: 'IATA'
      },
      date: '2025-01-28',
      priority: 'high',
      status: 'upcoming',
      daysUntilDue: 5
    },
    {
      id: '3',
      type: 'renewal',
      employee: {
        id: 'emp_003',
        name: 'Julie Rousseau',
        position: 'Agent Check-in'
      },
      certification: {
        name: 'Radiotelephonie',
        category: 'Communication',
        authority: 'DGAC'
      },
      date: '2025-02-05',
      priority: 'medium',
      status: 'upcoming',
      daysUntilDue: 14
    },
    {
      id: '4',
      type: 'training',
      employee: {
        id: 'emp_004',
        name: 'Pierre Laurent',
        position: 'Agent de Sûreté'
      },
      certification: {
        name: 'Conduite Piste',
        category: 'Conduite',
        authority: 'Aéroport CDG'
      },
      date: '2025-02-10',
      priority: 'high',
      status: 'upcoming',
      daysUntilDue: 19
    },
    {
      id: '5',
      type: 'reminder',
      employee: {
        id: 'emp_005',
        name: 'Amélie Moreau',
        position: 'Coordinatrice Fret'
      },
      certification: {
        name: 'Premiers Secours',
        category: 'Sécurité',
        authority: 'INRS'
      },
      date: '2025-02-22',
      priority: 'medium',
      status: 'upcoming',
      daysUntilDue: 31
    },
    {
      id: '6',
      type: 'expiry',
      employee: {
        id: 'emp_006',
        name: 'Thomas Wilson',
        position: 'Agent Bagage'
      },
      certification: {
        name: 'Recyclage Sûreté',
        category: 'Sécurité',
        authority: 'DGAC'
      },
      date: '2025-03-01',
      priority: 'high',
      status: 'upcoming',
      daysUntilDue: 38
    },
    {
      id: '7',
      type: 'expiry',
      employee: {
        id: 'emp_007',
        name: 'Sophie Lefèvre',
        position: 'Responsable Qualité'
      },
      certification: {
        name: 'ISO 9001 Lead Auditor',
        category: 'Qualité',
        authority: 'AFNOR'
      },
      date: '2025-03-08',
      priority: 'low',
      status: 'upcoming',
      daysUntilDue: 45
    }
  ];

  // Filtres
  const filteredEvents = events.filter(event => {
    const matchesCategory = categoryFilter === 'all' || event.certification.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || event.priority === priorityFilter;
    return matchesCategory && matchesPriority;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expiry':
        return <AlertTriangle className="h-4 w-4" />;
      case 'renewal':
        return <Clock className="h-4 w-4" />;
      case 'training':
        return <Users className="h-4 w-4" />;
      case 'reminder':
        return <Bell className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'expiry':
        return 'Expiration';
      case 'renewal':
        return 'Renouvellement';
      case 'training':
        return 'Formation';
      case 'reminder':
        return 'Rappel';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  // Événements groupés par mois
  const eventsByMonth = filteredEvents.reduce((acc, event) => {
    const month = new Date(event.date).toISOString().slice(0, 7);
    if (!acc[month]) acc[month] = [];
    acc[month].push(event);
    return acc;
  }, {} as Record<string, CertificationEvent[]>);

  // Événements des 30 prochains jours
  const upcomingEvents = filteredEvents
    .filter(event => event.daysUntilDue >= 0 && event.daysUntilDue <= 30)
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  // Événements en retard
  const overdueEvents = filteredEvents.filter(event => event.status === 'overdue');

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
            <h1 className="text-3xl font-bold text-gray-900">Échéancier de Conformité</h1>
            <p className="text-gray-600">
              Planning des échéances et renouvellements de certification
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter Planning
            </Button>
            <Button size="sm" asChild>
              <Link to="/manager/assign-training">
                <Plus className="h-4 w-4 mr-2" />
                Planifier Formation
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Échéances 30j</p>
                  <p className="text-2xl font-bold text-orange-600">{upcomingEvents.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En Retard</p>
                  <p className="text-2xl font-bold text-red-600">{overdueEvents.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critiques</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredEvents.filter(e => e.priority === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Événements</p>
                  <p className="text-2xl font-bold text-blue-600">{filteredEvents.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={viewMode} onValueChange={(value: 'month' | 'week' | 'agenda') => setViewMode(value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Mode d'affichage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Vue Mois</SelectItem>
                  <SelectItem value="week">Vue Semaine</SelectItem>
                  <SelectItem value="agenda">Vue Agenda</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Sécurité">Sécurité</SelectItem>
                  <SelectItem value="Réglementation">Réglementation</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Conduite">Conduite</SelectItem>
                  <SelectItem value="Qualité">Qualité</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contenu Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Événements à Venir - 2/3 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Échéances à Venir (30 prochains jours)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 border rounded-lg ${getPriorityColor(event.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(event.type)}
                            <Badge variant="outline">
                              {getTypeLabel(event.type)}
                            </Badge>
                            <Badge className={getPriorityColor(event.priority)}>
                              {event.priority === 'critical' && 'Critique'}
                              {event.priority === 'high' && 'Élevée'}
                              {event.priority === 'medium' && 'Moyenne'}
                              {event.priority === 'low' && 'Faible'}
                            </Badge>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900">{event.certification.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">{event.employee.name} • {event.employee.position}</p>
                          <p className="text-xs text-gray-500">{event.certification.authority}</p>
                          
                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <span className="font-medium">
                              📅 {formatDate(event.date)}
                            </span>
                            <span className={`font-medium ${
                              event.daysUntilDue <= 7 ? 'text-red-600' : 
                              event.daysUntilDue <= 14 ? 'text-orange-600' : 'text-blue-600'
                            }`}>
                              ⏰ Dans {event.daysUntilDue} jours
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/manager/assign-training">
                              <Plus className="h-3 w-3 mr-1" />
                              Planifier
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/manager/compliance/certificates?employee=${event.employee.id}`}>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {upcomingEvents.length === 0 && (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune échéance proche</h3>
                      <p className="text-gray-600">
                        Aucune certification n'expire dans les 30 prochains jours.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            
            {/* Alertes Critiques */}
            {overdueEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Certifications Expirées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {overdueEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <h5 className="font-medium text-red-900">{event.employee.name}</h5>
                        <p className="text-sm text-red-700">{event.certification.name}</p>
                        <p className="text-xs text-red-600 font-medium">
                          Expiré depuis {Math.abs(event.daysUntilDue)} jours
                        </p>
                        <Button size="sm" className="mt-2 w-full" asChild>
                          <Link to="/manager/assign-training">
                            Action Urgente
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Vue Calendrier Mini */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Aperçu Mensuel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(eventsByMonth)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .slice(0, 3)
                    .map(([month, monthEvents]) => (
                      <div key={month} className="p-3 bg-blue-50 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">
                          {new Date(month).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </h5>
                        <div className="text-sm text-blue-700">
                          {monthEvents.length} événement(s)
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {monthEvents.slice(0, 3).map((event) => (
                            <span key={event.id} className="text-xs bg-white px-2 py-1 rounded">
                              {formatShortDate(event.date)}
                            </span>
                          ))}
                          {monthEvents.length > 3 && (
                            <span className="text-xs text-blue-600">+{monthEvents.length - 3}</span>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions Rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/manager/compliance/alerts">
                    <Bell className="h-4 w-4 mr-2" />
                    Voir Alertes ({overdueEvents.length + upcomingEvents.filter(e => e.daysUntilDue <= 7).length})
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/compliance/certificates">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Gérer Certifications
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/assign-training">
                    <Plus className="h-4 w-4 mr-2" />
                    Planifier Formation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter Planning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ComplianceCalendar; 