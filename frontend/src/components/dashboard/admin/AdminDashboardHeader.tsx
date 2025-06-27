
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdminDashboardHeaderProps {
  adminName: string;
}

const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({ adminName }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {adminName}
        </p>
      </div>
      <div className="mt-4 md:mt-0">
        <Button asChild>
          <Link to="/admin/settings">Platform Settings</Link>
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
