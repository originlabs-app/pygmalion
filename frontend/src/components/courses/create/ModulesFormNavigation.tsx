
import React from 'react';
import { Button } from '@/components/ui/button';

interface ModulesFormNavigationProps {
  goToPreviousTab: () => void;
  goToNextTab: () => void;
}

const ModulesFormNavigation: React.FC<ModulesFormNavigationProps> = ({
  goToPreviousTab,
  goToNextTab
}) => {
  return (
    <div className="pt-4 flex justify-between">
      <Button type="button" variant="outline" onClick={goToPreviousTab}>
        Retour
      </Button>
      <Button type="button" onClick={goToNextTab}>
        Continuer
      </Button>
    </div>
  );
};

export default ModulesFormNavigation;
