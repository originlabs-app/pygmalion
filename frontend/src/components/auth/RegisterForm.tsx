import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { RegisterRequest } from '@/services/authService';
import { toast } from 'sonner';
import { RegisterWizard } from './RegisterWizard';

// Define a subset of UserRole that's allowed for registration
export type RegisterUserRole = Extract<UserRole, 'student' | 'training_org' | 'manager' | 'airport_manager'>;

// Schéma simplifié pour Progressive Onboarding - Inscription minimale
const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  lastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Veuillez entrer une adresse email valide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  confirmPassword: z.string(),
  role: z.enum(['student', 'training_org', 'manager', 'airport_manager'] as const),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const roleParam = searchParams.get('role') as RegisterUserRole | null;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: (roleParam as RegisterUserRole) || 'student',
      acceptTerms: false,
    },
  });

  // Update role if URL param changes
  useEffect(() => {
    if (roleParam && ['student', 'training_org', 'manager', 'airport_manager'].includes(roleParam)) {
      form.setValue('role', roleParam);
    }
  }, [roleParam, form]);

  const selectedRole = form.watch('role') as RegisterUserRole;

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      // Préparer les données selon notre nouvelle interface RegisterRequest  
      const registerData: RegisterRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
        // organization sera ajoutée plus tard via le profil
      };

      // register retourne maintenant le message de confirmation
      const message = await register(registerData);
      
      // Afficher le message de confirmation reçu du backend
      toast.success(message);
      
      // Rediriger vers une page de confirmation email au lieu de se connecter
      navigate('/email-confirmation', { 
        state: { 
          email: data.email,
          role: data.role 
        } 
      });
      
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);

      const errorMessage = error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';

      // Affichage toast
      toast.error(errorMessage);

      // S'il s'agit d'un conflit (email déjà utilisé), on marque le champ email en erreur
      if (errorMessage.toLowerCase().includes('déjà utilisé')) {
        form.setError('email', {
          type: 'manual',
          message: 'Cet email est déjà utilisé',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return (
    <div className="max-w-md mx-auto w-full">
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <RegisterWizard 
            control={form.control}
            role={selectedRole}
            isSubmitting={isSubmitting}
            onSubmit={handleFormSubmit}
          />
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
