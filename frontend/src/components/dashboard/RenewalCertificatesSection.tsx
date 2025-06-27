
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/dashboard/DashboardCard';

interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  expiryDate: string;
  category: string;
  status: 'valid' | 'expiring' | 'expired';
}

interface RenewalCertificatesSectionProps {
  nextRenewalCertificates: Certificate[];
}

const RenewalCertificatesSection: React.FC<RenewalCertificatesSectionProps> = ({
  nextRenewalCertificates
}) => {
  return (
    <DashboardCard 
      title="Renouvellements à prévoir" 
      description="Certifications qui arrivent à expiration"
      action={
        <Button variant="link" size="sm" asChild>
          <Link to="/certificates">Tous les certificats</Link>
        </Button>
      }
    >
      {nextRenewalCertificates.length > 0 ? (
        <div className="space-y-3">
          {nextRenewalCertificates.map(cert => (
            <div key={cert.id} className="p-3 bg-muted rounded-md">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{cert.courseName}</h4>
                <Badge variant="outline" className="text-xs bg-yellow-100">
                  <AlertTriangle className="h-3 w-3 mr-1 text-yellow-600" />
                  Expire bientôt
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Expire le: {new Date(cert.expiryDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            Pas de certifications à renouveler prochainement
          </p>
        </div>
      )}
    </DashboardCard>
  );
};

export default RenewalCertificatesSection;
