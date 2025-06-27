
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
const mockLmsLogs = [
  { id: '1', userId: 'user-123', courseId: 'course-234', status: 'success', message: 'Inscription réussie au cours "Sécurité Aéroportuaire"', timestamp: '2025-05-19T10:15:00Z' },
  { id: '2', userId: 'user-456', courseId: 'course-789', status: 'error', message: 'Échec de l\'inscription: Compte LMS introuvable', timestamp: '2025-05-19T10:05:30Z' },
  { id: '3', userId: 'user-789', courseId: 'course-567', status: 'pending', message: 'Inscription en cours de traitement', timestamp: '2025-05-19T09:55:00Z' },
  { id: '4', userId: 'user-234', courseId: 'course-123', status: 'success', message: 'Progrès synchronisé avec succès', timestamp: '2025-05-19T09:30:00Z' },
  { id: '5', userId: 'user-345', courseId: 'course-678', status: 'warning', message: 'Retard de synchronisation détecté', timestamp: '2025-05-19T09:15:00Z' },
];

const LMSStatusList: React.FC = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      title: "Rafraîchissement",
      description: "Récupération des derniers logs LMS en cours...",
    });
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">Succès</Badge>;
      case 'error':
        return <Badge className="bg-red-500">Erreur</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">En cours</Badge>;
      case 'warning':
        return <Badge className="bg-amber-500">Attention</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">État des Synchronisations LMS</CardTitle>
          <CardDescription>
            Logs récents des interactions avec le LMS
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLmsLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 pt-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(log.status)}
                  <span className="text-xs text-muted-foreground">{formatTime(log.timestamp)}</span>
                </div>
                <p className="text-sm">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LMSStatusList;
