import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Building2, Users, ArrowRight, Zap } from 'lucide-react';

const UserTypesSection = () => {
  const userTypes = [
    {
      icon: GraduationCap,
      title: "Apprenants",
      description: "Trouvez des formations certifiées en aéronautique et gérez votre développement professionnel",
      linkText: "S'inscrire comme Apprenant",
      linkTo: "/register?role=student",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      icon: Building2,
      title: "Organismes de Formation",
      description: "Présentez vos formations et atteignez des étudiants qualifiés dans le domaine de l'aviation",
      linkText: "Devenir Partenaire",
      linkTo: "/register?role=training_org",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      icon: Users,
      title: "Managers",
      description: "Suivez la conformité de formation de votre équipe et gérez les certifications",
      linkText: "S'inscrire comme Manager",
      linkTo: "/register?role=manager",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    }
  ];

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            Pour Tous les Profils
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Accélérez votre évolution ou celle de votre entreprise
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            PYGMALION répond aux besoins de tout l'écosystème de formation aéronautique 
            avec des solutions adaptées à chaque profil professionnel.
          </p>
        </div>
        
        {/* User Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => {
            const IconComponent = userType.icon;
            return (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${userType.color} rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {userType.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  {userType.description}
                </p>
                
                {/* CTA Button */}
                <Link to={userType.linkTo} className="block">
                  <Button 
                    className={`w-full ${userType.color} hover:opacity-90 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 group-hover:shadow-lg flex items-center justify-center gap-2`}
                  >
                    {userType.linkText}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UserTypesSection;
