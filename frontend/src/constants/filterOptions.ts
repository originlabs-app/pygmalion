/**
 * Options de filtrage centralisées pour les cours
 * Évite la duplication et facilite la maintenance
 */

export interface FilterOption {
  value: string;
  label: string;
  description?: string;
}

// Modalités de formation
export const MODALITY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Toutes les modalités' },
  { value: 'online', label: 'E-Learning', description: '100% en ligne' },
  { value: 'in-person', label: 'Présentiel', description: 'En salle' },
  { value: 'virtual', label: 'Classe Virtuelle', description: 'Visioconférence' },
  { value: 'blended', label: 'Mixte', description: 'Présentiel + Distanciel' }
];

// Localisations
export const LOCATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Toutes les localisations' },
  { value: 'paris', label: 'Paris' },
  { value: 'lyon', label: 'Lyon' },
  { value: 'marseille', label: 'Marseille' },
  { value: 'toulouse', label: 'Toulouse' },
  { value: 'nice', label: 'Nice' },
  { value: 'nantes', label: 'Nantes' },
  { value: 'strasbourg', label: 'Strasbourg' },
  { value: 'bordeaux', label: 'Bordeaux' },
  { value: 'lille', label: 'Lille' },
  { value: 'online', label: 'En ligne' }
];

// Gammes de prix
export const PRICE_RANGE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Tous les prix' },
  { value: '0-500', label: 'Moins de 500€' },
  { value: '500-1000', label: '500€ - 1000€' },
  { value: '1000-2000', label: '1000€ - 2000€' },
  { value: '2000-5000', label: '2000€ - 5000€' },
  { value: '5000+', label: 'Plus de 5000€' }
];

// Types de certification
export const CERTIFICATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Toutes les certifications' },
  { value: 'diploma', label: 'Diplôme' },
  { value: 'certificate', label: 'Certificat' },
  { value: 'attestation', label: 'Attestation' },
  { value: 'qualification', label: 'Qualification' },
  { value: 'habilitation', label: 'Habilitation' }
];

// Options de tri
export const SORT_OPTIONS: FilterOption[] = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'date_asc', label: 'Date (plus proche)' },
  { value: 'date_desc', label: 'Date (plus lointaine)' },
  { value: 'duration_asc', label: 'Durée (plus courte)' },
  { value: 'duration_desc', label: 'Durée (plus longue)' },
  { value: 'popularity', label: 'Popularité' }
];

// Durées de formation
export const DURATION_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Toutes les durées' },
  { value: '0-10', label: 'Moins de 10h' },
  { value: '10-35', label: '10h - 35h (1 semaine)' },
  { value: '35-70', label: '35h - 70h (2 semaines)' },
  { value: '70-140', label: '70h - 140h (1 mois)' },
  { value: '140+', label: 'Plus de 140h' }
];

// Niveaux de difficulté
export const DIFFICULTY_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Tous les niveaux' },
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
  { value: 'expert', label: 'Expert' }
];

// Langues
export const LANGUAGE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Toutes les langues' },
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'Anglais' },
  { value: 'es', label: 'Espagnol' },
  { value: 'de', label: 'Allemand' },
  { value: 'it', label: 'Italien' },
  { value: 'bilingual', label: 'Bilingue' }
];

/**
 * Récupère les options de filtre par nom
 */
export const getFilterOptions = (filterName: string): FilterOption[] => {
  switch (filterName) {
    case 'modality':
      return MODALITY_OPTIONS;
    case 'location':
      return LOCATION_OPTIONS;
    case 'price':
      return PRICE_RANGE_OPTIONS;
    case 'certification':
      return CERTIFICATION_OPTIONS;
    case 'sort':
      return SORT_OPTIONS;
    case 'duration':
      return DURATION_OPTIONS;
    case 'difficulty':
      return DIFFICULTY_OPTIONS;
    case 'language':
      return LANGUAGE_OPTIONS;
    default:
      return [];
  }
};