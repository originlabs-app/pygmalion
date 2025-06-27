
import { Session } from '@/types';

/**
 * Vérifie si une session est accessible en ce moment
 */
export const isSessionAccessible = (session: Session): boolean => {
  const now = new Date();
  const startDate = new Date(session.startDate);
  const endDate = new Date(session.endDate);
  
  return now >= startDate && now <= endDate;
};

/**
 * Vérifie si une session est à venir
 */
export const isSessionUpcoming = (session: Session): boolean => {
  const now = new Date();
  const startDate = new Date(session.startDate);
  
  return now < startDate;
};

/**
 * Vérifie si une session est terminée
 */
export const isSessionEnded = (session: Session): boolean => {
  const now = new Date();
  const endDate = new Date(session.endDate);
  
  return now > endDate;
};
