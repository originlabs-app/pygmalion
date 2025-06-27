import React from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { useCourses } from '@/contexts/CourseContext';
import StudentDashboardTabs from '@/components/dashboard/StudentDashboardTabs';
import { getCertificateStatus } from '@/utils/certificateUtils';
import { generateCertificatesFromEnrollments } from '@/components/dashboard/utils/certificateHelpers';
import {
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Shield,
  Star,
  Trophy,
  Target,
  Search,
  Download,
  User,
  AlertTriangle,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

const StudentDashboard = () => {
  // 1. Appeler tous les hooks en premier
  const { currentUser } = useAuth();
  const { getStudentEnrollments } = useEnrollments();
  const { getCourse } = useCourses();
  
  // 2. Effectuer la vérification et le retour anticipé
  if (!currentUser) {
    return (
      <StudentLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter pour accéder à votre tableau de bord.
          </p>
          <Button asChild>
            <Link to="/login">Connexion</Link>
          </Button>
        </div>
      </StudentLayout>
    );
  }
  
  // Pour la démo, simuler des données si pas d'enrollments réels
  const realEnrollments = getStudentEnrollments(currentUser?.id || '');
  
  // Si pas de données réelles, créer des données de démo
  const hasDemoData = realEnrollments.length === 0;
  
  // Compter les formations par statut (avec données de démo si nécessaire)
  const activeCount = hasDemoData ? 2 : realEnrollments.filter(e => e.status === 'approved').length;
  const upcomingCount = hasDemoData ? 1 : realEnrollments.filter(e => e.status === 'pending').length;
  const completedCount = hasDemoData ? 3 : realEnrollments.filter(e => e.status === 'completed').length;
  
  // Données pour affichage
  const demoActiveFormations = [
    {
      id: 'demo-1',
      title: 'Sûreté Aéroportuaire - Module Certification',
      provider: 'AeroSecure Training',
      progress: 65,
      endDate: '2024-02-15'
    },
    {
      id: 'demo-2',
      title: 'Maintenance Aéronefs Part 66 - Module Avionique', 
      provider: 'TechAero Academy',
      progress: 45,
      endDate: '2024-03-01'
    }
  ];

  const demoCertificates = [
    {
      id: 'cert-1',
      title: 'Agent de Piste IATA',
      issuer: 'Ground Handling Academy',
      issueDate: '2024-01-15'
    },
    {
      id: 'cert-2', 
      title: 'Soudage Aéronautique EN 4179',
      issuer: 'AeroWeld Training Center',
      issueDate: '2023-11-20'
    },
    {
      id: 'cert-3',
      title: 'Management Aviation Safety',
      issuer: 'Aviation Safety Institute', 
      issueDate: '2023-09-10'
    }
  ];

  // Utiliser les vraies données ou les démo
  const activeEnrollments = hasDemoData ? [] : realEnrollments.filter(e => e.status === 'approved');
  const upcomingEnrollments = hasDemoData ? [] : realEnrollments.filter(e => e.status === 'pending'); 
  const completedEnrollments = hasDemoData ? [] : realEnrollments.filter(e => e.status === 'completed');
  const enrollments = realEnrollments;

  // Generate sample certificates for demo - in production this would come from an API
  const certificates = hasDemoData ? [] : generateCertificatesFromEnrollments(
    completedEnrollments,
    currentUser.id,
    getCourse
  );
  
  const nextRenewalCertificates = certificates
    .filter(cert => getCertificateStatus(cert.expiryDate) === 'expiring')
    .slice(0, 3);
  
  // Pour démonstration, on suppose que l'utilisateur n'est pas vérifié par défaut
  // En production, cette information viendrait du profil utilisateur
  const isVerified = currentUser.verified || false;

  // Calculs pour KPIs 
  const totalProgress = hasDemoData ? 
    Math.round(demoActiveFormations.reduce((sum, f) => sum + f.progress, 0) / demoActiveFormations.length) :
    Math.round(
      activeEnrollments.reduce((sum, enrollment) => {
        return sum + (enrollment.progress?.percentage || 0);
      }, 0) / Math.max(activeEnrollments.length, 1)
    );

  const nextDeadline = (hasDemoData ? activeCount : activeEnrollments.length) > 0 ? 5 : 0; // Prochaine échéance en jours
  
  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* Section Welcome avec gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Bonjour {currentUser.firstName} ! 🎓
              </h2>
              <p className="text-blue-100 mb-4">
                Vous avez {hasDemoData ? activeCount : activeEnrollments.length} formation(s) en cours. Continuez sur votre lancée !
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Profil {isVerified ? 'Vérifié' : 'Non vérifié'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Progression +15% ce mois</span>
                </div>
              </div>
            </div>
          {!isVerified && (
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/verification/kyc">
                  <Shield className="h-4 w-4 mr-2" />
                  Vérifier mon profil
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* KPI Cards - 4 colonnes responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Formations Actives</p>
                  <p className="text-3xl font-bold text-blue-600">{hasDemoData ? activeCount : activeEnrollments.length}</p>
                  <p className="text-xs text-gray-500 mt-1">En cours d'apprentissage</p>
                </div>
                <BookOpen className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Progression Moyenne</p>
                  <p className="text-3xl font-bold text-green-600">{totalProgress}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${totalProgress}%` }}></div>
                  </div>
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certificats Obtenus</p>
                  <p className="text-3xl font-bold text-purple-600">{hasDemoData ? completedCount : certificates.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Validés dans votre CV</p>
                </div>
                <Award className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Prochaine Échéance</p>
                  <p className="text-3xl font-bold text-orange-600">{nextDeadline || '--'}j</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {nextDeadline ? 'Formation à terminer' : 'Aucune échéance'}
                  </p>
                </div>
                <Clock className="h-10 w-10 text-orange-500" />
            </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de Progression Globale */}
        {(hasDemoData ? activeCount : activeEnrollments.length) > 0 && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Progression Globale</h3>
                <span className="text-2xl font-bold text-green-600">{totalProgress}%</span>
              </div>
              <Progress value={totalProgress} className="h-3 mb-2" />
              <p className="text-sm text-gray-600">
                {hasDemoData ? completedCount : completedEnrollments.length} formations complétées sur {hasDemoData ? (activeCount + upcomingCount + completedCount) : enrollments.length} • Continue comme ça !
              </p>
            </CardContent>
          </Card>
        )}

        {/* Alerte KYC si non vérifié */}
        {!isVerified && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-orange-900">Vérification d'identité requise</h4>
                  <p className="text-sm text-orange-700">
                    Complétez votre vérification pour accéder à toutes les fonctionnalités.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-orange-300" asChild>
                  <Link to="/verification/kyc">
                    Vérifier maintenant
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2">
        <StudentDashboardTabs 
          allEnrollments={enrollments}
          activeEnrollments={activeEnrollments}
          upcomingEnrollments={upcomingEnrollments}
          completedEnrollments={completedEnrollments}
          certificates={certificates}
          nextRenewalCertificates={nextRenewalCertificates}
          getCourse={getCourse}
        />
      </div>
          
          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            
            {/* Prochaines échéances */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  Prochaines Échéances
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(hasDemoData ? activeCount : activeEnrollments.length) > 0 ? (
                  <div className="space-y-3">
                    {hasDemoData ? (
                      // Affichage des données de démo
                      demoActiveFormations.map((formation) => (
                        <div key={formation.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <PlayCircle className="h-5 w-5 text-orange-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{formation.title}</p>
                            <p className="text-xs text-gray-500">
                              Fin: {new Date(formation.endDate).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-orange-600">{formation.progress}%</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Affichage des données réelles
                      activeEnrollments.slice(0, 3).map((enrollment) => {
                        const course = getCourse(enrollment.courseId);
                        const session = course?.sessions.find(s => s.id === enrollment.sessionId);
                        return (
                          <div key={enrollment.id} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                            <PlayCircle className="h-5 w-5 text-orange-600" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{course?.title}</p>
                              <p className="text-xs text-gray-500">
                                {session ? new Date(session.endDate).toLocaleDateString('fr-FR') : 'Date non définie'}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Aucune formation en cours
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Mes Réussites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Mes Réussites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">Premier Certificat</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium">{hasDemoData ? completedCount : completedEnrollments.length} Formations</p>
                  </div>
                  {(hasDemoData ? completedCount : completedEnrollments.length) >= 5 && (
                    <div className="text-center p-3 bg-purple-50 rounded-lg col-span-2">
                      <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">Expert - 5+ Formations</p>
                    </div>
                  )}
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
                  <Link to="/student/formations/active">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Voir Formations Actives
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/student/formations/upcoming">
                    <Clock className="h-4 w-4 mr-2" />
                    Formations À Venir
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/student/formations/completed">
                    <Award className="h-4 w-4 mr-2" />
                    Mes Certificats
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/courses">
                    <Search className="h-4 w-4 mr-2" />
                    Découvrir Plus
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
