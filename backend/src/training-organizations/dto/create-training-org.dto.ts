import { IsString, IsEmail, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrainingOrgDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  siret: string;

  @IsEmail()
  @IsNotEmpty()
  contactEmail: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  contactPhone: string;

  @IsString()
  contactName: string;

  @IsOptional()
  @IsString()
  website?: string;
} 