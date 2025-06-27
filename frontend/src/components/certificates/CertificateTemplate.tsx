
import React from 'react';
import { Certificate } from '@/types';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { QrCode, FileText, Check } from 'lucide-react';

interface CertificateTemplateProps {
  certificate: Certificate;
  showBorder?: boolean;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ 
  certificate, 
  showBorder = true 
}) => {
  const { getCourse } = useCourses();
  const { currentUser } = useAuth();
  const course = getCourse(certificate.courseId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={`relative bg-white ${showBorder ? 'border border-gray-200' : ''} p-10 text-center max-w-4xl mx-auto`}>
      {/* Certificate Header */}
      <div className="mb-8 flex flex-col items-center">
        {course?.provider && (
          <div className="text-lg text-gray-600 mb-1">{course.provider}</div>
        )}
        <h1 className="text-3xl font-bold text-primary mb-2">Certificat de Formation</h1>
        <div className="h-1 w-32 bg-primary mb-4"></div>
        <div className="text-lg">Ce certificat est décerné à</div>
      </div>

      {/* Recipient Name */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 inline-block">
          {currentUser?.name || 'Participant'}
        </h2>
      </div>

      {/* Certificate Body */}
      <div className="mb-8 text-lg">
        <p>pour avoir complété avec succès la formation</p>
        <h3 className="text-xl font-semibold my-4 text-gray-800">
          {course?.title || 'Formation'}
        </h3>
        <p className="text-gray-600">
          Date d'émission: {formatDate(certificate.issueDate)}
        </p>
        <p className="text-gray-600">
          Valide jusqu'au: {formatDate(certificate.expiryDate)}
        </p>
        
        {certificate.tokenId && (
          <div className="flex justify-center items-center mt-4 text-primary">
            <QrCode className="h-5 w-5 mr-2" />
            <span>Certificat vérifié et sécurisé</span>
          </div>
        )}
      </div>

      {/* Certificate Footer */}
      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="h-0.5 w-40 bg-gray-400 mb-2"></div>
          <p className="text-sm text-gray-600">Signature du formateur</p>
        </div>
        
        <div className="flex flex-col items-center">
          {certificate.tokenId && (
            <div className="border border-gray-300 p-4 rounded-md bg-gray-50">
              <QrCode className="h-24 w-24" />
              <div className="text-xs mt-1 text-gray-500">Scan pour vérifier</div>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="h-0.5 w-40 bg-gray-400 mb-2"></div>
          <p className="text-sm text-gray-600">Cachet de l'organisme</p>
        </div>
      </div>

      {/* Certificate ID */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500">
        ID: {certificate.id}
        {certificate.tokenId && <span> • Token: {certificate.tokenId}</span>}
      </div>
    </div>
  );
};

export default CertificateTemplate;
