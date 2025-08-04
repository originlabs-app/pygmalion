import { IsOptional, IsEnum, IsUUID, IsDateString, IsDecimal } from 'class-validator';
import { EnrollmentStatus, PaymentStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;

  @IsOptional()
  @IsDateString()
  completion_date?: string;

  @IsOptional()
  @Type(() => Number)
  score?: number;

  @IsOptional()
  @IsUUID()
  assigned_by?: string;

  @IsOptional()
  @IsUUID()
  company_id?: string;
} 