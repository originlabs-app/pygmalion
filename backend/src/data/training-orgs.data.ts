import { TrainingOrgData } from '@/types/marketplace.types';

/**
 * Données des organismes de formation
 * Externalisées pour respecter le principe SSOT
 */
export const trainingOrgsData: TrainingOrgData[] = [
  {
    name: 'AeroFormation Pro',
    description:
      "Leader de la formation aéronautique en France avec 20 ans d'expérience",
    specialties: ['Maintenance', 'Sûreté', 'Operations'],
    qualiopi_certified: true,
    certifications: ['Qualiopi', 'EASA Part-147', 'DGAC'],
    partnerships: ['Air France', 'Airbus', 'Safran'],
    total_courses: 45,
    total_learners: 12500,
    average_rating: 4.8,
  },
  {
    name: "Institut Supérieur de l'Aéronautique",
    description:
      'École spécialisée dans la formation des techniciens et ingénieurs aéronautiques',
    specialties: ['Maintenance', 'Avionique', 'Engineering'],
    qualiopi_certified: true,
    certifications: ['Qualiopi', 'EASA Part-147', 'ISO 9001'],
    partnerships: ['Dassault Aviation', 'Thales', 'ENAC'],
    total_courses: 32,
    total_learners: 8700,
    average_rating: 4.9,
  },
  {
    name: 'Sky Training Academy',
    description:
      "Centre de formation pour les métiers de l'escale et du service passager",
    specialties: ['Operations', 'Ground Handling', 'Customer Service'],
    qualiopi_certified: true,
    certifications: ['Qualiopi', 'IATA AHM', 'IATA DGR'],
    partnerships: ['ADP', 'Swissport', 'WFS'],
    total_courses: 28,
    total_learners: 9200,
    average_rating: 4.7,
  },
  {
    name: 'Aviation Security Institute',
    description:
      'Spécialiste de la formation en sûreté aéroportuaire et transport aérien',
    specialties: ['Security', 'Crisis Management', 'Compliance'],
    qualiopi_certified: true,
    certifications: ['Qualiopi', 'DGAC', 'ENAC'],
    partnerships: ['Ministère des Transports', 'ADP', 'Air France'],
    total_courses: 18,
    total_learners: 6500,
    average_rating: 4.8,
  },
  {
    name: 'Pilotage Excellence Center',
    description:
      'École de pilotage certifiée avec simulateurs nouvelle génération',
    specialties: ['Pilot Training', 'Type Rating', 'Simulation'],
    qualiopi_certified: true,
    certifications: ['Qualiopi', 'EASA ATO', 'FTO'],
    partnerships: ['Boeing', 'Airbus', 'Air France'],
    total_courses: 22,
    total_learners: 3200,
    average_rating: 4.9,
  },
];
