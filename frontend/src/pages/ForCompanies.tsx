import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Building, 
  Users, 
  BarChart3, 
  Shield, 
  DollarSign,
  AlertTriangle,
  Calendar,
  Award,
  CheckCircle,
  FileText,
  Target,
  TrendingUp,
  Phone,
  Clock,
  Plane,
  Eye,
  Settings,
  BookOpen,
  Bell
} from 'lucide-react';

const ForCompanies = () => {
  const businessAdvantages = [
    {
      icon: BarChart3,
      title: "Tableau de Bord Centralisé",
      description: "Pilotez vos équipes avec des statistiques en temps réel : % d'effectifs formés, planning formations, alertes conformité",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Gestion d'Équipes Complète",
      description: "Gérez vos apprenants, assignez des formations, suivez les progressions et organisez vos services",
      color: "bg-green-500"
    },
    {
      icon: DollarSign,
      title: "Contrôle Budgétaire Avancé",
      description: "Allouez des budgets par manager, suivez les dépenses formation et optimisez vos investissements",
      color: "bg-purple-500"
    },
    {
      icon: AlertTriangle,
      title: "Alertes Conformité",
      description: "Anticipez les échéances de formation, recevez des alertes automatiques et maintenez votre conformité",
      color: "bg-orange-500"
    },
    {
      icon: FileText,
      title: "Rapports Automatisés",
      description: "Générez des rapports détaillés, téléchargez les certificats et suivez les performances globales",
      color: "bg-teal-500"
    },
    {
      icon: Shield,
      title: "Sécurité & Conformité",
      description: "Respectez les réglementations IATA et aéroportuaires avec notre système de suivi intégré",
      color: "bg-red-500"
    }
  ];

  const companyTypes = [
    {
      title: "Compagnies Aériennes",
      description: "Formez vos équipages, personnel au sol et maintenance selon les standards IATA",
      features: ["Formation équipages", "Maintenance aéronautique", "Opérations au sol", "Sécurité aviation"],
      icon: Plane,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Gestionnaires d'Aéroports",
      description: "Supervisez la formation de tous les intervenants sur votre plateforme aéroportuaire",
      features: ["Vue globale site", "Contrôle prestataires", "Rapports qualité", "Conformité sécurité"],
      icon: Building,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Prestataires Aéroportuaires",
      description: "Assurez la formation de vos équipes intervenant sur les sites aéroportuaires",
      features: ["Formation handling", "Sécurité sûreté", "Maintenance GSE", "Services passagers"],
      icon: Users,
      gradient: "from-green-500 to-green-600"
    }
  ];

  const managementLevels = [
    {
      level: "Manager d'Équipe",
      description: "Planificateur de formations pour son service ou équipe",
      responsibilities: [
        "Gestion directe des apprenants",
        "Attribution de formations",
        "Suivi progression équipe",
        "Gestion budget alloué"
      ],
      icon: Target
    },
    {
      level: "Superviseur Entreprise", 
      description: "Gestionnaire général au-dessus des managers",
      responsibilities: [
        "Contrôle budgets globaux",
        "Dispatch budgets aux managers",
        "Reporting stratégique",
        "Relations institutionnelles"
      ],
      icon: Eye
    },
    {
      level: "Gestionnaire Aéroport",
      description: "Supervision de l'ensemble du site d'exploitation",
      responsibilities: [
        "Vue temps réel site complet",
        "Contrôle tous prestataires",
        "Rapports qualité globaux",
        "Notation aéroport"
      ],
      icon: Settings
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Inscription & Configuration",
      description: "Créez votre compte entreprise et configurez votre organisation avec vos différents services",
      icon: Building,
      color: "bg-blue-500"
    },
    {
      number: "02",
      title: "Import & Affiliation",
      description: "Importez vos équipes via Excel et affiliez vos apprenants à votre organisation",
      icon: Users,
      color: "bg-green-500"
    },
    {
      number: "03",
      title: "Assignation & Suivi",
      description: "Assignez des formations à vos équipes et suivez leur progression en temps réel",
      icon: Calendar,
      color: "bg-purple-500"
    },
    {
      number: "04",
      title: "Pilotage & Conformité",
      description: "Pilotez vos budgets, recevez des alertes et maintenez la conformité de vos équipes",
      icon: BarChart3,
      color: "bg-orange-500"
    }
  ];

  const features = [
    {
      title: "Marketplace Intégrée",
      description: "Accès complet à toutes les formations PYGMALION avec tarifs négociés entreprise",
      preview: "🛒 Catalogue dédié",
      icon: BookOpen
    },
    {
      title: "Gestion Budgétaire",
      description: "Allocation de budgets par manager, suivi en temps réel et optimisation des coûts formation",
      preview: "💰 Contrôle financier",
      icon: DollarSign
    },
    {
      title: "Alertes Intelligentes",
      description: "Notifications automatiques d'échéances, risques conformité et nouvelles formations disponibles",
      preview: "🔔 Anticipation proactive",
      icon: Bell
    },
    {
      title: "Rapports Avancés",
      description: "Analytics détaillées, exports personnalisés et tableaux de bord managériaux",
      preview: "📊 Intelligence business",
      icon: BarChart3
    }
  ];

  const testimonials = [
    {
      company: "Air France",
      manager: "Jean-Pierre Dubois",
      position: "Directeur Formation",
      employees: 850,
      savings: "-35%",
      quote: "PYGMALION nous a permis de centraliser toute notre gestion formation. Les alertes automatiques nous font gagner un temps précieux.",
      avatar: "JP",
      sector: "Compagnie Aérienne"
    },
    {
      company: "Aéroports de Paris",
      manager: "Marie Lefebvre", 
      position: "Responsable RH",
      employees: 1200,
      savings: "-40%",
      quote: "La vision globale de la conformité sur nos sites est révolutionnaire. Nous anticipons maintenant tous les risques.",
      avatar: "ML",
      sector: "Gestionnaire Aéroport"
    },
    {
      company: "Swissport France",
      manager: "Thomas Martin",
      position: "Manager Opérations",
      employees: 650,
      savings: "-25%",
      quote: "L'interface manager nous permet de piloter nos équipes efficacement. Les budgets sont enfin maîtrisés.",
      avatar: "TM",
      sector: "Prestataire Handling"
    }
  ];

  return (
    <Layout>
      {/* Hero Section Business */}
      <section className="relative bg-gradient-to-r from-slate-800 via-blue-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
          {/* Pattern décoratif */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-32 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu gauche */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Building className="h-4 w-4" />
                  Solutions Entreprises
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Pilotez la Formation
                  <span className="block text-blue-300">de vos Équipes</span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Centralisez la gestion formation de votre organisation aéronautique. 
                  Tableau de bord unifié, budgets maîtrisés, conformité garantie.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-800 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/register/company">
                    <Building className="mr-2 h-5 w-5" />
                    Créer mon compte entreprise
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-3 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">
                    <Phone className="mr-2 h-5 w-5" />
                    Demander une démo
                  </Link>
                </Button>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">850+</div>
                  <div className="text-sm text-blue-200">Entreprises</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">-35%</div>
                  <div className="text-sm text-blue-200">Coûts formation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-blue-200">Monitoring</div>
                </div>
              </div>
            </div>

            {/* Visuel droite */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/images/placeholder-formation-pilote.jpg" 
                  alt="Managers pilotant leurs équipes formation"
                  className="w-full h-auto max-w-2xl rounded-2xl shadow-2xl"
                />
                
                {/* Badges flottants */}
                <div className="absolute -top-6 -left-6 bg-green-500 rounded-xl p-4 shadow-xl">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -top-6 -right-6 bg-purple-500 rounded-xl p-4 shadow-xl">
                  <Users className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-500 rounded-xl p-4 shadow-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Cards info flottantes */}
              <div className="absolute -top-16 left-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Équipe conforme</p>
                <p className="text-xs text-gray-600">98% à jour ✓</p>
              </div>
              
              <div className="absolute -bottom-16 right-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Budget maîtrisé</p>
                <p className="text-xs text-gray-600">-35% économies</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Types d'entreprises */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Toutes les Entreprises Aviation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Que vous soyez compagnie aérienne, gestionnaire d'aéroport ou prestataire, 
              PYGMALION s'adapte à vos besoins spécifiques.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {companyTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="relative overflow-hidden h-full group hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{type.title}</CardTitle>
                    <p className="text-gray-600">{type.description}</p>
                  </CardHeader>
                  <CardContent className="relative space-y-3">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages Business */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Avantages pour votre Entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tous les outils nécessaires pour optimiser la formation de vos équipes 
              et maintenir la conformité réglementaire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {businessAdvantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${advantage.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Niveaux de management */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Adapté à votre Organisation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Différents niveaux d'accès selon votre rôle dans l'organisation. 
              Du manager d'équipe au gestionnaire d'aéroport.
            </p>
          </div>

          <div className="space-y-8">
            {managementLevels.map((level, index) => {
              const IconComponent = level.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Contenu */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{level.level}</h3>
                        <p className="text-gray-600">{level.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {level.responsibilities.map((resp, respIndex) => (
                        <div key={respIndex} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visuel */}
                  <div className="flex-1">
                    <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2">
                      <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <IconComponent className="h-16 w-16 mx-auto text-gray-400" />
                          <div className="text-sm text-gray-500">Interface {level.level}</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus d'onboarding */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Déployement en 4 Étapes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mise en place rapide et accompagnement personnalisé pour optimiser 
              la gestion formation de votre organisation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative text-center">
                  {/* Connecteur */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-full mb-6`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 mb-2">{step.number}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fonctionnalités détaillées */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Fonctionnalités Entreprise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une suite complète d'outils pour piloter, optimiser et sécuriser 
              la formation de vos équipes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-blue-100 group-hover:bg-blue-200 transition-colors p-3 rounded-xl">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {feature.preview}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages entreprises */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Ils Nous Font Confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nos clients entreprises ont optimisé leur 
              gestion formation avec PYGMALION.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.manager}</div>
                        <div className="text-sm text-gray-600">{testimonial.position}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{testimonial.sector}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{testimonial.employees}</div>
                      <div className="text-xs text-gray-600">Employés</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{testimonial.savings}</div>
                      <div className="text-xs text-gray-600">Économies</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                    {testimonial.company}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-8 bg-blue-600">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Optimisez votre Gestion Formation
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Rejoignez les entreprises leaders du secteur aéronautique qui ont choisi 
                PYGMALION pour piloter efficacement leurs équipes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/register/company">
                  <Building className="mr-2 h-5 w-5" />
                  Créer mon compte entreprise
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-3 border-white text-white bg-white/15 backdrop-blur-sm hover:bg-white hover:text-blue-600 px-10 py-5 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Demander une démo
                </Link>
              </Button>
            </div>

            {/* Garanties Business */}
            <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Conformité Garantie</div>
                <div className="text-blue-100 text-sm">Respect des réglementations IATA</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">ROI Mesurable</div>
                <div className="text-blue-100 text-sm">Jusqu'à -35% de coûts formation</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Support Dédié</div>
                <div className="text-blue-100 text-sm">Accompagnement et formation équipes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ForCompanies; 