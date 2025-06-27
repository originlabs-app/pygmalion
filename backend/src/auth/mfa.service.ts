import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

// Interface pour le rate limiting MFA
interface MfaAttempt {
  userId: string;
  timestamp: number;
  success: boolean;
  ip?: string;
}

@Injectable()
export class MfaService {
  private readonly logger = new Logger(MfaService.name);
  
  // Rate limiting: stocker les tentatives récentes en mémoire
  // En production, ceci devrait être dans Redis ou base de données
  private mfaAttempts: Map<string, MfaAttempt[]> = new Map();
  
  // Configuration rate limiting
  private readonly MAX_ATTEMPTS = 5; // Max 5 tentatives
  private readonly RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
  private readonly LOCKOUT_DURATION = 30 * 60 * 1000; // 30 minutes de blocage

  constructor(private prisma: PrismaService) {
    // Nettoyer les tentatives expirées toutes les 5 minutes
    setInterval(() => {
      this.cleanupExpiredAttempts();
    }, 5 * 60 * 1000);
  }

  /**
   * Génère un secret TOTP pour un utilisateur
   */
  generateSecret(userEmail: string) {
    console.log('🔒 Génération du secret MFA pour:', userEmail);
    
    const secret = speakeasy.generateSecret({
      name: `PYGMALION (${userEmail})`,
      issuer: 'PYGMALION',
      length: 32,
    });

    if (!secret.otpauth_url) {
      console.error('❌ Erreur: otpauth_url manquant');
      throw new Error('Erreur lors de la génération du secret TOTP');
    }

    console.log('✅ Secret généré avec succès');
    console.log('🔗 OTP Auth URL:', secret.otpauth_url);

    return {
      secret: secret.base32!,
      otpAuthUrl: secret.otpauth_url,
    };
  }

  /**
   * Génère un QR code à partir de l'URL TOTP
   */
  async generateQRCode(otpAuthUrl: string): Promise<string> {
    try {
      console.log('📱 Génération du QR code...');
      console.log('🔗 URL TOTP:', otpAuthUrl);
      
      const qrCodeDataUrl = await qrcode.toDataURL(otpAuthUrl);
      
      console.log('✅ QR code généré avec succès');
      console.log('📊 QR code length:', qrCodeDataUrl.length);
      console.log('🎨 QR code preview:', qrCodeDataUrl.substring(0, 50) + '...');
      
      return qrCodeDataUrl;
    } catch (error) {
      console.error('❌ Erreur lors de la génération du QR code:', error);
      throw new Error('Erreur lors de la génération du QR code');
    }
  }

  /**
   * Vérifie un token TOTP avec rate limiting et audit
   */
  async verifyTokenWithSecurity(
    userId: string, 
    secret: string, 
    token: string, 
    ip?: string
  ): Promise<{ success: boolean; message?: string; waitTime?: number }> {
    
    // 1. Vérifier le rate limiting
    const rateLimitResult = this.checkRateLimit(userId, ip);
    if (!rateLimitResult.allowed) {
      this.logger.warn(`🚫 Rate limit dépassé pour user ${userId} (IP: ${ip})`);
      
      await this.logMfaEvent(userId, {
        event: 'MFA_RATE_LIMITED',
        ip,
        timestamp: new Date().toISOString()
      });
      
      return {
        success: false,
        message: 'Trop de tentatives échouées. Réessayez plus tard.',
        waitTime: rateLimitResult.waitTime
      };
    }

    // 2. Vérifier le token TOTP
    const isValid = this.verifyToken(secret, token);
    
    // 3. Enregistrer la tentative
    this.recordMfaAttempt(userId, isValid, ip);
    
    // 4. Logger l'événement d'audit
    await this.logMfaEvent(userId, {
      event: isValid ? 'MFA_SUCCESS' : 'MFA_FAILURE',
      ip,
      timestamp: new Date().toISOString(),
      token_hash: this.hashToken(token) // Hash du token pour audit sans exposer la valeur
    });

    if (isValid) {
      this.logger.log(`✅ MFA réussi pour user ${userId}`);
      // Nettoyer les tentatives après succès
      this.mfaAttempts.delete(userId);
    } else {
      this.logger.warn(`❌ MFA échoué pour user ${userId} (tentatives: ${this.getUserAttempts(userId).length})`);
    }

    return {
      success: isValid,
      message: isValid ? 'Authentification réussie' : 'Code incorrect'
    };
  }

