
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PendingOrg {
  id: string;
  name: string;
  contactName: string;
  email: string;
  type: string;
  date: string;
}

interface PendingApprovalsSectionProps {
  pendingOrgs: PendingOrg[];
}

const PendingApprovalsSection: React.FC<PendingApprovalsSectionProps> = ({ pendingOrgs }) => {
  return (
    <div className="mb-8">
      <DashboardCard 
        title="Pending Organization Approvals" 
        description="Organizations waiting for verification and activation"
        action={
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/organizations-approvals">View All</Link>
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrgs.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>
                    <div>{org.contactName}</div>
                    <div className="text-sm text-muted-foreground">{org.email}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={org.type === 'training-org' ? 'default' : 'secondary'}>
                      {org.type === 'training-org' ? 'Training Organization' : 'Company Manager'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(org.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">Review</Button>
                    <Button variant="default" size="sm">Approve</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardCard>
    </div>
  );
};

export default PendingApprovalsSection;
