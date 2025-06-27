
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import OrganizationsList from '@/components/dashboard/admin/organizations/OrganizationsList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OrganizationManagement = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();

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

  const handleCreateOrganization = () => {
    toast({
      title: "Fonctionnalité en développement",
      description: "La création d'organisation sera disponible prochainement",
    });
  };

  return (
    <AdminLayout 
      title="Gestion des Organisations" 
      description="Gérer les entreprises et aéroports"
      action={
        <Button onClick={handleCreateOrganization}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Organisation
        </Button>
      }
    >
      <OrganizationsList />
    </AdminLayout>
  );
};

export default OrganizationManagement;
