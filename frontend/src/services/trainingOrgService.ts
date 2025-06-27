import { apiClient } from './api';

const api = apiClient;

// Types pour les Training Organizations
export interface TrainingOrganization {
  id: string;
  userId: string;
  name: string;
  siret: string;
  description: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
  status: 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrainingOrgRequest {
  name: string;
  siret: string;
  description: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
}

export interface UpdateTrainingOrgRequest {
  name?: string;
  description?: string;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactName?: string;
}

export interface TrainingOrgDocument {
  id: string;
  trainingOrgId: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  documentType: 'qualiopi' | 'siret' | 'training_content' | 'other';
  storageType: 'local' | 'youtube' | 'vimeo';
  externalUrl?: string;
  uploadedAt: string;
}

export interface UploadDocumentRequest {
  file: File;
  title?: string;
}

export interface ExternalMediaRequest {
  url: string;
  documentType: 'training_content';
  title: string;
  description?: string;
}

class TrainingOrgService {
  // Gestion du profil
  async getMyProfile(): Promise<TrainingOrganization> {
    const response = await api.get('/training-organizations/me');
    return response.data;
  }

  async createProfile(data: CreateTrainingOrgRequest): Promise<TrainingOrganization> {
    const response = await api.post('/training-organizations', data);
    return response.data;
  }

  async updateProfile(data: UpdateTrainingOrgRequest): Promise<TrainingOrganization> {
    const response = await api.put('/training-organizations/me', data);
    return response.data;
  }

  // Gestion des documents
  async uploadDocument(data: UploadDocumentRequest): Promise<TrainingOrgDocument> {
    const formData = new FormData();
    formData.append('file', data.file);
    if (data.title) formData.append('title', data.title);

    const response = await api.post('/training-organizations/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async addExternalMedia(data: ExternalMediaRequest): Promise<TrainingOrgDocument> {
    const response = await api.post('/training-organizations/external-media', data);
    return response.data;
  }

  async getDocuments(): Promise<TrainingOrgDocument[]> {
    const response = await api.get('/training-organizations/documents');
    return response.data;
  }

  async deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/training-organizations/documents/${documentId}`);
  }

  async getDocumentSignedUrl(documentId: string): Promise<{ url: string; expiresAt: string }> {
    const response = await api.get(`/training-organizations/documents/${documentId}/url`);
    return response.data;
  }

  // Validation des URLs externes
  validateYouTubeUrl(url: string): boolean {
    const youtubeRegex = /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w=]*)?$/;
    return youtubeRegex.test(url);
  }

  validateVimeoUrl(url: string): boolean {
    const vimeoRegex = /^https:\/\/(www\.)?vimeo\.com\/\d+(\?[\w=&]*)?$/;
    return vimeoRegex.test(url);
  }

  validateExternalUrl(url: string): boolean {
    return this.validateYouTubeUrl(url) || this.validateVimeoUrl(url);
  }
}

export const trainingOrgService = new TrainingOrgService();
export default trainingOrgService; 