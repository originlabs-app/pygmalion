import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { adminService, AdminTrainingOrganization } from '@/services/adminService';
import { TrainingOrgDocument } from '@/services/trainingOrgService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Globe,
  Mail,
  Phone,
  User,
  Calendar,
  Building,
  Award,
} from 'lucide-react';

interface OrganizationStats {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
}

const TrainingOrganizationsTable: React.FC = () => {
  const [organizations, setOrganizations] = useState<AdminTrainingOrganization[]>([]);
  const [stats, setStats] = useState<OrganizationStats>({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<AdminTrainingOrganization | null>(null);
  const [orgDocuments, setOrgDocuments] = useState<TrainingOrgDocument[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [orgsData, statsData] = await Promise.all([
        adminService.getAllOrganizations(),
        adminService.getOrganizationStats(),
      ]);
      setOrganizations(orgsData);
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données des organismes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (org: AdminTrainingOrganization) => {
    try {
      const documents = await adminService.getOrganizationDocuments(org.id);
      setSelectedOrg(org);
      setOrgDocuments(documents);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les détails de l\'organisme',
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async (orgId: string) => {
    try {
      await adminService.approveOrganization(orgId);
      toast({
        title: 'Succès',
        description: 'Organisme approuvé avec succès',
      });
      loadData();
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'approuver l\'organisme',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (orgId: string) => {
    try {
      await adminService.rejectOrganization(orgId);
      toast({
        title: 'Succès',
        description: 'Organisme rejeté',
      });
      loadData();
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de rejeter l\'organisme',
        variant: 'destructive',
      });
    }
  };

  const handleViewDocument = async (doc: TrainingOrgDocument) => {
    try {
      if (doc.storageType === 'local') {
        // Pour les documents locaux, récupérer l'URL signée
        const response = await adminService.getDocumentSignedUrl(doc.id);
        window.open(response.url, '_blank');
      } else if (doc.externalUrl) {
        // Pour les documents externes (YouTube/Vimeo), ouvrir directement
        window.open(doc.externalUrl, '_blank');
      } else {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'accéder à ce document',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du document:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ouvrir le document',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">En attente</Badge>;
      case 'verified':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vérifié</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeté</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement des organismes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Vérifiés</p>
                <p className="text-2xl font-bold">{stats.verified}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Rejetés</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tableau des organismes */}
      <Card>
        <CardHeader>
          <CardTitle>Organismes de Formation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organisme</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>SIRET</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Qualiopi</TableHead>
                <TableHead>Date de création</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      {org.website && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Globe className="h-3 w-3 mr-1" />
                          {org.website}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{org.contactName}</div>
                      <div className="text-muted-foreground flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {org.contactEmail}
                      </div>
                      {org.contactPhone && (
                        <div className="text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {org.contactPhone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {org.siret}
                    </code>
                  </TableCell>
                  <TableCell>{getStatusBadge(org.verificationStatus)}</TableCell>
                  <TableCell>
                    {org.qualiopiCertified ? (
                      <div className="flex items-center text-green-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="text-sm">Certifié</span>
                        {org.qualiopiNumber && (
                          <div className="text-xs text-muted-foreground ml-1">
                            ({org.qualiopiNumber})
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Non certifié</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(org.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(org)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {organizations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Aucun organisme de formation trouvé</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de détails */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Détails de l'organisme</DialogTitle>
          </DialogHeader>

          {selectedOrg && (
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="documents">Documents ({orgDocuments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedOrg.name}
                      {getStatusBadge(selectedOrg.verificationStatus)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Informations générales</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>SIRET: {selectedOrg.siret}</span>
                          </div>
                          {selectedOrg.website && (
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                              <a href={selectedOrg.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {selectedOrg.website}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>Créé le {new Date(selectedOrg.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Contact</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedOrg.contactName}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{selectedOrg.contactEmail}</span>
                          </div>
                          {selectedOrg.contactPhone && (
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{selectedOrg.contactPhone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedOrg.description && (
                      <div>
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{selectedOrg.description}</p>
                      </div>
                    )}

                    {selectedOrg.qualiopiCertified && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center text-green-700">
                          <Award className="h-5 w-5 mr-2" />
                          <span className="font-medium">Certification Qualiopi</span>
                        </div>
                        {selectedOrg.qualiopiNumber && (
                          <p className="text-sm text-green-600 mt-1">
                            Numéro: {selectedOrg.qualiopiNumber}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Boutons d'action */}
                {selectedOrg.verificationStatus === 'pending' && (
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedOrg.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rejeter
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedOrg.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approuver
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                {orgDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {orgDocuments.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                                                     <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-3">
                               <FileText className="h-6 w-6 text-blue-500" />
                               <div>
                                                                  <div className="font-medium">{doc.originalName || doc.fileName}</div>
                                   <div className="text-sm text-muted-foreground">
                                    {doc.mimeType} • {doc.size ? `${(doc.size / 1024 / 1024).toFixed(2)} MB` : 'Taille inconnue'}
                                   </div>
                               </div>
                             </div>
                             <div className="flex items-center space-x-2">
                               <Badge variant="outline">
                                 {doc.storageType === 'local' ? 'Fichier local' : doc.storageType}
                               </Badge>
                               <Button
                                 variant="outline"
                                 size="sm"
                                 onClick={() => handleViewDocument(doc)}
                               >
                                 <Eye className="h-4 w-4" />
                               </Button>
                             </div>
                           </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Aucun document trouvé</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingOrganizationsTable; 