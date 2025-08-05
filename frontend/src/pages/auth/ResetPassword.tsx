import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthService } from '@/services/authService';
import { toast } from 'sonner';
import { Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { SupabaseAuthService } from '@/services/supabaseService';
import { PasswordInput } from '@/components/ui/password-input';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  confirmPassword: z.string().min(1, { message: 'Veuillez confirmer votre mot de passe' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  // Récupération des paramètres depuis le hash fragment (Supabase utilise #, pas ?)
  const getHashParams = () => {
    const hash = location.hash.substring(1); // Retire le #
    const params = new URLSearchParams(hash);
    return {
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token'),
      type: params.get('type'),
      tokenHash: params.get('token_hash'),
    };
  };

  const { accessToken, refreshToken, type, tokenHash } = getHashParams();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const initializeSession = async () => {
      logger.info('🔍 ResetPassword: Paramètres URL:', {
        accessToken: accessToken ? accessToken.substring(0, 20) + '...' : null,
        type,
        tokenHash: tokenHash ? tokenHash.substring(0, 20) + '...' : null,
        fullHash: location.hash
      });

      // Vérifier si nous avons les paramètres nécessaires pour la réinitialisation
      if (type === 'recovery' && (accessToken || refreshToken)) {
        logger.info('✅ ResetPassword: Tokens valides détectés');
        
        try {
          // Établir la session Supabase avec les tokens de l'URL
          const { SupabaseAuthService } = await import('@/services/supabaseService');
          
          if (accessToken && refreshToken) {
            // Établir la session avec les tokens
            const session = await SupabaseAuthService.setSession(accessToken, refreshToken);
            
            if (session) {
              logger.info('✅ ResetPassword: Session Supabase établie avec tokens');
              setTokenValid(true);
            } else {
              logger.info('❌ ResetPassword: Impossible d\'établir la session avec tokens');
              setTokenValid(false);
            }
          } else {
            // Vérifier si une session existe déjà
            const session = await SupabaseAuthService.getSession();
            
            if (session) {
              logger.info('✅ ResetPassword: Session Supabase existante trouvée');
              setTokenValid(true);
            } else {
              logger.info('❌ ResetPassword: Aucune session trouvée');
              setTokenValid(false);
            }
          }
        } catch (error) {
          logger.error('❌ Erreur lors de l\'établissement de la session:', error);
          setTokenValid(false);
        }
      } else {
        logger.info('❌ ResetPassword: Tokens manquants ou invalides');
        setTokenValid(false);
      }
    };

    initializeSession();
  }, [accessToken, refreshToken, type, tokenHash, location.hash]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!tokenValid) {
      toast.error('Token de réinitialisation invalide');
      return;
    }

    setIsLoading(true);
    try {
      // Pour Supabase, nous utilisons le token de l'URL
      const token = accessToken || tokenHash || '';
      
      await AuthService.resetPassword({
        token,
        newPassword: data.newPassword,
      });

      setResetSuccess(true);
      toast.success('Mot de passe réinitialisé avec succès');
    } catch (error: unknown) {
      toast.error(error.message || 'Erreur lors de la réinitialisation du mot de passe');
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValid === null) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Vérification du lien de réinitialisation...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (tokenValid === false) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl">Lien invalide</CardTitle>
              <CardDescription>
                Ce lien de réinitialisation est invalide ou a expiré.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Veuillez faire une nouvelle demande de réinitialisation de mot de passe.
                </AlertDescription>
              </Alert>
              <div className="space-y-2">
                <Link to="/forgot-password">
                  <Button className="w-full">
                    Nouvelle demande de réinitialisation
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (resetSuccess) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Mot de passe réinitialisé !</CardTitle>
              <CardDescription>
                Votre mot de passe a été mis à jour avec succès.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                </AlertDescription>
              </Alert>
              <Button onClick={() => navigate('/login')} className="w-full">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Nouveau mot de passe</CardTitle>
            <CardDescription>
              Entrez votre nouveau mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Votre mot de passe doit contenir au moins 8 caractères. 
                    Utilisez une combinaison de lettres, chiffres et symboles pour plus de sécurité.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Mise à jour...' : 'Réinitialiser le mot de passe'}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="mr-1 h-3 w-3 inline" />
                    Retour à la connexion
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ResetPassword; 