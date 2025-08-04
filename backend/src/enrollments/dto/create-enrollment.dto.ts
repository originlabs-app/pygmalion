import { IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { EnrollmentStatus, PaymentStatus } from '@prisma/client';

export class CreateEnrollmentDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  course_id: string;

  @IsNotEmpty()
  @IsUUID()
  session_id: string;

  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  payment_status?: PaymentStatus;

  @IsOptional()
  @IsUUID()
  assigned_by?: string;

  @IsOptional()
  @IsUUID()
  company_id?: string;
} 