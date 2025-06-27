import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Award, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Download,
  Upload,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Mail,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Certification {
  id: string;
  employee: {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
  };
  certification: {
    name: string;
    category: string;
    authority: string;
    level?: string;
    description: string;
  };
  dates: {
    issued: string;
    expires: string;
    daysUntilExpiry: number;
  };
  status: 'valid' | 'expiring' | 'expired' | 'pending' | 'suspended';
  documents: {
    certificate?: string;
    training_record?: string;
    renewal_notice?: string;
  };
  compliance: {
    required: boolean;
    regulatory_authority: string;
    renewal_frequency: number; // en mois
  };
  lastUpdated: string;
}

const ComplianceCertificates = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [employeeFilter, setEmployeeFilter] = useState<string>('all');
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Données mockées pour les certifications
  const certifications: Certification[] = [
    {
      id: '1',
      employee: {
        id: 'emp_001',
        name: 'Marc Dubois',
        position: 'Agent de Piste',
        department: 'Opérations Piste',
        email: 'marc.dubois@company.com',
        phone: '+33 1 23 45 67 89'
      },
      certification: {
        name: 'Sûreté Aéroportuaire',
        category: 'Sécurité',
        authority: 'DGAC',
        level: 'Niveau 1',
        description: 'Certification obligatoire pour accès aux zones de sûreté à accès réglementé'
      },
      dates: {
        issued: '2022-01-15',
        expires: '2025-01-15',
        daysUntilExpiry: -8
      },
      status: 'expired',
      documents: {
        certificate: 'cert_surete_marc_2022.pdf',
        training_record: 'formation_surete_marc_2022.pdf'
      },
      compliance: {
        required: true,
        regulatory_authority: 'DGAC',
        renewal_frequency: 36
      },
      lastUpdated: '2025-01-22'
    },
    {
      id: '2',
      employee: {
        id: 'emp_002',
        name: 'Sarah Martin',
        position: 'Responsable Fret',
        department: 'Fret et Logistique',
        email: 'sarah.martin@company.com',
        phone: '+33 1 23 45 67 90'
      },
      certification: {
        name: 'Transport Matières Dangereuses ADR',
        category: 'Réglementation',
        authority: 'IATA',
        level: 'Conseiller Sécurité',
        description: 'Certification pour manipulation et transport de marchandises dangereuses'
      },
      dates: {
        issued: '2023-01-28',
        expires: '2025-01-28',
        daysUntilExpiry: 5
      },
      status: 'expiring',
      documents: {
        certificate: 'cert_adr_sarah_2023.pdf',
        training_record: 'formation_adr_sarah_2023.pdf',
        renewal_notice: 'rappel_renouvellement_adr_sarah.pdf'
      },
      compliance: {
        required: true,
        regulatory_authority: 'IATA',
        renewal_frequency: 24
      },
      lastUpdated: '2025-01-20'
    },
    {
      id: '3',
      employee: {
        id: 'emp_003',
        name: 'Julie Rousseau',
        position: 'Agent Check-in',
        department: 'Services Passagers',
        email: 'julie.rousseau@company.com',
        phone: '+33 1 23 45 67 91'
      },
      certification: {
        name: 'Certificat Radiotelephonie',
        category: 'Communication',
        authority: 'DGAC',
        level: 'Opérateur',
        description: 'Certification pour communications radio aéronautiques'
      },
      dates: {
        issued: '2022-02-05',
        expires: '2025-02-05',
        daysUntilExpiry: 14
      },
      status: 'expiring',
      documents: {
        certificate: 'cert_radio_julie_2022.pdf'
      },
      compliance: {
        required: true,
        regulatory_authority: 'DGAC',
        renewal_frequency: 36
      },
      lastUpdated: '2025-01-15'
    },
    {
      id: '4',
      employee: {
        id: 'emp_004',
        name: 'Pierre Laurent',
        position: 'Agent de Sûreté',
        department: 'Sécurité',
        email: 'pierre.laurent@company.com',
        phone: '+33 1 23 45 67 92'
      },
      certification: {
        name: 'Permis de Conduire Piste',
        category: 'Conduite',
        authority: 'Aéroport CDG',
        level: 'Catégorie A',
        description: 'Autorisation de conduite sur aires de manœuvre aéroportuaires'
      },
      dates: {
        issued: '2023-03-10',
        expires: '2026-03-10',
        daysUntilExpiry: 413
      },
      status: 'valid',
      documents: {
        certificate: 'permis_piste_pierre_2023.pdf',
        training_record: 'formation_conduite_pierre_2023.pdf'
      },
      compliance: {
        required: true,
        regulatory_authority: 'Aéroport CDG',
        renewal_frequency: 36
      },
      lastUpdated: '2023-03-10'
    },
    {
      id: '5',
      employee: {
        id: 'emp_005',
        name: 'Amélie Moreau',
        position: 'Coordinatrice Fret',
        department: 'Fret et Logistique',
        email: 'amelie.moreau@company.com',
        phone: '+33 1 23 45 67 93'
      },
      certification: {
        name: 'Formation Premiers Secours',
        category: 'Sécurité',
        authority: 'INRS',
        level: 'Sauveteur Secouriste',
        description: 'Formation aux gestes de premiers secours en milieu professionnel'
      },
      dates: {
        issued: '2023-02-22',
        expires: '2025-02-22',
        daysUntilExpiry: 31
      },
      status: 'expiring',
      documents: {
        certificate: 'cert_secours_amelie_2023.pdf'
      },
      compliance: {
        required: false,
        regulatory_authority: 'INRS',
        renewal_frequency: 24
      },
      lastUpdated: '2023-02-22'
    },
    {
      id: '6',
      employee: {
        id: 'emp_006',
        name: 'Thomas Wilson',
        position: 'Agent Bagage',
        department: 'Services Bagage',
        email: 'thomas.wilson@company.com',
        phone: '+33 1 23 45 67 94'
      },
      certification: {
        name: 'Recyclage Sûreté Annuel',
        category: 'Sécurité',
        authority: 'DGAC',
        level: 'Formation Continue',
        description: 'Formation de recyclage annuelle obligatoire en sûreté aéroportuaire'
      },
      dates: {
        issued: '2024-03-01',
        expires: '2025-03-01',
        daysUntilExpiry: 38
      },
      status: 'valid',
      documents: {
        certificate: 'recyclage_surete_thomas_2024.pdf'
      },
      compliance: {
        required: true,
        regulatory_authority: 'DGAC',
        renewal_frequency: 12
      },
      lastUpdated: '2024-03-01'
    }
  ];

  // Filtres
  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = 
      cert.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certification.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certification.authority.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || cert.certification.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesEmployee = employeeFilter === 'all' || cert.employee.id === employeeFilter;
    return matchesSearch && matchesCategory && matchesStatus && matchesEmployee;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-orange-600 bg-orange-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      case 'suspended': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'valid': return 'Valide';
      case 'expiring': return 'Expire bientôt';
      case 'expired': return 'Expiré';
      case 'pending': return 'En attente';
      case 'suspended': return 'Suspendu';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleAddCertification = () => {
    toast({
      title: "Certification ajoutée",
      description: "La nouvelle certification a été enregistrée avec succès.",
    });
    setShowAddDialog(false);
  };

  const handleRenewCertification = (certId: string) => {
    toast({
      title: "Renouvellement initié",
      description: "Le processus de renouvellement a été lancé.",
    });
  };

  const handleContactEmployee = (employee: Certification['employee']) => {
    toast({
      title: "Contact initié",
      description: `Un email a été envoyé à ${employee.name}.`,
    });
  };

  // Statistiques
  const stats = {
    total: filteredCertifications.length,
    valid: filteredCertifications.filter(c => c.status === 'valid').length,
    expiring: filteredCertifications.filter(c => c.status === 'expiring').length,
    expired: filteredCertifications.filter(c => c.status === 'expired').length,
    required: filteredCertifications.filter(c => c.compliance.required).length
  };

  if (!currentUser || (currentUser.role !== 'manager' && currentUser.role !== 'airport_manager')) {
    return (
      <ManagerLayout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-muted-foreground">
            Cette page est réservée aux managers et gestionnaires d'aéroport.
          </p>
        </div>
      </ManagerLayout>
    );
  }

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Certifications</h1>
            <p className="text-gray-600">
              Vue d'ensemble et gestion des certifications de votre équipe
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter Liste
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter Certification
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Ajouter une Nouvelle Certification</DialogTitle>
                  <DialogDescription>
                    Enregistrez une certification existante pour un membre de l'équipe
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="employee">Employé</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emp_001">Marc Dubois</SelectItem>
                          <SelectItem value="emp_002">Sarah Martin</SelectItem>
                          <SelectItem value="emp_003">Julie Rousseau</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="certification">Type de Certification</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="security">Sûreté Aéroportuaire</SelectItem>
                          <SelectItem value="dangerous">Matières Dangereuses</SelectItem>
                          <SelectItem value="radio">Radiotelephonie</SelectItem>
                          <SelectItem value="driving">Conduite Piste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="authority">Autorité Émettrice</Label>
                      <Input placeholder="ex: DGAC, IATA..." />
                    </div>
                    <div>
                      <Label htmlFor="level">Niveau/Grade</Label>
                      <Input placeholder="ex: Niveau 1, Opérateur..." />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="issued">Date d'Obtention</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label htmlFor="expires">Date d'Expiration</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Description de la certification..." />
                  </div>
                  
                  <div>
                    <Label htmlFor="documents">Documents (Optionnel)</Label>
                    <Input type="file" multiple accept=".pdf,.jpg,.png" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddCertification}>
                    Enregistrer Certification
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <Award className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Valides</p>
                  <p className="text-2xl font-bold text-green-600">{stats.valid}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expirent Bientôt</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.expiring}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expirées</p>
                  <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Obligatoires</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.required}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher par nom, certification ou autorité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Sécurité">Sécurité</SelectItem>
                  <SelectItem value="Réglementation">Réglementation</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Conduite">Conduite</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="valid">Valides</SelectItem>
                  <SelectItem value="expiring">Expirent bientôt</SelectItem>
                  <SelectItem value="expired">Expirées</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tableau des Certifications */}
        <Card>
          <CardHeader>
            <CardTitle>Certifications ({filteredCertifications.length})</CardTitle>
            <CardDescription>
              Liste complète des certifications avec statut et échéances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Autorité</TableHead>
                    <TableHead>Date d'Expiration</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Obligatoire</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertifications.map((cert) => (
                    <TableRow key={cert.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <div className="font-medium">{cert.employee.name}</div>
                          <div className="text-sm text-gray-500">
                            {cert.employee.position} • {cert.employee.department}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cert.certification.name}</div>
                          <div className="text-sm text-gray-500">
                            {cert.certification.level && `${cert.certification.level} • `}
                            {cert.certification.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{cert.certification.authority}</TableCell>
                      <TableCell>
                        <div>
                          <div>{formatDate(cert.dates.expires)}</div>
                          <div className={`text-sm ${
                            cert.dates.daysUntilExpiry < 0 ? 'text-red-600' :
                            cert.dates.daysUntilExpiry <= 30 ? 'text-orange-600' : 'text-gray-500'
                          }`}>
                            {cert.dates.daysUntilExpiry < 0 
                              ? `Expiré depuis ${Math.abs(cert.dates.daysUntilExpiry)} jours`
                              : `Dans ${cert.dates.daysUntilExpiry} jours`
                            }
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(cert.status)}>
                          {getStatusLabel(cert.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {cert.compliance.required ? (
                          <CheckCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <div className="h-4 w-4" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" variant="outline" onClick={() => setSelectedCertification(cert)}>
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleContactEmployee(cert.employee)}>
                            <Mail className="h-3 w-3" />
                          </Button>
                          {(cert.status === 'expired' || cert.status === 'expiring') && (
                            <Button size="sm" onClick={() => handleRenewCertification(cert.id)}>
                              <Calendar className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredCertifications.length === 0 && (
              <div className="text-center py-8">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune certification trouvée</h3>
                <p className="text-gray-600">
                  Aucune certification ne correspond aux critères sélectionnés.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Détail Certification Modal */}
        {selectedCertification && (
          <Dialog open={!!selectedCertification} onOpenChange={() => setSelectedCertification(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Détails de la Certification</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Informations Employé</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Nom:</strong> {selectedCertification.employee.name}</div>
                      <div><strong>Poste:</strong> {selectedCertification.employee.position}</div>
                      <div><strong>Département:</strong> {selectedCertification.employee.department}</div>
                      <div><strong>Email:</strong> {selectedCertification.employee.email}</div>
                      <div><strong>Téléphone:</strong> {selectedCertification.employee.phone}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Détails Certification</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Nom:</strong> {selectedCertification.certification.name}</div>
                      <div><strong>Catégorie:</strong> {selectedCertification.certification.category}</div>
                      <div><strong>Autorité:</strong> {selectedCertification.certification.authority}</div>
                      {selectedCertification.certification.level && (
                        <div><strong>Niveau:</strong> {selectedCertification.certification.level}</div>
                      )}
                      <div><strong>Description:</strong> {selectedCertification.certification.description}</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Dates importantes</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Date d'obtention:</strong> {formatDate(selectedCertification.dates.issued)}</div>
                      <div><strong>Date d'expiration:</strong> {formatDate(selectedCertification.dates.expires)}</div>
                      <div><strong>Statut:</strong> 
                        <Badge className={`ml-2 ${getStatusColor(selectedCertification.status)}`}>
                          {getStatusLabel(selectedCertification.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Conformité réglementaire</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Obligatoire:</strong> {selectedCertification.compliance.required ? 'Oui' : 'Non'}</div>
                      <div><strong>Autorité réglementaire:</strong> {selectedCertification.compliance.regulatory_authority}</div>
                      <div><strong>Fréquence de renouvellement:</strong> {selectedCertification.compliance.renewal_frequency} mois</div>
                    </div>
                  </div>
                </div>
                
                {Object.keys(selectedCertification.documents).length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Documents</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedCertification.documents).map(([type, filename]) => (
                        filename && (
                          <div key={type} className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{filename}</span>
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedCertification(null)}>
                  Fermer
                </Button>
                <Button variant="outline" onClick={() => handleContactEmployee(selectedCertification.employee)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter Employé
                </Button>
                {(selectedCertification.status === 'expired' || selectedCertification.status === 'expiring') && (
                  <Button onClick={() => handleRenewCertification(selectedCertification.id)}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Planifier Renouvellement
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ComplianceCertificates; 