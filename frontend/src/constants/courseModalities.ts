import { Monitor, Wifi, WifiOff, GraduationCap, Users } from 'lucide-react';

/**
 * Configuration centralisée des modalités de cours
 * Évite la duplication des switch statements
 */

export interface ModalityConfig {
  value: string;
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  textColor: string;
  description?: string;
}

export const COURSE_MODALITIES: Record<string, ModalityConfig> = {
  online: {
    value: 'online',
    label: 'E-Learning',
    icon: Monitor,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    description: 'Formation 100% en ligne à votre rythme'
  },
  virtual: {
    value: 'virtual',
    label: 'Classe Virtuelle',
    icon: Wifi,
    color: 'bg-purple-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    description: 'Formation en direct avec formateur via visioconférence'
  },
  'in-person': {
    value: 'in-person',
    label: 'Présentiel',
    icon: WifiOff,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    description: 'Formation en salle avec formateur'
  },
  blended: {
    value: 'blended',
    label: 'Mixte',
    icon: Users,
    color: 'bg-orange-500',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    description: 'Combinaison présentiel et distanciel'
  }
};

// Valeur par défaut si modalité inconnue
const DEFAULT_MODALITY: ModalityConfig = {
  value: 'unknown',
  label: 'Formation',
  icon: GraduationCap,
  color: 'bg-gray-500',
  bgColor: 'bg-gray-50',
  textColor: 'text-gray-700'
};

/**
 * Récupère la configuration d'une modalité
 * @param type - Type de modalité
 * @returns Configuration de la modalité ou configuration par défaut
 */
export const getModalityConfig = (type: string): ModalityConfig => {
  return COURSE_MODALITIES[type] || DEFAULT_MODALITY;
};

/**
 * Récupère l'icône d'une modalité
 * @param type - Type de modalité
 * @returns Composant icône
 */
export const getModalityIcon = (type: string) => {
  return getModalityConfig(type).icon;
};

/**
 * Récupère le label d'une modalité
 * @param type - Type de modalité
 * @returns Label de la modalité
 */
export const getModalityLabel = (type: string): string => {
  return getModalityConfig(type).label;
};

/**
 * Récupère toutes les modalités pour les selects
 * @returns Array des modalités
 */
export const getAllModalities = (): ModalityConfig[] => {
  return Object.values(COURSE_MODALITIES);
};