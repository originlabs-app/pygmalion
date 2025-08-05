import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UpdateEmailDto {
  @IsEmail({}, { message: 'Veuillez entrer une adresse email valide' })
  @IsNotEmpty({ message: 'La nouvelle adresse email est requise' })
  newEmail: string;

  @IsString()
  @IsNotEmpty({
    message: 'Le mot de passe est requis pour confirmer le changement',
  })
  password: string;
}
