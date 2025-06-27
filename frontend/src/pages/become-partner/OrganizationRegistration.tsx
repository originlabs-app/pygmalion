
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import OrganizationRegistrationForm from '@/components/become-partner/OrganizationRegistrationForm';

const OrganizationRegistration = () => {
  const navigate = useNavigate();
  
  const handleSuccessfulRegistration = () => {
    navigate('/registration-pending');
  };
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Devenir Organisme de Formation Partenaire</h1>
          <p className="text-muted-foreground mb-8">
            Remplissez ce formulaire pour soumettre votre candidature et rejoindre notre réseau d'organismes de formation spécialisés dans le secteur aéronautique.
          </p>
          
          <OrganizationRegistrationForm onSuccess={handleSuccessfulRegistration} />
        </div>
      </div>
    </Layout>
  );
};

export default OrganizationRegistration;
