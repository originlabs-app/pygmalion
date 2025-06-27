
import React from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Building, 
  Calendar, 
  Shield 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface UserDetailProps {
  user: any; // Using any type for simplicity, would be User type in full implementation
  onAction: (userId: string, action: string) => void;
}

const UserDetailDialog: React.FC<UserDetailProps> = ({ user, onAction }) => {
  // Mock data for user details that would come from API in real app
  const userDetails = {
    ...user,
    createdAt: new Date('2025-02-15'),
    lastLogin: new Date('2025-05-01'),
    enrollments: 3,
    certifications: 2
  };

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
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl">Profil Utilisateur</DialogTitle>
        <DialogDescription>
          Détails et actions pour cet utilisateur.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{userDetails.name}</h3>
          {getStatusBadge(userDetails.status)}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{userDetails.email}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span>Rôle: {getRoleDisplay(userDetails.role)}</span>
          </div>
          
          {userDetails.organization && (
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>Organisation: {userDetails.organization}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Inscrit il y a {formatDistanceToNow(userDetails.createdAt, { locale: fr })}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Dernière connexion il y a {formatDistanceToNow(userDetails.lastLogin, { locale: fr })}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-muted/30 p-3 rounded text-center">
            <div className="text-2xl font-bold">{userDetails.enrollments}</div>
            <div className="text-xs text-muted-foreground">Inscriptions</div>
          </div>
          <div className="bg-muted/30 p-3 rounded text-center">
            <div className="text-2xl font-bold">{userDetails.certifications}</div>
            <div className="text-xs text-muted-foreground">Certifications</div>
          </div>
        </div>
      </div>

      <DialogFooter className="flex-col sm:flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1" 
            variant="outline"
            onClick={() => onAction(user.id, 'edit')}
          >
            Modifier
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onAction(user.id, 'reset-password')}
          >
            Réinitialiser Mot de Passe
          </Button>
        </div>
        
        <Button 
          variant={user.status === 'active' ? 'destructive' : 'default'}
          className="w-full"
          onClick={() => onAction(user.id, user.status === 'active' ? 'deactivate' : 'activate')}
          disabled={user.role === 'admin'} // Prevent deactivation of admin accounts
        >
          {user.status === 'active' ? 'Désactiver Compte' : 'Activer Compte'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default UserDetailDialog;
