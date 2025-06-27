import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationState {
  email?: string;
  role?: string;
}

const EmailConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  const email = state?.email || '';
  const role = state?.role || '';

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleResendEmail = () => {
    // TODO: Implémenter la fonctionnalité de renvoi d'email
    console.log('Renvoyer email de confirmation');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Inscription réussie !
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Vérifiez votre boîte email pour activer votre compte
          </p>
        </div>

        <Card className="mt-8">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Email de confirmation envoyé
            </CardTitle>
            <CardDescription>
              Un email de confirmation a été envoyé à votre adresse
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {email && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Email envoyé à :</p>
                <p className="font-medium text-gray-900">{email}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <h3 className="font-medium text-gray-900 mb-2">Prochaines étapes :</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Vérifiez votre boîte email (y compris les spams)</li>
                  <li>Cliquez sur le lien de confirmation dans l'email</li>
                  <li>Vous serez redirigé vers votre tableau de bord</li>
                  <li>Votre compte sera alors activé et prêt à être utilisé</li>
                </ol>
              </div>

              {role && role !== 'student' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note :</strong> En tant que {role === 'training-org' ? 'organisme de formation' : 
                    role === 'manager' ? 'responsable d\'entreprise' : 'gestionnaire d\'aéroport'}, 
                    votre compte pourra nécessiter une validation supplémentaire par notre équipe.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
              >
                Renvoyer l'email de confirmation
              </Button>
              
              <Button
                onClick={handleBackToLogin}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la connexion
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Vous ne recevez pas l'email ? Vérifiez votre dossier spam ou contactez le support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation; 