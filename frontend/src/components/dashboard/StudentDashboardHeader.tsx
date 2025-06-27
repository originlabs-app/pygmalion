
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Book, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/types';

interface StudentDashboardHeaderProps {
  currentUser: User;
}

const StudentDashboardHeader: React.FC<StudentDashboardHeaderProps> = ({ currentUser }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue, {currentUser.firstName} {currentUser.lastName}
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/certificates">
            <Award className="h-4 w-4 mr-2" />
            Mes Certificats
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/profile">
            <UserRound className="h-4 w-4 mr-2" />
            Mon Profil
          </Link>
        </Button>
        <Button asChild>
          <Link to="/courses">
            <Book className="h-4 w-4 mr-2" />
            Trouver des Formations
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboardHeader;
