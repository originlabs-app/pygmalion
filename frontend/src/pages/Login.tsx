import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowRight,
  Shield,
  Plane,
  CheckCircle,
  Sparkles,
  Users,
  Building,
  GraduationCap,
  Building2
} from 'lucide-react';

const Login = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* En-tête principal */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Connexion Sécurisée
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Bienvenue sur <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PYGMALION</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              La plateforme de formation aéronautique de référence. Connectez-vous pour accéder à votre espace personnalisé.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            
            {/* Formulaire de connexion principal */}
            <div className="xl:col-span-2">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                    <Shield className="h-6 w-6" />
                    Connexion à votre compte
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  
                  {/* Formulaire de connexion */}
                  <div className="space-y-6">
                    <LoginForm />
                    
                    {/* Lien mot de passe oublié */}
                    <div className="text-center">
                      <Link 
                        to="/forgot-password" 
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 relative group inline-block"
                      >
                        Mot de passe oublié ?
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                      </Link>
                    </div>
                  </div>

                  {/* Section Nouveau utilisateur */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-blue-100">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        Nouveau sur PYGMALION ?
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Rejoignez notre communauté de professionnels de l'aéronautique et accédez à des formations certifiantes de qualité.
                      </p>
                      
                      {/* Types d'utilisateurs avec liens vers inscription */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <Link 
                          to="/register/learner"
                          className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 hover:-translate-y-1"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                              <GraduationCap className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-800">
                              Apprenant
                            </span>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/register/company"
                          className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:-translate-y-1"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                              <Building className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800">
                              Entreprise
                            </span>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/register/airport"
                          className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 hover:-translate-y-1"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                              <Plane className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-800">
                              Aéroport
                            </span>
                          </div>
                        </Link>
                        
                        <Link 
                          to="/for-training-organizations/register"
                          className="group p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 hover:-translate-y-1"
                        >
                          <div className="flex flex-col items-center gap-2">
                            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                              <Building2 className="h-5 w-5 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-800">
                              Organisme
                            </span>
                          </div>
                        </Link>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button variant="outline" asChild className="px-6 py-3 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                          <Link to="/for-learners">
                            En savoir plus
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar informations */}
            <div className="space-y-6">
              
              {/* Avantages PYGMALION */}
              <Card className="shadow-lg bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Pourquoi PYGMALION ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">Certifications tokenisées</p>
                        <p className="text-sm text-gray-600">Blockchain et sécurité maximale</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">LMS sécurisé intégré</p>
                        <p className="text-sm text-gray-600">Biométrie et anti-fraude</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">Conformité automatisée</p>
                        <p className="text-sm text-gray-600">Alertes et anticipation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">Écosystème intégré</p>
                        <p className="text-sm text-gray-600">Marketplace + LMS + Supervision</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      <CheckCircle className="h-4 w-4" />
                      PYGMALION en chiffres
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">400+</div>
                        <div className="text-xs text-gray-600">Apprenants actifs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">25+</div>
                        <div className="text-xs text-gray-600">Aéroports partenaires</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">50+</div>
                        <div className="text-xs text-gray-600">Organismes de formation</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">98%</div>
                        <div className="text-xs text-gray-600">Taux de satisfaction</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="shadow-lg bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-2xl mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Besoin d'aide ?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Notre équipe support est disponible pour vous accompagner
                    </p>
                    <Button asChild variant="outline" className="w-full px-4 py-2 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300">
                      <Link to="/contact">
                        Nous contacter
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer avec liens utiles */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow border border-gray-100">
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 relative group">
                Besoin d'aide ?
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <div className="w-px h-4 bg-gray-300"></div>
              <Link to="/style-design" className="text-gray-600 hover:text-gray-700 text-sm transition-colors duration-200 relative group">
                Guide du design
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <div className="w-px h-4 bg-gray-300"></div>
              <Link to="/courses" className="text-gray-600 hover:text-gray-700 text-sm transition-colors duration-200 relative group">
                Catalogue formations
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
