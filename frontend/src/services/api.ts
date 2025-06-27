import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Types pour les réponses d'authentification
export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  verified: boolean;
  organization?: string;
  mfaEnabled?: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface RegisterResponse {
  message: string;
  emailSent: boolean;
  user: AuthUser;
}

// Interface pour les métriques de performance
interface TokenMetrics {
  lastRefresh: number;
  refreshAttempts: number;
  refreshFailures: number;
}

// Configuration du client API
class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshPromise: Promise<string> | null = null;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
  }> = [];
  
  // Métriques et optimisations
  private tokenMetrics: TokenMetrics = {
    lastRefresh: 0,
    refreshAttempts: 0,
    refreshFailures: 0
  };
  
  // Timer pour le refresh proactif
  private refreshTimer: NodeJS.Timeout | null = null;
  private readonly REFRESH_BUFFER_TIME = 5 * 60 * 1000; // 5 minutes avant expiration

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.initProactiveRefresh();
  }

  private setupInterceptors() {
    // Request interceptor pour ajouter le token JWT
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor OPTIMISÉ pour gérer les erreurs d'authentification
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        // Ne pas intercepter les erreurs MFA_REQUIRED
        if (error.response?.data?.message === 'MFA_REQUIRED') {
          console.log('🔒 ApiClient: MFA_REQUIRED détecté, pas d\'interception');
          return Promise.reject(error);
        }

        // Si l'erreur est 401 (Unauthorized) et qu'on n'a pas déjà tenté un refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          console.log('🔄 ApiClient: Tentative de refresh token pour 401');
          
          // Si un refresh est déjà en cours, attendre son résultat
          if (this.isRefreshing && this.refreshPromise) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(token => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return this.client(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          
          try {
            const newToken = await this.performTokenRefresh();
            
            // Réessayer la requête originale avec le nouveau token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
            
          } catch (refreshError) {
            console.log('❌ ApiClient: Échec refresh token');
            this.handleRefreshFailure();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Initialise le système de refresh proactif des tokens
   */
  private initProactiveRefresh(): void {
    const checkInterval = 60 * 1000; // Vérifier toutes les minutes
    
    setInterval(() => {
      this.checkTokenExpiration();
    }, checkInterval);
  }

  /**
   * Vérifie si le token va expirer bientôt et effectue un refresh proactif
   */
  private checkTokenExpiration(): void {
    const tokenExpiry = this.getTokenExpiry();
    if (!tokenExpiry) return;

    const now = Date.now();
    const timeUntilExpiry = tokenExpiry - now;

    // Si le token expire dans moins de 5 minutes et qu'on n'est pas déjà en train de refresh
    if (timeUntilExpiry > 0 && timeUntilExpiry <= this.REFRESH_BUFFER_TIME && !this.isRefreshing) {
      console.log('⏰ ApiClient: Refresh proactif du token (expiration imminente)');
      this.performTokenRefresh().catch(error => {
        console.warn('⚠️ ApiClient: Échec du refresh proactif:', error);
      });
    }
  }

  /**
   * Effectue le processus de refresh de token de manière optimisée
   */
  private async performTokenRefresh(): Promise<string> {
    // Si un refresh est déjà en cours, retourner la promesse existante
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.isRefreshing = true;
    this.tokenMetrics.refreshAttempts++;
    
    this.refreshPromise = this.executeTokenRefresh();
    
    try {
      const token = await this.refreshPromise;
      this.tokenMetrics.lastRefresh = Date.now();
      
      // Traiter toutes les requêtes en queue
      this.processQueue(null, token);
      
      return token;
      
    } catch (error) {
      this.tokenMetrics.refreshFailures++;
      this.processQueue(error, null);
      throw error;
      
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * Exécute réellement le refresh du token
   */
  private async executeTokenRefresh(): Promise<string> {
    const refreshToken = this.getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.client.post('/auth/refresh', { 
      refresh_token: refreshToken 
    });
    
    const { access_token, expires_in } = response.data;
    
    this.storeToken(access_token);
    
    // Stocker l'heure d'expiration pour le refresh proactif
    if (expires_in) {
      const expiryTime = Date.now() + (expires_in * 1000);
      localStorage.setItem('mb_token_expiry', expiryTime.toString());
    }
    
    return access_token;
  }

  /**
   * Gère l'échec du refresh token
   */
  private handleRefreshFailure(): void {
    this.clearStoredTokens();
    
    // Nettoyer le timer de refresh si il existe
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    
    // Rediriger vers la page de login seulement si on n'y est pas déjà
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
    
    this.failedQueue = [];
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('mb_access_token');
  }

  private getStoredRefreshToken(): string | null {
    return localStorage.getItem('mb_refresh_token');
  }

  private getTokenExpiry(): number | null {
    const expiry = localStorage.getItem('mb_token_expiry');
    return expiry ? parseInt(expiry) : null;
  }

  private storeToken(token: string): void {
    localStorage.setItem('mb_access_token', token);
  }

  private clearStoredTokens(): void {
    localStorage.removeItem('mb_access_token');
    localStorage.removeItem('mb_refresh_token');
    localStorage.removeItem('mb_user');
    localStorage.removeItem('mb_token_expiry');
  }

  // Méthodes publiques pour les requêtes
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete(url, config);
  }

  // NOUVELLES méthodes utilitaires pour l'authentification OPTIMISÉES
  public setAuthTokens(tokens: AuthTokens): void {
    localStorage.setItem('mb_access_token', tokens.access_token);
    
    if (tokens.refresh_token) {
      localStorage.setItem('mb_refresh_token', tokens.refresh_token);
    }
    
    // Stocker l'heure d'expiration pour le refresh proactif
    if (tokens.expires_in) {
      const expiryTime = Date.now() + (tokens.expires_in * 1000);
      localStorage.setItem('mb_token_expiry', expiryTime.toString());
    }
  }

  public clearAuth(): void {
    this.clearStoredTokens();
    
    // Nettoyer le timer de refresh
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Retourne les métriques de performance du système de token
   */
  public getTokenMetrics(): TokenMetrics & { 
    isHealthy: boolean; 
    nextRefreshIn?: number;
  } {
    const expiry = this.getTokenExpiry();
    const nextRefreshIn = expiry ? Math.max(0, expiry - Date.now() - this.REFRESH_BUFFER_TIME) : undefined;
    
    return {
      ...this.tokenMetrics,
      isHealthy: this.tokenMetrics.refreshFailures < 3,
      nextRefreshIn
    };
  }

  /**
   * Force un refresh immédiat du token (pour tests ou maintenance)
   */
  public async forceTokenRefresh(): Promise<string> {
    console.log('🔧 ApiClient: Refresh forcé du token');
    return this.performTokenRefresh();
  }
}

// Instance unique du client API
export const apiClient = new ApiClient(); 