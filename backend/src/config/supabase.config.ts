import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    // Utiliser la clé service role si disponible (requise pour l'API admin)
    const supabaseKey =
      this.configService.get<string>('SUPABASE_SERVICE_KEY') ||
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY') ||
      this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration manquante');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  async signUp(email: string, password: string, metadata?: Record<string, unknown>) {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async signInWithPassword(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  async updatePassword(newPassword: string) {
    return await this.supabase.auth.updateUser({
      password: newPassword,
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  async getUser(accessToken: string) {
    return await this.supabase.auth.getUser(accessToken);
  }

  async refreshSession(refreshToken: string) {
    return await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
  }

  async resetPasswordForEmail(email: string) {
    return await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/reset-password`,
    });
  }

  async updateEmail(newEmail: string) {
    // Pour un appel côté service (service_role_key) sans session utilisateur, on doit utiliser l'API admin
    throw new Error(
      "Utilisez updateEmailById pour mettre à jour l'email via le service role",
    );
  }

  /**
   * Met à jour l'adresse e-mail d'un utilisateur via l'API admin (service role)
   * @param userId ID Supabase Auth de l'utilisateur
   * @param newEmail Nouvelle adresse e-mail
   */
  async updateEmailById(userId: string, newEmail: string) {
    // Mettre à jour l'email - Supabase devrait automatiquement envoyer l'email de confirmation
    return await this.supabase.auth.admin.updateUserById(userId, {
      email: newEmail,
      email_confirm: false, // Requiert confirmation par email
    });
  }

  async verifyOtp(params: {
    email: string;
    token: string;
    type: 'recovery' | 'email_change';
  }) {
    return await this.supabase.auth.verifyOtp({
      email: params.email,
      token: params.token,
      type: params.type,
    });
  }
}
