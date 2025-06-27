
import React from 'react';
import { Shield } from 'lucide-react';

interface SecurityAlertBannerProps {
  fraudDetectionActive: boolean;
  warnings: number;
}

const SecurityAlertBanner: React.FC<SecurityAlertBannerProps> = ({ fraudDetectionActive, warnings }) => {
  if (!fraudDetectionActive) return null;
  
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Sécurité active:</strong> Ne quittez pas cette page pendant l'évaluation. 
            Toute activité suspecte sera enregistrée et pourrait invalider votre évaluation.
            {warnings > 0 && ` (${warnings} avertissement${warnings > 1 ? 's' : ''})`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityAlertBanner;
