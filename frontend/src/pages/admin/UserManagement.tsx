
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import UsersList from '@/components/dashboard/admin/users/UsersList';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

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

  return (
    <AdminLayout title="Gestion des Utilisateurs" description="Gérer tous les utilisateurs de la plateforme">
      <UsersList 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        roleFilter={roleFilter} 
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </AdminLayout>
  );
};

export default UserManagement;
