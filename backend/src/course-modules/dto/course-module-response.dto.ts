import { ModuleType } from '@prisma/client';

export class CourseModuleResponseDto {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  duration_minutes?: number;
  module_type: ModuleType;
  is_mandatory: boolean;
  passing_score?: number;
  created_at: Date;
  updated_at: Date;
  
  // Relations optionnelles
  resources?: any[];
  quiz?: any;
  exam?: any;
  progress?: any[];
}