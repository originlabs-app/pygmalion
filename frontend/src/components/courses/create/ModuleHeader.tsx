
import React from 'react';

interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">
        Créez les modules de votre formation et ajoutez-y du contenu (texte, vidéo, PDF, quiz, etc.)
      </p>
    </div>
  );
};

export default ModuleHeader;
