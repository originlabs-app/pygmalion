/**
 * Utilitaires pour la gestion des catégories - Mapping DB vers affichage public
 * Approche Anti-Pasta : Transformation côté frontend sans modification de la DB
 */

export interface CategoryMapping {
  key: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

/**
 * Mapping des catégories DB vers affichage public
 */
export const CATEGORY_MAPPINGS: Record<string, CategoryMapping> = {
  // Catégories existantes en DB
  maintenance: {
    key: 'maintenance',
    label: 'Maintenance Aéronautique',
    description: 'Maintenance, réparation et certification des aéronefs',
    icon: 'Wrench',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500'
  },
  
  ground_handling: {
    key: 'ground_handling',
    label: 'Services au Sol',
    description: 'Assistance aéroportuaire et services passagers',
    icon: 'Plane',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  
  cabin_crew: {
    key: 'cabin_crew',
    label: 'Personnel Navigant',
    description: 'Formation équipage de cabine et sécurité',
    icon: 'Users',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500'
  },
  
  security: {
    key: 'security',
    label: 'Sûreté Aéroportuaire',
    description: 'Sécurité, contrôles et procédures réglementaires',
    icon: 'Shield',
    color: 'red',
    gradient: 'from-red-500 to-orange-500'
  },
  
  operations: {
    key: 'operations',
    label: 'Opérations Aériennes',
    description: 'Gestion des vols et coordination aéroportuaire',
    icon: 'MapPin',
    color: 'green',
    gradient: 'from-green-500 to-teal-500'
  },
  
  // Catégories potentielles futures (pour extensibilité)
  piloting: {
    key: 'piloting',
    label: 'Pilotage',
    description: 'Formation pilotes et instructeurs',
    icon: 'Navigation',
    color: 'indigo',
    gradient: 'from-indigo-500 to-blue-500'
  },
  
  language: {
    key: 'language',
    label: 'Langues Aviation',
    description: 'Anglais aéronautique et communications',
    icon: 'MessageCircle',
    color: 'teal',
    gradient: 'from-teal-500 to-green-500'
  },
  
  surete: {
    key: 'surete',
    label: 'Sûreté & Sécurité',
    description: 'Procédures de sûreté et gestion des risques',
    icon: 'Lock',
    color: 'red',
    gradient: 'from-red-600 to-red-400'
  }
};

/**
 * Convertit une catégorie DB en affichage public lisible
 */
export const getCategoryLabel = (dbCategory: string): string => {
  return CATEGORY_MAPPINGS[dbCategory]?.label || formatCategoryFallback(dbCategory);
};

/**
 * Récupère la configuration complète d'une catégorie
 */
export const getCategoryConfig = (dbCategory: string): CategoryMapping => {
  return CATEGORY_MAPPINGS[dbCategory] || createFallbackCategory(dbCategory);
};

/**
 * Récupère toutes les catégories disponibles
 */
export const getAllCategories = (): CategoryMapping[] => {
  return Object.values(CATEGORY_MAPPINGS);
};

/**
 * Récupère les catégories principales (celles en DB)
 */
export const getMainCategories = (): CategoryMapping[] => {
  const mainKeys = ['maintenance', 'ground_handling', 'cabin_crew', 'security', 'operations'];
  return mainKeys.map(key => CATEGORY_MAPPINGS[key]).filter(Boolean);
};

/**
 * Formate une catégorie inconnue en nom lisible (fallback)
 */
const formatCategoryFallback = (dbCategory: string): string => {
  return dbCategory
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Crée une configuration par défaut pour une catégorie inconnue
 */
const createFallbackCategory = (dbCategory: string): CategoryMapping => {
  return {
    key: dbCategory,
    label: formatCategoryFallback(dbCategory),
    description: `Formation spécialisée en ${formatCategoryFallback(dbCategory).toLowerCase()}`,
    icon: 'BookOpen',
    color: 'gray',
    gradient: 'from-gray-500 to-gray-600'
  };
};

/**
 * Filtre les cours par catégorie (pour les filtres)
 */
export const filterCoursesByCategory = <T extends { category: string }>(
  courses: T[], 
  selectedCategory?: string
): T[] => {
  if (!selectedCategory || selectedCategory === 'all') {
    return courses;
  }
  return courses.filter(course => course.category === selectedCategory);
};

/**
 * Groupe les cours par catégorie avec noms lisibles
 */
export const groupCoursesByCategory = <T extends { category: string }>(
  courses: T[]
): Record<string, { label: string; courses: T[]; config: CategoryMapping }> => {
  const groups: Record<string, { label: string; courses: T[]; config: CategoryMapping }> = {};
  
  courses.forEach(course => {
    const category = course.category;
    if (!groups[category]) {
      const config = getCategoryConfig(category);
      groups[category] = {
        label: config.label,
        courses: [],
        config
      };
    }
    groups[category].courses.push(course);
  });
  
  return groups;
};