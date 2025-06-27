
import { Certificate } from '@/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Function to generate a verification URL for QR codes
export const generateVerificationUrl = (certificate: Certificate) => {
  // This would be replaced with your actual domain
  const baseUrl = window.location.origin;
  return `${baseUrl}/verify-certificate/${certificate.id}${certificate.tokenId ? `/${certificate.tokenId}` : ''}`;
};

// Function to generate a PDF from a certificate template
export const generateCertificatePdf = async (certificateElementId: string, filename: string) => {
  try {
    const certificateElement = document.getElementById(certificateElementId);
    
    if (!certificateElement) {
      throw new Error("Certificate element not found");
    }
    
    // Create canvas from the certificate element
    const canvas = await html2canvas(certificateElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });
    
    // Calculate PDF dimensions (A4 format)
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    
    // Add image to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Save PDF
    pdf.save(`${filename}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

// Format date for display
export const formatCertificateDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Check if a certificate is expired
export const isCertificateExpired = (expiryDate: string) => {
  return new Date(expiryDate) < new Date();
};

// Get certificate status
export const getCertificateStatus = (expiryDate: string): 'valid' | 'expiring' | 'expired' => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  
  if (expiry < now) {
    return 'expired';
  }
  
  // Check if expiring within 30 days
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);
  
  if (expiry < thirtyDaysFromNow) {
    return 'expiring';
  }
  
  return 'valid';
};
