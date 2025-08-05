
import React from 'react';
import logger from '@/services/logger.service';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Session } from '@/types';
import { sessionSchema, SessionFormValues } from './sessionSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface SessionFormProps {
  courseId: string;
  courseType: 'online' | 'in-person' | 'virtual' | 'blended';
  onAddSession: (courseId: string, session: Omit<Session, 'id'>) => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ courseId, courseType, onAddSession }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      startDate: '',
      endDate: '',
      location: courseType === 'online' ? 'En ligne' : 
               courseType === 'blended' ? 'En ligne, à préciser' : '',
      price: 0,
      availableSeats: 10,
      lmsId: '',
    },
  });
  
  const onSubmit = (data: SessionFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Make sure all required fields are present
      const sessionData: Omit<Session, 'id'> = {
        courseId: courseId,
        startDate: data.startDate,
        endDate: data.endDate,
        location: data.location,
        price: data.price,
        availableSeats: data.availableSeats,
        lmsId: data.lmsId,
      };
      
      onAddSession(courseId, sessionData);
      toast.success('Session ajoutée avec succès');
      form.reset({
        startDate: '',
        endDate: '',
        location: courseType === 'online' ? 'En ligne' : 
                 courseType === 'blended' ? 'En ligne, à préciser' : '',
        price: 0,
        availableSeats: 10,
        lmsId: '',
      });
    } catch (error) {
      toast.error('Erreur lors de l\'ajout de la session');
      logger.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début*</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin*</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu*</FormLabel>
              <FormControl>
                <Input 
                  placeholder={
                    courseType === 'online' ? 'En ligne' : 
                    courseType === 'blended' ? 'En ligne, à préciser' : 
                    'Adresse ou plateforme'
                  } 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix (€)*</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="availableSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Places disponibles*</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="lmsId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID cours LMS</FormLabel>
              <FormControl>
                <Input placeholder="ID de référence dans le LMS" {...field} />
              </FormControl>
              <FormDescription>
                Identifiant du cours dans le système LMS (si applicable)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Ajout en cours...' : 'Ajouter la session'}
        </Button>
      </form>
    </Form>
  );
};

export default SessionForm;
