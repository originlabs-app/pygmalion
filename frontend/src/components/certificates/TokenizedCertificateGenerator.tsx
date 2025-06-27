
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Certificate } from '@/types';
import { blockchainCertificateService } from '@/services/blockchainCertificateService';
import { Shield, Check } from 'lucide-react';
import { toast } from 'sonner';

interface TokenizedCertificateGeneratorProps {
  certificate: Certificate;
  onCertificateTokenized: (updatedCertificate: Certificate) => void;
}

const TokenizedCertificateGenerator: React.FC<TokenizedCertificateGeneratorProps> = ({ 
  certificate, 
  onCertificateTokenized 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Check if the certificate is already tokenized
  const isTokenized = Boolean(certificate.tokenId);
  
  const handleGenerateToken = async () => {
    if (isGenerating || isTokenized) return;
    
    setIsGenerating(true);
    toast.info("Génération du certificat tokenisé en cours...");
    
    try {
      const result = await blockchainCertificateService.generateTokenizedCertificate(certificate);
      
      // Update the certificate with the token ID
      const updatedCertificate: Certificate = {
        ...certificate,
        tokenId: result.tokenId
      };
      
      onCertificateTokenized(updatedCertificate);
      
      toast.success("Certificat tokenisé avec succès!", {
        description: `Token ID: ${result.tokenId}`,
      });
    } catch (error) {
      console.error("Error generating token:", error);
      toast.error("Erreur lors de la génération du token", {
        description: "Veuillez réessayer ultérieurement",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-primary" /> 
          Sécurisation du certificat
        </CardTitle>
        <CardDescription>
          Tokenisez votre certificat pour une validation sécurisée via blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isTokenized ? (
          <div className="bg-primary/10 p-4 rounded-md flex items-start">
            <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Certificat sécurisé</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ce certificat est tokenisé et sécurisé sur la blockchain.
                <br />Token ID: <span className="font-mono text-xs">{certificate.tokenId}</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              La tokenisation du certificat permet une vérification sécurisée et 
              immuable de son authenticité via la technologie blockchain.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Avantages</h4>
              <ul className="text-sm space-y-1">
                <li>• Vérification instantanée de l'authenticité</li>
                <li>• Prévention contre la falsification</li>
                <li>• Accessibilité permanente via QR code</li>
                <li>• Conformité aux normes de sécurité aéronautiques</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isTokenized && (
          <Button 
            onClick={handleGenerateToken}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Génération en cours..." : "Tokeniser ce certificat"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenizedCertificateGenerator;
