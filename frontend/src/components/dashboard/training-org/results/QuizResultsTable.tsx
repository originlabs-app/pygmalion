import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Download, Users, TrendingUp, FileSpreadsheet, FileText } from 'lucide-react';
import { quizService } from '@/services/quizService';
import QuizAttemptDetails from './QuizAttemptDetails';
import { exportQuizResults } from '@/utils/exportUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface QuizResultsTableProps {
  results: any[];
  loading: boolean;
}

const QuizResultsTable: React.FC<QuizResultsTableProps> = ({ results, loading }) => {
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleViewAttempts = async (quizId: string) => {
    try {
      setLoadingAttempts(true);
      setSelectedQuizId(quizId);
      const attempts = await quizService.getQuizAttempts(quizId);
      setQuizAttempts(attempts);
      setShowAttemptsDialog(true);
    } catch (error) {
      console.error('Erreur lors du chargement des tentatives:', error);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const handleViewDetails = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
    setShowDetailsDialog(true);
  };

  const exportResults = async (quiz: any, format: 'csv' | 'pdf') => {
    try {
      const attempts = await quizService.getQuizAttempts(quiz.quizId);
      exportQuizResults(quiz.quizTitle, attempts, format);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucun résultat de quiz disponible pour le moment.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quiz</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Tentatives</TableHead>
              <TableHead>Réussites</TableHead>
              <TableHead>Score moyen</TableHead>
              <TableHead>Note de passage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((quiz) => {
              const successRate = quiz.completedAttempts > 0 
                ? (quiz.passedAttempts / quiz.completedAttempts) * 100 
                : 0;

              return (
                <TableRow key={quiz.quizId}>
                  <TableCell className="font-medium">{quiz.quizTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{quiz.moduleTitle}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {quiz.totalAttempts}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {successRate > 70 ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500" />
                      )}
                      {quiz.passedAttempts} ({successRate.toFixed(0)}%)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={quiz.averageScore} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{quiz.averageScore.toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{quiz.passingScore}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAttempts(quiz.quizId)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => exportResults(quiz, 'csv')}>
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Exporter en CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => exportResults(quiz, 'pdf')}>
                            <FileText className="h-4 w-4 mr-2" />
                            Exporter en PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Dialog des tentatives */}
      <Dialog open={showAttemptsDialog} onOpenChange={setShowAttemptsDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tentatives du quiz</DialogTitle>
            <DialogDescription>
              Liste détaillée des tentatives pour ce quiz
            </DialogDescription>
          </DialogHeader>
          
          {loadingAttempts ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Apprenant</TableHead>
                  <TableHead>Tentative</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizAttempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell>{attempt.user.fullName}</TableCell>
                    <TableCell>#{attempt.attemptNumber}</TableCell>
                    <TableCell>
                      {new Date(attempt.startTime).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={attempt.score || 0} className="h-2 w-20" />
                        <span className="text-sm">{attempt.score?.toFixed(0) || 0}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {attempt.passed ? (
                        <Badge className="bg-green-100 text-green-800">Réussi</Badge>
                      ) : (
                        <Badge variant="secondary">Échoué</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(attempt.id)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog des détails */}
      {selectedAttemptId && (
        <QuizAttemptDetails
          attemptId={selectedAttemptId}
          open={showDetailsDialog}
          onClose={() => {
            setShowDetailsDialog(false);
            setSelectedAttemptId(null);
          }}
        />
      )}
    </>
  );
};

export default QuizResultsTable;