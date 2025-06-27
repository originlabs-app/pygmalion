
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CertificationData {
  id: string;
  employee: string;
  company: string;
  type: string;
  expiryDate: string;
  daysLeft: number;
  status: 'critical' | 'warning' | 'ok';
}

interface CertificationsTableProps {
  certifications: CertificationData[];
  onNotify?: (certification: CertificationData) => void;
}

const CertificationsTable: React.FC<CertificationsTableProps> = ({
  certifications,
  onNotify
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge variant="destructive">Critique</Badge>;
      case 'warning':
        return <Badge variant="secondary">Attention</Badge>;
      case 'ok':
        return <Badge variant="success">Valide</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employé</TableHead>
            <TableHead>Entreprise</TableHead>
            <TableHead>Type de certification</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certifications.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell className="font-medium">{cert.employee}</TableCell>
              <TableCell>{cert.company}</TableCell>
              <TableCell>{cert.type}</TableCell>
              <TableCell>
                {new Date(cert.expiryDate).toLocaleDateString()}
                <br />
                <span className="text-xs text-muted-foreground">
                  {cert.daysLeft > 0 
                    ? `Expire dans ${cert.daysLeft} jours`
                    : `Expiré depuis ${Math.abs(cert.daysLeft)} jours`
                  }
                </span>
              </TableCell>
              <TableCell>{getStatusBadge(cert.status)}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onNotify && onNotify(cert)}
                >
                  Notifier
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CertificationsTable;
