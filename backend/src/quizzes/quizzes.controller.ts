import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizAttemptService } from './services/quiz-attempt.service';
import { QuizReportingService } from './services/quiz-reporting.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';

@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly attemptService: QuizAttemptService,
    private readonly reportingService: QuizReportingService,
  ) {}

  // ====== CRUD Operations ======
  @Post()
  @Roles('training_org')
  create(@Body() createQuizDto: CreateQuizDto, @CurrentUser() user: ICurrentUser) {
    return this.quizzesService.create(createQuizDto, user.id);
  }

  @Get('module/:moduleId')
  @Roles('training_org')
  findByModule(@Param('moduleId') moduleId: string, @CurrentUser() user: ICurrentUser) {
    return this.quizzesService.findByModule(moduleId, user.id);
  }

  @Get(':id')
  @Roles('training_org')
  findOne(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.quizzesService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles('training_org')
  update(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.quizzesService.update(id, updateQuizDto, user.id);
  }

  @Delete(':id')
  @Roles('training_org')
  remove(@Param('id') id: string, @CurrentUser() user: ICurrentUser) {
    return this.quizzesService.remove(id, user.id);
  }

  // ====== Attempt Management ======
  @Post(':id/start')
  @Roles('student')
  startAttempt(
    @Param('id') quizId: string,
    @Body('enrollmentId') enrollmentId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.attemptService.startAttempt(quizId, enrollmentId, user.id);
  }

  @Post('submit')
  @Roles('student')
  submitAttempt(
    @Body() submitDto: SubmitQuizAttemptDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.attemptService.submitAttempt(submitDto, user.id);
  }

  // ====== Reporting Endpoints ======
  @Get(':id/attempts')
  @Roles('training_org')
  getQuizAttempts(@Param('id') quizId: string, @CurrentUser() user: ICurrentUser) {
    return this.reportingService.getQuizAttempts(quizId, user.id);
  }

  @Get('attempts/:attemptId')
  @Roles('training_org')
  getAttemptDetails(
    @Param('attemptId') attemptId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.reportingService.getAttemptDetails(attemptId, user.id);
  }

  @Get('course/:courseId/results')
  @Roles('training_org')
  getCourseQuizResults(
    @Param('courseId') courseId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.reportingService.getCourseQuizResults(courseId, user.id);
  }
}