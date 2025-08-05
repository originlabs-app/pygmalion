import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Smartphone, Shield, CheckCircle, AlertTriangle, Settings } from 'lucide-react';

const MFAStatusCard: React.FC = () => {
  const { currentUser, getMFAStatus, disableMFA } = useAuth();
  const navigate = useNavigate();
  const [mfaStatus, setMfaStatus] = useState<{ enabled: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabling, setIsDisabling] = useState(false);

  useEffect(() => {
    loadMFAStatus();
  }, []);

  const loadMFAStatus = async () => {
    try {
      const status = await getMFAStatus();
      setMfaStatus(status);
    } catch (error) {
      logger.error('Erreur lors du chargement du statut MFA:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupMFA = () => {
    navigate('/setup-mfa');
  };

  const handleDisableMFA = async () => {
    const otpCode = prompt('Entrez votre code OTP pour désactiver MFA :');
    if (!otpCode) return;

    setIsDisabling(true);
    try {
      await disableMFA(otpCode);
      toast.success('MFA désactivé avec succès');
      await loadMFAStatus(); // Recharger le statut
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la désactivation MFA');
    } finally {
      setIsDisabling(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Authentification Multi-Facteurs (MFA)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chargement du statut MFA...</p>
        </CardContent>
      </Card>
    );
  }

  const isEnabled = mfaStatus?.enabled || currentUser?.mfaEnabled || false;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Authentification Multi-Facteurs (MFA)
          <Badge variant={isEnabled ? "default" : "secondary"}>
            {isEnabled ? "Activé" : "Désactivé"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Sécurisez votre compte avec une authentification à deux facteurs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEnabled ? (
          <>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Votre compte est protégé par l'authentification multi-facteurs. 
                Vous devrez entrer un code depuis votre application d'authentification 
                à chaque connexion.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application d'authentification</p>
                  <p className="text-sm text-muted-foreground">
                    Google Authenticator, Microsoft Authenticator, ou compatible TOTP
                  </p>
                </div>
                <Shield className="h-5 w-5 text-green-600" />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleDisableMFA}
                  disabled={isDisabling}
                  className="text-red-600 hover:text-red-700"
                >
                  {isDisabling ? 'Désactivation...' : 'Désactiver MFA'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/setup-mfa')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Reconfigurer
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Votre compte n'est pas protégé par l'authentification multi-facteurs. 
                Nous recommandons fortement d'activer cette fonctionnalité pour 
                renforcer la sécurité de votre compte.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium mb-2">Avantages du MFA :</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Protection contre les accès non autorisés</li>
                  <li>• Sécurité renforcée même si votre mot de passe est compromis</li>
                  <li>• Compatible avec Google Authenticator et autres apps TOTP</li>
                  <li>• Codes de récupération pour les situations d'urgence</li>
                </ul>
              </div>

              <Button onClick={handleSetupMFA} className="w-full">
                <Smartphone className="h-4 w-4 mr-2" />
                Configurer l'authentification multi-facteurs
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MFAStatusCard; 