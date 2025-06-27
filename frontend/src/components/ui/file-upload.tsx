
import React, { useState, useRef } from 'react';
import { Button } from './button';
import { toast } from 'sonner';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  acceptedFileTypes?: string;
  maxSizeInMB?: number;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  acceptedFileTypes = '.pdf,.jpg,.jpeg,.png',
  maxSizeInMB = 5,
  label = 'Choisir un fichier',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier
    if (file.size > maxSizeInMB * 1024 * 1024) {
      toast.error(`Le fichier est trop volumineux. Taille maximale: ${maxSizeInMB}MB`);
      return;
    }

    setSelectedFile(file);
    onFileSelected(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
      />
      
      {!selectedFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-primary/50 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleButtonClick}
            >
              {label}
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">
              {acceptedFileTypes.split(',').join(', ')} • Max {maxSizeInMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/40">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
