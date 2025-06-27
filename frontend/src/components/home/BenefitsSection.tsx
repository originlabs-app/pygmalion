import React from 'react';
import { BookOpen, Award, BarChart3, Shield, Target } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: "Contenu de qualité",
      description: "Des formations créées par des experts et conformes aux standards internationaux.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Award,
      title: "Certifications reconnues",
      description: "Obtenez des certificats validés par l'industrie et tokenisés pour une vérification facile.",
      color: "bg-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: BarChart3,
      title: "Suivi de progression",
      description: "Tableaux de bord personnalisés pour suivre votre évolution et celle de votre équipe.",
      color: "bg-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Shield,
      title: "Conformité assurée",
      description: "Système d'alerte intégré pour maintenir votre conformité réglementaire à jour.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Avantages Exclusifs
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Un apprentissage ciblé sur vos objectifs
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PYGMALION vous offre tous les outils nécessaires pour développer vos compétences 
            et atteindre l'excellence dans le domaine aéronautique.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${benefit.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
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
  );
};

export default BenefitsSection;
