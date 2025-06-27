export class TrainingOrgResponseDto {
  id: string;
  name: string;
  siret?: string | null;
  description?: string | null;
  address?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  verificationStatus: string;
  qualiopiCertified: boolean;
  qualiopiNumber?: string | null;
  createdAt: Date;
  updatedAt: Date;
} 