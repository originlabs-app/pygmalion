import { 
  Controller, 
  Post, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Body, 
  BadRequestException,
  Get,
  Param,
  Delete,
  ForbiddenException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { UploadService } from '../services/upload.service';
import { PrismaService } from '../../prisma/prisma.service';

export interface CourseContentUploadDto {
  moduleId?: string;
  title?: string;
  description?: string;
  contentType: 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm';
}

export interface ExternalVideoDto {
  url: string;
  title: string;
  description?: string;
  moduleId?: string;
}

@Controller('uploads')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Upload de contenu de cours (vidéos, PDFs, etc.)
   */
  @Post('course-content')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org, UserRole.admin)
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB max, mais validation plus fine dans le service
    },
  }))
  async uploadCourseContent(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CourseContentUploadDto,
    @CurrentUser() user: any,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    // Validation du type de contenu avec support étendu
    const allowedTypes = {
      'video': ['video/mp4', 'video/webm', 'video/quicktime'], // Petites vidéos seulement
      'pdf': ['application/pdf'],
      'audio': ['audio/mp3', 'audio/wav', 'audio/mpeg', 'audio/aac', 'audio/ogg'],
      'image': ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
      'document': [
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ],
      'presentation': [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ],
      'scorm': ['application/zip', 'application/x-zip-compressed']
    };

    const expectedTypes = allowedTypes[dto.contentType];
    if (!expectedTypes || !expectedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Type de fichier incorrect. Attendu: ${expectedTypes?.join(', ')}`
      );
    }

    try {
      // Upload vers Supabase Storage
      const result = await this.uploadService.uploadDocument(
        user.orgId || user.id, // utilise l'orgId si c'est un training_org
        file.buffer,
        file.originalname,
        file.mimetype,
      );

      // Génération d'une URL signée pour l'accès
      const signedUrl = await this.uploadService.generateSignedUrl(
        result.storagePath,
        3600 * 24 // 24h d'accès
      );

      return {
        success: true,
        data: {
          id: result.id,
          filename: result.filename,
          mimeType: result.mimeType,
          size: result.size,
          contentType: dto.contentType,
          url: signedUrl,
          storagePath: result.storagePath,
          moduleId: dto.moduleId,
          title: dto.title,
          description: dto.description,
          uploadedAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de l'upload: ${error.message}`
      );
    }
  }

  /**
   * Ajout de vidéo externe (YouTube/Vimeo)
   */
  @Post('external-video')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org, UserRole.admin)
  async addExternalVideo(
    @Body() dto: ExternalVideoDto,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.uploadService.validateExternalMedia(
        dto.url,
        dto.title
      );

      return {
        success: true,
        data: {
          id: result.id,
          title: result.title,
          contentType: 'video',
          storageType: result.storageType,
          url: result.externalUrl,
          thumbnailUrl: result.thumbnailUrl,
          duration: result.duration,
          moduleId: dto.moduleId,
          description: dto.description,
          uploadedAt: new Date().toISOString(),
        }
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de l'ajout de la vidéo: ${error.message}`
      );
    }
  }

  /**
   * Génération d'URL signée pour accès à un fichier
   */
  @Get('signed-url/:storagePath')
  @UseGuards(JwtAuthGuard)
  async getSignedUrl(
    @Param('storagePath') storagePath: string,
    @CurrentUser() user: any,
  ) {
    try {
      // Vérifier que l'utilisateur a le droit d'accéder à ce fichier
      await this.verifyFileAccess(decodeURIComponent(storagePath), user);
      
      const signedUrl = await this.uploadService.generateSignedUrl(
        decodeURIComponent(storagePath),
        3600 // 1h d'accès
      );

      return {
        success: true,
        data: {
          signedUrl,
          expiresIn: 3600,
        }
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la génération de l'URL: ${error.message}`
      );
    }
  }

  /**
   * Vérifier l'accès d'un utilisateur à un fichier
   */
  private async verifyFileAccess(storagePath: string, user: any): Promise<void> {
    // Récupérer la ressource associée à ce chemin de stockage
    const resource = await this.prisma.courseResource.findFirst({
      where: { file_url: storagePath },
      include: {
        module: {
          include: {
            course: {
              include: {
                provider: true,
                enrollments: true,
              },
            },
          },
        },
      },
    });

    if (!resource) {
      throw new ForbiddenException('Fichier non trouvé ou accès non autorisé');
    }

    // Vérifier l'accès selon le rôle
    if (user.role === 'training_org' || user.role === 'admin') {
      // Les OF et admins peuvent accéder à leurs propres fichiers
      if (user.role === 'training_org' && resource.module.course.provider.user_id !== user.sub) {
        throw new ForbiddenException('Accès non autorisé à ce fichier');
      }
      return;
    }

    if (user.role === 'student') {
      // Les étudiants doivent être inscrits au cours
      const enrollment = resource.module.course.enrollments.find(
        (enrollment) => enrollment.user_id === user.sub && enrollment.status === 'approved'
      );

      if (!enrollment) {
        throw new ForbiddenException('Vous devez être inscrit à cette formation pour accéder à ce fichier');
      }
      return;
    }

    throw new ForbiddenException('Rôle non autorisé');
  }

  /**
   * Suppression d'un fichier uploadé
   */
  @Delete('content/:storagePath')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.training_org, UserRole.admin)
  async deleteContent(
    @Param('storagePath') storagePath: string,
    @CurrentUser() user: any,
  ) {
    try {
      // TODO: Vérifier que l'utilisateur possède ce fichier
      await this.uploadService.deleteDocument(
        decodeURIComponent(storagePath)
      );

      return {
        success: true,
        message: 'Fichier supprimé avec succès'
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la suppression: ${error.message}`
      );
    }
  }
}