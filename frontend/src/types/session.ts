/**
 * Types pour les sessions de formation
 */

export interface Session {
  id: string;
  course_id: string;
  start_date?: string;
  startDate?: string; // Alternative pour compatibilité
  end_date?: string;
  endDate?: string; // Alternative pour compatibilité
  location?: string;
  price: number;
  available_seats?: number;
  availableSeats?: number; // Alternative pour compatibilité
  max_seats?: number;
  maxSeats?: number; // Alternative pour compatibilité
  lms_course_id?: string;
  virtual_meeting_url?: string;
  virtual_meeting_password?: string;
  session_type?: 'regular' | 'private';
  created_at?: string;
  updated_at?: string;
}