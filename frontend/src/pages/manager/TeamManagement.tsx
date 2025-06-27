import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  BookOpen,
  Shield,
  Target,
  Activity,
  TrendingUp,
  User,
  Building,
  Briefcase
} from 'lucide-react';

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on_leave';
  complianceScore: number;
  activeTrainings: number;
  expiredCertifications: number;
  nextDeadline?: {
    title: string;
    date: string;
    daysLeft: number;
    criticality: 'high' | 'medium' | 'low';
  };
  certifications: Array<{
    name: string;
    status: 'valid' | 'expiring' | 'expired';
    expiryDate: string;
  }>;
  recentActivity: Array<{
    type: string;
    description: string;
    date: string;
  }>;
}

const TeamManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Données hardcodées pour la démo
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Martin',
      email: 'sarah.martin@airfrance.fr',
      phone: '+33 1 23 45 67 89',
      position: 'Agent de Piste Senior',
      department: 'Handling',
      joinDate: '2019-03-15',
      status: 'active',
      complianceScore: 98,
      activeTrainings: 2,
      expiredCertifications: 0,
      nextDeadline: {
        title: 'Renouvellement Sûreté',
        date: '2025-03-15',
        daysLeft: 85,
        criticality: 'low'
      },
      certifications: [
        { name: 'Sûreté Aéroportuaire', status: 'valid', expiryDate: '2025-03-15' },
        { name: 'Permis de Conduire Piste', status: 'valid', expiryDate: '2025-06-20' },
        { name: 'Matières Dangereuses', status: 'valid', expiryDate: '2025-08-10' }
      ],
      recentActivity: [
        { type: 'completion', description: 'Formation Sûreté Aéroportuaire terminée', date: '2024-12-15' },
        { type: 'enrollment', description: 'Inscrit à Formation Radiotelephonie', date: '2024-12-10' }
      ]
    },
    {
      id: '2',
      firstName: 'Marc',
      lastName: 'Dubois',
      email: 'marc.dubois@airfrance.fr',
      phone: '+33 1 23 45 67 90',
      position: 'Coordinateur Handling',
      department: 'Handling',
      joinDate: '2017-09-20',
      status: 'active',
      complianceScore: 85,
      activeTrainings: 1,
      expiredCertifications: 1,
      nextDeadline: {
        title: 'Renouvellement RT',
        date: '2025-01-08',
        daysLeft: 17,
        criticality: 'high'
      },
      certifications: [
        { name: 'Radiotelephonie', status: 'expiring', expiryDate: '2025-01-08' },
        { name: 'Permis de Conduire Piste', status: 'valid', expiryDate: '2025-04-12' },
        { name: 'Formation Bagage', status: 'expired', expiryDate: '2024-11-30' }
      ],
      recentActivity: [
        { type: 'alert', description: 'Alerte expiration RT', date: '2024-12-20' },
        { type: 'assignment', description: 'Assigné Formation Bagage', date: '2024-12-18' }
      ]
    },
    {
      id: '3',
      firstName: 'Julie',
      lastName: 'Rousseau',
      email: 'julie.rousseau@airfrance.fr',
      phone: '+33 1 23 45 67 91',
      position: 'Agent de Piste',
      department: 'Handling',
      joinDate: '2021-01-10',
      status: 'active',
      complianceScore: 92,
      activeTrainings: 3,
      expiredCertifications: 0,
      nextDeadline: {
        title: 'Formation Matières Dangereuses',
        date: '2025-01-15',
        daysLeft: 24,
        criticality: 'medium'
      },
      certifications: [
        { name: 'Sûreté Aéroportuaire', status: 'valid', expiryDate: '2025-02-20' },
        { name: 'Permis de Conduire Piste', status: 'valid', expiryDate: '2026-01-10' }
      ],
      recentActivity: [
        { type: 'request', description: 'Demande Formation Radiotelephonie', date: '2024-12-19' },
        { type: 'completion', description: 'Formation Sûreté terminée', date: '2024-11-28' }
      ]
    },
    {
      id: '4',
      firstName: 'Pierre',
      lastName: 'Laurent',
      email: 'pierre.laurent@airfrance.fr',
      phone: '+33 1 23 45 67 92',
      position: 'Responsable Bagage',
      department: 'Bagage',
      joinDate: '2018-05-03',
      status: 'active',
      complianceScore: 95,
      activeTrainings: 1,
      expiredCertifications: 0,
      nextDeadline: {
        title: 'Mise à jour Permis T',
        date: '2025-01-22',
        daysLeft: 31,
        criticality: 'low'
      },
      certifications: [
        { name: 'Permis de Conduire Piste', status: 'valid', expiryDate: '2025-01-22' },
        { name: 'Formation Bagage', status: 'valid', expiryDate: '2025-07-15' },
        { name: 'Sûreté Aéroportuaire', status: 'valid', expiryDate: '2025-05-10' }
      ],
      recentActivity: [
        { type: 'completion', description: 'Formation Bagage Avancée terminée', date: '2024-12-12' }
      ]
    },
    {
      id: '5',
      firstName: 'Amélie',
      lastName: 'Moreau',
      email: 'amelie.moreau@airfrance.fr',
      phone: '+33 1 23 45 67 93',
      position: 'Agent de Sûreté',
      department: 'Sûreté',
      joinDate: '2020-11-15',
      status: 'on_leave',
      complianceScore: 88,
      activeTrainings: 0,
      expiredCertifications: 0,
      certifications: [
        { name: 'Sûreté Aéroportuaire', status: 'valid', expiryDate: '2025-11-15' },
        { name: 'Contrôle Sécurité', status: 'valid', expiryDate: '2025-08-20' }
      ],
      recentActivity: [
        { type: 'leave', description: 'Congé maternité débuté', date: '2024-12-01' }
      ]
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = `${member.firstName} ${member.lastName} ${member.email} ${member.position}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(teamMembers.map(m => m.department))];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactif</Badge>;
      case 'on_leave':
        return <Badge variant="outline" className="border-orange-200 text-orange-700">Congé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const MemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.avatar} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {member.firstName[0]}{member.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
              {getStatusBadge(member.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Département</div>
                <div className="text-sm font-medium">{member.department}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Depuis</div>
                <div className="text-sm font-medium">{new Date(member.joinDate).toLocaleDateString('fr-FR')}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className={`text-sm font-medium ${getComplianceColor(member.complianceScore)}`}>
                  {member.complianceScore}% Conforme
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {member.activeTrainings} formations
                </span>
              </div>
              {member.expiredCertifications > 0 && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">
                    {member.expiredCertifications} expirée(s)
                  </span>
                </div>
              )}
            </div>
            
            {member.nextDeadline && (
              <div className={`p-2 rounded-lg text-xs ${
                member.nextDeadline.criticality === 'high' ? 'bg-red-50 text-red-700' :
                member.nextDeadline.criticality === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                'bg-blue-50 text-blue-700'
              }`}>
                <div className="flex items-center justify-between">
                  <span>Prochaine échéance : {member.nextDeadline.title}</span>
                  <span className="font-medium">{member.nextDeadline.daysLeft} jours</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/manager/team/${member.id}`}>
                <User className="h-4 w-4 mr-2" />
                Voir
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/manager/assign-training?member=${member.id}`}>
                <Target className="h-4 w-4 mr-2" />
                Assigner
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion d'Équipe Manager</h1>
            <p className="text-gray-600 mt-1">
              Gérez votre équipe de {teamMembers.length} membres et suivez leur conformité (niveau Manager)
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/manager/team/import">
                <Upload className="h-4 w-4 mr-2" />
                Import Excel
              </Link>
            </Button>
            <Button asChild>
              <Link to="/manager/team/add">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Membre
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{teamMembers.length}</div>
                  <div className="text-sm text-gray-600">Total Équipe</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </div>
                  <div className="text-sm text-gray-600">Actifs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round(teamMembers.reduce((acc, m) => acc + m.complianceScore, 0) / teamMembers.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Conformité Moy.</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {teamMembers.reduce((acc, m) => acc + m.expiredCertifications, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Certif. Expirées</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un membre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="on_leave">En congé</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun membre trouvé</h3>
              <p className="text-gray-600 mb-6">
                Modifiez vos critères de recherche pour voir plus de résultats.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setDepartmentFilter('all');
              }}>
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ManagerLayout>
  );
};

export default TeamManagement; 