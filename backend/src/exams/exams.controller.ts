import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { SubmitExamAttemptDto, StartExamAttemptDto } from './dto/submit-exam-attempt.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('exams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @Roles('training_org')
  create(@Body() createExamDto: CreateExamDto, @Req() req) {
    return this.examsService.create(createExamDto, req.user.userId);
  }

  @Get('module/:moduleId')
  @Roles('training_org')
  findByModule(@Param('moduleId') moduleId: string, @Req() req) {
    return this.examsService.findByModule(moduleId, req.user.userId);
  }

  @Get(':id')
  @Roles('training_org')
  findOne(@Param('id') id: string, @Req() req) {
    return this.examsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  @Roles('training_org')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto, @Req() req) {
    return this.examsService.update(id, updateExamDto, req.user.userId);
  }

  @Delete(':id')
  @Roles('training_org')
  remove(@Param('id') id: string, @Req() req) {
    return this.examsService.remove(id, req.user.userId);
  }

  // Endpoints pour les étudiants
  @Post(':id/start')
  @Roles('student')
  startExamAttempt(
    @Param('id') examId: string,
    @Body() startDto: StartExamAttemptDto,
    @Req() req,
  ) {
    return this.examsService.startAttempt(examId, startDto, req.user.userId);
  }

  @Post('submit')
  @Roles('student')
  submitExamAttempt(@Body() submitDto: SubmitExamAttemptDto, @Req() req) {
    return this.examsService.submitAttempt(submitDto, req.user.userId);
  }

  // Endpoints pour OF - Gestion des résultats d'examens
  @Get(':id/attempts')
  @Roles('training_org', 'admin')
  getExamAttempts(@Param('id') examId: string, @Req() req) {
    return this.examsService.getExamAttempts(examId, req.user.userId);
  }

  @Get('attempts/:attemptId')
  @Roles('training_org', 'admin')
  getExamAttemptDetails(@Param('attemptId') attemptId: string, @Req() req) {
    return this.examsService.getExamAttemptDetails(attemptId, req.user.userId);
  }

  @Get('course/:courseId/results')
  @Roles('training_org', 'admin')
  getCourseExamResults(@Param('courseId') courseId: string, @Req() req) {
    return this.examsService.getCourseExamResults(courseId, req.user.userId);
  }

  @Get('attempts/:attemptId/security-events')
  @Roles('training_org', 'admin')
  getAttemptSecurityEvents(@Param('attemptId') attemptId: string, @Req() req) {
    return this.examsService.getAttemptSecurityEvents(attemptId, req.user.userId);
  }
}