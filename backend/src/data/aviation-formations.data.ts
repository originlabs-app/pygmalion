import { FormationCategory } from '@/types/marketplace.types';
import { AviationCategory } from '@prisma/client';

/**
 * Données de formations aéronautiques structurées
 * Externalisées pour respecter le principe SSOT
 */
export const aviationFormationsData: FormationCategory[] = [
  // SÉCURITÉ & SÛRETÉ
  {
    category: AviationCategory.security,
    formations: [
      {
        title: 'Agent de Sûreté Aéroportuaire - Formation Initiale',
        description:
          'Formation complète pour devenir agent de sûreté certifié DGAC. Inclut modules théoriques, pratiques et stage en entreprise.',
        duration: '140 heures',
        price: 2450,
        difficulty: 'beginner',
        tags: ['sûreté', 'DGAC', 'certification', 'débutant'],
        job_roles: ['Agent de sûreté', 'Contrôleur bagages', 'Agent screening'],
      },
      {
        title: 'Gestionnaire Sûreté Aéroportuaire - Management',
        description:
          "Formation pour les responsables sûreté. Management d'équipe, gestion de crise, audit et conformité.",
        duration: '80 heures',
        price: 3200,
        difficulty: 'advanced',
        tags: ['management', 'sûreté', 'leadership', 'crise'],
      },
    ],
  },

  // MAINTENANCE AÉRONAUTIQUE
  {
    category: AviationCategory.maintenance,
    formations: [
      {
        title: 'Mécanicien Aéronautique B1.1 - Avions Turbines',
        description:
          'Formation complète EASA Part-66 pour la maintenance des avions à turbines. 2400 heures avec examens modulaires.',
        duration: '2400 heures',
        price: 24500,
        difficulty: 'intermediate',
        tags: ['EASA', 'B1.1', 'turbines', 'certification'],
        job_roles: [
          'Mécanicien B1.1',
          'Technicien maintenance',
          "Chef d'équipe maintenance",
        ],
      },
      {
        title: 'Électronicien Aéronautique B2 - Avionique',
        description:
          'Spécialisation en systèmes électroniques et avionique. Formation EASA Part-66 catégorie B2.',
        duration: '2400 heures',
        price: 26500,
        difficulty: 'advanced',
        tags: ['EASA', 'B2', 'avionique', 'électronique'],
      },
    ],
  },

  // OPÉRATIONS AÉROPORTUAIRES
  {
    category: AviationCategory.operations,
    formations: [
      {
        title: 'Agent de Piste - Certification IATA AHM',
        description:
          'Formation complète pour les opérations au sol. Placement avion, chargement, pushback, dégivrage.',
        duration: '140 heures',
        price: 2850,
        difficulty: 'beginner',
        tags: ['IATA', 'piste', 'handling', 'opérations'],
        job_roles: [
          'Agent de piste',
          'Coordinateur piste',
          "Chef d'équipe handling",
        ],
      },
      {
        title: 'Superviseur Opérations Aéroportuaires',
        description:
          'Management des opérations, coordination multi-services, gestion des irrégularités.',
        duration: '80 heures',
        price: 3400,
        difficulty: 'intermediate',
        tags: ['supervision', 'management', 'coordination', 'leadership'],
      },
    ],
  },

  // PERSONNEL NAVIGANT CABINE
  {
    category: AviationCategory.cabin_crew,
    formations: [
      {
        title: 'CCA - Cabin Crew Attestation EASA',
        description:
          'Formation initiale hôtesse/steward. Sécurité, sauvetage, service, gestion passagers difficiles.',
        duration: '175 heures',
        price: 3950,
        difficulty: 'beginner',
        tags: ['CCA', 'EASA', 'PNC', 'sécurité cabine'],
        job_roles: ["Hôtesse de l'air", 'Steward', 'Chef de cabine'],
      },
      {
        title: 'Chef de Cabine - Leadership PNC',
        description:
          'Evolution vers chef de cabine. Leadership, gestion équipe PNC, procédures spécifiques.',
        duration: '70 heures',
        price: 2850,
        difficulty: 'advanced',
        tags: ['chef de cabine', 'leadership', 'management PNC'],
      },
    ],
  },

  // ASSISTANCE AÉROPORTUAIRE
  {
    category: AviationCategory.ground_handling,
    formations: [
      {
        title: "Agent d'Escale Commercial",
        description:
          'Enregistrement passagers, embarquement, gestion irrégularités, systèmes DCS (Altéa, Amadeus).',
        duration: '105 heures',
        price: 2150,
        difficulty: 'beginner',
        tags: ['escale', 'DCS', 'passagers', 'commercial'],
        job_roles: [
          "Agent d'escale",
          "Agent d'enregistrement",
          "Chef d'escale",
        ],
      },
      {
        title: 'Assistant PMR - Mobilité Réduite',
        description:
          'Accompagnement passagers handicapés ou à mobilité réduite. Réglementation, matériel adapté.',
        duration: '35 heures',
        price: 950,
        difficulty: 'beginner',
        tags: ['PMR', 'assistance', 'handicap', 'service'],
      },
    ],
  },

  // PILOTAGE
  {
    category: AviationCategory.pilot_training,
    formations: [
      {
        title: 'PPL(A) - Licence Pilote Privé Avion',
        description:
          'Formation complète pilote privé. 45h de vol minimum, théorique EASA, navigation, météo.',
        duration: '6-12 mois',
        price: 12500,
        difficulty: 'intermediate',
        tags: ['PPL', 'pilote', 'privé', 'EASA'],
        job_roles: ['Pilote privé', 'Pilote de loisir'],
      },
      {
        title: 'ATPL Théorique - Airline Transport Pilot',
        description:
          '14 modules théoriques pour devenir pilote de ligne. 650h de cours intensifs.',
        duration: '8 mois',
        price: 18500,
        difficulty: 'expert',
        tags: ['ATPL', 'pilote de ligne', 'théorique', 'airline'],
      },
    ],
  },
];
