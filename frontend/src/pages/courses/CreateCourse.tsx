
import React from 'react';
import Layout from '@/components/layout/Layout';
import CourseFormContainer from '@/components/courses/create/CourseFormContainer';

const CreateCourse: React.FC = () => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Créer une nouvelle formation</h1>
          <p className="text-muted-foreground mt-2">
            Renseignez les informations de votre formation pour la publier sur la plateforme
          </p>
        </div>

        <CourseFormContainer />
      </div>
    </Layout>
  );
};

export default CreateCourse;
