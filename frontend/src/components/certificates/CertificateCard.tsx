
import React, { useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, QrCode } from 'lucide-react';
import { Certificate } from '@/types';
import { useCourses } from '@/contexts/CourseContext';
import { formatCertificateDate, isCertificateExpired, generateCertificatePdf } from '@/utils/certificateUtils';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface CertificateCardProps {
  certificate: Certificate;
  onView?: (certificate: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onView }) => {
  const { getCourse } = useCourses();
  const { toast } = useToast();
  const course = getCourse(certificate.courseId);

  // Check if certificate is expired
  const isExpired = isCertificateExpired(certificate.expiryDate);

  // Format dates
  const formattedIssueDate = formatCertificateDate(certificate.issueDate);
  const formattedExpiryDate = formatCertificateDate(certificate.expiryDate);

  // Handle view certificate
  const handleView = () => {
    if (onView) {
      onView(certificate);
    }
  };

  // Handle download certificate
  const handleDownload = async () => {
    toast({
      title: "Génération du PDF en cours",
      description: "Veuillez patienter pendant la création de votre certificat...",
    });

    try {
      // The actual PDF generation would happen here
      // For now we'll just simulate it with a timeout
      setTimeout(() => {
        toast({
          title: "PDF prêt",
          description: "Votre certificat a été généré avec succès",
        });
      }, 1500);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`overflow-hidden border-l-4 ${isExpired ? 'border-l-destructive' : 'border-l-primary'}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{course?.title || 'Formation'}</h3>
            <p className="text-sm text-muted-foreground">
              {course?.provider || 'Organisme de formation'}
            </p>
          </div>
          {certificate.tokenId && (
            <div className="bg-muted p-1 rounded-md">
              <QrCode className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Date d'émission :</span>
            <span className="font-medium">{formattedIssueDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Date d'expiration :</span>
            <span className={`font-medium ${isExpired ? 'text-destructive' : ''}`}>
              {formattedExpiryDate}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Statut :</span>
            <span className={`font-medium ${isExpired ? 'text-destructive' : 'text-primary'}`}>
              {isExpired ? 'Expiré' : 'Valide'}
            </span>
          </div>
          {certificate.tokenId && (
            <div className="flex justify-between">
              <span>Certificat sécurisé :</span>
              <span className="font-medium">Tokenisé</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs" onClick={handleView}>
          <Eye className="h-3.5 w-3.5 mr-1" />
          Voir
        </Button>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs" 
            asChild
          >
            <Link to={`/certificates/tokenize/${certificate.id}`}>
              <QrCode className="h-3.5 w-3.5 mr-1" />
              {certificate.tokenId ? "Vérifier" : "Tokeniser"}
            </Link>
          </Button>
          
          <Button variant="default" size="sm" className="text-xs" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5 mr-1" />
            Télécharger PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
