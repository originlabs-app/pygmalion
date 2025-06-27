import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Service Supabase côté frontend pour la gestion des mots de passe
 */
export class SupabaseAuthService {
  /**
   * Demande de réinitialisation de mot de passe
   */
  static async resetPasswordForEmail(email: string): Promise<{ message: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        // Gestion spécifique des erreurs de rate limiting
        if (error.message.includes('For security purposes')) {
          throw new Error('Trop de demandes de réinitialisation. Veuillez attendre avant de réessayer.');
        }
        throw new Error(error.message);
      }

      return {
        message: 'Si cette adresse email est associée à un compte, vous recevrez un lien de réinitialisation.'
      };
    } catch (error: any) {
      console.error('❌ Erreur resetPasswordForEmail:', error);
      
      // Si c'est déjà notre message personnalisé, on le garde
      if (error.message.includes('Trop de demandes')) {
        throw error;
      }
      
      throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
  }

  /**
   * Mise à jour du mot de passe (utilisé dans le contexte d'une session active après reset)
   */
  static async updatePassword(newPassword: string): Promise<{ message: string }> {
    try {
      // Vérifier qu'une session est active
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('❌ Aucune session active pour le reset password:', sessionError);
        throw new Error('Session expirée. Veuillez demander un nouveau lien de réinitialisation.');
      }

      console.log('✅ Session active détectée pour reset password');

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.'
      };
    } catch (error: any) {
      console.error('❌ Erreur updatePassword:', error);
      
      if (error.message.includes('Session expirée')) {
        throw error;
      }
      
      throw new Error('Erreur lors de la mise à jour du mot de passe');
    }
  }

  /**
   * Mise à jour de l'adresse email
   */
  static async updateEmail(newEmail: string): Promise<{ message: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        throw new Error(error.message);
      }

      return {
        message: 'Adresse email mise à jour avec succès. Un email de confirmation a été envoyé à votre nouvelle adresse.'
      };
    } catch (error: any) {
      console.error('❌ Erreur updateEmail:', error);
      throw new Error('Erreur lors de la mise à jour de l\'adresse email');
    }
  }

  /**
   * Établir une session avec les tokens (pour reset password)
   */
  static async setSession(accessToken: string, refreshToken: string) {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log('✅ Session établie avec les tokens');
      return data.session;
    } catch (error: any) {
      console.error('❌ Erreur setSession:', error);
      return null;
    }
  }

  /**
   * Obtenir la session active
   */
  static async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      return session;
    } catch (error: any) {
      console.error('❌ Erreur getSession:', error);
      return null;
    }
  }

  /**
   * Écouter les changements d'authentification
   */
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
} 