import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Building, User, Shield, Bell, Settings } from 'lucide-react';
import SecuritySection from '@/components/profile/SecuritySection';
import { getDashboardRoute } from '@/utils/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AuthService } from '@/services/authService';

const profileSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  organization: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { currentUser, refreshUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("profile");
  const [savingProfile, setSavingProfile] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      organization: currentUser?.organization || '',
    },
  });

  // Lire l'onglet depuis l'URL au chargement
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['profile', 'security', 'preferences', 'account'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Synchroniser le formulaire avec les données utilisateur
  useEffect(() => {
    if (currentUser) {
      profileForm.reset({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        organization: currentUser.organization || '',
      });
    }
  }, [currentUser, profileForm.reset]);

  if (!currentUser) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter pour accéder à votre profil.
          </p>
          <Button asChild>
            <Link to="/login">Connexion</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const dashboardRoute = getDashboardRoute(currentUser.role);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" className="mb-4" asChild>
              <Link to={dashboardRoute}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour au tableau de bord
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Mon profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et paramètres de sécurité
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Préférences
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Compte
            </TabsTrigger>
          </TabsList>

          {/* Onglet Profil */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <form onSubmit={profileForm.handleSubmit(async (data) => {
                    setSavingProfile(true);
                    try {
                      // Mise à jour prénom/nom/organisation
                      await AuthService.updateProfile({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        organization: data.organization,
                      });

                      toast.success('Profil mis à jour');
                      await refreshUser();
                    } catch (err: any) {
                      toast.error(err.message || 'Erreur lors de la mise à jour');
                    } finally {
                      setSavingProfile(false);
                    }
                  })}>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>Mettez à jour vos informations de contact</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" {...profileForm.register('firstName')} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" {...profileForm.register('lastName')} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={currentUser.email} disabled className="bg-muted" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization">Organisation (si applicable)</Label>
                        <Input id="organization" {...profileForm.register('organization')} placeholder="Non affilié" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit" disabled={savingProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer les changements
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>

              <div>
                {!currentUser.organization && currentUser.role === 'student' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Affiliation Entreprise</CardTitle>
                      <CardDescription>
                        Associez votre compte à votre employeur
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        En vous affiliant à une entreprise, vous permettrez à votre manager de suivre vos formations et certifications.
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="companySearch">Rechercher une entreprise</Label>
                        <Input 
                          id="companySearch" 
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        <Building className="h-4 w-4 mr-2" />
                        Rechercher et demander une affiliation
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Onglet Sécurité */}
          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>

          {/* Onglet Préférences */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Gérez vos préférences de notification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les préférences de notification seront disponibles prochainement.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Compte */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
                <CardDescription>Détails de votre compte et statut</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Type de compte</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.role === 'student' ? 'Apprenant' : 
                       currentUser.role === 'training_org' ? 'Organisme de Formation' : 
                       currentUser.role === 'manager' ? 'Manager' : 
                       currentUser.role === 'airport_manager' ? 'Gestionnaire Aéroport' : 'Administrateur'}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium">Date d'inscription</p>
                    <p className="text-sm text-muted-foreground">15 Mai 2025</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="font-medium">Statut du compte</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser.verified ? 'Vérifié' : 'En attente de vérification'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserProfile;
