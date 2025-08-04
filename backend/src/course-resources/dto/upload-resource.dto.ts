import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt, IsBoolean, Min } from 'class-validator';
import { ResourceType } from '@prisma/client';

export class UploadResourceDto {
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

  @IsInt()
  @Min(0)
  order_index: number;

  @IsOptional()
  @IsBoolean()
  is_downloadable?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number; // Pour les vidéos/audio en secondes
}