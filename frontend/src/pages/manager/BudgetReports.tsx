import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  FileText,
  Euro,
  Target,
  Users,
  Calendar,
  Building,
  PieChart,
  Send,
  ExternalLink,
  Award,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BudgetReports = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [periodFilter, setPeriodFilter] = useState<string>('2025');
  const [reportType, setReportType] = useState<string>('financial');

  // Données ROI par formation
  const roiData = [
    {
      id: '1',
      training: 'Sûreté Aéroportuaire',
      category: 'Sécurité',
      totalCost: 4200,
      employeesTrained: 8,
      costPerEmployee: 525,
      productivityGain: 15,
      complianceImprovement: 25,
      riskReduction: 30,
      roi: 240,
      paybackMonths: 6
    },
    {
      id: '2',
      training: 'Matières Dangereuses ADR',
      category: 'Réglementation',
      totalCost: 5100,
      employeesTrained: 6,
      costPerEmployee: 850,
      productivityGain: 20,
      complianceImprovement: 35,
      riskReduction: 40,
      roi: 320,
      paybackMonths: 4
    },
    {
      id: '3',
      training: 'Radiotelephonie',
      category: 'Communication',
      totalCost: 1950,
      employeesTrained: 3,
      costPerEmployee: 650,
      productivityGain: 12,
      complianceImprovement: 20,
      riskReduction: 15,
      roi: 180,
      paybackMonths: 8
    },
    {
      id: '4',
      training: 'Conduite Piste',
      category: 'Technique',
      totalCost: 4800,
      employeesTrained: 4,
      costPerEmployee: 1200,
      productivityGain: 25,
      complianceImprovement: 30,
      riskReduction: 50,
      roi: 380,
      paybackMonths: 3
    }
  ];

  // Données organismes de financement
  const fundingData = [
    {
      id: '1',
      organism: 'OPCO Transports',
      type: 'OPCO',
      totalEligible: 28500,
      requested: 25000,
      approved: 22000,
      received: 18500,
      pending: 3500,
      approvalRate: 88,
      averageDelay: 45
    },
    {
      id: '2',
      organism: 'CPF - Compte Personnel Formation',
      type: 'CPF',
      totalEligible: 12000,
      requested: 8500,
      approved: 7200,
      received: 6800,
      pending: 400,
      approvalRate: 85,
      averageDelay: 20
    },
    {
      id: '3',
      organism: 'FNE Formation',
      type: 'État',
      totalEligible: 8000,
      requested: 5000,
      approved: 4200,
      received: 4200,
      pending: 0,
      approvalRate: 84,
      averageDelay: 60
    },
    {
      id: '4',
      organism: 'Fonds Interne Air France',
      type: 'Entreprise',
      totalEligible: 50000,
      requested: 34500,
      approved: 34500,
      received: 34500,
      pending: 0,
      approvalRate: 100,
      averageDelay: 0
    }
  ];

  // Évolution mensuelle
  const monthlyEvolution = [
    { month: 'Jan 2025', budget: 50000, used: 8500, roi: 180, trainings: 8 },
    { month: 'Fév 2025', budget: 50000, used: 15200, roi: 220, trainings: 12 },
    { month: 'Mar 2025', budget: 50000, used: 23800, roi: 280, trainings: 16 },
    { month: 'Avr 2025', budget: 50000, used: 32100, roi: 310, trainings: 20 }
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 300) return 'text-green-600 bg-green-100';
    if (roi >= 200) return 'text-blue-600 bg-blue-100';
    if (roi >= 150) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getApprovalColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Rapport généré",
      description: `Le rapport ${type} a été généré et sera envoyé par email.`,
    });
  };

  const handleSendToSupervisor = () => {
    toast({
      title: "Rapport envoyé",
      description: "Le rapport financier a été transmis à votre superviseur.",
    });
  };

  const totalROI = roiData.reduce((sum, item) => sum + item.roi, 0) / roiData.length;
  const totalInvestment = roiData.reduce((sum, item) => sum + item.totalCost, 0);
  const totalEmployeesTrained = roiData.reduce((sum, item) => sum + item.employeesTrained, 0);

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
            <h1 className="text-3xl font-bold text-gray-900">Rapports Financiers & ROI</h1>
            <p className="text-gray-600">
              Analyse de performance et retour sur investissement des formations
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
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Rapport Financier</SelectItem>
                <SelectItem value="roi">Analyse ROI</SelectItem>
                <SelectItem value="funding">Organismes Financement</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => handleGenerateReport(reportType)}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm" onClick={handleSendToSupervisor}>
              <Send className="h-4 w-4 mr-2" />
              Envoyer N+1
            </Button>
          </div>
        </div>

        {/* KPIs de Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">ROI Moyen</p>
                  <p className="text-3xl font-bold text-green-600">{totalROI.toFixed(0)}%</p>
                  <div className="flex items-center gap-1 text-xs mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">+15% vs N-1</span>
                  </div>
                </div>
                <Target className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Investissement Total</p>
                  <p className="text-3xl font-bold text-blue-600">{formatPrice(totalInvestment)}</p>
                  <p className="text-xs text-gray-500 mt-1">Sur {totalEmployeesTrained} employés</p>
                </div>
                <Euro className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Employés Formés</p>
                  <p className="text-3xl font-bold text-purple-600">{totalEmployeesTrained}</p>
                  <p className="text-xs text-gray-500 mt-1">Coût moyen: {formatPrice(totalInvestment/totalEmployeesTrained)}</p>
                </div>
                <Users className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Financement Externe</p>
                  <p className="text-3xl font-bold text-orange-600">68%</p>
                  <p className="text-xs text-gray-500 mt-1">{formatPrice(fundingData.slice(0,3).reduce((sum, f) => sum + f.received, 0))}</p>
                </div>
                <Building className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Analyse ROI par Formation - 2/3 */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Analyse ROI par Formation
                </CardTitle>
                <CardDescription>
                  Retour sur investissement détaillé par type de formation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Formation</TableHead>
                        <TableHead>Coût Total</TableHead>
                        <TableHead>Employés</TableHead>
                        <TableHead>Gains Productivité</TableHead>
                        <TableHead>ROI</TableHead>
                        <TableHead>Retour</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roiData.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{item.training}</div>
                              <div className="text-sm text-gray-500">{item.category}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{formatPrice(item.totalCost)}</div>
                              <div className="text-sm text-gray-500">{formatPrice(item.costPerEmployee)}/emp.</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{item.employeesTrained}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">🚀 +{item.productivityGain}% productivité</div>
                              <div className="text-sm">✅ +{item.complianceImprovement}% conformité</div>
                              <div className="text-sm">🛡️ -{item.riskReduction}% risques</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getRoiColor(item.roi)}>
                              {item.roi}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-center">
                              <div className="font-medium">{item.paybackMonths} mois</div>
                              <div className="text-gray-500">rentabilité</div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Organismes de Financement - 1/3 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-blue-600" />
                  Organismes de Financement
                </CardTitle>
                <CardDescription>
                  Performance des demandes de financement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fundingData.map((funding) => (
                    <div key={funding.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-sm">{funding.organism}</h5>
                        <Badge variant="outline" className="text-xs">
                          {funding.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Reçu:</span>
                          <span className="font-medium">{formatPrice(funding.received)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>En attente:</span>
                          <span className="text-orange-600">{formatPrice(funding.pending)}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Taux d'approbation</span>
                            <span className={getApprovalColor(funding.approvalRate)}>
                              {funding.approvalRate}%
                            </span>
                          </div>
                          <Progress value={funding.approvalRate} className="h-1" />
                        </div>
                        <div className="text-xs text-gray-500">
                          Délai moyen: {funding.averageDelay} jours
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full text-sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Nouvelle Demande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Évolution Mensuelle */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Évolution Mensuelle 2025
            </CardTitle>
            <CardDescription>
              Suivi de l'utilisation budgétaire et performance ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Période</TableHead>
                    <TableHead>Budget Utilisé</TableHead>
                    <TableHead>Taux d'Utilisation</TableHead>
                    <TableHead>ROI Moyen</TableHead>
                    <TableHead>Formations</TableHead>
                    <TableHead>Évolution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyEvolution.map((month, index) => (
                    <TableRow key={month.month}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell>{formatPrice(month.used)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{Math.round(month.used/month.budget*100)}%</span>
                          <Progress value={month.used/month.budget*100} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoiColor(month.roi)}>
                          {month.roi}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{month.trainings}</TableCell>
                      <TableCell>
                        {index > 0 && (
                          <div className="flex items-center gap-1">
                            {month.roi > monthlyEvolution[index-1].roi ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-green-600 text-sm">
                                  +{(month.roi - monthlyEvolution[index-1].roi).toFixed(0)}%
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <span className="text-red-600 text-sm">
                                  {(month.roi - monthlyEvolution[index-1].roi).toFixed(0)}%
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recommandations Strategiques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              Recommandations Stratégiques
            </CardTitle>
            <CardDescription>
              Optimisations suggérées pour améliorer le ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Points Forts</h4>
                </div>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• ROI Conduite Piste: 380% (excellent)</li>
                  <li>• Taux financement externe: 68%</li>
                  <li>• Conformité sécurité: +25%</li>
                  <li>• Délai rentabilité moyen: 5.25 mois</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-orange-900">À Améliorer</h4>
                </div>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• ROI Radiotelephonie: seulement 180%</li>
                  <li>• Délai OPCO: 45 jours (long)</li>
                  <li>• Budget Communication sous-utilisé</li>
                  <li>• Formations groupées à privilégier</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Actions Proposées</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Renégocier tarifs Radiotelephonie</li>
                  <li>• Anticiper dossiers OPCO (-15j)</li>
                  <li>• Formations internes Management</li>
                  <li>• Grouper formations par équipe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default BudgetReports;
