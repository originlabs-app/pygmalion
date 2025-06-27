import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Wrench, Plane, Truck, Shield, Radio, Briefcase, Users, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoriesCarouselSectionProps {
  categories: string[];
}

const CategoriesCarouselSection = ({ categories }: CategoriesCarouselSectionProps) => {
  // Mapping des catégories avec icônes et couleurs spécifiques
  const categoryConfig = {
    'Aircraft Maintenance': { icon: Wrench, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    'Flight Operations': { icon: Plane, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
    'Ground Handling': { icon: Truck, color: 'bg-orange-500', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    'Airport Security': { icon: Shield, color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
    'Air Traffic Control': { icon: Radio, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
    'Safety Management': { icon: Briefcase, color: 'bg-cyan-500', bgColor: 'bg-cyan-50', textColor: 'text-cyan-700' },
    'Cabin Crew': { icon: Users, color: 'bg-pink-500', bgColor: 'bg-pink-50', textColor: 'text-pink-700' },
    'Aviation Regulations': { icon: FileText, color: 'bg-indigo-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700' },
  };

  const getConfigForCategory = (category: string) => {
    return categoryConfig[category as keyof typeof categoryConfig] || 
           { icon: Plane, color: 'bg-gray-500', bgColor: 'bg-gray-50', textColor: 'text-gray-700' };
  };

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explorez nos domaines de formation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez des formations spécialisées dans tous les domaines de l'aviation, 
            dispensées par des experts reconnus du secteur.
          </p>
        </div>
        
        {/* Categories Grid/Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {categories.slice(0, 8).map((category, index) => {
                const config = getConfigForCategory(category);
                const IconComponent = config.icon;
                
                return (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <Link
                      to={`/courses?category=${encodeURIComponent(category)}`}
                      className="group block h-full"
                    >
                      <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                        <div className={`inline-flex items-center justify-center w-16 h-16 ${config.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {category}
                        </h3>
                        
                        <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                          <span>Explorer</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <CarouselPrevious className="relative static translate-y-0 h-12 w-12 bg-white border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <ChevronLeft className="h-6 w-6" />
              </CarouselPrevious>
              
              <CarouselNext className="relative static translate-y-0 h-12 w-12 bg-white border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <ChevronRight className="h-6 w-6" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/courses">
            <Button 
              variant="outline" 
              size="lg"
              className="gap-3 px-8 py-4 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group"
            >
              Voir toutes les catégories
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarouselSection;
