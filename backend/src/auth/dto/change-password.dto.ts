import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsStrongPassword,
  Matches,
  NotEquals,
} from 'class-validator';

export class ChangePasswordDto {
  @IsString({
    message: 'Le mot de passe actuel doit être une chaîne de caractères',
  })
  @IsNotEmpty({ message: 'Le mot de passe actuel est requis' })
  @MaxLength(128, {
    message: 'Le mot de passe ne peut pas dépasser 128 caractères',
  })
  currentPassword: string;

  @IsString({
    message: 'Le nouveau mot de passe doit être une chaîne de caractères',
  })
  @IsNotEmpty({ message: 'Le nouveau mot de passe est requis' })
  @MinLength(8, {
    message: 'Le nouveau mot de passe doit contenir au moins 8 caractères',
  })
  @MaxLength(128, {
    message: 'Le nouveau mot de passe ne peut pas dépasser 128 caractères',
  })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Le nouveau mot de passe doit contenir au moins une lettre majuscule, une minuscule, un chiffre et un caractère spécial',
    },
  )
  @Matches(/^(?!.*\s).*$/, {
    message: "Le mot de passe ne doit pas contenir d'espaces",
  })
  @NotEquals('currentPassword', {
    message: "Le nouveau mot de passe doit être différent de l'ancien",
  })
  newPassword: string;
}
