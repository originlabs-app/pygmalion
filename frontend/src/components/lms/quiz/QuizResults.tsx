
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface QuizResultsProps {
  score: number;
  securityWarnings: number;
  onReset: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ score, securityWarnings, onReset }) => {
  const isPassed = score >= 70;

  return (
    <div className="text-center py-8">
      <div className={`text-4xl font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
        {score}%
      </div>
      <p className="mb-6">
        {isPassed 
          ? "Félicitations! Vous avez réussi l'évaluation." 
          : "Vous n'avez pas atteint le score minimum requis de 70%."}
      </p>
      {isPassed ? (
        <Button asChild>
          <Link to="/certificates">Voir mon certificat</Link>
        </Button>
      ) : (
        <Button onClick={onReset}>
          Réessayer
        </Button>
      )}
      
      {securityWarnings > 0 && (
        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-md text-left">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
            <div>
              <p className="font-medium text-amber-800">Information importante</p>
              <p className="text-sm text-amber-700">
                Des comportements suspects ont été détectés durant cette évaluation. 
                Le certificat sera généré après vérification par notre équipe.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
