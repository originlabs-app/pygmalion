
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Shield, AlertTriangle, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface IdentityVerificationProps {
  onVerificationComplete: () => void;
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({ onVerificationComplete }) => {
  const [verificationStep, setVerificationStep] = useState<'initial' | 'otp' | 'complete'>('initial');
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [examMode, setExamMode] = useState(false);

  const handleStartVerification = () => {
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      toast.success("Un code de vérification a été envoyé sur votre appareil mobile enregistré", {
        duration: 5000
      });
      setVerificationStep('otp');
      setIsLoading(false);
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (otpValue.length < 6) {
      toast.error("Veuillez entrer le code complet à 6 chiffres");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification - pour la démo, n'importe quel code à 6 chiffres sera accepté
    setTimeout(() => {
      // Accept any 6-digit code for demo purposes
      toast.success("Vérification d'identité réussie");
      setExamMode(true);
      toast.info("Mode examen activé - Surveillance renforcée en cours", {
        duration: 5000
      });
      setVerificationStep('complete');
      // Call the completion callback immediately to redirect to exam section
      onVerificationComplete();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle>Vérification d'identité</CardTitle>
        </div>
        <CardDescription>
          Pour garantir l'intégrité de votre évaluation, nous devons vérifier votre identité
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationStep === 'initial' && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md border border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Information importante</p>
                  <p className="text-amber-700">
                    Cette formation nécessite une vérification d'identité pour accéder à l'évaluation finale. 
                    Ce processus est obligatoire et conforme aux exigences réglementaires du secteur aéronautique.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted rounded-md mt-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">Le processus de vérification comprend :</p>
                  <ul className="list-disc pl-5 mt-1 text-muted-foreground space-y-1">
                    <li>Envoi d'un code à usage unique sur votre appareil mobile enregistré</li>
                    <li>Détection des activités suspectes pendant l'évaluation</li>
                    <li>Cryptage et protection de vos données conformément au RGPD</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {verificationStep === 'otp' && (
          <div className="space-y-6">
            <p className="text-center">
              Veuillez entrer le code à 6 chiffres envoyé à votre appareil mobile enregistré
            </p>
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Vous n'avez pas reçu de code ? <Button variant="link" className="p-0 h-auto">Renvoyer</Button>
            </p>
          </div>
        )}

        {verificationStep === 'complete' && (
          <div className="text-center py-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Vérification réussie</h3>
            <p className="text-muted-foreground">
              Votre identité a été confirmée. Vous pouvez maintenant accéder à l'évaluation.
            </p>
            {examMode && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 font-medium">Mode examen activé</p>
                <p className="text-sm text-blue-700">
                  La surveillance renforcée est active. Ne quittez pas cette page durant l'évaluation.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {verificationStep === 'initial' && (
          <Button 
            className="w-full" 
            onClick={handleStartVerification}
            disabled={isLoading}
          >
            {isLoading ? "Préparation de la vérification..." : "Commencer la vérification"}
          </Button>
        )}
        
        {verificationStep === 'otp' && (
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            onClick={handleVerifyOTP}
            disabled={isLoading || otpValue.length < 6}
          >
            {isLoading ? "Vérification en cours..." : "Vérifier le code"}
          </Button>
        )}
        
        {verificationStep === 'complete' && (
          <Button 
            className="w-full" 
            onClick={onVerificationComplete}
          >
            Accéder à l'évaluation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default IdentityVerification;
