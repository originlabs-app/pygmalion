import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { FilterEnrollmentsDto } from './dto/filter-enrollments.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    // Les étudiants peuvent s'inscrire eux-mêmes
    if (user.role === 'student') {
      createEnrollmentDto.user_id = user.id;
    }

    return this.enrollmentsService.create(createEnrollmentDto, user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() query: FilterEnrollmentsDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.enrollmentsService.findAll(query, user.id, user.role);
  }

  @Get('my-enrollments')
  @UseGuards(JwtAuthGuard)
  async findMyEnrollments(@CurrentUser() user: ICurrentUser) {
    return this.enrollmentsService.findByUser(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.enrollmentsService.findOne(id, user.id, user.role);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'training_org', 'manager')
  async update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.enrollmentsService.update(
      id,
      updateEnrollmentDto,
      user.id,
      user.role,
    );
  }

  @Patch(':id/progress')
  @UseGuards(JwtAuthGuard)
  async updateProgress(
    @Param('id') enrollmentId: string,
    @Body()
    progressData: {
      progressPercentage?: number;
      moduleProgress?: { moduleId: string; completed: boolean }[];
    },
    @CurrentUser() user: ICurrentUser,
  ) {
    // Seul l'étudiant inscrit peut mettre à jour son progrès
    await this.enrollmentsService.updateProgress(
      enrollmentId,
      progressData,
      user.id,
    );

    return { message: 'Progress updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    await this.enrollmentsService.remove(id, user.id, user.role);
    return { message: 'Enrollment deleted successfully' };
  }

  @Get('course/:courseId/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'training_org')
  async getCourseStats(
    @Param('courseId') courseId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.enrollmentsService.getStats(courseId, user.id, user.role);
  }
}
