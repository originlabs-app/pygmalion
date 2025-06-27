
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface UserFiltersProps {
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 border rounded-lg bg-muted/20">
      <div className="w-full md:w-64">
        <label className="text-sm font-medium block mb-2">Rôle</label>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les rôles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="student">Apprenant</SelectItem>
            <SelectItem value="training-org">Organisme Formation</SelectItem>
            <SelectItem value="manager">Manager Entreprise</SelectItem>
            <SelectItem value="airport-manager">Gestionnaire Aéroport</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-64">
        <label className="text-sm font-medium block mb-2">Statut</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="inactive">Inactif</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UserFilters;
