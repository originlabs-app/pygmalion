import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { 
  TrainingOrganization, 
  CreateTrainingOrgRequest, 
  UpdateTrainingOrgRequest 
} from '@/services/trainingOrgService';

// Schéma de validation pour le formulaire
const trainingOrgSchema = z.object({
  name: z.string()
    .min(2, "Le nom de l'organisme doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  siret: z.string()
    .min(14, "Le SIRET doit contenir 14 chiffres")
    .max(14, "Le SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le SIRET ne doit contenir que des chiffres")
    .transform((val) => val.replace(/\s/g, '')), // Supprimer les espaces automatiquement
  description: z.string()
    .min(50, "La description doit contenir au moins 50 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  website: z.string()
    .url("L'URL du site web n'est pas valide")
    .optional()
    .or(z.literal("")),
  contactEmail: z.string()
    .email("L'adresse email n'est pas valide")
    .max(100, "L'email ne peut pas dépasser 100 caractères"),
  contactPhone: z.string()
    .transform((val) => val.replace(/[\s\-\.]/g, '')) // D'abord nettoyer
    .refine((val) => val.length >= 10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .refine((val) => /^(?:\+33|0)[1-9][0-9]{8}$/.test(val), "Format attendu : 0123456789 ou +33123456789"),
  contactName: z.string()
    .min(2, "Le nom du contact doit contenir au moins 2 caractères")
    .max(100, "Le nom du contact ne peut pas dépasser 100 caractères"),
});

export type TrainingOrgFormValues = z.infer<typeof trainingOrgSchema>;

interface TrainingOrgFormProps {
  initialData?: TrainingOrganization;
  onSubmit: (data: CreateTrainingOrgRequest | UpdateTrainingOrgRequest) => Promise<void>;
  isLoading?: boolean;
  mode: 'create' | 'edit';
}

const TrainingOrgForm: React.FC<TrainingOrgFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  mode
}) => {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TrainingOrgFormValues>({
    resolver: zodResolver(trainingOrgSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      siret: initialData?.siret ?? '',
      description: initialData?.description ?? '',
      website: initialData?.website ?? '',
      contactEmail: initialData?.contactEmail ?? '',
      contactPhone: initialData?.contactPhone ?? '',
      contactName: initialData?.contactName ?? '',
    },
  });

  // Réinitialiser le formulaire quand les données initiales changent
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name ?? '',
        siret: initialData.siret ?? '',
        description: initialData.description ?? '',
        website: initialData.website ?? '',
        contactEmail: initialData.contactEmail ?? '',
        contactPhone: initialData.contactPhone ?? '',
        contactName: initialData.contactName ?? '',
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: TrainingOrgFormValues) => {
    try {
      setSubmitError(null);
      logger.info('📤 Données envoyées:', data);
      await onSubmit(data);
    } catch (error: unknown) {
      logger.error('❌ Erreur lors de la soumission:', error);
      logger.error('📋 Détails de l\'erreur:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Une erreur est survenue lors de la sauvegarde';
      
      setSubmitError(errorMessage);
      
      // Toast d'erreur détaillé
      if (error.response?.status === 400) {
        toast.error(`Erreur de validation : ${errorMessage}`);
      } else if (error.response?.status === 404) {
        toast.error('Profil non trouvé. Veuillez créer un nouveau profil.');
      } else if (error.response?.status >= 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        toast.error(`Erreur : ${errorMessage}`);
      }
    }
  };

  const getStatusBadge = () => {
    if (!initialData) return null;

    switch (initialData.status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Vérifié
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente de validation
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejeté
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {mode === 'create' ? 'Créer votre profil d\'organisme de formation' : 'Modifier le profil'}
          </CardTitle>
          {getStatusBadge()}
        </div>
        {mode === 'create' && (
          <p className="text-sm text-muted-foreground">
            Remplissez les informations de votre organisme pour commencer le processus de validation.
          </p>
        )}
      </CardHeader>
      <CardContent>
        {submitError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        {initialData?.status === 'rejected' && initialData.rejectionReason && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Motif du rejet :</strong> {initialData.rejectionReason}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Informations générales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations générales</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'organisme *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Ex: Formation Aéronautique Pro"
                        disabled={isLoading || (mode === 'edit' && initialData?.status === 'verified')}
                      />
                    </FormControl>
                    <FormDescription>
                      Le nom officiel de votre organisme de formation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="siret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIRET *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="12345678901234"
                        maxLength={14}
                        disabled={isLoading || (mode === 'edit' && initialData?.status === 'verified')}
                      />
                    </FormControl>
                    <FormDescription>
                      14 chiffres sans espaces ni tirets
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description de l'organisme *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Décrivez votre organisme de formation, vos spécialités, votre expérience..."
                        className="min-h-[120px]"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum 50 caractères - Cette description sera visible par les apprenants
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site web (optionnel)</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://www.votresite.com"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      URL complète de votre site web
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Informations de contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact public</h3>
              <p className="text-sm text-muted-foreground">
                Ces informations seront visibles par les apprenants pour vous contacter.
              </p>
              
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du contact *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Marie Dupont"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Nom et prénom de la personne à contacter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contact *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        type="email"
                        placeholder="contact@votreorganisme.com"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Adresse email pour les demandes d'information
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone de contact *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="01 23 45 67 89"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Numéro de téléphone français (fixe ou mobile)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="min-w-[150px]"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {mode === 'create' ? 'Création...' : 'Enregistrement...'}
                  </>
                ) : (
                  mode === 'create' ? 'Créer le profil' : 'Enregistrer les modifications'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TrainingOrgForm; 