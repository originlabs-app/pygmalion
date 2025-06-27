
import { ModalityDetails, ModalityType } from './types';

/**
 * Récupère les détails d'une modalité de formation en fonction de son type
 */
export const getModalityDetails = (type: ModalityType): ModalityDetails => {
  switch (type) {
    case 'in-person':
      return {
        type: 'in-person',
        accessType: 'physical',
        requiresVerification: true,
        supportsMaterials: true,
        supportsRecording: false,
        accessInfo: {
          beforeSession: [
            'Plan d\'accès',
            'Informations logistiques',
            'Programme détaillé'
          ],
          duringSession: [
            'Support de cours',
            'Exercices pratiques'
          ],
          afterSession: [
            'Attestation de présence',
            'Support complet'
          ]
        }
      };
    case 'online':
      return {
        type: 'online',
        accessType: 'direct',
        requiresVerification: true,
        supportsMaterials: true,
        supportsRecording: false,
        accessInfo: {
          beforeSession: [
            'Instructions de connexion',
            'Prérequis techniques'
          ],
          duringSession: [
            'Modules e-learning',
            'Ressources téléchargeables',
            'Exercices interactifs'
          ],
          afterSession: [
            'Attestation de réussite',
            'Ressources complémentaires'
          ]
        }
      };
    case 'virtual':
      return {
        type: 'virtual',
        accessType: 'scheduled',
        requiresVerification: true,
        supportsMaterials: true,
        supportsRecording: true,
        accessInfo: {
          beforeSession: [
            'Lien de connexion',
            'Instructions techniques',
            'Documents préparatoires'
          ],
          duringSession: [
            'Support de présentation',
            'Liens partagés',
            'Exercices interactifs'
          ],
          afterSession: [
            'Enregistrement de la session',
            'Support de cours',
            'Attestation de présence'
          ]
        }
      };
    case 'blended':
      return {
        type: 'blended',
        accessType: 'mixed',
        requiresVerification: true,
        supportsMaterials: true,
        supportsRecording: true,
        accessInfo: {
          beforeSession: [
            'Programme détaillé',
            'Calendrier des modules',
            'Prérequis techniques'
          ],
          duringSession: [
            'Modules e-learning',
            'Supports présentiels',
            'Liens classes virtuelles'
          ],
          afterSession: [
            'Attestation de suivi',
            'Enregistrements',
            'Ressources complémentaires'
          ]
        }
      };
    default:
      // Default case for safety
      return {
        type: 'online',
        accessType: 'direct',
        requiresVerification: false,
        supportsMaterials: true,
        supportsRecording: false,
        accessInfo: {
          beforeSession: [],
          duringSession: [],
          afterSession: []
        }
      };
  }
};

/**
 * Vérifie si une modalité de formation nécessite une vérification de sécurité
 */
export const requiresSecurityVerification = (type: ModalityType): boolean => {
  const details = getModalityDetails(type);
  return details.requiresVerification;
};

/**
 * Récupère le type d'accès pour une modalité de formation
 */
export const getAccessType = (type: ModalityType): string => {
  const details = getModalityDetails(type);
  return details.accessType;
};

/**
 * Récupère les informations d'accès pour une modalité de formation
 */
export const getAccessInfo = (type: ModalityType): {
  beforeSession?: string[];
  duringSession?: string[];
  afterSession?: string[];
} => {
  const details = getModalityDetails(type);
  return details.accessInfo;
};
