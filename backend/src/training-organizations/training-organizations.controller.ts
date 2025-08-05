import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { TrainingOrganizationsService } from './training-organizations.service';
import { CreateTrainingOrgDto } from './dto/create-training-org.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ICurrentUser } from '@/common/interfaces/current-user.interface';
import { UserRole, VerificationStatus } from '@prisma/client';
import { UpdateTrainingOrgDto } from './dto/update-training-org.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { ExternalMediaDto } from './dto/external-media.dto';

@Controller('training-organizations')
export class TrainingOrganizationsController {
  constructor(
    private readonly trainingOrganizationsService: TrainingOrganizationsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  create(
    @Body() createTrainingOrgDto: CreateTrainingOrgDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.trainingOrganizationsService.create(
      createTrainingOrgDto,
      user.id,
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  getMyOrg(@CurrentUser() user: ICurrentUser) {
    return this.trainingOrganizationsService.findByUserId(user.id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  updateMyOrg(
    @Body() dto: UpdateTrainingOrgDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.trainingOrganizationsService.update(user.id, dto);
  }

  // ==== Endpoints Documents ====
  @Post('documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  @UseInterceptors(FileInterceptor('file'))
  uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    return this.trainingOrganizationsService.uploadDocument(
      user.id,
      file.buffer,
      file.originalname,
      file.mimetype,
      dto,
    );
  }

  @Post('external-media')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  addExternalMedia(
    @Body() dto: ExternalMediaDto,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.trainingOrganizationsService.addExternalMedia(user.id, dto);
  }

  @Get('documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  getDocuments(@CurrentUser() user: ICurrentUser) {
    return this.trainingOrganizationsService.getDocuments(user.id);
  }

  @Delete('documents/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  deleteDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.trainingOrganizationsService.deleteDocument(
      user.id,
      documentId,
    );
  }

  @Get('documents/:id/url')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org)
  getDocumentUrl(
    @Param('id') documentId: string,
    @CurrentUser() user: ICurrentUser,
  ) {
    return this.trainingOrganizationsService.getDocumentUrl(
      user.id,
      documentId,
    );
  }

  // ==== Endpoints Admin ====
  @Get('/admin/organizations-approvals')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getPendingOrgs() {
    return this.trainingOrganizationsService.findPending();
  }

  @Get('/admin/organizations')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getAllOrgs() {
    return this.trainingOrganizationsService.getAllOrganizations();
  }

  @Get('/admin/organizations/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getOrgById(@Param('id') id: string) {
    return this.trainingOrganizationsService.findById(id);
  }

  @Get('/admin/organizations/:id/documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  getOrgDocuments(@Param('id') id: string) {
    return this.trainingOrganizationsService.getOrganizationDocuments(id);
  }

  @Post('/admin/organizations/:id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  approveOrg(@Param('id') id: string, @Body() body: { comment?: string }) {
    return this.trainingOrganizationsService.updateStatus(
      id,
      VerificationStatus.verified,
      body.comment,
    );
  }

  @Post('/admin/organizations/:id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  rejectOrg(@Param('id') id: string, @Body() body: { comment?: string }) {
    return this.trainingOrganizationsService.updateStatus(
      id,
      VerificationStatus.rejected,
      body.comment,
    );
  }
}
