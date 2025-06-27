
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUpload } from '@/components/ui/file-upload';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Schéma de validation pour le formulaire d'informations de base
export const profileInfoSchema = z.object({
  orgName: z.string().min(2, "Le nom de l'organisme est requis"),
  description: z.string().min(10, "Une description d'au moins 10 caractères est requise"),
  website: z.string().url("L'URL doit être valide").or(z.string().max(0)),
  contactEmail: z.string().email("L'email doit être valide"),
  contactPhone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
  contactName: z.string().min(2, "Le nom du contact est requis"),
});

export type ProfileInfoFormValues = z.infer<typeof profileInfoSchema>;

interface ProfileInfoProps {
  defaultValues: Partial<ProfileInfoFormValues>;
  onSubmit: (data: ProfileInfoFormValues) => Promise<void>;
  isSaving: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ defaultValues, onSubmit, isSaving }) => {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const form = useForm<ProfileInfoFormValues>({
    resolver: zodResolver(profileInfoSchema),
    defaultValues,
  });

  const handleLogoUpload = (file: File) => {
    setLogoFile(file);
  };

  const handleSubmit = async (data: ProfileInfoFormValues) => {
    await onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil de l'organisme</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Logo de l'organisme</h3>
                <FileUpload
                  onFileSelected={handleLogoUpload}
                  acceptedFileTypes=".jpg,.jpeg,.png"
                  maxSizeInMB={5}
                  label="Choisir un logo"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Format recommandé: PNG ou JPEG, 512x512px minimum
                </p>
              </div>

              <FormField
                control={form.control}
                name="orgName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l'organisme</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Ce champ ne peut pas être modifié directement après validation
                    </p>
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
                        {...field}
                        placeholder="Décrivez votre organisme de formation..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <h3 className="text-lg font-medium pt-4 mb-4">Coordonnées de contact public</h3>
              
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du contact</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Nom et prénom" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contact</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="contact@votreorganisme.com" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone de contact</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="01 23 45 67 89" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
