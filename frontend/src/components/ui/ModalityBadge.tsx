import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getModalityConfig } from '@/constants/courseModalities';

interface ModalityBadgeProps {
  type: string;
  showIcon?: boolean;
  showLabel?: boolean;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
}

/**
 * Badge réutilisable pour afficher les modalités de cours
 * Évite la duplication du pattern Badge + Icon + Label
 */
export const ModalityBadge: React.FC<ModalityBadgeProps> = ({ 
  type, 
  showIcon = true,
  showLabel = true,
  variant = 'outline',
  className = ''
}) => {
  const config = getModalityConfig(type);
  const Icon = config.icon;
  
  return (
    <Badge variant={variant} className={className}>
      {showIcon && <Icon className="h-4 w-4" />}
      {showIcon && showLabel && <span className="mx-1" />}
      {showLabel && config.label}
    </Badge>
  );
};