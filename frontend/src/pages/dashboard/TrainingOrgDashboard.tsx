import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatusCard from '@/components/dashboard/StatusCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { VerificationStatus } from '@/types/verification';
import { trainingOrgService, TrainingOrganization } from '@/services/trainingOrgService';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import PendingApprovalView from '@/components/dashboard/training-org/PendingApprovalView';
import ManageCoursesSection from '@/components/dashboard/training-org/ManageCoursesSection';
import ManageSessionsSection from '@/components/dashboard/training-org/ManageSessionsSection';
import OverviewTab from '@/components/dashboard/training-org/OverviewTab';
import StudentsTab from '@/components/dashboard/training-org/StudentsTab';
import ProfileTab from '@/components/dashboard/training-org/ProfileTab';
import SalesTab from './training-org/SalesTab';

const TrainingOrgDashboard = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const { enrollments } = useEnrollments();
  const [activeTab, setActiveTab] = useState("overview");
  const [orgProfile, setOrgProfile] = useState<TrainingOrganization | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  useEffect(() => {
    const loadOrgProfile = async () => {
      try {
        setLoadingProfile(true);
        const profile = await trainingOrgService.getMyProfile();
        setOrgProfile(profile);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
        // Profil non trouvé = organisme pas encore créé
        setOrgProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (currentUser?.role === 'training_org') {
      loadOrgProfile();
    }
  }, [currentUser]);
  
  // Récupérer le statut de validation réel
  const verificationStatus = orgProfile?.status || 'pending';
  const isVerified = verificationStatus === 'verified';
  
  // Filter courses by the current organization
  const orgCourses = currentUser ? courses.filter(course => course.providerId === currentUser.id) : [];
  
  // Filter enrollments for this organization's courses
  const orgCourseIds = orgCourses.map(course => course.id);
  const orgEnrollments = enrollments.filter(enrollment => orgCourseIds.includes(enrollment.courseId));
  
  // Calculate earnings (simplified for demo)
  const totalEnrollments = orgEnrollments.length;
  const totalEarnings = orgEnrollments.reduce((sum, enrollment) => {
    const course = orgCourses.find(c => c.id === enrollment.courseId);
    const session = course?.sessions.find(s => s.id === enrollment.sessionId);
    return sum + (session?.price || 0);
  }, 0);
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };
  
  // Calculate published vs draft courses
  const publishedCourses = orgCourses.filter(c => c.status === 'published').length;
  const draftCourses = orgCourses.filter(c => c.status === 'draft').length;
  const archivedCourses = orgCourses.filter(c => c.status === 'archived').length;
  
  // Course status data for pie chart
  const courseStatusData = [
    { name: 'Publiées', value: publishedCourses, color: '#8b5cf6' },
    { name: 'Brouillons', value: draftCourses, color: '#94a3b8' },
    { name: 'Archivées', value: archivedCourses, color: '#475569' },
  ];
  
  // Enrollments by course data for bar chart
  const enrollmentsByCourseName = useMemo(() => {
    const data: Record<string, number> = {};
    
    orgEnrollments.forEach(enrollment => {
      const course = orgCourses.find(c => c.id === enrollment.courseId);
      if (course) {
        if (data[course.title]) {
          data[course.title]++;
        } else {
          data[course.title] = 1;
        }
      }
    });
    
    return Object.entries(data).map(([name, count]) => ({
      name: name.length > 20 ? name.substring(0, 20) + '...' : name,
      inscriptions: count,
    }));
  }, [orgEnrollments, orgCourses]);
  
  // Course types data
  const courseTypesCount = useMemo(() => {
    const types = {
      'in-person': { name: 'Présentiel', count: 0, color: '#22c55e' },
      'online': { name: 'E-learning', count: 0, color: '#3b82f6' },
      'virtual': { name: 'Virtuel', count: 0, color: '#f59e0b' },
      'blended': { name: 'Mixte', count: 0, color: '#8b5cf6' },
    };
    
    orgCourses.forEach(course => {
      if (types[course.type]) {
        types[course.type].count++;
      }
    });
    
    return Object.values(types);
  }, [orgCourses]);
  
  // Calculate growth trend (mock data for demo)
  const enrollmentGrowth = 12; // 12% growth
  
  // Vérification d'authentification APRÈS tous les hooks
  if (!currentUser || currentUser.role !== 'training_org') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter en tant qu'organisme de formation pour accéder à ce tableau de bord.
          </p>
          <Button asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Si le profil se charge encore
  if (loadingProfile) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement de votre profil...</p>
        </div>
      </Layout>
    );
  }

  // Si pas de profil d'organisme créé
  if (!orgProfile) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Profil d'organisme requis</h1>
          <p className="text-muted-foreground mb-6">
            Vous devez d'abord créer votre profil d'organisme de formation.
          </p>
          <Button asChild>
            <Link to="/training-org/profile-setup">Créer mon profil</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Fonctions pour l'affichage du statut
  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            <Clock className="h-3 w-3 mr-1" />
            En attente de validation
          </Badge>
        );
      case 'verified':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Organisme vérifié
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Validation rejetée
          </Badge>
        );
      default:
        return null;
    }
  };

  const getValidationAlert = () => {
    if (verificationStatus === 'pending') {
      return (
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Validation en cours :</strong> Votre organisme est en cours de validation par notre équipe. 
            Vous ne pouvez pas encore publier de formations. Cette étape prend généralement 24-48h.
          </AlertDescription>
        </Alert>
      );
    } else if (verificationStatus === 'rejected') {
      return (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Validation rejetée :</strong> Votre demande a été rejetée. 
            {orgProfile?.rejectionReason && ` Motif : ${orgProfile.rejectionReason}`}
            Veuillez corriger les informations et soumettre à nouveau votre profil.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">Tableau de Bord Organisme de Formation</h1>
              {getStatusBadge()}
            </div>
            <p className="text-muted-foreground">
              Bienvenue, {orgProfile?.name || 'Organisme de Formation'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            {isVerified ? (
              <Button asChild>
                <Link to="/courses/create">Créer une nouvelle formation</Link>
              </Button>
            ) : (
              <Button disabled className="opacity-50 cursor-not-allowed">
                Créer une nouvelle formation
                <span className="text-xs ml-2">(Validation requise)</span>
              </Button>
            )}
          </div>
        </div>

        {/* Alerte de validation */}
        {getValidationAlert()}
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Formations publiées"
            value={String(orgCourses.filter(c => c.status === 'published').length)}
            trend={{ value: 0, isPositive: true }}
          />
          <StatusCard
            title="Inscriptions totales"
            value={String(totalEnrollments)}
            trend={{ value: enrollmentGrowth, isPositive: true }}
          />
          <StatusCard
            title="Revenu total"
            value={formatPrice(totalEarnings)}
            trend={{ value: enrollmentGrowth, isPositive: true }}
          />
        </div>
        
        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="courses">Formations</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="students">Apprenants</TabsTrigger>
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <OverviewTab 
              enrollmentsByCourseName={enrollmentsByCourseName}
              courseStatusData={courseStatusData}
              courseTypesCount={courseTypesCount}
              orgEnrollments={orgEnrollments}
              totalEarnings={totalEarnings}
              enrollmentGrowth={enrollmentGrowth}
            />
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses">
            <ManageCoursesSection courses={orgCourses} isVerified={isVerified} />
          </TabsContent>
          
          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <ManageSessionsSection courses={orgCourses} />
          </TabsContent>
          
          {/* Students Tab */}
          <TabsContent value="students">
            <StudentsTab enrollments={orgEnrollments} />
          </TabsContent>
          
          {/* Sales Tab - Nouveau */}
          <TabsContent value="sales">
            <SalesTab 
              enrollments={orgEnrollments} 
              courses={orgCourses}
              totalEarnings={totalEarnings}
              enrollmentGrowth={enrollmentGrowth}
            />
          </TabsContent>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileTab verificationStatus={verificationStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TrainingOrgDashboard;
