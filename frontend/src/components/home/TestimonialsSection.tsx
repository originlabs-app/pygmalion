import React from 'react';
import { Quote, Star, Heart } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "JD",
      name: "Jean Dupont",
      role: "Technicien de maintenance, Air France",
      quote: "Grâce à PYGMALION, j'ai pu maintenir à jour toutes mes certifications et développer de nouvelles compétences essentielles dans mon domaine.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      initials: "ML",
      name: "Marie Lambert",
      role: "Responsable Formation, Aéroport de Nice",
      quote: "La plateforme nous a permis de centraliser la gestion des certifications de plus de 200 employés et d'anticiper les renouvellements nécessaires.",
      color: "bg-green-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart className="h-4 w-4" />
            Témoignages Clients
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Votre succès, notre priorité
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment PYGMALION transforme la formation aéronautique 
            et accompagne les professionnels vers l'excellence.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-blue-600 rounded-full p-3">
                <Quote className="h-6 w-6 text-white" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6 pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300`}>
                  {testimonial.initials}
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              {/* Verification Badge */}
              <div className="absolute top-6 right-6 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                ✓ Vérifié
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </div>
            
            <div className="w-px h-12 bg-gray-200"></div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">2,500+</p>
              <p className="text-sm text-gray-600">Avis positifs</p>
            </div>
            
            <div className="w-px h-12 bg-gray-200"></div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-600">Recommandent</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
