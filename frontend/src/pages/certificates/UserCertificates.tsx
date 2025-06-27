
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import CertificateCard from '@/components/certificates/CertificateCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCourses } from '@/contexts/CourseContext';
import { Button } from '@/components/ui/button';
import { Search, Filter, QrCode } from 'lucide-react';
import { Certificate } from '@/types';
import { getCertificateStatus } from '@/utils/certificateUtils';

// Sample certificates data (to be replaced with real API data)
const SAMPLE_CERTIFICATES: Certificate[] = [
  {
    id: '1',
    userId: '1',
    courseId: '1',
    courseName: 'Sécurité en Piste',
    category: 'Safety',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    tokenId: 'abc123',
    status: 'valid',
  },
  {
    id: '2',
    userId: '1',
    courseId: '2',
    courseName: 'Gestion des Opérations',
    category: 'Operations',
    issueDate: '2023-06-30',
    expiryDate: '2024-06-30',
    status: 'expiring',
  },
  {
    id: '3',
    userId: '1',
    courseId: '3',
    courseName: 'Maintenance Aéronautique',
    category: 'Maintenance',
    issueDate: '2022-09-10',
    expiryDate: '2023-09-10',
    status: 'expired',
  },
  {
    id: '4',
    userId: '1',
    courseId: '4',
    courseName: 'Navigation Avancée',
    category: 'Navigation',
    issueDate: '2024-03-01',
    expiryDate: '2026-03-01',
    tokenId: 'xyz789',
    status: 'valid',
  },
];

const UserCertificates: React.FC = () => {
  const { currentUser } = useAuth();
  const { AVIATION_CATEGORIES, getCourse } = useCourses();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filter certificates
  const filteredCertificates = SAMPLE_CERTIFICATES.filter((cert) => {
    // In a real application, we would filter based on actual user ID
    const belongsToUser = cert.userId === currentUser?.id;
    
    // Apply search filter
    const course = getCourse(cert.courseId);
    const matchesSearch = searchTerm === '' || 
      (course && course.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply status filter
    const certStatus = getCertificateStatus(cert.expiryDate);
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'valid' && certStatus === 'valid') ||
      (statusFilter === 'expiring' && certStatus === 'expiring') ||
      (statusFilter === 'expired' && certStatus === 'expired');
    
    // Apply category filter
    const matchesCategory = 
      categoryFilter === 'all' || 
      (course && course.category === categoryFilter);
    
    return belongsToUser && matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Handle view certificate
  const handleViewCertificate = (certificate: Certificate) => {
    navigate(`/certificate/${certificate.id}`);
  };
  
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Mes certificats</h1>
            <p className="text-muted-foreground">
              Gérez vos certificats de formation et qualifications
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => navigate('/certificates/qr-scan')}>
              <QrCode className="h-4 w-4 mr-2" />
              Scanner un QR code
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-card rounded-lg border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom de formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="valid">Valide</SelectItem>
                  <SelectItem value="expiring">Expire bientôt</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {AVIATION_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>
        
        {/* Certificates Grid */}
        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <CertificateCard 
                key={certificate.id} 
                certificate={certificate} 
                onView={handleViewCertificate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Aucun certificat trouvé</h3>
            <p className="text-muted-foreground">
              Vous n'avez pas encore obtenu de certificats ou ils ne correspondent pas aux filtres sélectionnés.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserCertificates;
