import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertTriangle, 
  Clock, 
  Calendar,
  FileText,
  Bell,
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  X,
  Mail,
  Phone,
  MessageSquare,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: string;
  type: 'expired' | 'expiring' | 'missing' | 'overdue' | 'renewal';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  employee: {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  certification: {
    name: string;
    category: string;
    authority: string;
  };
  dates: {
    issued?: string;
    expires?: string;
    daysUntilExpiry?: number;
    daysOverdue?: number;
  };
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: string;
  lastUpdated: string;
}

const ComplianceAlerts = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('active');

  // Données mockées pour les alertes
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'expired',
      severity: 'critical',
      title: 'Certification Sûreté Aéroportuaire Expirée',
      description: 'La certification de sûreté aéroportuaire de Marc Dubois a expiré il y a 15 jours. Action immédiate requise.',
      employee: {
        id: 'emp_001',
        name: 'Marc Dubois',
        position: 'Agent de Piste',
        email: 'marc.dubois@company.com',
        phone: '+33 1 23 45 67 89'
      },
      certification: {
        name: 'Sûreté Aéroportuaire',
        category: 'Sécurité',
        authority: 'DGAC'
      },
      dates: {
        issued: '2022-12-01',
        expires: '2025-01-07',
        daysOverdue: 15
      },
      status: 'active',
      createdAt: '2025-01-08',
      lastUpdated: '2025-01-22'
    },
    {
      id: '2',
      type: 'expiring',
      severity: 'high',
      title: 'Expiration Imminente - Matières Dangereuses',
      description: 'La certification Matières Dangereuses de Sarah Martin expire dans 5 jours.',
      employee: {
        id: 'emp_002',
        name: 'Sarah Martin',
        position: 'Responsable Fret',
        email: 'sarah.martin@company.com',
        phone: '+33 1 23 45 67 90'
      },
      certification: {
        name: 'Transport Matières Dangereuses ADR',
        category: 'Réglementation',
        authority: 'IATA'
      },
      dates: {
        issued: '2023-01-28',
        expires: '2025-01-28',
        daysUntilExpiry: 5
      },
      status: 'active',
      createdAt: '2025-01-18',
      lastUpdated: '2025-01-22'
    },
    {
      id: '3',
      type: 'expiring',
      severity: 'medium',
      title: 'Renouvellement Radiotelephonie à Prévoir',
      description: 'La certification radiotelephonie de Julie Rousseau expire dans 14 jours.',
      employee: {
        id: 'emp_003',
        name: 'Julie Rousseau',
        position: 'Agent Check-in',
        email: 'julie.rousseau@company.com',
        phone: '+33 1 23 45 67 91'
      },
      certification: {
        name: 'Certificat Radiotelephonie',
        category: 'Communication',
        authority: 'DGAC'
      },
      dates: {
        issued: '2022-02-05',
        expires: '2025-02-05',
        daysUntilExpiry: 14
      },
      status: 'acknowledged',
      createdAt: '2025-01-08',
      lastUpdated: '2025-01-22'
    },
    {
      id: '4',
      type: 'missing',
      severity: 'high',
      title: 'Certification Conduite Piste Manquante',
      description: 'Pierre Laurent ne possède pas la certification requise pour conduire sur piste.',
      employee: {
        id: 'emp_004',
        name: 'Pierre Laurent',
        position: 'Agent de Sûreté',
        email: 'pierre.laurent@company.com',
        phone: '+33 1 23 45 67 92'
      },
      certification: {
        name: 'Permis de Conduire Piste',
        category: 'Conduite',
        authority: 'Aéroport CDG'
      },
      dates: {},
      status: 'active',
      createdAt: '2025-01-15',
      lastUpdated: '2025-01-22'
    },
    {
      id: '5',
      type: 'renewal',
      severity: 'medium',
      title: 'Renouvellement Premiers Secours Requis',
      description: 'Amélie Moreau doit renouveler sa formation Premiers Secours dans les 30 jours.',
      employee: {
        id: 'emp_005',
        name: 'Amélie Moreau',
        position: 'Coordinatrice Fret',
        email: 'amelie.moreau@company.com',
        phone: '+33 1 23 45 67 93'
      },
      certification: {
        name: 'Formation Premiers Secours',
        category: 'Sécurité',
        authority: 'INRS'
      },
      dates: {
        issued: '2023-02-22',
        expires: '2025-02-22',
        daysUntilExpiry: 30
      },
      status: 'active',
      createdAt: '2025-01-22',
      lastUpdated: '2025-01-22'
    },
    {
      id: '6',
      type: 'overdue',
      severity: 'critical',
      title: 'Formation de Recyclage en Retard',
      description: 'Thomas Wilson n\'a pas effectué sa formation de recyclage obligatoire.',
      employee: {
        id: 'emp_006',
        name: 'Thomas Wilson',
        position: 'Agent Bagage',
        email: 'thomas.wilson@company.com',
        phone: '+33 1 23 45 67 94'
      },
      certification: {
        name: 'Recyclage Sûreté Annuel',
        category: 'Sécurité',
        authority: 'DGAC'
      },
      dates: {
        daysOverdue: 22
      },
      status: 'active',
      createdAt: '2025-01-01',
      lastUpdated: '2025-01-22'
    },
    {
      id: '7',
      type: 'expiring',
      severity: 'low',
      title: 'Certification Qualité à Renouveler',
      description: 'La certification qualité de Sophie Lefèvre expire dans 45 jours.',
      employee: {
        id: 'emp_007',
        name: 'Sophie Lefèvre',
        position: 'Responsable Qualité',
        email: 'sophie.lefevre@company.com',
        phone: '+33 1 23 45 67 95'
      },
      certification: {
        name: 'ISO 9001 Lead Auditor',
        category: 'Qualité',
        authority: 'AFNOR'
      },
      dates: {
        issued: '2022-03-08',
        expires: '2025-03-08',
        daysUntilExpiry: 45
      },
      status: 'active',
      createdAt: '2025-01-22',
      lastUpdated: '2025-01-22'
    }
  ];

  // Filtres
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.certification.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      case 'overdue': return 'text-red-600 bg-red-50 border-red-200';
      case 'expiring': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'missing': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'renewal': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'expired': return 'Expiré';
      case 'expiring': return 'Expire bientôt';
      case 'missing': return 'Manquant';
      case 'overdue': return 'En retard';
      case 'renewal': return 'Renouvellement';
      default: return type;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    toast({
      title: "Alerte acquittée",
      description: "L'alerte a été marquée comme prise en compte.",
    });
  };

  const handleResolve = (alertId: string) => {
    toast({
      title: "Alerte résolue",
      description: "L'alerte a été marquée comme résolue.",
    });
  };

  const handleContactEmployee = (employee: Alert['employee']) => {
    toast({
      title: "Contact initié",
      description: `Un email a été envoyé à ${employee.name}.`,
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
            <h1 className="text-3xl font-bold text-gray-900">Alertes de Conformité</h1>
            <p className="text-gray-600">
              Gestion des alertes critiques et échéances de certification
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter Alertes
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>

        {/* Statistiques des Alertes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Alertes</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredAlerts.length}</p>
                </div>
                <Bell className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Critiques</p>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredAlerts.filter(a => a.severity === 'critical').length}
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
                  <p className="text-sm text-gray-600">Expirations 7j</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {filteredAlerts.filter(a => a.dates.daysUntilExpiry && a.dates.daysUntilExpiry <= 7).length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Résolues</p>
                  <p className="text-2xl font-bold text-green-600">
                    {alerts.filter(a => a.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
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
                  placeholder="Rechercher par nom d'employé ou certification..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Type d'alerte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="expiring">Expire bientôt</SelectItem>
                  <SelectItem value="missing">Manquant</SelectItem>
                  <SelectItem value="overdue">En retard</SelectItem>
                  <SelectItem value="renewal">Renouvellement</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sévérité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes sévérités</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actives</SelectItem>
                  <SelectItem value="acknowledged">Acquittées</SelectItem>
                  <SelectItem value="resolved">Résolues</SelectItem>
                  <SelectItem value="all">Tous statuts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des Alertes */}
        <Card>
          <CardHeader>
            <CardTitle>Alertes Actives ({filteredAlerts.length})</CardTitle>
            <CardDescription>
              Cliquez sur une alerte pour voir les détails et actions disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Sévérité</TableHead>
                    <TableHead>Employé</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Échéance/Statut</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Badge className={getTypeColor(alert.type)}>
                          {getTypeLabel(alert.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity === 'critical' && 'Critique'}
                          {alert.severity === 'high' && 'Élevée'}
                          {alert.severity === 'medium' && 'Moyenne'}
                          {alert.severity === 'low' && 'Faible'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.employee.name}</div>
                          <div className="text-sm text-gray-500">{alert.employee.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{alert.certification.name}</div>
                          <div className="text-xs text-gray-500">{alert.certification.authority}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {alert.dates.daysOverdue && (
                          <div className="text-red-600 font-medium">
                            Expiré depuis {alert.dates.daysOverdue} jours
                          </div>
                        )}
                        {alert.dates.daysUntilExpiry && (
                          <div className={alert.dates.daysUntilExpiry <= 7 ? 'text-orange-600 font-medium' : 'text-blue-600'}>
                            Expire dans {alert.dates.daysUntilExpiry} jours
                          </div>
                        )}
                        {alert.type === 'missing' && (
                          <div className="text-purple-600 font-medium">
                            Certification manquante
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                          {alert.status === 'active' && 'Actif'}
                          {alert.status === 'acknowledged' && 'Acquitté'}
                          {alert.status === 'resolved' && 'Résolu'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactEmployee(alert.employee)}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          {alert.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/manager/assign-training">
                              <Calendar className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredAlerts.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune alerte trouvée</h3>
                <p className="text-gray-600">
                  Aucune alerte ne correspond aux critères sélectionnés.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default ComplianceAlerts; 