
import React, { useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ExternalLink, Shield, AlertTriangle } from 'lucide-react';
import { blockchainCertificateService } from '@/services/blockchainCertificateService';
import { Certificate } from '@/types';

interface BlockchainCertificateVerifierProps {
  certificate: Certificate;
  tokenId?: string;
}

const BlockchainCertificateVerifier: React.FC<BlockchainCertificateVerifierProps> = ({ 
  certificate,
  tokenId 
}) => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'verified' | 'failed'>('idle');
  const [verificationData, setVerificationData] = useState<any>(null);

  const handleVerify = async () => {
    if (!tokenId) return;
    
    try {
      setVerificationStatus('loading');
      const result = await blockchainCertificateService.verifyCertificate(tokenId, certificate.id);
      setVerificationData(result);
      setVerificationStatus(result.verified ? 'verified' : 'failed');
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('failed');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Vérification Blockchain
        </CardTitle>
        <CardDescription>
          Vérifiez l'authenticité de ce certificat sur la blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verificationStatus === 'idle' && tokenId && (
          <div className="text-center py-4">
            <p className="mb-4 text-muted-foreground">
              Ce certificat possède un jeton blockchain qui peut être vérifié pour prouver son authenticité.
            </p>
            <Button onClick={handleVerify} className="w-full">
              Vérifier l'authenticité
            </Button>
          </div>
        )}
        
        {verificationStatus === 'loading' && (
          <div className="flex justify-center py-4">
            <div className="animate-pulse flex space-x-2 items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground ml-2">Vérification en cours...</span>
            </div>
          </div>
        )}
        
        {verificationStatus === 'verified' && verificationData && (
          <div className="border border-green-200 bg-green-50 rounded-md p-4">
            <div className="flex items-center mb-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
              <span className="font-medium text-green-700">Certificat authentique</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Date d'émission:</span> {new Date(verificationData.timestamp).toLocaleDateString('fr-FR')}</p>
              {verificationData.blockNumber && (
                <p><span className="font-medium">Bloc:</span> {verificationData.blockNumber}</p>
              )}
              {verificationData.networkInfo && (
                <p><span className="font-medium">Réseau:</span> {verificationData.networkInfo}</p>
              )}
            </div>
          </div>
        )}
        
        {verificationStatus === 'failed' && (
          <div className="border border-red-200 bg-red-50 rounded-md p-4">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <span className="font-medium text-red-700">Certificat non vérifié</span>
            </div>
            <p className="text-sm text-red-600">
              Ce certificat n'a pas pu être vérifié sur la blockchain. Il peut s'agir d'un faux document
              ou d'un problème technique.
            </p>
          </div>
        )}
        
        {!tokenId && (
          <div className="text-center py-4 text-muted-foreground">
            Ce certificat n'a pas encore été tokenisé sur la blockchain.
          </div>
        )}
      </CardContent>
      
      {verificationStatus === 'verified' && verificationData && (
        <CardFooter className="border-t pt-4">
          <a 
            href={`https://polygonscan.com/tx/${verificationData.transactionId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm flex items-center text-blue-600 hover:text-blue-800"
          >
            Voir la transaction <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default BlockchainCertificateVerifier;
