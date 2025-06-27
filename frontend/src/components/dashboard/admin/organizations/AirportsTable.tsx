
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
  Edit,
  Building,
  Check,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface Airport {
  id: string;
  name: string;
  code: string;
  location: string;
  contactName: string;
  email: string;
  status: string;
  affiliatedCompaniesCount: number;
}

interface AirportsTableProps {
  airports: Airport[];
  onAction: (id: string, action: string) => void;
}

const AirportsTable: React.FC<AirportsTableProps> = ({ airports, onAction }) => {
  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-500">Inactif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">En attente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aéroport</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Entreprises</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {airports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Aucun aéroport trouvé
              </TableCell>
            </TableRow>
          ) : (
            airports.map((airport) => (
              <TableRow key={airport.id}>
                <TableCell>
                  <div className="font-medium">{airport.name}</div>
                  <div className="text-sm text-muted-foreground">{airport.code}</div>
                </TableCell>
                <TableCell>{airport.location}</TableCell>
                <TableCell>
                  <div>{airport.contactName}</div>
                  <div className="text-sm text-muted-foreground">{airport.email}</div>
                </TableCell>
                <TableCell>{airport.affiliatedCompaniesCount} entreprises</TableCell>
                <TableCell>{getStatusBadge(airport.status)}</TableCell>
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
                      <DropdownMenuItem onClick={() => onAction(airport.id, 'edit')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(airport.id, 'companies')}>
                        <Building className="h-4 w-4 mr-2" />
                        Gérer entreprises
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {airport.status === 'pending' ? (
                        <>
                          <DropdownMenuItem onClick={() => onAction(airport.id, 'approve')}>
                            <Check className="h-4 w-4 mr-2" />
                            Approuver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAction(airport.id, 'reject')}>
                            <X className="h-4 w-4 mr-2" />
                            Rejeter
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem onClick={() => onAction(airport.id, airport.status === 'active' ? 'deactivate' : 'activate')}>
                          {airport.status === 'active' ? (
                            <>
                              <X className="h-4 w-4 mr-2" />
                              Désactiver
                            </>
                          ) : (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Activer
                            </>
                          )}
                        </DropdownMenuItem>
                      )}
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

export default AirportsTable;
