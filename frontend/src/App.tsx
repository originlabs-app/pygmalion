import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import EmailConfirmation from '@/components/auth/EmailConfirmation';
import AuthCallback from '@/components/auth/AuthCallback';
import RegistrationPending from '@/pages/RegistrationPending';
import Contact from '@/pages/Contact';
import ForTrainingOrganizations from '@/pages/ForTrainingOrganizations';
import OrganizationRegistration from '@/pages/become-partner/OrganizationRegistration';
import CoursesPage from '@/pages/CoursesPage';
import CourseDetail from '@/pages/CourseDetail';
import StudentDashboard from '@/pages/dashboard/StudentDashboard';
import ManagerDashboard from '@/pages/dashboard/ManagerDashboard';
import AirportManagerDashboard from '@/pages/dashboard/AirportManagerDashboard';
import TrainingOrgDashboard from '@/pages/dashboard/TrainingOrgDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import UserProfile from '@/pages/profile/UserProfile';
import SetupMFA from '@/pages/auth/SetupMFA';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import CreateCourse from '@/pages/courses/CreateCourse';
import AddSession from '@/pages/courses/AddSession';
import UserCertificates from '@/pages/certificates/UserCertificates';
import CertificateView from '@/pages/certificates/CertificateView';
import VerifyCertificate from '@/pages/certificates/VerifyCertificate';
import QRScanPage from '@/pages/certificates/QRScanPage';
import LMSRedirect from '@/pages/lms/LMSRedirect';
import TestCourse from '@/pages/lms/TestCourse';
import NotFound from '@/pages/NotFound';
import TokenizedCertificatePage from '@/pages/certificates/TokenizedCertificatePage';
import KYCVerification from '@/pages/verification/KYCVerification';
import OrganizationsApprovals from '@/pages/admin/OrganizationsApprovals';
import EmailVerified from '@/pages/EmailVerified';

// New Admin Routes
import UserManagement from '@/pages/admin/UserManagement';
import OrganizationManagement from '@/pages/admin/OrganizationManagement';
import CourseManagement from '@/pages/admin/CourseManagement';
import EnrollmentManagement from '@/pages/admin/EnrollmentManagement';

// New Routes
import PaymentPage from '@/pages/payment/PaymentPage';
import PaymentSuccess from '@/pages/payment/PaymentSuccess';
import PaymentCancel from '@/pages/payment/PaymentCancel';
import PendingRequests from '@/pages/manager/PendingRequests';
import TrainingProgress from '@/pages/manager/TrainingProgress';
import TeamManagement from '@/pages/manager/TeamManagement';
import AddTeamMember from '@/pages/manager/AddTeamMember';
import ImportTeam from '@/pages/manager/ImportTeam';
import TeamMemberDetail from '@/pages/manager/TeamMemberDetail';
import SessionsManagement from '@/pages/training-org/SessionsManagement';
import ProfileSetup from '@/pages/training-org/ProfileSetup';
import AdminSettings from '@/pages/admin/AdminSettings';
import AssignTraining from '@/pages/manager/AssignTraining';
import ComplianceDashboard from '@/pages/manager/ComplianceDashboard';
import ComplianceAlerts from '@/pages/manager/ComplianceAlerts';
import ComplianceCalendar from '@/pages/manager/ComplianceCalendar';
import ComplianceCertificates from '@/pages/manager/ComplianceCertificates';
import BudgetOverview from '@/pages/manager/BudgetOverview';
import BudgetAllocation from '@/pages/manager/BudgetAllocation';
import BudgetReports from '@/pages/manager/BudgetReports';
import ManagerSettings from '@/pages/manager/ManagerSettings';
import ProfileRedirect from '@/pages/ProfileRedirect';
import StyleDesign from '@/pages/StyleDesign';
import ForLearners from '@/pages/ForLearners';
import ForCompanies from '@/pages/ForCompanies';
import ForAirports from '@/pages/ForAirports';
import RegisterLearner from '@/pages/auth/RegisterLearner';
import RegisterTrainingOrg from '@/pages/auth/RegisterTrainingOrg';
import RegisterCompany from '@/pages/auth/RegisterCompany';
import RegisterAirport from '@/pages/auth/RegisterAirport';
import TrainingOrgRegistrationPending from '@/pages/training-org/RegistrationPending';
import CompanyRegistrationPending from '@/pages/company/RegistrationPending';
import AirportRegistrationPending from '@/pages/airport/RegistrationPending';

