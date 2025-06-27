
import React from 'react';
import { FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PdfContentProps {
  title: string;
}

const PdfContent: React.FC<PdfContentProps> = ({ title }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-8 mb-6 bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <FileIcon className="h-16 w-16 text-red-500 mb-4" />
        <p className="text-xl font-medium mb-2">Document PDF</p>
        <p className="text-muted-foreground mb-6">Support de cours: {title}</p>
        <div className="max-w-md mx-auto text-sm text-muted-foreground mb-6">
          Ce document contient l'ensemble des informations relatives à ce module. 
          Vous pouvez le télécharger pour une consultation hors-ligne.
        </div>
        <Button variant="outline" size="lg" className="gap-2">
          <FileIcon className="h-4 w-4" />
          Télécharger le PDF
        </Button>
      </div>
    </div>
  );
};

export default PdfContent;
