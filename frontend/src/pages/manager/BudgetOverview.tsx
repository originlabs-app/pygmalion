import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  Download,
  Plus,
  Target,
  CreditCard,
  Euro,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  GraduationCap,
  Building,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BudgetOverview = () => {
  const { currentUser } = useAuth();
  const [periodFilter, setPeriodFilter] = useState<string>('2025');

  // Données budgétaires principales
  const budgetData = {
    allocated: 50000, // Budget alloué par le superviseur
    used: 34500,
    remaining: 15500,
    percentage: 69,
    trend: 'up',
    monthlyTrend: 8.5
  };

  // Répartition par catégories de formation
  const categoryBudgets = [
    {
      id: '1',
      name: 'Sécurité & Sûreté',
      allocated: 20000,
      used: 14500,
      percentage: 72.5,
      trainingCount: 12,
      employeeCount: 8,
      priority: 'high',
      compliance: true
    },
    {
      id: '2',
      name: 'Réglementation',
      allocated: 15000,
      used: 9800,
      percentage: 65.3,
      trainingCount: 6,
      employeeCount: 5,
      priority: 'high',
      compliance: true
    },
    {
      id: '3',
      name: 'Technique & Équipement',
      allocated: 8000,
      used: 5200,
      percentage: 65,
      trainingCount: 4,
      employeeCount: 4,
      priority: 'medium',
      compliance: false
    },
    {
      id: '4',
      name: 'Communication',
      allocated: 4000,
      used: 2800,
      percentage: 70,
      trainingCount: 3,
      employeeCount: 3,
      priority: 'medium',
      compliance: true
    }
  ];

  // Transactions récentes
  const recentTransactions = [
    {
      id: '1',
      date: '2025-01-20',
      description: 'Formation Matières Dangereuses ADR',
      employee: 'Sarah Martin',
      amount: 850,
      status: 'completed',
      category: 'Réglementation',
      trainingOrg: 'IATA Training Center'
    },
    {
      id: '2',
      date: '2025-01-18',
      description: 'Renouvellement Sûreté Aéroportuaire',
      employee: 'Marc Dubois',
      amount: 420,
      status: 'pending',
      category: 'Sécurité & Sûreté',
      trainingOrg: 'DGAC Formation'
    },
    {
      id: '3',
      date: '2025-01-15',
      description: 'Radiotelephonie Niveau 2',
      employee: 'Julie Rousseau',
      amount: 650,
      status: 'approved',
      category: 'Communication',
      trainingOrg: 'Aero Training Solutions'
    }
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'approved': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'airport_manager')) {
    return (
      <ManagerLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Formation - Vue d'Ensemble</h1>
            <p className="text-gray-600">
              Suivi et contrôle du budget formation alloué par votre superviseur
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="Q1-2025">Q1 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" asChild>
              <Link to="/manager/budget/allocation">
                <Plus className="h-4 w-4 mr-2" />
                Planifier
              </Link>
            </Button>
          </div>
        </div>

        {/* KPIs Principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Alloué</p>
                  <p className="text-3xl font-bold text-blue-600">{formatPrice(budgetData.allocated)}</p>
                  <p className="text-xs text-gray-500 mt-1">Par superviseur</p>
                </div>
                <Building className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Utilisé</p>
                  <p className="text-3xl font-bold text-orange-600">{formatPrice(budgetData.used)}</p>
                  <p className="text-xs text-orange-600 mt-1">+{budgetData.monthlyTrend}% ce mois</p>
                </div>
                <CreditCard className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Restant</p>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(budgetData.remaining)}</p>
                  <p className="text-xs text-gray-500 mt-1">{100 - budgetData.percentage}% disponible</p>
                </div>
                <Euro className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taux d'Utilisation</p>
                  <p className="text-3xl font-bold text-purple-600">{budgetData.percentage}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${budgetData.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <BarChart3 className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerte Budget */}
        {budgetData.percentage > 65 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-orange-900">Alerte Budgétaire</h4>
                  <p className="text-sm text-orange-700">
                    Vous avez utilisé {budgetData.percentage}% de votre budget annuel. 
                    Planifiez vos prochaines formations.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="border-orange-300" asChild>
                  <Link to="/manager/budget/allocation">
                    Planifier
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Répartition par Catégorie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Répartition Budget par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {categoryBudgets.map((category) => (
                <div key={category.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <Badge className={getPriorityColor(category.priority)}>
                        {category.priority === 'high' && 'Priorité Haute'}
                        {category.priority === 'medium' && 'Priorité Moyenne'}
                        {category.priority === 'low' && 'Priorité Faible'}
                      </Badge>
                      {category.compliance && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Obligatoire
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatPrice(category.used)}</div>
                      <div className="text-sm text-gray-500">/ {formatPrice(category.allocated)}</div>
                    </div>
                  </div>
                  
                  <Progress value={category.percentage} className="h-3" />
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{category.percentage.toFixed(1)}% utilisé</span>
                    <span>{category.trainingCount} formations • {category.employeeCount} employés</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transactions Récentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Transactions Récentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-gray-600">{transaction.employee} • {formatDate(transaction.date)}</div>
                    <div className="text-xs text-gray-500">{transaction.trainingOrg}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatPrice(transaction.amount)}</div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status === 'completed' && 'Terminé'}
                      {transaction.status === 'approved' && 'Approuvé'}
                      {transaction.status === 'pending' && 'En attente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default BudgetOverview;
