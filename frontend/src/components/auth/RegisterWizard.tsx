import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RegisterFormValues, RegisterUserRole } from './RegisterForm';
import { BasicProfileForm } from './forms/BasicProfileForm';
import { TermsAndConditions } from './forms/TermsAndConditions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PasswordInput } from '../ui/password-input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface RegisterWizardProps {
  control: Control<RegisterFormValues>;
  role: RegisterUserRole;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export const RegisterWizard: React.FC<RegisterWizardProps> = ({ 
  control, 
  role, 
  isSubmitting, 
  onSubmit 
}) => {
  const [currentStep, setCurrentStep] = useState<string>('account');
  
  // Define steps - Progressive Onboarding: 2 étapes pour tous
  const steps: Record<RegisterUserRole, string[]> = {
    'student': ['account', 'terms'],
    'training_org': ['account', 'terms'],
    'manager': ['account', 'terms'],
          'airport_manager': ['account', 'terms'],
  };
  
  const currentStepIndex = steps[role].indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps[role].length - 1;
  
  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps[role].length) {
      setCurrentStep(steps[role][nextStepIndex]);
    }
  };
  
  const handlePrevious = () => {
    const prevStepIndex = currentStepIndex - 1;
    if (prevStepIndex >= 0) {
      setCurrentStep(steps[role][prevStepIndex]);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'account':
        return (
          <div className="space-y-4">
            <div className="text-lg font-medium">Créer votre compte</div>
            <div className="text-sm text-muted-foreground mb-4">
              Commencez votre expérience PYGMALION en quelques secondes. Vous pourrez compléter votre profil après l'inscription.
            </div>
            <BasicProfileForm control={control} />
            <FormField
              control={control}
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
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4">
            <div className="text-lg font-medium">Finaliser l'inscription</div>
            <div className="text-sm text-muted-foreground mb-4">
              Acceptez nos conditions d'utilisation pour accéder à la plateforme.
            </div>
            <TermsAndConditions control={control} />
          </div>
        );
      default:
        return <BasicProfileForm control={control} />;
    }
  };
  
  // Create step indicators
  const renderStepIndicators = () => {
    return (
      <TabsList className="mb-8 w-full">
        {steps[role].map((step, index) => {
          let label = '';
          switch (step) {
            case 'account':
              label = 'Compte';
              break;
            case 'terms':
              label = 'Finaliser';
              break;
          }
          
          return (
            <TabsTrigger
              key={step}
              value={step}
              className="flex-1"
              disabled
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border">
                {index + 1}
              </span>
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    );
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={currentStep} className="w-full">
        {renderStepIndicators()}
        
        <TabsContent value={currentStep} className="mt-4">
          {renderStepContent()}
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-8">
        {!isFirstStep ? (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            className="mr-2"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        ) : (
          <div></div>
        )}
        
        {isLastStep ? (
          <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
        ) : (
          <Button type="button" onClick={handleNext}>
            Suivant
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
