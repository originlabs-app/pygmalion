import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, Smartphone, QrCode, Shield, CheckCircle, Copy, Download } from 'lucide-react';

const otpSchema = z.object({
  otpCode: z.string().length(6, 'Le code OTP doit contenir exactement 6 chiffres').regex(/^\d+$/, 'Le code doit contenir uniquement des chiffres'),
});

type OTPFormValues = z.infer<typeof otpSchema>;

const SetupMFA: React.FC = () => {
  const { setupMFA, enableMFA } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup');
  const [mfaData, setMfaData] = useState<{ secret: string; qrCodeDataUrl: string } | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otpCode: '',
    },
  });

  useEffect(() => {
    loadMFASetup();
  }, []);

  const loadMFASetup = async () => {
    setIsLoading(true);
    try {
      const data = await setupMFA();
      setMfaData(data);
    } catch (error: unknown) {
      toast.error(error.message || 'Erreur lors de la configuration MFA');
      navigate('/profile');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifySubmit = async (data: OTPFormValues) => {
    if (!mfaData) return;

    setIsLoading(true);
    try {
      const result = await enableMFA(data.otpCode);
      setBackupCodes(result.backupCodes || []);
      setStep('complete');
      toast.success('MFA activé avec succès !');
    } catch (error: unknown) {
      toast.error(error.message || 'Code OTP invalide');
    } finally {
      setIsLoading(false);
    }
  };

  const copySecret = () => {
    if (mfaData?.secret) {
      navigator.clipboard.writeText(mfaData.secret);
      toast.success('Code secret copié dans le presse-papiers');
    }
  };

  const downloadBackupCodes = () => {
    const content = `Codes de récupération MFA - PYGMALION\n\nConservez ces codes en lieu sûr. Chaque code ne peut être utilisé qu'une seule fois.\n\n${backupCodes.join('\n')}\n\nGénérés le : ${new Date().toLocaleDateString('fr-FR')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pygmalion-backup-codes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Codes de récupération téléchargés');
  };

  const handleComplete = () => {
    navigate('/profile?tab=security');
  };

  if (isLoading && !mfaData) {
    return (
      <Layout>
        <div className="container py-12 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-muted-foreground">Configuration de l'authentification multi-facteurs...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/profile')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au profil
          </Button>
          <h1 className="text-3xl font-bold">Configuration MFA</h1>
          <p className="text-muted-foreground">
            Sécurisez votre compte avec l'authentification multi-facteurs
          </p>
        </div>

        {step === 'setup' && mfaData && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Étape 1 : Scanner le QR Code
                </CardTitle>
                <CardDescription>
                  Utilisez votre application d'authentification pour scanner ce QR code
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <img 
                      src={mfaData.qrCodeDataUrl} 
                      alt="QR Code MFA" 
                      className="w-48 h-48"
                    />
                  </div>
                  
                  <Alert>
                    <Smartphone className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Applications recommandées :</strong><br />
                      • Google Authenticator<br />
                      • Microsoft Authenticator<br />
                      • Authy<br />
                      • 1Password<br />
                      • Bitwarden
                    </AlertDescription>
                  </Alert>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Code secret (si vous ne pouvez pas scanner le QR code)</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={mfaData.secret} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="sm" onClick={copySecret}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Entrez ce code manuellement dans votre application d'authentification
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Étape 2 : Vérifier la configuration
                </CardTitle>
                <CardDescription>
                  Entrez le code à 6 chiffres généré par votre application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onVerifySubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otpCode">Code de vérification</Label>
                    <Input
                      id="otpCode"
                      placeholder="123456"
                      maxLength={6}
                      className="text-center text-lg font-mono tracking-widest"
                      {...form.register('otpCode')}
                    />
                    {form.formState.errors.otpCode && (
                      <p className="text-sm text-red-600">
                        {form.formState.errors.otpCode.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Vérification...' : 'Activer MFA'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  MFA activé avec succès !
                </CardTitle>
                <CardDescription>
                  Votre compte est maintenant protégé par l'authentification multi-facteurs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    À partir de maintenant, vous devrez entrer un code de votre application 
                    d'authentification à chaque connexion.
                  </AlertDescription>
                </Alert>

                {backupCodes.length > 0 && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Codes de récupération</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Conservez ces codes en lieu sûr. Ils vous permettront d'accéder à votre compte 
                        si vous perdez votre appareil d'authentification.
                      </p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                        {backupCodes.map((code, index) => (
                          <div key={index} className="text-center py-1">
                            {code}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" onClick={downloadBackupCodes} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger les codes de récupération
                    </Button>
                  </div>
                )}

                <Button onClick={handleComplete} className="w-full">
                  Terminer la configuration
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SetupMFA; 