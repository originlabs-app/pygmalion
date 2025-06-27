
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Enrollment } from '@/types';

interface StatusBadgeProps {
  status: Enrollment['status'];
  paymentStatus?: string;
  progress?: { percentage: number } | undefined;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  paymentStatus, 
  progress 
}) => {
  const getStatusBadgeVariant = (status: Enrollment['status']) => {
    switch(status) {
      case 'approved': return 'default';
      case 'completed': return 'success';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: Enrollment['status']) => {
    switch(status) {
      case 'approved': return 'En cours';
      case 'completed': return 'Terminé';
      case 'pending': return 'À venir';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <>
      <Badge variant={getStatusBadgeVariant(status)}>
        {getStatusLabel(status)}
      </Badge>
      
      {paymentStatus && (
        <div className="mt-1">
          <Badge variant="outline" className="text-xs">
            Paiement: {paymentStatus === 'paid' ? 'Payé' : 
                      paymentStatus === 'pending' ? 'En attente' : 
                      paymentStatus === 'refunded' ? 'Remboursé' : paymentStatus}
          </Badge>
        </div>
      )}
      
      {progress && (
        <div className="mt-1">
          <Badge variant="secondary" className="text-xs">
            Progression: {progress.percentage}%
          </Badge>
        </div>
      )}
    </>
  );
};
