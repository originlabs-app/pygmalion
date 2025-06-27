import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrganizationsTable from './OrganizationsTable';
import AirportsTable from './AirportsTable';
import TrainingOrganizationsTable from './TrainingOrganizationsTable';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
import { mockOrganizations, mockAirports } from '@/data/mockAdminData';

const OrganizationsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Filter organizations based on search term
  const filteredOrgs = mockOrganizations.filter(org => 
    searchTerm === '' ||
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter airports based on search term
  const filteredAirports = mockAirports.filter(airport => 
    searchTerm === '' ||
    airport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (id: string, type: string, action: string) => {
    toast({
      title: `Action ${action}`,
      description: `Action ${action} effectuée sur ${type} ${id}`,
    });
  };

  return (
    <Card className="p-6">
      <Tabs defaultValue="training-orgs" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="training-orgs">Organismes Formation</TabsTrigger>
            <TabsTrigger value="companies">Entreprises</TabsTrigger>
            <TabsTrigger value="airports">Aéroports</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="training-orgs">
          <TrainingOrganizationsTable />
        </TabsContent>
        
        <TabsContent value="companies">
          <OrganizationsTable 
            organizations={filteredOrgs} 
            onAction={(id, action) => handleAction(id, 'organization', action)} 
          />
        </TabsContent>
        
        <TabsContent value="airports">
          <AirportsTable 
            airports={filteredAirports} 
            onAction={(id, action) => handleAction(id, 'airport', action)}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default OrganizationsList;
