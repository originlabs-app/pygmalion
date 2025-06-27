import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  GraduationCap, 
  Award, 
  Clock, 
  Play, 
  CheckCircle, 
  Smartphone, 
  Shield, 
  BookOpen, 
  Target, 
  Users, 
  CreditCard, 
  Download,
  Star,
  Wifi,
  Monitor,
  Trophy,
  FileText,
  Calendar,
  BarChart3
} from 'lucide-react';

const ForLearners = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: "Formations Certifiantes",
      description: "Plus de 150 formations aviation reconnues par les professionnels du secteur",
      color: "bg-blue-500"
    },
    {
      icon: Award,
      title: "Certificats Blockchain",
      description: "Vos certificats sont tokenisés sur la blockchain pour une authenticité garantie",
      color: "bg-purple-500"
    },
    {
      icon: Clock,
      title: "Progression Temps Réel",
      description: "Suivez votre avancement module par module avec sauvegarde automatique",
      color: "bg-green-500"
    },
    {
      icon: CreditCard,
      title: "Financement Simplifié",
      description: "Formations éligibles CPF et OPCO avec assistance administrative",
      color: "bg-orange-500"
    }
  ];

  const features = [
    {
      icon: Monitor,
      title: "LMS Intégré",
      description: "Plateforme de formation haute performance avec vidéos HD, quiz interactifs et mode examen sécurisé"
    },
    {
      icon: BarChart3,
      title: "Dashboard Personnalisé", 
      description: "Tableau de bord complet pour suivre vos formations en cours, à venir et terminées"
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Authentification MFA, KYC et système anti-fraude pour une formation sécurisée"
    },
    {
      icon: Smartphone,
      title: "Accès 24/7",
      description: "Apprenez à votre rythme sur tous vos appareils avec synchronisation automatique"
    },
    {
      icon: Users,
      title: "Support Pédagogique",
      description: "Assistance par chat, email et forums de discussion avec formateurs experts"
    },
    {
      icon: Trophy,
      title: "Gamification",
      description: "Système de progression, badges et récompenses pour maintenir votre motivation"
    }
  ];

  const learningPath = [
    {
      step: "01",
      title: "Découvrez",
      description: "Explorez notre catalogue de formations aviation avec filtres avancés",
      icon: BookOpen
    },
    {
      step: "02", 
      title: "Inscrivez-vous",
      description: "Créez votre compte et choisissez votre session (paiement CB ou assignation manager)",
      icon: FileText
    },
    {
      step: "03",
      title: "Formez-vous",
      description: "Accédez au LMS intégré avec contenus interactifs et progression temps réel",
      icon: Play
    },
    {
      step: "04",
      title: "Certifiez-vous",
      description: "Obtenez votre certificat tokenisé blockchain après validation des acquis",
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      role: "Agent de Sûreté",
      company: "Aéroport Charles de Gaulle",
      comment: "Formation excellente qui m'a permis d'obtenir ma certification rapidement. Le LMS est très intuitif !",
      rating: 5
    },
    {
      name: "Thomas K.",
      role: "Technicien Maintenance",
      company: "Air France",
      comment: "Les modules interactifs et la progression temps réel m'ont aidé à rester motivé tout au long de la formation.",
      rating: 5
    },
    {
      name: "Sophie D.",
      role: "Contrôleuse Aérienne",
      company: "DSNA",
      comment: "Plateforme moderne avec d'excellents formateurs. Les certificats blockchain sont un vrai plus !",
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-32 w-4 h-4 bg-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-blue-300/60 rounded-full"></div>
          <div className="absolute top-60 right-40 w-3 h-3 bg-green-400/60 rounded-full"></div>
          <div className="absolute bottom-40 right-24 w-6 h-1 bg-purple-400/60 rounded-full"></div>
          <div className="absolute bottom-32 right-16 text-2xl opacity-60">🎓</div>
          <div className="absolute top-32 right-60 text-3xl opacity-60">📈</div>
          <div className="absolute bottom-48 right-80 text-2xl opacity-60">🚀</div>
        </div>

        <div className="relative max-w-[1600px] mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu gauche */}
            <div className="text-white space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <GraduationCap className="h-4 w-4" />
                  Votre Parcours Étudiant
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Développez vos
                  <span className="block text-blue-300">Compétences Aviation</span>
                </h1>
                
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Accédez à plus de 150 formations certifiantes, suivez votre progression en temps réel 
                  et obtenez des certificats tokenisés blockchain reconnus dans tout le secteur aéronautique.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all duration-300"
                  asChild
                >
                  <Link to="/register/learner">
                    Commencer ma formation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 hover:border-blue-100 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
                  asChild
                >
                  <Link to="/courses">
                    Voir les formations
                  </Link>
                </Button>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">2,500+</div>
                  <div className="text-sm text-blue-200">Apprenants formés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-blue-200">Taux de réussite</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">4.9/5</div>
                  <div className="text-sm text-blue-200">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Visuel droite */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="/images/aviation-learners-training.jpg" 
                  alt="Apprenants en formation aviation"
                  className="w-full h-auto max-w-2xl rounded-2xl shadow-2xl"
                />
                
                {/* Badges flottants */}
                <div className="absolute -top-6 -left-6 bg-green-500 rounded-xl p-4 shadow-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -top-6 -right-6 bg-blue-500 rounded-xl p-4 shadow-xl">
                  <Play className="h-6 w-6 text-white" />
                </div>
                
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-500 rounded-xl p-4 shadow-xl">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Cards info flottantes - repositionnées pour être lisibles */}
              <div className="absolute -top-16 left-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Formation en cours</p>
                <p className="text-xs text-gray-600">Progression: 75%</p>
              </div>
              
              <div className="absolute -bottom-16 right-8 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Certificat obtenu</p>
                <p className="text-xs text-gray-600">Blockchain validé ✓</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Avantages clés */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir PYGMALION ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expérience d'apprentissage complète et moderne, conçue spécialement 
              pour les professionnels de l'aviation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${benefit.color} rounded-xl mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parcours d'apprentissage */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Votre parcours en 4 étapes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la découverte à la certification, suivez un processus simple et efficace 
              pour développer vos compétences aviation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPath.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecteur */}
                  {index < learningPath.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-200 z-0"></div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-sm font-bold text-blue-600 mb-2">{step.step}</div>
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
      <section className="py-20 px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une plateforme complète avec tous les outils pour réussir votre formation 
              et obtenir vos certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ce que disent nos étudiants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de professionnels qui ont développé 
              leurs compétences grâce à PYGMALION.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${star <= testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <blockquote className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.comment}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-blue-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 2,500 professionnels qui ont choisi PYGMALION 
            pour développer leurs compétences aviation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/register/learner">
                Créer mon compte apprenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 hover:border-blue-100 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              asChild
            >
              <Link to="/courses">
                Explorer les formations
              </Link>
            </Button>
          </div>

          {/* Garanties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Certificat garanti</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Support 24/7</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Financement possible</span>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ForLearners; 