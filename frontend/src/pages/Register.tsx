
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  let roleText = '';
  let roleDescription = '';
  let roleBenefits = [];
  
  switch (role) {
    case 'student':
      roleText = 'as a Student';
      roleDescription = 'Create your student account to find and enroll in aviation training courses.';
      roleBenefits = [
        'Access specialized aviation training courses',
        'Track your certifications and training progress',
        'Receive notifications for certification renewals',
        'Connect with aviation training providers'
      ];
      break;
    case 'training-org':
      roleText = 'as a Training Organization';
      roleDescription = 'Register your organization to offer aviation courses on our platform.';
      roleBenefits = [
        'Increase visibility for your aviation training programs',
        'Simplified management of course offerings and sessions',
        'Track enrollments and generate required documentation',
        'Connect with aviation companies and professionals'
      ];
      break;
    case 'manager':
      roleText = 'as a Company Manager';
      roleDescription = 'Register to manage training for your company\'s aviation personnel.';
      roleBenefits = [
        'Monitor team certifications and training compliance',
        'Receive alerts for certification renewals and requirements',
        'Easily assign training courses to team members',
        'Generate reports on training status and compliance'
      ];
      break;
          case 'airport_manager':
      roleText = 'as an Airport Manager';
      roleDescription = 'Create an account to coordinate training programs at your airport.';
      roleBenefits = [
        'Ensure compliance across all airport personnel',
        'Monitor training status for all affiliated companies',
        'Receive alerts for certification gaps or expirations',
        'Access comprehensive training analytics for your airport'
      ];
      break;
    default:
      roleText = '';
      roleDescription = 'Join PYGMALION to access the aviation training marketplace';
      roleBenefits = [
        'Find specialized aviation training courses',
        'Track and manage certifications',
        'Connect with aviation training organizations',
        'Ensure compliance with industry regulations'
      ];
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create an Account {roleText}</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {roleDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Benefits Column */}
            <div className="md:col-span-1">
              <div className="bg-muted rounded-lg p-6">
                <h2 className="font-semibold text-lg mb-4">Platform Benefits</h2>
                <ul className="space-y-3">
                  {roleBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    PYGMALION is the central hub for aviation training certification and compliance management.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Registration Form Column */}
            <div className="md:col-span-2">
              <div className="bg-card p-6 rounded-lg border shadow-sm">
                <div className="mb-6 text-center">
                  <h2 className="text-lg font-medium">Registration Wizard</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Follow the steps below to complete your registration
                  </p>
                </div>
                
                <RegisterForm />
                
                <div className="mt-6 text-center text-sm">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  By registering, you agree to PYGMALION's{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
