
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import EnrollmentsTable from './EnrollmentsTable';
import EnrollmentFilters from './EnrollmentFilters';
import LMSStatusList from './LMSStatusList';
import EnrollmentStats from './EnrollmentStats';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
import { mockEnrollments } from '@/data/mockAdminData';

const EnrollmentsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const { toast } = useToast();
  
  // Filter enrollments based on filters
  const filteredEnrollments = mockEnrollments.filter(enrollment => {
    // Filter by search term (student name or course name)
    if (
      searchTerm && 
      !enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !enrollment.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && enrollment.status !== statusFilter) {
      return false;
    }
    
    // Filter by date (simplified for demo)
    if (dateFilter === 'today') {
      const today = new Date().toDateString();
      const enrollmentDate = new Date(enrollment.enrollmentDate).toDateString();
      if (enrollmentDate !== today) return false;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      if (new Date(enrollment.enrollmentDate) < weekAgo) return false;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      if (new Date(enrollment.enrollmentDate) < monthAgo) return false;
    }
    
    return true;
  });

  const handleEnrollmentAction = (enrollmentId: string, action: string) => {
    toast({
      title: `Action ${action}`,
      description: `Action ${action} effectuée sur l'inscription ${enrollmentId}`,
    });
  };

  return (
    <div className="space-y-8">
      <EnrollmentStats />
      
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Rechercher une inscription..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full md:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>
        
        {showFilters && (
          <EnrollmentFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        )}
        
        <EnrollmentsTable enrollments={filteredEnrollments} onAction={handleEnrollmentAction} />
      </Card>
      
      <LMSStatusList />
    </div>
  );
};

export default EnrollmentsList;
