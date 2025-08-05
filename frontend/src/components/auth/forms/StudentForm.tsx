
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegisterFormValues } from '@/components/auth/RegisterForm';

interface StudentFormProps {
  control: Control<RegisterFormValues>;
}

export const StudentForm: React.FC<StudentFormProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License Number (optional)</FormLabel>
            <FormControl>
              <Input placeholder="If applicable" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="experienceYears"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience (optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0">No experience</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">More than 10 years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
