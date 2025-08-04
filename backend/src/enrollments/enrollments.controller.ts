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
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentQueryDto } from './dto/enrollment-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto, @Request() req) {
    // Les étudiants peuvent s'inscrire eux-mêmes, les managers peuvent inscrire leurs équipes
    if (req.user.role === 'student') {
      createEnrollmentDto.user_id = req.user.sub;
    } else if (req.user.role === 'manager') {
      // Vérifier que l'utilisateur à inscrire fait partie de l'équipe du manager
      // TODO: Implémenter la logique de vérification d'équipe
      createEnrollmentDto.assigned_by = req.user.sub;
    }

    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'training_org', 'manager')
  async findAll(@Query() query: EnrollmentQueryDto, @Request() req) {
    // Les organismes de formation ne voient que leurs inscriptions
    if (req.user.role === 'training_org') {
      const trainingOrg = await this.enrollmentsService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (trainingOrg) {
        // Filtrer par les cours de cet organisme
        const orgCourses = await this.enrollmentsService['prisma'].course.findMany({
          where: { provider_id: trainingOrg.id },
          select: { id: true },
        });

        if (orgCourses.length === 0) {
          return { data: [], meta: { total: 0, page: 1, limit: 20, totalPages: 0 } };
        }

        // Ajouter un filtre pour les cours de cet organisme
        // Note: Cette approche nécessiterait une modification du service pour accepter un array de course_ids
        // Pour l'instant, on laisse passer et on filtrera côté service si nécessaire
      }
    }

    return this.enrollmentsService.findAll(query);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async findByUser(
    @Param('userId') userId: string,
    @Query() query: Partial<EnrollmentQueryDto>,
    @Request() req
  ) {
    // Vérifier que l'utilisateur peut accéder à ces inscriptions
    if (req.user.role === 'student' && req.user.sub !== userId) {
      throw new Error('Unauthorized to access other user enrollments');
    }

    return this.enrollmentsService.findByUser(userId, query);
  }

  @Get('my-enrollments')
  @UseGuards(JwtAuthGuard)
  async findMyEnrollments(@Query() query: Partial<EnrollmentQueryDto>, @Request() req) {
    return this.enrollmentsService.findByUser(req.user.sub, query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req) {
    const enrollment = await this.enrollmentsService.findOne(id);

    // Vérifier que l'utilisateur peut accéder à cette inscription
    if (req.user.role === 'student' && req.user.sub !== enrollment.user_id) {
      throw new Error('Unauthorized to access this enrollment');
    }

    if (req.user.role === 'training_org') {
      const trainingOrg = await this.enrollmentsService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || (enrollment as any).course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to access this enrollment');
      }
    }

    return enrollment;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'training_org', 'manager')
  async update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
    @Request() req
  ) {
    // Vérifier les permissions selon le rôle
    if (req.user.role === 'training_org') {
      const enrollment = await this.enrollmentsService.findOne(id);
      const trainingOrg = await this.enrollmentsService['prisma'].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || (enrollment as any).course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to update this enrollment');
      }
    }

    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Patch(':id/progress/:moduleId')
  @UseGuards(JwtAuthGuard)
  async updateProgress(
    @Param('id') enrollmentId: string,
    @Param('moduleId') moduleId: string,
    @Body() progressData: {
      completed: boolean;
      timeSpentMinutes?: number;
      score?: number;
    },
    @Request() req
  ) {
    const enrollment = await this.enrollmentsService.findOne(enrollmentId);

    // Seul l'étudiant inscrit peut mettre à jour son progrès
    if (req.user.sub !== enrollment.user_id) {
      throw new Error('Unauthorized to update progress for this enrollment');
    }

    return this.enrollmentsService.updateProgress(enrollmentId, moduleId, progressData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'student')
  async remove(@Param('id') id: string, @Request() req) {
    const enrollment = await this.enrollmentsService.findOne(id);

    // Vérifier les permissions selon le rôle
    if (req.user.role === 'student' && req.user.sub !== enrollment.user_id) {
      throw new Error('Unauthorized to delete this enrollment');
    }

    if (req.user.role === 'manager') {
      // Vérifier que l'inscription a été assignée par ce manager
      if (enrollment.assigned_by !== req.user.sub) {
        throw new Error('Unauthorized to delete this enrollment');
      }
    }

    return this.enrollmentsService.remove(id);
  }
} 