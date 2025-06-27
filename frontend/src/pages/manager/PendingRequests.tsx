
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X, Clock, User, Calendar, MapPin, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PendingRequest {
  id: string;
  employeeName: string;
  employeeEmail: string;
  courseTitle: string;
  sessionDate: string;
  location: string;
  price: number;
  requestDate: string;
  urgency: 'low' | 'medium' | 'high';
}

const PendingRequests = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<PendingRequest[]>([
    {
      id: '1',
      employeeName: 'Marie Dubois',
      employeeEmail: 'marie.dubois@company.com',
      courseTitle: 'Sécurité Aéroportuaire - Formation Initiale',
      sessionDate: '2025-06-15',
      location: 'Paris CDG',
      price: 799,
      requestDate: '2025-05-12',
      urgency: 'high'
    },
    {
      id: '2',
      employeeName: 'Pierre Martin',
      employeeEmail: 'pierre.martin@company.com',
      courseTitle: 'Manipulation des Matières Dangereuses',
      sessionDate: '2025-06-20',
      location: 'Lyon Saint-Exupéry',
      price: 450,
      requestDate: '2025-05-10',
      urgency: 'medium'
    },
    {
      id: '3',
      employeeName: 'Sophie Lefèvre',
      employeeEmail: 'sophie.lefevre@company.com',
      courseTitle: 'Procédures d\'Urgence Cabine',
      sessionDate: '2025-07-05',
      location: 'En ligne',
      price: 299,
      requestDate: '2025-05-08',
      urgency: 'low'
    }
  ]);

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'airport_manager')) {
    return (
      <ManagerLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground">
            Cette page est réservée aux managers et gestionnaires d'aéroport.
          </p>
        </div>
      </ManagerLayout>
    );
  }

  const handleApprove = async (requestId: string) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast({
        title: "Demande approuvée",
        description: "L'inscription a été validée et l'employé sera notifié.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'approuver la demande.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast({
        title: "Demande rejetée",
        description: "L'employé sera notifié du refus.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de rejeter la demande.",
        variant: "destructive",
      });
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'medium':
        return <Badge variant="secondary">Modéré</Badge>;
      case 'low':
        return <Badge variant="outline">Faible</Badge>;
      default:
        return <Badge variant="outline">Faible</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Demandes d'inscription en attente</h1>
          <p className="text-muted-foreground">
            Validez ou rejetez les demandes de formation de votre équipe
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total en attente</p>
                  <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Demandes urgentes</p>
                  <p className="text-2xl font-bold text-red-600">
                    {requests.filter(req => req.urgency === 'high').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Budget total</p>
                  <p className="text-2xl font-bold">
                    {formatPrice(requests.reduce((sum, req) => sum + req.price, 0))}
                  </p>
                </div>
                <Euro className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des demandes */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes en attente de validation</CardTitle>
            <CardDescription>
              Cliquez sur Approuver ou Rejeter pour traiter chaque demande
            </CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune demande en attente</h3>
                <p className="text-muted-foreground">
                  Toutes les demandes de formation ont été traitées.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employé</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Session</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Urgence</TableHead>
                      <TableHead>Demandé le</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.employeeName}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.employeeEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium text-sm leading-tight">
                              {request.courseTitle}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4" />
                            {formatDate(request.sessionDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-4 w-4" />
                            {request.location}
                          </div>
                        </TableCell>
                        <TableCell>{formatPrice(request.price)}</TableCell>
                        <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                        <TableCell>{formatDate(request.requestDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApprove(request.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approuver
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleReject(request.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Rejeter
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  );
};

export default PendingRequests;
