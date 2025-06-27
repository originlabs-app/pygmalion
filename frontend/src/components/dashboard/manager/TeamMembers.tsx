
import React, { useState } from 'react';
import { Users, UserPlus, Calendar, Check, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock team members data for demonstration
const DEMO_TEAM_MEMBERS = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', position: 'Pilote', status: 'valid' },
  { id: '2', name: 'Sarah Smith', email: 'sarah.smith@example.com', position: 'Agent d\'escale', status: 'warning' },
  { id: '3', name: 'Michael Johnson', email: 'michael.j@example.com', position: 'Mécanicien', status: 'danger' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@example.com', position: 'Agent de sûreté', status: 'valid' },
  { id: '5', name: 'Thomas Wilson', email: 'thomas.w@example.com', position: 'Contrôleur aérien', status: 'warning' }
];

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState(DEMO_TEAM_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberPosition, setNewMemberPosition] = useState('');
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    if (!newMemberName || !newMemberEmail) return;
    
    const newMember = {
      id: String(Date.now()),
      name: newMemberName,
      email: newMemberEmail,
      position: newMemberPosition,
      status: 'valid'
    };
    
    setTeamMembers(prev => [...prev, newMember]);
    
    // Reset form
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberPosition('');
    setOpen(false);
    
    toast({
      title: "Membre ajouté",
      description: `${newMemberName} a été ajouté à votre équipe.`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'valid':
        return <Badge className="bg-green-500">Certifications valides</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500">Certification à renouveler</Badge>;
      case 'danger':
        return <Badge className="bg-red-500">Certification expirée</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <DashboardCard
        title="Membres de l'Équipe"
        description="Gérez les membres de votre équipe et consultez leur statut de formation"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Ajouter un Membre
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un Membre à l'Équipe</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    value={newMemberName} 
                    onChange={e => setNewMemberName(e.target.value)} 
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={newMemberEmail} 
                    onChange={e => setNewMemberEmail(e.target.value)} 
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Poste / Fonction</Label>
                  <Input 
                    id="position" 
                    value={newMemberPosition} 
                    onChange={e => setNewMemberPosition(e.target.value)} 
                    placeholder="Pilote, Agent d'escale, etc."
                  />
                </div>
                <Button className="w-full mt-4" onClick={handleAddMember}>
                  Ajouter le Membre
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Rechercher un membre de l'équipe..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map(member => (
            <div key={member.id} className="p-4 border rounded-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">{member.email}</div>
                  <div className="text-sm mt-1">{member.position}</div>
                </div>
                <div className="flex flex-col items-end">
                  {getStatusBadge(member.status)}
                </div>
              </div>
              <div className="mt-4 pt-2 border-t flex justify-between items-center">
                <Button variant="link" className="p-0 h-auto">
                  <Check className="h-4 w-4 mr-1" />
                  Certifications
                </Button>
                <Button variant="link" className="p-0 h-auto">
                  <Calendar className="h-4 w-4 mr-1" />
                  Formations
                </Button>
              </div>
            </div>
          ))}
          
          {filteredMembers.length === 0 && (
            <div className="col-span-full text-center p-8 border rounded-md">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Aucun membre trouvé pour cette recherche</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Voir tous les membres
          </Button>
          <Button variant="outline" size="sm">
            Importer une liste (Excel)
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default TeamMembers;
