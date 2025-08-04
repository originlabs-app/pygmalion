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
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('course-modules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  @Roles(UserRole.training_org, UserRole.admin)
  create(@Body() createDto: CreateCourseModuleDto, @CurrentUser() user: any) {
    return this.courseModulesService.create(createDto, user.sub);
  }

  @Get('course/:courseId')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findAllByCourse(@Param('courseId') courseId: string, @CurrentUser() user: any) {
    return this.courseModulesService.findAll(courseId, user.sub);
  }

  @Get(':id')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.courseModulesService.findOne(id, user.sub);
  }

  @Patch(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseModuleDto,
    @CurrentUser() user: any,
  ) {
    return this.courseModulesService.update(id, updateDto, user.sub);
  }

  @Delete(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.courseModulesService.remove(id, user.sub);
  }

  @Post('course/:courseId/reorder')
  @Roles(UserRole.training_org, UserRole.admin)
  reorderModules(
    @Param('courseId') courseId: string,
    @Body() { moduleIds }: { moduleIds: string[] },
    @CurrentUser() user: any,
  ) {
    return this.courseModulesService.reorderModules(courseId, moduleIds, user.sub);
  }
}