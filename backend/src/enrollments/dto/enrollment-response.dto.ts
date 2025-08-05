import { EnrollmentStatus } from '@prisma/client';
import { SessionResponseDto } from './session-response.dto';
import { CourseResponseDto } from './course-response.dto';
import { UserResponseDto } from './user-response.dto';

export class EnrollmentResponseDto {
  id: string;
  user_id: string;
  course_id: string;
  session_id: string;
  status: EnrollmentStatus;
  enrollment_date: Date;
  completion_date?: Date;
  score?: number;
  session?: SessionResponseDto;
  course?: CourseResponseDto;
  user?: UserResponseDto;
}
