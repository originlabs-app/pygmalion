import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Download, Users, Shield, AlertTriangle, FileSpreadsheet, FileText } from 'lucide-react';
import { examService } from '@/services/examService';
import ExamAttemptDetails from './ExamAttemptDetails';
import { exportExamResults } from '@/utils/exportUtils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExamResultsTableProps {
  results: unknown[];
  loading: boolean;
}

const ExamResultsTable: React.FC<ExamResultsTableProps> = ({ results, loading }) => {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [examAttempts, setExamAttempts] = useState<any[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const handleViewAttempts = async (examId: string) => {
    try {
      setLoadingAttempts(true);
      setSelectedExamId(examId);
      const attempts = await examService.getExamAttempts(examId);
      setExamAttempts(attempts);
      setShowAttemptsDialog(true);
    } catch (error) {
      logger.error('Erreur lors du chargement des tentatives:', error);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const handleViewDetails = (attemptId: string) => {
    setSelectedAttemptId(attemptId);
    setShowDetailsDialog(true);
  };

  const exportResults = async (exam: unknown, format: 'csv' | 'pdf') => {
    try {
      const attempts = await examService.getExamAttempts(exam.examId);
      exportExamResults(exam.examTitle, attempts, format);
    } catch (error) {
      logger.error('Erreur lors de l\'export:', error);
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
        Aucun résultat d'examen disponible pour le moment.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Examen</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Sécurité</TableHead>
              <TableHead>Tentatives</TableHead>
              <TableHead>Réussites</TableHead>
              <TableHead>Score moyen</TableHead>
              <TableHead>Alertes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((exam) => {
              const successRate = exam.completedAttempts > 0 
                ? (exam.passedAttempts / exam.completedAttempts) * 100 
                : 0;

              return (
                <TableRow key={exam.examId}>
                  <TableCell className="font-medium">{exam.examTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{exam.moduleTitle}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {exam.securityEnabled.proctoring && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Proctoring
                        </Badge>
                      )}
                      {exam.securityEnabled.webcam && (
                        <Badge variant="secondary" className="text-xs">
                          Webcam
                        </Badge>
                      )}
                      {exam.securityEnabled.lockdown && (
                        <Badge variant="secondary" className="text-xs">
                          Lockdown
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {exam.totalAttempts}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {exam.passedAttempts} ({successRate.toFixed(0)}%)
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={exam.averageScore} className="h-2 flex-1" />
                      <span className="text-sm font-medium">{exam.averageScore.toFixed(0)}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {exam.suspiciousAttempts > 0 ? (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle className="h-4 w-4" />
                        {exam.suspiciousAttempts}
                      </div>
                    ) : (
                      <span className="text-green-600">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAttempts(exam.examId)}
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
                          <DropdownMenuItem onClick={() => exportResults(exam, 'csv')}>
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Exporter en CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => exportResults(exam, 'pdf')}>
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
            <DialogTitle>Tentatives de l'examen</DialogTitle>
            <DialogDescription>
              Liste détaillée des tentatives pour cet examen avec informations de sécurité
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
                  <TableHead>Sécurité</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examAttempts.map((attempt) => (
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
                      {attempt.securityInfo.alertCount > 0 ? (
                        <Badge variant="destructive" className="text-xs">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {attempt.securityInfo.alertCount} alertes
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs text-green-600">
                          <Shield className="h-3 w-3 mr-1" />
                          Sécurisé
                        </Badge>
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
        <ExamAttemptDetails
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

export default ExamResultsTable;