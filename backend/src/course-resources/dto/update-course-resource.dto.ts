import { IsOptional, IsString, IsEnum, IsInt, IsBoolean, IsUrl, Min } from 'class-validator';
import { ResourceType } from '@prisma/client';

export class UpdateCourseResourceDto {
  @IsOptional()
  @IsString()
  module_id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ResourceType)
  resource_type?: ResourceType;

  @IsOptional()
  @IsUrl()
  file_url?: string;

  @IsOptional()
  @IsUrl()
  external_url?: string;

  @IsOptional()
  @IsString()
  mime_type?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  file_size?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  order_index?: number;

  @IsOptional()
  @IsBoolean()
  is_downloadable?: boolean;
}