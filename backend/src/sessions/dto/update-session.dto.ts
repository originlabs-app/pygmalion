import { IsOptional, IsString, IsEnum, IsInt, IsUUID, Min, IsDateString, IsUrl } from 'class-validator';
import { SessionType } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateSessionDto {
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  max_seats?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  available_seats?: number;

  @IsOptional()
  @IsString()
  lms_course_id?: string;

  @IsOptional()
  @IsUrl()
  virtual_meeting_url?: string;

  @IsOptional()
  @IsString()
  virtual_meeting_password?: string;

  @IsOptional()
  @IsEnum(SessionType)
  session_type?: SessionType;
} 