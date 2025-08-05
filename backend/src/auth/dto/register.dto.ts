import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from '@/users/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
