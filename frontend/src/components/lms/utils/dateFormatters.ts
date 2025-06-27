
/**
 * Formats a date string to localized date format
 */
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR');
};

/**
 * Formats a date string to localized time format
 */
export const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
