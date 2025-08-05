import { AviationCategory, CourseModality } from '@prisma/client';

/**
 * Types stricts pour les données de formation
 */
export interface FormationData {
  title: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  job_roles?: string[];
}

/**
 * Catégorie de formations avec ses formations
 */
export interface FormationCategory {
  category: AviationCategory;
  formations: FormationData[];
}

/**
 * Données d'un organisme de formation
 */
export interface TrainingOrgData {
  name: string;
  description: string;
  specialties: string[];
  qualiopi_certified: boolean;
  certifications: string[];
  partnerships: string[];
  total_courses: number;
  total_learners: number;
  average_rating: number;
}

/**
 * Données enrichies pour un cours
 */
export interface EnrichedCourseData {
  // Métriques d'engagement
  view_count: number;
  favorite_count: number;
  click_count: number;
  completion_time_avg: number;
  conversion_rate: number | any;

  // Informations structurées
  prerequisites_structured: {
    education?: string[];
    certifications?: string[];
    medical?: string[];
    languages?: string[];
    experience?: string[];
  };

  learning_outcomes: {
    knowledge: string[];
    skills: string[];
    competencies: string[];
  };

  included_materials: {
    physical: string[];
    digital: string[];
    equipment: string[];
    certifications: string[];
  };

  schedule_details: {
    format: string;
    sessions_per_week?: number;
    hours_per_session?: number;
    flexibility: string;
  };

  instructor_profiles: InstructorProfile[];

  faq: FAQItem[];

  // Données commerciales
  early_bird_discount?: number | any;
  group_discount?: GroupDiscount;
  payment_options: string[];
  refund_policy: string;
  min_participants: number;
  max_participants: number;

  // Géolocalisation
  location_coordinates?: LocationCoordinates;
  online_platform?: string;
  accessibility_info?: AccessibilityInfo;

  // SEO et Marketing
  meta_title: string;
  meta_description: string;
  slug: string;
  keywords: string[];

  // Tags et catégorisation
  tags: string[];
  difficulty_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  industry_sectors: string[];
  job_roles: string[];
}

/**
 * Profil d'un instructeur
 */
export interface InstructorProfile {
  name: string;
  title: string;
  experience: string;
  certifications: string[];
  specialties: string[];
  bio?: string;
}

/**
 * Item FAQ
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Réductions de groupe
 */
export interface GroupDiscount {
  '3_5_personnes': number | any;
  '6_10_personnes': number | any;
  '11_plus_personnes': number | any;
}

/**
 * Coordonnées de localisation
 */
export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  city: string;
  postalCode: string;
}

/**
 * Informations d'accessibilité
 */
export interface AccessibilityInfo {
  wheelchair: boolean;
  parking: boolean;
  public_transport: string[];
}

/**
 * Résumé d'enrichissement
 */
export interface EnrichmentSummary {
  formations: number;
  organismes: number;
  sessions: number;
  temoignages: number;
}
