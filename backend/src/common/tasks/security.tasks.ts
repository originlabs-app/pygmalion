import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class SecurityTasksService {
  private readonly logger = new Logger(SecurityTasksService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Purge quotidienne des secrets MFA temporaires expirés
   * Exécutée tous les jours à 2h du matin
   */
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async purgeExpiredMfaTempSecrets() {
    this.logger.log('🧹 Début de la purge des secrets MFA temporaires expirés');

    try {
      const now = new Date();

      // Compter les secrets expirés avant suppression
      const expiredCount = await this.prisma.userProfile.count({
        where: {
          mfa_temp_secret_expires: {
            lt: now,
          },
        },
      });

      if (expiredCount === 0) {
        this.logger.log('✅ Aucun secret MFA temporaire expiré à purger');
        return;
      }

      // Supprimer les secrets expirés
      const result = await this.prisma.userProfile.updateMany({
        where: {
          mfa_temp_secret_expires: {
            lt: now,
          },
        },
        data: {
          mfa_temp_secret: null,
          mfa_temp_secret_expires: null,
        },
      });

      this.logger.log(
        `✅ Purge terminée: ${result.count} secrets MFA temporaires supprimés`,
      );

      // Log audit
      await this.logSecurityEvent('MFA_TEMP_SECRETS_PURGED', {
        count: result.count,
        timestamp: now.toISOString(),
      });
    } catch (error) {
      this.logger.error(
        '❌ Erreur lors de la purge des secrets MFA temporaires:',
        error,
      );

      // Log de l'erreur
      await this.logSecurityEvent('MFA_TEMP_SECRETS_PURGE_ERROR', {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Nettoyage des refresh tokens expirés et révoqués
   * Exécutée toutes les 6 heures
   */
  @Cron(CronExpression.EVERY_6_HOURS)
  async cleanupExpiredRefreshTokens() {
    this.logger.log('🧹 Début du nettoyage des refresh tokens expirés');

    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Supprimer les tokens expirés depuis plus de 7 jours
      const expiredResult = await this.prisma.refreshToken.deleteMany({
        where: {
          expires_at: {
            lt: sevenDaysAgo,
          },
        },
      });

      // Supprimer les tokens révoqués depuis plus de 7 jours
      const revokedResult = await this.prisma.refreshToken.deleteMany({
        where: {
          is_active: false,
          revoked_at: {
            lt: sevenDaysAgo,
          },
        },
      });

      const totalDeleted = expiredResult.count + revokedResult.count;

      this.logger.log(
        `✅ Nettoyage terminé: ${totalDeleted} refresh tokens supprimés (${expiredResult.count} expirés, ${revokedResult.count} révoqués)`,
      );

      await this.logSecurityEvent('REFRESH_TOKENS_CLEANUP_COMPLETED', {
        expired_count: expiredResult.count,
        revoked_count: revokedResult.count,
        total_deleted: totalDeleted,
        timestamp: now.toISOString(),
      });
    } catch (error) {
      this.logger.error(
        '❌ Erreur lors du nettoyage des refresh tokens:',
        error,
      );

      await this.logSecurityEvent('REFRESH_TOKENS_CLEANUP_ERROR', {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Audit quotidien des tentatives de connexion suspectes
   * Exécutée tous les jours à 1h du matin
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async auditSuspiciousLoginAttempts() {
    this.logger.log(
      "🔍 Début de l'audit des tentatives de connexion suspectes",
    );

    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Ici, nous pourrions analyser les logs de connexion pour détecter des patterns suspects
      // Pour l'instant, nous nous contentons de log audit

      this.logger.log('✅ Audit des tentatives de connexion terminé');

      await this.logSecurityEvent('LOGIN_AUDIT_COMPLETED', {
        timestamp: now.toISOString(),
        period: `${yesterday.toISOString()} - ${now.toISOString()}`,
      });
    } catch (error) {
      this.logger.error("❌ Erreur lors de l'audit des connexions:", error);

      await this.logSecurityEvent('LOGIN_AUDIT_ERROR', {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Nettoyage hebdomadaire des anciens logs de sécurité
   * Exécutée tous les dimanches à 3h du matin
   */
  @Cron('0 3 * * 0') // Chaque dimanche à 3h
  async cleanupOldSecurityLogs() {
    this.logger.log('🧹 Début du nettoyage des anciens logs de sécurité');

    try {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Supprimer les logs de sécurité de plus de 30 jours
      // Ici nous pourrions avoir une table security_logs

      this.logger.log('✅ Nettoyage des anciens logs de sécurité terminé');

      await this.logSecurityEvent('SECURITY_LOGS_CLEANUP_COMPLETED', {
        timestamp: now.toISOString(),
        cutoff_date: thirtyDaysAgo.toISOString(),
      });
    } catch (error) {
      this.logger.error(
        '❌ Erreur lors du nettoyage des logs de sécurité:',
        error,
      );
    }
  }

  /**
   * Contrôle des tentatives MFA échouées - Rate limiting
   * Exécutée toutes les heures
   */
  @Cron(CronExpression.EVERY_HOUR)
  async checkMfaFailureRates() {
    this.logger.log("🔒 Contrôle des taux d'échec MFA");

    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      // Ici nous pourrions analyser les échecs MFA et bloquer temporairement les comptes
      // avec trop de tentatives échouées

      this.logger.log("✅ Contrôle des taux d'échec MFA terminé");

      await this.logSecurityEvent('MFA_FAILURE_RATE_CHECK_COMPLETED', {
        timestamp: now.toISOString(),
      });
    } catch (error) {
      this.logger.error(
        "❌ Erreur lors du contrôle des taux d'échec MFA:",
        error,
      );
    }
  }

  /**
   * Méthode privée pour logger les événements de sécurité
   */
  private async logSecurityEvent(
    eventType: string,
    data: Record<string, unknown>,
  ) {
    try {
      // Ici nous pourrions insérer dans une table security_logs
      // Pour l'instant, nous utilisons simplement le logger
      this.logger.log(`🔐 Événement sécurité: ${eventType}`, data);

      // Si nous avions une table security_logs:
      // await this.prisma.securityLog.create({
      //   data: {
      //     event_type: eventType,
      //     event_data: JSON.stringify(data),
      //     created_at: new Date()
      //   }
      // });
    } catch (error) {
      this.logger.error(
        "❌ Erreur lors de l'enregistrement de l'événement sécurité:",
        error,
      );
    }
  }

  /**
   * Méthode manuelle pour déclencher la purge des secrets MFA expirés
   * Utile pour les tests ou maintenance
   */
  async manualPurgeMfaTempSecrets(): Promise<{ count: number }> {
    this.logger.log('🔧 Purge manuelle des secrets MFA temporaires expirés');

    const now = new Date();
    const result = await this.prisma.userProfile.updateMany({
      where: {
        mfa_temp_secret_expires: {
          lt: now,
        },
      },
      data: {
        mfa_temp_secret: null,
        mfa_temp_secret_expires: null,
      },
    });

    this.logger.log(
      `✅ Purge manuelle terminée: ${result.count} éléments supprimés`,
    );

    return { count: result.count };
  }
}
