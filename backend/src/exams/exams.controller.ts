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
import { ExamAttemptService } from './services/exam-attempt.service';
import { ExamReportingService } from './services/exam-reporting.service';
import { ExamStatisticsService } from './services/exam-statistics.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import {
  SubmitExamAttemptDto,
  StartExamAttemptDto,
} from './dto/submit-exam-attempt.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';

@Controller('exams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly attemptService: ExamAttemptService,
    private readonly reportingService: ExamReportingService,
    private readonly statisticsService: ExamStatisticsService,
  ) {}

  // ====== CRUD Operations ======
  @Post()
  @Roles('training_org')
  create(@Body() createExamDto: CreateExamDto, @CurrentUser() user: ICurrentUser) {
    return this.examsService.create(createExamDto, user.id);
  }

  @Get('module/:moduleId')
  @Roles('training_org')
  findByModule(@Param('moduleId') moduleId: string, @CurrentUser() user: ICurrentUser) {
    return this.examsService.findByModule(moduleId, user.id);
  }

  @Get(':id')
  @Roles('training_org')
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.examsService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles('training_org')
  update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.examsService.update(id, updateExamDto, user.id);
  }

  @Delete(':id')
  @Roles('training_org')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.examsService.remove(id, user.id);
  }

  // ====== Attempt Management ======
  @Post(':id/start')
  @Roles('student')
  startAttempt(
    @Param('id') examId: string,
    @Body() startDto: StartExamAttemptDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.attemptService.startAttempt(examId, startDto, user.id);
  }

  @Post('submit')
  @Roles('student')
  submitAttempt(
    @Body() submitDto: SubmitExamAttemptDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.attemptService.submitAttempt(submitDto, user.id);
  }

  // ====== Reporting Endpoints ======
  @Get(':id/attempts')
  @Roles('training_org')
  getExamAttempts(@Param('id') examId: string, @CurrentUser() user: ICurrentUser) {
    return this.reportingService.getExamAttempts(examId, user.id);
  }

  @Get('attempts/:attemptId')
  @Roles('training_org')
  getAttemptDetails(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.reportingService.getExamAttemptDetails(attemptId, user.id);
  }

  @Get('attempts/:attemptId/security')
  @Roles('training_org')
  getAttemptSecurityEvents(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.reportingService.getAttemptSecurityEvents(attemptId, user.id);
  }

  // ====== Statistics Endpoints ======
  @Get('course/:courseId/results')
  @Roles('training_org')
  getCourseExamResults(
    @Param('courseId') courseId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.statisticsService.getCourseExamResults(courseId, user.id);
  }
}