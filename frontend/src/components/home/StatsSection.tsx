import React from 'react';
import { Users, GraduationCap, Building, Trophy, Plane, Shield, Award, Target } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: GraduationCap,
      number: "2,500+",
      label: "Apprenants Certifiés",
      description: "Professionnels formés",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Plane,
      number: "150+",
      label: "Formations Aviation",
      description: "Certifications disponibles",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Building,
      number: "50+",
      label: "Organismes Partenaires",
      description: "OF qualifiés Qualiopi",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Trophy,
      number: "98%",
      label: "Taux de Réussite",
      description: "Aux certifications",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="h-4 w-4" />
            Excellence Reconnue
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            PYGMALION en chiffres
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Notre plateforme transforme la formation aéronautique avec des résultats mesurables 
            et une expertise reconnue par les professionnels du secteur.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-4xl lg:text-5xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                      {stat.number}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir PYGMALION ?
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  La seule plateforme 100% dédiée à la formation aéronautique, 
                  reconnue pour son excellence et sa conformité aux standards les plus élevés.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sécurité Maximale</h4>
                    <p className="text-sm text-gray-600">Anti-fraude biométrique et MFA obligatoire</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Certifié Qualiopi</h4>
                    <p className="text-sm text-gray-600">Conformité garantie aux exigences réglementaires</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Expertise Aviation</h4>
                    <p className="text-sm text-gray-600">Spécialisé 100% secteur aéronautique</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Support Dédié</h4>
                    <p className="text-sm text-gray-600">Accompagnement personnalisé 7j/7</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Plateforme Active</span>
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold mb-2">Conformité Temps Réel</h4>
                    <p className="text-blue-100">
                      Surveillez la conformité de vos équipes avec des alertes automatiques 
                      et des rapports en temps réel.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-blue-500/30">
                    <div className="text-center">
                      <p className="text-2xl font-bold">24/7</p>
                      <p className="text-sm text-blue-200">Monitoring</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">&lt; 1min</p>
                      <p className="text-sm text-blue-200">Alertes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-blue-200">Traçabilité</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
