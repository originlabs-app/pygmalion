import { Injectable } from '@nestjs/common';
import { EnrollmentResponseDto } from '../dto/enrollment-response.dto';
import { SessionResponseDto } from '../dto/session-response.dto';
import { CourseResponseDto } from '../dto/course-response.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { Enrollment, Session, Course, UserProfile } from '@prisma/client';

@Injectable()
export class EnrollmentMapperService {
  toEnrollmentResponse(enrollment: Enrollment & {
    session?: Session;
    course?: Course;
    user?: UserProfile;
  }): EnrollmentResponseDto {
    return {
      id: enrollment.id,
      user_id: enrollment.user_id,
      course_id: enrollment.course_id,
      session_id: enrollment.session_id,
      status: enrollment.status,
      enrollment_date: enrollment.enrollment_date,
      completion_date: enrollment.completion_date || undefined,
      score: enrollment.score ? Number(enrollment.score) : undefined,
      session: enrollment.session ? this.toSessionResponse(enrollment.session) : undefined,
      course: enrollment.course ? this.toCourseResponse(enrollment.course) : undefined,
      user: enrollment.user ? this.toUserResponse(enrollment.user) : undefined,
    };
  }

  private toSessionResponse(session: Session): SessionResponseDto {
    return {
      id: session.id,
      start_date: session.start_date,
      end_date: session.end_date,
      location: session.location || undefined,
      max_capacity: session.max_seats,
      current_capacity: session.max_seats - session.available_seats,
      price: Number(session.price),
      modality: session.session_type || 'regular',
    };
  }

  private toCourseResponse(course: Course): CourseResponseDto {
    return {
      id: course.id,
      title: course.title,
      description: course.description || undefined,
      category: course.category,
      level: 'intermediate', // Default level, Course model doesn't have this field
      duration_hours: course.duration_hours || 0,
      thumbnail_url: course.image_url || undefined,
    };
  }

  private toUserResponse(user: UserProfile): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: undefined, // UserProfile doesn't have avatar_url field
    };
  }
}