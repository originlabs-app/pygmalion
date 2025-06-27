
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar, MapPin, Users, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SessionsManagement = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalityFilter, setModalityFilter] = useState('all');

  if (!currentUser || currentUser.role !== 'training_org') {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground">
            Cette page est réservée aux organismes de formation.
          </p>
        </div>
      </Layout>
    );
  }

  // Filtrer les cours de l'organisme actuel
  const orgCourses = courses.filter(course => course.providerId === currentUser.id);
  
  // Créer une liste plate de toutes les sessions
  const allSessions = orgCourses.reduce((sessions, course) => {
    const courseSessions = course.sessions.map(session => ({
      ...session,
      courseTitle: course.title,
      courseId: course.id,
      courseType: course.type
    }));
    return [...sessions, ...courseSessions];
  }, [] as any[]);

  // Filtrer les sessions
  const filteredSessions = allSessions.filter(session => {
    const matchesSearch = session.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'upcoming' && new Date(session.startDate) > new Date()) ||
                         (statusFilter === 'ongoing' && new Date(session.startDate) <= new Date() && new Date(session.endDate) >= new Date()) ||
                         (statusFilter === 'completed' && new Date(session.endDate) < new Date());
    
    const matchesModality = modalityFilter === 'all' || session.courseType === modalityFilter;
    
    return matchesSearch && matchesStatus && matchesModality;
  });

  const handleDeleteSession = async (sessionId: string) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Session supprimée",
        description: "La session a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la session.",
        variant: "destructive",
      });
    }
  };

  const getSessionStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > now) {
      return <Badge variant="outline">À venir</Badge>;
    } else if (start <= now && end >= now) {
      return <Badge variant="default">En cours</Badge>;
    } else {
      return <Badge variant="secondary">Terminée</Badge>;
    }
  };

  const getAvailabilityBadge = (availableSeats: number) => {
    if (availableSeats === 0) {
      return <Badge variant="destructive">Complet</Badge>;
    } else if (availableSeats <= 3) {
      return <Badge variant="secondary">Presque complet</Badge>;
    } else {
      return <Badge variant="outline" className="border-green-500 text-green-500">Disponible</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des Sessions</h1>
            <p className="text-muted-foreground">
              Gérez toutes les sessions de vos formations
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle session
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total sessions</p>
                  <p className="text-2xl font-bold">{allSessions.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">À venir</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {allSessions.filter(s => new Date(s.startDate) > new Date()).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-green-600">
                    {allSessions.filter(s => new Date(s.startDate) <= new Date() && new Date(s.endDate) >= new Date()).length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Places totales</p>
                  <p className="text-2xl font-bold">
                    {allSessions.reduce((sum, s) => sum + s.availableSeats, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par formation ou lieu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="upcoming">À venir</SelectItem>
                    <SelectItem value="ongoing">En cours</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={modalityFilter} onValueChange={setModalityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Modalité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes modalités</SelectItem>
                    <SelectItem value="in-person">Présentiel</SelectItem>
                    <SelectItem value="online">E-learning</SelectItem>
                    <SelectItem value="virtual">Virtuel</SelectItem>
                    <SelectItem value="blended">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Sessions ({filteredSessions.length})</CardTitle>
            <CardDescription>
              Vue d'ensemble de toutes vos sessions de formation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune session trouvée</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' || modalityFilter !== 'all' 
                    ? "Aucune session ne correspond à vos critères de recherche."
                    : "Commencez par créer une session pour vos formations."
                  }
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une session
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Formation</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Lieu</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Places</TableHead>
                      <TableHead>Disponibilité</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium text-sm leading-tight">
                              {session.courseTitle}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatDate(session.startDate)}</div>
                            <div className="text-muted-foreground">
                              au {formatDate(session.endDate)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-4 w-4" />
                            {session.location === 'online' ? 'En ligne' : session.location}
                          </div>
                        </TableCell>
                        <TableCell>{formatPrice(session.price)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4" />
                            {session.availableSeats}
                          </div>
                        </TableCell>
                        <TableCell>{getAvailabilityBadge(session.availableSeats)}</TableCell>
                        <TableCell>{getSessionStatus(session.startDate, session.endDate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleDeleteSession(session.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
    </Layout>
  );
};

export default SessionsManagement;
