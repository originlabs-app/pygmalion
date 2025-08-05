import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/types';
import { quizService } from '@/services/quizService';
import { examService } from '@/services/examService';
import QuizResultsTable from './results/QuizResultsTable';
import ExamResultsTable from './results/ExamResultsTable';
import ResultsOverview from './results/ResultsOverview';
import { FileText, ClipboardList, TrendingUp, Users, FileSpreadsheet } from 'lucide-react';
import { exportCourseResults } from '@/utils/exportUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ResultsTabProps {
  courses: Course[];
}

const ResultsTab: React.FC<ResultsTabProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [examResults, setExamResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('overview');

  useEffect(() => {
    if (selectedCourse && selectedCourse !== 'all') {
      loadResults(selectedCourse);
    } else if (courses.length > 0) {
      loadAllResults();
    }
  }, [selectedCourse, courses]);

  const loadResults = async (courseId: string) => {
    try {
      setLoading(true);
      const [quizData, examData] = await Promise.all([
        quizService.getCourseResults(courseId),
        examService.getCourseResults(courseId)
      ]);
      setQuizResults(quizData);
      setExamResults(examData);
    } catch (error) {
      logger.error('Erreur lors du chargement des résultats:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAllResults = async () => {
    try {
      setLoading(true);
      const allQuizResults: any[] = [];
      const allExamResults: any[] = [];

      await Promise.all(
        courses.map(async (course) => {
          try {
            const [quizData, examData] = await Promise.all([
              quizService.getCourseResults(course.id),
              examService.getCourseResults(course.id)
            ]);
            allQuizResults.push(...quizData);
            allExamResults.push(...examData);
          } catch (error) {
            logger.error(`Erreur pour le cours ${course.id}:`, error);
          }
        })
      );

      setQuizResults(allQuizResults);
      setExamResults(allExamResults);
    } catch (error) {
      logger.error('Erreur lors du chargement des résultats:', error);
    } finally {
      setLoading(false);
    }
  };

  const publishedCourses = courses.filter(c => c.status === 'published');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Résultats des évaluations</CardTitle>
              <CardDescription>
                Consultez les performances de vos apprenants aux quiz et examens
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Sélectionner une formation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les formations</SelectItem>
                  {publishedCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Exporter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    const courseName = selectedCourse === 'all' 
                      ? 'Toutes les formations' 
                      : courses.find(c => c.id === selectedCourse)?.title || 'Formation';
                    exportCourseResults(courseName, quizResults, examResults, 'csv');
                  }}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Exporter en CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    const courseName = selectedCourse === 'all' 
                      ? 'Toutes les formations' 
                      : courses.find(c => c.id === selectedCourse)?.title || 'Formation';
                    exportCourseResults(courseName, quizResults, examResults, 'pdf');
                  }}>
                    <FileText className="h-4 w-4 mr-2" />
                    Exporter en PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Quiz
              </TabsTrigger>
              <TabsTrigger value="exams" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Examens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ResultsOverview 
                quizResults={quizResults} 
                examResults={examResults}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="quizzes" className="mt-6">
              <QuizResultsTable 
                results={quizResults}
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="exams" className="mt-6">
              <ExamResultsTable 
                results={examResults}
                loading={loading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsTab;