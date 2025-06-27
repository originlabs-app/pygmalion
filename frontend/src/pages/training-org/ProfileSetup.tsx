import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Building, 
  Upload, 
  Eye,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import TrainingOrgForm from '@/components/forms/TrainingOrgForm';
import DocumentUpload from '@/components/upload/DocumentUpload';
import DocumentList from '@/components/upload/DocumentList';
import { 
  TrainingOrganization, 
  TrainingOrgDocument,
  CreateTrainingOrgRequest,
  UpdateTrainingOrgRequest,
  trainingOrgService 
} from '@/services/trainingOrgService';

type SetupStep = 'profile' | 'documents' | 'validation';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeStep, setActiveStep] = useState<SetupStep>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // État des données
  const [organization, setOrganization] = useState<TrainingOrganization | null>(null);
  const [documents, setDocuments] = useState<TrainingOrgDocument[]>([]);
  const [hasProfile, setHasProfile] = useState(false);

  // Vérification d'authentification
  if (!currentUser || currentUser.role !== 'training_org') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground mb-6">
            Veuillez vous connecter en tant qu'organisme de formation pour accéder à cette page.
          </p>
          <Button onClick={() => navigate('/login')}>
            Se connecter
          </Button>
        </div>
      </Layout>
    );
  }

  // Chargement des données existantes
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Charger le profil existant
        try {
          const orgData = await trainingOrgService.getMyProfile();
          setOrganization(orgData);
          setHasProfile(true);
          
          // Si le profil existe, charger les documents
          const docsData = await trainingOrgService.getDocuments();
          setDocuments(docsData);
          
          // Si l'organisation est déjà validée, rediriger vers le dashboard
          if (orgData.status === 'verified') {
            toast.success('Votre organisme est déjà validé !');
            navigate('/training-org-dashboard');
            return;
          }
          
          // Déterminer l'étape appropriée selon les paramètres URL ou l'état des données
          const stepParam = searchParams.get('step') as SetupStep;
          if (stepParam && ['profile', 'documents', 'validation'].includes(stepParam)) {
            setActiveStep(stepParam);
          } else if (docsData.length > 0) {
            setActiveStep('validation');
          } else {
            setActiveStep('documents');
          }
          
        } catch (error: any) {
          // Si pas de profil, rester sur l'étape profil
          if (error.response?.status === 404) {
            setHasProfile(false);
            const stepParam = searchParams.get('step') as SetupStep;
            if (stepParam && ['profile', 'documents', 'validation'].includes(stepParam)) {
              setActiveStep(stepParam);
            } else {
              setActiveStep('profile');
            }
          } else {
            throw error;
          }
        }
        
      } catch (error: any) {
        console.error('Error loading data:', error);
        toast.error('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate, searchParams]);

  const handleProfileSubmit = async (data: CreateTrainingOrgRequest | UpdateTrainingOrgRequest) => {
    setIsSaving(true);
    try {
      console.log('🚀 Début sauvegarde profil:', { hasProfile, mode: hasProfile ? 'update' : 'create' });
      let result: TrainingOrganization;
      
      if (hasProfile && organization) {
        // Mise à jour
        console.log('📝 Mise à jour du profil existant...');
        result = await trainingOrgService.updateProfile(data as UpdateTrainingOrgRequest);
        toast.success('✅ Profil mis à jour avec succès !');
      } else {
        // Création
        console.log('🆕 Création d\'un nouveau profil...');
        result = await trainingOrgService.createProfile(data as CreateTrainingOrgRequest);
        toast.success('🎉 Profil créé avec succès !');
        setHasProfile(true);
      }
      
      console.log('✅ Profil sauvegardé:', result);
      setOrganization(result);
      
      // Passer à l'étape suivante automatiquement
      setTimeout(() => {
        setActiveStep('documents');
        toast.info('📄 Vous pouvez maintenant ajouter vos documents');
      }, 1000);
      
    } catch (error: any) {
      console.error('❌ Erreur sauvegarde profil:', error);
      console.error('📋 Détails erreur:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method
      });
      
      // L'erreur est aussi gérée dans le composant TrainingOrgForm
      // Mais on ajoute un toast ici pour être sûr
      if (error.response?.status === 400) {
        toast.error('❌ Données invalides. Vérifiez le formulaire.');
      } else if (error.response?.status === 401) {
        toast.error('❌ Session expirée. Veuillez vous reconnecter.');
      } else {
        toast.error('❌ Erreur lors de la sauvegarde. Réessayez.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDocumentUploaded = (document: TrainingOrgDocument) => {
    setDocuments(prev => [...prev, document]);
  };

  const handleDocumentDeleted = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const goToNextStep = () => {
    if (activeStep === 'profile' && hasProfile) {
      setActiveStep('documents');
    } else if (activeStep === 'documents') {
      setActiveStep('validation');
    }
  };

  const goToPreviousStep = () => {
    if (activeStep === 'documents') {
      setActiveStep('profile');
    } else if (activeStep === 'validation') {
      setActiveStep('documents');
    }
  };

  const getStepStatus = (step: SetupStep) => {
    if (!hasProfile && step !== 'profile') return 'disabled';
    if (step === 'profile' && hasProfile) return 'completed';
    if (step === 'documents' && documents.length > 0) return 'completed';
    if (step === activeStep) return 'current';
    return 'pending';
  };

  const getStatusBadge = () => {
    if (!organization) return null;

    switch (organization.status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Vérifié
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente de validation
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejeté
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {hasProfile ? 'Gestion du profil organisme' : 'Configuration de votre organisme de formation'}
              </h1>
              <p className="text-muted-foreground">
                {hasProfile 
                  ? 'Modifiez vos informations et gérez vos documents'
                  : 'Créez votre profil et ajoutez vos documents pour commencer le processus de validation'
                }
              </p>
            </div>
            {getStatusBadge()}
          </div>
        </div>

        {organization?.status === 'rejected' && organization.rejectionReason && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Votre demande a été rejetée :</strong> {organization.rejectionReason}
              <br />
              <span className="text-sm">Modifiez vos informations et documents puis resoumettez votre demande.</span>
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-card border rounded-lg p-6">
          <Tabs value={activeStep} onValueChange={(value) => setActiveStep(value as SetupStep)}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger 
                value="profile" 
                disabled={getStepStatus('profile') === 'disabled'}
                className="flex items-center gap-2"
              >
                <Building className="h-4 w-4" />
                Profil organisme
                {getStepStatus('profile') === 'completed' && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                disabled={getStepStatus('documents') === 'disabled'}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Documents
                {getStepStatus('documents') === 'completed' && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="validation" 
                disabled={getStepStatus('validation') === 'disabled'}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Validation
              </TabsTrigger>
            </TabsList>

            {/* Étape 1: Profil */}
            <TabsContent value="profile" className="space-y-6">
              <TrainingOrgForm
                initialData={organization || undefined}
                onSubmit={handleProfileSubmit}
                isLoading={isSaving}
                mode={hasProfile ? 'edit' : 'create'}
              />
              
              {hasProfile && (
                <div className="flex justify-end">
                  <Button onClick={goToNextStep}>
                    Étape suivante
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Étape 2: Documents */}
            <TabsContent value="documents" className="space-y-6">
              <DocumentUpload
                onDocumentUploaded={handleDocumentUploaded}
                existingDocuments={documents}
                maxFiles={20}
              />
              
              <DocumentList
                documents={documents}
                onDocumentDeleted={handleDocumentDeleted}
              />

              <div className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Étape précédente
                </Button>
                <Button onClick={goToNextStep} disabled={documents.length === 0}>
                  Étape suivante
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            {/* Étape 3: Validation */}
            <TabsContent value="validation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif et validation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Résumé du profil */}
                  {organization && (
                    <div className="space-y-4">
                      <h3 className="font-medium">Informations de l'organisme</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">Nom</p>
                          <p className="text-sm text-muted-foreground">{organization.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">SIRET</p>
                          <p className="text-sm text-muted-foreground">{organization.siret}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email de contact</p>
                          <p className="text-sm text-muted-foreground">{organization.contactEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Téléphone</p>
                          <p className="text-sm text-muted-foreground">{organization.contactPhone}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Résumé des documents */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Documents fournis ({documents.length})</h3>
                    {documents.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Aucun document uploadé.</p>
                    ) : (
                      <ul className="space-y-2">
                        {documents.map((doc) => (
                          <li key={doc.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                            <span className="truncate text-sm">{doc.fileName}</span>
                            <span className="text-xs text-muted-foreground">{new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Statut actuel */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Statut de validation</h3>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge()}
                      </div>
                      {organization?.status === 'pending' && (
                        <p className="text-sm text-muted-foreground">
                          Votre dossier est en cours d'examen par notre équipe. 
                          Vous recevrez un email dès que la validation sera terminée.
                        </p>
                      )}
                      {organization?.status === 'rejected' && (
                        <p className="text-sm text-muted-foreground">
                          Modifiez les informations nécessaires et resoumettez votre dossier.
                        </p>
                      )}
                      {!organization?.status && (
                        <p className="text-sm text-muted-foreground">
                          Votre dossier sera soumis pour validation une fois que vous aurez ajouté au moins un document.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={goToPreviousStep}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Étape précédente
                    </Button>
                    <Button onClick={() => navigate('/training-org-dashboard')}>
                      Aller au tableau de bord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSetup; 