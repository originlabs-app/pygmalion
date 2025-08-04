import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Award,
  AlertTriangle
} from 'lucide-react';

interface TrainingOrganization {
  id: string;
  organizationName: string;
  siret: string;
  contactEmail: string;
  contactPhone: string;
  contactName: string;
  website?: string;
  address: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  qualiopiCertified: boolean;
  qualiopiNumber?: string;
  description: string;
  documents: {
    siretFile?: { name: string; url: string };
    qualiopiFile?: { name: string; url: string };
    presentationFile?: { name: string; url: string };
  };
}

// Données de démonstration pour la validation des OF
const mockOrganizations: TrainingOrganization[] = [
  {
    id: 'demo-aviation-training-solutions',
    organizationName: 'Aviation Training Solutions SARL',
    siret: '85234567890123',
    contactEmail: 'p.moreau@aviation-training-solutions.fr',
    contactPhone: '+33 1 45 67 89 12',
    contactName: 'Philippe Moreau',
    website: 'https://aviation-training-solutions.fr',
    address: '15 Avenue des Champs-Élysées',
    city: 'Paris',
    status: 'pending',
    submissionDate: '2024-01-15T10:30:00Z',
    qualiopiCertified: true,
    qualiopiNumber: 'QUALIOPI-2023-ATS-001',
    description: 'Organisme de formation spécialisé dans la sécurité aéroportuaire et la maintenance aéronautique. Expert reconnu avec 15 ans d\'expérience dans le secteur.',
    documents: {
      siretFile: { name: 'extrait-kbis-ats.pdf', url: '/documents/kbis-ats.pdf' },
      qualiopiFile: { name: 'certificat-qualiopi-ats.pdf', url: '/documents/qualiopi-ats.pdf' },
      presentationFile: { name: 'presentation-ats.pdf', url: '/documents/presentation-ats.pdf' }
    }
  },
  {
    id: 'aerosecure-training',
    organizationName: 'AeroSecure Training',
    siret: '78912345678901',
    contactEmail: 'contact@aerosecure-training.com',
    contactPhone: '+33 1 23 45 67 89',
    contactName: 'Marie Delacroix',
    website: 'https://aerosecure-training.com',
    address: '42 Rue de la Paix',
    city: 'Lyon',
    status: 'approved',
    submissionDate: '2024-01-10T14:20:00Z',
    qualiopiCertified: true,
    qualiopiNumber: 'QUALIOPI-2023-AST-002',
    description: 'Formation en sûreté aéroportuaire et contrôle d\'accès. Certifié Qualiopi depuis 2020.',
    documents: {
      siretFile: { name: 'extrait-kbis-ast.pdf', url: '/documents/kbis-ast.pdf' },
      qualiopiFile: { name: 'certificat-qualiopi-ast.pdf', url: '/documents/qualiopi-ast.pdf' }
    }
  },
  {
    id: 'formation-aviation-pro',
    organizationName: 'Formation Aviation Pro',
    siret: '65432178912345',
    contactEmail: 'admin@formation-aviation-pro.fr',
    contactPhone: '+33 4 56 78 90 12',
    contactName: 'Jean-Claude Bernard',
    address: '78 Boulevard de la République',
    city: 'Marseille',
    status: 'rejected',
    submissionDate: '2024-01-08T09:15:00Z',
    qualiopiCertified: false,
    description: 'Formation générale en aviation civile.',
    documents: {
      siretFile: { name: 'extrait-kbis-fap.pdf', url: '/documents/kbis-fap.pdf' }
    }
  }
];

