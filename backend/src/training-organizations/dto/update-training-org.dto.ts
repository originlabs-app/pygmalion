import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateTrainingOrgDto {
  @IsString()
  @IsOptional()
  @Length(2, 100)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(14, 14)
  siret?: string;

  @IsEmail()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  contactPhone?: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsOptional()
  @IsString()
  website?: string;
}
