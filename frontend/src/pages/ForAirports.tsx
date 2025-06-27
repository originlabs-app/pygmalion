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
  Bell,
  Radar,
  Search,
  Download,
  UserCheck,
  Building2,
  Zap,
  MapPin,
  Globe,
  Activity
} from 'lucide-react';

const ForAirports = () => {
  const airportChallenges = [
    {
      icon: Users,
      title: "Multiples Prestataires",
      description: "Coordonner la formation de dizaines d'entreprises différentes sur votre site",
      color: "bg-orange-500"
    },
    {
      icon: Shield,
      title: "Sûreté & Sécurité",
      description: "Garantir la conformité de tous les intervenants aux standards aéroportuaires",
      color: "bg-red-500"
    },
    {
      icon: Clock,
      title: "Surveillance Continue",
      description: "Monitorer en temps réel les échéances de formation de centaines d'employés",
      color: "bg-blue-500"
    },
    {
      icon: FileText,
      title: "Reporting Complexe",
      description: "Générer des rapports de conformité détaillés pour les autorités",
      color: "bg-purple-500"
    },
    {
      icon: AlertTriangle,
      title: "Gestion des Risques",
      description: "Anticiper et prévenir les défaillances de formation avant qu'elles n'impactent l'exploitation",
      color: "bg-yellow-500"
    },
    {
      icon: Settings,
      title: "Coordination Opérationnelle",
      description: "Aligner tous les acteurs sur les mêmes standards de formation",
      color: "bg-green-500"
    }
  ];

  const platformFeatures = [
    {
      icon: Radar,
      title: "Vue 360° Temps Réel",
      description: "Tableau de bord unifié de tous les prestataires et leur niveau de conformité formation",
      preview: "🎯 Monitoring global",
      color: "bg-blue-500"
    },
    {
      icon: UserCheck,
      title: "Conformité par Entreprise",
      description: "Suivi détaillé du pourcentage de conformité de chaque société présente sur votre site",
      preview: "📊 Statistiques anonymisées",
      color: "bg-green-500"
    },
    {
      icon: Bell,
      title: "Alertes Proactives",
      description: "Notifications automatiques en cas de risque de non-conformité d'un prestataire",
      preview: "🔔 Anticipation des risques",
      color: "bg-orange-500"
    },
    {
      icon: Download,
      title: "Rapports Automatisés",
      description: "Génération de rapports de conformité pour les autorités et audits réglementaires",
      preview: "📋 Export sur mesure",
      color: "bg-purple-500"
    }
  ];

  const contractorTypes = [
    {
      title: "Compagnies Aériennes",
      description: "Équipages, personnel au sol, maintenance",
      compliance: "98%",
      employees: "2,500+",
      icon: Plane,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Services de Handling",
      description: "Bagages, fret, assistance passagers",
      compliance: "95%",
      employees: "1,800+",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Sécurité & Sûreté",
      description: "Contrôle accès, surveillance, inspection",
      compliance: "99%",
      employees: "650+",
      icon: Shield,
      color: "from-red-500 to-red-600"
    },
    {
      title: "Maintenance & Technique",
      description: "Infrastructure, équipements, installations",
      compliance: "97%",
      employees: "450+",
      icon: Settings,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Services Commerciaux",
      description: "Boutiques, restauration, services aux passagers",
      compliance: "92%",
      employees: "1,200+",
      icon: Building2,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Prestataires Logistiques",
      description: "Transport, nettoyage, approvisionnement",
      compliance: "94%",
      employees: "800+",
      icon: Globe,
      color: "from-teal-500 to-teal-600"
    }
  ];

  const supervisionProcess = [
    {
      number: "01",
      title: "Affiliation des Prestataires",
      description: "Chaque entreprise opérant sur votre site s'affilie à votre plateforme aéroportuaire",
      icon: Building,
      color: "bg-blue-500"
    },
    {
      number: "02", 
      title: "Monitoring Automatique",
      description: "Surveillance continue et automatique des niveaux de conformité de tous les prestataires",
      icon: Activity,
      color: "bg-green-500"
    },
    {
      number: "03",
      title: "Alertes & Rapports",
      description: "Réception d'alertes proactives et génération de rapports détaillés pour vos équipes",
      icon: Bell,
      color: "bg-orange-500"
    },
    {
      number: "04",
      title: "Actions Correctives",
      description: "Coordination avec les prestataires pour résoudre rapidement les non-conformités",
      icon: Target,
      color: "bg-purple-500"
    }
  ];

  const dashboardFeatures = [
    {
      title: "Vue d'Ensemble Site",
      description: "Niveau de conformité global de votre aéroport en temps réel",
      metric: "96.5%",
      trend: "+2.1%",
      color: "bg-blue-500"
    },
    {
      title: "Prestataires Actifs",
      description: "Nombre d'entreprises supervisées sur votre plateforme",
      metric: "47",
      trend: "+3",
      color: "bg-green-500"
    },
    {
      title: "Employés Monitorés",
      description: "Total des personnels suivis pour la conformité formation",
      metric: "8,400+",
      trend: "+12%",
      color: "bg-purple-500"
    },
    {
      title: "Alertes Actives",
      description: "Situations nécessitant votre attention immédiate",
      metric: "2",
      trend: "-5",
      color: "bg-orange-500"
    }
  ];

  const testimonials = [
    {
      airport: "Aéroport Charles de Gaulle",
      manager: "Christine Dubois",
      position: "Directrice Sûreté",
      contractors: 52,
      compliance: "97.8%",
      quote: "PYGMALION nous donne une visibilité inégalée sur la conformité de tous nos prestataires. Nous anticipons maintenant tous les risques.",
      avatar: "CD",
      location: "Roissy-CDG"
    },
    {
      airport: "Aéroport de Lyon",
      manager: "Michel Lefebvre", 
      position: "Responsable Exploitation",
      contractors: 28,
      compliance: "98.2%",
      quote: "La supervision centralisée nous fait gagner un temps précieux. Les rapports automatiques simplifient nos audits.",
      avatar: "ML",
      location: "Lyon-Saint Exupéry"
    },
    {
      airport: "Aéroport de Toulouse",
      manager: "Sarah Martin",
      position: "Manager Sécurité",
      contractors: 19,
      compliance: "96.5%",
      quote: "L'interface permet un pilotage efficace de tous nos intervenants. La conformité n'a jamais été aussi maîtrisée.",
      avatar: "SM",
      location: "Toulouse-Blagnac"
    }
  ];

  const complianceMetrics = [
    { label: "Formations à échéance", value: "23", status: "warning" },
    { label: "Prestataires conformes", value: "45/47", status: "success" },
    { label: "Certifications expirées", value: "0", status: "success" },
    { label: "Nouveaux employés", value: "12", status: "info" }
  ];

  return (
    <Layout>
      {/* Hero Section Airport Supervision */}
      <section className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
          {/* Pattern décoratif aéroportuaire */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400 blur-2xl"></div>
            <div className="absolute top-40 right-32 w-48 h-48 rounded-full bg-green-400 blur-3xl"></div>
            <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-purple-400 blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu gauche */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Radar className="h-4 w-4" />
                  Supervision Aéroportuaire
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Supervisez la Conformité
                  <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                    de votre Aéroport
                  </span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Monitoring temps réel de tous vos prestataires. Conformité sûreté garantie. 
                  Rapports automatisés pour les autorités.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-800 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/register/airport">
                    <Radar className="mr-2 h-5 w-5" />
                    Créer mon compte aéroport
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

              {/* Métriques aéroport */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">47</div>
                  <div className="text-sm text-blue-200">Prestataires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">97.8%</div>
                  <div className="text-sm text-blue-200">Conformité</div>
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
                  src="/images/placeholder-agent-piste.jpg" 
                  alt="Supervision aéroportuaire conformité formation"
                  className="w-full h-auto max-w-2xl rounded-2xl shadow-2xl"
                />
                
                {/* Badges flottants spécifiques aéroport */}
                <div className="absolute -top-6 -left-6 bg-green-500 rounded-xl p-4 shadow-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -top-6 -right-6 bg-blue-500 rounded-xl p-4 shadow-xl">
                  <Radar className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 rounded-xl p-4 shadow-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Info cards flottantes */}
              <div className="absolute -top-16 left-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Conformité globale</p>
                <p className="text-xs text-gray-600">97.8% ✓</p>
              </div>
              
              <div className="absolute -bottom-16 right-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Prestataires supervisés</p>
                <p className="text-xs text-gray-600">47 entreprises</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Défis Aéroportuaires */}
      <section className="py-24 px-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Défis de la Supervision Aéroportuaire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gérer la conformité formation de dizaines d'entreprises avec des centaines d'employés 
              sur un même site d'exploitation n'a jamais été simple... jusqu'à maintenant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {airportChallenges.map((challenge, index) => {
              const IconComponent = challenge.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${challenge.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fonctionnalités Platform */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Votre Solution de Supervision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              PYGMALION transforme la complexité de la supervision multi-prestataires 
              en un tableau de bord unifié et intelligent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`${feature.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-3 flex-1">
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

      {/* Types de Prestataires */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Tous vos Prestataires Supervisés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la compagnie aérienne au service de nettoyage, supervisez la conformité 
              de toutes les entreprises opérant sur votre site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contractorTypes.map((contractor, index) => {
              const IconComponent = contractor.icon;
              return (
                <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${contractor.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${contractor.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold">{contractor.title}</CardTitle>
                    <p className="text-gray-600">{contractor.description}</p>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{contractor.compliance}</div>
                        <div className="text-xs text-gray-600">Conformité</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{contractor.employees}</div>
                        <div className="text-xs text-gray-600">Employés</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Processus de Supervision */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Comment ça Fonctionne
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et automatisé pour superviser efficacement 
              tous vos prestataires sans effort administratif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supervisionProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative text-center">
                  {/* Connecteur */}
                  {index < supervisionProcess.length - 1 && (
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

      {/* Dashboard Preview */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Tableau de Bord Aéroport
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interface intuitive conçue spécifiquement pour les gestionnaires d'aéroports. 
              Toutes les informations essentielles en un coup d'œil.
            </p>
          </div>

          {/* Dashboard mockup */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Aéroport Charles de Gaulle</h3>
                  <p className="text-gray-600">Vue d'ensemble conformité - {new Date().toLocaleDateString('fr-FR')}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  <Activity className="h-4 w-4 mr-2" />
                  Site Conforme 97.8%
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardFeatures.map((feature, index) => (
                <div key={index} className={`${feature.color} rounded-xl p-6 text-white`}>
                  <div className="text-3xl font-bold mb-2">{feature.metric}</div>
                  <div className="text-sm opacity-90 mb-2">{feature.title}</div>
                  <div className="text-xs opacity-75 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {feature.trend} ce mois
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Alertes de Conformité</h4>
                <div className="space-y-3">
                  {complianceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{metric.value}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'success' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h4>
                <div className="space-y-3">
                  <Button className="w-full justify-start gap-3 bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Exporter rapport conformité
                  </Button>
                  <Button className="w-full justify-start gap-3 bg-green-50 text-green-700 hover:bg-green-100">
                    <Search className="h-4 w-4" />
                    Rechercher un prestataire
                  </Button>
                  <Button className="w-full justify-start gap-3 bg-orange-50 text-orange-700 hover:bg-orange-100">
                    <Bell className="h-4 w-4" />
                    Configurer alertes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages Aéroports */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Aéroports Partenaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment les plus grands aéroports français ont révolutionné 
              leur supervision de la conformité formation.
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
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{testimonial.contractors}</div>
                      <div className="text-xs text-gray-600">Prestataires</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{testimonial.compliance}</div>
                      <div className="text-xs text-gray-600">Conformité</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-900 mb-2">
                    {testimonial.airport}
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
      <section className="py-24 px-8 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Sécurisez votre Aéroport
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Rejoignez les aéroports leaders qui ont choisi PYGMALION pour superviser 
                la conformité formation de tous leurs prestataires.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/register/airport">
                  <Radar className="mr-2 h-5 w-5" />
                  Créer mon compte aéroport
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
                  Planifier une démo
                </Link>
              </Button>
            </div>

            {/* Garanties Sécurité */}
            <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Sûreté Garantie</div>
                <div className="text-blue-100 text-sm">Conformité totale aux standards OACI</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Monitoring 24/7</div>
                <div className="text-blue-100 text-sm">Surveillance continue automatisée</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Rapports Conformes</div>
                <div className="text-blue-100 text-sm">Export automatique pour autorités</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ForAirports;