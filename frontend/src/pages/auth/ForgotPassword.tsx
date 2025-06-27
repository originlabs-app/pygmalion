import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Gestion du cooldown
  useEffect(() => {
    if (cooldownSeconds > 0) {
      const timer = setTimeout(() => {
        setCooldownSeconds(cooldownSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownSeconds]);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    if (cooldownSeconds > 0) {
      toast.error(`Veuillez attendre ${cooldownSeconds} secondes avant de réessayer`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await AuthService.forgotPassword({ email: data.email });
      setEmailSent(true);
      toast.success('Email envoyé avec succès');
    } catch (error: any) {
      // Si c'est une erreur de rate limiting, on démarre le cooldown
      if (error.message.includes('Trop de demandes')) {
        setCooldownSeconds(60); // 60 secondes de cooldown
        toast.error('Trop de demandes. Veuillez attendre 1 minute avant de réessayer.');
      } else {
        toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Email envoyé !</CardTitle>
              <CardDescription>
                Si cette adresse email est associée à un compte, vous recevrez un lien de réinitialisation.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Alert className="mb-4">
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Vérifiez votre boîte mail et cliquez sur le lien pour réinitialiser votre mot de passe.
                </AlertDescription>
              </Alert>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la connexion
                </Button>
              </Link>
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
            <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
            <CardDescription>
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading || cooldownSeconds > 0}>
                  {isLoading ? 'Envoi en cours...' : 
                   cooldownSeconds > 0 ? `Attendre ${cooldownSeconds}s` : 
                   'Envoyer le lien de réinitialisation'}
                </Button>
                
                {cooldownSeconds > 0 && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Pour des raisons de sécurité, vous devez attendre {cooldownSeconds} secondes avant de pouvoir renvoyer un email.
                    </AlertDescription>
                  </Alert>
                )}

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

export default ForgotPassword; 