import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Edit, Copy, Trash2, Plus, Search, FileQuestion, 
  GraduationCap, Shield, Clock, Users 
} from 'lucide-react';
import { Course } from '@/types';
import { quizService } from '@/services/quizService';
import { examService } from '@/services/examService';
import { moduleService } from '@/services/moduleService';
import EditQuizDialog from './assessments/EditQuizDialog';
import EditExamDialog from './assessments/EditExamDialog';
import { useToast } from '@/components/ui/use-toast';

interface ManageAssessmentsSectionProps {
  courses: Course[];
}

const ManageAssessmentsSection: React.FC<ManageAssessmentsSectionProps> = ({ courses }) => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingQuiz, setEditingQuiz] = useState<unknown>(null);
  const [editingExam, setEditingExam] = useState<unknown>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadAssessments();
  }, [selectedCourse, courses]);

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const allQuizzes: unknown[] = [];
      const allExams: unknown[] = [];

      const coursesToLoad = selectedCourse === 'all' 
        ? courses 
        : courses.filter(c => c.id === selectedCourse);

      for (const course of coursesToLoad) {
        try {
          const modules = await moduleService.getCourseModules(course.id);
          
          for (const module of modules) {
            // Charger les quiz
            const moduleQuizzes = await quizService.getModuleQuizzes(module.id);
            allQuizzes.push(...moduleQuizzes.map(q => ({
              ...q,
              courseName: course.title,
              moduleTitle: module.title,
              courseId: course.id
            })));

            // Charger les examens
            const moduleExams = await examService.getModuleExams(module.id);
            allExams.push(...moduleExams.map(e => ({
              ...e,
              courseName: course.title,
              moduleTitle: module.title,
              courseId: course.id
            })));
          }
        } catch (error) {
          logger.error(`Erreur pour le cours ${course.id}:`, error);
        }
      }

      setQuizzes(allQuizzes);
      setExams(allExams);
    } catch (error) {
      logger.error('Erreur lors du chargement des évaluations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les évaluations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (type: 'quiz' | 'exam', item: unknown) => {
    try {
      const newTitle = `${item.title} (Copie)`;
      
      if (type === 'quiz') {
        // TODO: Implémenter la duplication côté backend
        toast({
          title: "Fonctionnalité en cours",
          description: "La duplication sera bientôt disponible",
        });
      } else {
        // TODO: Implémenter la duplication côté backend
        toast({
          title: "Fonctionnalité en cours",
          description: "La duplication sera bientôt disponible",
        });
      }
    } catch (error) {
      logger.error('Erreur lors de la duplication:', error);
    }
  };

  const handleDelete = async (type: 'quiz' | 'exam', id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?')) return;

    try {
      if (type === 'quiz') {
        await quizService.deleteQuiz(id);
      } else {
        await examService.deleteExam(id);
      }
      
      toast({
        title: "Succès",
        description: "L'évaluation a été supprimée",
      });
      
      loadAssessments();
    } catch (error) {
      logger.error('Erreur lors de la suppression:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'évaluation",
        variant: "destructive"
      });
    }
  };

  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExams = exams.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gérer les évaluations</CardTitle>
            <CardDescription>
              Créez et gérez vos quiz et examens
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Toutes les formations</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-[250px]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="quizzes">
          <TabsList>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <FileQuestion className="h-4 w-4" />
              Quiz ({filteredQuizzes.length})
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Examens ({filteredExams.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="mt-4">
            {loading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredQuizzes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun quiz trouvé
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Tentatives</TableHead>
                    <TableHead>Note de passage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuizzes.map(quiz => (
                    <TableRow key={quiz.id}>
                      <TableCell className="font-medium">{quiz.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{quiz.courseName}</Badge>
                      </TableCell>
                      <TableCell>{quiz.moduleTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileQuestion className="h-4 w-4 text-muted-foreground" />
                          {quiz.questions?.length || 0}
                        </div>
                      </TableCell>
                      <TableCell>{quiz.attempts_allowed || 3}</TableCell>
                      <TableCell>{quiz.passing_score}%</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingQuiz(quiz)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate('quiz', quiz)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDelete('quiz', quiz.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="exams" className="mt-4">
            {loading ? (
              <div className="text-center py-8">Chargement...</div>
            ) : filteredExams.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Aucun examen trouvé
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Questions</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Sécurité</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map(exam => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{exam.courseName}</Badge>
                      </TableCell>
                      <TableCell>{exam.moduleTitle}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileQuestion className="h-4 w-4 text-muted-foreground" />
                          {exam.questions?.length || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {exam.time_limit}min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {exam.exam_config?.default_proctoring && (
                            <Badge variant="secondary" className="text-xs">
                              <Shield className="h-3 w-3" />
                            </Badge>
                          )}
                          {exam.exam_config?.default_webcam && (
                            <Badge variant="secondary" className="text-xs">
                              Webcam
                            </Badge>
                          )}
                          {exam.exam_config?.default_lockdown && (
                            <Badge variant="secondary" className="text-xs">
                              Lockdown
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingExam(exam)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate('exam', exam)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDelete('exam', exam.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Dialogs d'édition */}
      {editingQuiz && (
        <EditQuizDialog
          quiz={editingQuiz}
          open={!!editingQuiz}
          onClose={() => setEditingQuiz(null)}
          onSave={() => {
            setEditingQuiz(null);
            loadAssessments();
          }}
        />
      )}

      {editingExam && (
        <EditExamDialog
          exam={editingExam}
          open={!!editingExam}
          onClose={() => setEditingExam(null)}
          onSave={() => {
            setEditingExam(null);
            loadAssessments();
          }}
        />
      )}
    </Card>
  );
};

export default ManageAssessmentsSection;