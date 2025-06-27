
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Certificate } from '@/types';
import CertificateTemplate from '@/components/certificates/CertificateTemplate';
import TokenizedCertificateGenerator from '@/components/certificates/TokenizedCertificateGenerator';
import BlockchainCertificateVerifier from '@/components/certificates/BlockchainCertificateVerifier';

// Sample certificates data (this would come from an API in a real application)
const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    courseName: 'Sécurité en Piste',
    category: 'Safety',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    tokenId: 'token-abc123',
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
];

const TokenizedCertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the certificate based on ID
  const [certificate, setCertificate] = useState<Certificate | undefined>(
    SAMPLE_CERTIFICATES.find(cert => cert.id === id)
  );
  
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
  
  const handleCertificateTokenized = (updatedCertificate: Certificate) => {
    setCertificate(updatedCertificate);
    // In a real app, you would also update this in your backend/database
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <div onClick={() => navigate('/certificates')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour aux certificats
              </div>
            </Button>
          </div>
          <h1 className="text-2xl font-bold">Gestion du Certificat</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card rounded-lg shadow-md overflow-hidden mb-6">
              <CertificateTemplate certificate={certificate} />
            </div>
          </div>
          
          <div className="space-y-6">
            <Tabs defaultValue="tokenize">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="tokenize">Tokeniser</TabsTrigger>
                <TabsTrigger value="verify">Vérifier</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tokenize">
                <TokenizedCertificateGenerator
                  certificate={certificate}
                  onCertificateTokenized={handleCertificateTokenized}
                />
              </TabsContent>
              
              <TabsContent value="verify">
                <BlockchainCertificateVerifier
                  certificate={certificate}
                  tokenId={certificate.tokenId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TokenizedCertificatePage;
