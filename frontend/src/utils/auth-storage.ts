import { AuthTokens, AuthUser } from '@/services/api';
import logger from '@/services/logger.service';

// Clés de stockage
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'mb_access_token',
  REFRESH_TOKEN: 'mb_refresh_token', 
  USER: 'mb_user',
  TOKEN_EXPIRY: 'mb_token_expiry',
} as const;

// Interface pour les données stockées
interface StoredAuthData {
  user: AuthUser;
  tokens: AuthTokens;
  expiresAt: number;
}

/**
 * Classe pour gérer le stockage sécurisé des données d'authentification
 */
export class AuthStorage {
  /**
   * Stocke les données d'authentification avec validation
   */
  static storeAuthData(user: AuthUser, tokens: AuthTokens): void {
    try {
      // Calculer l'expiration (par défaut 1 heure)
      const expiresIn = tokens.expires_in || 3600; // 1 heure par défaut
      const expiresAt = Date.now() + (expiresIn * 1000);

      // Stocker les tokens
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token);
      if (tokens.refresh_token) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token);
      }
      
      // Stocker l'utilisateur et l'expiration
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiresAt.toString());

      logger.info('✅ Données d\'authentification stockées avec succès');
    } catch (error) {
      logger.error('❌ Erreur lors du stockage des données d\'authentification:', error);
      throw new Error('Impossible de stocker les données d\'authentification');
    }
  }

  /**
   * Récupère les données d'authentification stockées
   */
  static getStoredAuthData(): StoredAuthData | null {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      const expiryStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);

      if (!accessToken || !userStr || !expiryStr) {
        return null;
      }

      const user: AuthUser = JSON.parse(userStr);
      const expiresAt = parseInt(expiryStr, 10);

      const tokens: AuthTokens = {
        access_token: accessToken,
        refresh_token: refreshToken || undefined,
      };

      return {
        user,
        tokens,
        expiresAt,
      };
    } catch (error) {
      logger.error('❌ Erreur lors de la récupération des données d\'authentification:', error);
      return null;
    }
  }

  /**
   * Vérifie si le token est valide (non expiré)
   */
  static isTokenValid(): boolean {
    try {
      const expiryStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
      logger.info('⏰ AuthStorage: expiryStr:', expiryStr);
      
      if (!expiryStr) {
        logger.info('❌ AuthStorage: Pas d\'expiration stockée');
        return false;
      }

      const expiresAt = parseInt(expiryStr, 10);
      const now = Date.now();
      
      logger.info('⏰ AuthStorage: Token expire à:', new Date(expiresAt).toLocaleString());
      logger.info('⏰ AuthStorage: Maintenant:', new Date(now).toLocaleString());
      
      // Ajouter une marge de 5 minutes avant l'expiration
      const bufferTime = 5 * 60 * 1000; // 5 minutes en millisecondes
      const isValid = now < (expiresAt - bufferTime);
      
      logger.info('⏰ AuthStorage: Token valide (avec buffer 5min)?', isValid);
      
      return isValid;
    } catch (error) {
      logger.error('❌ Erreur lors de la vérification du token:', error);
      return false;
    }
  }

  /**
   * Vérifie si le token va expirer bientôt (dans les 10 prochaines minutes)
   */
  static isTokenExpiringSoon(): boolean {
    try {
      const expiryStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
      if (!expiryStr) {
        return false;
      }

      const expiresAt = parseInt(expiryStr, 10);
      const now = Date.now();
      
      // Vérifier si ça expire dans les 10 prochaines minutes
      const warningTime = 10 * 60 * 1000; // 10 minutes en millisecondes
      
      return now > (expiresAt - warningTime) && now < expiresAt;
    } catch (error) {
      logger.error('❌ Erreur lors de la vérification de l\'expiration:', error);
      return false;
    }
  }

  /**
   * Récupère uniquement le token d'accès
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Récupère uniquement le refresh token
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Récupère uniquement les données utilisateur
   */
  static getStoredUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userStr) {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      logger.error('❌ Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }

  /**
   * Met à jour uniquement le token d'accès (après un refresh)
   */
  static updateAccessToken(newToken: string, expiresIn?: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);
      
      if (expiresIn) {
        const expiresAt = Date.now() + (expiresIn * 1000);
        localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiresAt.toString());
      }
      
      logger.info('✅ Token d\'accès mis à jour');
    } catch (error) {
      logger.error('❌ Erreur lors de la mise à jour du token:', error);
      throw new Error('Impossible de mettre à jour le token');
    }
  }

  /**
   * Met à jour les données utilisateur
   */
  static updateUser(user: AuthUser): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      logger.info('✅ Données utilisateur mises à jour');
    } catch (error) {
      logger.error('❌ Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw new Error('Impossible de mettre à jour les données utilisateur');
    }
  }

  /**
   * Supprime toutes les données d'authentification
   */
  static clearAuthData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      logger.debug('✅ Données d\'authentification supprimées');
    } catch (error) {
      logger.error('❌ Erreur lors de la suppression des données:', error);
    }
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  static isAuthenticated(): boolean {
    logger.debug('🔍 AuthStorage: Vérification isAuthenticated...');
    
    const authData = this.getStoredAuthData();
    logger.debug('📦 AuthStorage: authData exists?', !!authData);
    
    if (!authData) {
      logger.debug('❌ AuthStorage: Pas de données d\'auth stockées');
      return false;
    }
    
    const isTokenValid = this.isTokenValid();
    logger.info('🔑 AuthStorage: Token valide?', isTokenValid);
    
    const result = authData !== null && isTokenValid;
    logger.info('✅ AuthStorage: isAuthenticated result:', result);
    
    return result;
  }

  /**
   * Obtient le temps restant avant expiration (en minutes)
   */
  static getTimeUntilExpiry(): number | null {
    try {
      const expiryStr = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
      if (!expiryStr) {
        return null;
      }

      const expiresAt = parseInt(expiryStr, 10);
      const now = Date.now();
      const timeLeft = expiresAt - now;
      
      return Math.max(0, Math.floor(timeLeft / (60 * 1000))); // en minutes
    } catch (error) {
      logger.error('❌ Erreur lors du calcul du temps restant:', error);
      return null;
    }
  }
} 