
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Session } from '@/types';

interface SessionStatus {
  status: 'upcoming' | 'ongoing' | 'past';
  label: string;
  variant: 'outline' | 'success' | 'secondary';
}

interface SessionsTableProps {
  sessions: Session[];
  courseTitle?: string;
  formatDate?: (date: string) => string;
  formatPrice?: (price: number) => string;
  isInteractive?: boolean;
  onSessionSelect?: (sessionId: string) => void;
}

const SessionsTable: React.FC<SessionsTableProps> = ({ 
  sessions, 
  courseTitle,
  formatDate: customFormatDate,
  formatPrice: customFormatPrice,
  isInteractive = false,
  onSessionSelect
}) => {
  // Default formatters (can be overridden by props)
  const defaultFormatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const defaultFormatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  // Use custom formatters if provided, otherwise use defaults
  const formatDate = customFormatDate || defaultFormatDate;
  const formatPrice = customFormatPrice || defaultFormatPrice;

  // Check if session is upcoming, ongoing, or past
  const getSessionStatus = (startDate: string, endDate: string): SessionStatus => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) {
      return { status: 'upcoming', label: 'À venir', variant: 'outline' };
    } else if (now >= start && now <= end) {
      return { status: 'ongoing', label: 'En cours', variant: 'success' };
    } else {
      return { status: 'past', label: 'Terminée', variant: 'secondary' };
    }
  };

  const handleRowClick = (sessionId: string) => {
    if (isInteractive && onSessionSelect) {
      onSessionSelect(sessionId);
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dates</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Places</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.length > 0 ? (
            sessions.map((session) => {
              const { label, variant } = getSessionStatus(session.startDate, session.endDate);
              
              return (
                <TableRow 
                  key={session.id} 
                  className={isInteractive ? "cursor-pointer hover:bg-muted/80" : ""}
                  onClick={() => isInteractive && handleRowClick(session.id)}
                >
                  <TableCell>
                    <div className="font-medium">
                      Du {formatDate(session.startDate)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      au {formatDate(session.endDate)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {session.location}
                  </TableCell>
                  
                  <TableCell>
                    {formatPrice(session.price)}
                  </TableCell>
                  
                  <TableCell>
                    <div className={`${session.availableSeats <= 3 ? 'text-amber-500 font-medium' : ''}`}>
                      {session.availableSeats} {session.availableSeats > 1 ? 'places' : 'place'}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant={variant}>
                      {label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                Aucune session programmée pour {courseTitle ? `"${courseTitle}"` : 'cette formation'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionsTable;
