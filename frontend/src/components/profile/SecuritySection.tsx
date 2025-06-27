import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { AuthService } from '@/services/authService';
import { toast } from 'sonner';
import { Shield, Key, Smartphone, Eye, EyeOff, Mail } from 'lucide-react';
import MFAStatusCard from './MFAStatusCard';
import { supabase } from '@/services/supabaseService';
import { PasswordInput } from '@/components/ui/password-input';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Mot de passe actuel requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string().min(1, 'Confirmation requise'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const emailSchema = z.object({
  newEmail: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
  password: z.string().min(1, 'Mot de passe requis pour confirmer le changement'),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;

const SecuritySection: React.FC = () => {
  const { currentUser, refreshUser } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail: '',
      password: '',
    },
  });

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsChangingPassword(true);
    try {
      await AuthService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success('Mot de passe mis à jour avec succès');
      passwordForm.reset();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const onEmailSubmit = async (data: EmailFormValues) => {
    setIsChangingEmail(true);
    try {
      // 1. Authentifier l'utilisateur avec Supabase pour obtenir une session
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: data.password,
      });

      if (signInError) {
        throw new Error('Mot de passe incorrect.');
      }

      // 2. Mettre à jour l'email avec la session Supabase active
      const { error: updateError } = await supabase.auth.updateUser({
        email: data.newEmail,
      }, {
        emailRedirectTo: `${window.location.origin}/auth-callback`
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      // 3. Déconnexion de la session Supabase pour ne pas interférer
      await supabase.auth.signOut();

      toast.success('Demande de changement d\'email envoyée ! Veuillez vérifier votre nouvelle boîte de réception.');
      emailForm.reset();
      
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour de l\'adresse email');
    } finally {
      setIsChangingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Changement de mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Mot de passe
          </CardTitle>
          <CardDescription>
            Modifiez votre mot de passe pour sécuriser votre compte
          </CardDescription>
        </CardHeader>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <PasswordInput
                id="currentPassword"
                placeholder="••••••••"
                {...passwordForm.register('currentPassword')}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-red-600">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <PasswordInput
                  id="newPassword"
                  placeholder="••••••••"
                  {...passwordForm.register('newPassword')}
                />
                {passwordForm.formState.errors.newPassword && (
                  <p className="text-sm text-red-600">
                    {passwordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="••••••••"
                  {...passwordForm.register('confirmPassword')}
                />
                {passwordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-600">
                    {passwordForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Votre mot de passe doit contenir au moins 8 caractères. 
                Utilisez une combinaison de lettres, chiffres et symboles pour plus de sécurité.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isChangingPassword}
              className="ml-auto"
            >
              {isChangingPassword ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Separator />

      {/* Changement d'adresse email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Adresse email
          </CardTitle>
          <CardDescription>
            Modifiez votre adresse email. Un email de confirmation sera envoyé à la nouvelle adresse.
          </CardDescription>
        </CardHeader>
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentEmail">Adresse email actuelle</Label>
              <Input
                id="currentEmail"
                type="email"
                value={currentUser?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newEmail">Nouvelle adresse email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  placeholder="nouvelle@email.com"
                  {...emailForm.register('newEmail')}
                />
                {emailForm.formState.errors.newEmail && (
                  <p className="text-sm text-red-600">
                    {emailForm.formState.errors.newEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailPassword">Mot de passe pour confirmer</Label>
                <PasswordInput
                  id="emailPassword"
                  placeholder="••••••••"
                  {...emailForm.register('password')}
                />
                {emailForm.formState.errors.password && (
                  <p className="text-sm text-red-600">
                    {emailForm.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                Un email de confirmation sera envoyé à votre nouvelle adresse. 
                Vous devrez confirmer le changement en cliquant sur le lien reçu.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isChangingEmail}
              className="ml-auto"
            >
              {isChangingEmail ? 'Mise à jour...' : 'Mettre à jour l\'email'}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Separator />

      {/* Section MFA */}
      <MFAStatusCard />
    </div>
  );
};

export default SecuritySection; 