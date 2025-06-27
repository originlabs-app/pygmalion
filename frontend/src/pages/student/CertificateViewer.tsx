import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Download,
  Share2,
  Eye,
  Shield,
  QrCode,
  Award,
  Calendar,
  User,
  MapPin,
  Clock,
  CheckCircle,
  Globe,
  ArrowLeft,
  Printer,
  ExternalLink,
  FileText,
  Stamp
} from 'lucide-react';

interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  studentName: string;
  studentId: string;
  issueDate: string;
  expiryDate?: string;
  course: string;
  duration: string;
  score?: number;
  grade?: string;
  instructor: string;
  instructorSignature: string;
  location: string;
  certificationBody: string;
  registrationNumber: string;
  skills: string[];
  verificationUrl: string;
  blockchainHash?: string;
  accreditationLogos: string[];
  certificateNumber: string;
  issuingAuthority: string;
  legalMentions: string[];
  qrCodeData: string;
}

const CertificateViewer = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [viewMode, setViewMode] = useState<'preview' | 'official'>('official');

  // Base de données des certificats de démo
  const certificatesDatabase: Record<string, CertificateData> = {
    'cert-1': {
      id: 'cert-1',
      title: 'CERTIFICAT PROFESSIONNEL D\'AGENT DE PISTE AÉROPORTUAIRE',
      issuer: 'GROUND HANDLING ACADEMY',
      issuerLogo: '/logos/ground-handling-academy.png',
      studentName: 'Jean DUPONT',
      studentId: 'GHA-STU-2024-001',
      issueDate: '2024-01-15',
      expiryDate: '2027-01-15',
      course: 'Agent de Piste - Certification Complète IATA',
      duration: '120 heures (4 semaines)',
      score: 87,
      grade: 'B',
      instructor: 'Jean-Pierre LECLERC',
      instructorSignature: 'Expert GSE Certifié IATA',
      location: 'Aéroport Paris-Orly, France',
      certificationBody: 'International Air Transport Association (IATA)',
      registrationNumber: 'IATA-GSE-FR-2024-0142',
      skills: [
        'Manipulation sécurisée des bagages et du fret',
        'Utilisation des équipements GSE (Ground Support Equipment)',
        'Procédures de push-back et remorquage',
        'Prévention FOD (Foreign Object Debris)',
        'Communications aéroportuaires standardisées'
      ],
      verificationUrl: 'https://verify.pygmalion.aviation/cert-1',
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      accreditationLogos: ['IATA', 'DGAC', 'Qualiopi'],
      certificateNumber: 'GHA-2024-001-AP',
      issuingAuthority: 'Organisme de Formation Agréé DGAC n°FR-OF-2023-089',
      legalMentions: [
        'Certificat délivré conformément aux exigences IATA Ground Operations Manual',
        'Formation dispensée selon les standards européens EASA Part 139',
        'Organisme certifié Qualiopi pour la qualité des formations',
        'Certificat reconnu par la Direction Générale de l\'Aviation Civile (DGAC)'
      ],
      qrCodeData: 'https://verify.pygmalion.aviation/cert-1?hash=1a2b3c4d5e6f7890'
    },
    'cert-2': {
      id: 'cert-2',
      title: 'CERTIFICAT DE SOUDAGE AÉRONAUTIQUE EN 4179',
      issuer: 'AEROWELD TRAINING CENTER',
      issuerLogo: '/logos/aeroweld-training.png',
      studentName: 'Jean DUPONT',
      studentId: 'AWTC-STU-2023-142',
      issueDate: '2023-11-20',
      expiryDate: '2026-11-20',
      course: 'Soudage Aéronautique - Certification EN 4179',
      duration: '120 heures (3 semaines)',
      score: 94,
      grade: 'A',
      instructor: 'Marie DUBOIS',
      instructorSignature: 'Ingénieur Soudage Senior IWS',
      location: 'Centre Technique Bordeaux, France',
      certificationBody: 'European Welding Federation (EWF)',
      registrationNumber: 'EN-4179-FR-2023-0891',
      skills: [
        'Soudage TIG sur alliages d\'aluminium aviation',
        'Soudage d\'aciers inoxydables aéronautiques',
        'Techniques de soudage plasma et laser',
        'Contrôle qualité et tests destructifs/non-destructifs',
        'Réparation de pièces critiques selon normes Airbus/Boeing'
      ],
      verificationUrl: 'https://verify.pygmalion.aviation/cert-2',
      blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      accreditationLogos: ['EN 4179', 'Airbus', 'Qualiopi'],
      certificateNumber: 'AWTC-2023-EN4179-142',
      issuingAuthority: 'Centre de Formation Agréé EN ISO 3834-2',
      legalMentions: [
        'Certificat conforme à la norme européenne EN 4179',
        'Qualification reconnue par Airbus et Boeing',
        'Formation dispensée selon ISO 3834-2',
        'Certificat valable dans tous les pays de l\'UE'
      ],
      qrCodeData: 'https://verify.pygmalion.aviation/cert-2?hash=2b3c4d5e6f7890'
    },
    'cert-3': {
      id: 'cert-3',
      title: 'ATTESTATION MANAGEMENT AVIATION SAFETY (SMS)',
      issuer: 'AVIATION SAFETY INSTITUTE',
      issuerLogo: '/logos/aviation-safety.png',
      studentName: 'Jean DUPONT',
      studentId: 'ASI-STU-2023-089',
      issueDate: '2023-09-10',
      expiryDate: '2025-09-10',
      course: 'Management Aviation Safety (SMS)',
      duration: '80 heures (6 semaines)',
      score: 76,
      grade: 'C',
      instructor: 'Dr. Philippe MARTIN',
      instructorSignature: 'Expert SMS ICAO',
      location: 'Formation Virtuelle',
      certificationBody: 'International Civil Aviation Organization (ICAO)',
      registrationNumber: 'ICAO-SMS-FR-2023-0456',
      skills: [
        'Analyse et évaluation des risques aviation',
        'Mise en place de systèmes SMS',
        'Investigation d\'incidents et accidents',
        'Développement de la culture sécurité',
        'Conformité réglementaire ICAO Annexe 19'
      ],
      verificationUrl: 'https://verify.pygmalion.aviation/cert-3',
      accreditationLogos: ['ICAO', 'DGAC', 'Qualiopi'],
      certificateNumber: 'ASI-2023-SMS-089',
      issuingAuthority: 'Institut Agréé ICAO Training Plus Programme',
      legalMentions: [
        'Formation conforme aux standards ICAO Annexe 19',
        'Attestation reconnue par l\'Aviation Civile Internationale',
        'Formation dispensée par instructeurs certifiés ICAO',
        'Valide pour les postes de management sécurité aviation'
      ],
      qrCodeData: 'https://verify.pygmalion.aviation/cert-3?hash=3c4d5e6f7890'
    }
  };

  const certificate = certificatesDatabase[certificateId || 'cert-1'];

  if (!certificate) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Certificat non trouvé</h1>
          <Button asChild>
            <Link to="/student/certificates">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux certificats
            </Link>
          </Button>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête avec actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/student/certificates">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Visualisation Certificat</h1>
              <p className="text-gray-600">#{certificate.certificateNumber}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
            <Button size="sm" asChild>
              <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Vérifier en ligne
              </a>
            </Button>
          </div>
        </div>

        {/* Certificat Officiel */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-0">
            
            {/* Certificat - Style Officiel */}
            <div className="bg-white p-8 border-8 border-double border-blue-800">
              
              {/* En-tête avec logos */}
              <div className="text-center border-b-4 border-blue-800 pb-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award className="h-12 w-12 text-blue-800" />
                  </div>
                  <div className="flex-1 mx-6">
                    <h1 className="text-2xl font-bold text-blue-900 mb-2">
                      {certificate.title}
                    </h1>
                    <div className="text-lg font-semibold text-gray-700">
                      {certificate.issuer}
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-600" />
                  </div>
                </div>
                
                {/* Logos d'accréditation */}
                <div className="flex justify-center gap-6 mt-4">
                  {certificate.accreditationLogos.map((logo, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {logo}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Corps du certificat */}
              <div className="space-y-6">
                
                {/* Texte principal */}
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    Il est certifié par les présentes que
                  </p>
                  <h2 className="text-3xl font-bold text-blue-900 mb-4 underline decoration-2">
                    {certificate.studentName}
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    a suivi avec succès la formation
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    « {certificate.course} »
                  </h3>
                </div>

                {/* Détails de la formation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Date d'émission:</span>
                      <span>{new Date(certificate.issueDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    
                    {certificate.expiryDate && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Valide jusqu'au:</span>
                        <span>{new Date(certificate.expiryDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Lieu:</span>
                      <span>{certificate.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Durée:</span>
                      <span>{certificate.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {certificate.score && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">Score obtenu:</span>
                        <span className="font-bold text-green-600">{certificate.score}%</span>
                        <Badge variant="outline">Note {certificate.grade}</Badge>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Instructeur:</span>
                      <span>{certificate.instructor}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-red-600" />
                      <span className="font-medium">N° d'enregistrement:</span>
                      <span className="font-mono text-sm">{certificate.registrationNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Compétences validées */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                    Compétences Professionnelles Validées
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {certificate.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Signatures et validation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Signature instructeur */}
                  <div className="text-center">
                    <div className="border-b-2 border-gray-300 mb-2 h-16 flex items-end justify-center">
                      <span className="italic text-gray-600 text-lg font-serif">
                        {certificate.instructor}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Instructeur Certifié</p>
                    <p className="text-xs text-gray-500">{certificate.instructorSignature}</p>
                  </div>
                  
                  {/* QR Code de vérification */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded mx-auto mb-2 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600">Code de Vérification</p>
                    <p className="text-xs text-gray-500">Scan pour authentifier</p>
                  </div>
                  
                  {/* Sceau officiel */}
                  <div className="text-center">
                    <div className="w-24 h-24 border-4 border-red-600 rounded-full mx-auto mb-2 flex items-center justify-center bg-red-50">
                      <Stamp className="h-12 w-12 text-red-600" />
                    </div>
                    <p className="text-sm text-gray-600">Sceau Officiel</p>
                    <p className="text-xs text-gray-500">{certificate.certificationBody}</p>
                  </div>
                </div>

                {/* Mentions légales */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Autorité de Délivrance:</h5>
                  <p className="text-sm text-gray-700 mb-3">{certificate.issuingAuthority}</p>
                  
                  <h5 className="font-semibold text-gray-800 mb-2">Mentions Légales:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {certificate.legalMentions.map((mention, index) => (
                      <li key={index}>• {mention}</li>
                    ))}
                  </ul>
                </div>

                {/* Blockchain et sécurité */}
                {certificate.blockchainHash && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Sécurisation Blockchain</span>
                    </div>
                    <p className="text-sm text-purple-800 mb-2">
                      Ce certificat est sécurisé et vérifiable sur la blockchain.
                    </p>
                    <div className="bg-white p-2 rounded border">
                      <p className="text-xs font-mono text-gray-700">
                        Hash: {certificate.blockchainHash}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center pt-6 border-t-2 border-gray-200">
                  <p className="text-sm text-gray-600">
                    Certificat généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Vérifiable en ligne sur {certificate.verificationUrl}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations supplémentaires */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informations de Vérification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Authentification:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Numéro de certificat:</span>
                    <span className="font-mono">{certificate.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ID Étudiant:</span>
                    <span className="font-mono">{certificate.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>URL de vérification:</span>
                    <a href={certificate.verificationUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      Vérifier
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Statut:</h4>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Certificat Valide
                  </Badge>
                  {certificate.blockchainHash && (
                    <Badge className="bg-purple-100 text-purple-800 block">
                      <Shield className="h-3 w-3 mr-1" />
                      Sécurisé Blockchain
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default CertificateViewer; 