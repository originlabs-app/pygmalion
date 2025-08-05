
import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Settings, 
  Upload,
  FileText,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { VerificationStatus } from '@/types/verification';
import { 
  TrainingOrganization, 
  TrainingOrgDocument,
  trainingOrgService 
} from '@/services/trainingOrgService';

interface ProfileTabProps {
  verificationStatus: VerificationStatus;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ verificationStatus }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState<TrainingOrganization | null>(null);
  const [documents, setDocuments] = useState<TrainingOrgDocument[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Charger le profil
        try {
          const orgData = await trainingOrgService.getMyProfile();
          setOrganization(orgData);
          
          // Charger les documents
          const docsData = await trainingOrgService.getDocuments();
          setDocuments(docsData);
        } catch (error: any) {
          if (error.response?.status !== 404) {
            logger.error('Error loading profile data:', error);
            toast.error('Erreur lors du chargement des données');
          }
        }
      } catch (error) {
        logger.error('Error in loadData:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusBadge = () => {
    if (!organization) {
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800">
          Non configuré
        </Badge>
      );
    }

    switch (organization.status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Vérifié
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            En cours de vérification
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejeté
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Brouillon
          </Badge>
        );
    }
  };

  const getDocumentTypeLabel = (type: string): string => {
    switch (type) {
      case 'qualiopi': return 'Certification Qualiopi';
      case 'siret': return 'Document SIRET/Kbis';
      case 'training_content': return 'Contenu pédagogique';
      case 'other': return 'Autre document';
      default: return 'Document';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Profil de l'organisme</h2>
          {getStatusBadge()}
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Settings className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Profil non configuré</h3>
              <p className="text-muted-foreground mb-6">
                Vous devez configurer votre profil d'organisme de formation pour commencer à créer des formations.
              </p>
              <Button asChild>
                <Link to="/training-org/profile-setup">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurer mon profil
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Profil de l'organisme</h2>
        {getStatusBadge()}
      </div>

      {organization.status === 'rejected' && organization.rejectionReason && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Motif du rejet :</strong> {organization.rejectionReason}
          </AlertDescription>
        </Alert>
      )}

      {/* Informations de l'organisme */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Informations générales</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/training-org/profile-setup?step=profile">
                <Settings className="mr-2 h-4 w-4" />
                Modifier
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Nom de l'organisme</p>
              <p className="text-sm">{organization.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SIRET</p>
              <p className="text-sm">{organization.siret}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email de contact</p>
              <p className="text-sm">{organization.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
              <p className="text-sm">{organization.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Contact</p>
              <p className="text-sm">{organization.contactName}</p>
            </div>
            {organization.website && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Site web</p>
                <a 
                  href={organization.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {organization.website}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
          
          {organization.description && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
              <p className="text-sm text-muted-foreground">{organization.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents ({documents.length})
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/training-org/profile-setup">
                <Upload className="mr-2 h-4 w-4" />
                Gérer les documents
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-6">
              <FileText className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Aucun document uploadé</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Résumé par type */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['qualiopi', 'siret', 'training_content', 'other'].map(type => {
                  const count = documents.filter(d => d.documentType === type).length;
                  return (
                    <div key={type} className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-lg font-semibold">{count}</p>
                      <p className="text-xs text-muted-foreground">
                        {getDocumentTypeLabel(type)}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {/* Liste des derniers documents */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Derniers documents</p>
                {documents.slice(0, 3).map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">{doc.originalName}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getDocumentTypeLabel(doc.documentType)}
                    </Badge>
                  </div>
                ))}
                {documents.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center">
                    et {documents.length - 3} autre(s) document(s)
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statut et prochaines étapes */}
      <Card>
        <CardHeader>
          <CardTitle>Statut et prochaines étapes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organization.status === 'pending' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <p className="text-sm font-medium text-yellow-800">Validation en cours</p>
                </div>
                <p className="text-sm text-yellow-700">
                  Votre dossier est en cours d'examen par notre équipe. 
                  Vous recevrez un email dès que la validation sera terminée.
                </p>
              </div>
            )}
            
            {organization.status === 'verified' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">Organisme validé</p>
                </div>
                <p className="text-sm text-green-700">
                  Félicitations ! Votre organisme est validé. Vous pouvez maintenant créer et publier des formations.
                </p>
              </div>
            )}
            
            {organization.status === 'rejected' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-medium text-red-800">Demande rejetée</p>
                </div>
                <p className="text-sm text-red-700">
                  Modifiez les informations nécessaires et resoumettez votre dossier.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
