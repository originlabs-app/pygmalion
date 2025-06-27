
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const RegistrationPending = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Registration Submitted</h1>
          
          <div className="bg-card p-6 rounded-lg border shadow-sm mb-6">
            <p className="mb-4">
              Thank you for registering with MBAVIATION. Your account application is now pending review by our administrators.
            </p>
            
            <p className="mb-4">
              We will verify your information and approve your account as soon as possible. You'll receive an email notification when your account has been approved.
            </p>
            
            <p className="text-muted-foreground">
              If you have any questions, please don't hesitate to contact our support team.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Return to Homepage</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegistrationPending;
