import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
      <div className="max-w-[1600px] mx-auto px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Prêt à transformer votre gestion de{' '}
            <span className="text-blue-600">formation aéronautique</span> ?
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Rejoignez PYGMALION aujourd'hui et découvrez l'avenir de la gestion de la formation aéronautique - 
            <span className="font-semibold"> simplifiée, conforme et efficace.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Commencer
            </Link>
            <Link 
              to="/contact" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-105"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 