
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CoursesTable from './CoursesTable';
import { Card } from '@/components/ui/card';
import CourseFilters from './CourseFilters';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
import { mockCourses } from '@/data/mockAdminData';

const CoursesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const { toast } = useToast();
  
  // Filter courses based on filters
  const filteredCourses = mockCourses.filter(course => {
    // Filter by search term
    if (
      searchTerm && 
      !course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !course.provider.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== 'all' && course.category !== categoryFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && course.status !== statusFilter) {
      return false;
    }
    
    // Filter by provider
    if (providerFilter !== 'all' && course.providerId !== providerFilter) {
      return false;
    }
    
    return true;
  });

  const handleCourseAction = (courseId: string, action: string) => {
    toast({
      title: `Action ${action}`,
      description: `Action ${action} effectuée sur la formation ${courseId}`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Rechercher une formation..."
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
        <CourseFilters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          providerFilter={providerFilter}
          setProviderFilter={setProviderFilter}
        />
      )}
      
      <CoursesTable courses={filteredCourses} onAction={handleCourseAction} />
    </Card>
  );
};

export default CoursesList;
