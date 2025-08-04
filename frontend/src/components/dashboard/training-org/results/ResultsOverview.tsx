import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Users, Award, AlertTriangle, Clock } from 'lucide-react';

interface ResultsOverviewProps {
  quizResults: any[];
  examResults: any[];
  loading: boolean;
}

const ResultsOverview: React.FC<ResultsOverviewProps> = ({ quizResults, examResults, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16 mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  // Calculer les statistiques globales
  const totalQuizAttempts = quizResults.reduce((sum, quiz) => sum + quiz.totalAttempts, 0);
  const totalExamAttempts = examResults.reduce((sum, exam) => sum + exam.totalAttempts, 0);
  const totalAttempts = totalQuizAttempts + totalExamAttempts;

  const completedQuizAttempts = quizResults.reduce((sum, quiz) => sum + quiz.completedAttempts, 0);
  const completedExamAttempts = examResults.reduce((sum, exam) => sum + exam.completedAttempts, 0);
  const completedAttempts = completedQuizAttempts + completedExamAttempts;

  const passedQuizAttempts = quizResults.reduce((sum, quiz) => sum + quiz.passedAttempts, 0);
  const passedExamAttempts = examResults.reduce((sum, exam) => sum + exam.passedAttempts, 0);
  const passedAttempts = passedQuizAttempts + passedExamAttempts;

  const suspiciousExamAttempts = examResults.reduce((sum, exam) => sum + exam.suspiciousAttempts, 0);

  const avgQuizScore = quizResults.length > 0
    ? quizResults.reduce((sum, quiz) => sum + quiz.averageScore, 0) / quizResults.length
    : 0;
  const avgExamScore = examResults.length > 0
    ? examResults.reduce((sum, exam) => sum + exam.averageScore, 0) / examResults.length
    : 0;
  const avgOverallScore = (avgQuizScore + avgExamScore) / 2;

  const successRate = completedAttempts > 0 
    ? (passedAttempts / completedAttempts) * 100 
    : 0;

  // Préparer les données pour les graphiques
  const performanceByType = [
    { name: 'Quiz', value: avgQuizScore, color: '#8b5cf6' },
    { name: 'Examens', value: avgExamScore, color: '#3b82f6' }
  ];

  const completionData = [
    { name: 'Terminés', value: completedAttempts, color: '#22c55e' },
    { name: 'En cours', value: totalAttempts - completedAttempts, color: '#f59e0b' }
  ];

  // Données pour le graphique des résultats par module
  const moduleResults = [...quizResults, ...examResults]
    .sort((a, b) => a.moduleOrder - b.moduleOrder)
    .slice(0, 10)
    .map(result => ({
      name: result.moduleTitle.length > 20 ? result.moduleTitle.substring(0, 20) + '...' : result.moduleTitle,
      score: result.averageScore,
      type: result.examId ? 'Examen' : 'Quiz'
    }));

  return (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total des tentatives</CardDescription>
            <CardTitle className="text-2xl">{totalAttempts}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {completedAttempts} terminées
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Score moyen</CardDescription>
            <CardTitle className="text-2xl">{avgOverallScore.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={avgOverallScore} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taux de réussite</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {successRate.toFixed(1)}%
              {successRate > 70 ? (
                <TrendingUp className="h-5 w-5 text-green-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-1" />
              {passedAttempts} réussies
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Alertes de sécurité</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {suspiciousExamAttempts}
              {suspiciousExamAttempts > 0 && (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              Examens suspects
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance par type */}
        <Card>
          <CardHeader>
            <CardTitle>Performance par type d'évaluation</CardTitle>
            <CardDescription>Score moyen des quiz vs examens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={performanceByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {performanceByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Résultats par module */}
        <Card>
          <CardHeader>
            <CardTitle>Résultats par module</CardTitle>
            <CardDescription>Score moyen par module de formation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moduleResults}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* État de complétion */}
      <Card>
        <CardHeader>
          <CardTitle>État de complétion des évaluations</CardTitle>
          <CardDescription>Répartition des tentatives terminées vs en cours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsOverview;