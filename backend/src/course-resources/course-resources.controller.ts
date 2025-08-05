import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseResourcesService } from './course-resources.service';
import { CreateCourseResourceDto } from './dto/create-course-resource.dto';
import { UpdateCourseResourceDto } from './dto/update-course-resource.dto';
import { UploadResourceDto } from './dto/upload-resource.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';
import { UserRole } from '@prisma/client';

@Controller('course-resources')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseResourcesController {
  constructor(
    private readonly courseResourcesService: CourseResourcesService,
  ) {}

  @Post()
  @Roles(UserRole.training_org, UserRole.admin)
  create(@Body() createDto: CreateCourseResourceDto, @CurrentUser() user: ICurrentUser) {
    return this.courseResourcesService.create(createDto, user.id);
  }

  @Post('upload')
  @Roles(UserRole.training_org, UserRole.admin)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadDto: UploadResourceDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    return this.courseResourcesService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      uploadDto,
      user.id,
    );
  }

  @Post('external-video')
  @Roles(UserRole.training_org, UserRole.admin)
  addExternalVideo(
    @Body() body: { url: string } & UploadResourceDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    const { url, ...uploadDto } = body;
    return this.courseResourcesService.addExternalVideo(
      url,
      uploadDto,
      user.id,
    );
  }

  @Get('module/:moduleId')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findAllByModule(
    @Param('moduleId') moduleId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseResourcesService.findAllByModule(moduleId, user.id);
  }

  @Get(':id')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.courseResourcesService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseResourceDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseResourcesService.update(id, updateDto, user.id);
  }

  @Delete(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.courseResourcesService.remove(id, user.id);
  }

  @Post('module/:moduleId/reorder')
  @Roles(UserRole.training_org, UserRole.admin)
  reorderResources(
    @Param('moduleId') moduleId: string,
    @Body() { resourceIds }: { resourceIds: string[] },
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.courseResourcesService.reorderResources(
      moduleId,
      resourceIds,
      user.id,
    );
  }
}
