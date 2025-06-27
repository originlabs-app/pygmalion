import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Save, Building, User, Shield, Bell, Settings, Users, Target, DollarSign } from 'lucide-react';
import SecuritySection from '@/components/profile/SecuritySection';
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

const ManagerSettings = () => {
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
    if (tab && ['profile', 'security', 'team', 'notifications', 'integrations'].includes(tab)) {
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

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'airport_manager')) {
    return (
      <ManagerLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Cette page est réservée aux managers et gestionnaires d'aéroport.
          </p>
          <Button asChild>
            <Link to="/manager-dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramètres Manager</h1>
            <p className="text-gray-600">
              Gérez votre profil personnel et les paramètres de votre équipe
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder tout
            </Button>
          </div>
        </div>

        {/* KPI Cards - Vue d'ensemble compte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Type de Compte</p>
                  <p className="text-lg font-bold text-blue-600">
                    {currentUser.role === 'manager' ? 'Manager' : 'Airport Manager'}
                  </p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Organisation</p>
                  <p className="text-lg font-bold text-green-600 truncate">
                    {currentUser.organization || 'Non renseigné'}
                  </p>
                </div>
                <Building className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sécurité MFA</p>
                  <p className="text-lg font-bold text-purple-600">
                    {currentUser.mfaEnabled ? 'Activée' : 'Désactivée'}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Statut Compte</p>
                  <p className="text-lg font-bold text-orange-600">
                    {currentUser.verified ? 'Vérifié' : 'En attente'}
                  </p>
                </div>
                <Settings className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Sécurité
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Équipe
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Intégrations
            </TabsTrigger>
          </TabsList>

          {/* Onglet Profil Personnel */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <form onSubmit={profileForm.handleSubmit(async (data) => {
                    setSavingProfile(true);
                    try {
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
                        <Label htmlFor="organization">Organisation</Label>
                        <Input id="organization" {...profileForm.register('organization')} placeholder="Nom de votre entreprise" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit" disabled={savingProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du compte</CardTitle>
                    <CardDescription>Détails de votre compte manager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Type de compte</p>
                        <p className="text-sm text-muted-foreground">
                          {currentUser.role === 'manager' ? 'Manager d\'Équipe' : 'Gestionnaire Aéroport'}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">Organisation</p>
                        <p className="text-sm text-muted-foreground">
                          {currentUser.organization || 'Non renseigné'}
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <p className="font-medium">Statut du compte</p>
                        <p className="text-sm text-muted-foreground">
                          {currentUser.verified ? 'Vérifié' : 'En attente'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sécurité */}
          <TabsContent value="security">
            <SecuritySection />
          </TabsContent>

          {/* Configuration Équipe */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Politiques d'Équipe
                  </CardTitle>
                  <CardDescription>
                    Définissez les règles pour votre équipe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Approbation automatique</Label>
                      <p className="text-xs text-gray-500">Formations sous 500€</p>
                    </div>
                    <Switch id="autoApprove" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budgetLimit">Budget par employé (€)</Label>
                    <Input id="budgetLimit" type="number" placeholder="2000" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Alertes de conformité</Label>
                      <p className="text-xs text-gray-500">Alerter 30 jours avant expiration</p>
                    </div>
                    <Switch id="complianceAlert" defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Objectifs d'Équipe
                  </CardTitle>
                  <CardDescription>
                    Définissez les objectifs de formation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="complianceTarget">Taux de conformité cible (%)</Label>
                    <Input id="complianceTarget" type="number" placeholder="95" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="trainingHours">Heures de formation par an</Label>
                    <Input id="trainingHours" type="number" placeholder="40" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budgetUtilization">Utilisation budget cible (%)</Label>
                    <Input id="budgetUtilization" type="number" placeholder="85" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Target className="h-4 w-4 mr-2" />
                    Définir les objectifs
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Préférences de Notification
                </CardTitle>
                <CardDescription>
                  Configurez comment vous souhaitez être notifié des événements importants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Notifications de Conformité</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Certifications expirées</p>
                        <p className="text-xs text-gray-500">Alertes pour les certifications expirées</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Échéances à 30 jours</p>
                        <p className="text-xs text-gray-500">Rappels avant expiration</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-medium">Notifications Budgétaires</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Seuil d'alerte à 80%</p>
                        <p className="text-xs text-gray-500">Quand 80% du budget est utilisé</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Demandes d'approbation</p>
                        <p className="text-xs text-gray-500">Nouvelles demandes de formation</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <h4 className="font-medium">Rapports Automatiques</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Rapport mensuel</p>
                        <p className="text-xs text-gray-500">Bilan mensuel d'activité</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Rapport trimestriel</p>
                        <p className="text-xs text-gray-500">Analyse trimestrielle des performances</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Bell className="h-4 w-4 mr-2" />
                  Sauvegarder les préférences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Intégrations */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intégrations Disponibles</CardTitle>
                  <CardDescription>
                    Connectez vos outils de travail avec PYGMALION
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Teams</p>
                        <p className="text-xs text-gray-500">Notifications dans Teams</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connecter</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Bell className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Slack</p>
                        <p className="text-xs text-gray-500">Alertes dans Slack</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connecter</Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Système Comptable</p>
                        <p className="text-xs text-gray-500">Export automatique des factures</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configurer</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API & Webhooks</CardTitle>
                  <CardDescription>
                    Configuration avancée pour les développeurs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Clé API</Label>
                    <div className="flex gap-2">
                      <Input id="apiKey" value="pk_test_***************" disabled />
                      <Button variant="outline" size="sm">Régénérer</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">URL Webhook</Label>
                    <Input id="webhookUrl" placeholder="https://votre-serveur.com/webhook" />
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Les webhooks vous permettent de recevoir des notifications en temps réel sur les événements importants (nouvelles inscriptions, fins de formation, etc.)</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Settings className="h-4 w-4 mr-2" />
                    Sauvegarder la configuration
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ManagerLayout>
  );
};

export default ManagerSettings; 