import { IsString, IsUrl, IsOptional, IsInt, Min } from 'class-validator';

export class ExternalMediaDto {
  @IsUrl()
  url: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  duration?: number; // en secondes
}
