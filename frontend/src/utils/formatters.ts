/**
 * Utilitaires de formatage centralisés
 * Évite la duplication de code dans toute l'application
 */

/**
 * Formate une date en français
 * @param date - Date string ou Date object
 * @param options - Options Intl.DateTimeFormat personnalisées
 * @returns Date formatée en français
 */
export const formatDate = (
  date: string | Date | null | undefined, 
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!date) return '';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options
  };
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString('fr-FR', defaultOptions);
  } catch (error) {
    return '';
  }
};

/**
 * Formate une date courte (JJ/MM/AAAA)
 */
export const formatDateShort = (date: string | Date): string => {
  return formatDate(date, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formate une date avec heure
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formate un prix en devise
 * @param price - Montant à formater
 * @param currency - Code devise (EUR par défaut)
 * @returns Prix formaté avec symbole devise
 */
export const formatPrice = (
  price: number | string | null | undefined, 
  currency: string = 'EUR'
): string => {
  if (price === null || price === undefined) return '';
  
  try {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return '';
    
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency,
      minimumFractionDigits: currency === 'EUR' ? 2 : 0,
      maximumFractionDigits: 2
    }).format(numericPrice);
  } catch (error) {
    return '';
  }
};

/**
 * Formate un pourcentage
 * @param value - Valeur à formater (0-100)
 * @param decimals - Nombre de décimales
 */
export const formatPercentage = (
  value: number, 
  decimals: number = 0
): string => {
  return `${value.toFixed(decimals)}%`;
};

/**
 * Formate une durée en heures
 * @param hours - Nombre d'heures
 * @returns Durée formatée (ex: "35 heures", "1 heure")
 */
export const formatDuration = (hours: number): string => {
  if (hours === 1) return '1 heure';
  return `${hours} heures`;
};

/**
 * Formate une durée en jours/semaines/mois
 * @param days - Nombre de jours
 * @returns Durée formatée intelligemment
 */
export const formatDurationDays = (days: number): string => {
  if (days < 7) return `${days} jour${days > 1 ? 's' : ''}`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
  }
  const months = Math.round(days / 30);
  return `${months} mois`;
};

/**
 * Formate un nombre avec séparateurs
 * @param value - Nombre à formater
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-FR').format(value);
};

/**
 * Formate une plage de dates
 * @param startDate - Date de début
 * @param endDate - Date de fin
 */
export const formatDateRange = (
  startDate: string | Date | null | undefined, 
  endDate: string | Date | null | undefined
): string => {
  if (!startDate || !endDate) return '';
  
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  
  if (!start || !end) return '';
  
  try {
    // Si même mois et année
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);
    
    if (startObj.getMonth() === endObj.getMonth() && 
        startObj.getFullYear() === endObj.getFullYear()) {
      return `${startObj.getDate()} au ${endObj.getDate()} ${start.split(' ').slice(1).join(' ')}`;
    }
    
    return `${start} au ${end}`;
  } catch (error) {
    return `${start} au ${end}`;
  }
};