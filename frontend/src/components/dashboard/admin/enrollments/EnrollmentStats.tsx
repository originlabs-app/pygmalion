
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart2, TrendingUp, Users, Calendar } from 'lucide-react';

const EnrollmentStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inscriptions Totales</p>
              <h3 className="text-2xl font-bold mt-1">1,245</h3>
            </div>
            <div className="p-4 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+8%</span>
            <span className="ml-1">depuis le mois dernier</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inscriptions ce Mois</p>
              <h3 className="text-2xl font-bold mt-1">246</h3>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-full">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+12%</span>
            <span className="ml-1">depuis le mois dernier</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taux de Complétion</p>
              <h3 className="text-2xl font-bold mt-1">78%</h3>
            </div>
            <div className="p-4 bg-green-500/10 rounded-full">
              <BarChart2 className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+4%</span>
            <span className="ml-1">depuis le mois dernier</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Apprenants Actifs</p>
              <h3 className="text-2xl font-bold mt-1">843</h3>
            </div>
            <div className="p-4 bg-purple-500/10 rounded-full">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
            <span className="text-green-500 font-medium">+6%</span>
            <span className="ml-1">depuis le mois dernier</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentStats;
