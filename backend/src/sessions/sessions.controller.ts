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
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionQueryDto } from './dto/session-query.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async create(@Body() createSessionDto: CreateSessionDto, @Request() req) {
    // Vérifier que l'organisme de formation peut créer des sessions pour ce cours
    if (req.user.role === 'training_org') {
      const course = await this.sessionsService['prisma'].course.findUnique({
        where: { id: createSessionDto.course_id },
        include: { provider: true },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      const trainingOrg = await this.sessionsService[
        'prisma'
      ].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (!trainingOrg || course.provider_id !== trainingOrg.id) {
        throw new Error('Unauthorized to create sessions for this course');
      }
    }

    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  async findAll(@Query() query: SessionQueryDto) {
    return this.sessionsService.findAll(query);
  }

  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.sessionsService.findByCourse(courseId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @Request() req,
  ) {
    // Vérifier que l'organisme de formation peut modifier cette session
    if (req.user.role === 'training_org') {
      const session = await this.sessionsService['prisma'].session.findUnique({
        where: { id },
        include: { course: true },
      });
      const trainingOrg = await this.sessionsService[
        'prisma'
      ].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (
        !trainingOrg ||
        session?.course.provider_id !== trainingOrg.id
      ) {
        throw new Error('Unauthorized to update this session');
      }
    }

    return this.sessionsService.update(id, updateSessionDto);
  }

  @Patch(':id/available-seats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async updateAvailableSeats(@Param('id') id: string, @Request() req) {
    // Vérifier que l'organisme de formation peut modifier cette session
    if (req.user.role === 'training_org') {
      const session = await this.sessionsService['prisma'].session.findUnique({
        where: { id },
        include: { course: true },
      });
      const trainingOrg = await this.sessionsService[
        'prisma'
      ].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (
        !trainingOrg ||
        session?.course.provider_id !== trainingOrg.id
      ) {
        throw new Error('Unauthorized to update this session');
      }
    }

    return this.sessionsService.updateAvailableSeats(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('training_org', 'admin')
  async remove(@Param('id') id: string, @Request() req) {
    // Vérifier que l'organisme de formation peut supprimer cette session
    if (req.user.role === 'training_org') {
      const session = await this.sessionsService['prisma'].session.findUnique({
        where: { id },
        include: { course: true },
      });
      const trainingOrg = await this.sessionsService[
        'prisma'
      ].trainingOrganization.findFirst({
        where: { user_id: req.user.sub },
      });

      if (
        !trainingOrg ||
        session?.course.provider_id !== trainingOrg.id
      ) {
        throw new Error('Unauthorized to delete this session');
      }
    }

    return this.sessionsService.remove(id);
  }
}
