
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import CoursesList from '@/components/dashboard/admin/courses/CoursesList';
import CategoriesList from '@/components/dashboard/admin/courses/CategoriesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CourseManagement = () => {
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

  return (
    <AdminLayout title="Gestion du Catalogue" description="Gérer les formations et catégories">
      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">Formations</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>
        <TabsContent value="courses">
          <CoursesList />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesList />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CourseManagement;
