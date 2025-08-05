
import React from 'react';
import logger from '@/services/logger.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  email: z.string().email('Veuillez saisir une adresse email valide'),
  organization: z.string().min(2, 'Le nom de l\'organisation doit comporter au moins 2 caractères'),
  phone: z.string().min(5, 'Veuillez saisir un numéro de téléphone valide'),
  subject: z.enum(['devenir-partenaire', 'formation-specifique', 'entreprise', 'aeroport', 'autre']),
  message: z.string().min(10, 'Votre message doit comporter au moins 10 caractères'),
  formationType: z.enum(['presentiel', 'elearning', 'hybride', 'non-applicable']),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      organization: '',
      phone: '',
      subject: 'devenir-partenaire',
      message: '',
      formationType: 'non-applicable',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      // Dans une implémentation réelle, vous appelleriez votre API ici
      logger.info('Données du formulaire soumises:', data);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Votre message a été envoyé avec succès. Notre équipe vous contactera prochainement.');
      form.reset();
    } catch (error) {
      logger.error('Erreur lors de l\'envoi du formulaire:', error);
      toast.error('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    }
  };

  const subjectSelected = form.watch('subject');

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
          <p className="text-muted-foreground mb-8">
            Besoin d'informations complémentaires ? Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>

          <div className="bg-card border rounded-lg p-6 mb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom et prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email professionnel</FormLabel>
                        <FormControl>
                          <Input placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organisation</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de votre organisation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre numéro de téléphone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet de votre demande</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="devenir-partenaire">Devenir organisme de formation partenaire</SelectItem>
                          <SelectItem value="formation-specifique">Demande de formation spécifique</SelectItem>
                          <SelectItem value="entreprise">Offre entreprise</SelectItem>
                          <SelectItem value="aeroport">Gestion aéroportuaire</SelectItem>
                          <SelectItem value="autre">Autre demande</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(subjectSelected === 'devenir-partenaire' || subjectSelected === 'formation-specifique') && (
                  <FormField
                    control={form.control}
                    name="formationType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Type de formation proposée</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="presentiel" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Présentiel
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="elearning" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                E-Learning
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="hybride" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Formation hybride
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre demande en détail. Pour les organismes de formation, précisez vos spécialités et vos certifications." 
                          className="min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        En soumettant ce formulaire, vous acceptez que MBAVIATION traite vos données afin de vous recontacter.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">Assistance commerciale</h3>
              <p className="text-sm text-muted-foreground">
                commercial@mbaviation.com<br />
                +33 (0)1 XX XX XX XX
              </p>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">Support technique</h3>
              <p className="text-sm text-muted-foreground">
                support@mbaviation.com<br />
                +33 (0)1 XX XX XX XX
              </p>
            </div>
            
            <div className="p-4 border rounded-lg text-center">
              <h3 className="font-semibold mb-2">Adresse</h3>
              <p className="text-sm text-muted-foreground">
                123 Avenue de l'Aviation<br />
                75001 Paris, France
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
