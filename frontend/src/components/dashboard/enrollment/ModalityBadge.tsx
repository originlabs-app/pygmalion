
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Laptop, Video, BookOpen, Calendar } from 'lucide-react';

interface ModalityBadgeProps {
  type?: string;
}

export const ModalityBadge: React.FC<ModalityBadgeProps> = ({ type }) => {
  const getFormationModality = (type?: string) => {
    switch(type) {
      case 'in-person': return 'Présentiel';
      case 'online': return 'E-learning';
      case 'virtual': return 'Classe Virtuelle';
      case 'blended': return 'Formation Mixte';
      default: return 'Non spécifié';
    }
  };
  
  const getModalityIcon = (type?: string) => {
    switch(type) {
      case 'in-person': return <MapPin className="h-4 w-4 mr-1" />;
      case 'online': return <Laptop className="h-4 w-4 mr-1" />;
      case 'virtual': return <Video className="h-4 w-4 mr-1" />;
      case 'blended': return <BookOpen className="h-4 w-4 mr-1" />;
      default: return <Calendar className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      {getModalityIcon(type)}
      {getFormationModality(type)}
    </Badge>
  );
};
