import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { UploadService } from '@/common/services/upload.service';
import { CreateCourseResourceDto } from './dto/create-course-resource.dto';
import { UpdateCourseResourceDto } from './dto/update-course-resource.dto';
import { UploadResourceDto } from './dto/upload-resource.dto';
import { CourseResourceResponseDto } from './dto/course-resource-response.dto';
import { ResourceType } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class CourseResourcesService {
  private readonly logger = new Logger(CourseResourcesService.name);
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private toResponse(entity: {
    id: string;
    module_id: string;
    title: string;
    description?: string | null;
    resource_type: unknown;
    file_url?: string | null;
    external_url?: string | null;
    order_index: number;
    duration?: number | null;
    file_size?: number | null;
    mime_type?: string | null;
    is_downloadable?: boolean | null;
    created_at: Date;
    updated_at: Date;
  }): CourseResourceResponseDto {
    return {
      id: entity.id,
      module_id: entity.module_id,
      title: entity.title,
      description: entity.description || undefined,
      resource_type: entity.resource_type as any,
      file_url: entity.file_url || undefined,
      external_url: entity.external_url || undefined,
      mime_type: entity.mime_type || undefined,
      file_size: entity.file_size || undefined,
      duration: entity.duration || undefined,
      order_index: entity.order_index,
      is_downloadable: entity.is_downloadable ?? true,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  private async verifyModuleAccess(moduleId: string, userId: string) {
    const module = await this.prisma.courseModule.findFirst({
      where: {
        id: moduleId,
        course: {
          provider: {
            user_id: userId,
          },
        },
      },
    });

    if (!module) {
      throw new NotFoundException('Module non trouvé ou accès non autorisé');
    }

    return module;
  }

  async create(
    createDto: CreateCourseResourceDto,
    userId: string,
  ): Promise<CourseResourceResponseDto> {
    await this.verifyModuleAccess(createDto.module_id, userId);

    // Vérifier l'unicité de l'ordre
    const existingResource = await this.prisma.courseResource.findFirst({
      where: {
        module_id: createDto.module_id,
        order_index: createDto.order_index,
      },
    });

    if (existingResource) {
      throw new BadRequestException('Une ressource existe déjà à cet index');
    }

    const resource = await this.prisma.courseResource.create({
      data: {
        module_id: createDto.module_id,
        title: createDto.title,
        description: createDto.description,
        resource_type: createDto.resource_type,
        file_url: createDto.file_url,
        external_url: createDto.external_url,
        mime_type: createDto.mime_type,
        file_size: createDto.file_size,
        duration: createDto.duration,
        order_index: createDto.order_index,
        is_downloadable: createDto.is_downloadable ?? true,
      },
    });

    return this.toResponse(resource);
  }

  async uploadFile(
    file: Buffer,
    filename: string,
    mimetype: string,
    uploadDto: UploadResourceDto,
    userId: string,
  ): Promise<CourseResourceResponseDto> {
    await this.verifyModuleAccess(uploadDto.module_id, userId);

    // Valider le type de fichier selon resource_type
    const allowedTypes = {
      video: ['video/mp4', 'video/webm', 'video/ogg'],
      document: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
      ],
      audio: ['audio/mp3', 'audio/wav', 'audio/ogg'],
      image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    };

    if (
      allowedTypes[uploadDto.resource_type] &&
      !allowedTypes[uploadDto.resource_type].includes(mimetype)
    ) {
      throw new BadRequestException(
        `Type de fichier non autorisé pour ${uploadDto.resource_type}`,
      );
    }

    try {
      // Récupérer l'organisation depuis le module
      const module = await this.prisma.courseModule.findUnique({
        where: { id: uploadDto.module_id },
        include: { course: { include: { provider: true } } },
      });

      if (!module) {
        throw new NotFoundException('Module non trouvé');
      }

      const orgId = module.course.provider.id;

      // Upload vers Supabase Storage
      const uploadResult = await this.uploadService.uploadDocument(
        orgId,
        file,
        filename,
        mimetype,
      );

      // Créer la ressource en base
      const resource = await this.prisma.courseResource.create({
        data: {
          module_id: uploadDto.module_id,
          title: uploadDto.title,
          description: uploadDto.description,
          resource_type: uploadDto.resource_type,
          file_url: uploadResult.storagePath, // Stockage du chemin, l'URL signée sera générée à la demande
          mime_type: mimetype,
          file_size: file.length,
          duration: uploadDto.duration,
          order_index: uploadDto.order_index,
          is_downloadable: uploadDto.is_downloadable ?? true,
        },
      });

      return this.toResponse(resource);
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de l'upload: ${error.message}`,
      );
    }
  }

  async addExternalVideo(
    url: string,
    uploadDto: UploadResourceDto,
    userId: string,
  ): Promise<CourseResourceResponseDto> {
    await this.verifyModuleAccess(uploadDto.module_id, userId);

    // Valider que c'est une URL YouTube ou Vimeo
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const isVimeo = url.includes('vimeo.com');

    if (!isYouTube && !isVimeo) {
      throw new BadRequestException(
        'Seules les vidéos YouTube et Vimeo sont supportées',
      );
    }

    const resource = await this.prisma.courseResource.create({
      data: {
        module_id: uploadDto.module_id,
        title: uploadDto.title,
        description: uploadDto.description,
        resource_type: ResourceType.video,
        external_url: url,
        duration: uploadDto.duration,
        order_index: uploadDto.order_index,
        is_downloadable: false, // Les vidéos externes ne sont pas téléchargeables
      },
    });

    return this.toResponse(resource);
  }

  async findAllByModule(
    moduleId: string,
    userId: string,
  ): Promise<CourseResourceResponseDto[]> {
    await this.verifyModuleAccess(moduleId, userId);

    const resources = await this.prisma.courseResource.findMany({
      where: { module_id: moduleId },
      orderBy: { order_index: 'asc' },
    });

    return resources.map((resource) => this.toResponse(resource));
  }

  async findOne(
    id: string,
    userId: string,
  ): Promise<CourseResourceResponseDto> {
    const resource = await this.prisma.courseResource.findFirst({
      where: {
        id,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
    });

    if (!resource) {
      throw new NotFoundException('Ressource non trouvée');
    }

    return this.toResponse(resource);
  }

  async update(
    id: string,
    updateDto: UpdateCourseResourceDto,
    userId: string,
  ): Promise<CourseResourceResponseDto> {
    const existingResource = await this.prisma.courseResource.findFirst({
      where: {
        id,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
    });

    if (!existingResource) {
      throw new NotFoundException('Ressource non trouvée');
    }

    // Vérifier l'unicité de l'ordre si modifié
    if (
      updateDto.order_index !== undefined &&
      updateDto.order_index !== existingResource.order_index
    ) {
      const conflictingResource = await this.prisma.courseResource.findFirst({
        where: {
          module_id: existingResource.module_id,
          order_index: updateDto.order_index,
          id: { not: id },
        },
      });

      if (conflictingResource) {
        throw new BadRequestException('Une ressource existe déjà à cet index');
      }
    }

    const updatedResource = await this.prisma.courseResource.update({
      where: { id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
        resource_type: updateDto.resource_type,
        file_url: updateDto.file_url,
        external_url: updateDto.external_url,
        mime_type: updateDto.mime_type,
        file_size: updateDto.file_size,
        duration: updateDto.duration,
        order_index: updateDto.order_index,
        is_downloadable: updateDto.is_downloadable,
      },
    });

    return this.toResponse(updatedResource);
  }

  async remove(id: string, userId: string): Promise<void> {
    const resource = await this.prisma.courseResource.findFirst({
      where: {
        id,
        module: {
          course: {
            provider: {
              user_id: userId,
            },
          },
        },
      },
    });

    if (!resource) {
      throw new NotFoundException('Ressource non trouvée');
    }

    // Supprimer le fichier du stockage si c'est un fichier local
    if (resource.file_url && !resource.external_url) {
      try {
        await this.uploadService.deleteDocument(resource.file_url);
      } catch (error) {
        this.logger.warn('Erreur lors de la suppression du fichier:', error);
      }
    }

    await this.prisma.courseResource.delete({
      where: { id },
    });
  }

  async reorderResources(
    moduleId: string,
    resourceIds: string[],
    userId: string,
  ): Promise<CourseResourceResponseDto[]> {
    await this.verifyModuleAccess(moduleId, userId);

    // Mettre à jour l'ordre des ressources
    const updatePromises = resourceIds.map((resourceId, index) =>
      this.prisma.courseResource.update({
        where: { id: resourceId },
        data: { order_index: index },
      }),
    );

    await Promise.all(updatePromises);

    return this.findAllByModule(moduleId, userId);
  }
}
