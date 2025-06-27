
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/dashboard/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Settings, Shield, Mail, Globe, Database, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';

const AdminSettings = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // États pour les différentes sections de paramètres
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'MBAVIATION Marketplace',
    platformDescription: 'Plateforme de formation aéronautique',
    contactEmail: 'contact@mbaviation.com',
    supportEmail: 'support@mbaviation.com',
    defaultLanguage: 'fr',
    timezone: 'Europe/Paris'
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireMFA: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    passwordComplexity: true,
    requireEmailVerification: true
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpEnabled: true,
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: '',
    fromEmail: 'noreply@mbaviation.com',
    fromName: 'MBAVIATION'
  });

  const [businessSettings, setBusinessSettings] = useState({
    autoApproveOrganizations: false,
    commissionRate: 5,
    defaultCurrency: 'EUR',
    allowGuestCheckout: true,
    requireKYC: true,
    requireKYB: true
  });

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

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Les modifications ont été appliquées avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les paramètres.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout 
      title="Paramètres de la Plateforme" 
      description="Configuration générale et paramètres système"
      action={
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      }
    >
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        {/* Paramètres Généraux */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Paramètres Généraux
              </CardTitle>
              <CardDescription>
                Configuration de base de la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Nom de la plateforme</Label>
                  <Input
                    id="platformName"
                    value={generalSettings.platformName}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      platformName: e.target.value
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de contact</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => setGeneralSettings(prev => ({
                      ...prev,
                      contactEmail: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platformDescription">Description</Label>
                <Textarea
                  id="platformDescription"
                  value={generalSettings.platformDescription}
                  onChange={(e) => setGeneralSettings(prev => ({
                    ...prev,
                    platformDescription: e.target.value
                  }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Langue par défaut</Label>
                  <Select value={generalSettings.defaultLanguage} onValueChange={(value) => 
                    setGeneralSettings(prev => ({ ...prev, defaultLanguage: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => 
                    setGeneralSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres de Sécurité */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Paramètres de Sécurité
              </CardTitle>
              <CardDescription>
                Configuration de la sécurité et des accès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Authentification Multi-Facteurs (MFA)</Label>
                  <p className="text-sm text-muted-foreground">
                    Exiger la MFA pour tous les utilisateurs
                  </p>
                </div>
                <Switch
                  checked={securitySettings.requireMFA}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    requireMFA: checked
                  }))}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Timeout de session (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionTimeout: parseInt(e.target.value)
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Tentatives de connexion max</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings(prev => ({
                      ...prev,
                      maxLoginAttempts: parseInt(e.target.value)
                    }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Complexité des mots de passe</Label>
                  <p className="text-sm text-muted-foreground">
                    Exiger des mots de passe complexes
                  </p>
                </div>
                <Switch
                  checked={securitySettings.passwordComplexity}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    passwordComplexity: checked
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Vérification email obligatoire</Label>
                  <p className="text-sm text-muted-foreground">
                    Exiger la vérification de l'email à l'inscription
                  </p>
                </div>
                <Switch
                  checked={securitySettings.requireEmailVerification}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    requireEmailVerification: checked
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres Email */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Configuration Email
              </CardTitle>
              <CardDescription>
                Paramètres SMTP et notifications email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Envoi d'emails activé</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer l'envoi automatique d'emails
                  </p>
                </div>
                <Switch
                  checked={emailSettings.smtpEnabled}
                  onCheckedChange={(checked) => setEmailSettings(prev => ({
                    ...prev,
                    smtpEnabled: checked
                  }))}
                />
              </div>

              {emailSettings.smtpEnabled && (
                <>
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">Serveur SMTP</Label>
                      <Input
                        id="smtpHost"
                        value={emailSettings.smtpHost}
                        onChange={(e) => setEmailSettings(prev => ({
                          ...prev,
                          smtpHost: e.target.value
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">Port SMTP</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings(prev => ({
                          ...prev,
                          smtpPort: parseInt(e.target.value)
                        }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">Email expéditeur</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={emailSettings.fromEmail}
                        onChange={(e) => setEmailSettings(prev => ({
                          ...prev,
                          fromEmail: e.target.value
                        }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fromName">Nom expéditeur</Label>
                      <Input
                        id="fromName"
                        value={emailSettings.fromName}
                        onChange={(e) => setEmailSettings(prev => ({
                          ...prev,
                          fromName: e.target.value
                        }))}
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Paramètres Business */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres Business
              </CardTitle>
              <CardDescription>
                Configuration des règles métier et processus
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Approbation automatique des organismes</Label>
                  <p className="text-sm text-muted-foreground">
                    Approuver automatiquement les nouveaux organismes de formation
                  </p>
                </div>
                <Switch
                  checked={businessSettings.autoApproveOrganizations}
                  onCheckedChange={(checked) => setBusinessSettings(prev => ({
                    ...prev,
                    autoApproveOrganizations: checked
                  }))}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Taux de commission (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.1"
                    value={businessSettings.commissionRate}
                    onChange={(e) => setBusinessSettings(prev => ({
                      ...prev,
                      commissionRate: parseFloat(e.target.value)
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">Devise par défaut</Label>
                  <Select value={businessSettings.defaultCurrency} onValueChange={(value) => 
                    setBusinessSettings(prev => ({ ...prev, defaultCurrency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="USD">Dollar US (USD)</SelectItem>
                      <SelectItem value="GBP">Livre Sterling (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Paiement invité autorisé</Label>
                    <p className="text-sm text-muted-foreground">
                      Permettre aux utilisateurs non connectés de payer
                    </p>
                  </div>
                  <Switch
                    checked={businessSettings.allowGuestCheckout}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({
                      ...prev,
                      allowGuestCheckout: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>KYC obligatoire</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger la vérification d'identité pour les apprenants
                    </p>
                  </div>
                  <Switch
                    checked={businessSettings.requireKYC}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({
                      ...prev,
                      requireKYC: checked
                    }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>KYB obligatoire</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger la vérification d'entreprise pour les organismes
                    </p>
                  </div>
                  <Switch
                    checked={businessSettings.requireKYB}
                    onCheckedChange={(checked) => setBusinessSettings(prev => ({
                      ...prev,
                      requireKYB: checked
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
