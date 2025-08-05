/**
 * TYPES PARTAGÉS ENTRE FRONTEND ET BACKEND
 * 
 * Ce fichier contient toutes les interfaces communes
 * pour respecter le principe SSOT (Single Source of Truth)
 */

// ==================== ENUMS ====================

export enum UserRole {
  ADMIN = 'admin',
  TRAINING_ORG = 'training_org',
  STUDENT = 'student',
  MANAGER = 'manager',
  INSTRUCTOR = 'instructor'
}

export enum CourseStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

export enum EnrollmentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum ResourceType {
  VIDEO = 'video',
  PDF = 'pdf',
  PRESENTATION = 'presentation',
  QUIZ = 'quiz',
  EXAM = 'exam',
  DOCUMENT = 'document',
  LINK = 'link'
}

export enum AttemptStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  UNDER_REVIEW = 'under_review',
  GRADED = 'graded',
  SUSPENDED = 'suspended'
}

// ==================== USER TYPES ====================

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  organization?: string;
  organizationId?: string;
  mfaEnabled?: boolean;
  mfaVerified?: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface AuthUser extends User {
  emailVerified?: boolean;
  lastLogin?: Date | string;
}

// ==================== ORGANIZATION TYPES ====================

export interface TrainingOrganization {
  id: string;
  organizationName: string;
  description?: string;
  website?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  logo?: string;
  approvedAt?: Date | string;
  isApproved: boolean;
  certificationNumber?: string;
  specializations?: string[];
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== COURSE TYPES ====================

export interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationHours?: number;
  price?: number;
  currency?: string;
  language: string;
  thumbnailUrl?: string;
  status: CourseStatus;
  providerId: string;
  provider?: TrainingOrganization;
  objectives?: string[];
  prerequisites?: string[];
  targetAudience?: string[];
  certificationOffered?: boolean;
  maxStudents?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  publishedAt?: Date | string;
}

