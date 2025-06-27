
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ExamResultsProps {
  score: number;
  onExit: () => void;
  securityWarnings?: number;
}

const ExamResults: React.FC<ExamResultsProps> = ({ score, onExit, securityWarnings = 0 }) => {
  const isPassed = score >= 70;
  
  return (
    <Card>
      <CardContent className="text-center py-10">
        <div className={`text-6xl font-bold mb-6 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
          {score}%
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          {isPassed ? "Évaluation réussie!" : "Évaluation non validée"}
        </h2>
        
        <p className="text-lg mb-8 max-w-md mx-auto">
          {isPassed 
            ? "Félicitations! Vous avez réussi l'évaluation avec succès."
            : "Vous n'avez pas atteint le score minimum requis de 70%. Vous pouvez réessayer ultérieurement."}
        </p>
        
        {securityWarnings > 0 && (
          <div className="mb-8 p-4 border border-amber-200 bg-amber-50 rounded-md mx-auto max-w-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
              <div className="text-left">
                <h3 className="font-semibold text-amber-800 mb-1">Avertissement de sécurité</h3>
                <p className="text-amber-700">
                  {securityWarnings} comportement{securityWarnings > 1 ? 's' : ''} suspect{securityWarnings > 1 ? 's ont' : ' a'} été détecté{securityWarnings > 1 ? 's' : ''} pendant votre examen. 
                  Cela peut affecter la validité de votre certification.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Button onClick={onExit} size="lg">
          Retourner au cours
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExamResults;
