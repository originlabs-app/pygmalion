
import React, { useState } from 'react';
import { Search, Filter, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EnrollmentsTable from '@/components/dashboard/EnrollmentsTable';
import { Enrollment } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TrainingActivityProps {
  activeEnrollments: Enrollment[];
  upcomingEnrollments: Enrollment[];
}

const TrainingActivity: React.FC<TrainingActivityProps> = ({ 
  activeEnrollments, 
  upcomingEnrollments 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showPendingRequests, setShowPendingRequests] = useState(false);
  
  const allEnrollments = [...activeEnrollments, ...upcomingEnrollments];
  
  // In a real app, we would filter based on multiple criteria
  const filteredEnrollments = allEnrollments.filter(enrollment => {
    if (statusFilter !== 'all' && enrollment.status !== statusFilter) {
      return false;
    }
    
    // Here we would typically search by student name, course name, etc.
    // For demo purposes, we'll just return true
    return true;
  });
  
  return (
    <div className="space-y-6">
      {/* Pending Approval Requests - Would be populated from real data */}
      {showPendingRequests && (
        <DashboardCard
          title="Demandes en Attente d'Approbation"
          description="Demandes d'inscription en attente de votre validation"
        >
          <div className="space-y-4">
            <div className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">Formation: Sécurité sur Piste</div>
                <div className="text-sm">Session: 15-16 juin 2025</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Rejeter
                </Button>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  Approuver
                </Button>
              </div>
            </div>
            
            <div className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <div className="font-medium">Sarah Smith</div>
                <div className="text-sm text-muted-foreground">Formation: Traitement des Marchandises Dangereuses</div>
                <div className="text-sm">Session: 20-22 mai 2025</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                  Rejeter
                </Button>
                <Button size="sm" className="bg-green-500 hover:bg-green-600">
                  Approuver
                </Button>
              </div>
            </div>
          </div>
        </DashboardCard>
      )}
      
      {/* Team Training Activity */}
      <DashboardCard 
        title="Activité de Formation de l'Équipe" 
        description="Inscriptions récentes et à venir pour votre équipe"
        action={
          <Button size="sm" asChild>
            <a href="/courses">
              <Calendar className="h-4 w-4 mr-2" />
              Inscrire mon Équipe
            </a>
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Rechercher une formation ou un apprenant..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="approved">En cours</SelectItem>
                  <SelectItem value="pending">À venir</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="icon" onClick={() => setShowPendingRequests(!showPendingRequests)}>
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          
          <EnrollmentsTable 
            enrollments={filteredEnrollments} 
            showStudentInfo={true}
          />
        </div>
      </DashboardCard>
    </div>
  );
};

export default TrainingActivity;
