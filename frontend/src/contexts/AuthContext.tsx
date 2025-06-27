import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { UserRole } from '../types';
import { AuthService, LoginRequest, RegisterRequest, MFASetupResponse, MFAStatusResponse } from '../services/authService';
import { AuthStorage } from '../utils/auth-storage';
import { apiClient, AuthUser } from '../services/api';

// Interface utilisateur mise à jour
export interface User extends AuthUser {
  role: UserRole;
}

interface AuthContextType {
  // État
  currentUser: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Authentification de base
  login: (email: string, password: string, otpCode?: string) => Promise<User>;
  register: (userData: RegisterRequest) => Promise<string>;
  logout: () => Promise<void>;
  
  // Gestion du profil
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  
  // MFA
  setupMFA: () => Promise<MFASetupResponse>;
  enableMFA: (otpCode: string) => Promise<{ backupCodes: string[] }>;
  disableMFA: (otpCode: string) => Promise<void>;
  getMFAStatus: () => Promise<MFAStatusResponse>;
  
  // État MFA
  mfaRequired: boolean;
  setMfaRequired: (required: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('🔄 AuthContext: Initialisation de l\'authentification...');
      setLoading(true);
      
      // Vérifier si on a des données stockées valides
      const isAuth = AuthStorage.isAuthenticated();
      console.log('🔍 AuthContext: isAuthenticated?', isAuth);
      
      if (isAuth) {
        const storedUser = AuthStorage.getStoredUser();
        console.log('👤 AuthContext: Utilisateur stocké:', storedUser?.email);
        
        if (storedUser) {
          setCurrentUser(storedUser as User);
          console.log('✅ AuthContext: Utilisateur restauré depuis le stockage');
          
          // Rafraîchir les données utilisateur depuis le serveur
          try {
            const freshUser = await AuthService.getCurrentUser();
            setCurrentUser(freshUser as User);
            AuthStorage.updateUser(freshUser);
            console.log('✅ AuthContext: Données utilisateur rafraîchies');
          } catch (error) {
            console.warn('⚠️ AuthContext: Impossible de rafraîchir les données utilisateur:', error);
            // On garde les données locales si le refresh échoue
          }
        }
      } else {
        console.log('❌ AuthContext: Pas d\'authentification valide, nettoyage...');
        // Nettoyer les données expirées
        AuthStorage.clearAuthData();
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('❌ AuthContext: Erreur lors de l\'initialisation de l\'auth:', error);
      AuthStorage.clearAuthData();
      setCurrentUser(null);
    } finally {
      setLoading(false);
      console.log('🏁 AuthContext: Initialisation terminée');
    }
  };

