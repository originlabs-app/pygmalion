import { apiClient } from './api';
import { TrainingOrganization, TrainingOrgDocument } from './trainingOrgService';

const api = apiClient;

export interface AdminTrainingOrganization {
  id: string;
  name: string;
  siret: string;
  description: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  qualiopiCertified: boolean;
  qualiopiNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ValidationAction {
  organizationId: string;
  action: 'approve' | 'reject';
  reason?: string;
}

class AdminService {
  // Gestion des organisations de formation
  async getPendingOrganizations(): Promise<AdminTrainingOrganization[]> {
    const response = await api.get('/training-organizations/admin/organizations-approvals');
    return response.data;
  }

  async getAllOrganizations(): Promise<AdminTrainingOrganization[]> {
    const response = await api.get('/training-organizations/admin/organizations');
    return response.data;
  }

  async getOrganizationById(id: string): Promise<AdminTrainingOrganization> {
    const response = await api.get(`/training-organizations/admin/organizations/${id}`);
    return response.data;
  }

  async getOrganizationDocuments(id: string): Promise<TrainingOrgDocument[]> {
    const response = await api.get(`/training-organizations/admin/organizations/${id}/documents`);
    return response.data;
  }

  async getDocumentSignedUrl(documentId: string): Promise<{ url: string; expiresAt: string }> {
    const response = await api.get(`/training-organizations/documents/${documentId}/url`);
    return response.data;
  }

  async approveOrganization(id: string): Promise<AdminTrainingOrganization> {
    const response = await api.post(`/training-organizations/admin/organizations/${id}/approve`);
    return response.data;
  }

  async rejectOrganization(id: string): Promise<AdminTrainingOrganization> {
    const response = await api.post(`/training-organizations/admin/organizations/${id}/reject`);
    return response.data;
  }

  // Statistiques admin
  async getOrganizationStats() {
    const organizations = await this.getAllOrganizations();
    
    const stats = {
      total: organizations.length,
      pending: organizations.filter(org => org.verificationStatus === 'pending').length,
      verified: organizations.filter(org => org.verificationStatus === 'verified').length,
      rejected: organizations.filter(org => org.verificationStatus === 'rejected').length,
    };

    return stats;
  }
}

export const adminService = new AdminService();
export default adminService; 