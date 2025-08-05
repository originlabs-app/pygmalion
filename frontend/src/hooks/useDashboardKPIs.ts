import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import logger from '@/services/logger.service';

interface ManagerKPIs {
  kpis: {
    activeTrainings: { value: number; change: number; trend: 'up' | 'down' };
    upcomingTrainings: { value: number; change: number; trend: 'up' | 'down' };
    expiredCertifications: { value: number; change: number; trend: 'up' | 'down' };
    budgetUsed: { value: number; total: number; amount: number };
    teamCompliance: { value: number; change: number; trend: 'up' | 'down' };
    criticalAlerts: { value: number; change: number; trend: 'up' | 'down' };
  };
  team: {
    totalMembers: number;
    activeMembers: number;
    onlineNow: number;
    complianceScore: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    user: string;
    action: string;
    item: string;
    time: string;
    status: string;
  }>;
}

export const useDashboardKPIs = (dashboardType: 'manager' | 'training-org' | 'learner') => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        const response = await apiClient.get(`/dashboard/${dashboardType}-kpis`);
        setData(response.data);
        logger.info(`KPIs ${dashboardType} chargés`, response.data);
      } catch (err) {
        logger.error(`Erreur lors du chargement des KPIs ${dashboardType}`, err);
        setError('Impossible de charger les données du tableau de bord');
        
        // Fallback values for manager dashboard
        if (dashboardType === 'manager') {
          setData({
            kpis: {
              activeTrainings: { value: 24, change: +12, trend: 'up' },
              upcomingTrainings: { value: 8, change: +3, trend: 'up' },
              expiredCertifications: { value: 3, change: -2, trend: 'down' },
              budgetUsed: { value: 68, total: 100, amount: 34500 },
              teamCompliance: { value: 94, change: +2, trend: 'up' },
              criticalAlerts: { value: 7, change: -1, trend: 'down' }
            },
            team: {
              totalMembers: 12,
              activeMembers: 11,
              onlineNow: 8,
              complianceScore: 94
            },
            recentActivity: []
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, [dashboardType]);

  return { data, loading, error };
};