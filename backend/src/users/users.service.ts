import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UserProfile } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
    authUserId: string,
  ): Promise<UserProfile> {
    const { firstName, lastName, ...rest } = createUserDto;
    return this.prisma.userProfile.create({
      data: {
        id: authUserId,
        first_name: firstName,
        last_name: lastName,
        ...rest,
      },
    });
  }

  async findOne(id: string): Promise<UserProfile> {
    const user = await this.prisma.userProfile.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserProfile> {
    const user = await this.prisma.userProfile.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserProfile> {
    const { firstName, lastName, ...rest } = updateUserDto;
    const updateData: Record<string, unknown> = { ...rest };

    // Map camelCase to snake_case pour Prisma
    if (firstName !== undefined) {
      updateData.first_name = firstName;
    }
    if (lastName !== undefined) {
      updateData.last_name = lastName;
    }

    return this.prisma.userProfile.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string): Promise<UserProfile> {
    return this.prisma.userProfile.delete({ where: { id } });
  }

  async updateEmail(id: string, newEmail: string): Promise<UserProfile> {
    return this.prisma.userProfile.update({
      where: { id },
      data: { email: newEmail },
    });
  }
}