const OrganizationsList: React.FC = () => {
  const [organizations] = useState<TrainingOrganization[]>(mockOrganizations);
  const [selectedOrg, setSelectedOrg] = useState<TrainingOrganization | null>(null);
  const [validationComment, setValidationComment] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const { toast } = useToast();

  const filteredOrganizations = organizations.filter(org => 
    statusFilter === 'all' || org.status === statusFilter
  );

  const handleValidate = (orgId: string, status: 'approved' | 'rejected') => {
    // Simulation de validation
    const orgName = organizations.find(org => org.id === orgId)?.organizationName;
    
    toast({
      title: status === 'approved' ? "Organisme approuvé" : "Organisme rejeté",
      description: `${orgName} a été ${status === 'approved' ? 'approuvé' : 'rejeté'} avec succès.`,
    });

    setSelectedOrg(null);
    setValidationComment('');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />En attente</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approuvé</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeté</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
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

  return (
    <div className="space-y-6">
      {/* Filtres et statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{organizations.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {organizations.filter(org => org.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approuvés</p>
                <p className="text-2xl font-bold text-green-600">
                  {organizations.filter(org => org.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejetés</p>
                <p className="text-2xl font-bold text-red-600">
                  {organizations.filter(org => org.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        {['all', 'pending', 'approved', 'rejected'].map((filter) => (
          <Button
            key={filter}
            variant={statusFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(filter as typeof statusFilter)}
          >
            {filter === 'all' ? 'Tous' : 
             filter === 'pending' ? 'En attente' :
             filter === 'approved' ? 'Approuvés' : 'Rejetés'}
          </Button>
        ))}
      </div>

      {/* Liste des organisations */}
      <div className="grid gap-4">
        {filteredOrganizations.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {org.organizationName}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(org.submissionDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {org.contactName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {org.city}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {org.qualiopiCertified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      <Award className="h-3 w-3 mr-1" />
                      Qualiopi
                    </Badge>
                  )}
                  {getStatusBadge(org.status)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{org.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{org.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{org.contactPhone}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a href={org.website} target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600 hover:underline">Site web</a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span>SIRET: {org.siret}</span>
                  </div>
                  {org.qualiopiNumber && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span>N° Qualiopi: {org.qualiopiNumber}</span>
                    </div>
                  )}
                </div>

                {/* Documents */}
                {Object.entries(org.documents).length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Documents fournis :</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(org.documents).map(([type, doc]) => (
                        doc && (
                          <Button key={type} variant="outline" size="sm" className="h-8">
                            <Download className="h-3 w-3 mr-1" />
                            {doc.name}
                          </Button>
                        )
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedOrg(org)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Examiner
                  </Button>
                  
                  {org.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleValidate(org.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Rejeter
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleValidate(org.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approuver
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de validation détaillée */}
      {selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Validation : {selectedOrg.organizationName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Informations détaillées */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Informations générales</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Organisme :</strong> {selectedOrg.organizationName}</div>
                      <div><strong>SIRET :</strong> {selectedOrg.siret}</div>
                      <div><strong>Adresse :</strong> {selectedOrg.address}, {selectedOrg.city}</div>
                      <div><strong>Contact :</strong> {selectedOrg.contactName}</div>
                      <div><strong>Email :</strong> {selectedOrg.contactEmail}</div>
                      <div><strong>Téléphone :</strong> {selectedOrg.contactPhone}</div>
                      {selectedOrg.website && <div><strong>Site web :</strong> {selectedOrg.website}</div>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <strong>Qualiopi :</strong> 
                        {selectedOrg.qualiopiCertified ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />Certifié
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />Non certifié
                          </Badge>
                        )}
                      </div>
                      {selectedOrg.qualiopiNumber && (
                        <div><strong>N° Qualiopi :</strong> {selectedOrg.qualiopiNumber}</div>
                      )}
                      <div><strong>Date de demande :</strong> {formatDate(selectedOrg.submissionDate)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{selectedOrg.description}</p>
                </div>

                {/* Documents */}
                <div>
                  <h3 className="font-semibold mb-3">Documents à examiner</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(selectedOrg.documents).map(([type, doc]) => (
                      doc && (
                        <div key={type} className="border rounded p-3">
                          <div className="text-sm font-medium mb-2">
                            {type === 'siretFile' ? 'Extrait KBIS' :
                             type === 'qualiopiFile' ? 'Certificat Qualiopi' :
                             'Présentation'}
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <FileText className="h-4 w-4 mr-2" />
                            {doc.name}
                          </Button>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Commentaires de validation */}
                <div>
                  <Label htmlFor="validation-comment">Commentaires de validation</Label>
                  <Textarea
                    id="validation-comment"
                    value={validationComment}
                    onChange={(e) => setValidationComment(e.target.value)}
                    placeholder="Ajoutez vos commentaires sur cette demande..."
                    className="mt-2"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedOrg(null)}
                  >
                    Fermer
                  </Button>
                  
                  {selectedOrg.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleValidate(selectedOrg.id, 'rejected')}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Rejeter la demande
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleValidate(selectedOrg.id, 'approved')}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approuver l'organisme
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrganizationsList;
