import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Bell,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComplianceStat {
  category: string;
  compliant: number;
  total: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface Alert {
  id: string;
  type: 'expired' | 'expiring' | 'missing' | 'overdue';
  title: string;
  employee: string;
  certification: string;
  daysOverdue?: number;
  daysUntilExpiry?: number;
  priority: 'high' | 'medium' | 'low';
}

const ComplianceDashboard = () => {
  const { currentUser } = useAuth();

  // Données mockées réalistes pour l'aviation
  const complianceStats: ComplianceStat[] = [
    {
      category: 'Sûreté Aéroportuaire',
      compliant: 11,
      total: 12,
      percentage: 92,
      trend: 'up',
      trendValue: 3,
      status: 'good'
    },
    {
      category: 'Matières Dangereuses',
      compliant: 10,
      total: 12,
      percentage: 83,
      trend: 'down',
      trendValue: 5,
      status: 'warning'
    },
    {
      category: 'Radiotelephonie',
      compliant: 8,
      total: 10,
      percentage: 80,
      trend: 'stable',
      trendValue: 0,
      status: 'warning'
    },
    {
      category: 'Conduite Piste',
      compliant: 6,
      total: 8,
      percentage: 75,
      trend: 'down',
      trendValue: 12,
      status: 'critical'
    },
    {
      category: 'Premiers Secours',
      compliant: 12,
      total: 12,
      percentage: 100,
      trend: 'up',
      trendValue: 8,
      status: 'excellent'
    }
  ];

  const criticalAlerts: Alert[] = [
    {
      id: '1',
      type: 'expired',
      title: 'Certification Expirée',
      employee: 'Marc Dubois',
      certification: 'Sûreté Aéroportuaire',
      daysOverdue: 15,
      priority: 'high'
    },
    {
      id: '2',
      type: 'expiring',
      title: 'Expiration Imminente',
      employee: 'Sarah Martin',
      certification: 'Matières Dangereuses',
      daysUntilExpiry: 5,
      priority: 'high'
    },
    {
      id: '3',
      type: 'expiring',
      title: 'Expiration dans 2 semaines',
      employee: 'Julie Rousseau',
      certification: 'Radiotelephonie',
      daysUntilExpiry: 14,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'missing',
      title: 'Certification Manquante',
      employee: 'Pierre Laurent',
      certification: 'Conduite Piste',
      priority: 'high'
    }
  ];

  const overallCompliance = Math.round(
    complianceStats.reduce((sum, stat) => sum + stat.percentage, 0) / complianceStats.length
  );

  const totalCompliant = complianceStats.reduce((sum, stat) => sum + stat.compliant, 0);
  const totalRequired = complianceStats.reduce((sum, stat) => sum + stat.total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (type: string, priority: string) => {
    if (type === 'expired') return 'border-l-red-500 bg-red-50';
    if (type === 'expiring' && priority === 'high') return 'border-l-orange-500 bg-orange-50';
    if (type === 'missing') return 'border-l-purple-500 bg-purple-50';
    return 'border-l-yellow-500 bg-yellow-50';
  };

  const getTrendIcon = (trend: string, trendValue: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Target className="h-4 w-4 text-gray-600" />;
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
            <h1 className="text-3xl font-bold text-gray-900">Conformité - Tableau de Bord</h1>
            <p className="text-gray-600">
              Vue d'ensemble de la conformité réglementaire de votre équipe
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Rapport Conformité
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/manager/compliance/alerts">
                <Bell className="h-4 w-4 mr-2" />
                Voir Alertes (7)
              </Link>
            </Button>
          </div>
        </div>

        {/* KPI Cards Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conformité Globale</p>
                  <p className="text-3xl font-bold text-blue-600">{overallCompliance}%</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {totalCompliant}/{totalRequired} certifications
                  </p>
                </div>
                <Shield className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Alertes Critiques</p>
                  <p className="text-3xl font-bold text-red-600">7</p>
                  <p className="text-xs text-gray-500 mt-1">À traiter en priorité</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Échéances 30j</p>
                  <p className="text-3xl font-bold text-orange-600">12</p>
                  <p className="text-xs text-gray-500 mt-1">Formations à planifier</p>
                </div>
                <Calendar className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certifications Valides</p>
                  <p className="text-3xl font-bold text-green-600">47</p>
                  <p className="text-xs text-gray-500 mt-1">En cours de validité</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Conformité par Catégorie - 2/3 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Conformité par Catégorie Réglementaire
                </CardTitle>
                <CardDescription>
                  État de conformité détaillé par domaine de certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {complianceStats.map((stat, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium text-gray-900">{stat.category}</h4>
                          <Badge className={getStatusColor(stat.status)}>
                            {stat.status === 'excellent' && 'Excellent'}
                            {stat.status === 'good' && 'Bon'}
                            {stat.status === 'warning' && 'Attention'}
                            {stat.status === 'critical' && 'Critique'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(stat.trend, stat.trendValue)}
                          <span className="text-sm text-gray-600">
                            {stat.trend !== 'stable' && `${stat.trendValue}%`}
                          </span>
                          <span className="font-bold text-lg">{stat.percentage}%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Progress value={stat.percentage} className="h-3" />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{stat.compliant} conformes sur {stat.total} requis</span>
                          <span>{stat.total - stat.compliant} non-conformes</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/manager/compliance/certificates?category=${encodeURIComponent(stat.category)}`}>
                            <FileText className="h-3 w-3 mr-1" />
                            Voir Détails
                          </Link>
                        </Button>
                        {stat.percentage < 100 && (
                          <Button size="sm" asChild>
                            <Link to="/manager/assign-training">
                              <Target className="h-3 w-3 mr-1" />
                              Planifier Formation
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertes Critiques - 1/3 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Alertes Critiques
                </CardTitle>
                <CardDescription>
                  Actions urgentes requises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {criticalAlerts.slice(0, 4).map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 border-l-4 rounded-r-lg ${getAlertColor(alert.type, alert.priority)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{alert.title}</h5>
                          <p className="text-sm text-gray-600">{alert.employee}</p>
                          <p className="text-xs text-gray-500">{alert.certification}</p>
                          {alert.daysOverdue && (
                            <p className="text-xs text-red-600 font-medium">
                              Expiré depuis {alert.daysOverdue} jours
                            </p>
                          )}
                          {alert.daysUntilExpiry && (
                            <p className="text-xs text-orange-600 font-medium">
                              Expire dans {alert.daysUntilExpiry} jours
                            </p>
                          )}
                        </div>
                        <Badge variant={alert.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                          {alert.priority === 'high' ? 'Urgent' : 'Important'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/manager/compliance/alerts">
                      Voir toutes les alertes ({criticalAlerts.length})
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions Rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link to="/manager/compliance/calendar">
                    <Calendar className="h-4 w-4 mr-2" />
                    Voir Échéancier
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/compliance/certificates">
                    <Award className="h-4 w-4 mr-2" />
                    Gérer Certifications
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/manager/assign-training">
                    <Users className="h-4 w-4 mr-2" />
                    Assigner Formation
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter Données
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistiques Règlementaires */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Conformité Réglementaire - Vue d'Ensemble
            </CardTitle>
            <CardDescription>
              Respect des exigences DGAC, IATA et aéroportuaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
                <div className="text-sm text-gray-600">Conformité DGAC</div>
                <div className="text-xs text-gray-500">Réglementation nationale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Standards IATA</div>
                <div className="text-xs text-gray-500">Certification internationale</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">87%</div>
                <div className="text-sm text-gray-600">Exigences Aéroport</div>
                <div className="text-xs text-gray-500">Règlement local CDG</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default ComplianceDashboard; 