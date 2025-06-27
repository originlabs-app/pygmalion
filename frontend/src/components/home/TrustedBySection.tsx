import React from 'react';

const TrustedBySection = () => {
  const partners = [
    'AIRBUS',
    'DASSAULT',
    'SAFRAN', 
    'THALES',
    'BOEING'
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 font-medium">
            Utilisé par les leaders de l'industrie aéronautique
          </p>
        </div>
        
        {/* Partners Logos */}
        <div className="flex justify-center items-center flex-wrap gap-x-16 gap-y-8">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="text-gray-400 font-bold text-3xl lg:text-4xl tracking-wider hover:text-gray-500 transition-colors duration-300 select-none"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
