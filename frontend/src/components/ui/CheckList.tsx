import React from 'react';
import { CheckCircle, LucideIcon } from 'lucide-react';

interface CheckListProps {
  items: string[];
  icon?: LucideIcon;
  iconClassName?: string;
  itemClassName?: string;
  className?: string;
}

/**
 * Composant réutilisable pour afficher des listes avec icônes
 * Évite la duplication du pattern de liste avec checkmarks
 */
export const CheckList: React.FC<CheckListProps> = ({ 
  items, 
  icon: Icon = CheckCircle,
  iconClassName = "text-green-500",
  itemClassName = "text-gray-700",
  className = "space-y-2"
}) => {
  if (!items || items.length === 0) return null;
  
  return (
    <ul className={className}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <Icon className={`h-4 w-4 ${iconClassName} mt-0.5 flex-shrink-0`} />
          <span className={itemClassName}>{item}</span>
        </li>
      ))}
    </ul>
  );
};