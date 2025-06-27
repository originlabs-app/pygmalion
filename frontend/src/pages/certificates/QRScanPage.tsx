
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, ArrowLeft } from 'lucide-react';

const QRScanPage: React.FC = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // This is a mock function. In a real app, you would use a library like 'react-qr-reader'
  const startScanner = () => {
    setScanning(true);
    setError(null);
    
    // Simulate scanning process
    setTimeout(() => {
      // In a real app, this would be the result from scanning
      const mockResult = "https://your-app.com/verify-certificate/1/abc123";
      
      try {
        // Parse the QR code URL to extract certificate ID and token
        const url = new URL(mockResult);
        const pathSegments = url.pathname.split('/');
        
        // Extract ID and token from URL
        if (pathSegments.length >= 3 && pathSegments[1] === 'verify-certificate') {
          const certId = pathSegments[2];
          const tokenId = pathSegments.length > 3 ? pathSegments[3] : undefined;
          
          // Navigate to verification page
          navigate(`/verify-certificate/${certId}${tokenId ? `/${tokenId}` : ''}`);
        } else {
          setError("Code QR invalide. Veuillez scanner un certificat valide.");
          setScanning(false);
        }
      } catch (err) {
        setError("Une erreur s'est produite lors de la lecture du code QR.");
        setScanning(false);
      }
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate('/certificates')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold">Scanner un certificat</h1>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center">
              <QrCode className="h-6 w-6 mr-2" />
              Scanner un code QR
            </CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <div className="text-center mb-6">
              <p className="mb-4">
                Scannez le code QR d'un certificat pour vérifier son authenticité.
              </p>
              
              {/* Preview area (mock) */}
              <div className="bg-muted aspect-square max-w-xs mx-auto mb-6 flex items-center justify-center relative">
                {scanning ? (
                  <>
                    <div className="absolute inset-0 border-2 border-primary animate-pulse"></div>
                    <div className="text-sm text-muted-foreground">Veuillez placer le QR code dans ce cadre...</div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground">L'aperçu de la caméra apparaîtra ici</div>
                )}
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <Button 
                onClick={startScanner} 
                disabled={scanning} 
                className="w-full"
              >
                {scanning ? "Scanner en cours..." : "Commencer à scanner"}
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Note: Vous devrez peut-être autoriser l'accès à la caméra de votre appareil.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default QRScanPage;
