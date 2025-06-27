import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainingOrgDto } from './dto/create-training-org.dto';
import { UpdateTrainingOrgDto } from './dto/update-training-org.dto';
import { TrainingOrgResponseDto } from './dto/training-org-response.dto';
import { VerificationStatus } from '@prisma/client';
import { ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { UploadService, UploadResult, ExternalMediaResult } from '../common/services/upload.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { ExternalMediaDto } from './dto/external-media.dto';

@Injectable()
export class TrainingOrganizationsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  private toResponse(entity: any): TrainingOrgResponseDto {
    return {
      id: entity.id,
      name: entity.organization_name,
      siret: entity.siret,
      description: entity.description,
      contactEmail: entity.contact_email,
      contactPhone: entity.contact_phone,
      verificationStatus: entity.verification_status,
      qualiopiCertified: entity.qualiopi_certified,
      qualiopiNumber: entity.qualiopi_number,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }

  async create(createTrainingOrgDto: CreateTrainingOrgDto, userId: string) {
    const { name, siret, contactEmail, description, contactPhone, contactName, website } = createTrainingOrgDto;

    // Empêcher doublon SIRET
    if (siret) {
      const existing = await this.prisma.trainingOrganization.findUnique({ where: { siret } });
      if (existing) throw new ConflictException('Un organisme avec ce SIRET existe déjà');
    }

    const entity = await this.prisma.trainingOrganization.create({
      data: {
        user_id: userId,
        organization_name: name,
        siret,
        contact_email: contactEmail,
        description,
        contact_phone: contactPhone,
        contact_name: contactName,
        website,
      },
    });
    return this.toResponse(entity);
  }

  async findByUserId(userId: string): Promise<TrainingOrgResponseDto | null> {
    const entity = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!entity) return null;
    return this.toResponse(entity);
  }

  async update(userId: string, dto: UpdateTrainingOrgDto): Promise<TrainingOrgResponseDto> {
    const entity = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!entity) throw new NotFoundException('Profil organisme non trouvé');

    const updateData: any = {};
    if (dto.name !== undefined) updateData.organization_name = dto.name;
    if (dto.siret !== undefined) updateData.siret = dto.siret;
    if (dto.contactEmail !== undefined) updateData.contact_email = dto.contactEmail;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.contactPhone !== undefined) updateData.contact_phone = dto.contactPhone;
    if (dto.contactName !== undefined) updateData.contact_name = dto.contactName;
    if (dto.website !== undefined) updateData.website = dto.website;

    const updated = await this.prisma.trainingOrganization.update({ where: { id: entity.id }, data: updateData });
    return this.toResponse(updated);
  }

  async updateStatus(id: string, status: VerificationStatus): Promise<TrainingOrgResponseDto> {
    const updated = await this.prisma.trainingOrganization.update({
      where: { id },
      data: {
        verification_status: status,
        verified_at: status === 'verified' ? new Date() : null,
      },
    });
    return this.toResponse(updated);
  }

  async findPending(): Promise<TrainingOrgResponseDto[]> {
    const list = await this.prisma.trainingOrganization.findMany({ where: { verification_status: 'pending' } });
    return list.map(entity => this.toResponse(entity));
  }

  // === MÉTHODES ADMIN ===

  async findById(id: string): Promise<TrainingOrgResponseDto> {
    const entity = await this.prisma.trainingOrganization.findUnique({ where: { id } });
    if (!entity) throw new NotFoundException('Organisation non trouvée');
    return this.toResponse(entity);
  }

  async getOrganizationDocuments(orgId: string) {
    const documents = await this.prisma.trainingOrgDocument.findMany({
      where: { org_id: orgId },
      orderBy: { created_at: 'desc' },
    });

    return documents.map(doc => this.toDocumentResponse(doc));
  }

  async updateStatusWithReason(id: string, status: VerificationStatus, reason?: string): Promise<TrainingOrgResponseDto> {
    const updated = await this.prisma.trainingOrganization.update({
      where: { id },
      data: {
        verification_status: status,
        verified_at: status === 'verified' ? new Date() : null,
        // Note: rejection_reason field would need to be added to schema if needed
      },
    });
    return this.toResponse(updated);
  }

  async getAllOrganizations(): Promise<TrainingOrgResponseDto[]> {
    const list = await this.prisma.trainingOrganization.findMany({
      orderBy: { created_at: 'desc' },
    });
    return list.map(entity => this.toResponse(entity));
  }

  // === GESTION DES DOCUMENTS ===

  async uploadDocument(
    userId: string,
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
    dto: UploadDocumentDto,
  ) {
    // Récupérer l'organisation de l'utilisateur
    const org = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!org) throw new NotFoundException('Profil organisme non trouvé');

    // Upload vers Supabase
    const uploadResult: UploadResult = await this.uploadService.uploadDocument(
      org.id,
      fileBuffer,
      filename,
      mimeType,
    );

    // Enregistrer en BDD
    const document = await this.prisma.trainingOrgDocument.create({
      data: {
        org_id: org.id,
        filename: uploadResult.filename,
        mime_type: uploadResult.mimeType,
        file_size: uploadResult.size,
        storage_type: 'local',
        storage_path: uploadResult.storagePath,
        title: dto.title || filename,
      },
    });

    return this.toDocumentResponse(document);
  }

  async addExternalMedia(userId: string, dto: ExternalMediaDto) {
    // Récupérer l'organisation de l'utilisateur
    const org = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!org) throw new NotFoundException('Profil organisme non trouvé');

    // Valider l'URL externe
    const mediaResult: ExternalMediaResult = await this.uploadService.validateExternalMedia(
      dto.url,
      dto.title,
    );

    // Enregistrer en BDD
    const document = await this.prisma.trainingOrgDocument.create({
      data: {
        org_id: org.id,
        filename: `${mediaResult.storageType}-video`,
        mime_type: 'video/external',
        storage_type: mediaResult.storageType,
        external_url: mediaResult.externalUrl,
        thumbnail_url: mediaResult.thumbnailUrl,
        title: dto.title,
        duration: dto.duration,
      },
    });

    return this.toDocumentResponse(document);
  }

  async getDocuments(userId: string) {
    const org = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!org) throw new NotFoundException('Profil organisme non trouvé');

    const documents = await this.prisma.trainingOrgDocument.findMany({
      where: { org_id: org.id },
      orderBy: { created_at: 'desc' },
    });

    return documents.map(doc => this.toDocumentResponse(doc));
  }

  async deleteDocument(userId: string, documentId: string) {
    const org = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!org) throw new NotFoundException('Profil organisme non trouvé');

    const document = await this.prisma.trainingOrgDocument.findFirst({
      where: { id: documentId, org_id: org.id },
    });
    if (!document) throw new NotFoundException('Document non trouvé');

    // Supprimer le fichier physique si local
    if (document.storage_type === 'local' && document.storage_path) {
      await this.uploadService.deleteDocument(document.storage_path);
    }

    // Supprimer de la BDD
    await this.prisma.trainingOrgDocument.delete({ where: { id: documentId } });

    return { success: true, message: 'Document supprimé' };
  }

  async getDocumentUrl(userId: string, documentId: string) {
    const org = await this.prisma.trainingOrganization.findFirst({ where: { user_id: userId } });
    if (!org) throw new NotFoundException('Profil organisme non trouvé');

    const document = await this.prisma.trainingOrgDocument.findFirst({
      where: { id: documentId, org_id: org.id },
    });
    if (!document) throw new NotFoundException('Document non trouvé');

    if (document.storage_type === 'local' && document.storage_path) {
      const signedUrl = await this.uploadService.generateSignedUrl(document.storage_path);
      return { url: signedUrl, type: 'signed' };
    } else if (document.external_url) {
      return { url: document.external_url, type: 'external' };
    }

    throw new BadRequestException('URL non disponible pour ce document');
  }

  private toDocumentResponse(document: any) {
    return {
      id: document.id,
      trainingOrgId: document.org_id,
      fileName: document.filename,
      originalName: document.filename,
      mimeType: document.mime_type,
      size: document.file_size || 0,
      documentType: this.determineDocumentType(document.filename, document.title),
      storageType: document.storage_type,
      externalUrl: document.external_url,
      uploadedAt: document.created_at,
    };
  }

  private determineDocumentType(filename: string, title?: string): string {
    const searchText = (filename + ' ' + (title || '')).toLowerCase();
    
    if (searchText.includes('qualiopi') || searchText.includes('certification')) {
      return 'qualiopi';
    }
    
    if (searchText.includes('siret') || searchText.includes('kbis') || searchText.includes('k-bis')) {
      return 'siret';
    }
    
    return 'other';
  }
}
