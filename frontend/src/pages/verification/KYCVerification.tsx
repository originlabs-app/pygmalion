
import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useSecurityChecks } from '@/hooks/useSecurityChecks';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldAlert, IdCard, FileCheck, UserCheck } from 'lucide-react';

// Schema validation for the KYC form
const formSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  idNumber: z.string().min(2, 'Le numéro d\'identité est requis'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date requis (YYYY-MM-DD)'),
  nationality: z.string().min(2, 'La nationalité est requise'),
  address: z.string().min(5, 'L\'adresse est requise'),
});

const KYCVerification = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<{
    idFront?: File;
    idBack?: File;
    selfie?: File;
  }>({});
  const [submitting, setSubmitting] = useState(false);
  const { securityChecks, performSecurityChecks } = useSecurityChecks();
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '',
      idNumber: '',
      dateOfBirth: '',
      nationality: '',
      address: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Check if all required files are uploaded
    if (!uploadedFiles.idFront || !uploadedFiles.idBack || !uploadedFiles.selfie) {
      toast.error('Veuillez télécharger tous les documents requis');
      return;
    }

    setSubmitting(true);
    performSecurityChecks();
    
    // Simulate API request
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Vérification KYC soumise avec succès', {
        description: 'Votre identité sera vérifiée dans les plus brefs délais.',
      });
      
      // In a real app, this would update the user's verification status in the database
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Une erreur est survenue lors de la soumission');
      logger.error('KYC submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle file uploads
  const handleFileChange = (type: 'idFront' | 'idBack' | 'selfie') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  // Redirect if not logged in
  if (!currentUser) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter pour accéder à la vérification d'identité.
          </p>
          <Button asChild>
            <Link to="/login">Connexion</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const isVerified = currentUser.verified || false;

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vérification d'identité (KYC)</h1>
          <p className="text-muted-foreground">
            Pour accéder à toutes les fonctionnalités de formation, vous devez compléter le processus de vérification d'identité.
          </p>
        </div>

        {isVerified ? (
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-6 w-6 text-green-600" />
                <CardTitle>Identité vérifiée</CardTitle>
              </div>
              <CardDescription>
                Votre identité a été vérifiée avec succès. Vous avez accès à toutes les fonctionnalités de formation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <div className="flex flex-col items-center">
                  <UserCheck className="h-16 w-16 text-green-500 mb-4" />
                  <p className="text-xl font-medium text-green-700">Vérification complète</p>
                  <p className="text-sm text-muted-foreground mt-2">Vérifié le 19/05/2025</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">Si vous avez des questions concernant votre vérification, veuillez nous contacter.</p>
              <Button variant="outline" asChild>
                <Link to="/student-dashboard">Retour au tableau de bord</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IdCard className="h-5 w-5 text-primary" />
                  <CardTitle>Formulaire de vérification</CardTitle>
                </div>
                <Badge variant="secondary">Non vérifié</Badge>
              </div>
              <CardDescription>
                Veuillez remplir ce formulaire avec précision et télécharger des documents d'identité clairs et lisibles.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez votre nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de naissance</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nationalité</FormLabel>
                            <FormControl>
                              <Input placeholder="Entrez votre nationalité" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro d'identité</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez votre numéro de passeport ou carte d'identité" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse complète</FormLabel>
                          <FormControl>
                            <Input placeholder="Entrez votre adresse complète" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Documents d'identité</h3>
                    <p className="text-sm text-muted-foreground">Veuillez télécharger des images claires et lisibles des documents suivants.</p>
                    
                    <div className="space-y-4">
                      <div>
                        <FormLabel htmlFor="idFront">Pièce d'identité (recto)</FormLabel>
                        <div className="mt-1">
                          <Input
                            id="idFront"
                            type="file"
                            accept="image/png,image/jpeg,application/pdf"
                            onChange={handleFileChange('idFront')}
                            className="w-full"
                          />
                          {uploadedFiles.idFront && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Fichier: {uploadedFiles.idFront.name} ({Math.round(uploadedFiles.idFront.size / 1024)} Ko)
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <FormLabel htmlFor="idBack">Pièce d'identité (verso)</FormLabel>
                        <div className="mt-1">
                          <Input
                            id="idBack"
                            type="file"
                            accept="image/png,image/jpeg,application/pdf"
                            onChange={handleFileChange('idBack')}
                            className="w-full"
                          />
                          {uploadedFiles.idBack && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Fichier: {uploadedFiles.idBack.name} ({Math.round(uploadedFiles.idBack.size / 1024)} Ko)
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <FormLabel htmlFor="selfie">Photo de vous tenant votre pièce d'identité</FormLabel>
                        <div className="mt-1">
                          <Input
                            id="selfie"
                            type="file"
                            accept="image/png,image/jpeg"
                            onChange={handleFileChange('selfie')}
                            className="w-full"
                          />
                          {uploadedFiles.selfie && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Fichier: {uploadedFiles.selfie.name} ({Math.round(uploadedFiles.selfie.size / 1024)} Ko)
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md border">
                    <div className="flex items-start space-x-3">
                      <ShieldAlert className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Sécurité et protection de vos données</p>
                        <p className="mb-2">Vos informations personnelles et documents sont:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Cryptés selon les normes bancaires</li>
                          <li>Vérifiés par un système automatisé sécurisé</li>
                          <li>Traités conformément au RGPD</li>
                          <li>Stockés de façon sécurisée et supprimés après la période légale de conservation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={submitting}
                    size="lg"
                  >
                    {submitting ? 'Soumission en cours...' : 'Soumettre pour vérification'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 text-center">
          <Button variant="link" asChild>
            <Link to="/student-dashboard">Retour au tableau de bord</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default KYCVerification;
