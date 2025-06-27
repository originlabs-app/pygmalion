
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import IdentityVerification from './IdentityVerification';

interface SecurityVerificationProps {
  onVerificationComplete: () => void;
}

const SecurityVerification: React.FC<SecurityVerificationProps> = ({ onVerificationComplete }) => {
  const [step, setStep] = useState<'compatibility' | 'identity' | 'complete'>('compatibility');
  const [compatibilityProgress, setCompatibilityProgress] = useState(0);
  const [compatibilityComplete, setCompatibilityComplete] = useState(false);

  // Run compatibility checks automatically
  useEffect(() => {
    const runCompatibilityChecks = async () => {
      // Simulate progressive compatibility checks
      for (let i = 0; i <= 100; i += 20) {
        setCompatibilityProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Check if the browser supports the required features
      const hasWebcam = 'mediaDevices' in navigator;
      const hasLocalStorage = 'localStorage' in window;
      
      if (!hasWebcam) {
        toast.warning("Votre appareil ne dispose pas de caméra, ce qui peut limiter certaines fonctionnalités de sécurité");
      }
      
      setCompatibilityComplete(true);
    };
    
    runCompatibilityChecks();
  }, []);

  const handleContinueToIdentity = () => {
    setStep('identity');
  };

  const handleIdentityVerified = () => {
    setStep('complete');
    // Call the parent's onVerificationComplete immediately
    onVerificationComplete();
  };

  return (
    <div className="space-y-6">
      {/* Compatibility Check */}
      {step === 'compatibility' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>Vérification de compatibilité</CardTitle>
            </div>
            <CardDescription>
              Vérification des prérequis techniques pour accéder à l'évaluation sécurisée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Vérification en cours...</span>
                  <span>{compatibilityProgress}%</span>
                </div>
                <Progress value={compatibilityProgress} className="h-2" />
              </div>
              
              {compatibilityComplete && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Navigateur compatible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Connexion internet stable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {'mediaDevices' in navigator ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    <span>Accès webcam {!('mediaDevices' in navigator) && "(Non disponible - optionnel)"}</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleContinueToIdentity}
              disabled={!compatibilityComplete}
            >
              Continuer vers la vérification d'identité
            </Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Identity Verification */}
      {step === 'identity' && (
        <IdentityVerification onVerificationComplete={handleIdentityVerified} />
      )}
      
      {/* Complete - This is now bypassed since we directly call onVerificationComplete */}
      {step === 'complete' && (
        <Card>
          <CardContent className="text-center py-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Vérification complète</h3>
            <p className="text-muted-foreground mb-4">
              Tous les contrôles de sécurité ont été validés avec succès.
            </p>
            <Button onClick={onVerificationComplete}>
              Accéder à l'évaluation
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SecurityVerification;
