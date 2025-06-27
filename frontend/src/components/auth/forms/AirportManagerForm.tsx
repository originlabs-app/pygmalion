
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
import { RegisterFormValues } from '../RegisterForm';

interface AirportManagerFormProps {
  control: Control<RegisterFormValues>;
}

export const AirportManagerForm: React.FC<AirportManagerFormProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="organization"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Airport Name</FormLabel>
            <FormControl>
              <Input placeholder="Airport Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="airportCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Airport Code</FormLabel>
            <FormControl>
              <Input placeholder="ICAO/IATA Code (e.g., CDG, LFPG)" {...field} />
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
              <Input placeholder="Your position at the airport" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
