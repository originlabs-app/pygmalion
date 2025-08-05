import React, { useEffect, useState } from 'react';
import logger from '@/services/logger.service';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthStorage } from '@/utils/auth-storage';
import { apiClient } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Extraire les tokens depuis l'URL hash
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const expiresIn = hashParams.get('expires_in');
        const type = hashParams.get('type');

        logger.info('🔍 Traitement du callback auth:', { type, hasAccessToken: !!accessToken });

        // Vérifier les erreurs dans l'URL
        const error = hashParams.get('error');
        const errorCode = hashParams.get('error_code');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          logger.error('❌ Erreur dans le callback:', { error, errorCode, errorDescription });
          
          if (errorCode === 'otp_expired') {
            toast.error('Le lien de confirmation a expiré. Veuillez demander un nouveau lien.');
          } else {
            toast.error(`Erreur de confirmation : ${errorDescription || error}`);
          }
          
          navigate('/profile', { replace: true });
          return;
        }

        if (!accessToken) {
          throw new Error('Token d\'authentification manquant');
        }

        // Gérer différents types d'événements
        if (type === 'signup') {
          // Inscription - vérification du compte
          try {
            // Configurer temporairement le token pour faire l'appel
            const tempClient = apiClient;
            tempClient.setAuthTokens({ 
              access_token: accessToken, 
              refresh_token: refreshToken || undefined 
            });

            // Récupérer les données utilisateur depuis notre backend
            const userResponse = await tempClient.get('/auth/me');
            const user = userResponse.data;

            logger.info('✅ Utilisateur récupéré:', user);

            navigate('/email-verified', {
              replace: true,
              state: {
                firstName: user.firstName,
                role: user.role,
              },
            });

          } catch (apiError) {
            logger.error('❌ Erreur lors de la vérification du token:', apiError);
            throw new Error('Impossible de vérifier votre compte. Veuillez vous connecter manuellement.');
          }
          
        } else if (type === 'email_change') {
          // Changement d'email - synchronisation avec notre backend
          logger.info('✅ Changement d\'email confirmé');
          toast.success('Votre adresse email a été mise à jour avec succès !');
          
          // Rafraîchir les données utilisateur si connecté
          try {
            await refreshUser();
          } catch (error) {
            logger.info('⚠️ Impossible de rafraîchir les données utilisateur');
          }
          
          navigate('/profile?tab=security', { replace: true });
          
        } else {
          logger.info('⚠️ Type de callback non géré:', type);
          toast.info('Confirmation reçue. Vous pouvez vous connecter.');
          navigate('/login', { replace: true });
        }

      } catch (error: unknown) {
        logger.error('❌ Erreur lors du traitement du callback:', error);
        toast.error(error.message || 'Erreur lors du traitement de la confirmation');
        
        // Rediriger vers la page de connexion en cas d'erreur
        navigate('/login', { 
          replace: true,
          state: { 
            message: 'Une erreur est survenue. Veuillez vous connecter.' 
          }
        });
      } finally {
        setIsProcessing(false);
      }
    };

    // Vérifier si nous avons des paramètres dans l'URL
    if (location.hash && (location.hash.includes('access_token') || location.hash.includes('error'))) {
      handleAuthCallback();
    } else {
      // Pas de tokens, rediriger vers l'accueil
      logger.info('⚠️ Aucun paramètre trouvé, redirection vers l\'accueil');
      navigate('/', { replace: true });
    }
  }, [location.hash, navigate, refreshUser]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              Traitement de votre demande...
            </h2>
            <p className="text-gray-600">
              Nous finalisons les modifications de votre compte.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback; 