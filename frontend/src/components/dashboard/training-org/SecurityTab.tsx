import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Settings, BarChart3, AlertTriangle } from 'lucide-react';
import ExamSecurityConfig from './security/ExamSecurityConfig';
import SecurityMonitoring from './security/SecurityMonitoring';
import SecurityReports from './security/SecurityReports';

interface Course {
  id: string;
  title: string;
  status: string;
  type: string;
}

interface SecurityTabProps {
  courses: Course[];
}

const SecurityTab: React.FC<SecurityTabProps> = ({ courses }) => {
  const [activeSecurityTab, setActiveSecurityTab] = useState("config");

  // Calculer les stats de sécurité (mock data pour la démo)
  const securityStats = {
    totalExams: courses.filter(c => c.status === 'published').length * 2, // Approximation
    securedExams: Math.floor(courses.length * 1.5),
    securityIncidents: 12,
    suspiciousAttempts: 5
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Examens totaux</CardTitle>
            <Shield className="h-4 w-4 text-aviation-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityStats.totalExams}</div>
            <p className="text-xs text-muted-foreground">Examens finaux créés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sécurisés</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityStats.securedExams}</div>
            <p className="text-xs text-muted-foreground">Avec anti-fraude activé</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{securityStats.securityIncidents}</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspects</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityStats.suspiciousAttempts}</div>
            <p className="text-xs text-muted-foreground">À réviser</p>
          </CardContent>
        </Card>
      </div>

      {/* Introduction */}
      <Card className="border-aviation-200 bg-aviation-50/30">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-aviation-600" />
            <CardTitle className="text-aviation-900">Système Anti-Fraude Pygmalion</CardTitle>
          </div>
          <CardDescription>
            Configurez et surveillez la sécurité de vos examens finaux. 
            Pygmalion vous fournit les outils technologiques pour détecter et prévenir la fraude lors des évaluations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              🎥 Proctoring Webcam
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              🔒 Verrouillage Navigateur
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              🌐 Restriction IP
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              ⚡ Détection Temps Réel
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Onglets sécurité */}
      <Tabs value={activeSecurityTab} onValueChange={setActiveSecurityTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="config" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuration
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Surveillance
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Rapports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <ExamSecurityConfig courses={courses} />
        </TabsContent>

        <TabsContent value="monitoring">
          <SecurityMonitoring />
        </TabsContent>

        <TabsContent value="reports">
          <SecurityReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityTab;