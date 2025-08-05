import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Save, X, CheckCircle } from 'lucide-react';
import { quizService } from '@/services/quizService';
import { useToast } from '@/components/ui/use-toast';

interface EditQuizDialogProps {
  quiz: unknown;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const EditQuizDialog: React.FC<EditQuizDialogProps> = ({ quiz, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time_limit: 0,
    attempts_allowed: 3,
    passing_score: 70,
    shuffle_questions: true,
    show_results: true,
    questions: [] as any[]
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        time_limit: quiz.time_limit || 0,
        attempts_allowed: quiz.attempts_allowed || 3,
        passing_score: quiz.passing_score || 70,
        shuffle_questions: quiz.shuffle_questions ?? true,
        show_results: quiz.show_results ?? true,
        questions: quiz.questions || []
      });
    }
  }, [quiz]);

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validation
      if (!formData.title.trim()) {
        toast({
          title: "Erreur",
          description: "Le titre est obligatoire",
          variant: "destructive"
        });
        return;
      }

      if (formData.questions.length === 0) {
        toast({
          title: "Erreur",
          description: "Le quiz doit contenir au moins une question",
          variant: "destructive"
        });
        return;
      }

      // Préparer les données pour l'API
      const updateData = {
        title: formData.title,
        description: formData.description,
        time_limit: formData.time_limit,
        attempts_allowed: formData.attempts_allowed,
        passing_score: formData.passing_score,
        shuffle_questions: formData.shuffle_questions,
        show_results: formData.show_results,
        questions: formData.questions.map((q, index) => ({
          question_text: q.question_text,
          question_type: q.question_type,
          points: q.points || 1,
          order_index: index,
          explanation: q.explanation,
          answers: q.answers.map((a: unknown, aIndex: number) => ({
            answer_text: a.answer_text,
            is_correct: a.is_correct,
            order_index: aIndex
          }))
        }))
      };

      await quizService.updateQuiz(quiz.id, updateData);
      
      toast({
        title: "Succès",
        description: "Le quiz a été mis à jour",
      });
      
      onSave();
    } catch (error) {
      logger.error('Erreur lors de la sauvegarde:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, {
        question_text: '',
        question_type: 'single_choice',
        points: 1,
        explanation: '',
        answers: [
          { answer_text: '', is_correct: true },
          { answer_text: '', is_correct: false }
        ]
      }]
    });
  };

  const removeQuestion = (index: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter((_, i) => i !== index)
    });
  };

  const updateQuestion = (index: number, field: string, value: unknown) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setFormData({ ...formData, questions: newQuestions });
  };

  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers.push({
      answer_text: '',
      is_correct: false
    });
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].answers = newQuestions[questionIndex].answers.filter(
      (_: unknown, i: number) => i !== answerIndex
    );
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateAnswer = (questionIndex: number, answerIndex: number, field: string, value: unknown) => {
    const newQuestions = [...formData.questions];
    
    if (field === 'is_correct' && value && newQuestions[questionIndex].question_type === 'single_choice') {
      // Pour single_choice, une seule réponse correcte
      newQuestions[questionIndex].answers.forEach((answer: unknown, i: number) => {
        answer.is_correct = i === answerIndex;
      });
    } else {
      newQuestions[questionIndex].answers[answerIndex][field] = value;
    }
    
    setFormData({ ...formData, questions: newQuestions });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Modifier le quiz</DialogTitle>
          <DialogDescription>
            Modifiez les paramètres et les questions du quiz
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="settings" className="h-[calc(90vh-200px)]">
          <TabsList>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
            <TabsTrigger value="questions">
              Questions ({formData.questions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre du quiz</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Quiz Module 1 - Introduction"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time_limit">Durée limite (minutes)</Label>
                <Input
                  id="time_limit"
                  type="number"
                  value={formData.time_limit}
                  onChange={(e) => setFormData({ ...formData, time_limit: parseInt(e.target.value) || 0 })}
                  placeholder="0 = pas de limite"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description du quiz..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attempts_allowed">Nombre de tentatives</Label>
                <Input
                  id="attempts_allowed"
                  type="number"
                  value={formData.attempts_allowed}
                  onChange={(e) => setFormData({ ...formData, attempts_allowed: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passing_score">Note de passage (%)</Label>
                <Input
                  id="passing_score"
                  type="number"
                  value={formData.passing_score}
                  onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mélanger les questions</Label>
                  <p className="text-sm text-muted-foreground">
                    Les questions seront présentées dans un ordre aléatoire
                  </p>
                </div>
                <Switch
                  checked={formData.shuffle_questions}
                  onCheckedChange={(checked) => setFormData({ ...formData, shuffle_questions: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Afficher les résultats</Label>
                  <p className="text-sm text-muted-foreground">
                    Les étudiants verront leurs résultats immédiatement
                  </p>
                </div>
                <Switch
                  checked={formData.show_results}
                  onCheckedChange={(checked) => setFormData({ ...formData, show_results: checked })}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-4">
            <ScrollArea className="h-[calc(90vh-320px)]">
              <div className="space-y-4 pr-4">
                {formData.questions.map((question, qIndex) => (
                  <Card key={qIndex}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Question {qIndex + 1}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {question.points} point{question.points > 1 ? 's' : ''}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(qIndex)}
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Texte de la question</Label>
                        <Textarea
                          value={question.question_text}
                          onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)}
                          placeholder="Entrez la question..."
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type de question</Label>
                          <select
                            value={question.question_type}
                            onChange={(e) => updateQuestion(qIndex, 'question_type', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="single_choice">Choix unique</option>
                            <option value="multiple_choice">Choix multiple</option>
                            <option value="true_false">Vrai/Faux</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Points</Label>
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.target.value) || 1)}
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Réponses</Label>
                        <div className="space-y-2">
                          {question.answers.map((answer: unknown, aIndex: number) => (
                            <div key={aIndex} className="flex items-center gap-2">
                              <CheckCircle 
                                className={`h-5 w-5 cursor-pointer ${
                                  answer.is_correct ? 'text-green-500' : 'text-gray-300'
                                }`}
                                onClick={() => updateAnswer(qIndex, aIndex, 'is_correct', !answer.is_correct)}
                              />
                              <Input
                                value={answer.answer_text}
                                onChange={(e) => updateAnswer(qIndex, aIndex, 'answer_text', e.target.value)}
                                placeholder={`Réponse ${aIndex + 1}`}
                                className="flex-1"
                              />
                              {question.answers.length > 2 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAnswer(qIndex, aIndex)}
                                  className="text-red-500"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addAnswer(qIndex)}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter une réponse
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Explication (optionnel)</Label>
                        <Textarea
                          value={question.explanation || ''}
                          onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                          placeholder="Explication de la bonne réponse..."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  onClick={addQuestion}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une question
                </Button>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuizDialog;