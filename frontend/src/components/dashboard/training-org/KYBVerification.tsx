import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Upload, FileCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VerificationStatus } from '@/types/verification';

interface KYBVerificationProps {
  status: VerificationStatus;
  onApprove: () => void;
  onReject: () => void;
  onUpload: () => void;
}

const KYBVerification: React.FC<KYBVerificationProps> = ({ status, onApprove, onReject, onUpload }) => {
  const renderStatus = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente de vérification</Badge>;
      case 'verified':
        return <Badge className="bg-green-500">KYB Vérifié <Check className="h-4 w-4 ml-1" /></Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">KYB Rejeté <X className="h-4 w-4 ml-1" /></Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vérification KYB (Know Your Business)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Statut actuel:</span>
          {renderStatus()}
        </div>
        
        {status === 'pending' && (
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onReject}>
              <X className="h-4 w-4 mr-2" />
              Rejeter
            </Button>
            <Button onClick={onApprove}>
              <Check className="h-4 w-4 mr-2" />
              Approuver
            </Button>
          </div>
        )}
        
        {status === 'rejected' && (
          <div className="text-red-500">
            Votre vérification KYB a été rejetée. Veuillez contacter l'administrateur pour plus d'informations.
          </div>
        )}
        
        {status !== 'verified' && (
          <Button className="w-full" onClick={onUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Téléverser les Documents KYB
          </Button>
        )}
        
        <div className="text-sm text-muted-foreground">
          Veuillez fournir les documents nécessaires pour la vérification de votre organisation.
        </div>
      </CardContent>
    </Card>
  );
};

export default KYBVerification;
