import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  X, 
  FileText, 
  File, 
  Image, 
  Video, 
  Music, 
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Youtube,
  Play
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  TrainingOrgDocument, 
  UploadDocumentRequest, 
  ExternalMediaRequest,
  trainingOrgService 
} from '@/services/trainingOrgService';

interface DocumentUploadProps {
  onDocumentUploaded: (document: TrainingOrgDocument) => void;
  onError?: (error: string) => void;
  maxFiles?: number;
  existingDocuments?: TrainingOrgDocument[];
}

type DocumentType = 'qualiopi' | 'siret' | 'other';
type UploadMode = 'file' | 'external';

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onDocumentUploaded,
  onError,
  maxFiles = 10,
  existingDocuments = []
}) => {
  const [uploadMode, setUploadMode] = useState<UploadMode>('file');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState<DocumentType>('qualiopi');
  
  // Pour les médias externes
  const [externalUrl, setExternalUrl] = useState('');
  const [externalTitle, setExternalTitle] = useState('');
  const [externalDescription, setExternalDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocumentTypeLabel = (type: DocumentType): string => {
    switch (type) {
      case 'qualiopi': return 'Certification Qualiopi';
      case 'siret': return 'Document SIRET/Kbis';
      case 'other': return 'Autre document';
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
    if (mimeType === 'application/pdf') return <FileText className="h-5 w-5 text-red-600" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const getExternalIcon = (url: string) => {
    if (trainingOrgService.validateYouTubeUrl(url)) {
      return <Youtube className="h-5 w-5 text-red-600" />;
    }
    if (trainingOrgService.validateVimeoUrl(url)) {
      return <Play className="h-5 w-5 text-blue-600" />;
    }
    return <ExternalLink className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const validateFile = (file: File): string | null => {
    // Taille max 20MB
    if (file.size > 20 * 1024 * 1024) {
      return 'Le fichier est trop volumineux (max 20MB)';
    }

    // Types autorisés
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (!allowedTypes.includes(file.type)) {
      return 'Type de fichier non autorisé';
    }

    return null;
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      toast.error(`Erreurs de validation:\n${errors.join('\n')}`);
    }

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles].slice(0, maxFiles));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Aucun fichier sélectionné');
      return;
    }

    setIsUploading(true);
    try {
      for (const file of selectedFiles) {
        const uploadData: UploadDocumentRequest = {
          file,
          title: `${documentType}-${file.name}`
        };
        
        const document = await trainingOrgService.uploadDocument(uploadData);
        onDocumentUploaded(document);
      }
      
      setSelectedFiles([]);
      toast.success(`${selectedFiles.length} fichier(s) uploadé(s) avec succès`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'upload';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const addExternalMedia = async () => {
    if (!externalUrl.trim() || !externalTitle.trim()) {
      toast.error('URL et titre sont requis');
      return;
    }

    if (!trainingOrgService.validateExternalUrl(externalUrl)) {
      toast.error('URL non valide. Seules les URLs YouTube et Vimeo sont acceptées.');
      return;
    }

    setIsUploading(true);
    try {
      const mediaData: ExternalMediaRequest = {
        url: externalUrl,
        documentType: 'training_content',
        title: externalTitle,
        description: externalDescription
      };

      const document = await trainingOrgService.addExternalMedia(mediaData);
      onDocumentUploaded(document);
      
      // Reset form
      setExternalUrl('');
      setExternalTitle('');
      setExternalDescription('');
      
      toast.success('Média externe ajouté avec succès');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Erreur lors de l\'ajout du média';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  const canUploadMore = existingDocuments.length + selectedFiles.length < maxFiles;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Gestion des documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!canUploadMore && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Limite de {maxFiles} documents atteinte. Supprimez des documents existants pour en ajouter de nouveaux.
            </AlertDescription>
          </Alert>
        )}

        {canUploadMore && (
          <>
            {/* Sélection du type de document */}
            <div className="space-y-2">
              <Label>Type de document</Label>
              <Select value={documentType} onValueChange={(value: DocumentType) => setDocumentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qualiopi">Certification Qualiopi</SelectItem>
                  <SelectItem value="siret">Document SIRET/Kbis</SelectItem>
                  <SelectItem value="other">Autre document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Zone de drag & drop */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-300 hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Glissez-déposez vos fichiers ici
                </p>
                <p className="text-sm text-muted-foreground">
                  ou cliquez pour sélectionner
                </p>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  Parcourir les fichiers
                </Button>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG • Max 20MB par fichier
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
              />
            </div>

            {/* Liste des fichiers sélectionnés */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Fichiers sélectionnés ({selectedFiles.length})</h4>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/40">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)} • {getDocumentTypeLabel(documentType)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  onClick={uploadFiles} 
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Upload en cours...
                    </>
                  ) : (
                    `Uploader ${selectedFiles.length} fichier(s)`
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Informations sur les limites */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Fichiers autorisés : PDF, images (JPG/PNG) – 20MB max</p>
          <p>• Maximum {maxFiles} documents par organisme</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentUpload; 