import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Award,
  Download,
  Eye,
  Share2,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Trophy,
  Star,
  Clock,
  Shield,
  Zap,
  QrCode,
  FileText,
  Copy,
  Globe
} from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: string;
  issueDate: string;
  expiryDate?: string;
  status: 'valid' | 'expiring' | 'expired' | 'pending';
  type: 'completion' | 'certification' | 'achievement';
  downloadUrl: string;
  verificationUrl: string;
  blockchainHash?: string;
  score?: number;
  creditsEarned: number;
  skills: string[];
  isTokenized: boolean;
  shareUrl: string;
}

const StudentCertificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');

  // Données mockées des certificats - basées sur le catalogue réel
  const certificates: Certificate[] = [
    {
      id: 'cert-1',
      title: 'Agent de Piste - Certification Complete IATA',
      issuer: 'Ground Handling Academy',
      category: 'Operations Aéroportuaires',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      status: 'valid',
      type: 'certification',
      downloadUrl: '/certificates/agent-piste-iata.pdf',
      verificationUrl: 'https://verify.pygmalion.com/cert-1',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      score: 87,
      creditsEarned: 12,
      skills: ['Manipulation bagages', 'Équipements GSE', 'Push-back', 'Sécurité aéroportuaire'],
      isTokenized: true,
      shareUrl: 'https://profiles.pygmalion.com/certificates/cert-1'
    },
    {
      id: 'cert-2',
      title: 'Soudage Aéronautique - Certification EN 4179',
      issuer: 'AeroWeld Training Center',
      category: 'Fabrication Aéronautique',
      issueDate: '2023-11-20',
      expiryDate: '2026-11-20',
      status: 'valid',
      type: 'certification',
      downloadUrl: '/certificates/soudage-aeronautique.pdf',
      verificationUrl: 'https://verify.pygmalion.com/cert-2',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      score: 94,
      creditsEarned: 15,
      skills: ['Soudage TIG', 'Alliages aviation', 'Contrôle qualité', 'Normes EN 4179'],
      isTokenized: true,
      shareUrl: 'https://profiles.pygmalion.com/certificates/cert-2'
    },
    {
      id: 'cert-3',
      title: 'Management Aviation Safety (SMS)',
      issuer: 'Aviation Safety Institute',
      category: 'Management Sécurité',
      issueDate: '2023-09-10',
      expiryDate: '2025-09-10',
      status: 'expiring',
      type: 'completion',
      downloadUrl: '/certificates/aviation-safety-management.pdf',
      verificationUrl: 'https://verify.pygmalion.com/cert-3',
      score: 76,
      creditsEarned: 10,
      skills: ['Analyse de risques', 'Système SMS', 'Investigation incidents', 'Culture sécurité'],
      isTokenized: false,
      shareUrl: 'https://profiles.pygmalion.com/certificates/cert-3'
    },
    {
      id: 'cert-4',
      title: 'Sûreté Aéroportuaire - Module Certification',
      issuer: 'AeroSecure Training',
      category: 'Sécurité Aéroportuaire',
      issueDate: '2024-01-22',
      status: 'pending',
      type: 'certification',
      downloadUrl: '',
      verificationUrl: '',
      creditsEarned: 8,
      skills: ['Contrôle d\'accès', 'Zones réglementées', 'Détection menaces', 'Procédures sécurité'],
      isTokenized: false,
      shareUrl: ''
    }
  ];

  // Fonctions utilitaires
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-orange-600 bg-orange-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'valid': return 'Valide';
      case 'expiring': return 'Expire bientôt';
      case 'expired': return 'Expiré';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="h-4 w-4" />;
      case 'expiring': return <Clock className="h-4 w-4" />;
      case 'expired': return <AlertTriangle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'certification': return 'text-purple-600 bg-purple-100';
      case 'completion': return 'text-blue-600 bg-blue-100';
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'certification': return 'Certification';
      case 'completion': return 'Attestation';
      case 'achievement': return 'Accomplissement';
      default: return type;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Filtrage
  const filteredCertificates = certificates
    .filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'valid' && cert.status === 'valid') ||
                        (activeTab === 'expiring' && cert.status === 'expiring') ||
                        (activeTab === 'tokenized' && cert.isTokenized);
      return matchesSearch && matchesCategory && matchesStatus && matchesTab;
    });

  // Statistiques
  const validCount = certificates.filter(c => c.status === 'valid').length;
  const expiringCount = certificates.filter(c => c.status === 'expiring').length;
  const tokenizedCount = certificates.filter(c => c.isTokenized).length;
  const totalCredits = certificates.filter(c => c.status === 'valid').reduce((sum, c) => sum + c.creditsEarned, 0);

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Award className="h-8 w-8 text-yellow-600" />
              Mes Certificats
            </h1>
            <p className="text-gray-600">
              Gérez et partagez vos {certificates.length} certifications professionnelles
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Tout Télécharger
            </Button>
            <Button size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager Profil
            </Button>
          </div>
        </div>

        {/* Alert pour les certificats qui expirent */}
        {expiringCount > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Vous avez {expiringCount} certificat{expiringCount > 1 ? 's' : ''} qui expire{expiringCount > 1 ? 'nt' : ''} bientôt. 
              <Button variant="link" className="p-0 h-auto ml-1 text-orange-600 underline">
                Voir les renouvellements
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* KPIs Certificats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certificats Valides</p>
                  <p className="text-3xl font-bold text-green-600">{validCount}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expirent Bientôt</p>
                  <p className="text-3xl font-bold text-orange-600">{expiringCount}</p>
                </div>
                <Clock className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tokenisés</p>
                  <p className="text-3xl font-bold text-purple-600">{tokenizedCount}</p>
                </div>
                <Shield className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Crédits Gagnés</p>
                  <p className="text-3xl font-bold text-blue-600">{totalCredits}</p>
                </div>
                <Star className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Onglets et Filtres */}
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Tous ({certificates.length})</TabsTrigger>
              <TabsTrigger value="valid">Valides ({validCount})</TabsTrigger>
              <TabsTrigger value="expiring">Expire ({expiringCount})</TabsTrigger>
              <TabsTrigger value="tokenized">Tokenisés ({tokenizedCount})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Filtres avancés */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher un certificat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    <SelectItem value="Operations Aéroportuaires">Operations Aéroportuaires</SelectItem>
                    <SelectItem value="Fabrication Aéronautique">Fabrication Aéronautique</SelectItem>
                    <SelectItem value="Management Sécurité">Management Sécurité</SelectItem>
                    <SelectItem value="Sécurité Aéroportuaire">Sécurité Aéroportuaire</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous statuts</SelectItem>
                    <SelectItem value="valid">Valide</SelectItem>
                    <SelectItem value="expiring">Expire bientôt</SelectItem>
                    <SelectItem value="expired">Expiré</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des Certificats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCertificates.map((certificate) => {
            const daysUntilExpiry = certificate.expiryDate ? getDaysUntilExpiry(certificate.expiryDate) : null;
            
            return (
              <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-600" />
                        {certificate.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {certificate.issuer}
                        </span>
                        <Badge variant="outline">{certificate.category}</Badge>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(certificate.status)}>
                        {getStatusIcon(certificate.status)}
                        <span className="ml-1">{getStatusLabel(certificate.status)}</span>
                      </Badge>
                      <Badge className={getTypeColor(certificate.type)} variant="outline">
                        {getTypeLabel(certificate.type)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Informations de base */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Émis le {new Date(certificate.issueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {certificate.expiryDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Expire le {new Date(certificate.expiryDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-400" />
                      <span>{certificate.creditsEarned} crédits</span>
                    </div>
                    {certificate.score && (
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-gray-400" />
                        <span>Score: {certificate.score}%</span>
                      </div>
                    )}
                  </div>

                  {/* Alerte d'expiration */}
                  {certificate.status === 'expiring' && daysUntilExpiry !== null && (
                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-orange-800">
                          Expire dans {daysUntilExpiry} jour{daysUntilExpiry > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tokenisation */}
                  {certificate.isTokenized && (
                    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">Sécurisé sur Blockchain</span>
                        {certificate.blockchainHash && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-6"
                            onClick={() => copyToClipboard(certificate.blockchainHash!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Compétences acquises */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Compétences validées :</div>
                    <div className="flex flex-wrap gap-1">
                      {certificate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {certificate.status !== 'pending' && (
                      <>
                        <Button size="sm" className="flex-1" asChild>
                          <a href={certificate.downloadUrl} download>
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/student/certificate/${certificate.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Partager
                        </Button>
                        {certificate.verificationUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </>
                    )}
                    
                    {certificate.status === 'pending' && (
                      <div className="flex-1 text-center py-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-2" />
                        Certificat en cours de génération
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Section Portefeuille Numérique */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Portefeuille Numérique
            </CardTitle>
            <CardDescription>
              Partagez vos certifications en ligne de manière sécurisée
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">URL de partage de profil :</h4>
                <div className="flex gap-2">
                  <Input 
                    value="https://profiles.pygmalion.com/jean-dupont" 
                    readOnly 
                    className="bg-white"
                  />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard("https://profiles.pygmalion.com/jean-dupont")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Code QR de vérification :</h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white border-2 border-purple-200 rounded-lg flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-purple-600" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger QR
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentCertificates; 