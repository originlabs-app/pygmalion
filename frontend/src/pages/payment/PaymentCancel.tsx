
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Paiement annulé</h1>
          <p className="text-muted-foreground">
            Votre paiement a été annulé. Aucun montant n'a été débité.
          </p>
        </div>

        <div className="space-y-6">
          {/* Informations */}
          <Card>
            <CardHeader>
              <CardTitle>Que s'est-il passé ?</CardTitle>
              <CardDescription>Votre transaction a été interrompue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Le processus de paiement a été annulé avant sa finalisation. 
                Cela peut arriver pour plusieurs raisons :
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Vous avez cliqué sur "Retour" pendant le processus</li>
                <li>• La session a expiré</li>
                <li>• Une erreur technique s'est produite</li>
                <li>• Vous avez fermé la fenêtre de paiement</li>
              </ul>
            </CardContent>
          </Card>

          {/* Options disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Que faire maintenant ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Réessayer le paiement</h4>
                    <p className="text-sm text-muted-foreground">
                      Retournez à la formation et relancez le processus d'inscription.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ArrowLeft className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Continuer votre navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Explorez d'autres formations ou revenez plus tard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact support */}
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h4 className="font-semibold text-sm mb-2">Besoin d'aide ?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Si vous rencontrez des difficultés ou avez des questions sur le processus de paiement, 
                  notre équipe support est là pour vous aider.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact">Contacter le support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(-2)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la formation
            </Button>
            <Button asChild className="flex-1">
              <Link to="/courses">Voir d'autres formations</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentCancel;
