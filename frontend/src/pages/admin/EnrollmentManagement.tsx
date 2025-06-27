
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import EnrollmentsList from '@/components/dashboard/admin/enrollments/EnrollmentsList';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnrollmentManagement = () => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès Refusé</h1>
          <p className="text-muted-foreground mb-6">
            Cette page est réservée aux administrateurs de la plateforme.
          </p>
        </div>
      </Layout>
    );
  }

  const openStripeDashboard = () => {
    window.open('https://dashboard.stripe.com', '_blank');
  };

  return (
    <AdminLayout 
      title="Inscriptions & Paiements" 
      description="Suivre les inscriptions et transactions"
      action={
        <Button variant="outline" onClick={openStripeDashboard}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Dashboard Stripe
        </Button>
      }
    >
      <EnrollmentsList />
    </AdminLayout>
  );
};

export default EnrollmentManagement;
