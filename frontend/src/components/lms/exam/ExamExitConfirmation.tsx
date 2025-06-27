
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ExamExitConfirmationProps {
  onContinue: () => void;
  onExit: () => void;
}

const ExamExitConfirmation: React.FC<ExamExitConfirmationProps> = ({
  onContinue,
  onExit
}) => {
  return (
    <Card className="mb-6 border-amber-200 bg-amber-50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Voulez-vous vraiment quitter l'examen?</h3>
            <p className="text-amber-800 mb-4">
              Toutes vos réponses seront perdues et votre tentative sera enregistrée comme incomplète.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onContinue}>
                Continuer l'examen
              </Button>
              <Button variant="destructive" onClick={onExit}>
                Quitter l'examen
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamExitConfirmation;
