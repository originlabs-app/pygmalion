
import React from 'react';
import { AlertTriangle, FileText, CalendarX, Calendar } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Mock compliance data
const COMPLIANCE_CATEGORIES = [
  { 
    id: '1', 
    name: 'Sécurité sur Piste', 
    status: 'success', 
    compliance: '100%', 
    message: 'Toutes les certifications valides' 
  },
  { 
    id: '2', 
    name: 'Marchandises Dangereuses', 
    status: 'warning', 
    compliance: '80%', 
    message: '1 certification expire dans 30 jours' 
  },
  { 
    id: '3', 
    name: 'Sûreté Aéroportuaire', 
    status: 'danger', 
    compliance: '60%', 
    message: '2 certifications expirées' 
  },
  { 
    id: '4', 
    name: 'Gestion des Situations d\'Urgence', 
    status: 'success', 
    compliance: '100%', 
    message: 'Toutes les certifications valides' 
  },
];

const ComplianceStatus = () => {
  const { toast } = useToast();
  
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Certification ajoutée",
      description: "La certification a été ajoutée avec succès."
    });
    
    // In a real app, we would close the dialog and update the data
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'success': return 'border-green-500 text-green-500';
      case 'warning': return 'border-yellow-500 text-yellow-500';
      case 'danger': return 'border-red-500 text-red-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <DashboardCard 
        title="État de Conformité" 
        description="Vue d'ensemble de la conformité des formations par catégorie"
        action={
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Ajouter une Certification
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une Certification Existante</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCertificate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="member">Membre de l'Équipe</Label>
                  <select className="w-full rounded-md border border-input px-3 py-2">
                    <option value="">Sélectionnez un membre</option>
                    <option value="1">John Doe</option>
                    <option value="2">Sarah Smith</option>
                    <option value="3">Michael Johnson</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certification">Nom de la Certification</Label>
                  <Input id="certification" placeholder="Ex: Sécurité sur Piste" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Organisme Émetteur</Label>
                  <Input id="provider" placeholder="Ex: DGAC, IATA, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Date d'Obtention</Label>
                    <Input id="issueDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Date d'Expiration</Label>
                    <Input id="expiryDate" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fileUpload">Preuve (Optionnel)</Label>
                  <Input id="fileUpload" type="file" />
                </div>
                <Button type="submit" className="w-full mt-4">Ajouter la Certification</Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      >
        <div className="space-y-4">
          <div className="p-4 border rounded-md bg-yellow-50">
            <div className="flex items-center gap-2 text-yellow-600 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Alertes de Conformité</span>
            </div>
            <p className="text-sm">3 membres de votre équipe ont des certifications qui expirent bientôt ou sont déjà expirées.</p>
          </div>
          
          {COMPLIANCE_CATEGORIES.map(category => (
            <div key={category.id} className="p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {category.message}
                  </p>
                </div>
                <div className={`size-16 rounded-full flex items-center justify-center border-4 font-bold text-lg ${getStatusColor(category.status)}`}>
                  {category.compliance}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t flex justify-between">
                <Button variant="link" className="p-0 h-auto">
                  <FileText className="h-4 w-4 mr-1" />
                  Voir les certifications
                </Button>
                {category.status === 'warning' || category.status === 'danger' ? (
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Planifier une formation
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
          
          <div className="p-4 border rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <CalendarX className="h-5 w-5 text-red-500" />
              <span className="font-medium">Certificats expirés</span>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-red-50 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="text-sm text-muted-foreground">Sûreté Aéroportuaire - Expiré depuis 45 jours</div>
                </div>
                <Button size="sm">Renouveler</Button>
              </div>
              <div className="p-2 bg-red-50 rounded flex justify-between items-center">
                <div>
                  <div className="font-medium">Thomas Wilson</div>
                  <div className="text-sm text-muted-foreground">Marchandises Dangereuses - Expiré depuis 15 jours</div>
                </div>
                <Button size="sm">Renouveler</Button>
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard 
        title="Affiliation Aéroport" 
        description="Sites d'exploitation auxquels votre entreprise est affiliée"
      >
        <div className="space-y-4">
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <div className="font-medium">Paris-Charles de Gaulle (CDG)</div>
              <div className="text-sm text-muted-foreground">10 membres d'équipe affiliés</div>
            </div>
            <Button variant="outline" size="sm">Gérer l'affiliation</Button>
          </div>
          
          <div className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <div className="font-medium">Paris-Orly (ORY)</div>
              <div className="text-sm text-muted-foreground">5 membres d'équipe affiliés</div>
            </div>
            <Button variant="outline" size="sm">Gérer l'affiliation</Button>
          </div>
          
          <Button className="w-full">Ajouter une Affiliation Aéroport</Button>
        </div>
      </DashboardCard>
    </div>
  );
};

export default ComplianceStatus;
