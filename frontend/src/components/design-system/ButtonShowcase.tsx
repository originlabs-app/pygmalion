import React from 'react';
import { buttonStyles } from '@/data/designSystem';
import { ArrowRight, Download, Heart, Plane, Shield } from 'lucide-react';

export const ButtonShowcase: React.FC = () => {
  const icons = {
    ArrowRight: <ArrowRight className="w-4 h-4" />,
    Download: <Download className="w-4 h-4" />,
    Heart: <Heart className="w-4 h-4" />,
    Plane: <Plane className="w-4 h-4" />,
    Shield: <Shield className="w-4 h-4" />,
  };

  return (
    <div className="space-y-12">
      {/* Variantes */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Variantes de boutons</h3>
        <div className="space-y-6">
          {Object.entries(buttonStyles.variants).map(([variant, className]) => (
            <div key={variant}>
              <h4 className="text-lg font-semibold text-gray-700 mb-4 capitalize">{variant}</h4>
              <div className="flex flex-wrap gap-4">
                {Object.entries(buttonStyles.sizes).map(([size, sizeClass]) => (
                  <button
                    key={`${variant}-${size}`}
                    className={`${buttonStyles.base} ${className} ${sizeClass}`}
                  >
                    Bouton {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Boutons avec icônes */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Boutons avec icônes</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Icône à gauche</h4>
            <div className="flex flex-wrap gap-4">
              {Object.entries(icons).slice(0, 3).map(([name, icon]) => (
                <button
                  key={name}
                  className={`${buttonStyles.base} ${buttonStyles.variants.primary} ${buttonStyles.sizes.md} ${buttonStyles.withIcon.left}`}
                >
                  {icon}
                  Action {name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Icône à droite</h4>
            <div className="flex flex-wrap gap-4">
              {Object.entries(icons).slice(3).map(([name, icon]) => (
                <button
                  key={name}
                  className={`${buttonStyles.base} ${buttonStyles.variants.secondary} ${buttonStyles.sizes.md} ${buttonStyles.withIcon.right}`}
                >
                  {icon}
                  Action {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* États */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">États des boutons</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Normal</p>
            <button className={`${buttonStyles.base} ${buttonStyles.variants.primary} ${buttonStyles.sizes.md}`}>
              Normal
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Hover</p>
            <button className={`${buttonStyles.base} ${buttonStyles.variants.primary} ${buttonStyles.sizes.md} hover`}>
              Hover
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Focus</p>
            <button className={`${buttonStyles.base} ${buttonStyles.variants.primary} ${buttonStyles.sizes.md} focus`}>
              Focus
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Disabled</p>
            <button 
              disabled
              className={`${buttonStyles.base} ${buttonStyles.variants.primary} ${buttonStyles.sizes.md} opacity-50 cursor-not-allowed`}
            >
              Disabled
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};