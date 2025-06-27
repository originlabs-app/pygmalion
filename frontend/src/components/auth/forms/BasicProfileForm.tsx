
import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterFormValues } from '../RegisterForm';

interface BasicProfileFormProps {
  control: Control<RegisterFormValues>;
}

export const BasicProfileForm: React.FC<BasicProfileFormProps> = ({ control }) => {
  // Obtenir le rôle sélectionné pour afficher un message contextuel
  const selectedRole = useWatch({
    control,
    name: 'role',
    defaultValue: 'student'
  });
  
  const getRoleMessage = (role: string) => {
    switch (role) {
      case 'student':
        return {
          title: '🎓 Compte Apprenant',
          description: 'Accédez aux formations, suivez vos certifications et développez vos compétences.'
        };
              case 'training_org':
        return {
          title: '🏢 Organisme de Formation', 
          description: 'Créez et gérez vos formations, suivez vos apprenants et développez votre activité.'
        };
      case 'manager':
        return {
          title: '👨‍💼 Manager d\'Entreprise',
          description: 'Gérez les formations de votre équipe et assurez la conformité réglementaire.'
        };
      case 'airport_manager':
        return {
          title: '✈️ Gestionnaire d\'Aéroport',
          description: 'Supervisez la conformité formations de toutes les entreprises sur votre site.'
        };
      default:
        return {
          title: '🚀 Rejoignez PYGMALION',
          description: 'La plateforme de référence pour la formation aéronautique.'
        };
    }
  };

  const roleMessage = getRoleMessage(selectedRole);

  return (
    <>
      {/* Message contextuel selon le rôle */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-900 mb-1">{roleMessage.title}</h4>
        <p className="text-sm text-blue-700">{roleMessage.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
          name="firstName"
        render={({ field }) => (
          <FormItem>
              <FormLabel>Prénom</FormLabel>
            <FormControl>
                <Input placeholder="Votre prénom" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom de famille" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="votre@email.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />



      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type de compte</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre type de compte" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="student">Étudiant Individuel</SelectItem>
                <SelectItem value="training_org">Organisme de Formation</SelectItem>
                <SelectItem value="manager">Manager d'Entreprise</SelectItem>
                <SelectItem value="airport_manager">Gestionnaire d'Aéroport</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Sélectionnez le type de compte que vous souhaitez créer
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
