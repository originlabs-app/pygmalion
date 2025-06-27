
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import StatusCard from '@/components/dashboard/StatusCard';
import AdminDashboardHeader from '@/components/dashboard/admin/AdminDashboardHeader';
import PendingApprovalsSection from '@/components/dashboard/admin/PendingApprovalsSection';
import RecentCoursesSection from '@/components/dashboard/admin/RecentCoursesSection';
import PlatformActivitySection from '@/components/dashboard/admin/PlatformActivitySection';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart2, LineChart, PieChart } from 'lucide-react';

const AdminDashboard = () => {
  // 1. Appeler tous les hooks en premier
  const { currentUser } = useAuth();
  
  // 2. Effectuer la vérification et le retour anticipé
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            This area is restricted to platform administrators.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Mock data for demo - in a real app, this would come from API calls
  const pendingOrgs = [
    { id: '1', name: 'Sky Training Group', contactName: 'Jean Dubois', email: 'jean@skytraining.com', type: 'training-org', date: '2025-05-10' },
    { id: '2', name: 'AirTech Maintenance', contactName: 'Marie Martin', email: 'marie@airtech.com', type: 'training-org', date: '2025-05-11' },
    { id: '3', name: 'Global Airways', contactName: 'Pierre Lefèvre', email: 'pierre@globalairways.com', type: 'manager', date: '2025-05-12' }
  ];
  
  const recentCourses = [
    { id: '1', title: 'Aviation Security Awareness', provider: 'Sky Training Group', status: 'published', date: '2025-05-09' },
    { id: '2', title: 'Ground Operations Safety', provider: 'AirTech Maintenance', status: 'pending', date: '2025-05-11' },
    { id: '3', title: 'Cabin Crew Emergency Procedures', provider: 'Aviation Excellence Institute', status: 'published', date: '2025-05-08' },
  ];

  // Updated the type values to use strict literals that match ActivityItem type
  const platformActivities = [
    {
      id: '1',
      title: 'New Training Organization Registered',
      description: 'AirTech Maintenance has registered as a training provider.',
      timeAgo: '2 hours ago',
      type: 'success' as const
    },
    {
      id: '2',
      title: 'Course Published',
      description: '"Ground Operations Safety" has been approved and published.',
      timeAgo: '5 hours ago',
      type: 'info' as const
    },
    {
      id: '3',
      title: 'Certificate Tokenization',
      description: '32 new certificates have been tokenized and added to the blockchain.',
      timeAgo: 'Yesterday',
      type: 'warning' as const
    },
    {
      id: '4',
      title: 'New Airport Manager',
      description: 'Lyon Airport has registered as an airport manager.',
      timeAgo: '2 days ago',
      type: 'special' as const
    }
  ];
  
  return (
    <AdminLayout title="Tableau de Bord" description="Vue d'ensemble de la plateforme">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatusCard
          title="Utilisateurs Actifs"
          value="245"
          trend={{ value: 12, isPositive: true }}
        />
        <StatusCard
          title="Formations Publiées"
          value="178"
          trend={{ value: 5, isPositive: true }}
        />
        <StatusCard
          title="Inscriptions Totales"
          value="1,245"
          trend={{ value: 8, isPositive: true }}
        />
        <StatusCard
          title="Approbations en Attente"
          value="7"
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:bg-muted/50 transition-colors">
          <Link to="/admin/users" className="block p-6">
            <CardHeader className="p-0 space-y-0 pb-2">
              <CardTitle className="text-lg">Gestion Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm">
                Gérer tous les comptes utilisateurs
              </p>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors">
          <Link to="/admin/organizations-approvals" className="block p-6">
            <CardHeader className="p-0 space-y-0 pb-2">
              <CardTitle className="text-lg">Validation Organismes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm">
                Valider les demandes d'organismes de formation
              </p>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors">
          <Link to="/admin/courses" className="block p-6">
            <CardHeader className="p-0 space-y-0 pb-2">
              <CardTitle className="text-lg">Catalogue & Catégories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm">
                Gérer les formations et taxonomies
              </p>
            </CardContent>
          </Link>
        </Card>
        
        <Card className="hover:bg-muted/50 transition-colors">
          <Link to="/admin/enrollments" className="block p-6">
            <CardHeader className="p-0 space-y-0 pb-2">
              <CardTitle className="text-lg">Inscriptions & LMS</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-muted-foreground text-sm">
                Suivre les inscriptions et synchronisations
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
      
      {/* Main Content */}
      <div className="space-y-8">
        {/* Pending Approvals */}
        <PendingApprovalsSection pendingOrgs={pendingOrgs} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <RecentCoursesSection recentCourses={recentCourses} />
          
          {/* Platform Activity */}
          <PlatformActivitySection activities={platformActivities} />
        </div>
        
        {/* Simple Analytics Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                <span>Inscriptions Mensuelles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Graphique d'inscriptions</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Distribution des Formations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Graphique de répartition</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                <span>Taux de Complétion</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Graphique de complétion</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
