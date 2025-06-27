import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  Edit
} from 'lucide-react';

const TeamMemberDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const memberData = {
    id: id,
    firstName: 'Sarah',
    lastName: 'Martin',
    email: 'sarah.martin@airfrance.fr',
    phone: '+33 1 23 45 67 89',
    position: 'Agent de Piste Senior',
    department: 'Handling',
    startDate: '2023-03-15',
    lastLogin: '2025-01-15 09:23',
    status: 'active',
    complianceRate: 85,
    mfaEnabled: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1ae?w=150&h=150&fit=crop&crop=face'
  };

  const trainings = [
    {
      id: 1,
      name: 'Sûreté Aéroportuaire Niveau 2',
      status: 'completed',
      score: 89,
      expiryDate: '2025-12-10'
    },
    {
      id: 2,
      name: 'Matières Dangereuses ADR',
      status: 'in_progress',
      progress: 65
    },
    {
      id: 3,
      name: 'Permis de Conduire Piste',
      status: 'expired',
      expiryDate: '2024-08-15'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Terminée</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expirée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/manager/team">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'équipe
              </Link>
            </Button>
            
            <div className="flex items-center gap-4">
              <img 
                src={memberData.avatar} 
                alt={`${memberData.firstName} ${memberData.lastName}`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {memberData.firstName} {memberData.lastName}
                </h1>
                <p className="text-gray-600">{memberData.position} - {memberData.department}</p>
                <Badge variant="default" className="mt-1">Actif</Badge>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="trainings">Formations</TabsTrigger>
            <TabsTrigger value="activity">Activité</TabsTrigger>
          </TabsList>

          {/* Tab: Vue d'ensemble */}
          <TabsContent value="overview" className="space-y-6">
            
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Conformité</p>
                      <p className="text-2xl font-bold text-green-600">{memberData.complianceRate}%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Formations</p>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Certifications</p>
                      <p className="text-2xl font-bold text-purple-600">2</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Alertes</p>
                      <p className="text-2xl font-bold text-red-600">1</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Informations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{memberData.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{memberData.phone}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{memberData.department}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{memberData.startDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${memberData.mfaEnabled ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-sm">MFA {memberData.mfaEnabled ? 'Activé' : 'Désactivé'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerte */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Alertes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Formation expirée :</strong> Le Permis de Conduire Piste a expiré. Renouvellement requis.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Formations */}
          <TabsContent value="trainings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Formations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainings.map((training) => (
                    <div key={training.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{training.name}</h3>
                        {getStatusBadge(training.status)}
                      </div>
                      
                      {training.status === 'completed' && (
                        <div className="text-sm text-gray-600">
                          Score: {training.score}% - Expire le {training.expiryDate}
                        </div>
                      )}
                      
                      {training.status === 'in_progress' && (
                        <div>
                          <Progress value={training.progress} className="h-2" />
                          <div className="text-sm text-gray-600 mt-1">{training.progress}% terminé</div>
                        </div>
                      )}
                      
                      {training.status === 'expired' && (
                        <div className="text-sm text-red-600">
                          Expirée le {training.expiryDate} - Action requise
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Activité */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm">Connexion à la plateforme</div>
                      <div className="text-xs text-gray-500">15/01/2025 à 09:23</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BookOpen className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-sm">Formation "Matières Dangereuses ADR" - Module 3 terminé</div>
                      <div className="text-xs text-gray-500">14/01/2025 à 16:45</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="text-sm">Certification "Sûreté Aéroportuaire" obtenue (89%)</div>
                      <div className="text-xs text-gray-500">10/12/2024 à 14:20</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ManagerLayout>
  );
};

export default TeamMemberDetail; 