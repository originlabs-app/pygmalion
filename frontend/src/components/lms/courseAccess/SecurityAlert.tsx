
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const SecurityAlert: React.FC = () => {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Information importante</AlertTitle>
      <AlertDescription>
        Ce cours utilise des technologies de vérification d'identité et de détection de fraude.
        Votre webcam sera activée pour la vérification. Veuillez vous assurer d'être dans un environnement calme.
      </AlertDescription>
    </Alert>
  );
};

export default SecurityAlert;
