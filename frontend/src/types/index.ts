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

export interface Course {
  id: string;
  title: string;
  provider: string;
  providerId: string;
  description: string;
  category: string;
  objectives: string;
  requirements: string;
  targetAudience: string;
  program: string;
  qualiopiIndicators: string[];
  type: 'in-person' | 'online' | 'virtual' | 'blended';
  image: string;
  status: 'draft' | 'published' | 'archived';
  modules?: CourseModule[];
  sessions: Session[];
  language: string;
  classificationNumber: string;
  successRate: number;
  satisfactionRate: number;
  validityDuration: string;
  targetCertification: string;
  programPdfUrl: string;
  duration: string;
  cpfEligible: boolean;
  opcoEligible: boolean;
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
