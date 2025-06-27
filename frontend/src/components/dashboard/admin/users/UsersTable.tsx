
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  MoreHorizontal, 
  Edit, 
  Lock, 
  Mail,
  User,
  Building
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UserDetailDialog from './UserDetailDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  organization?: string;
  status: string;
}

interface UsersTableProps {
  users: User[];
  onAction: (userId: string, action: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onAction }) => {
  // Helper function to get role display name
  const getRoleDisplay = (role: string) => {
    const roleMap: Record<string, string> = {
      'student': 'Apprenant',
      'training-org': 'Organisme Formation',
      'manager': 'Manager Entreprise',
      'airport-manager': 'Gestionnaire Aéroport',
      'admin': 'Administrateur'
    };
    return roleMap[role] || role;
  };
  
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
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Aucun utilisateur trouvé
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleDisplay(user.role)}</TableCell>
                <TableCell>{user.organization || '-'}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DialogTrigger asChild>
                          <DropdownMenuItem className="flex gap-2">
                            <User className="h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => onAction(user.id, 'edit')}
                          className="flex gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onAction(user.id, 'reset-password')}
                          className="flex gap-2"
                        >
                          <Lock className="h-4 w-4" />
                          Réinitialiser mot de passe
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onAction(user.id, 'affiliate')}
                          className="flex gap-2"
                        >
                          <Building className="h-4 w-4" />
                          Gérer affiliations
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
                          className="flex gap-2"
                          disabled={user.role === 'admin'} // Prevent deactivation of admin accounts
                        >
                          <Mail className="h-4 w-4" />
                          {user.status === 'active' ? 'Désactiver' : 'Activer'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <UserDetailDialog user={user} onAction={onAction} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
