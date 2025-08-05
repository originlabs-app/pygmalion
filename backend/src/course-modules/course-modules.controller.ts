import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';
import { UserRole } from '@prisma/client';

@Controller('course-modules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  @Roles(UserRole.training_org, UserRole.admin)
  create(@Body() createDto: CreateCourseModuleDto, @CurrentUser() user: ICurrentUser) {
    return this.courseModulesService.create(createDto, user.id);
  }

  @Get('course/:courseId')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findAllByCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseModulesService.findAll(courseId, user.id);
  }

  @Get(':id')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.courseModulesService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseModuleDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseModulesService.update(id, updateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.courseModulesService.remove(id, user.id);
  }

  @Post('course/:courseId/reorder')
  @Roles(UserRole.training_org, UserRole.admin)
  reorderModules(
    @Param('courseId') courseId: string,
    @Body() { moduleIds }: { moduleIds: string[] },
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseModulesService.reorderModules(
      courseId,
      moduleIds,
      user.id,
    );
  }
}
