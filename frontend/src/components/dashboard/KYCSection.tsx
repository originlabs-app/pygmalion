
import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface KYCSectionProps {
  isVerified: boolean;
}

const formSchema = z.object({
  fullName: z.string().min(2, 'Le nom complet est requis'),
  idNumber: z.string().min(2, 'Le numéro d\'identité est requis'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format de date requis (YYYY-MM-DD)'),
});

const KYCSection: React.FC<KYCSectionProps> = ({ isVerified }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!uploadedFile) {
      toast.error('Veuillez télécharger une pièce d\'identité');
      return;
    }

    setSubmitting(true);
    
    // Simuler une requête API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Informations KYC soumises avec succès', {
        description: 'Votre identité sera vérifiée dans les plus brefs délais.',
      });
      form.reset();
      setUploadedFile(null);
    } catch (error) {
      toast.error('Une erreur est survenue');
      logger.error('KYC submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isVerified ? (
              <ShieldCheck className="h-5 w-5 text-green-500" />
            ) : (
              <Shield className="h-5 w-5 text-orange-500" />
            )}
            <CardTitle>Vérification d'identité (KYC)</CardTitle>
          </div>
          <Badge variant={isVerified ? "outline" : "secondary"}>
            {isVerified ? 'Vérifié' : 'Non vérifié'}
          </Badge>
        </div>
        <CardDescription>
          {isVerified 
            ? 'Votre identité a été vérifiée. Vous avez accès complet à toutes les fonctionnalités de formation.' 
            : 'Veuillez soumettre vos informations d\'identité pour accéder à toutes les fonctionnalités de formation.'}
        </CardDescription>
      </CardHeader>
      
      {isVerified ? (
        <CardFooter className="bg-muted/20">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Vérifié le 19/05/2025</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/verification/kyc">Voir les détails</Link>
            </Button>
          </div>
        </CardFooter>
      ) : (
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            En savoir plus
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/verification/kyc">Compléter la vérification</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default KYCSection;
