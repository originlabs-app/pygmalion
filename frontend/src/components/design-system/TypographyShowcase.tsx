import React from 'react';
import { typography } from '@/data/designSystem';

export const TypographyShowcase: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Titres */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Hiérarchie des titres</h3>
        <div className="space-y-6">
          {Object.entries(typography.headings).map(([level, className]) => (
            <div key={level} className="flex items-baseline gap-6">
              <span className="text-sm font-mono text-gray-500 w-12">{level}</span>
              <span className={`${className} text-gray-900`}>
                Titre de niveau {level.replace('h', '')}
              </span>
              <span className="text-sm font-mono text-gray-400">{className}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corps de texte */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Corps de texte</h3>
        <div className="space-y-6">
          {Object.entries(typography.body).map(([size, className]) => (
            <div key={size}>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-mono text-gray-500 capitalize">{size}</span>
                <span className="text-sm font-mono text-gray-400">{className}</span>
              </div>
              <p className={`${className} text-gray-700`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Poids de police */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Poids de police</h3>
        <div className="space-y-4">
          {Object.entries(typography.weights).map(([weight, className]) => (
            <div key={weight} className="flex items-center gap-6">
              <span className="text-sm font-mono text-gray-500 w-20 capitalize">{weight}</span>
              <span className={`${className} text-lg text-gray-900`}>
                The quick brown fox jumps over the lazy dog
              </span>
              <span className="text-sm font-mono text-gray-400">{className}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};