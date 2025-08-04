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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async create(@Body() createCourseDto: CreateCourseDto, @Request() req) {
    // Si l'utilisateur est un organisme de formation, forcer son propre ID
    if (req.user.role === 'training_org') {
      // Récupérer l'ID de l'organisme de formation associé à l'utilisateur
      const userProfile = await this.coursesService['prisma'].userProfile.findUnique({
        where: { id: req.user.sub },
      });
      
      const trainingOrg = await this.coursesService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg) {
        throw new Error('Training organization not found for user');
      }

      createCourseDto.provider_id = trainingOrg.id;
    }

    return this.coursesService.create(createCourseDto);
  }

  @Get()
  async findAll(@Query() query: CourseQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get('provider/:providerId')
  @UseGuards(JwtAuthGuard)
  async findByProvider(
    @Param('providerId') providerId: string,
    @Query() query: Partial<CourseQueryDto>,
    @Request() req
  ) {
    // Vérifier que l'utilisateur a le droit d'accéder aux cours de ce provider
    if (req.user.role === 'training_org') {
      const trainingOrg = await this.coursesService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || trainingOrg.id !== providerId) {
        throw new Error('Unauthorized to access this provider courses');
      }
    }

    return this.coursesService.findByProvider(providerId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req
  ) {
    // Vérifier que l'organisme de formation peut modifier ce cours
    if (req.user.role === 'training_org') {
      const course = await this.coursesService.findOne(id);
      const trainingOrg = await this.coursesService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to update this course');
      }
    }

    return this.coursesService.update(id, updateCourseDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'draft' | 'published' | 'archived' | 'suspended',
    @Request() req
  ) {
    // Même vérification de propriété que pour update
    if (req.user.role === 'training_org') {
      const course = await this.coursesService.findOne(id);
      const trainingOrg = await this.coursesService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to update this course');
      }
    }

    return this.coursesService.updateStatus(id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async remove(@Param('id') id: string, @Request() req) {
    // Vérifier que l'organisme de formation peut supprimer ce cours
    if (req.user.role === 'training_org') {
      const course = await this.coursesService.findOne(id);
      const trainingOrg = await this.coursesService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to delete this course');
      }
    }

    return this.coursesService.remove(id);
  }
} 