  /**
   * Vérifie un token TOTP (version originale pour compatibilité)
   */
  verifyToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2, // Tolérance de ±2 intervalles (60 secondes)
    });
  }

  /**
   * Active MFA pour un utilisateur en stockant le secret
   */
  async enableMFA(userId: string, secret: string): Promise<void> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        mfa_secret: secret,
        mfa_enabled: true,
        // Nettoyer le secret temporaire si il existe
        mfa_temp_secret: null,
        mfa_temp_secret_expires: null,
      },
    });

    // Log d'audit
    await this.logMfaEvent(userId, {
      event: 'MFA_ENABLED',
      timestamp: new Date().toISOString()
    });

    this.logger.log(`🔐 MFA activé pour user ${userId}`);
  }

  /**
   * Désactive MFA pour un utilisateur
   */
  async disableMFA(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        mfa_secret: null,
        mfa_enabled: false,
        mfa_temp_secret: null,
        mfa_temp_secret_expires: null,
      },
    });

    // Nettoyer les tentatives
    this.mfaAttempts.delete(userId);

    // Log d'audit
    await this.logMfaEvent(userId, {
      event: 'MFA_DISABLED',
      timestamp: new Date().toISOString()
    });

    this.logger.log(`🔓 MFA désactivé pour user ${userId}`);
  }

  /**
   * Vérifie si MFA est activé pour un utilisateur
   */
  async isMFAEnabled(userId: string): Promise<boolean> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
      select: { mfa_enabled: true },
    });

    return user?.mfa_enabled || false;
  }

  /**
   * Récupère le secret MFA d'un utilisateur
   */
  async getUserMFASecret(userId: string): Promise<string | null> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
      select: { mfa_secret: true },
    });

    return user?.mfa_secret || null;
  }

  /**
   * Stocke temporairement un secret MFA pour un utilisateur avec expiration automatique
   */
  async storeTempSecret(userId: string, secret: string): Promise<void> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    console.log('💾 Stockage secret temporaire pour user:', userId);
    
    const expirationTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
    
    await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        mfa_temp_secret: secret,
        mfa_temp_secret_expires: expirationTime,
      },
    });

    // Log d'audit
    await this.logMfaEvent(userId, {
      event: 'MFA_TEMP_SECRET_CREATED',
      expires_at: expirationTime.toISOString(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Récupère le secret temporaire d'un utilisateur avec vérification automatique d'expiration
   */
  async getTempSecret(userId: string): Promise<string | null> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    console.log('🔍 Récupération secret temporaire pour user:', userId);

    const user = await this.prisma.userProfile.findUnique({
      where: { id: userId },
      select: { 
        mfa_temp_secret: true,
        mfa_temp_secret_expires: true,
      },
    });

    if (!user?.mfa_temp_secret || !user?.mfa_temp_secret_expires) {
      console.log('❌ Aucun secret temporaire trouvé');
      return null;
    }

    // Vérifier si le secret n'a pas expiré
    if (new Date() > user.mfa_temp_secret_expires) {
      console.log('⏰ Secret temporaire expiré, nettoyage automatique');
      await this.clearTempSecret(userId);
      
      // Log d'audit
      await this.logMfaEvent(userId, {
        event: 'MFA_TEMP_SECRET_EXPIRED',
        timestamp: new Date().toISOString()
      });
      
      return null;
    }

    console.log('✅ Secret temporaire récupéré');
    return user.mfa_temp_secret;
  }

  /**
   * Supprime le secret temporaire d'un utilisateur
   */
  async clearTempSecret(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('ID utilisateur requis');
    }

    console.log('🧹 Suppression secret temporaire pour user:', userId);

    await this.prisma.userProfile.update({
      where: { id: userId },
      data: {
        mfa_temp_secret: null,
        mfa_temp_secret_expires: null,
      },
    });
  }

  // ==================== NOUVELLES MÉTHODES DE SÉCURITÉ ====================

  /**
   * Vérifie le rate limiting pour les tentatives MFA
   */
  private checkRateLimit(userId: string, ip?: string): { allowed: boolean; waitTime?: number } {
    const now = Date.now();
    const userAttempts = this.getUserAttempts(userId);
    
    // Compter les tentatives échouées récentes
    const recentFailures = userAttempts.filter(attempt => 
      !attempt.success && 
      (now - attempt.timestamp) < this.RATE_LIMIT_WINDOW
    );

    if (recentFailures.length >= this.MAX_ATTEMPTS) {
      // Calculer le temps d'attente restant
      const oldestFailure = Math.min(...recentFailures.map(a => a.timestamp));
      const waitTime = this.LOCKOUT_DURATION - (now - oldestFailure);
      
      return {
        allowed: false,
        waitTime: Math.max(0, waitTime)
      };
    }

    return { allowed: true };
  }

  /**
   * Enregistre une tentative MFA
   */
  private recordMfaAttempt(userId: string, success: boolean, ip?: string): void {
    const attempts = this.getUserAttempts(userId);
    
    attempts.push({
      userId,
      timestamp: Date.now(),
      success,
      ip
    });

    // Garder seulement les 20 dernières tentatives
    if (attempts.length > 20) {
      attempts.splice(0, attempts.length - 20);
    }

    this.mfaAttempts.set(userId, attempts);
  }

  /**
   * Récupère les tentatives MFA d'un utilisateur
   */
  private getUserAttempts(userId: string): MfaAttempt[] {
    return this.mfaAttempts.get(userId) || [];
  }

  /**
   * Nettoie les tentatives expirées
   */
  private cleanupExpiredAttempts(): void {
    const now = Date.now();
    const cutoff = now - this.LOCKOUT_DURATION;

    for (const [userId, attempts] of this.mfaAttempts.entries()) {
      const validAttempts = attempts.filter(attempt => attempt.timestamp > cutoff);
      
      if (validAttempts.length === 0) {
        this.mfaAttempts.delete(userId);
      } else {
        this.mfaAttempts.set(userId, validAttempts);
      }
    }
  }

  /**
   * Hash un token pour les logs d'audit (ne pas stocker la valeur réelle)
   */
  private hashToken(token: string): string {
    // Simple hash pour audit - ne pas utiliser en crypto réelle
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex').substring(0, 16);
  }

  /**
   * Log des événements MFA pour audit
   */
  private async logMfaEvent(userId: string, eventData: any): Promise<void> {
    try {
      // Log dans la console avec details
      this.logger.log('🔐 Événement MFA:', {
        userId,
        ...eventData
      });

      // Ici nous pourrions insérer dans une table audit_logs si elle existait:
      // await this.prisma.auditLog.create({
      //   data: {
      //     user_id: userId,
      //     event_type: 'MFA_EVENT',
      //     event_data: JSON.stringify(eventData),
      //     created_at: new Date()
      //   }
      // });

    } catch (error) {
      this.logger.error('❌ Erreur lors de l\'audit MFA:', error);
    }
  }

  /**
   * Retourne les statistiques MFA pour monitoring
   */
  public getMfaStats(): {
    totalUsers: number;
    activeAttempts: number;
    blockedUsers: number;
    recentFailures: number;
  } {
    let blockedUsers = 0;
    let recentFailures = 0;
    const now = Date.now();

    for (const [userId, attempts] of this.mfaAttempts.entries()) {
      const recentFailedAttempts = attempts.filter(attempt => 
        !attempt.success && 
        (now - attempt.timestamp) < this.RATE_LIMIT_WINDOW
      );

      if (recentFailedAttempts.length >= this.MAX_ATTEMPTS) {
        blockedUsers++;
      }

      recentFailures += recentFailedAttempts.length;
    }

    return {
      totalUsers: this.mfaAttempts.size,
      activeAttempts: Array.from(this.mfaAttempts.values()).reduce((sum, attempts) => sum + attempts.length, 0),
      blockedUsers,
      recentFailures
    };
  }

  /**
   * Débloquer manuellement un utilisateur (pour admin)
   */
  public unblockUser(userId: string): boolean {
    const wasBlocked = this.mfaAttempts.has(userId);
    this.mfaAttempts.delete(userId);
    
    if (wasBlocked) {
      this.logger.log(`🔓 Utilisateur ${userId} débloqué manuellement`);
    }
    
    return wasBlocked;
  }
} 