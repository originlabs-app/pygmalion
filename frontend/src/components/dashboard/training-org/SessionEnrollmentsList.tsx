
import React, { useState } from 'react';
import { Course, Enrollment } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SessionEnrollmentsListProps {
  courses: Course[];
  enrollments: Enrollment[];
}

const SessionEnrollmentsList: React.FC<SessionEnrollmentsListProps> = ({ 
  courses, 
  enrollments 
}) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    selectedCourse?.sessions[0]?.id || null
  );

  // Update selected session when course changes
  React.useEffect(() => {
    if (selectedCourse) {
      setSelectedSessionId(selectedCourse.sessions[0]?.id || null);
    } else {
      setSelectedSessionId(null);
    }
  }, [selectedCourse]);

  // Get enrollments for selected session
  const sessionEnrollments = selectedSessionId 
    ? enrollments.filter(e => e.sessionId === selectedSessionId)
    : [];

  // Get session by ID
  const selectedSession = selectedCourse?.sessions.find(s => s.id === selectedSessionId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  // Mock user data (in a real app, this would come from an API)
  const getMockUserData = (userId: string) => {
    const firstNames = ["Thomas", "Sophie", "Jean", "Marie", "Pierre", "Lucie"];
    const lastNames = ["Martin", "Dubois", "Bernard", "Petit", "Robert", "Richard"];
    
    const randomIndex = Math.abs(parseInt(userId)) % firstNames.length;
    return {
      firstName: firstNames[randomIndex],
      lastName: lastNames[(randomIndex + 1) % lastNames.length],
      email: `${firstNames[randomIndex].toLowerCase()}.${lastNames[(randomIndex + 1) % lastNames.length].toLowerCase()}@example.com`,
      company: ["Air France", "Aéroport de Paris", "Lufthansa", "Individuel", "ADP"][(randomIndex + 2) % 5]
    };
  };
  
  // Calculate session stats
  const sessionStats = React.useMemo(() => {
    if (!selectedSession) return { total: 0, pending: 0, approved: 0, completed: 0 };
    
    const total = sessionEnrollments.length;
    const pending = sessionEnrollments.filter(e => e.status === 'pending').length;
    const approved = sessionEnrollments.filter(e => e.status === 'approved').length;
    const completed = sessionEnrollments.filter(e => e.status === 'completed').length;
    
    return { total, pending, approved, completed };
  }, [selectedSession, sessionEnrollments]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gestion des inscrits par session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Course and session selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Formation</label>
                <Select
                  value={selectedCourse?.id || ''}
                  onValueChange={(value) => setSelectedCourse(courses.find(c => c.id === value) || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une formation" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Session</label>
                <Select
                  value={selectedSessionId || ''}
                  onValueChange={setSelectedSessionId}
                  disabled={!selectedCourse || selectedCourse.sessions.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une session" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCourse?.sessions.map(session => (
                      <SelectItem key={session.id} value={session.id}>
                        Du {formatDate(session.startDate)} au {formatDate(session.endDate)} - {
                          session.location === 'online' ? 'En ligne' : session.location
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedCourse && selectedSession ? (
              <div className="space-y-6">
                {/* Session details */}
                <div className="bg-muted/40 p-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Formation</div>
                      <div className="font-medium">{selectedCourse.title}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Dates</div>
                      <div className="font-medium">
                        {formatDate(selectedSession.startDate)} - {formatDate(selectedSession.endDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Lieu</div>
                      <div className="font-medium">
                        {selectedSession.location === 'online' ? 'En ligne' : selectedSession.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Places disponibles</div>
                      <div className="font-medium">
                        {selectedSession.availableSeats} / {selectedSession.availableSeats + sessionEnrollments.length}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Session statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{sessionStats.total}</div>
                      <div className="text-sm text-muted-foreground">Inscrits au total</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{sessionStats.pending}</div>
                      <div className="text-sm text-muted-foreground">En attente</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{sessionStats.approved}</div>
                      <div className="text-sm text-muted-foreground">Confirmés</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white">
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{sessionStats.completed}</div>
                      <div className="text-sm text-muted-foreground">Terminés</div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Enrollments list */}
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">Tous ({sessionStats.total})</TabsTrigger>
                    <TabsTrigger value="pending">En attente ({sessionStats.pending})</TabsTrigger>
                    <TabsTrigger value="approved">Confirmés ({sessionStats.approved})</TabsTrigger>
                    <TabsTrigger value="completed">Terminés ({sessionStats.completed})</TabsTrigger>
                  </TabsList>
                  
                  {['all', 'pending', 'approved', 'completed'].map(status => (
                    <TabsContent key={status} value={status} className="space-y-4">
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Apprenant</TableHead>
                              <TableHead>Contact</TableHead>
                              <TableHead>Entreprise</TableHead>
                              <TableHead>Inscription</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sessionEnrollments
                              .filter(e => status === 'all' || e.status === status)
                              .map(enrollment => {
                                const userData = getMockUserData(enrollment.userId);
                                
                                return (
                                  <TableRow key={enrollment.id}>
                                    <TableCell>
                                      <div className="font-medium">{userData.firstName} {userData.lastName}</div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-sm text-muted-foreground">{userData.email}</div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="text-sm">
                                        {userData.company || "Individuel"}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      {formatDate(enrollment.enrollmentDate)}
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant={
                                        enrollment.status === 'completed' ? 'default' :
                                        enrollment.status === 'approved' ? 'secondary' :
                                        'outline'
                                      }>
                                        {enrollment.status === 'pending' ? 'En attente' :
                                         enrollment.status === 'approved' ? 'Confirmé' :
                                         'Terminé'}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Détails</Button>
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-primary border-primary hover:bg-primary/5"
                                        >
                                          Contacter
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                            })}
                            {sessionEnrollments
                              .filter(e => status === 'all' || e.status === status)
                              .length === 0 && (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-6">
                                  Aucun apprenant dans cette catégorie
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Export buttons */}
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">
                          Exporter CSV
                        </Button>
                        <Button variant="outline">
                          Exporter PDF
                        </Button>
                        {status === 'all' && (
                          <Button variant="default">
                            Envoyer email groupé
                          </Button>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            ) : (
              <div className="text-center py-8 border rounded-md">
                <h3 className="text-lg font-medium mb-2">Aucune session sélectionnée</h3>
                <p className="text-muted-foreground mb-4">
                  Veuillez sélectionner une formation et une session pour voir les inscrits.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionEnrollmentsList;
