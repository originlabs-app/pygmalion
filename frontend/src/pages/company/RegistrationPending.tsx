import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield,
  Mail,
  Phone,
  Calendar,
  Building,
  Users,
  ArrowRight
} from 'lucide-react';

const CompanyRegistrationPending = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête de confirmation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Demande d'inscription soumise !
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Votre demande de création de compte entreprise a été reçue et est en cours de traitement.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Timeline du processus */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Processus de validation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  
                  {/* Étape 1 - Terminée */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">Réception de votre demande</h3>
                      <p className="text-sm text-green-700">Votre dossier a été reçu avec succès</p>
                      <Badge className="mt-2 bg-green-500">Terminé</Badge>
                    </div>
                  </div>
                  
                  {/* Étape 2 - En cours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-900">Analyse des documents</h3>
                      <p className="text-sm text-yellow-700">Vérification KYB en cours</p>
                      <Badge className="mt-2 bg-yellow-500">En cours - 2-3 jours</Badge>
                    </div>
                  </div>
                  
                  {/* Étape 3 - En attente */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700">Validation et activation</h3>
                      <p className="text-sm text-gray-600">Finalisation de votre compte</p>
                      <Badge variant="outline" className="mt-2">En attente - 1-2 jours</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions disponibles */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Prochaines étapes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  
                  {/* Email de confirmation */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Email de confirmation</h4>
                      <p className="text-sm text-blue-700">
                        Vous allez recevoir un email avec les détails de votre demande.
                      </p>
                    </div>
                  </div>
                  
                  {/* Délai de traitement */}
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Délai de traitement</h4>
                      <p className="text-sm text-yellow-700">
                        La validation prend généralement 3-5 jours ouvrés.
                      </p>
                    </div>
                  </div>
                  
                  {/* Documents supplémentaires */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Documents supplémentaires</h4>
                      <p className="text-sm text-gray-700">
                        Nous vous contacterons si des documents additionnels sont nécessaires.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations de contact */}
          <Card className="mt-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-xl text-center">
                Besoin d'aide ?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support téléphonique</h3>
                  <p className="text-gray-600 mb-4">
                    Nos équipes sont disponibles pour répondre à vos questions
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      Nous contacter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Démonstration produit</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez PYGMALION en attendant l'activation de votre compte
                  </p>
                  <Button asChild className="bg-blue-600">
                    <Link to="/contact?subject=demo">
                      Planifier une démo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques encourageantes */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-8 bg-white p-6 rounded-lg shadow">
              <div>
                <div className="text-2xl font-bold text-blue-600">150+</div>
                <div className="text-sm text-gray-600">Entreprises partenaires</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Taux d'approbation</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-purple-600">24h</div>
                <div className="text-sm text-gray-600">Temps de réponse moyen</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyRegistrationPending; 