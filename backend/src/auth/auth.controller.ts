import { Controller, Post, Body, Get, UseGuards, Req, Put, Param, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { MfaService } from './mfa.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyMfaDto, EnableMfaDto, MfaSetupResponseDto, MfaStatusDto } from './dto/mfa.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { SecurityTasksService } from '../common/tasks/security.tasks';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly mfaService: MfaService,
    private readonly securityTasksService: SecurityTasksService,
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: any) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? user.first_name,
      lastName: user.lastName ?? user.last_name,
      role: user.role,
      organization: user.organization,
      mfaEnabled: user.mfaEnabled ?? user.mfa_enabled,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@CurrentUser() user: any) {
    // Pour l'instant, on retourne juste un succès
    // Dans une implémentation plus avancée, on pourrait invalider le token
    return {
      success: true,
      message: 'Déconnexion réussie',
    };
  }

  // === Endpoints MFA ===

  @UseGuards(JwtAuthGuard)
  @Get('setup-mfa')
  async setupMFA(@CurrentUser() user: any): Promise<MfaSetupResponseDto> {
    try {
      console.log('🔒 Début setup MFA pour utilisateur:', user.email);
      
      const { secret, otpAuthUrl } = this.mfaService.generateSecret(user.email);
      console.log('✅ Secret généré:', secret.substring(0, 10) + '...');
      
      // Stocker temporairement le secret en base de données
      await this.mfaService.storeTempSecret(user.id, secret);
      console.log('💾 Secret stocké temporairement en BDD pour user:', user.id);
      
      const qrCodeDataUrl = await this.mfaService.generateQRCode(otpAuthUrl);
      console.log('✅ QR code généré, longueur:', qrCodeDataUrl.length);

      const response = {
        secret,
        qrCodeDataUrl,
      };
      
      console.log('📤 Réponse MFA setup:', {
        secret: secret.substring(0, 10) + '...',
        qrCodeDataUrl: qrCodeDataUrl.substring(0, 50) + '...',
      });

      return response;
    } catch (error) {
      console.error('❌ Erreur dans setup MFA:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-mfa')
  async verifyMFA(
    @CurrentUser() user: any,
    @Body() verifyMfaDto: VerifyMfaDto,
  ) {
    const secret = await this.mfaService.getUserMFASecret(user.id);
    
    if (!secret) {
      return { valid: false, message: 'MFA non configuré pour cet utilisateur' };
    }

    const isValid = this.mfaService.verifyToken(secret, verifyMfaDto.token);
    
    return {
      valid: isValid,
      message: isValid ? 'Code OTP valide' : 'Code OTP invalide',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('enable-mfa')
  async enableMFA(
    @CurrentUser() user: any,
    @Body() body: { otpCode: string },
  ) {
    try {
      console.log('🔒 Tentative d\'activation MFA pour:', user.email);
      console.log('📱 Code OTP reçu:', body.otpCode);

      // Récupérer le secret stocké temporairement en BDD
      const secret = await this.mfaService.getTempSecret(user.id);
      if (!secret) {
        console.log('❌ Aucun secret temporaire trouvé pour user:', user.id);
        return {
          success: false,
          message: 'Session MFA expirée. Veuillez recommencer la configuration.',
        };
      }

      console.log('🔑 Secret récupéré pour validation:', secret.substring(0, 10) + '...');

      // Vérifier le token avec le secret du setup
      const isValid = this.mfaService.verifyToken(secret, body.otpCode);
      console.log('✅ Validation OTP:', isValid);
      
      if (!isValid) {
        console.log('❌ Code OTP invalide');
        return { 
          success: false, 
          message: 'Code OTP invalide. Vérifiez votre application d\'authentification.' 
        };
      }

      // Activer MFA avec le secret
      await this.mfaService.enableMFA(user.id, secret);
      console.log('✅ MFA activé avec succès pour:', user.email);
      
      // Nettoyer le secret temporaire
      await this.mfaService.clearTempSecret(user.id);
      console.log('🧹 Secret temporaire supprimé de la BDD');
      
      // Générer des codes de récupération
      const backupCodes = this.generateBackupCodes();
      
      return {
        success: true,
        message: 'MFA activé avec succès',
        backupCodes,
      };
    } catch (error) {
      console.error('❌ Erreur lors de l\'activation MFA:', error);
      return {
        success: false,
        message: 'Erreur interne lors de l\'activation MFA',
      };
    }
  }

  /**
   * Génère des codes de récupération pour MFA
   */
  private generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < 10; i++) {
      // Génère un code de 8 caractères alphanumériques
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    return codes;
  }

  @UseGuards(JwtAuthGuard)
  @Post('disable-mfa')
  async disableMFA(@CurrentUser() user: any) {
    await this.mfaService.disableMFA(user.id);
    
    return {
      success: true,
      message: 'MFA désactivé avec succès',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('mfa-status')
  async getMFAStatus(@CurrentUser() user: any): Promise<MfaStatusDto> {
    const enabled = await this.mfaService.isMFAEnabled(user.id);
    
    return { enabled };
  }

  // === Endpoint Changement Mot de Passe ===

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @CurrentUser() user: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    try {
      await this.authService.changePassword(user.id, changePasswordDto);
      
      return {
        success: true,
        message: 'Mot de passe mis à jour avec succès',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors du changement de mot de passe',
      };
    }
  }

  // === Endpoints Reset Password ===

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      const result = await this.authService.forgotPassword(forgotPasswordDto);
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de l\'envoi de l\'email de réinitialisation',
      };
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const result = await this.authService.resetPassword(resetPasswordDto);
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Erreur lors de la réinitialisation du mot de passe',
      };
    }
  }

  /**
   * 🔧 ENDPOINTS DE MAINTENANCE ET TESTS
   */

  /**
   * Déclenche manuellement la purge des secrets MFA expirés
   * Endpoint utile pour les tests et la maintenance
   */
  @Post('admin/security/purge-mfa-secrets')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async purgeMfaSecrets(@CurrentUser() user: any) {
    this.logger.log(`🔧 Purge manuelle des secrets MFA déclenchée par admin: ${user.id}`);
    
    const result = await this.securityTasksService.manualPurgeMfaTempSecrets();
    
    return {
      success: true,
      message: `Purge terminée: ${result.count} secrets temporaires supprimés`,
      count: result.count,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Retourne les statistiques de sécurité MFA
   */
  @Get('admin/security/mfa-stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getMfaStats(@CurrentUser() user: any) {
    this.logger.log(`📊 Consultation des stats MFA par admin: ${user.id}`);
    
    const stats = this.mfaService.getMfaStats();
    
    return {
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Débloquer un utilisateur bloqué par rate limiting MFA
   */
  @Post('admin/security/unblock-user/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async unblockUser(
    @Param('userId') userId: string,
    @CurrentUser() user: any
  ) {
    this.logger.log(`🔓 Déblocage utilisateur ${userId} par admin: ${user.id}`);
    
    const wasBlocked = this.mfaService.unblockUser(userId);
    
    return {
      success: true,
      message: wasBlocked ? 'Utilisateur débloqué avec succès' : 'Utilisateur n\'était pas bloqué',
      wasBlocked,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Endpoint MFA amélioré avec rate limiting
   */
  @Post('verify-mfa-secure')
  @UseGuards(JwtAuthGuard)
  async verifyMfaSecure(
    @Body() body: { token: string },
    @CurrentUser() user: any,
    @Req() request: Request
  ) {
    this.logger.log(`🔒 Vérification MFA sécurisée pour user: ${user.id}`);
    
    const { token } = body;
    
    if (!token) {
      throw new BadRequestException('Token MFA requis');
    }

    const secret = await this.mfaService.getUserMFASecret(user.id);
    if (!secret) {
      throw new BadRequestException('MFA non configuré pour cet utilisateur');
    }

    // Utiliser la nouvelle méthode sécurisée
    const ip = request.ip || request.socket?.remoteAddress || 'unknown';
    const result = await this.mfaService.verifyTokenWithSecurity(user.id, secret, token, ip);
    
    if (!result.success) {
      throw new UnauthorizedException({
        message: result.message,
        waitTime: result.waitTime
      });
    }

    return {
      success: true,
      message: result.message,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Confirmer le changement d'adresse email
   */
  @Post('confirm-email-change')
  async confirmEmailChange(
    @Body() body: { token: string; userId: string }
  ) {
    this.logger.log(`📧 Confirmation changement email: ${body.userId}`);
    
    const { token, userId } = body;
    
    if (!token || !userId) {
      throw new BadRequestException('Token et userId requis');
    }

    try {
      // Récupérer les données de changement d'email stockées
      const user = await this.authService.validateUser(userId);
      
      const emailChangeData = user.mfa_temp_secret;
      if (!emailChangeData || !user.mfa_temp_secret_expires) {
        throw new BadRequestException('Aucune demande de changement d\'email en cours');
      }

      // Vérifier l'expiration
      if (new Date() > user.mfa_temp_secret_expires) {
        throw new BadRequestException('Le lien de confirmation a expiré');
      }

      // Parser les données
      let changeData;
      try {
        changeData = JSON.parse(emailChangeData);
      } catch {
        throw new BadRequestException('Données de changement corrompues');
      }

      // Vérifier le token et le type
      if (changeData.type !== 'EMAIL_CHANGE' || changeData.token !== token) {
        throw new BadRequestException('Token de confirmation invalide');
      }

      // Effectuer le changement d'email
      await this.usersService.updateEmail(userId, changeData.newEmail);

      // Nettoyer les données temporaires
      await this.prisma.userProfile.update({
        where: { id: userId },
        data: {
          mfa_temp_secret: null,
          mfa_temp_secret_expires: null,
        },
      });

      this.logger.log(`✅ Email confirmé et mis à jour: ${userId} -> ${changeData.newEmail}`);

      return {
        success: true,
        message: 'Adresse email mise à jour avec succès',
        newEmail: changeData.newEmail,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      this.logger.error(`❌ Erreur confirmation email: ${error.message}`);
      throw error;
    }
  }
}
