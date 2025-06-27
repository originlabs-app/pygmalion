import { Injectable, BadRequestException } from '@nestjs/common';
import { StorageConfig } from '../../config/storage.config';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  storageType: 'local';
  storagePath: string;
}

export interface ExternalMediaResult {
  id: string;
  title: string;
  storageType: 'youtube' | 'vimeo';
  externalUrl: string;
  thumbnailUrl?: string;
  duration?: number;
}

@Injectable()
export class UploadService {
  constructor(private storageConfig: StorageConfig) {}

  /**
   * Upload d'un fichier vers Supabase Storage
   */
  async uploadDocument(
    orgId: string,
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
  ): Promise<UploadResult> {
    // Validation taille (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (fileBuffer.length > maxSize) {
      throw new BadRequestException('Fichier trop volumineux (max 100MB)');
    }

    // Validation type MIME
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'audio/mpeg',
      'audio/mp3',
      'audio/aac',
      'video/mp4',
    ];

    if (!allowedTypes.includes(mimeType)) {
      throw new BadRequestException('Type de fichier non autorisé');
    }

    // Génération du chemin de stockage
    const fileId = uuidv4();
    const extension = this.getFileExtension(filename);
    const storagePath = `${orgId}/${fileId}${extension}`;

    const client = this.storageConfig.getClient();
    const bucketName = this.storageConfig.getBucketName();

    // Upload vers Supabase
    const { error } = await client.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) {
      throw new BadRequestException(`Erreur upload: ${error.message}`);
    }

    return {
      id: fileId,
      filename,
      mimeType,
      size: fileBuffer.length,
      storageType: 'local',
      storagePath,
    };
  }

  /**
   * Validation et traitement d'une URL externe (YouTube/Vimeo)
   */
  async validateExternalMedia(url: string, title?: string): Promise<ExternalMediaResult> {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;

    let storageType: 'youtube' | 'vimeo';
    let videoId: string;

    if (youtubeRegex.test(url)) {
      storageType = 'youtube';
      const match = url.match(youtubeRegex);
      videoId = match![1];
    } else if (vimeoRegex.test(url)) {
      storageType = 'vimeo';
      const match = url.match(vimeoRegex);
      videoId = match![1];
    } else {
      throw new BadRequestException('URL non supportée. Utilisez YouTube ou Vimeo.');
    }

    // TODO: Optionnel - appeler l'API YouTube/Vimeo pour récupérer métadonnées
    // Pour l'instant, on retourne les données de base

    return {
      id: uuidv4(),
      title: title || `Vidéo ${storageType}`,
      storageType,
      externalUrl: url,
      thumbnailUrl: storageType === 'youtube' 
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : undefined,
    };
  }

  /**
   * Génération d'une URL signée pour accès temporaire (fichiers locaux uniquement)
   */
  async generateSignedUrl(storagePath: string, expiresIn: number = 3600): Promise<string> {
    const client = this.storageConfig.getClient();
    const bucketName = this.storageConfig.getBucketName();

    const { data, error } = await client.storage
      .from(bucketName)
      .createSignedUrl(storagePath, expiresIn);

    if (error) {
      throw new BadRequestException(`Erreur génération URL: ${error.message}`);
    }

    return data.signedUrl;
  }

  /**
   * Suppression d'un fichier (fichiers locaux uniquement)
   */
  async deleteDocument(storagePath: string): Promise<void> {
    const client = this.storageConfig.getClient();
    const bucketName = this.storageConfig.getBucketName();

    const { error } = await client.storage
      .from(bucketName)
      .remove([storagePath]);

    if (error) {
      throw new BadRequestException(`Erreur suppression: ${error.message}`);
    }
  }

  /**
   * Utilitaire pour extraire l'extension d'un fichier
   */
  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.substring(lastDot) : '';
  }
} 