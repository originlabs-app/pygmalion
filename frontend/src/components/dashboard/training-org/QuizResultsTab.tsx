import React, { useState, useEffect, useMemo } from 'react';
import logger from '@/services/logger.service';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { quizService, CourseQuizResults, QuizAttempt } from '@/services/quizService';
import { Course } from '@/types';
import { 
  Eye, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle 
} from 'lucide-react';

interface QuizResultsTabProps {
  courses: Course[];
}

const QuizResultsTab: React.FC<QuizResultsTabProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [quizResults, setQuizResults] = useState<CourseQuizResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuizzes, setExpandedQuizzes] = useState<Set<string>>(new Set());
  const [selectedQuiz, setSelectedQuiz] = useState<string>('all');

  // Charger les résultats du cours sélectionné
  useEffect(() => {
    if (selectedCourse) {
      loadQuizResults(selectedCourse);
    }
  }, [selectedCourse]);

  const loadQuizResults = async (courseId: string) => {
    try {
      setLoading(true);
      const results = await quizService.getCourseQuizResults(courseId);
      setQuizResults(results);
    } catch (error) {
      logger.error('Erreur lors du chargement des résultats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les tentatives par recherche
  const filteredAttempts = useMemo(() => {
    if (!quizResults) return [];

    let attempts: QuizAttempt[] = [];

    // Collecter toutes les tentatives ou celles du quiz sélectionné
    quizResults.quizzes.forEach(quizData => {
      if (selectedQuiz === 'all' || selectedQuiz === quizData.quiz.id) {
        attempts = [...attempts, ...quizData.attempts];
      }
    });

    // Filtrer par recherche
    if (searchQuery) {
      attempts = attempts.filter(attempt => {
        const fullName = `${attempt.enrollment?.user?.first_name} ${attempt.enrollment?.user?.last_name}`.toLowerCase();
        const email = attempt.enrollment?.user?.email?.toLowerCase() || '';
        return fullName.includes(searchQuery.toLowerCase()) || 
               email.includes(searchQuery.toLowerCase());
      });
    }

    return attempts;
  }, [quizResults, selectedQuiz, searchQuery]);

  const toggleQuizExpansion = (quizId: string) => {
    const newExpanded = new Set(expandedQuizzes);
    if (newExpanded.has(quizId)) {
      newExpanded.delete(quizId);
    } else {
      newExpanded.add(quizId);
    }
    setExpandedQuizzes(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusBadge = (attempt: QuizAttempt) => {
    if (attempt.status === 'completed') {
      if (attempt.passed) {
        return <Badge className="bg-green-100 text-green-800">Réussi</Badge>;
      } else {
        return <Badge className="bg-red-100 text-red-800">Échoué</Badge>;
      }
    } else if (attempt.status === 'in_progress') {
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
    } else if (attempt.status === 'timed_out') {
      return <Badge className="bg-orange-100 text-orange-800">Temps écoulé</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Abandonné</Badge>;
    }
  };

  const handleExportResults = () => {
    // TODO: Implémenter l'export CSV
    logger.info('Export des résultats');
  };

  const handleViewDetails = (attemptId: string) => {
    // TODO: Ouvrir un modal avec les détails
    logger.info('Voir les détails de la tentative:', attemptId);
  };

  return (
    <div className="space-y-6">
      {/* Sélection du cours */}
      <Card>
        <CardHeader>
          <CardTitle>Résultats des Quiz</CardTitle>
          <CardDescription>
            Consultez les résultats des quiz de vos formations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full md:w-[300px]">
                <SelectValue placeholder="Sélectionnez une formation" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedCourse && quizResults && (
              <>
                <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
                  <SelectTrigger className="w-full md:w-[250px]">
                    <SelectValue placeholder="Tous les quiz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les quiz</SelectItem>
                    {quizResults.quizzes.map(({ quiz }) => (
                      <SelectItem key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Rechercher un apprenant..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[250px]"
                />

                <Button
                  variant="outline"
                  onClick={handleExportResults}
                  disabled={filteredAttempts.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </>
            )}
          </div>

          {/* Statistiques globales */}
          {selectedCourse && quizResults && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {quizResults.quizzes.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Quiz total</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {filteredAttempts.length}
                  </div>
                  <p className="text-xs text-muted-foreground">Tentatives totales</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {quizResults.quizzes.reduce((acc, q) => acc + (q.stats.averageScore || 0), 0) / quizResults.quizzes.length || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Score moyen</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {quizResults.quizzes.reduce((acc, q) => acc + (q.stats.passRate || 0), 0) / quizResults.quizzes.length || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">Taux de réussite</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Vue par quiz avec détails */}
          {selectedCourse && quizResults && selectedQuiz === 'all' && (
            <div className="space-y-4">
              {quizResults.quizzes.map(({ quiz, attempts, stats }) => (
                <Card key={quiz.id}>
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => toggleQuizExpansion(quiz.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>
                          {attempts.length} tentatives - Score moyen: {stats.averageScore.toFixed(1)}%
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">Taux de réussite</p>
                          <p className="text-2xl font-bold">{stats.passRate.toFixed(0)}%</p>
                        </div>
                        {expandedQuizzes.has(quiz.id) ? 
                          <ChevronUp className="h-5 w-5" /> : 
                          <ChevronDown className="h-5 w-5" />
                        }
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedQuizzes.has(quiz.id) && (
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Apprenant</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Tentative</TableHead>
                              <TableHead>Score</TableHead>
                              <TableHead>Durée</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {attempts.map((attempt) => (
                              <TableRow key={attempt.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">
                                      {attempt.enrollment?.user?.first_name} {attempt.enrollment?.user?.last_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {attempt.enrollment?.user?.email}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(attempt.start_time)}</TableCell>
                                <TableCell>{attempt.attempt_number}/{quiz.attempts_allowed}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress 
                                      value={(attempt.score || 0) / attempt.max_score * 100} 
                                      className="w-[60px]"
                                    />
                                    <span className="text-sm font-medium">
                                      {attempt.score || 0}/{attempt.max_score}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDuration(attempt.time_spent)}</TableCell>
                                <TableCell>{getStatusBadge(attempt)}</TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleViewDetails(attempt.id)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Vue liste filtrée */}
          {selectedCourse && quizResults && selectedQuiz !== 'all' && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Apprenant</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Tentative</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {attempt.enrollment?.user?.first_name} {attempt.enrollment?.user?.last_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {attempt.enrollment?.user?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{attempt.quiz?.title}</TableCell>
                      <TableCell>{formatDate(attempt.start_time)}</TableCell>
                      <TableCell>{attempt.attempt_number}/{attempt.quiz?.attempts_allowed || 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(attempt.score || 0) / attempt.max_score * 100} 
                            className="w-[60px]"
                          />
                          <span className="text-sm font-medium">
                            {attempt.score || 0}/{attempt.max_score}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDuration(attempt.time_spent)}</TableCell>
                      <TableCell>{getStatusBadge(attempt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(attempt.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!selectedCourse && (
            <div className="text-center py-12 text-muted-foreground">
              Sélectionnez une formation pour voir les résultats des quiz
            </div>
          )}

          {selectedCourse && loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement des résultats...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResultsTab;