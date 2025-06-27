
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EnrollmentsTable from '@/components/dashboard/EnrollmentsTable';
import LearningProgressChart from '@/components/dashboard/LearningProgressChart';
import CertificateComplianceTable from '@/components/dashboard/CertificateComplianceTable';
import ResourcesQuickAccess from '@/components/dashboard/ResourcesQuickAccess';
import RenewalCertificatesSection from '@/components/dashboard/RenewalCertificatesSection';
import { Enrollment, Course, Certificate } from '@/types';

interface StudentDashboardTabsProps {
  allEnrollments: Enrollment[];
  activeEnrollments: Enrollment[];
  upcomingEnrollments: Enrollment[];
  completedEnrollments: Enrollment[];
  certificates: Certificate[];
  nextRenewalCertificates: Certificate[];
  getCourse: (id: string) => Course | undefined;
}

const StudentDashboardTabs: React.FC<StudentDashboardTabsProps> = ({
  allEnrollments,
  activeEnrollments,
  upcomingEnrollments,
  completedEnrollments,
  certificates,
  nextRenewalCertificates,
  getCourse
}) => {
  return (
    <>
      <Tabs defaultValue="enrollments" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="enrollments">Mes Inscriptions</TabsTrigger>
          <TabsTrigger value="inprogress">En Cours</TabsTrigger>
          <TabsTrigger value="upcoming">À Venir</TabsTrigger>
          <TabsTrigger value="completed">Complétées</TabsTrigger>
          <TabsTrigger value="certificates">Mes Certificats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollments">
          <div className="mb-8">
            <DashboardCard 
              title="Toutes mes formations" 
              description="Vue d'ensemble de vos inscriptions"
            >
              <EnrollmentsTable enrollments={allEnrollments} />
            </DashboardCard>
          </div>
        </TabsContent>

        <TabsContent value="inprogress">
          <div className="mb-8">
            <DashboardCard 
              title="Formations En Cours" 
              description="Vos formations actives actuellement"
            >
              {activeEnrollments.length > 0 ? (
                <EnrollmentsTable enrollments={activeEnrollments} />
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Vous n'avez pas de formation en cours actuellement.
                </p>
              )}
            </DashboardCard>

            {activeEnrollments.length > 0 && (
              <div className="mt-8">
                <DashboardCard 
                  title="Progrès d'apprentissage" 
                  description="Suivi de votre progression dans les formations actives"
                >
                  <LearningProgressChart enrollments={activeEnrollments} />
                </DashboardCard>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="mb-8">
            <DashboardCard 
              title="Formations à Venir" 
              description="Vos formations planifiées"
            >
              {upcomingEnrollments.length > 0 ? (
                <EnrollmentsTable enrollments={upcomingEnrollments} />
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Vous n'avez pas de formation planifiée actuellement.
                </p>
              )}
            </DashboardCard>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="mb-8">
            <DashboardCard 
              title="Formations Complétées" 
              description="Votre historique de formations"
            >
              {completedEnrollments.length > 0 ? (
                <EnrollmentsTable enrollments={completedEnrollments} />
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Vous n'avez pas encore complété de formations.
                </p>
              )}
            </DashboardCard>
          </div>
        </TabsContent>
        
        <TabsContent value="certificates">
          <div className="mb-8">
            <DashboardCard 
              title="Certificats et Attestations" 
              description="Vos certifications obtenues"
              action={
                <Button variant="outline" asChild size="sm">
                  <Link to="/certificates">
                    <Award className="h-4 w-4 mr-2" />
                    Tous mes certificats
                  </Link>
                </Button>
              }
            >
              <CertificateComplianceTable certificates={certificates} />
            </DashboardCard>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resources Quick Access */}
        <div>
          <DashboardCard 
            title="Accès Rapide" 
            description="Ressources pour vos formations en cours"
          >
            <ResourcesQuickAccess 
              activeEnrollments={activeEnrollments}
              getCourse={getCourse}
            />
          </DashboardCard>
        </div>
        
        {/* Certifications & Renouvellements */}
        <div>
          <RenewalCertificatesSection
            nextRenewalCertificates={nextRenewalCertificates}
          />
        </div>
      </div>
    </>
  );
};

export default StudentDashboardTabs;
