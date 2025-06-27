
import { Enrollment, Course, Certificate } from '@/types';

/**
 * Generates certificate data from completed enrollments
 * This is a demo helper - in production this would be replaced with API calls
 */
export const generateCertificatesFromEnrollments = (
  completedEnrollments: Enrollment[],
  userId: string,
  getCourse: (id: string) => Course | undefined
): Certificate[] => {
  return completedEnrollments.map(enrollment => {
    const course = getCourse(enrollment.courseId);
    // Generate random issue date in the past
    const issueDate = new Date(enrollment.enrollmentDate);
    // Set expiry date to 1 year after issue
    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    // Simulate different certificate statuses for demo
    // Some certificates will be expiring soon
    const randomAdjustment = Math.floor(Math.random() * 10) - 5;
    if (randomAdjustment > 0) {
      expiryDate.setMonth(expiryDate.getMonth() - 10); // Make some expire soon
    }
    
    // Determine certificate status
    const now = new Date();
    let status: 'valid' | 'expiring' | 'expired';
    
    if (now > expiryDate) {
      status = 'expired';
    } else {
      // Check if expiring within 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(now.getDate() + 30);
      status = expiryDate < thirtyDaysFromNow ? 'expiring' : 'valid';
    }

    return {
      id: `cert-${enrollment.id}`,
      userId,
      courseId: enrollment.courseId,
      courseName: course?.title || 'Formation inconnue',
      category: course?.category || 'Catégorie inconnue',
      issueDate: issueDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: status,
      tokenId: Math.random() > 0.5 ? `token-${Math.random().toString(36).substr(2, 9)}` : undefined
    };
  });
};
