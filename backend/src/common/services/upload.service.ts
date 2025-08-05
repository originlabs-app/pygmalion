import { Injectable, BadRequestException } from '@nestjs/common';
import { StorageConfig } from '@/config/storage.config';
import { randomUUID } from 'crypto';

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
    // Validation taille selon le type de fichier
    let maxSize: number;

    if (mimeType.startsWith('video/')) {
      maxSize = 50 * 1024 * 1024; // 50MB pour les vidéos (encourager YouTube pour plus gros)
    } else {
      maxSize = 100 * 1024 * 1024; // 100MB pour les autres fichiers
    }

    if (fileBuffer.length > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      throw new BadRequestException(
        `Fichier trop volumineux (max ${maxSizeMB}MB pour ce type). ` +
          `Pour les vidéos plus lourdes, utilisez un lien YouTube/Vimeo.`,
      );
    }

    // Validation type MIME étendue
    const allowedTypes = [
      // Documents
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',

      // Images
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',

      // Audio
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/aac',
      'audio/ogg',

      // Vidéos (petites seulement)
      'video/mp4',
      'video/webm',
      'video/quicktime',

      // Archives et formats e-learning
      'application/zip',
      'application/x-zip-compressed',
    ];

    if (!allowedTypes.includes(mimeType)) {
      throw new BadRequestException('Type de fichier non autorisé');
    }

    // Génération du chemin de stockage
    const fileId = randomUUID();
    const extension = this.getFileExtension(filename);
    const storagePath = `${orgId}/${fileId}${extension}`;

    const client = this.storageConfig.getClient();
    const bucketName = this.storageConfig.getBucketName('courseContent'); // Utilise le bucket course-content

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
  async validateExternalMedia(
    url: string,
    title?: string,
  ): Promise<ExternalMediaResult> {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
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
      throw new BadRequestException(
        'URL non supportée. Utilisez YouTube ou Vimeo.',
      );
    }

    // TODO: Optionnel - appeler l'API YouTube/Vimeo pour récupérer métadonnées
    // Pour l'instant, on retourne les données de base

    return {
      id: randomUUID(),
      title: title || `Vidéo ${storageType}`,
      storageType,
      externalUrl: url,
      thumbnailUrl:
        storageType === 'youtube'
          ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          : undefined,
    };
  }

  /**
   * Génération d'une URL signée pour accès temporaire (fichiers locaux uniquement)
   */
  async generateSignedUrl(
    storagePath: string,
    expiresIn = 3600,
  ): Promise<string> {
    const client = this.storageConfig.getClient();
    const bucketName = this.storageConfig.getBucketName('courseContent'); // Utilise le bucket course-content

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
    const bucketName = this.storageConfig.getBucketName('courseContent'); // Utilise le bucket course-content

    const { error } = await client.storage
      .from(bucketName)
      .remove([storagePath]);

    if (error) {
      throw new BadRequestException(`Erreur suppression: ${error.message}`);
    }
  }

  /**
   * Upload d'une image de couverture de formation
   */
  async uploadCourseImage(
    orgId: string,
    courseId: string,
    fileBuffer: Buffer,
    filename: string,
    mimeType: string,
  ): Promise<string> {
    // Validation du type MIME pour les images uniquement
    const allowedImageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];

    if (!allowedImageTypes.includes(mimeType)) {
      throw new BadRequestException(
        "Type d'image non autorisé. Utilisez JPEG, PNG ou WebP.",
      );
    }

    // Limite de taille : 5MB pour les images
    const maxSize = 5 * 1024 * 1024;
    if (fileBuffer.length > maxSize) {
      throw new BadRequestException('Image trop volumineuse (max 5MB)');
    }

    // Génération du chemin avec la structure organizationId/courses/filename
    const extension = this.getFileExtension(filename);
    const fileName = `${courseId}_${Date.now()}${extension}`;
    const storagePath = `${orgId}/courses/${fileName}`;

    const client = this.storageConfig.getClient();
    const bucketName = 'course-images'; // Bucket spécifique pour les images

    // Upload vers Supabase
    const { error } = await client.storage
      .from(bucketName)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: true, // Remplace si existe déjà
      });

    if (error) {
      throw new BadRequestException(`Erreur upload image: ${error.message}`);
    }

    // Retourner l'URL publique
    const { data } = client.storage.from(bucketName).getPublicUrl(storagePath);

    return data.publicUrl;
  }

  /**
   * Suppression d'une image de cours
   */
  async deleteCourseImage(imageUrl: string, orgId: string): Promise<void> {
    // Extraire le chemin depuis l'URL publique
    const urlParts = imageUrl.split('/storage/v1/object/public/course-images/');
    if (urlParts.length !== 2) {
      throw new BadRequestException("URL d'image invalide");
    }

    const storagePath = urlParts[1];

    // Vérifier que l'image appartient bien à l'organisation
    if (!storagePath.startsWith(`${orgId}/`)) {
      throw new BadRequestException(
        "Vous n'avez pas la permission de supprimer cette image",
      );
    }

    const client = this.storageConfig.getClient();
    const { error } = await client.storage
      .from('course-images')
      .remove([storagePath]);

    if (error) {
      throw new BadRequestException(
        `Erreur suppression image: ${error.message}`,
      );
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
