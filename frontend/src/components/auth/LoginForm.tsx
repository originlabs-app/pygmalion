import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { useNavigate, Link } from 'react-router-dom';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { getDashboardRoute } from '@/utils/navigation';
import { PasswordInput } from '@/components/ui/password-input';

const loginSchema = z.object({
  email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  otpCode: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { login, mfaRequired, setMfaRequired } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attemptingMFA, setAttemptingMFA] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      otpCode: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    logger.info('🔐 LoginForm: Tentative de connexion avec:', {
      email: data.email,
      hasOtpCode: !!data.otpCode,
      otpCode: data.otpCode,
      mfaRequired: mfaRequired
    });
    
    try {
      const loggedInUser = await login(data.email, data.password, data.otpCode);
      
      logger.info('✅ LoginForm: Connexion réussie pour:', loggedInUser.email);
      logger.info('👤 Utilisateur connecté:', {
        id: loggedInUser.id,
        email: loggedInUser.email,
        mfaEnabled: loggedInUser.mfaEnabled,
        role: loggedInUser.role
      });
      
      toast.success('Connexion réussie !');
      
      // Redirection vers le dashboard spécifique au rôle
      const dashboardRoute = getDashboardRoute(loggedInUser.role);
      logger.info('🚀 LoginForm: Redirection vers:', dashboardRoute);
      
      // Attendre un peu avant la redirection pour s'assurer que les données sont stockées
      setTimeout(() => {
        navigate(dashboardRoute);
      }, 100);
      
    } catch (error: any) {
      logger.error('❌ LoginForm: Erreur de connexion:', error);
      logger.info('🔍 LoginForm: Détails erreur:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.message === 'MFA_REQUIRED') {
        logger.info('🔒 LoginForm: MFA requis détecté');
        setMfaRequired(true);
        setAttemptingMFA(true);
        toast.info('Veuillez entrer votre code d\'authentification');
        // Focus sur le champ OTP
        setTimeout(() => {
          const otpInput = document.querySelector('input[name="otpCode"]') as HTMLInputElement;
          if (otpInput) otpInput.focus();
        }, 100);
      } else {
        logger.info('❌ LoginForm: Autre erreur:', error.message);
        toast.error(error.message || 'Erreur lors de la connexion. Vérifiez vos identifiants.');
        setMfaRequired(false);
        setAttemptingMFA(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMFAState = () => {
    setMfaRequired(false);
    setAttemptingMFA(false);
    form.setValue('otpCode', '');
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="votre@email.com" 
                    type="email"
                    disabled={attemptingMFA}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MFA Code Field - Affiché seulement si MFA requis */}
          {mfaRequired && (
            <>
              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Authentification à deux facteurs requise. Entrez le code à 6 chiffres depuis votre application d'authentification.
                </AlertDescription>
              </Alert>
              
              <FormField
                control={form.control}
                name="otpCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code d'authentification</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123456" 
                        maxLength={6}
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="text-center text-lg tracking-wider"
                        {...field}
                        onChange={(e) => {
                          // Ne permettre que les chiffres
                          const value = e.target.value.replace(/\D/g, '');
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={resetMFAState}
                className="w-full"
              >
                Revenir à la connexion
              </Button>
            </>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              mfaRequired ? 'Vérification...' : 'Connexion...'
            ) : (
              mfaRequired ? 'Vérifier le code' : 'Se connecter'
            )}
          </Button>

          {/* Forgot Password Link */}
          {!mfaRequired && (
            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
