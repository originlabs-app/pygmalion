import { UserRole } from '../types';

/**
 * Retourne la route du dashboard selon le rôle utilisateur
 */
export const getDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case 'student':
      return '/student-dashboard';
    case 'training_org':
      return '/training-org-dashboard';
    case 'manager':
      return '/manager-dashboard';
    case 'airport_manager':
      return '/airport-manager-dashboard';
    case 'admin':
      return '/admin-dashboard';
    default:
      return '/';
  }
};

/**
 * Retourne le nom du dashboard selon le rôle utilisateur
 */
export const getDashboardName = (role: UserRole): string => {
  switch (role) {
    case 'student':
      return 'Dashboard Apprenant';
    case 'training_org':
      return 'Dashboard Organisme';
    case 'manager':
      return 'Dashboard Manager';
    case 'airport_manager':
      return 'Dashboard Aéroport';
    case 'admin':
      return 'Dashboard Admin';
    default:
      return 'Dashboard';
  }
}; 