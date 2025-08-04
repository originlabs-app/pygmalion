import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Building2,
  FileText,
  Phone,
  Mail,
  Globe,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Image,
  Video,
  Music,
  File,
  Eye,
  Download,
  ExternalLink,
  Youtube,
  Play
} from 'lucide-react';
import { AdminTrainingOrganization } from '@/services/adminService';
import { TrainingOrgDocument, trainingOrgService } from '@/services/trainingOrgService';
import { toast } from 'sonner';

interface OrganizationDetailProps {
  organization: AdminTrainingOrganization;
  documents: TrainingOrgDocument[];
  onClose: () => void;
  onApprove: (comment?: string) => void;
  onReject: (comment?: string) => void;
  isLoadingAction: boolean;
}

const OrganizationDetail: React.FC<OrganizationDetailProps> = ({
  organization,
  documents,
  onClose,
  onApprove,
  onReject,
  isLoadingAction
}) => {
  const [comment, setComment] = useState('');
  const [showCommentField, setShowCommentField] = useState(false);
  const getStatusBadge = (verificationStatus: string) => {
    switch (verificationStatus) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-200"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Vérifiée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejetée</Badge>;
      default:
        return <Badge variant="outline">{verificationStatus}</Badge>;
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

  const getDocumentTypeColor = (type: string): string => {
    switch (type) {
      case 'qualiopi': return 'bg-green-100 text-green-800 border-green-200';
      case 'siret': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'training_content': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'other': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFileIcon = (document: TrainingOrgDocument) => {
    if (document.storageType === 'youtube') {
      return <Youtube className="h-5 w-5 text-red-600" />;
    }
    if (document.storageType === 'vimeo') {
      return <Play className="h-5 w-5 text-blue-600" />;
    }
    
    // Pour les fichiers locaux
    if (document.mimeType?.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (document.mimeType?.startsWith('video/')) return <Video className="h-5 w-5 text-red-500" />;
    if (document.mimeType?.startsWith('audio/')) return <Music className="h-5 w-5 text-purple-500" />;
    if (document.mimeType === 'application/pdf') return <FileText className="h-5 w-5 text-red-600" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDocument = async (document: TrainingOrgDocument) => {
    if (document.storageType === 'youtube' || document.storageType === 'vimeo') {
      // Ouvrir l'URL externe dans un nouvel onglet
      if (document.externalUrl) {
        window.open(document.externalUrl, '_blank');
      }
      return;
    }

    // Pour les fichiers locaux, obtenir l'URL signée
    try {
      const { url } = await trainingOrgService.getDocumentSignedUrl(document.id);
      window.open(url, '_blank');
    } catch (error) {
      toast.error('Erreur lors de l\'ouverture du document');
      console.error('Error getting signed URL:', error);
    }
  };

  const documentStats = {
    total: documents.length,
    qualiopi: documents.filter(d => d.documentType === 'qualiopi').length,
    siret: documents.filter(d => d.documentType === 'siret').length,
    other: documents.filter(d => d.documentType === 'other').length,
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-primary" />
            {organization.name}
            {getStatusBadge(organization.verificationStatus)}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">SIRET</p>
                      <p className="font-medium">{organization.siret}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email de contact</p>
                      <p className="font-medium">{organization.contactEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <p className="font-medium">{organization.contactPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date de création</p>
                      <p className="font-medium">{formatDate(organization.createdAt)}</p>
                    </div>
                  </div>
                  {organization.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Site web</p>
                        <a 
                          href={organization.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          {organization.website}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {organization.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Description</p>
                    <p className="text-sm bg-muted/30 p-3 rounded-lg">{organization.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {/* Statistiques documents */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-semibold">{documentStats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-semibold text-green-600">{documentStats.qualiopi}</p>
                <p className="text-xs text-muted-foreground">Qualiopi</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-lg font-semibold text-blue-600">{documentStats.siret}</p>
                <p className="text-xs text-muted-foreground">SIRET/Kbis</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-gray-600">{documentStats.other}</p>
                <p className="text-xs text-muted-foreground">Autres</p>
              </div>
            </div>

            {/* Liste des documents */}
            {documents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Aucun document uploadé</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      {getFileIcon(document)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium truncate">
                            {document.fileName}
                          </p>
                          <Badge className={getDocumentTypeColor(document.documentType)}>
                            {getDocumentTypeLabel(document.documentType)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(document.uploadedAt)}
                          </span>
                          {document.storageType === 'local' && (
                            <span>{formatFileSize(document.size)}</span>
                          )}
                          <span className="capitalize">
                            {document.storageType === 'local' ? 'Fichier local' : 
                             document.storageType === 'youtube' ? 'YouTube' : 'Vimeo'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDocument(document)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {document.storageType === 'local' ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <ExternalLink className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Actions */}
        {organization.verificationStatus === 'pending' && (
          <div className="space-y-4 pt-4 border-t">
            {/* Champ commentaire */}
            <div className="space-y-2">
              <Label htmlFor="adminComment">Commentaire (optionnel pour approbation, recommandé pour rejet)</Label>
              <Textarea
                id="adminComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Précisez les raisons de votre décision, notamment en cas de rejet..."
                className="min-h-[80px]"
              />
            </div>
            
            {/* Boutons d'action */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Fermer
              </Button>
              <Button
                variant="outline"
                onClick={() => onReject(comment)}
                disabled={isLoadingAction}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isLoadingAction ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                ) : (
                  <XCircle className="h-4 w-4 mr-2" />
                )}
                Rejeter
              </Button>
              <Button
                onClick={() => onApprove(comment)}
                disabled={isLoadingAction}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoadingAction ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Approuver
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationDetail; 