import React from 'react';
import Layout from '@/components/layout/Layout';
import { ColorPalette, TypographyShowcase, ButtonShowcase } from '@/components/design-system';
import { Link } from 'react-router-dom';

const StyleDesign: React.FC = () => {
  const sections = [
    { id: 'colors', title: '1. Palette de couleurs', component: ColorPalette },
    { id: 'typography', title: '2. Typographie', component: TypographyShowcase },
    { id: 'buttons', title: '3. Boutons', component: ButtonShowcase },
  ];

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            PYGMALION Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Source de vérité pour tous les éléments de branding, couleurs, typographie 
            et composants utilisés dans la plateforme PYGMALION.
          </p>
        </div>

        {/* Table des matières */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table des matières</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {section.title}
              </a>
            ))}
            <Link to="/design-patterns" className="text-blue-600 hover:text-blue-700 font-medium">
              4. Patterns avancés →
            </Link>
          </div>
        </div>

        {/* Sections dynamiques */}
        {sections.map((section) => {
          const Component = section.component;
          return (
            <section key={section.id} id={section.id} className="mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-12">{section.title}</h2>
              <Component />
            </section>
          );
        })}

        {/* Footer avec liens */}
        <div className="mt-32 text-center">
          <p className="text-gray-600 mb-8">
            Pour plus de patterns et composants avancés
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/design-patterns"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Voir les patterns avancés →
            </Link>
            <Link
              to="/components"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Explorer les composants
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StyleDesign;