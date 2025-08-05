/**
 * Dashboard Entreprise Manager
 * 
 * Niveau hiérarchique : MANAGER (équipe/service)
 * - Gestion d'une équipe spécifique (ex: Air France - Service Handling)
 * - Budget alloué par superviseur
 * - Assignation formations à son équipe
 * - Suivi conformité niveau équipe
 * - Remontée rapports vers N+1 (Superviseur)
 * 
 * Différent du Dashboard Superviseur (niveau entreprise)
 */
import React from 'react';
import { Link } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardKPIs } from '@/hooks/useDashboardKPIs';
import {
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  AlertTriangle,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Target,
  Award,
  BookOpen,
  Shield,
  ArrowRight,
  Activity,
  Zap,
  BarChart3,
  Plus,
  Download,
  Bell,
  Star,
  MapPin,
  Building,
  Plane
} from 'lucide-react';

const ManagerDashboard = () => {
  const { currentUser } = useAuth();
  const { data: dashboardData, loading } = useDashboardKPIs('manager');

  // Utiliser les données dynamiques ou les valeurs par défaut
  const data = dashboardData || {
    kpis: {
      activeTrainings: { value: 24, change: +12, trend: 'up' },
      upcomingTrainings: { value: 8, change: +3, trend: 'up' },
      expiredCertifications: { value: 3, change: -2, trend: 'down' },
      budgetUsed: { value: 68, total: 100, amount: 34500 },
      teamCompliance: { value: 94, change: +2, trend: 'up' },
      criticalAlerts: { value: 7, change: -1, trend: 'down' }
    },
    team: {
      totalMembers: 12,
      activeMembers: 11,
      onlineNow: 8,
      complianceScore: 94
    },
    recentActivity: [
      {
        id: 1,
        type: 'training_completed',
        user: 'Sarah Martin',
        action: 'a terminé la formation',
        item: 'Sûreté Aéroportuaire',
        time: '2 min',
        status: 'success'
      },
      {
        id: 2,
        type: 'assignment',
        user: 'Manager',
        action: 'a assigné',
        item: 'Formation Matières Dangereuses',
        target: 'à 5 membres',
        time: '15 min',
        status: 'info'
      },
      {
        id: 3,
        type: 'alert',
        user: 'Système',
        action: 'alerte expiration',
        item: 'Certification RT - Marc Dubois',
        time: '1h',
        status: 'warning'
      },
      {
        id: 4,
        type: 'request',
        user: 'Julie Rousseau',
        action: 'demande inscription',
        item: 'Formation Radiotelephonie',
        time: '2h',
        status: 'pending'
      }
    ],
    upcomingDeadlines: [
      {
        id: 1,
        title: 'Renouvellement Sûreté',
        employee: 'Marc Dubois',
        date: '2025-01-08',
        daysLeft: 17,
        criticality: 'high',
        type: 'certification'
      },
      {
        id: 2,
        title: 'Formation Matières Dangereuses',
        employee: 'Sarah Martin',
        date: '2025-01-15',
        daysLeft: 24,
        criticality: 'medium',
        type: 'training'
      },
      {
        id: 3,
        title: 'Mise à jour Permis T',
        employee: 'Pierre Laurent',
        date: '2025-01-22',
        daysLeft: 31,
        criticality: 'low',
        type: 'certification'
      }
    ],
    topTrainings: [
      {
        id: 1,
        title: 'Sûreté Aéroportuaire',
        enrollments: 8,
        completion: 87,
        category: 'Sécurité'
      },
      {
        id: 2,
        title: 'Matières Dangereuses ADR',
        enrollments: 5,
        completion: 92,
        category: 'Réglementation'
      },
      {
        id: 3,
        title: 'Permis de Conduire Piste',
        enrollments: 3,
        completion: 75,
        category: 'Conduite'
      }
    ]
  };

  if (loading) {
    return (
      <ManagerLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Chargement des données...</div>
        </div>
      </ManagerLayout>
    );
  }

  const KPICard = ({ title, value, unit, change, trend, icon: Icon, color, action }) => (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {value}{unit}
              </h3>
              {change && (
                <Badge 
                  variant={trend === 'up' ? 'default' : trend === 'down' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(change)}
                </Badge>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
        {action && (
          <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto text-blue-600 hover:text-blue-700" asChild>
            <Link to={action.href}>
              {action.label}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Bonjour Manager {currentUser?.firstName} ! 👋
              </h2>
              <p className="text-blue-100 mb-4">
                Dashboard Entreprise Manager - Gérez votre équipe et suivez la conformité en temps réel.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Air France - Service Handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Aéroport CDG Terminal 2E</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/manager/assign-training">
                  <Target className="h-4 w-4 mr-2" />
                  Assigner Formation
                </Link>
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/manager/reports">
                  <Download className="h-4 w-4 mr-2" />
                  Générer Rapport
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <KPICard
            title="Formations Actives"
            value={data.kpis.activeTrainings.value}
            unit=""
            change={data.kpis.activeTrainings.change}
            trend={data.kpis.activeTrainings.trend}
            icon={GraduationCap}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            action={{ label: "Voir détails", href: "/manager/training" }}
          />
          <KPICard
            title="À Venir"
            value={data.kpis.upcomingTrainings.value}
            unit=""
            change={data.kpis.upcomingTrainings.change}
            trend={data.kpis.upcomingTrainings.trend}
            icon={Calendar}
            color="bg-gradient-to-br from-green-500 to-green-600"
            action={{ label: "Planning", href: "/manager/compliance/calendar" }}
          />
          <KPICard
            title="Certif. Expirées"
            value={data.kpis.expiredCertifications.value}
            unit=""
            change={data.kpis.expiredCertifications.change}
            trend={data.kpis.expiredCertifications.trend}
            icon={AlertTriangle}
            color="bg-gradient-to-br from-red-500 to-red-600"
            action={{ label: "Traiter", href: "/manager/compliance/alerts" }}
          />
          <KPICard
            title="Budget Utilisé"
            value={data.kpis.budgetUsed.value}
            unit="%"
            change={null}
            trend="stable"
            icon={DollarSign}
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            action={{ label: "Budget", href: "/manager/budget" }}
          />
          <KPICard
            title="Conformité Équipe"
            value={data.kpis.teamCompliance.value}
            unit="%"
            change={data.kpis.teamCompliance.change}
            trend={data.kpis.teamCompliance.trend}
            icon={Shield}
            color="bg-gradient-to-br from-emerald-500 to-emerald-600"
            action={{ label: "Détails", href: "/manager/compliance" }}
          />
          <KPICard
            title="Alertes Critiques"
            value={data.kpis.criticalAlerts.value}
            unit=""
            change={data.kpis.criticalAlerts.change}
            trend={data.kpis.criticalAlerts.trend}
            icon={Bell}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            action={{ label: "Voir tout", href: "/manager/compliance/alerts" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Team Overview */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Aperçu Équipe
                </CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/manager/team">
                    Voir tout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{data.team.totalMembers}</div>
                    <div className="text-sm text-gray-600">Total Équipe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{data.team.activeMembers}</div>
                    <div className="text-sm text-gray-600">Actifs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{data.team.onlineNow}</div>
                    <div className="text-sm text-gray-600">En ligne</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{data.team.complianceScore}%</div>
                    <div className="text-sm text-gray-600">Conformité</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Conformité globale équipe</span>
                    <span className="font-medium">{data.team.complianceScore}%</span>
                  </div>
                  <Progress value={data.team.complianceScore} className="h-2" />
                  
                  <div className="flex gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Conforme (9)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Attention (2)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Critique (1)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activité Récente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Activité Récente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'pending' ? 'bg-blue-500' : 'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium text-blue-600">{activity.item}</span>
                          {activity.target && <span className="text-gray-600"> {activity.target}</span>}
                        </div>
                        <div className="text-xs text-gray-500">Il y a {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            
            {/* Échéances Urgentes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Échéances Urgentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className={`p-3 rounded-lg border-l-4 ${
                      deadline.criticality === 'high' ? 'border-red-500 bg-red-50' :
                      deadline.criticality === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{deadline.title}</span>
                        <Badge variant={
                          deadline.criticality === 'high' ? 'destructive' :
                          deadline.criticality === 'medium' ? 'secondary' : 'default'
                        } className="text-xs">
                          {deadline.daysLeft}j
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">{deadline.employee}</div>
                      <div className="text-xs text-gray-500">{deadline.date}</div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/manager/compliance/calendar">
                    Voir échéancier complet
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Top Formations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Formations Populaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topTrainings.map((training) => (
                    <div key={training.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{training.title}</div>
                          <div className="text-xs text-gray-500">{training.category}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {training.enrollments} inscrits
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={training.completion} className="h-1 flex-1" />
                        <span className="text-xs text-gray-600">{training.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions Rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/manager/assign-training">
                    <Target className="h-4 w-4 mr-2" />
                    Assigner Formation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/team/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter Membre
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/pending-requests">
                    <Clock className="h-4 w-4 mr-2" />
                    Valider Demandes
                    <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">5</Badge>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/reports">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Générer Rapport
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
