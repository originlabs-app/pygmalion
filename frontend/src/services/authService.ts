import { apiClient, AuthResponse, RegisterResponse, AuthUser, AuthTokens } from './api';
import { UserRole } from '../types';
import { SupabaseAuthService } from './supabaseService';

// Types pour les requêtes d'authentification
export interface LoginRequest {
  email: string;
  password: string;
  otpCode?: string; // Pour MFA
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  organization?: string;
}

export interface MFASetupResponse {
  secret: string;
  qrCodeDataUrl: string;
  backupCodes?: string[];
}

export interface MFAStatusResponse {
  enabled: boolean;
  backupCodesCount?: number;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface UpdateEmailRequest {
  newEmail: string;
  password: string;
}

/**
 * Service d'authentification pour communiquer avec le backend
 */
export class AuthService {
  /**
   * Connexion utilisateur
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 Tentative de connexion pour:', credentials.email);
      
      const response = await apiClient.post<AuthResponse>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
        otpCode: credentials.otpCode,
      });

      console.log('✅ Connexion réussie pour:', credentials.email);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la connexion:', error);
      
      // Gestion des erreurs spécifiques
      if (error.response?.status === 401) {
        // Vérifier si c'est une erreur MFA_REQUIRED
        if (error.response?.data?.message === 'MFA_REQUIRED') {
          throw new Error('MFA_REQUIRED');
        }
        throw new Error('Email ou mot de passe incorrect');
      }
      if (error.response?.status === 423) {
        throw new Error('MFA requis - Veuillez fournir votre code OTP');
      }
      if (error.response?.status === 429) {
        throw new Error('Trop de tentatives de connexion. Veuillez réessayer plus tard');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  }

  /**
   * Inscription utilisateur
   */
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      console.log('📝 Tentative d\'inscription pour:', userData.email);
      
      const response = await apiClient.post<RegisterResponse>('/auth/register', userData);
      
      console.log('✅ Inscription réussie pour:', userData.email);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      
      // Gestion des erreurs spécifiques
      if (error.response?.status === 409) {
        throw new Error('Cet email est déjà utilisé');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response?.data?.message || 'Données invalides');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
  }

  /**
   * Récupération du profil utilisateur actuel
   */
  static async getCurrentUser(): Promise<AuthUser> {
    try {
      const response = await apiClient.get<AuthUser>('/auth/me');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la récupération du profil:', error);
      throw new Error('Impossible de récupérer le profil utilisateur');
    }
  }

