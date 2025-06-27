
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterFormValues } from '../RegisterForm';

interface TrainingOrgFormProps {
  control: Control<RegisterFormValues>;
  specializationOnly?: boolean;
}

const trainingSpecialtiesOptions = [
  { id: 'pilot', label: 'Pilot Training' },
  { id: 'atc', label: 'Air Traffic Control' },
  { id: 'maintenance', label: 'Aircraft Maintenance' },
  { id: 'cabin', label: 'Cabin Crew' },
  { id: 'ground', label: 'Ground Operations' },
  { id: 'safety', label: 'Safety & Security' },
];

export const TrainingOrgForm: React.FC<TrainingOrgFormProps> = ({ control, specializationOnly = false }) => {
  if (specializationOnly) {
    return (
      <FormField
        control={control}
        name="trainingSpecialties"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">Training Specialties</FormLabel>
              <FormDescription>
                Select the types of training you offer
              </FormDescription>
            </div>
            {trainingSpecialtiesOptions.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name="trainingSpecialties"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            const current = field.value || [];
                            return checked
                              ? field.onChange([...current, item.id])
                              : field.onChange(
                                  current.filter((value) => value !== item.id)
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <>
      <FormField
        control={control}
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Name</FormLabel>
            <FormControl>
              <Input placeholder="Your Training Organization" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="businessType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Organization Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="independent" />
                  </FormControl>
                  <FormLabel className="font-normal">Independent Training Center</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="airline" />
                  </FormControl>
                  <FormLabel className="font-normal">Airline Training Division</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="university" />
                  </FormControl>
                  <FormLabel className="font-normal">University/Educational Institution</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Organization Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brief description of your training organization"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
