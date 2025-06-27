
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
  Check,
  X,
  Users,
  MapPin
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface Organization {
  id: string;
  name: string;
  contactName: string;
  email: string;
  status: string;
  affiliatedAirports?: string[];
  employeesCount: number;
  verificationType?: string;
}

interface OrganizationsTableProps {
  organizations: Organization[];
  onAction: (id: string, action: string) => void;
}

const OrganizationsTable: React.FC<OrganizationsTableProps> = ({ organizations, onAction }) => {
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

  // Helper for verification type
  const getVerificationBadge = (type?: string) => {
    if (!type) return null;
    
    switch (type) {
      case 'kyb':
        return <Badge className="bg-blue-500">KYB</Badge>;
      case 'simple':
        return <Badge variant="outline">Simple</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Employés</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Affiliations</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Aucune entreprise trouvée
              </TableCell>
            </TableRow>
          ) : (
            organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div className="font-medium">{org.name}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {getVerificationBadge(org.verificationType)}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{org.contactName}</div>
                  <div className="text-sm text-muted-foreground">{org.email}</div>
                </TableCell>
                <TableCell>{org.employeesCount}</TableCell>
                <TableCell>{getStatusBadge(org.status)}</TableCell>
                <TableCell>
                  {org.affiliatedAirports && org.affiliatedAirports.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {org.affiliatedAirports.map((airport, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {airport}
                        </Badge>
                      ))}
                      {org.affiliatedAirports.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{org.affiliatedAirports.length - 2}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Non affilié</span>
                  )}
                </TableCell>
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
                      <DropdownMenuItem onClick={() => onAction(org.id, 'edit')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(org.id, 'members')}>
                        <Users className="h-4 w-4 mr-2" />
                        Gérer employés
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction(org.id, 'airports')}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Affiliations aéroport
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {org.status === 'pending' ? (
                        <>
                          <DropdownMenuItem onClick={() => onAction(org.id, 'approve')}>
                            <Check className="h-4 w-4 mr-2" />
                            Approuver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onAction(org.id, 'reject')}>
                            <X className="h-4 w-4 mr-2" />
                            Rejeter
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem onClick={() => onAction(org.id, org.status === 'active' ? 'deactivate' : 'activate')}>
                          {org.status === 'active' ? (
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

export default OrganizationsTable;
