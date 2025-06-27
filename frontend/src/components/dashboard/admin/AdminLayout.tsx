
import React, { ReactNode } from 'react';
import Layout from '@/components/layout/Layout';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  title, 
  description, 
  children, 
  action
}) => {
  return (
    <Layout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <AdminSidebar className="w-full md:w-64 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
              {action && <div>{action}</div>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLayout;
