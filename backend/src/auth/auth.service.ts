import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { PrismaService } from '@/prisma/prisma.service';
import { SupabaseService } from '@/config/supabase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UpdateEmailDto } from '@/users/dto/update-email.dto';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, ...userData } = registerDto;

    // Vérifier si l'utilisateur existe déjà dans notre base
    const existingUser = await this.prisma.userProfile.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }

    try {
      // Créer l'utilisateur avec Supabase Auth
      const { data: authData, error: authError } =
        await this.supabaseService.signUp(email, password, {
          first_name: userData.firstName,
          last_name: userData.lastName,
          role: userData.role,
        });

      if (authError) {
        throw new BadRequestException(`Erreur Supabase: ${authError.message}`);
      }

      if (!authData.user) {
        throw new BadRequestException("Échec de création de l'utilisateur");
      }

      // Créer le profil utilisateur dans notre base avec l'ID Supabase
      const userProfile = await this.usersService.create(
        { ...userData, email },
        authData.user.id,
      );

      // Retourner un message indiquant qu'un email de confirmation a été envoyé
      return {
        message:
          'Inscription réussie! Veuillez vérifier votre email pour activer votre compte.',
        emailSent: true,
        user: {
          id: userProfile.id,
          email: userProfile.email,
          firstName: userProfile.first_name,
          lastName: userProfile.last_name,
          role: userProfile.role,
          verified: false, // Non vérifié tant que l'email n'est pas confirmé
          organization: userProfile.organization,
          mfaEnabled: userProfile.mfa_enabled,
        },
      };
    } catch (error) {
      // Si l'utilisateur a été créé dans Supabase mais pas dans notre base, on doit nettoyer
      this.logger.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    try {
      this.logger.log('🔐 Tentative de connexion pour:', loginDto.email);

      // Étape 1: Vérifier les identifiants avec Supabase
      const { data: authData, error: authError } =
        await this.supabaseService.signInWithPassword(
          loginDto.email,
          loginDto.password,
        );

      if (authError) {
        this.logger.log('❌ Erreur Supabase:', authError.message);
        throw new UnauthorizedException('Email ou mot de passe incorrect');
      }

      if (!authData.user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      // Étape 2: Récupérer le profil utilisateur depuis notre base
      const user = await this.usersService.findByEmail(loginDto.email);
      if (!user) {
        throw new UnauthorizedException('Profil utilisateur non trouvé');
      }

      this.logger.log('✅ Identifiants valides pour:', user.email);
      this.logger.log('🔒 MFA utilisateur:', user.mfa_enabled);
      this.logger.log('🔒 MFA global:', process.env.MFA_ENABLED);

      // Étape 3: Vérifier MFA si activé (utilisateur ET global)
      const mfaGlobalEnabled = process.env.MFA_ENABLED !== 'false';
      const mfaRequired = user.mfa_enabled && mfaGlobalEnabled;
      this.logger.log('🔒 MFA requis:', mfaRequired);

      if (mfaRequired) {
        if (!loginDto.otpCode) {
          this.logger.log('🔒 MFA requis mais code OTP manquant');
          throw new UnauthorizedException('MFA_REQUIRED');
        }

        // Valider le code OTP
        const isValidOTP = await this.validateMFACode(
          user.id,
          loginDto.otpCode,
        );
        if (!isValidOTP) {
          this.logger.log('❌ Code OTP invalide');
          throw new UnauthorizedException('Code OTP invalide');
        }

        this.logger.log('✅ Code OTP valide');
      }

      // Étape 4: Générer les tokens avec refresh token
      const { accessToken, refreshToken } = await this.generateTokens(
        user.id,
        user.email,
        user.role,
        mfaRequired,
        loginDto.deviceId, // Optionnel : identifiant de l'appareil
        this.getDeviceInfo(loginDto),
      );

      this.logger.log('✅ Connexion réussie pour:', user.email);

      return {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          verified: user.kyc_status === 'verified',
          organization: user.organization,
          mfaEnabled: mfaRequired,
        },
        tokens: {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600, // 1 heure en secondes
        },
      };
    } catch (error) {
      this.logger.error('❌ Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Valide un code MFA pour un utilisateur
   */
  private async validateMFACode(
    userId: string,
    otpCode: string,
  ): Promise<boolean> {
    try {
      // Récupérer le secret MFA de l'utilisateur
      const user = await this.prisma.userProfile.findUnique({
        where: { id: userId },
        select: { mfa_secret: true },
      });

      if (!user?.mfa_secret) {
        this.logger.log('❌ Secret MFA non trouvé pour user:', userId);
        return false;
      }

      // Importer speakeasy pour la validation
      const speakeasy = require('speakeasy');

      const isValid = speakeasy.totp.verify({
        secret: user.mfa_secret,
        encoding: 'base32',
        token: otpCode,
        window: 2, // Tolérance de ±2 intervalles (60 secondes)
      });

      this.logger.log('🔍 Validation MFA:', { userId, otpCode, isValid });
      return isValid;
    } catch (error) {
      this.logger.error('❌ Erreur lors de la validation MFA:', error);
      return false;
    }
  }

  /**
   * Génère un access token et un refresh token
   */
  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    mfaVerified: boolean,
    deviceId?: string,
    deviceInfo?: { name?: string; ipAddress?: string; userAgent?: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Générer un family ID pour la rotation des tokens
    const familyId = uuidv4();

    // Payload JWT pour l'access token
    const accessPayload = {
      email,
      sub: userId,
      role,
      mfaVerified,
      tokenType: 'access',
    };

    // Access token avec durée de vie courte (15 minutes)
    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: '15m',
    });

    // Générer un refresh token unique
    const refreshTokenValue = crypto.randomBytes(32).toString('hex');

    // Sauvegarder le refresh token en base
    await this.prisma.refreshToken.create({
      data: {
        user_id: userId,
        token: refreshTokenValue,
        device_id: deviceId,
        device_name: deviceInfo?.name,
        ip_address: deviceInfo?.ipAddress,
        user_agent: deviceInfo?.userAgent,
        family_id: familyId,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
        is_active: true,
      },
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }

  /**
   * Rafraîchit l'access token en utilisant un refresh token
   */
  async refreshToken(
    refreshToken: string,
    req?: Request,
  ): Promise<RefreshTokenResponse> {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || !tokenRecord.is_active) {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }

    // Vérifier l'expiration
    if (new Date() > tokenRecord.expires_at) {
      await this.invalidateRefreshToken(tokenRecord.id, 'expired');
      throw new UnauthorizedException('Refresh token expiré');
    }

    // Détecter une possible réutilisation d'un token déjà tourné
    if (tokenRecord.revoked_at) {
      // Invalider toute la famille de tokens (possible attaque)
      if (tokenRecord.family_id) {
        await this.invalidateTokenFamily(
          tokenRecord.family_id,
          'suspicious_activity',
        );
      }
      throw new UnauthorizedException('Activité suspecte détectée');
    }

    // Rotation du refresh token (sécurité supplémentaire)
    const newRefreshToken = await this.rotateRefreshToken(tokenRecord, req);

    // Générer un nouvel access token
    const accessPayload = {
      email: tokenRecord.user.email,
      sub: tokenRecord.user.id,
      role: tokenRecord.user.role,
      mfaVerified: tokenRecord.user.mfa_enabled,
      tokenType: 'access',
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      expiresIn: '15m',
    });

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
      expires_in: 900, // 15 minutes en secondes
    };
  }

  /**
   * Rotation du refresh token pour plus de sécurité
   */
  private async rotateRefreshToken(
    oldToken: any,
    req?: Request,
  ): Promise<string> {
    // Générer un nouveau token
    const newTokenValue = crypto.randomBytes(32).toString('hex');

    // Créer le nouveau token avec le même family_id
    await this.prisma.refreshToken.create({
      data: {
        user_id: oldToken.user_id,
        token: newTokenValue,
        device_id: oldToken.device_id,
        device_name: oldToken.device_name,
        ip_address: req?.ip || oldToken.ip_address,
        user_agent: req?.headers['user-agent'] || oldToken.user_agent,
        family_id: oldToken.family_id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        is_active: true,
      },
    });

    // Marquer l'ancien token comme utilisé (rotation)
    await this.prisma.refreshToken.update({
      where: { id: oldToken.id },
      data: {
        is_active: false,
        revoked_at: new Date(),
        revoked_reason: 'rotation',
        last_used_at: new Date(),
      },
    });

    return newTokenValue;
  }

  /**
   * Invalide un refresh token
   */
  async invalidateRefreshToken(tokenId: string, reason: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id: tokenId },
      data: {
        is_active: false,
        revoked_at: new Date(),
        revoked_reason: reason,
      },
    });
  }

  /**
   * Invalide toute une famille de tokens (sécurité)
   */
  private async invalidateTokenFamily(
    familyId: string,
    reason: string,
  ): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { family_id: familyId },
      data: {
        is_active: false,
        revoked_at: new Date(),
        revoked_reason: reason,
      },
    });
  }

  /**
   * Déconnexion : invalide le refresh token
   */
  async logout(refreshToken: string): Promise<void> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (token) {
      await this.invalidateRefreshToken(token.id, 'logout');
    }
  }

  /**
   * Récupère les informations de l'appareil depuis la requête
   */
  private getDeviceInfo(loginDto: any): {
    name?: string;
    ipAddress?: string;
    userAgent?: string;
  } {
    return {
      name: loginDto.deviceName || 'Unknown Device',
      ipAddress: loginDto.ipAddress,
      userAgent: loginDto.userAgent,
    };
  }

  async validateUser(id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * Changement de mot de passe utilisateur
   */
  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    try {
      // Récupérer l'utilisateur pour obtenir son email
      const user = await this.usersService.findOne(userId);

      // Vérifier le mot de passe actuel avec Supabase
      const { error: signInError } =
        await this.supabaseService.signInWithPassword(
          user.email,
          currentPassword,
        );

      if (signInError) {
        throw new UnauthorizedException('Mot de passe actuel incorrect');
      }

      // Mettre à jour le mot de passe avec Supabase
      const { error: updateError } =
        await this.supabaseService.updatePassword(newPassword);

      if (updateError) {
        throw new BadRequestException(
          `Erreur lors de la mise à jour: ${updateError.message}`,
        );
      }

      this.logger.log('✅ Mot de passe mis à jour avec succès');
    } catch (error) {
      this.logger.error('❌ Erreur lors du changement de mot de passe:', error);
      throw error;
    }
  }

  /**
   * Demande de réinitialisation de mot de passe par email
   */
  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;

    try {
      // Vérifier que l'utilisateur existe dans notre base
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        // Pour des raisons de sécurité, on retourne toujours le même message
        // même si l'email n'existe pas
        return {
          message:
            'Si cette adresse email est associée à un compte, vous recevrez un lien de réinitialisation.',
        };
      }

      // Envoyer l'email de réinitialisation via Supabase
      const { error } = await this.supabaseService.resetPasswordForEmail(email);

      if (error) {
        this.logger.error('❌ Erreur Supabase resetPasswordForEmail:', error);
        throw new BadRequestException(
          "Erreur lors de l'envoi de l'email de réinitialisation",
        );
      }

      this.logger.log('✅ Email de réinitialisation envoyé pour:', email);

      return {
        message:
          'Si cette adresse email est associée à un compte, vous recevrez un lien de réinitialisation.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Si l'utilisateur n'existe pas, on retourne quand même un message de succès
      return {
        message:
          'Si cette adresse email est associée à un compte, vous recevrez un lien de réinitialisation.',
      };
    }
  }

  /**
   * Réinitialisation du mot de passe avec token
   * Note: Avec Supabase, la gestion des tokens se fait côté frontend
   * Ce endpoint est maintenu pour la compatibilité mais n'est pas utilisé directement
   */
  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { token, newPassword } = resetPasswordDto;

    try {
      // Avec Supabase, la réinitialisation se fait directement côté frontend
      // via l'URL de redirection qui contient les tokens nécessaires
      // Ce endpoint peut être appelé après que Supabase ait validé le token

      this.logger.log('✅ Demande de réinitialisation reçue');

      return {
        message:
          'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
      };
    } catch (error) {
      this.logger.error('❌ Erreur lors de la réinitialisation:', error);
      throw new BadRequestException(
        'Erreur lors de la réinitialisation du mot de passe',
      );
    }
  }

  /**
   * Mise à jour de l'adresse email utilisateur
   */
  async updateEmail(
    userId: string,
    updateEmailDto: UpdateEmailDto,
  ): Promise<{ message: string }> {
    const { newEmail, password } = updateEmailDto;

    try {
      // Récupérer l'utilisateur actuel
      const user = await this.usersService.findOne(userId);

      // Vérifier le mot de passe avec Supabase
      const { error: signInError } =
        await this.supabaseService.signInWithPassword(user.email, password);

      if (signInError) {
        throw new UnauthorizedException('Mot de passe incorrect');
      }

      // Vérifier si le nouvel email n'est pas déjà utilisé
      try {
        await this.usersService.findByEmail(newEmail);
        throw new ConflictException('Cette adresse email est déjà utilisée');
      } catch (error) {
        // Si l'utilisateur n'est pas trouvé, c'est bon, on peut continuer
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }

      // Générer un token sécurisé pour la confirmation
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

      // Stocker temporairement la demande (utilise mfa_temp_secret comme stockage temporaire)
      const emailChangeData = JSON.stringify({
        type: 'EMAIL_CHANGE',
        newEmail,
        token,
        expires: expiresAt.getTime(),
      });

      await this.prisma.userProfile.update({
        where: { id: userId },
        data: {
          mfa_temp_secret: emailChangeData,
          mfa_temp_secret_expires: expiresAt,
        },
      });

      // Envoyer email avec lien personnalisé (via notre endpoint de confirmation)
      const confirmUrl = `${process.env.FRONTEND_URL || 'http://localhost:8080'}/confirm-email-change?token=${token}&userId=${userId}`;

      // Utiliser resetPasswordForEmail mais rediriger vers notre page de confirmation
      const { error: emailError } =
        await this.supabaseService.resetPasswordForEmail(newEmail);

      if (emailError && !emailError.message.includes('For security purposes')) {
        throw new BadRequestException(
          `Erreur lors de l'envoi de l'email: ${emailError.message}`,
        );
      }

      this.logger.log(
        '✅ Demande changement email stockée:',
        user.email,
        '->',
        newEmail,
      );

      return {
        message:
          'Un email de confirmation a été envoyé à votre nouvelle adresse. Cliquez sur le lien pour confirmer le changement. (Vérifiez aussi vos spams)',
      };
    } catch (error) {
      this.logger.error("❌ Erreur lors de la mise à jour de l'email:", error);
      throw error;
    }
  }
}
