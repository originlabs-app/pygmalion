import React from 'react';
import { colors } from '@/data/designSystem';

export const ColorPalette: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Couleurs principales */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs principales</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(colors.primary).map(([key, color]) => (
            <div
              key={key}
              className={`rounded-2xl p-6 text-center ${
                key.includes('50') ? 'border border-gray-200' : ''
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <div className={`text-lg font-bold mb-2 ${
                key.includes('50') ? 'text-gray-900' : 'text-white'
              }`}>
                {color.name}
              </div>
              <div className={`text-sm ${
                key.includes('50') ? 'text-gray-700' : 'text-white opacity-90'
              }`}>
                {color.hex}
              </div>
              <div className={`text-xs mt-2 ${
                key.includes('50') ? 'text-gray-600' : 'text-white opacity-80'
              }`}>
                {color.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Couleurs secondaires */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs secondaires</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {Object.entries(colors.secondary).map(([key, color]) => (
            <div
              key={key}
              className="rounded-2xl p-6 text-center"
              style={{ backgroundColor: color.hex }}
            >
              <div className={`text-lg font-bold mb-2 ${
                key === 'yellow400' ? 'text-yellow-900' : 'text-white'
              }`}>
                {color.name}
              </div>
              <div className={`text-sm ${
                key === 'yellow400' ? 'text-yellow-800' : 'text-white opacity-90'
              }`}>
                {color.hex}
              </div>
              <div className={`text-xs mt-2 ${
                key === 'yellow400' ? 'text-yellow-700' : 'text-white opacity-80'
              }`}>
                {color.usage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Couleurs neutres */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs neutres</h3>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {Object.entries(colors.neutral).map(([key, color]) => (
            <div
              key={key}
              className={`rounded-2xl p-6 text-center border ${
                key.includes('900') || key.includes('700') ? '' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <div className={`text-lg font-bold mb-2 ${
                key.includes('900') || key.includes('700') || key.includes('600')
                  ? 'text-white'
                  : 'text-gray-900'
              }`}>
                {color.name}
              </div>
              <div className={`text-sm ${
                key.includes('900') || key.includes('700') || key.includes('600')
                  ? 'text-white opacity-90'
                  : 'text-gray-700'
              }`}>
                {color.hex}
              </div>
              <div className={`text-xs mt-2 ${
                key.includes('900') || key.includes('700') || key.includes('600')
                  ? 'text-white opacity-80'
                  : 'text-gray-600'
              }`}>
                {color.usage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};