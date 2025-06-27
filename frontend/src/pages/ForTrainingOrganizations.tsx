import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Building2, 
  Award, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Shield, 
  Zap, 
  DollarSign, 
  BarChart3,
  Trophy,
  Rocket,
  UserCheck,
  Clock,
  Briefcase,
  Monitor,
  Calendar,
  Phone,
  FileText
} from 'lucide-react';

const ForTrainingOrganizations = () => {
  const processSteps = [
    {
      number: "01",
      title: "Candidature Express",
      subtitle: "KYB & Validation",
      description: "Soumettez votre dossier complet avec certificat Qualiopi et justificatifs d'expertise aviation",
      duration: "24-48h",
      icon: UserCheck,
      color: "bg-blue-500"
    },
    {
      number: "02",
      title: "Analyse Experte",
      subtitle: "Validation Qualité",
      description: "Notre équipe analyse votre expertise, conformité réglementaire et capacité pédagogique",
      duration: "3-5 jours",
      icon: Shield,
      color: "bg-green-500"
    },
    {
      number: "03",
      title: "Intégration Technique",
      subtitle: "Setup & Formation",
      description: "Configuration LMS, import contenus, formation aux outils et première publication",
      duration: "1-2 semaines", 
      icon: Rocket,
      color: "bg-purple-500"
    },
    {
      number: "04",
      title: "Lancement Commercial",
      subtitle: "Support & Croissance",
      description: "Mise en avant, support marketing et accompagnement pour maximiser vos inscriptions",
      duration: "En continu",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ];

  const businessAdvantages = [
    {
      category: "Audience Qualifiée",
      items: [
        "400+ professionnels aviation ciblés",
        "Compagnies aériennes partenaires",
        "Aéroports et gestionnaires de sites",
        "Techniciens et pilotes individuels"
      ],
      icon: Users,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      category: "Technologies Premium",
      items: [
        "LMS haute performance intégré",
        "Tokenisation automatique certificats",
        "SSO et authentification MFA",
        "Analytics avancées temps réel"
      ],
      icon: Zap,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      category: "Revenus Optimisés", 
      items: [
        "Commission attractive par inscription",
        "Aucun frais fixe ni abonnement",
        "Paiement automatique mensuel",
        "Transparence totale des transactions"
      ],
      icon: DollarSign,
      gradient: "from-green-500 to-green-600"
    }
  ];

  const techFeatures = [
    {
      title: "Dashboard Avancé",
      description: "Analytics complètes : inscriptions, revenus, taux de conversion et performance par formation",
      preview: "📊 Vue 360° de votre activité",
      icon: BarChart3
    },
    {
      title: "Automatisation Documentaire",
      description: "Génération automatique des feuilles d'émargement, attestations et certificats conformes",
      preview: "📄 Conformité garantie",
      icon: FileText
    },
    {
      title: "LMS Sécurisé Intégré",
      description: "Plateforme de formation avec biométrie, anti-fraude et livraison multimodale",
      preview: "🔒 Sécurité maximale",
      icon: Monitor
    },
    {
      title: "Support Business Dédié",
      description: "Accompagnement commercial, technique et marketing pour optimiser vos résultats",
      preview: "🎯 Expertise partagée",
      icon: Briefcase
    }
  ];

  const partnerTestimonials = [
    {
      company: "AeroFormation Excellence",
      director: "Marie-Claire Dubois",
      position: "Directrice Pédagogique",
      students: 250,
      growth: "+180%",
      quote: "PYGMALION a révolutionné notre approche. L'automatisation nous fait gagner 15h par semaine et nos apprenants adorent la technologie blockchain.",
      avatar: "MD",
      sector: "Formation Maintenance"
    },
    {
      company: "Sky Professional Training",
      director: "Jean-Paul Martin", 
      position: "Gérant",
      students: 180,
      growth: "+120%",
      quote: "Visibilité exceptionnelle auprès des entreprises. Le modèle économique nous permet de nous concentrer sur la pédagogie.",
      avatar: "JP",
      sector: "Formation Pilotage"
    },
    {
      company: "Aviation Safety Institute",
      director: "Sophie Laurent",
      position: "Responsable OF",
      students: 320,
      growth: "+200%",
      quote: "La conformité Qualiopi est simplifiée et le support technique est remarquable. Nos formations n'ont jamais été aussi accessibles.",
      avatar: "SL",
      sector: "Sécurité Aéroportuaire"
    }
  ];

  return (
    <Layout>
      {/* Hero Section Business-Oriented */}
      <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
          {/* Pattern décoratif */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-32 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
            <div className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 py-24">
          <div className="text-center space-y-8">
            
            {/* Badge et titre */}
            <div className="space-y-6">
              <Badge className="bg-white/10 text-white border-white/20 px-4 py-2 text-sm">
                <Building2 className="h-4 w-4 mr-2" />
                Partenariat Organismes de Formation
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Développez Votre
                <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Business Formation
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Intégrez l'écosystème PYGMALION et accédez à 400+ apprenants qualifiés 
                avec notre technologie de pointe et notre modèle économique avantageux.
              </p>
            </div>

            {/* Stats en cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">400+</div>
                  <div className="text-sm text-blue-200">Apprenants Ciblés</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">5-10</div>
                  <div className="text-sm text-blue-200">Places MVP</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">5j</div>
                  <div className="text-sm text-blue-200">Validation</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">0€</div>
                  <div className="text-sm text-blue-200">Frais Fixes</div>
                </CardContent>
              </Card>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-800 px-8 py-4 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/for-training-organizations/register">
                  <Trophy className="mr-2 h-5 w-5" />
                  Candidater maintenant
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
                  Échanger avec notre équipe
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Processus de Partenariat - Design Timeline */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Votre Parcours Partenaire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus de validation rigoureux en 4 étapes pour intégrer 
              notre écosystème d'excellence et commencer à développer votre activité.
            </p>
          </div>

          <div className="space-y-16">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  
                  {/* Contenu */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-blue-600 mb-1">ÉTAPE {step.number}</div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                        <div className="text-sm text-gray-500">{step.subtitle}</div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-600">{step.duration}</span>
                    </div>
                  </div>

                  {/* Visuel */}
                  <div className="flex-1">
                    <Card className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 border-2">
                      <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <IconComponent className={`h-16 w-16 mx-auto text-gray-400`} />
                          <div className="text-sm text-gray-500">Preview {step.title}</div>
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

      {/* Avantages Business - Design en colonnes */}
      <section className="py-24 px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi Choisir PYGMALION ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trois piliers fondamentaux pour développer votre activité 
              de formation aviation avec succès.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {businessAdvantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <Card key={index} className="relative overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-5`}></div>
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${advantage.gradient} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{advantage.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    {advantage.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies & Fonctionnalités - Design Grid */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Technologies de Pointe Incluses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tous les outils et technologies nécessaires pour optimiser 
              votre activité et maximiser vos résultats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => {
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

      {/* Témoignages Partenaires - Design Cards avec stats */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Partenaires Témoignent
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment nos organismes partenaires ont développé 
              leur activité grâce à notre écosystème.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTestimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.director}</div>
                        <div className="text-sm text-gray-600">{testimonial.position}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{testimonial.sector}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{testimonial.students}</div>
                      <div className="text-xs text-gray-600">Apprenants</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{testimonial.growth}</div>
                      <div className="text-xs text-gray-600">Croissance</div>
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

      {/* CTA Final Business */}
      <section className="py-24 px-8 bg-blue-600">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Développons Ensemble Votre Activité
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Rejoignez notre réseau sélect de partenaires et bénéficiez de la technologie 
                la plus avancée du secteur pour développer votre business formation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-10 py-5 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/for-training-organizations/register">
                  <Building2 className="mr-2 h-5 w-5" />
                  Candidater maintenant
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
                  Programmer une démo
                </Link>
              </Button>
            </div>

            {/* Garanties Business */}
            <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Validation Garantie</div>
                <div className="text-blue-100 text-sm">Processus transparent sous 5 jours</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Technologie Premium</div>
                <div className="text-blue-100 text-sm">LMS, tokenisation et automatisation</div>
              </div>
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="text-white font-semibold">Croissance Assurée</div>
                <div className="text-blue-100 text-sm">Support dédié et accompagnement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ForTrainingOrganizations;
