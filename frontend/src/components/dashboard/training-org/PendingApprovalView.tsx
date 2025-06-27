
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Mail, ClipboardCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const PendingApprovalView = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-muted">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-amber-100 p-3">
                <ClipboardCheck className="h-8 w-8 text-amber-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Votre demande est en cours d'examen</CardTitle>
            <CardDescription className="text-base">
              Merci d'avoir soumis votre candidature pour devenir organisme de formation partenaire de MBAVIATION.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Prochaines étapes</h3>
                <ol className="space-y-3 list-decimal list-inside">
                  <li>Notre équipe examine actuellement votre dossier et vos documents</li>
                  <li>Vous recevrez un email à <strong>{currentUser?.email}</strong> dès que votre demande sera traitée</li>
                  <li>En cas d'approbation, vous pourrez commencer à créer vos formations</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <FileCheck className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Vérification en cours</h4>
                    <p className="text-sm text-muted-foreground">Délai habituel de 1 à 3 jours ouvrés</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">Besoin de plus d'informations?</h4>
                    <p className="text-sm text-muted-foreground">Nous vous contacterons si nécessaire</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 text-center">
                <Button variant="outline" className="mr-2">
                  Consulter nos exigences
                </Button>
                <Button>
                  Nous contacter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PendingApprovalView;
