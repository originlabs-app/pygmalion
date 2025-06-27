import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, GraduationCap, Users, Award, BookOpen, Play, FileText, Target } from 'lucide-react';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "Apprenants",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      number: "50+",
      label: "Instructeurs",
      color: "bg-orange-500"
    },
    {
      icon: Play,
      number: "150+",
      label: "Formations",
      color: "bg-green-500"
    },
    {
      icon: FileText,
      number: "200+",
      label: "Ressources",
      color: "bg-cyan-500"
    }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-32 w-4 h-4 bg-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-orange-400 rounded-full"></div>
        <div className="absolute top-60 right-40 w-3 h-3 bg-green-400 rounded-full"></div>
        <div className="absolute bottom-40 right-24 w-6 h-1 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-32 right-16 text-2xl">✨</div>
        <div className="absolute top-32 right-60 text-3xl">📈</div>
        <div className="absolute bottom-48 right-80 text-2xl">🎯</div>
      </div>

      <div className="relative max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[60vh] px-8 py-4">
          {/* Left Content */}
                      <div className="space-y-4">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Excellence en Formation
                <span className="block text-blue-600">Aéronautique</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Développez vos compétences aviation. Formations en ligne pour professionnels aéronautiques. 
                Obtenez vos certifications, Progressez, Réussissez.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg transition-all duration-300"
                asChild
              >
                <Link to="/register">
                  Commencer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300"
                asChild
              >
                <Link to="/courses">
                  Parcourir les Formations
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main professionals image - ENCORE PLUS GRANDE */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src="/images/professionals/pilot-air-france.png" 
                    alt="Professionnels de l'aviation - Technicien, Gestionnaire et Commandant"
                    className="w-full h-auto max-w-3xl rounded-2xl"
                  />
                  
                  {/* Floating badges - repositionnés pour éviter les visages */}
                  <div className="absolute -top-8 -left-8 bg-green-500 rounded-full p-4 shadow-xl">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="absolute -top-8 -right-8 bg-blue-500 rounded-full p-4 shadow-xl">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-500 rounded-full p-4 shadow-xl">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Floating text badges - repositionnés loin des visages */}
              <div className="absolute top-0 -left-20 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-base font-semibold text-gray-900">Formations Certifiantes</p>
                <p className="text-sm text-gray-600">100% Conformes</p>
              </div>
              
              <div className="absolute bottom-0 -right-20 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                <p className="text-base font-semibold text-gray-900">Expert Aviation</p>
                <p className="text-sm text-gray-600">Secteur Spécialisé</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-8 pb-12 mt-16 lg:mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} rounded-full mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {stat.number}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
