import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt, IsBoolean, IsUrl, Min } from 'class-validator';
import { ResourceType } from '@prisma/client';

export class CreateCourseResourceDto {
  @IsNotEmpty()
  @IsString()
  module_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ResourceType)
  resource_type: ResourceType;

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

  @IsInt()
  @Min(0)
  order_index: number;

  @IsOptional()
  @IsBoolean()
  is_downloadable?: boolean;
}