
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SecurityWarningProps {
  warnings: number;
}

const SecurityWarning: React.FC<SecurityWarningProps> = ({ warnings }) => {
  if (warnings === 0) return null;
  
  return (
    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
        <div>
          <p className="font-medium text-amber-800">Avertissement de sécurité</p>
          <p className="text-sm text-amber-700">
            {warnings} comportement{warnings > 1 ? 's' : ''} suspect{warnings > 1 ? 's' : ''} détecté{warnings > 1 ? 's' : ''}. 
            Veuillez rester sur cette page pendant l'évaluation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityWarning;
