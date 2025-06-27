
import { z } from 'zod';

// Define validation schema for the course form
export const courseSchema = z.object({
  title: z.string().min(5, { message: 'Le titre doit contenir au moins 5 caractères' }),
  description: z.string().min(20, { message: 'La description doit contenir au moins 20 caractères' }),
  category: z.string().min(1, { message: 'Veuillez sélectionner une catégorie' }),
  objectives: z.string().min(10, { message: 'Les objectifs doivent contenir au moins 10 caractères' }),
  requirements: z.string(),
  targetAudience: z.string(),
  program: z.string().min(20, { message: 'Le programme doit contenir au moins 20 caractères' }),
  qualiopiIndicators: z.array(z.string()).min(1, { message: 'Ajoutez au moins un indicateur Qualiopi' }),
  type: z.enum(['in-person', 'online', 'virtual', 'blended']),
  image: z.string().default('/placeholder.svg'),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