  const login = async (email: string, password: string, otpCode?: string): Promise<User> => {
    try {
      setLoading(true);
      // Ne pas remettre mfaRequired à false si on a déjà un code OTP
      if (!otpCode) {
        setMfaRequired(false);
      }
      
      const credentials: LoginRequest = { email, password };
      if (otpCode) {
        credentials.otpCode = otpCode;
      }
      
      console.log('🔐 AuthContext: Tentative login avec:', {
        email,
        hasOtpCode: !!otpCode,
        mfaRequired: mfaRequired
      });
      
      const response = await AuthService.login(credentials);
      
      // Stocker les données d'authentification
      AuthStorage.storeAuthData(response.user, response.tokens);
      apiClient.setAuthTokens(response.tokens);
      
      const user = response.user as User;
      setCurrentUser(user);
      
      // Reset MFA state on successful login
      setMfaRequired(false);
      
      console.log('✅ Connexion réussie pour:', email);
      
      return user;
      
    } catch (error: any) {
      console.error('❌ AuthContext: Erreur de connexion:', error);
      console.log('🔍 AuthContext: Analyse erreur:', {
        message: error.message,
        responseData: error.response?.data,
        responseStatus: error.response?.status,
        responseMessage: error.response?.data?.message
      });
      
      // Gérer le cas où MFA est requis
      const isMfaRequired = error.message === 'MFA_REQUIRED' || 
                           error.response?.data?.message === 'MFA_REQUIRED' ||
                           error.message.includes('MFA requis');
      
      console.log('🔒 AuthContext: MFA requis?', isMfaRequired);
      
      if (isMfaRequired) {
        console.log('🔒 AuthContext: Activation état MFA requis');
        setMfaRequired(true);
        throw new Error('MFA_REQUIRED');
      }
      
      console.log('❌ AuthContext: Autre erreur, pas MFA');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterRequest): Promise<string> => {
    try {
      setLoading(true);
      
      const response = await AuthService.register(userData);
      
      // Avec le nouveau flow, l'inscription ne connecte pas automatiquement l'utilisateur
      // Il doit d'abord vérifier son email
      console.log('✅ Inscription réussie pour:', userData.email);
      console.log('📧 Email de confirmation envoyé');
      
      // On ne stocke pas les tokens car il n'y en a pas encore
      // L'utilisateur devra se connecter après avoir confirmé son email
      
      // Retourner le message pour l'interface utilisateur
      return response.message;
      
    } catch (error) {
      console.error('❌ Erreur d\'inscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Appeler l'endpoint de déconnexion
      await AuthService.logout();
      
    } catch (error) {
      console.warn('⚠️ Erreur lors de la déconnexion côté serveur:', error);
    } finally {
      // Nettoyer les données locales dans tous les cas
      AuthStorage.clearAuthData();
      apiClient.clearAuth();
      setCurrentUser(null);
      setMfaRequired(false);
      setLoading(false);
      
      console.log('✅ Déconnexion terminée');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!currentUser) {
        throw new Error('Utilisateur non connecté');
      }
      
      setLoading(true);
      
      const updatedUser = await AuthService.updateProfile(updates);
      setCurrentUser(updatedUser as User);
      AuthStorage.updateUser(updatedUser);
      
      console.log('✅ Profil mis à jour avec succès');
      
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du profil:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      if (!currentUser) return;
      
      const freshUser = await AuthService.getCurrentUser();
      setCurrentUser(freshUser as User);
      AuthStorage.updateUser(freshUser);
      
    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement utilisateur:', error);
      throw error;
    }
  }, [currentUser]);

  // Fonctions MFA
  const setupMFA = async (): Promise<MFASetupResponse> => {
    try {
      const setupData = await AuthService.setupMFA();
      console.log('✅ Configuration MFA générée');
      return setupData;
    } catch (error) {
      console.error('❌ Erreur lors de la configuration MFA:', error);
      throw error;
    }
  };

  const enableMFA = async (otpCode: string): Promise<{ backupCodes: string[] }> => {
    try {
      const result = await AuthService.enableMFA(otpCode);
      
      // Rafraîchir les données utilisateur pour mettre à jour le statut MFA
      await refreshUser();
      
      console.log('✅ MFA activé avec succès');
      return result;
    } catch (error) {
      console.error('❌ Erreur lors de l\'activation MFA:', error);
      throw error;
    }
  };

  const disableMFA = async (otpCode: string): Promise<void> => {
    try {
      await AuthService.disableMFA(otpCode);
      
      // Rafraîchir les données utilisateur pour mettre à jour le statut MFA
      await refreshUser();
      
      console.log('✅ MFA désactivé avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la désactivation MFA:', error);
      throw error;
    }
  };

  const getMFAStatus = async (): Promise<MFAStatusResponse> => {
    try {
      return await AuthService.getMFAStatus();
    } catch (error) {
      console.error('❌ Erreur lors de la vérification du statut MFA:', error);
      throw error;
    }
  };

  // Surveillance de l'expiration du token
  useEffect(() => {
    if (!currentUser) return;

    const checkTokenExpiry = () => {
      if (AuthStorage.isTokenExpiringSoon()) {
        console.warn('⚠️ Token va expirer bientôt');
        // Ici on pourrait implémenter un refresh automatique
      }
      
      if (!AuthStorage.isTokenValid()) {
        console.warn('⚠️ Token expiré - Déconnexion');
        logout();
      }
    };

    // Vérifier l'expiration toutes les minutes
    const interval = setInterval(checkTokenExpiry, 60000);
    
    return () => clearInterval(interval);
  }, [currentUser]);

  const isAuthenticated = currentUser !== null && AuthStorage.isAuthenticated();

  const contextValue: AuthContextType = {
    // État
    currentUser,
    loading,
    isAuthenticated,
    
    // Authentification de base
    login,
    register,
    logout,
    
    // Gestion du profil
    updateProfile,
    refreshUser,
    
    // MFA
    setupMFA,
    enableMFA,
    disableMFA,
    getMFAStatus,
    
    // État MFA
    mfaRequired,
    setMfaRequired,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
