
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useFormContext } from 'react-hook-form';
import { CourseFormValues } from './types';

interface DetailedInfoFormProps {
  goToNextTab: () => void;
  goToPreviousTab: () => void;
  indicators: string[];
  setIndicators: React.Dispatch<React.SetStateAction<string[]>>;
  newIndicator: string;
  setNewIndicator: React.Dispatch<React.SetStateAction<string>>;
  onAddIndicator: () => void;
  removeIndicator: (index: number) => void;
}

const DetailedInfoForm: React.FC<DetailedInfoFormProps> = ({
  goToNextTab,
  goToPreviousTab,
  indicators,
  newIndicator,
  setNewIndicator,
  onAddIndicator,
  removeIndicator,
}) => {
  const form = useFormContext<CourseFormValues>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="objectives"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Objectifs pédagogiques*</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez les objectifs de cette formation..."
                className="min-h-20"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prérequis</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Prérequis nécessaires pour suivre cette formation..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="targetAudience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public visé</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="À qui s'adresse cette formation..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="program"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Programme détaillé*</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Détaillez le programme de votre formation..."
                className="min-h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="qualiopiIndicators"
        render={() => (
          <FormItem>
            <FormLabel>Indicateurs Qualiopi*</FormLabel>
            <div className="flex space-x-2 mb-2">
              <Input
                placeholder="Ajouter un indicateur Qualiopi"
                value={newIndicator}
                onChange={(e) => setNewIndicator(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={onAddIndicator}>
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {indicators.map((indicator, index) => (
                <div
                  key={index}
                  className="bg-muted text-sm px-3 py-1 rounded-full flex items-center"
                >
                  <span>{indicator}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 ml-1"
                    onClick={() => removeIndicator(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            {form.formState.errors.qualiopiIndicators && (
              <p className="text-sm font-medium text-destructive mt-2">
                {form.formState.errors.qualiopiIndicators.message}
              </p>
            )}
          </FormItem>
        )}
      />

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousTab}>
          Précédent
        </Button>
        <Button type="button" onClick={goToNextTab}>
          Aperçu
        </Button>
      </div>
    </div>
  );
};

export default DetailedInfoForm;
