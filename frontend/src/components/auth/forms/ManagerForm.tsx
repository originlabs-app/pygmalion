
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
import { RegisterFormValues } from '@/components/auth/RegisterForm';

interface ManagerFormProps {
  control: Control<RegisterFormValues>;
}

export const ManagerForm: React.FC<ManagerFormProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input placeholder="Your Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Position/Title</FormLabel>
            <FormControl>
              <Input placeholder="Your position in the company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
