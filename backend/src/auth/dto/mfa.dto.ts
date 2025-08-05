import { IsString, IsNotEmpty, Length } from 'class-validator';

export class VerifyMfaDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Le code OTP doit contenir exactement 6 chiffres' })
  token: string;
}

export class EnableMfaDto {
  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Le code OTP doit contenir exactement 6 chiffres' })
  token: string;
}

export class MfaSetupResponseDto {
  secret: string;
  qrCodeDataUrl: string;
  backupCodes?: string[];
}

export class MfaStatusDto {
  enabled: boolean;
}
