
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AlertGroup {
  id: string;
  title: string;
  description: string;
  count: number;
  type: 'critical' | 'warning' | 'info';
  action: string;
}

interface AlertsOverviewProps {
  alerts: AlertGroup[];
}

const AlertsOverview: React.FC<AlertsOverviewProps> = ({ alerts }) => {
  const handleAlertAction = (alert: AlertGroup) => {
    toast({
      title: `Action sur l'alerte: ${alert.title}`,
      description: `Vous avez lancé l'action: ${alert.action}`,
    });
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-destructive/50 bg-destructive/10';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alertes et notifications</CardTitle>
            <CardDescription>Récapitulatif des alertes importantes</CardDescription>
          </div>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={`${getAlertStyle(alert.type)}`}>
            <div className="flex items-center justify-between">
              <div>
                <AlertTitle className="flex items-center">
                  {alert.type === 'critical' && <BellRing className="mr-2 h-4 w-4 text-destructive" />}
                  {alert.title}
                  <span className="ml-2 rounded-full bg-background px-2 py-0.5 text-xs font-medium">
                    {alert.count}
                  </span>
                </AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
              </div>
              <Button 
                variant={alert.type === 'critical' ? 'destructive' : 'outline'} 
                size="sm"
                onClick={() => handleAlertAction(alert)}
              >
                {alert.action}
              </Button>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsOverview;
