import { IsOptional, IsEnum, IsString, IsInt, Min, Max, IsUUID, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { EnrollmentStatus, PaymentStatus } from '@prisma/client';

export class EnrollmentQueryDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
  course_id?: string;

  @IsOptional()
  @IsUUID()
  session_id?: string;

  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;

  @IsOptional()
  @IsUUID()
  company_id?: string;

  @IsOptional()
  @IsDateString()
  enrollment_date_from?: string;

  @IsOptional()
  @IsDateString()
  enrollment_date_to?: string;

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
  sortBy?: string = 'enrollment_date';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
} 