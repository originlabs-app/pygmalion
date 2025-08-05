
import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterFormValues } from '@/components/auth/RegisterForm';

interface TermsAndConditionsProps {
  control: Control<RegisterFormValues>;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              I accept the terms and conditions
            </FormLabel>
            <FormDescription>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