  /**
   * Mise à jour du profil utilisateur
   */
  static async updateProfile(updates: Partial<AuthUser>): Promise<AuthUser> {
    try {
      const response = await apiClient.put<AuthUser>('/users/me', updates);
      console.log('✅ Profil mis à jour avec succès');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la mise à jour du profil:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  }

  /**
   * Changement de mot de passe
   */
  static async changePassword(passwords: PasswordChangeRequest): Promise<void> {
    try {
      await apiClient.put('/auth/change-password', passwords);
      console.log('✅ Mot de passe changé avec succès');
    } catch (error: any) {
      console.error('❌ Erreur lors du changement de mot de passe:', error);
      
      if (error.response?.status === 400) {
        throw new Error('Mot de passe actuel incorrect');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors du changement de mot de passe');
    }
  }

  /**
   * Demande de réinitialisation de mot de passe via Supabase
   */
  static async forgotPassword(request: ForgotPasswordRequest): Promise<{ message: string }> {
    try {
      const result = await SupabaseAuthService.resetPasswordForEmail(request.email);
      console.log('✅ Demande de réinitialisation envoyée via Supabase');
      return result;
    } catch (error: any) {
      console.error('❌ Erreur lors de la demande de réinitialisation:', error);
      throw new Error(error.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
  }

  /**
   * Réinitialisation du mot de passe via Supabase (session active requise)
   */
  static async resetPassword(request: ResetPasswordRequest): Promise<{ message: string }> {
    try {
      // Avec Supabase, le token est géré automatiquement via la session
      // Nous utilisons directement updatePassword qui fonctionne avec la session active
      const result = await SupabaseAuthService.updatePassword(request.newPassword);
      console.log('✅ Mot de passe réinitialisé avec succès via Supabase');
      return result;
    } catch (error: any) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      throw new Error(error.message || 'Erreur lors de la réinitialisation du mot de passe');
    }
  }

  /**
   * Mise à jour de l'adresse email
   */
  static async updateEmail(request: UpdateEmailRequest): Promise<{ message: string }> {
    try {
      const response = await apiClient.put('/users/update-email', request);
      console.log('✅ Demande de changement d\'email créée');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la mise à jour de l\'email:', error);
      
      if (error.response?.status === 401) {
        throw new Error('Mot de passe incorrect');
      }
      
      if (error.response?.status === 409) {
        throw new Error('Cette adresse email est déjà utilisée');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de l\'adresse email');
    }
  }

  /**
   * Configuration du MFA - Génération du QR code
   */
  static async setupMFA(): Promise<MFASetupResponse> {
    try {
      console.log('🔒 Configuration du MFA...');
      
      const response = await apiClient.get<MFASetupResponse>('/auth/setup-mfa');
      
      console.log('✅ Configuration MFA générée');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la configuration MFA:', error);
      throw new Error(error.response?.data?.message || 'Erreur lors de la configuration MFA');
    }
  }

  /**
   * Vérification et activation du MFA
   */
  static async enableMFA(otpCode: string): Promise<{ backupCodes: string[] }> {
    try {
      console.log('🔒 Activation du MFA...');
      
      const response = await apiClient.post<{ backupCodes: string[] }>('/auth/enable-mfa', {
        otpCode,
      });
      
      console.log('✅ MFA activé avec succès');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'activation MFA:', error);
      
      if (error.response?.status === 400) {
        throw new Error('Code OTP invalide');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'activation MFA');
    }
  }

  /**
   * Désactivation du MFA
   */
  static async disableMFA(otpCode: string): Promise<void> {
    try {
      console.log('🔓 Désactivation du MFA...');
      
      await apiClient.post('/auth/disable-mfa', {
        otpCode,
      });
      
      console.log('✅ MFA désactivé avec succès');
    } catch (error: any) {
      console.error('❌ Erreur lors de la désactivation MFA:', error);
      
      if (error.response?.status === 400) {
        throw new Error('Code OTP invalide');
      }
      
      throw new Error(error.response?.data?.message || 'Erreur lors de la désactivation MFA');
    }
  }

  /**
   * Vérification du statut MFA
   */
  static async getMFAStatus(): Promise<MFAStatusResponse> {
    try {
      const response = await apiClient.get<MFAStatusResponse>('/auth/mfa-status');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la vérification du statut MFA:', error);
      throw new Error('Impossible de vérifier le statut MFA');
    }
  }

  /**
   * Vérification d'un code OTP (pour les étapes intermédiaires)
   */
  static async verifyOTP(otpCode: string): Promise<boolean> {
    try {
      const response = await apiClient.post<{ valid: boolean }>('/auth/verify-mfa', {
        otpCode,
      });
      
      return response.data.valid;
    } catch (error: any) {
      console.error('❌ Erreur lors de la vérification OTP:', error);
      return false;
    }
  }

  /**
   * Refresh du token d'accès
   */
  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await apiClient.post<AuthTokens>('/auth/refresh', {
        refresh_token: refreshToken,
      });
      
      console.log('✅ Token rafraîchi avec succès');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erreur lors du refresh du token:', error);
      throw new Error('Session expirée - Veuillez vous reconnecter');
    }
  }

  /**
   * Déconnexion
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
      console.log('✅ Déconnexion réussie');
    } catch (error: any) {
      // On ne throw pas d'erreur pour la déconnexion
      // car même si ça échoue côté serveur, on veut nettoyer le frontend
      console.warn('⚠️ Erreur lors de la déconnexion côté serveur:', error);
    }
  }

  /**
   * Vérification de la santé du service d'authentification
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/auth/health');
      return response.status === 200;
    } catch (error) {
      console.error('❌ Service d\'authentification non disponible:', error);
      return false;
    }
  }
} 