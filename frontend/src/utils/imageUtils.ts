/**
 * Utilitaires pour la gestion des images
 */

/**
 * Récupère l'URL d'image d'un cours avec fallback
 */
export const getCourseImageUrl = (course: { image_url?: string; image?: string }): string => {
  // Priorité à image_url (Supabase)
  if (course.image_url) {
    return course.image_url;
  }
  
  // Fallback sur image (compatibilité)
  if (course.image) {
    return course.image;
  }
  
  // Image par défaut si aucune image
  return '/images/course-placeholder.jpg';
};

/**
 * Vérifie si une URL d'image est valide
 */
export const isValidImageUrl = (url?: string): boolean => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Génère une URL d'image placeholder basée sur le titre du cours
 */
export const generatePlaceholderImage = (title: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-teal-500'
  ];
  
  const hash = title.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const colorIndex = Math.abs(hash) % colors.length;
  
  return `https://via.placeholder.com/400x300/${colors[colorIndex].replace('bg-', '').replace('-500', '')}/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`;
};