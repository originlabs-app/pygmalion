
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CertificateTemplate from '@/components/certificates/CertificateTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Certificate } from '@/types';
import { useCourses } from '@/contexts/CourseContext';
import { isCertificateExpired } from '@/utils/certificateUtils';

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

const VerifyCertificate: React.FC = () => {
  const { id, tokenId } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  
  // Find the certificate based on ID
  const certificate = SAMPLE_CERTIFICATES.find(cert => cert.id === id);
  
  // Verification status
  const isValid = certificate && (!tokenId || certificate.tokenId === tokenId);
  const isExpired = certificate ? isCertificateExpired(certificate.expiryDate) : false;
  
  // Simulate verification process
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isVerifying) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Vérification du certificat</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p>Vérification en cours...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  if (!isValid) {
    return (
      <Layout>
        <div className="container py-8">
          <Card className="max-w-md mx-auto border-destructive">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center">
                <X className="h-6 w-6 text-destructive mr-2" />
                Certificat non valide
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <p className="mb-4">Le certificat que vous essayez de vérifier n'est pas authentique ou n'existe pas.</p>
              <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        <Card className="max-w-md mx-auto mb-8 border-primary">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <Check className="h-6 w-6 text-primary mr-2" />
              Certificat {isExpired ? 'expiré mais authentique' : 'valide et authentique'}
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <div className="text-center">
              <p className="mb-4">
                {isExpired 
                  ? 'Ce certificat est authentique mais a expiré.' 
                  : 'Ce certificat est valide et authentique.'
                }
              </p>
              {certificate.tokenId && (
                <div className="text-sm text-muted-foreground mb-4">
                  ID de sécurité : {certificate.tokenId}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {certificate && (
          <div className="shadow-lg rounded-lg overflow-hidden">
            <CertificateTemplate certificate={certificate} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VerifyCertificate;
