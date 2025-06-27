import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  AlertTriangle,
  Eye
} from 'lucide-react';

const AirportRegistrationPending = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* En-tête de confirmation */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Demande de gestionnaire d'aéroport soumise !
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Votre demande de création de compte gestionnaire d'aéroport a été reçue et entre dans notre processus de validation renforcé.
            </p>
          </div>

          {/* Alerte spéciale aéroport */}
          <Alert className="mb-8 border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Validation renforcée :</strong> En tant que gestionnaire d'aéroport, votre demande nécessite une validation approfondie 
              pour garantir l'unicité et l'authenticité de votre statut. Ce processus peut prendre 7-10 jours ouvrés.
            </AlertDescription>
          </Alert>

          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Timeline du processus renforcé */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Processus de validation renforcé
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
                      <p className="text-sm text-green-700">Votre dossier gestionnaire a été reçu</p>
                      <Badge className="mt-2 bg-green-500">Terminé</Badge>
                    </div>
                  </div>
                  
                  {/* Étape 2 - En cours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white animate-spin" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-900">Vérification documentaire</h3>
                      <p className="text-sm text-yellow-700">Analyse approfondie des documents</p>
                      <Badge className="mt-2 bg-yellow-500">En cours - 3-5 jours</Badge>
                    </div>
                  </div>
                  
                  {/* Étape 3 - En attente */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700">Validation unicité aéroport</h3>
                      <p className="text-sm text-gray-600">Vérification qu'aucun autre gestionnaire n'existe</p>
                      <Badge variant="outline" className="mt-2">En attente - 2-3 jours</Badge>
                    </div>
                  </div>
                  
                  {/* Étape 4 - En attente */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700">Activation compte gestionnaire</h3>
                      <p className="text-sm text-gray-600">Finalisation et mise en service</p>
                      <Badge variant="outline" className="mt-2">En attente - 1-2 jours</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions disponibles */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Prochaines étapes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  
                  {/* Email de confirmation */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Email de confirmation</h4>
                      <p className="text-sm text-green-700">
                        Confirmation de réception avec numéro de dossier envoyée.
                      </p>
                    </div>
                  </div>
                  
                  {/* Délai de traitement */}
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Délai de traitement renforcé</h4>
                      <p className="text-sm text-yellow-700">
                        La validation complète prend 7-10 jours ouvrés pour les aéroports.
                      </p>
                    </div>
                  </div>
                  
                  {/* Validation spéciale */}
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">Validation d'unicité</h4>
                      <p className="text-sm text-orange-700">
                        Vérification qu'aucun autre gestionnaire n'existe pour votre aéroport.
                      </p>
                    </div>
                  </div>
                  
                  {/* Documents supplémentaires */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Documents additionnels</h4>
                      <p className="text-sm text-gray-700">
                        Nous vous contacterons si des justificatifs supplémentaires sont requis.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Spécificités aéroport */}
          <Card className="mt-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
              <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                Compte gestionnaire d'aéroport
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Supervision globale</h3>
                  <p className="text-gray-600 text-sm">
                    Visibilité sur toutes les entreprises et le personnel opérant sur votre site
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Conformité centralisée</h3>
                  <p className="text-gray-600 text-sm">
                    Suivi centralisé de la conformité formation de tous les intervenants
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rapports automatisés</h3>
                  <p className="text-gray-600 text-sm">
                    Génération automatique de rapports de conformité pour les autorités
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <Card className="mt-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
              <CardTitle className="text-xl text-center">
                Support dédié gestionnaires d'aéroport
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support prioritaire</h3>
                  <p className="text-gray-600 mb-4">
                    Ligne dédiée aux gestionnaires d'aéroport pour un support personnalisé
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/contact?type=airport">
                      Nous contacter
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Démonstration supervision</h3>
                  <p className="text-gray-600 mb-4">
                    Découvrez les fonctionnalités de supervision aéroportuaire
                  </p>
                  <Button asChild className="bg-green-600">
                    <Link to="/contact?subject=demo-airport">
                      Planifier une démo
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques aéroports */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-8 bg-white p-6 rounded-lg shadow">
              <div>
                <div className="text-2xl font-bold text-green-600">25+</div>
                <div className="text-sm text-gray-600">Aéroports partenaires</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Taux d'approbation</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-purple-600">48h</div>
                <div className="text-sm text-gray-600">Temps de réponse max</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-gray-600">Gestionnaire par aéroport</div>
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

export default AirportRegistrationPending; 