
import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { FileIcon, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadService } from '@/services/uploadService';
import { toast } from 'sonner';

interface PdfContentProps {
  title: string;
  description?: string;
  storagePath?: string;
  fileSize?: number;
  isDownloadable?: boolean;
}

const PdfContent: React.FC<PdfContentProps> = ({ 
  title, 
  description, 
  storagePath, 
  fileSize,
  isDownloadable = true 
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!storagePath) {
      toast.error('Fichier non disponible');
      return;
    }

    setDownloading(true);
    try {
      // Récupérer l'URL signée sécurisée
      const signedUrl = await uploadService.getSignedUrl(storagePath);
      
      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = signedUrl;
      link.download = `${title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Téléchargement démarré');
    } catch (error: any) {
      logger.error('Erreur lors du téléchargement:', error);
      toast.error(error.message || 'Impossible de télécharger le fichier');
    } finally {
      setDownloading(false);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  return (
    <div className="rounded-lg border border-gray-200 p-8 mb-6 bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <FileIcon className="h-16 w-16 text-red-500 mb-4" />
        <p className="text-xl font-medium mb-2">Document PDF</p>
        <p className="text-muted-foreground mb-2">Support de cours: {title}</p>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
            {description}
          </p>
        )}
        
        {fileSize && (
          <p className="text-xs text-muted-foreground mb-4">
            Taille: {formatFileSize(fileSize)}
          </p>
        )}
        
        <div className="max-w-md mx-auto text-sm text-muted-foreground mb-6 text-center">
          Ce document contient l'ensemble des informations relatives à ce module. 
          Vous pouvez le télécharger pour une consultation hors-ligne.
        </div>
        
        {isDownloadable && storagePath ? (
          <Button 
            variant="outline" 
            size="lg" 
            className="gap-2"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Téléchargement...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Télécharger le PDF
              </>
            )}
          </Button>
        ) : (
          <p className="text-sm text-amber-600">
            {!isDownloadable ? 'Téléchargement non autorisé' : 'Fichier non disponible'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PdfContent;
