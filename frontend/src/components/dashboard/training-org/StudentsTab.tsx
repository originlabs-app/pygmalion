
import React, { useState, useMemo } from 'react';
import { Enrollment } from '@/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EnrollmentsTable from '@/components/dashboard/EnrollmentsTable';
import { useCourses } from '@/contexts/CourseContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SessionEnrollmentsList from './SessionEnrollmentsList';

interface StudentsTabProps {
  enrollments: Enrollment[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({ enrollments }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  
  const { courses } = useCourses();
  
  // Get unique courses from enrollments
  const uniqueCourses = useMemo(() => {
    const courseIds = new Set<string>();
    enrollments.forEach(enrollment => {
      courseIds.add(enrollment.courseId);
    });
    
    return Array.from(courseIds)
      .map(id => courses.find(course => course.id === id))
      .filter(Boolean);
  }, [enrollments, courses]);
  
  // Get unique sessions from selected course
  const sessions = useMemo(() => {
    if (!selectedCourse) return [];
    
    const course = courses.find(c => c.id === selectedCourse);
    return course ? course.sessions : [];
  }, [selectedCourse, courses]);
  
  // Filter enrollments
  const filteredEnrollments = useMemo(() => {
    let filtered = [...enrollments];
    
    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(e => e.status === filter);
    }
    
    // Filter by course
    if (selectedCourse) {
      filtered = filtered.filter(e => e.courseId === selectedCourse);
      
      // Filter by session
      if (selectedSession) {
        filtered = filtered.filter(e => e.sessionId === selectedSession);
      }
    }
    
    // Handle search (would need student data in a real app)
    if (searchQuery.trim() !== '') {
      // In a real app, we'd search by student name, email, etc.
      // For demo, just assume we're filtering by some property
      filtered = filtered.filter(e => 
        e.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [enrollments, filter, searchQuery, selectedCourse, selectedSession]);
  
  // Reset session if course changes
  React.useEffect(() => {
    setSelectedSession(null);
  }, [selectedCourse]);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all_students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all_students">Tous les apprenants</TabsTrigger>
          <TabsTrigger value="by_session">Par session</TabsTrigger>
        </TabsList>
        
        {/* View all students tab */}
        <TabsContent value="all_students">
          <DashboardCard 
            title="Liste des apprenants"
            description="Tous les apprenants inscrits à vos formations"
          >
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
                <div className="flex-1">
                  <Input
                    placeholder="Rechercher un apprenant..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="approved">Inscrit</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-64">
                  <Select 
                    value={selectedCourse || "none"} 
                    onValueChange={(value) => setSelectedCourse(value === "none" ? null : value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrer par formation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Toutes formations</SelectItem>
                      {uniqueCourses.map(course => course && (
                        <SelectItem key={course.id} value={course.id}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedCourse && (
                  <div className="w-full md:w-48">
                    <Select 
                      value={selectedSession || "none"} 
                      onValueChange={(value) => setSelectedSession(value === "none" ? null : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Toutes sessions</SelectItem>
                        {sessions.map(session => (
                          <SelectItem key={session.id} value={session.id}>
                            {new Date(session.startDate).toLocaleDateString('fr-FR')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {(filter !== 'all' || searchQuery || selectedCourse) && (
                  <Button variant="outline" onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                    setSelectedCourse(null);
                    setSelectedSession(null);
                  }}>
                    Réinitialiser
                  </Button>
                )}
              </div>
              
              <EnrollmentsTable 
                enrollments={filteredEnrollments}
                showStudentInfo={true}
              />
            </div>
          </DashboardCard>
        </TabsContent>
        
        {/* View by session tab */}
        <TabsContent value="by_session">
          <SessionEnrollmentsList 
            courses={uniqueCourses.filter(Boolean)} 
            enrollments={enrollments} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentsTab;
