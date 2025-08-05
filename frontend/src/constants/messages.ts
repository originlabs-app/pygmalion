/**
 * Messages centralisés de l'application
 * Évite la duplication des chaînes hardcodées
 */

// Messages d'inscription aux cours
export const ENROLLMENT_MESSAGES = {
  loginRequired: 'Veuillez vous connecter pour vous inscrire',
  sessionRequired: 'Veuillez sélectionner une session',
  success: 'Inscription réussie !',
  error: 'L\'inscription a échoué',
  alreadyEnrolled: 'Vous êtes déjà inscrit à cette formation',
  noSeatsAvailable: 'Plus de places disponibles pour cette session',
  enrollmentPending: 'Votre inscription est en attente de validation'
};

// Messages de formulaire
export const FORM_MESSAGES = {
  required: 'Ce champ est obligatoire',
  invalidEmail: 'Email invalide',
  passwordTooShort: 'Le mot de passe doit contenir au moins 8 caractères',
  passwordMismatch: 'Les mots de passe ne correspondent pas',
  saveSuccess: 'Enregistré avec succès',
  saveError: 'Erreur lors de l\'enregistrement',
  deleteConfirm: 'Êtes-vous sûr de vouloir supprimer ?',
  deleteSuccess: 'Supprimé avec succès',
  deleteError: 'Erreur lors de la suppression'
};

// Messages d'authentification
export const AUTH_MESSAGES = {
  loginSuccess: 'Connexion réussie',
  loginError: 'Email ou mot de passe incorrect',
  logoutSuccess: 'Déconnexion réussie',
  sessionExpired: 'Votre session a expiré',
  unauthorized: 'Vous n\'êtes pas autorisé à accéder à cette ressource',
  emailVerificationRequired: 'Veuillez vérifier votre email',
  emailVerificationSent: 'Email de vérification envoyé',
  passwordResetSent: 'Email de réinitialisation envoyé',
  passwordResetSuccess: 'Mot de passe réinitialisé avec succès'
};

// Messages d'upload
export const UPLOAD_MESSAGES = {
  success: 'Fichier uploadé avec succès',
  error: 'Erreur lors de l\'upload',
  fileTooLarge: 'Le fichier est trop volumineux',
  invalidFileType: 'Type de fichier non autorisé',
  maxFilesExceeded: 'Nombre maximum de fichiers dépassé'
};

// Messages de paiement
export const PAYMENT_MESSAGES = {
  success: 'Paiement effectué avec succès',
  error: 'Erreur lors du paiement',
  cancelled: 'Paiement annulé',
  pending: 'Paiement en attente',
  refunded: 'Remboursement effectué'
};

// Messages de validation
export const VALIDATION_MESSAGES = {
  minLength: (min: number) => `Minimum ${min} caractères requis`,
  maxLength: (max: number) => `Maximum ${max} caractères autorisés`,
  minValue: (min: number) => `La valeur doit être supérieure à ${min}`,
  maxValue: (max: number) => `La valeur doit être inférieure à ${max}`,
  pattern: 'Format invalide',
  unique: 'Cette valeur existe déjà'
};

// Messages d'erreur génériques
export const ERROR_MESSAGES = {
  generic: 'Une erreur est survenue',
  network: 'Erreur de connexion réseau',
  server: 'Erreur serveur',
  notFound: 'Ressource non trouvée',
  timeout: 'La requête a expiré'
};