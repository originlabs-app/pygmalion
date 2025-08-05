import { Controller, Put, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(
    @CurrentUser() user: ICurrentUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<UserProfile> {
    // We can use UpdateProfileDto as it's a subset of UpdateUserDto
    // and the service method handles optional fields.
    return this.usersService.update(user.id, updateProfileDto);
  }
}
