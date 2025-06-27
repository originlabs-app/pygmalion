
import React from 'react';
import { AlertTriangle, Webcam, Chrome } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface SecurityWarningsProps {
  warnings: number;
}

const SecurityWarnings: React.FC<SecurityWarningsProps> = ({ warnings }) => {
  return (
    <div className="space-y-4 mb-6">
      <Alert className="border-yellow-300 bg-yellow-50">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Surveillance active</AlertTitle>
        <AlertDescription className="text-yellow-700">
          Votre session d'examen est surveillée. Tentatives de triche détectées: {warnings > 0 ? <span className="font-bold text-red-500">{warnings}</span> : "aucune"}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Alert className="border-amber-200 bg-amber-50">
          <Webcam className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Reconnaissance faciale</AlertTitle>
          <AlertDescription className="text-amber-700">
            Votre webcam est utilisée pour vérifier votre identité. Ne quittez pas le champ de vision.
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-200 bg-amber-50">
          <Chrome className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800">Navigation restreinte</AlertTitle>
          <AlertDescription className="text-amber-700">
            Changer d'onglet ou quitter cette fenêtre sera signalé comme tentative de triche.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default SecurityWarnings;
