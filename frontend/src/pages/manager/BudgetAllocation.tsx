import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  PieChart,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Euro,
  Building,
  Send,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BudgetAllocation = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [showAddAllocation, setShowAddAllocation] = useState(false);
  const [showBudgetRequest, setShowBudgetRequest] = useState(false);

  // Lignes budgétaires actuelles
  const budgetLines = [
    {
      id: '1',
      category: 'Sécurité & Sûreté',
      allocated: 20000,
      used: 14500,
      reserved: 3000,
      available: 2500,
      percentage: 72.5,
      trainingCount: 12,
      employeeCount: 8,
      priority: 'high',
      status: 'active',
      nextDeadline: '2025-02-15'
    },
    {
      id: '2',
      category: 'Réglementation',
      allocated: 15000,
      used: 9800,
      reserved: 2200,
      available: 3000,
      percentage: 65.3,
      trainingCount: 6,
      employeeCount: 5,
      priority: 'high',
      status: 'active',
      nextDeadline: '2025-01-30'
    },
    {
      id: '3',
      category: 'Technique & Équipement',
      allocated: 8000,
      used: 5200,
      reserved: 1800,
      available: 1000,
      percentage: 65,
      trainingCount: 4,
      employeeCount: 4,
      priority: 'medium',
      status: 'active',
      nextDeadline: '2025-03-10'
    },
    {
      id: '4',
      category: 'Communication',
      allocated: 4000,
      used: 2800,
      reserved: 800,
      available: 400,
      percentage: 70,
      trainingCount: 3,
      employeeCount: 3,
      priority: 'medium',
      status: 'active',
      nextDeadline: '2025-02-28'
    },
    {
      id: '5',
      category: 'Management & Soft Skills',
      allocated: 3000,
      used: 2200,
      reserved: 0,
      available: 800,
      percentage: 73.3,
      trainingCount: 2,
      employeeCount: 2,
      priority: 'low',
      status: 'active',
      nextDeadline: '2025-04-15'
    }
  ];

  // Formations plannifiées
  const plannedTrainings = [
    {
      id: '1',
      title: 'Renouvellement Sûreté Aéroportuaire',
      category: 'Sécurité & Sûreté',
      employee: 'Marc Dubois',
      estimatedCost: 420,
      plannedDate: '2025-01-30',
      provider: 'DGAC Formation',
      status: 'urgent',
      justification: 'Certification expirée depuis 15 jours'
    },
    {
      id: '2',
      title: 'Formation Matières Dangereuses Niveau 2',
      category: 'Réglementation',
      employee: 'Sarah Martin',
      estimatedCost: 950,
      plannedDate: '2025-02-10',
      provider: 'IATA Training Center',
      status: 'planned',
      justification: 'Évolution de poste vers superviseur'
    },
    {
      id: '3',
      title: 'Certification Équipement Handling',
      category: 'Technique & Équipement',
      employee: 'Pierre Laurent',
      estimatedCost: 1200,
      plannedDate: '2025-02-15',
      provider: 'CDG Training Academy',
      status: 'requested',
      justification: 'Nouvel équipement sur la zone'
    },
    {
      id: '4',
      title: 'Formation Management d\'Équipe',
      category: 'Management & Soft Skills',
      employee: 'Amélie Moreau',
      estimatedCost: 800,
      plannedDate: '2025-03-01',
      provider: 'Air France Academy',
      status: 'planned',
      justification: 'Évolution vers poste de coordinatrice'
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
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'planned': return 'text-blue-600 bg-blue-100';
      case 'requested': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddAllocation = () => {
    toast({
      title: "Ligne budgétaire ajoutée",
      description: "La nouvelle allocation a été créée avec succès.",
    });
    setShowAddAllocation(false);
  };

  const handleRequestBudget = () => {
    toast({
      title: "Demande envoyée",
      description: "Votre demande de budget supplémentaire a été transmise au superviseur.",
    });
    setShowBudgetRequest(false);
  };

  const handleValidateTraining = (trainingId: string) => {
    toast({
      title: "Formation validée",
      description: "La formation a été approuvée et le budget réservé.",
    });
  };

  const totalBudget = budgetLines.reduce((sum, line) => sum + line.allocated, 0);
  const totalUsed = budgetLines.reduce((sum, line) => sum + line.used, 0);
  const totalReserved = budgetLines.reduce((sum, line) => sum + line.reserved, 0);
  const totalAvailable = budgetLines.reduce((sum, line) => sum + line.available, 0);

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
            <h1 className="text-3xl font-bold text-gray-900">Allocation Budget Formation</h1>
            <p className="text-gray-600">
              Planification et répartition de votre budget par catégories et formations
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showBudgetRequest} onOpenChange={setShowBudgetRequest}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Demander Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Demande de Budget Supplémentaire</DialogTitle>
                  <DialogDescription>
                    Envoyez une demande motivée à votre superviseur
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="amount">Montant demandé</Label>
                    <Input placeholder="ex: 15000" />
                  </div>
                  <div>
                    <Label htmlFor="justification">Justification</Label>
                    <Textarea placeholder="Expliquez les besoins en formation pour votre équipe..." />
                  </div>
                  <div>
                    <Label htmlFor="category">Catégorie prioritaire</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Sécurité & Sûreté</SelectItem>
                        <SelectItem value="regulation">Réglementation</SelectItem>
                        <SelectItem value="technical">Technique & Équipement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowBudgetRequest(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleRequestBudget}>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer Demande
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showAddAllocation} onOpenChange={setShowAddAllocation}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Ligne
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter une Ligne Budgétaire</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle allocation pour une catégorie spécifique
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quality">Qualité & Certification</SelectItem>
                        <SelectItem value="digital">Digital & Innovation</SelectItem>
                        <SelectItem value="languages">Langues</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="amount">Montant alloué</Label>
                    <Input placeholder="ex: 5000" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priorité</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="low">Faible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Objectifs et besoins pour cette allocation..." />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddAllocation(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddAllocation}>
                    Créer Allocation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Vue d'ensemble Budget */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Total</p>
                  <p className="text-3xl font-bold text-blue-600">{formatPrice(totalBudget)}</p>
                </div>
                <Building className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Utilisé</p>
                  <p className="text-3xl font-bold text-orange-600">{formatPrice(totalUsed)}</p>
                  <p className="text-xs text-gray-500">{Math.round(totalUsed/totalBudget*100)}%</p>
                </div>
                <Euro className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Réservé</p>
                  <p className="text-3xl font-bold text-purple-600">{formatPrice(totalReserved)}</p>
                  <p className="text-xs text-gray-500">{Math.round(totalReserved/totalBudget*100)}%</p>
                </div>
                <Calendar className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Disponible</p>
                  <p className="text-3xl font-bold text-green-600">{formatPrice(totalAvailable)}</p>
                  <p className="text-xs text-gray-500">{Math.round(totalAvailable/totalBudget*100)}%</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Lignes Budgétaires - 2/3 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Lignes Budgétaires par Catégorie
                </CardTitle>
                <CardDescription>
                  Allocation détaillée et utilisation par domaine de formation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetLines.map((line) => (
                    <div key={line.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900">{line.category}</h4>
                          <Badge className={getPriorityColor(line.priority)}>
                            {line.priority === 'high' && 'Priorité Haute'}
                            {line.priority === 'medium' && 'Priorité Moyenne'}
                            {line.priority === 'low' && 'Priorité Faible'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{formatPrice(line.allocated)}</div>
                          <div className="text-xs text-gray-600">Alloué</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">{formatPrice(line.used)}</div>
                          <div className="text-xs text-gray-600">Utilisé</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{formatPrice(line.reserved)}</div>
                          <div className="text-xs text-gray-600">Réservé</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">{formatPrice(line.available)}</div>
                          <div className="text-xs text-gray-600">Disponible</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Taux d'utilisation</span>
                          <span className="font-medium">{line.percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={line.percentage} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{line.trainingCount} formations • {line.employeeCount} employés</span>
                          <span>Prochaine échéance: {formatDate(line.nextDeadline)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formations Planifiées - 1/3 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Formations Planifiées
                </CardTitle>
                <CardDescription>
                  Formations en attente de validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plannedTrainings.map((training) => (
                    <div key={training.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-sm">{training.title}</h5>
                        <Badge className={getStatusColor(training.status)}>
                          {training.status === 'urgent' && 'Urgent'}
                          {training.status === 'planned' && 'Planifié'}
                          {training.status === 'requested' && 'Demandé'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs text-gray-600 mb-3">
                        <div>👤 {training.employee}</div>
                        <div>💰 {formatPrice(training.estimatedCost)}</div>
                        <div>📅 {formatDate(training.plannedDate)}</div>
                        <div>🏢 {training.provider}</div>
                      </div>
                      
                      <div className="text-xs text-gray-700 mb-3 p-2 bg-gray-50 rounded">
                        <strong>Justification:</strong> {training.justification}
                      </div>
                      
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs py-1"
                          onClick={() => handleValidateTraining(training.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Valider
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs py-1">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full text-sm" asChild>
                    <a href="/manager/assign-training">
                      <Plus className="h-4 w-4 mr-2" />
                      Planifier Formation
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default BudgetAllocation;
