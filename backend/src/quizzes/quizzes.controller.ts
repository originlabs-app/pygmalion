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
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('quizzes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Roles(UserRole.training_org, UserRole.admin)
  create(@Body() createDto: CreateQuizDto, @CurrentUser() user: any) {
    return this.quizzesService.create(createDto, user.sub);
  }

  @Get(':id')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.quizzesService.findOne(id, user.sub);
  }

  @Get('module/:moduleId')
  @Roles(UserRole.training_org, UserRole.admin, UserRole.student)
  findByModule(@Param('moduleId') moduleId: string, @CurrentUser() user: any) {
    return this.quizzesService.findByModule(moduleId, user.sub);
  }

  @Patch(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateQuizDto,
    @CurrentUser() user: any,
  ) {
    return this.quizzesService.update(id, updateDto, user.sub);
  }

  @Delete(':id')
  @Roles(UserRole.training_org, UserRole.admin)
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.quizzesService.remove(id, user.sub);
  }

  @Post(':id/start-attempt')
  @Roles(UserRole.student)
  startAttempt(
    @Param('id') quizId: string,
    @Body() { enrollmentId }: { enrollmentId: string },
    @CurrentUser() user: any,
  ) {
    return this.quizzesService.startAttempt(quizId, enrollmentId, user.sub);
  }

  @Post('submit-attempt')
  @Roles(UserRole.student)
  submitAttempt(
    @Body() submitDto: SubmitQuizAttemptDto,
    @CurrentUser() user: any,
  ) {
    return this.quizzesService.submitAttempt(submitDto, user.sub);
  }

  // Endpoints pour OF - Gestion des résultats
  @Get(':id/attempts')
  @Roles(UserRole.training_org, UserRole.admin)
  getQuizAttempts(@Param('id') quizId: string, @CurrentUser() user: any) {
    return this.quizzesService.getQuizAttempts(quizId, user.sub);
  }

  @Get('attempts/:attemptId')
  @Roles(UserRole.training_org, UserRole.admin)
  getAttemptDetails(@Param('attemptId') attemptId: string, @CurrentUser() user: any) {
    return this.quizzesService.getAttemptDetails(attemptId, user.sub);
  }

  @Get('course/:courseId/results')
  @Roles(UserRole.training_org, UserRole.admin)
  getCourseQuizResults(@Param('courseId') courseId: string, @CurrentUser() user: any) {
    return this.quizzesService.getCourseQuizResults(courseId, user.sub);
  }
}