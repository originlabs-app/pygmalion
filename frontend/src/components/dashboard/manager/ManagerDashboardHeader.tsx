
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Users, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User as UserType } from '@/types';

interface ManagerDashboardHeaderProps {
  currentUser: UserType;
}

const ManagerDashboardHeader: React.FC<ManagerDashboardHeaderProps> = ({ currentUser }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Tableau de Bord Entreprise</h1>
        <p className="text-muted-foreground">
          Bienvenue, {currentUser.firstName} {currentUser.lastName} ({currentUser.organization})
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2 flex-wrap">
        <Button variant="outline" asChild size="sm">
          <Link to="/manage-team">
            <Users className="h-4 w-4 mr-2" />
            Gérer Mon Équipe
          </Link>
        </Button>
        <Button variant="outline" asChild size="sm">
          <Link to="/manager/settings">
            <User className="h-4 w-4 mr-2" />
            Profil Entreprise
          </Link>
        </Button>
        <Button variant="outline" asChild size="sm">
          <Link to="/certificates">
            <FileText className="h-4 w-4 mr-2" />
            Certifications
          </Link>
        </Button>
        <Button variant="outline" asChild size="sm">
          <Link to="/airport-affiliation">
            <MapPin className="h-4 w-4 mr-2" />
            Affiliation Aéroport
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/courses">
            Trouver des Formations
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ManagerDashboardHeader;
