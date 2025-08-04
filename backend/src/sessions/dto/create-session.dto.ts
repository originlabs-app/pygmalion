import { IsNotEmpty, IsString, IsOptional, IsEnum, IsInt, IsUUID, Min, IsDateString, IsDecimal, IsUrl } from 'class-validator';
import { SessionType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsUUID()
  course_id: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @Type(() => Number)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  max_seats: number;

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