// ==================== MODULE TYPES ====================

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  durationMinutes?: number;
  isPublished: boolean;
  resources?: CourseResource[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== RESOURCE TYPES ====================

export interface CourseResource {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  fileUrl?: string;
  externalUrl?: string;
  mimeType?: string;
  fileSize?: number;
  duration?: number;
  orderIndex: number;
  metadata?: Record<string, any>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== SESSION TYPES ====================

export interface Session {
  id: string;
  courseId: string;
  course?: Course;
  startDate: Date | string;
  endDate: Date | string;
  location?: string;
  maxSeats: number;
  availableSeats: number;
  price: number;
  instructorName?: string;
  isOnline: boolean;
  meetingUrl?: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  enrollments?: Enrollment[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== ENROLLMENT TYPES ====================

export interface Enrollment {
  id: string;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  sessionId?: string;
  session?: Session;
  status: EnrollmentStatus;
  enrollmentDate: Date | string;
  completionDate?: Date | string;
  paymentStatus: PaymentStatus;
  paymentAmount?: number;
  paymentDate?: Date | string;
  progress?: EnrollmentProgress[];
  assignedBy?: string;
  companyId?: string;
  notes?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EnrollmentProgress {
  id: string;
  enrollmentId: string;
  moduleId: string;
  module?: CourseModule;
  completed: boolean;
  completionDate?: Date | string;
  timeSpentMinutes: number;
  score?: number;
  lastAccessedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== QUIZ TYPES ====================

export interface Quiz {
  id: string;
  moduleId: string;
  module?: CourseModule;
  title: string;
  description?: string;
  passingScore: number;
  maxAttempts?: number;
  timeLimitMinutes?: number;
  showCorrectAnswers: boolean;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  questions: QuizQuestion[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'true_false';
  points: number;
  explanation?: string;
  orderIndex: number;
  answers: QuizAnswer[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface QuizAnswer {
  id: string;
  questionId: string;
  answerText: string;
  isCorrect: boolean;
  orderIndex: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quiz?: Quiz;
  userId: string;
  user?: User;
  score: number;
  totalScore: number;
  passed: boolean;
  startedAt: Date | string;
  completedAt?: Date | string;
  timeTakenMinutes?: number;
  attemptNumber: number;
  attemptsRemaining?: number;
  responses: QuizResponse[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface QuizResponse {
  id: string;
  attemptId: string;
  questionId: string;
  question?: QuizQuestion;
  selectedAnswers: string[];
  isCorrect: boolean;
  pointsEarned: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== EXAM TYPES ====================

export interface Exam {
  id: string;
  moduleId: string;
  module?: CourseModule;
  title: string;
  description?: string;
  instructions?: string;
  passingScore: number;
  timeLimitMinutes: number;
  maxAttempts: number;
  configuration?: ExamConfiguration;
  questions: ExamQuestion[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamConfiguration {
  id: string;
  examId: string;
  securityLevel: 'low' | 'medium' | 'high' | 'maximum';
  enableWebcam: boolean;
  enableScreenRecord: boolean;
  enableTabSwitch: boolean;
  maxTabSwitches?: number;
  enableCopyPaste: boolean;
  enableRightClick: boolean;
  enablePrinting: boolean;
  enableDownloads: boolean;
  enableFullscreen: boolean;
  enableBrowserLock: boolean;
  detectMultipleMonitors: boolean;
  detectVirtualMachine: boolean;
  detectRemoteDesktop: boolean;
  recordAudio: boolean;
  aiProctoring: boolean;
  liveProctoring: boolean;
  identityVerification: boolean;
  roomScan: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamQuestion {
  id: string;
  examId: string;
  question: string;
  type: 'single_choice' | 'multiple_choice' | 'true_false' | 'essay';
  points: number;
  requiredLength?: number;
  orderIndex: number;
  answers?: ExamAnswer[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamAnswer {
  id: string;
  questionId: string;
  answerText: string;
  isCorrect: boolean;
  orderIndex: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  exam?: Exam;
  userId: string;
  user?: User;
  attemptNumber: number;
  startedAt: Date | string;
  submittedAt?: Date | string;
  score?: number;
  totalScore: number;
  status: AttemptStatus;
  timeTakenMinutes?: number;
  responses: ExamResponse[];
  examSession?: ExamSession;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamResponse {
  id: string;
  attemptId: string;
  questionId: string;
  question?: ExamQuestion;
  answer?: string;
  selectedOptions?: string[];
  isCorrect?: boolean;
  pointsAwarded?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ExamSession {
  id: string;
  attemptId: string;
  ipAddress?: string;
  userAgent?: string;
  browserLockdown: boolean;
  webcamEnabled: boolean;
  screenRecordingEnabled: boolean;
  suspiciousActivityCount: number;
  tabSwitchCount: number;
  copyAttempts: number;
  rightClickAttempts: number;
  screenshotAttempts: number;
  printAttempts: number;
  fullscreenExits: number;
  windowBlurCount: number;
  securityEvents: SecurityEvent[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SecurityEvent {
  id: string;
  sessionId: string;
  eventType: string;
  eventData?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date | string;
  ipAddress?: string;
  createdAt: Date | string;
}

// ==================== CERTIFICATE TYPES ====================

export interface Certificate {
  id: string;
  enrollmentId: string;
  enrollment?: Enrollment;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  certificateNumber: string;
  issueDate: Date | string;
  expiryDate?: Date | string;
  status: 'active' | 'revoked' | 'expired';
  templateId?: string;
  metadata?: Record<string, any>;
  pdfUrl?: string;
  blockchainTxHash?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// ==================== NOTIFICATION TYPES ====================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'system' | 'course' | 'enrollment' | 'payment' | 'certificate';
  isRead: boolean;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date | string;
  readAt?: Date | string;
}

// ==================== API RESPONSE TYPES ====================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ==================== FORM/DTO TYPES ====================

export interface LoginCredentials {
  email: string;
  password: string;
  otpCode?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationName?: string;
  phoneNumber?: string;
}

export interface CourseFilters {
  category?: string;
  subcategory?: string;
  level?: string;
  minPrice?: number;
  maxPrice?: number;
  language?: string;
  providerId?: string;
  status?: CourseStatus;
  search?: string;
}

export interface EnrollmentFilters {
  userId?: string;
  courseId?: string;
  sessionId?: string;
  status?: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
  companyId?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
}