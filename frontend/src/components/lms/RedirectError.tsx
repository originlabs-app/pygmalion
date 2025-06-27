
import React from 'react';
import { Button } from '@/components/ui/button';

interface RedirectErrorProps {
  errorMessage: string | null;
  onRetry: () => void;
  onReturn: () => void;
}

const RedirectError: React.FC<RedirectErrorProps> = ({
  errorMessage,
  onRetry,
  onReturn
}) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Problème de redirection</h1>
      <p className="text-muted-foreground mb-6">{errorMessage}</p>
      <div className="flex flex-col gap-2">
        <Button onClick={onRetry}>
          Réessayer
        </Button>
        <Button 
          variant="outline" 
          onClick={onReturn}
        >
          Retour au tableau de bord
        </Button>
      </div>
    </div>
  );
};

export default RedirectError;
