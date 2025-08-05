import { IsString, IsOptional } from 'class-validator';

export class UploadDocumentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  documentType?: 'qualiopi' | 'siret' | 'other';
}
