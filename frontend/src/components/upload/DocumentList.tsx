import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  FileText, 
  File, 
  Image, 
  Video, 
  Music, 
  Trash2, 
  Eye, 
  ExternalLink,
  Youtube,
  Play,
  Download,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { TrainingOrgDocument, trainingOrgService } from '@/services/trainingOrgService';

interface DocumentListProps {
  documents: TrainingOrgDocument[];
  onDocumentDeleted: (documentId: string) => void;
  isLoading?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDocumentDeleted,
  isLoading = false
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingDocument, setViewingDocument] = useState<TrainingOrgDocument | null>(null);

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

  const handleView = async (document: TrainingOrgDocument) => {
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
      logger.error('Error getting signed URL:', error);
    }
  };

  const handleDelete = async (documentId: string) => {
    setDeletingId(documentId);
    try {
      await trainingOrgService.deleteDocument(documentId);
      onDocumentDeleted(documentId);
      toast.success('Document supprimé avec succès');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la suppression');
      logger.error('Error deleting document:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownload = async (document: TrainingOrgDocument) => {
    if (document.storageType !== 'local') {
      toast.error('Le téléchargement n\'est disponible que pour les fichiers locaux');
      return;
    }

    try {
      const { url } = await trainingOrgService.getDocumentSignedUrl(document.id);
      
      // Créer un lien de téléchargement
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      
      toast.success('Téléchargement démarré');
    } catch (error) {
      toast.error('Erreur lors du téléchargement');
      logger.error('Error downloading document:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <File className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun document uploadé</p>
            <p className="text-sm text-muted-foreground mt-2">
              Utilisez la section ci-dessus pour ajouter vos premiers documents
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Documents ({documents.length})</span>
          <Badge variant="outline">
            {documents.filter(d => d.storageType === 'local').length} locaux • {' '}
            {documents.filter(d => d.storageType !== 'local').length} externes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                  onClick={() => handleView(document)}
                  className="text-muted-foreground hover:text-primary"
                >
                  {document.storageType === 'local' ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <ExternalLink className="h-4 w-4" />
                  )}
                </Button>

                {document.storageType === 'local' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(document)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      disabled={deletingId === document.id}
                    >
                      {deletingId === document.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer le document</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer "{document.fileName}" ?
                        Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(document.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé par type */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-3">Répartition par type</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['qualiopi', 'siret', 'other'].map(type => {
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentList; 