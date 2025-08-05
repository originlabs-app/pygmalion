export type UserRole = 'student' | 'training_org' | 'manager' | 'airport_manager' | 'admin';

export type LearnerStatus = 'free' | 'affiliated' | 'pending_affiliation';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  organization?: string;
  affiliatedTo?: string[];
  verified: boolean;
  // Spécifique aux apprenants
  learnerStatus?: LearnerStatus;
  invitedBy?: string; // ID du manager qui a invité l'apprenant
  affiliationRequestTo?: string; // ID de l'entreprise pour laquelle l'affiliation est demandée
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  content: ModuleContent[];
}

export interface ModuleContent {
  type: 'text' | 'video' | 'pdf' | 'quiz' | 'interactive';
  title: string;
  content?: string;  // Pour le type 'text'
  url?: string;      // Pour types 'video', 'pdf'
  duration?: string; // Pour le type 'video'
  fileName?: string; // Pour le type 'pdf'
  fileSize?: number; // Pour le type 'pdf'
  questions?: QuizQuestion[]; // Pour le type 'quiz'
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface TrainingOrganization {
  id: string;
  organization_name: string;
  logo_url?: string;
  qualiopi_certified: boolean;
}

export interface Course {
  id: string;
  title: string;
  provider?: TrainingOrganization; // Provider object from API
  provider_id: string;
  providerId?: string; // For backward compatibility
  provider?: string; // For backward compatibility
  description?: string;
  category: string;
  objectives?: string;
  requirements?: string;
  target_audience?: string;
  targetAudience?: string; // For backward compatibility
  program?: string;
  qualiopi_indicators: string[];
  qualiopiIndicators?: string[]; // For backward compatibility
  course_type: 'in_person' | 'online' | 'blended';
  type?: 'in-person' | 'online' | 'virtual' | 'blended'; // For backward compatibility
  image_url?: string;
  image?: string; // For backward compatibility
  status: 'draft' | 'published' | 'archived' | 'suspended';
  duration_hours?: number;
  certification_type?: string;
  certification_validity_months?: number;
  
  // Nouveaux champs
  language?: string;
  classification_number?: string;
  classificationNumber?: string; // For backward compatibility
  success_rate?: number | string;
  successRate?: number; // For backward compatibility
  satisfaction_rate?: number | string;
  satisfactionRate?: number; // For backward compatibility
  validity_duration?: string;
  validityDuration?: string; // For backward compatibility
  target_certification?: string;
  targetCertification?: string; // For backward compatibility
  program_pdf_url?: string;
  programPdfUrl?: string; // For backward compatibility
  duration?: string;
  cpf_eligible?: boolean;
  cpfEligible?: boolean; // For backward compatibility
  opco_eligible?: boolean;
  opcoEligible?: boolean; // For backward compatibility
  
  // Nouveaux champs marketplace
  enrollment_count?: number;
  review_count?: number;
  average_rating?: number | string;
  guarantees?: string[];
  detailed_program?: {
    modules?: Array<{
      title: string;
      duration: string;
      content: string[];
    }>;
    evaluation?: string;
    certification?: string;
  };
  last_updated?: string;
  
  // Métriques d'engagement
  view_count?: number;
  favorite_count?: number;
  click_count?: number;
  completion_time_avg?: number;
  conversion_rate?: number | string;
  last_session_date?: string;
  next_session_date?: string;
  
  // Informations enrichies
  prerequisites_structured?: {
    education?: string[];
    certifications?: string[];
    experience?: string[];
    languages?: string[];
    medical?: string[];
  };
  learning_outcomes?: {
    knowledge?: string[];
    skills?: string[];
    competencies?: string[];
  };
  included_materials?: {
    physical?: string[];
    digital?: string[];
    equipment?: string[];
    certification?: string[];
  };
  schedule_details?: {
    format?: string;
    sessions_per_week?: number;
    hours_per_day?: number;
    schedule_options?: string[];
    flexibility?: string;
  };
  instructor_profiles?: Array<{
    name: string;
    title: string;
    experience: string;
    certifications: string[];
    specialties: string[];
    languages: string[];
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  
  // Données commerciales
  early_bird_discount?: number | string;
  group_discount?: Record<string, number>;
  payment_options?: string[];
  refund_policy?: string;
  min_participants?: number;
  max_participants?: number;
  
  // Géolocalisation et accessibilité
  location_coordinates?: {
    lat: number;
    lng: number;
    address?: string;
    city?: string;
    parking?: boolean;
    public_transport?: string[];
  };
  online_platform?: string;
  timezone?: string;
  accessibility_info?: {
    wheelchair_access?: boolean;
    hearing_loop?: boolean;
    braille_documents?: boolean;
    sign_language?: string;
    assistance_available?: boolean;
  };
  
  // SEO et Marketing
  meta_title?: string;
  meta_description?: string;
  slug?: string;
  keywords?: string[];
  promotional_video_url?: string;
  
  // Tags et catégorisation
  tags?: string[];
  difficulty_level?: string;
  industry_sectors?: string[];
  job_roles?: string[];
  
  created_at: string;
  updated_at: string;
  
  modules?: CourseModule[];
  sessions: Session[];
  _count?: {
    enrollments: number;
    sessions: number;
  };
}

export interface Session {
  id: string;
  courseId: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  availableSeats: number;
  lmsId?: string;
  materials?: CourseMaterial[];
  virtualMeetingInfo?: VirtualMeetingInfo;
  inPersonInfo?: InPersonInfo;
}

export interface VirtualMeetingInfo {
  platform: 'zoom' | 'teams' | 'webex' | 'other';
  meetingId?: string;
  meetingUrl?: string;
  password?: string;
  requirements?: string[];
}

export interface InPersonInfo {
  address: string;
  room?: string;
  directions?: string;
  contactOnSite?: string;
  specialInstructions?: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'scorm' | 'link' | 'other';
  url?: string;
  size?: number;
  durationMinutes?: number;
  requiredBeforeSession?: boolean;
  description?: string;
}

export interface EnrollmentProgress {
  started: boolean;
  percentage: number;
  lastAccessDate?: string;
  completedModules?: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  sessionId: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'refunded';
  enrollmentDate: string;
  progress?: EnrollmentProgress;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string; // Required field
  category: string; // Required field
  issueDate: string;
  expiryDate: string;
  tokenId?: string;
  status: 'valid' | 'expiring' | 'expired'; // Changed from optional to required
}
