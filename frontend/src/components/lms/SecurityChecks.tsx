
import React from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecurityChecksProps {
  isRedirecting: boolean;
  securityChecks: {
    identity: boolean;
    device: boolean;
    requirements: boolean;
  };
  onManualRedirect: () => void;
  sessionId: string;
}

const SecurityChecks: React.FC<SecurityChecksProps> = ({
  isRedirecting,
  securityChecks,
  onManualRedirect,
  sessionId
}) => {
  return (
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Préparation de votre espace de formation</h1>
      <p className="text-muted-foreground mb-6">
        Nous sécurisons votre session de formation. Veuillez patienter...
      </p>
      
      <div className="space-y-4 text-left mb-6">
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${securityChecks.identity ? 'bg-green-500' : 'bg-gray-200'}`}>
            {securityChecks.identity && <Shield className="h-3 w-3 text-white" />}
          </div>
          <span>Vérification d'identité</span>
        </div>
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${securityChecks.device ? 'bg-green-500' : 'bg-gray-200'}`}>
            {securityChecks.device && <Shield className="h-3 w-3 text-white" />}
          </div>
          <span>Vérification de compatibilité du dispositif</span>
        </div>
        <div className="flex items-center">
          <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${securityChecks.requirements ? 'bg-green-500' : 'bg-gray-200'}`}>
            {securityChecks.requirements && <Shield className="h-3 w-3 text-white" />}
          </div>
          <span>Vérification des exigences de sécurité</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Si vous n'êtes pas redirigé automatiquement, cliquez sur le bouton ci-dessous.
      </p>
      <Button 
        className="mt-4" 
        onClick={onManualRedirect}
      >
        Accéder au cours
      </Button>
    </div>
  );
};

export default SecurityChecks;
