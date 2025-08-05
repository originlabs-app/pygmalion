import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatusCard from '@/components/dashboard/StatusCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AlertsOverview from '@/components/dashboard/AlertsOverview';
import ComplianceStats from '@/components/dashboard/ComplianceStats';
import CertificationsTable from '@/components/dashboard/CertificationsTable';
import { useToast } from '@/hooks/use-toast';
import { ChartBarBig, BellDot } from 'lucide-react';

const AirportManagerDashboard = () => {
  // 1. Appeler tous les hooks en premier
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  // 2. Effectuer la vérification et le retour anticipé
  if (!currentUser || currentUser.role !== 'airport_manager') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            Please log in as an airport manager to view this dashboard.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Mock data for demo
  const complianceData = [
    { category: 'Security Training', compliant: 92, expiring: 5, expired: 3 },
    { category: 'Safety Management', compliant: 88, expiring: 7, expired: 5 },
    { category: 'Dangerous Goods', compliant: 95, expiring: 3, expired: 2 },
    { category: 'Airport Regulations', compliant: 90, expiring: 8, expired: 2 }
  ];
  
  const companyData = [
    { name: 'AirExpress Services', compliance: 95, employees: 42, status: 'compliant' },
    { name: 'GroundForce Handling', compliance: 87, employees: 76, status: 'warning' },
    { name: 'Security Solutions Inc.', compliance: 98, employees: 34, status: 'compliant' },
    { name: 'SkyFuel Services', compliance: 79, employees: 28, status: 'non-compliant' },
    { name: 'Altitude Catering', compliance: 92, employees: 65, status: 'compliant' }
  ];

  // Données pour le graphique
  const chartData = complianceData.map(item => ({
    name: item.category,
    compliant: item.compliant / 100,
    expiring: item.expiring / 100,
    expired: item.expired / 100
  }));

  // Données pour les alertes - Fixed type property to use specific values
  const alertsData = [
    {
      id: '1',
      title: 'Certifications expirées',
      description: '8 employés avec des certifications de sécurité expirées',
      count: 8,
      type: 'critical' as const, // Fixed: Using type assertion to ensure it's one of the allowed values
      action: 'Voir détails'
    },
    {
      id: '2',
      title: 'Formations à venir',
      description: '3 sessions de formation prévues cette semaine',
      count: 3,
      type: 'info' as const, // Fixed: Using type assertion
      action: 'Planifier'
    },
    {
      id: '3',
      title: 'Certifications expirantes',
      description: '21 certifications expirent dans les 30 prochains jours',
      count: 21,
      type: 'warning' as const, // Fixed: Using type assertion
      action: 'Notifier'
    }
  ];

  // Données pour les certifications expirantes - Fixed status property to use specific values
  const certificationData = [
    { id: '1', employee: 'Jean Dupont', company: 'AirExpress Services', type: 'Sûreté aéroportuaire', expiryDate: '2025-05-30', daysLeft: 13, status: 'warning' as const }, // Fixed: Using type assertion
    { id: '2', employee: 'Marie Martin', company: 'GroundForce Handling', type: 'Marchandises dangereuses', expiryDate: '2025-05-18', daysLeft: 1, status: 'critical' as const }, // Fixed: Using type assertion
    { id: '3', employee: 'Robert Johnson', company: 'SkyFuel Services', type: 'Sécurité piste', expiryDate: '2025-05-15', daysLeft: -2, status: 'critical' as const }, // Fixed: Using type assertion
    { id: '4', employee: 'Sophie Garcia', company: 'Altitude Catering', type: 'HACCP', expiryDate: '2025-06-10', daysLeft: 24, status: 'warning' as const }, // Fixed: Using type assertion
    { id: '5', employee: 'Thomas Wilson', company: 'Security Solutions Inc.', type: 'Contrôle d\'accès', expiryDate: '2025-05-12', daysLeft: -5, status: 'critical' as const }, // Fixed: Using type assertion
  ];

  const handleNotifyCertification = (certification: unknown) => {
    toast({
      title: "Notification envoyée",
      description: `Une notification a été envoyée à ${certification.employee} concernant sa certification ${certification.type} qui expire prochainement.`,
    });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Airport Manager Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser.firstName} {currentUser.lastName} ({currentUser.organization})
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/export-report">Export Compliance Report</Link>
            </Button>
            <Button asChild>
              <Link to="/manage-companies">Manage Site Companies</Link>
            </Button>
          </div>
        </div>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Overall Compliance"
            value="89%"
            trend={{ value: 2, isPositive: true }}
            icon={<ChartBarBig className="h-5 w-5" />}
          />
          <StatusCard
            title="Onsite Companies"
            value="32"
          />
          <StatusCard
            title="Expiring Certifications"
            value="54"
            trend={{ value: 12, isPositive: false }}
          />
          <StatusCard
            title="Non-Compliant Personnel"
            value="23"
            trend={{ value: 5, isPositive: false }}
            icon={<BellDot className="h-5 w-5" />}
          />
        </div>

        {/* Data Visualization and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <ComplianceStats chartData={chartData} />
          <AlertsOverview alerts={alertsData} />
        </div>
        
        {/* Certifications expirantes */}
        <div className="mb-8">
          <DashboardCard 
            title="Certifications expirantes" 
            description="Personnel avec des certifications nécessitant une attention"
          >
            <CertificationsTable 
              certifications={certificationData} 
              onNotify={handleNotifyCertification}
            />
          </DashboardCard>
        </div>
        
        {/* Compliance Overview */}
        <div className="mb-8">
          <DashboardCard 
            title="Training Compliance Overview" 
            description="Status of mandatory training across all personnel"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Training Category</TableHead>
                    <TableHead>Compliant</TableHead>
                    <TableHead>Expiring (30 days)</TableHead>
                    <TableHead>Expired</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceData.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-full mr-4">
                            <Progress value={category.compliant} className="h-2" />
                          </div>
                          <div className="text-sm font-medium">{category.compliant}%</div>
                        </div>
                      </TableCell>
                      <TableCell>{category.expiring}</TableCell>
                      <TableCell>{category.expired}</TableCell>
                      <TableCell>
                        <Badge variant={
                          category.compliant >= 90 ? 'success' : 
                          category.compliant >= 80 ? 'secondary' : 
                          'destructive'
                        }>
                          {category.compliant >= 90 ? 'Good' : 
                           category.compliant >= 80 ? 'Warning' : 
                           'Critical'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DashboardCard>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Companies Overview */}
          <div className="lg:col-span-2">
            <DashboardCard 
              title="Onsite Companies" 
              description="Training compliance by company"
            >
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companyData.map((company, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.employees}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full mr-4">
                              <Progress value={company.compliance} className="h-2" />
                            </div>
                            <div className="text-sm font-medium">{company.compliance}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            company.status === 'compliant' ? 'success' : 
                            company.status === 'warning' ? 'secondary' : 
                            'destructive'
                          }>
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </DashboardCard>
          </div>
          
          {/* Upcoming Trainings */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Trainings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-4">
                    <div className="font-medium mb-1">Airport Security Refresher</div>
                    <p className="text-sm text-muted-foreground mb-1">May 25-26, 2025</p>
                    <p className="text-xs">42 personnel scheduled</p>
                  </div>
                  <div className="p-4">
                    <div className="font-medium mb-1">Safety Management Workshop</div>
                    <p className="text-sm text-muted-foreground mb-1">June 3-4, 2025</p>
                    <p className="text-xs">28 personnel scheduled</p>
                  </div>
                  <div className="p-4">
                    <div className="font-medium mb-1">Dangerous Goods Handling</div>
                    <p className="text-sm text-muted-foreground mb-1">June 10-11, 2025</p>
                    <p className="text-xs">36 personnel scheduled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AirportManagerDashboard;
