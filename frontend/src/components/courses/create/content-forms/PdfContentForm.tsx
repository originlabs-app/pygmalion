
import React from 'react';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';

interface PdfContentFormProps {
  handleFileSelected: (file: File) => void;
}

const PdfContentForm: React.FC<PdfContentFormProps> = ({
  handleFileSelected
}) => {
  return (
    <div className="space-y-2">
      <Label>Fichier PDF*</Label>
      <FileUpload
        onFileSelected={handleFileSelected}
        acceptedFileTypes=".pdf"
        maxSizeInMB={10}
        label="Sélectionner un fichier PDF"
      />
    </div>
  );
};

export default PdfContentForm;
