import { ResourceType } from '@prisma/client';

export class CourseResourceResponseDto {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  resource_type: ResourceType;
  file_url?: string;
  external_url?: string;
  mime_type?: string;
  file_size?: number;
  duration?: number;
  order_index: number;
  is_downloadable: boolean;
  created_at: Date;
  updated_at: Date;
}