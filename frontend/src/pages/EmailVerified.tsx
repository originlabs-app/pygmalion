import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface LocationState {
  firstName?: string;
  role?: string;
}

const EmailVerified: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const firstName = state?.firstName || '';

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {firstName ? `Bravo ${firstName} !` : 'Votre adresse e-mail est confirmée !'}
          </h2>
          <p className="mt-2 text-gray-600">
            Votre compte est maintenant activé. Vous pouvez vous connecter pour accéder à votre tableau de bord.
          </p>
          <Button onClick={handleLogin} className="mt-6 w-full">
            Se connecter
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerified; 