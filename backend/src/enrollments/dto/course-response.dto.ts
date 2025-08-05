export class CourseResponseDto {
  id: string;
  title: string;
  description?: string;
  category: string;
  level: string;
  duration_hours: number;
  thumbnail_url?: string;
}
