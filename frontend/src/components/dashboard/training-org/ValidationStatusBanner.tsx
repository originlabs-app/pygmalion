import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

interface ValidationStatusBannerProps {
  status: 'pending' | 'verified' | 'rejected';
  comment?: string;
  organizationName?: string;
}

const ValidationStatusBanner: React.FC<ValidationStatusBannerProps> = ({
  status,
  comment,
  organizationName
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: CheckCircle,
          title: '✅ Organisation Validée',
          description: 'Félicitations ! Votre organisme de formation a été approuvé par nos équipes.',
          badgeText: 'Validé',
          badgeVariant: 'default' as const,
          alertVariant: 'default' as const,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600'
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: '❌ Organisation Rejetée',
          description: 'Votre demande a été examinée mais n\'a pas pu être approuvée pour le moment.',
          badgeText: 'Rejeté',
          badgeVariant: 'destructive' as const,
          alertVariant: 'destructive' as const,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600'
        };
      default: // pending
        return {
          icon: Clock,
          title: '⏳ Validation en Cours',
          description: 'Votre dossier est en cours d\'examen par nos équipes.',
          badgeText: 'En attente',
          badgeVariant: 'secondary' as const,
          alertVariant: 'default' as const,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          iconColor: 'text-orange-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-white`}>
              <Icon className={`h-6 w-6 ${config.iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {config.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {config.description}
              </p>
            </div>
          </div>
          <Badge variant={config.badgeVariant} className="ml-4">
            {config.badgeText}
          </Badge>
        </div>

        {/* Commentaire admin si présent */}
        {comment && (
          <Alert className="mt-4">
            <MessageSquare className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium text-sm">
                  {status === 'rejected' ? 'Raisons du rejet :' : 'Commentaire de validation :'}
                </p>
                <p className="text-sm bg-white/80 p-3 rounded border italic">
                  "{comment}"
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Instructions selon le statut */}
        <div className="mt-4 p-4 bg-white/60 rounded-lg">
          {status === 'pending' && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Prochaines étapes
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Nos équipes examinent vos documents sous 24-48h</li>
                <li>• Vous recevrez une notification par email</li>
                <li>• En cas de questions, contactez-nous à support@pygmalion.fr</li>
              </ul>
            </div>
          )}

          {status === 'verified' && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Accès complet débloqué
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Vous pouvez maintenant créer et publier vos formations</li>
                <li>• Access à tous les outils de gestion</li>
                <li>• Tableau de bord analytics disponible</li>
              </ul>
            </div>
          )}

          {status === 'rejected' && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Actions recommandées
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Consultez les raisons du rejet ci-dessus</li>
                <li>• Corrigez les points mentionnés</li>
                <li>• Contactez support@pygmalion.fr pour une nouvelle soumission</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationStatusBanner;