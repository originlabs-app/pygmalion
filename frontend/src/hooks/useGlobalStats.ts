import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import logger from '@/services/logger.service';

interface GlobalStat {
  value: string;
  label: string;
  icon?: string;
}

interface GlobalStatsData {
  total_learners?: GlobalStat;
  total_courses?: GlobalStat;
  total_partners?: GlobalStat;
  success_rate?: GlobalStat;
  satisfaction_rate?: GlobalStat;
  total_sessions?: GlobalStat;
}

export const useGlobalStats = () => {
  const [stats, setStats] = useState<GlobalStatsData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/stats/global');
        setStats(response.data);
        logger.info('Stats globales chargées', response.data);
      } catch (err) {
        logger.error('Erreur lors du chargement des stats', err);
        setError('Impossible de charger les statistiques');
        
        // Fallback values
        setStats({
          total_learners: { value: '2,500+', label: 'Apprenants Certifiés' },
          total_courses: { value: '150+', label: 'Formations Aviation' },
          total_partners: { value: '50+', label: 'Organismes Partenaires' },
          success_rate: { value: '98%', label: 'Taux de Réussite' }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};