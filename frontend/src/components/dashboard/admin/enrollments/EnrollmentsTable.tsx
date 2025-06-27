
import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  Eye,
  ExternalLink
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  providerId: string;
  providerName: string;
  sessionId: string;
  enrollmentDate: string;
  status: string;
  paymentStatus: string;
  lmsStatus: string;
  type: string;
  organization?: string;
}

interface EnrollmentsTableProps {
  enrollments: Enrollment[];
  onAction: (id: string, action: string) => void;
}

const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({ enrollments, onAction }) => {
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Approuvé</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get payment status badge
  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Payé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'refunded':
        return <Badge variant="outline">Remboursé</Badge>;
      case 'internal':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Interne</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper function to get LMS status badge
  const getLmsBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <Badge className="bg-green-500">Synchronisé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Erreur</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apprenant</TableHead>
            <TableHead>Formation</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead>LMS</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                Aucune inscription trouvée
              </TableCell>
            </TableRow>
          ) : (
            enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div className="font-medium">{enrollment.studentName}</div>
                  {enrollment.organization && (
                    <div className="text-xs text-muted-foreground">{enrollment.organization}</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">{enrollment.courseName}</div>
                  <div className="text-xs text-muted-foreground">
                    {enrollment.type === 'in-person' ? 'Présentiel' : 
                     enrollment.type === 'online' ? 'En ligne' : 
                     enrollment.type === 'virtual' ? 'Virtuel' : 'Mixte'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{enrollment.providerName}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDistanceToNow(new Date(enrollment.enrollmentDate), { 
                      addSuffix: true,
                      locale: fr
                    })}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                <TableCell>{getPaymentBadge(enrollment.paymentStatus)}</TableCell>
                <TableCell>{getLmsBadge(enrollment.lmsStatus)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onAction(enrollment.id, 'view')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(enrollment.id, 'lms')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Accéder au LMS
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnrollmentsTable;
