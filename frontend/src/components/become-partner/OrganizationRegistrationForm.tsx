
import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { FileUpload } from '@/components/ui/file-upload';

const organizationRegistrationSchema = z.object({
  orgName: z.string().min(2, { message: 'Le nom de l\'organisation doit contenir au moins 2 caractères' }),
  siret: z.string().min(14, { message: 'Le numéro SIRET doit contenir 14 chiffres' }).max(14),
  address: z.string().min(5, { message: 'Veuillez fournir une adresse complète' }),
  contactFirstName: z.string().min(2, { message: 'Le prénom doit contenir au moins 2 caractères' }),
  contactLastName: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Veuillez fournir un email valide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  confirmPassword: z.string(),
  phone: z.string().min(10, { message: 'Veuillez fournir un numéro de téléphone valide' }),
  description: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions générales et le contrat de partenariat'
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type OrganizationRegistrationFormValues = z.infer<typeof organizationRegistrationSchema>;

interface OrganizationRegistrationFormProps {
  onSuccess: () => void;
}

const OrganizationRegistrationForm: React.FC<OrganizationRegistrationFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kbisFile, setKbisFile] = useState<File | null>(null);
  const [qualiopisFile, setQualiopisFile] = useState<File | null>(null);
  const [presentationFile, setPresentationFile] = useState<File | null>(null);

  const form = useForm<OrganizationRegistrationFormValues>({
    resolver: zodResolver(organizationRegistrationSchema),
    defaultValues: {
      orgName: '',
      siret: '',
      address: '',
      contactFirstName: '',
      contactLastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      description: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data: OrganizationRegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      // Dans un cas réel, nous enverrions ces données à l'API
      logger.info("Form data submitted:", data);
      logger.info("Kbis file:", kbisFile);
      logger.info("Qualiopi certificate:", qualiopisFile);
      logger.info("Presentation file:", presentationFile);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Votre demande a été envoyée avec succès! Elle sera examinée par notre équipe.');
      onSuccess();
    } catch (error) {
      logger.error("Error submitting form:", error);
      toast.error('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (file: File, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    setter(file);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-lg font-medium mb-4">Informations de l'organisme</h2>
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="orgName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l'organisme*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de votre organisme de formation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="siret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro SIRET*</FormLabel>
                  <FormControl>
                    <Input placeholder="14 chiffres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse complète*</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Adresse postale complète" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de l'organisme</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Présentez brièvement votre organisme et vos spécialités dans le domaine aéronautique" 
                      className="h-20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-lg font-medium mb-4">Informations du contact principal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom*</FormLabel>
                  <FormControl>
                    <Input placeholder="Prénom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom*</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="Email professionnel" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Servira comme identifiant de connexion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone*</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro de téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe*</FormLabel>
                  <FormControl>
                    <Input placeholder="8 caractères minimum" type="password" {...field} />
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
                  <FormLabel>Confirmer le mot de passe*</FormLabel>
                  <FormControl>
                    <Input placeholder="Répéter le mot de passe" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="p-6 bg-muted/50 rounded-lg border">
          <h2 className="text-lg font-medium mb-4">Documents justificatifs</h2>
          
          <div className="space-y-6">
            <div>
              <FormLabel>Extrait Kbis (ou équivalent)*</FormLabel>
              <FileUpload 
                onFileSelected={(file) => handleFileUpload(file, setKbisFile)}
                acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                maxSizeInMB={5}
              />
            </div>

            <div>
              <FormLabel>Certification Qualiopi (si applicable)</FormLabel>
              <FileUpload 
                onFileSelected={(file) => handleFileUpload(file, setQualiopisFile)}
                acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
                maxSizeInMB={5}
              />
            </div>

            <div>
              <FormLabel>Document de présentation de l'organisme</FormLabel>
              <FileUpload 
                onFileSelected={(file) => handleFileUpload(file, setPresentationFile)}
                acceptedFileTypes=".pdf,.ppt,.pptx,.doc,.docx"
                maxSizeInMB={10}
              />
            </div>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  J'accepte les <a href="#" className="text-primary underline">Conditions Générales</a> et le <a href="#" className="text-primary underline">Contrat de Partenariat</a> *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Soumettre ma candidature'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OrganizationRegistrationForm;
