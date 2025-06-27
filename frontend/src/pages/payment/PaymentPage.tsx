
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';

const PaymentPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getCourse } = useCourses();
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    // Mock session data - en production ceci viendrait de l'API
    if (sessionId) {
      const mockSession = {
        id: sessionId,
        courseId: '1',
        courseName: 'Sécurité Aéroportuaire - Formation Initiale',
        sessionDate: '2025-06-15',
        price: 799,
        duration: '3 jours',
        location: 'Paris CDG',
        instructor: 'Jean Dubois'
      };
      setSessionData(mockSession);
    }
  }, [sessionId]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulation d'appel Stripe
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirection vers Stripe (simulé)
      navigate('/payment/success?session_id=' + sessionId);
    } catch (error) {
      console.error('Erreur de paiement:', error);
      navigate('/payment/cancel');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground">Veuillez vous connecter pour accéder à cette page.</p>
        </div>
      </Layout>
    );
  }

  if (!sessionData) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Chargement des informations de paiement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Finaliser votre inscription</h1>
          <p className="text-muted-foreground">Vérifiez les détails et procédez au paiement sécurisé</p>
        </div>

        <div className="space-y-6">
          {/* Récapitulatif de la commande */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Récapitulatif de votre commande
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{sessionData.courseName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Session du {new Date(sessionData.sessionDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="text-right md:text-right">
                  <p className="text-2xl font-bold text-primary">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(sessionData.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">TTC</p>
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Durée :</span>
                  <span>{sessionData.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lieu :</span>
                  <span>{sessionData.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Formateur :</span>
                  <span>{sessionData.instructor}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations de sécurité */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Paiement sécurisé</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vos données de paiement sont protégées par le chiffrement SSL et traitées par Stripe, 
                    leader mondial des paiements en ligne.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(-1)}
            >
              Retour
            </Button>
            <Button
              className="flex-1"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Redirection...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Payer maintenant
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            En procédant au paiement, vous acceptez nos conditions générales de vente
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
