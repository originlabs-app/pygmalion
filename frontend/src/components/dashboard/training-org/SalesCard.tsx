
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, CalendarDays } from 'lucide-react';

interface SalesCardProps {
  totalEarnings: number;
  enrollmentGrowth: number;
}

const SalesCard: React.FC<SalesCardProps> = ({ totalEarnings, enrollmentGrowth }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">Revenu total</h3>
              {enrollmentGrowth > 0 ? (
                <div className="flex items-center text-xs text-green-500 font-medium">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {enrollmentGrowth}%
                </div>
              ) : enrollmentGrowth < 0 ? (
                <div className="flex items-center text-xs text-red-500 font-medium">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {Math.abs(enrollmentGrowth)}%
                </div>
              ) : null}
            </div>
            <div className="text-2xl font-bold">{formatPrice(totalEarnings)}</div>
            <p className="text-xs text-muted-foreground">
              Par rapport au mois précédent
            </p>
          </div>
          
          <div className="border-l pl-6 hidden md:block">
            <div className="space-y-4">
              <div className="flex gap-2 items-start">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Période active</div>
                  <div className="text-xs text-muted-foreground">Ce mois</div>
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <div className="p-2 bg-blue-100 rounded-md">
                  <CalendarDays className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-medium">Tableau de bord complet</div>
                  <Link to="/training-org/sales" className="text-xs text-primary hover:underline">
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesCard;
