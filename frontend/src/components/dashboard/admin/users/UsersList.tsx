
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UsersTable from './UsersTable';
import UserFilters from './UserFilters';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
import { mockUsers } from '@/data/mockAdminData';

interface UsersListProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();
  
  // Filter users based on search term and filters
  const filteredUsers = mockUsers.filter(user => {
    // Filter by search term
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by role
    if (roleFilter !== 'all' && user.role !== roleFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && user.status !== statusFilter) {
      return false;
    }
    
    return true;
  });

  const handleUserAction = (userId: string, action: string) => {
    toast({
      title: `Action ${action}`,
      description: `Action ${action} effectuée sur l'utilisateur ${userId}`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full md:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>
      
      {showFilters && (
        <UserFilters
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      )}
      
      <UsersTable users={filteredUsers} onAction={handleUserAction} />
    </Card>
  );
};

export default UsersList;
