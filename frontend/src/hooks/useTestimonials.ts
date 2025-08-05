import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import logger from '@/services/logger.service';

interface Testimonial {
  id: string;
  course_id?: string;
  user_name: string;
  user_role: string;
  user_avatar?: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

export const useTestimonials = (options?: { featured?: boolean; limit?: number }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const params = new URLSearchParams();
        if (options?.featured !== undefined) {
          params.append('featured', String(options.featured));
        }
        if (options?.limit) {
          params.append('limit', String(options.limit));
        }

        const response = await apiClient.get(`/testimonials?${params.toString()}`);
        setTestimonials(response.data);
        logger.info('Témoignages chargés', { count: response.data.length });
      } catch (err) {
        logger.error('Erreur lors du chargement des témoignages', err);
        setError('Impossible de charger les témoignages');
        
        // Fallback values
        setTestimonials([
          {
            id: '1',
            user_name: 'Sophie M.',
            user_role: 'Agent de sûreté',
            content: 'Formation très complète et pratique. Les formateurs sont excellents et disponibles.',
            rating: 5,
            is_featured: true,
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            user_name: 'Marc L.',
            user_role: 'Technicien de maintenance',
            content: 'Parfait pour la préparation aux examens EASA. Support de cours de qualité.',
            rating: 5,
            is_featured: true,
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            user_name: 'Julie P.',
            user_role: 'Hôtesse de l\'air',
            content: 'La formation en ligne est très bien conçue. J\'ai pu progresser à mon rythme.',
            rating: 4,
            is_featured: false,
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [options?.featured, options?.limit]);

  return { testimonials, loading, error };
};