import { apiClient } from './api';

export interface UploadProgressCallback {
  (progress: number): void;
}

export interface CourseContentUpload {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  contentType: 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm';
  url: string;
  storagePath: string;
  moduleId?: string;
  title?: string;
  description?: string;
  uploadedAt: string;
}

export interface ExternalVideoContent {
  id: string;
  title: string;
  contentType: 'video';
  storageType: 'youtube' | 'vimeo';
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  moduleId?: string;
  description?: string;
  uploadedAt: string;
}

export interface UploadResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export class UploadService {
  /**
   * Upload d'un fichier de contenu de cours
   */
  async uploadCourseContent(
    file: File,
    options: {
      contentType: 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm';
      moduleId?: string;
      title?: string;
      description?: string;
    },
    onProgress?: UploadProgressCallback
  ): Promise<CourseContentUpload> {
    
    // Validation côté client avec limites par type
    let maxSize: number;
    
    if (file.type.startsWith('video/')) {
      maxSize = 50 * 1024 * 1024; // 50MB pour les vidéos
    } else {
      maxSize = 100 * 1024 * 1024; // 100MB pour les autres fichiers
    }
    
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      throw new Error(
        `Fichier trop volumineux (max ${maxSizeMB}MB pour ce type). ` +
        `Pour les vidéos plus lourdes, utilisez un lien YouTube/Vimeo.`
      );
    }

    // Validation du type MIME étendue
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

    const expectedTypes = allowedTypes[options.contentType];
    if (!expectedTypes.includes(file.type)) {
      throw new Error(
        `Type de fichier incorrect. Attendu: ${expectedTypes.join(', ')}`
      );
    }

    // Préparation des données FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('contentType', options.contentType);
    
    if (options.moduleId) formData.append('moduleId', options.moduleId);
    if (options.title) formData.append('title', options.title);
    if (options.description) formData.append('description', options.description);

    try {
      const response = await apiClient.post<UploadResponse<CourseContentUpload>>(
        '/uploads/course-content',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(progress);
            }
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de l\'upload');
      }

      return response.data.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(`Erreur lors de l'upload: ${error.message}`);
    }
  }

  /**
   * Ajout d'une vidéo externe (YouTube/Vimeo)
   */
  async addExternalVideo(options: {
    url: string;
    title: string;
    description?: string;
    moduleId?: string;
  }): Promise<ExternalVideoContent> {
    try {
      const response = await apiClient.post<UploadResponse<ExternalVideoContent>>(
        '/uploads/external-video',
        options
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de l\'ajout de la vidéo');
      }

      return response.data.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(`Erreur lors de l'ajout de la vidéo: ${error.message}`);
    }
  }

  /**
   * Génération d'URL signée pour accès à un fichier
   */
  async getSignedUrl(storagePath: string): Promise<string> {
    try {
      const encodedPath = encodeURIComponent(storagePath);
      const response = await apiClient.get<UploadResponse<{ signedUrl: string }>>(
        `/uploads/signed-url/${encodedPath}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de la génération de l\'URL');
      }

      return response.data.data.signedUrl;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(`Erreur lors de la génération de l'URL: ${error.message}`);
    }
  }

  /**
   * Suppression d'un contenu uploadé
   */
  async deleteContent(storagePath: string): Promise<void> {
    try {
      const encodedPath = encodeURIComponent(storagePath);
      const response = await apiClient.delete<UploadResponse<any>>(
        `/uploads/content/${encodedPath}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Erreur lors de la suppression');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }
  }

  /**
   * Utilitaires pour validation côté client
   */
  static validateFileType(file: File, expectedType: string): boolean {
    const allowedTypes = {
      'video': ['video/mp4', 'video/webm', 'video/quicktime'],
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

    const expected = allowedTypes[expectedType as keyof typeof allowedTypes];
    return expected ? expected.includes(file.type) : false;
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getFileTypeFromMime(mimeType: string): 'video' | 'pdf' | 'audio' | 'image' | 'document' | 'presentation' | 'scorm' | 'other' {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf') return 'pdf';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentationml')) return 'presentation';
    if (mimeType.includes('msword') || mimeType.includes('wordprocessingml') || mimeType === 'text/plain') return 'document';
    if (mimeType.includes('zip')) return 'scorm';
    return 'other';
  }
}

// Instance par défaut
export const uploadService = new UploadService();