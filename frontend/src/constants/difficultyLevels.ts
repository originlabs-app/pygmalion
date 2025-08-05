/**
 * Configuration centralisée des niveaux de difficulté
 */

export interface DifficultyLevel {
  value: string;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const DIFFICULTY_LEVELS: Record<string, DifficultyLevel> = {
  beginner: {
    value: 'beginner',
    label: 'Débutant',
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  intermediate: {
    value: 'intermediate',
    label: 'Intermédiaire',
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  },
  advanced: {
    value: 'advanced',
    label: 'Avancé',
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200'
  },
  expert: {
    value: 'expert',
    label: 'Expert',
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  }
};

export const getDifficultyLevel = (level: string): DifficultyLevel => {
  return DIFFICULTY_LEVELS[level] || DIFFICULTY_LEVELS.beginner;
};