// Student Formations Pages
import StudentFormationsActive from '@/pages/student/StudentFormationsActive';
import StudentFormationsUpcoming from '@/pages/student/StudentFormationsUpcoming';
import StudentFormationsCompleted from '@/pages/student/StudentFormationsCompleted';
import StudentProgress from '@/pages/student/StudentProgress';
import StudentProfile from '@/pages/student/StudentProfile';
import StudentCertificates from '@/pages/student/StudentCertificates';
import CertificateViewer from '@/pages/student/CertificateViewer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/for-learners',
    element: <ForLearners />,
  },
  {
    path: '/for-companies',
    element: <ForCompanies />,
  },
  {
    path: '/for-airports',
    element: <ForAirports />,
  },
  {
    path: '/register/learner',
    element: <RegisterLearner />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/email-confirmation',
    element: <EmailConfirmation />,
  },
  {
    path: '/auth-callback',
    element: <AuthCallback />,
  },
  {
    path: '/registration-pending',
    element: <RegistrationPending />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/style-design',
    element: <StyleDesign />,
  },
  {
    path: '/for-training-organizations',
    element: <ForTrainingOrganizations />,
  },
  {
    path: '/for-training-organizations/register',
    element: <RegisterTrainingOrg />,
  },
  {
    path: '/training-org/registration-pending',
    element: <TrainingOrgRegistrationPending />,
  },
  {
    path: '/courses',
    element: <CoursesPage />,
  },
  {
    path: '/courses/:courseId',
    element: <CourseDetail />,
  },
  {
    path: '/student-dashboard',
    element: <StudentDashboard />,
  },
  // Student Sub-pages
  {
    path: '/student/formations/active',
    element: <StudentFormationsActive />,
  },
  {
    path: '/student/formations/upcoming',
    element: <StudentFormationsUpcoming />,
  },
  {
    path: '/student/formations/completed',
    element: <StudentFormationsCompleted />,
  },
  {
    path: '/student/progress',
    element: <StudentProgress />,
  },
  {
    path: '/student/profile',
    element: <StudentProfile />,
  },
  {
    path: '/student/certificates',
    element: <StudentCertificates />,
  },
  {
    path: '/student/certificate/:certificateId',
    element: <CertificateViewer />,
  },
  {
    path: '/manager-dashboard',
    element: <ManagerDashboard />,
  },
  {
    path: '/airport-manager-dashboard',
    element: <AirportManagerDashboard />,
  },
  {
    path: '/training-org-dashboard',
    element: <TrainingOrgDashboard />,
  },
  {
    path: '/admin-dashboard',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/organizations-approvals',
    element: <OrganizationsApprovals />,
  },
  // Admin Routes
  {
    path: '/admin/users',
    element: <UserManagement />,
  },
  {
    path: '/admin/organizations',
    element: <OrganizationManagement />,
  },
  {
    path: '/admin/courses',
    element: <CourseManagement />,
  },
  {
    path: '/admin/enrollments',
    element: <EnrollmentManagement />,
  },
  {
    path: '/admin/settings',
    element: <AdminSettings />,
  },
  // Payment Routes
  {
    path: '/payment/:sessionId',
    element: <PaymentPage />,
  },
  {
    path: '/payment/success',
    element: <PaymentSuccess />,
  },
  {
    path: '/payment/cancel',
    element: <PaymentCancel />,
  },
  // Manager Routes
  {
    path: '/manager/team',
    element: <TeamManagement />,
  },
  {
    path: '/manager/team/add',
    element: <AddTeamMember />,
  },
  {
    path: '/manager/team/import',
    element: <ImportTeam />,
  },
  {
    path: '/manager/team/:id',
    element: <TeamMemberDetail />,
  },
  {
    path: '/manager/pending-requests',
    element: <PendingRequests />,
  },
  {
    path: '/manager/assign-training',
    element: <AssignTraining />,
  },
  {
    path: '/manager/training/progress',
    element: <TrainingProgress />,
  },
  // Manager Compliance Routes
  {
    path: '/manager/compliance',
    element: <ComplianceDashboard />,
  },
  {
    path: '/manager/compliance/alerts',
    element: <ComplianceAlerts />,
  },
  {
    path: '/manager/compliance/calendar',
    element: <ComplianceCalendar />,
  },
  {
    path: '/manager/compliance/certificates',
    element: <ComplianceCertificates />,
  },
  // Manager Budget Routes
  {
    path: '/manager/budget',
    element: <BudgetOverview />,
  },
  {
    path: '/manager/budget/allocation',
    element: <BudgetAllocation />,
  },
  {
    path: '/manager/budget/reports',
    element: <BudgetReports />,
  },
  // Manager Settings Route
  {
    path: '/manager/settings',
    element: <ManagerSettings />,
  },
  // Training Organization Routes
  {
    path: '/training-org/profile-setup',
    element: <ProfileSetup />,
  },
  {
    path: '/training-org/sessions',
    element: <SessionsManagement />,
  },
  {
    path: '/profile',
    element: <ProfileRedirect />,
  },
  {
    path: '/user-profile',
    element: <UserProfile />,
  },
  {
    path: '/setup-mfa',
    element: <SetupMFA />,
  },
  {
    path: '/courses/create',
    element: <CreateCourse />,
  },
  {
    path: '/courses/:courseId/add-session',
    element: <AddSession />,
  },
  {
    path: '/certificates',
    element: <UserCertificates />,
  },
  {
    path: '/certificate/:id',
    element: <CertificateView />,
  },
  {
    path: '/certificates/tokenize/:id',
    element: <TokenizedCertificatePage />,
  },
  {
    path: '/verify-certificate/:id/:tokenId?',
    element: <VerifyCertificate />,
  },
  {
    path: '/qr-scan',
    element: <QRScanPage />,
  },
  {
    path: '/lms-redirect/:sessionId',
    element: <LMSRedirect />,
  },
  {
    path: '/lms/course/:courseSlug',
    element: <TestCourse />,
  },
  {
    path: '/verification/kyc',
    element: <KYCVerification />,
  },
  {
    path: '/email-verified',
    element: <EmailVerified />,
  },
  {
    path: '/register/company',
    element: <RegisterCompany />,
  },
  {
    path: '/register/airport',
    element: <RegisterAirport />,
  },
  {
    path: '/company/registration-pending',
    element: <CompanyRegistrationPending />,
  },
  {
    path: '/airport/registration-pending',
    element: <AirportRegistrationPending />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
