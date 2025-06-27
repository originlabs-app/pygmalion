
import { z } from 'zod';

// Schema for session form validation
export const sessionSchema = z.object({
  startDate: z.string().min(1, { message: 'La date de début est requise' }),
  endDate: z.string().min(1, { message: 'La date de fin est requise' }),
  location: z.string().min(1, { message: 'Le lieu est requis' }),
  price: z.coerce.number().min(0, { message: 'Le prix doit être positif' }),
  availableSeats: z.coerce.number().min(1, { message: 'Au moins une place doit être disponible' }),
  lmsId: z.string().optional(),
}).refine(data => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return end >= start;
}, {
  message: "La date de fin doit être postérieure ou égale à la date de début",
  path: ["endDate"],
});

export type SessionFormValues = z.infer<typeof sessionSchema>;
