
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar, Mail } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [enrollmentData, setEnrollmentData] = useState<any>(null);

  useEffect(() => {
    // Mock enrollment data - en production ceci viendrait de l'API
    const mockEnrollment = {
      id: 'ENR-2025-001',
      courseTitle: 'Sécurité Aéroportuaire - Formation Initiale',
      sessionDate: '2025-06-15',
      amount: 799,
      instructor: 'Jean Dubois',
      location: 'Paris CDG',
      duration: '3 jours',
      lmsAccess: true,
      confirmationSent: true
    };
    setEnrollmentData(mockEnrollment);
  }, [sessionId]);

  if (!enrollmentData) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-green-600 mb-2">Paiement réussi !</h1>
          <p className="text-muted-foreground">
            Votre inscription a été confirmée et vous allez recevoir un email de confirmation.
          </p>
        </div>

        <div className="space-y-6">
          {/* Détails de l'inscription */}
          <Card>
            <CardHeader>
              <CardTitle>Détails de votre inscription</CardTitle>
              <CardDescription>Numéro de confirmation : {enrollmentData.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{enrollmentData.courseTitle}</h3>
                <p className="text-sm text-muted-foreground">
                  Session du {new Date(enrollmentData.sessionDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Formateur :</span>
                    <span>{enrollmentData.instructor}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lieu :</span>
                    <span>{enrollmentData.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Durée :</span>
                    <span>{enrollmentData.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Montant payé :</span>
                    <span className="font-semibold">
                      {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(enrollmentData.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prochaines étapes */}
          <Card>
            <CardHeader>
              <CardTitle>Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Email de confirmation envoyé</h4>
                  <p className="text-sm text-muted-foreground">
                    Vérifiez votre boîte mail pour les détails complets et les instructions.
                  </p>
                </div>
              </div>
              
              {enrollmentData.lmsAccess && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Accès à la formation</h4>
                    <p className="text-sm text-muted-foreground">
                      Vous pouvez accéder aux ressources de formation dans votre tableau de bord.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Documents de formation</h4>
                  <p className="text-sm text-muted-foreground">
                    Les supports de cours seront disponibles 48h avant le début de la session.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/courses">Voir d'autres formations</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/student-dashboard">Accéder à mon tableau de bord</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
