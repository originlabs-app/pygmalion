import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Mail, 
  Building2,
  FileText,
  Shield,
  ArrowRight,
  Phone,
  Calendar
} from 'lucide-react';

const RegistrationPending = () => {
  const nextSteps = [
    {
      number: "01",
      title: "Réception confirmée",
      description: "Votre dossier est reçu et en cours de traitement",
      status: "completed",
      duration: "Immédiat",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      number: "02",
      title: "Analyse en cours",
      description: "Notre équipe vérifie vos documents et votre expertise aviation",
      status: "in-progress",
      duration: "3-5 jours",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      number: "03",
      title: "Validation finale",
      description: "Décision finale et notification avec accès à la plateforme",
      status: "pending",
      duration: "1-2 jours",
      icon: Shield,
      color: "text-gray-400"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête de confirmation */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Candidature soumise avec succès !
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Votre demande de partenariat en tant qu'organisme de formation 
              a été reçue et est en cours de traitement par notre équipe.
            </p>
          </div>

          {/* Information principale */}
          <Card className="mb-12 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                <Building2 className="h-6 w-6" />
                Processus de validation KYB
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              
              {/* Processus de validation */}
              <div className="space-y-8">
                {nextSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          step.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : step.status === 'in-progress'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                          {step.status === 'completed' && (
                            <Badge className="bg-green-100 text-green-800">Terminé</Badge>
                          )}
                          {step.status === 'in-progress' && (
                            <Badge className="bg-blue-100 text-blue-800">En cours</Badge>
                          )}
                          {step.status === 'pending' && (
                            <Badge variant="secondary">En attente</Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-2">{step.description}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>Durée estimée : {step.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informations importantes */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Prochaines étapes
                  </h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Vous recevrez un email de confirmation dans les 24h</li>
                    <li>• Notre équipe analysera votre dossier sous 3-5 jours ouvrés</li>
                    <li>• En cas de validation, vous recevrez vos accès à la plateforme</li>
                    <li>• Si des documents sont manquants, nous vous recontacterons</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions disponibles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Notre équipe est disponible pour répondre à vos questions
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/contact">
                        Nous contacter
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Programmer une démo</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Découvrez en avant-première les fonctionnalités de PYGMALION
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/contact">
                        Réserver un créneau
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations de contact */}
          <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Restez informé de l'avancement
              </h3>
              <p className="text-gray-600 mb-6">
                Nous vous tiendrons informé par email à chaque étape du processus de validation.
                En attendant, vous pouvez consulter notre documentation pour préparer votre intégration.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/for-training-organizations">
                    <Building2 className="h-4 w-4 mr-2" />
                    En savoir plus sur PYGMALION
                  </Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/">
                    Retour à l'accueil
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques rassurantes */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Ils nous font confiance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">24-48h</div>
                <div className="text-sm text-gray-600">Temps de réponse</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">Taux d'approbation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">5-10</div>
                <div className="text-sm text-gray-600">Partenaires MVP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">400+</div>
                <div className="text-sm text-gray-600">Apprenants ciblés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPending; 