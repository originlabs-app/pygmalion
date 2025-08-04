import { IsOptional, IsEnum, IsString, IsInt, Min, Max, IsDateString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { SessionType } from '@prisma/client';

export class SessionQueryDto {
  @IsOptional()
  @IsUUID()
  course_id?: string;

  @IsOptional()
  @IsDateString()
  start_date_from?: string;

  @IsOptional()
  @IsDateString()
  start_date_to?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsEnum(SessionType)
  session_type?: SessionType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @IsOptional()
  @IsString()
  sortBy?: string = 'start_date';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'asc';
} 