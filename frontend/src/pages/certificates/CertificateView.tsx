
import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CertificateTemplate from '@/components/certificates/CertificateTemplate';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, Check, QrCode } from 'lucide-react';
import { generateCertificatePdf } from '@/utils/certificateUtils';
import { Certificate } from '@/types';
import { useCourses } from '@/contexts/CourseContext';

// Sample certificates data (to be replaced with real API data)
const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    courseName: 'Sécurité en Piste',
    category: 'Safety',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    tokenId: 'abc123',
    status: 'valid',
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    courseName: 'Gestion des Opérations',
    category: 'Operations',
    issueDate: '2023-06-30',
    expiryDate: '2024-06-30',
    status: 'expiring',
  },
  {
    id: '3',
    userId: '1',
    courseId: '3',
    courseName: 'Maintenance Aéronautique',
    category: 'Maintenance',
    issueDate: '2022-09-10',
    expiryDate: '2023-09-10',
    status: 'expired',
  },
  {
    id: '4',
    userId: '1',
    courseId: '4',
    courseName: 'Navigation Avancée',
    category: 'Navigation',
    issueDate: '2024-03-01',
    expiryDate: '2026-03-01',
    tokenId: 'xyz789',
    status: 'valid',
  },
];

const CertificateView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Find the certificate based on ID
  const certificate = SAMPLE_CERTIFICATES.find(cert => cert.id === id);
  
  if (!certificate) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Certificat non trouvé</h1>
            <p className="text-muted-foreground mb-6">
              Le certificat demandé n'existe pas ou n'est pas accessible.
            </p>
            <Button onClick={() => navigate('/certificates')}>
              Retour aux certificats
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleDownload = async () => {
    setIsGeneratingPdf(true);
    
    try {
      // Generate PDF if certificate element exists
      if (certificateRef.current) {
        toast({
          title: "Génération du PDF en cours",
          description: "Veuillez patienter...",
        });
        
        setTimeout(async () => {
          // In a real app, you would use the actual generateCertificatePdf function
          // await generateCertificatePdf('certificate-template', `certificat-${certificate.id}`);
          
          toast({
            title: "PDF généré avec succès",
            description: "Le téléchargement va commencer automatiquement.",
          });
          setIsGeneratingPdf(false);
        }, 1500);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de générer le PDF. Veuillez réessayer.",
      });
      setIsGeneratingPdf(false);
    }
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Mon certificat</h1>
            <p className="text-muted-foreground">
              Visualisez et téléchargez votre certificat de formation
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button variant="outline" onClick={() => navigate('/certificates')}>
              Retour
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={isGeneratingPdf}
            >
              <Download className="mr-2 h-4 w-4" />
              {isGeneratingPdf ? "Génération..." : "Télécharger PDF"}
            </Button>
          </div>
        </div>
        
        <div className="mb-8 shadow-lg rounded-lg overflow-hidden" ref={certificateRef} id="certificate-template">
          <CertificateTemplate certificate={certificate} />
        </div>
        
        {certificate.tokenId && (
          <div className="bg-card p-6 rounded-lg border mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Check className="mr-2 h-5 w-5 text-primary" />
              Certificat vérifié
            </h2>
            <p className="mb-2">
              Ce certificat est sécurisé par la technologie blockchain. Vous pouvez vérifier son authenticité en scannant le code QR.
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <QrCode className="h-4 w-4 mr-2" />
              Token ID: {certificate.tokenId}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CertificateView;
