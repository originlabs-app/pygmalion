import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  Phone,
  Mail,
  Globe,
  Calendar,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { adminService, AdminTrainingOrganization } from '@/services/adminService';
import { TrainingOrgDocument } from '@/services/trainingOrgService';
import OrganizationDetail from '@/components/admin/OrganizationDetail';

const OrganizationsApprovals: React.FC = () => {
  const [organizations, setOrganizations] = useState<AdminTrainingOrganization[]>([]);
  const [pendingOrgs, setPendingOrgs] = useState<AdminTrainingOrganization[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<AdminTrainingOrganization | null>(null);
  const [selectedOrgDocuments, setSelectedOrgDocuments] = useState<TrainingOrgDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAction, setIsLoadingAction] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, rejected: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [allOrgs, pendingOrgs, orgStats] = await Promise.all([
        adminService.getAllOrganizations(),
        adminService.getPendingOrganizations(),
        adminService.getOrganizationStats()
      ]);
      
      setOrganizations(allOrgs);
      setPendingOrgs(pendingOrgs);
      setStats(orgStats);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error('Error loading organizations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = async (org: AdminTrainingOrganization) => {
    try {
      const documents = await adminService.getOrganizationDocuments(org.id);
      setSelectedOrg(org);
      setSelectedOrgDocuments(documents);
    } catch (error) {
      toast.error('Erreur lors du chargement des détails');
      console.error('Error loading organization details:', error);
    }
  };

  const handleApprove = async (orgId: string) => {
    try {
      setIsLoadingAction(orgId);
      await adminService.approveOrganization(orgId);
      toast.success('Organisation approuvée avec succès');
      await loadData();
      if (selectedOrg?.id === orgId) {
        setSelectedOrg(null);
      }
    } catch (error) {
      toast.error('Erreur lors de l\'approbation');
      console.error('Error approving organization:', error);
    } finally {
      setIsLoadingAction(null);
    }
  };

  const handleReject = async (orgId: string) => {
    try {
      setIsLoadingAction(orgId);
      await adminService.rejectOrganization(orgId);
      toast.success('Organisation rejetée');
      await loadData();
      if (selectedOrg?.id === orgId) {
        setSelectedOrg(null);
      }
    } catch (error) {
      toast.error('Erreur lors du rejet');
      console.error('Error rejecting organization:', error);
    } finally {
      setIsLoadingAction(null);
    }
  };

  const getStatusBadge = (verificationStatus: string) => {
    switch (verificationStatus) {
      case 'pending':
        return <Badge variant="outline" className="text-orange-600 border-orange-200"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Vérifiée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejetée</Badge>;
      default:
        return <Badge variant="outline">{verificationStatus}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Validation des Organismes</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les demandes de validation des organismes de formation
          </p>
        </div>
      </div>

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
                <p className="text-sm text-muted-foreground">Vérifiées</p>
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
                <p className="text-sm text-muted-foreground">Rejetées</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">En attente ({stats.pending})</TabsTrigger>
          <TabsTrigger value="all">Toutes ({stats.total})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingOrgs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune organisation en attente de validation</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingOrgs.map((org) => (
                <Card key={org.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold">{org.name}</h3>
                          {getStatusBadge(org.verificationStatus)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>SIRET: {org.siret}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{org.contactEmail}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{org.contactPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Créé le {formatDate(org.createdAt)}</span>
                          </div>
                        </div>

                        {org.description && (
                          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                            {org.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(org)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(org.id)}
                          disabled={isLoadingAction === org.id}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          {isLoadingAction === org.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approuver
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(org.id)}
                          disabled={isLoadingAction === org.id}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {organizations.map((org) => (
              <Card key={org.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">{org.name}</h3>
                        {getStatusBadge(org.verificationStatus)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>SIRET: {org.siret}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{org.contactEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Créé le {formatDate(org.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(org)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de détails */}
      {selectedOrg && (
        <OrganizationDetail
          organization={selectedOrg}
          documents={selectedOrgDocuments}
          onClose={() => setSelectedOrg(null)}
          onApprove={() => handleApprove(selectedOrg.id)}
          onReject={() => handleReject(selectedOrg.id)}
          isLoadingAction={isLoadingAction === selectedOrg.id}
        />
      )}
    </div>
  );
};

export default OrganizationsApprovals; 