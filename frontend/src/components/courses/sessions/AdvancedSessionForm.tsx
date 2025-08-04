import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  Euro,
  Clock,
  Video,
  BookOpen,
  Shield,
  Laptop,
  Building,
  Wifi,
  Camera,
  Mic,
  Globe,
  Settings,
  Plus,
  X
} from 'lucide-react';

// Schema de validation pour les sessions avancées
const advancedSessionSchema = z.object({
  // Informations de base
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  
  // Modalité et paramètres
  modality: z.enum(['online', 'in_person', 'hybrid', 'virtual_classroom']),
  
  // Informations géographiques
  physicalLocation: z.string().optional(),
  virtualPlatform: z.string().optional(),
  virtualMeetingUrl: z.string().url().optional().or(z.literal('')),
  
  // Gestion des participants
  maxParticipants: z.number().min(1, "Le nombre minimum de participants est 1"),
  minParticipants: z.number().min(1, "Le nombre minimum de participants est 1"),
  waitingList: z.boolean().default(false),
  
  // Tarification
  price: z.number().min(0, "Le prix ne peut pas être négatif"),
  earlyBirdPrice: z.number().min(0).optional(),
  earlyBirdDeadline: z.string().optional(),
  groupDiscount: z.number().min(0).max(100).optional(),
  
  // Planification hybride
  onlineModules: z.array(z.object({
    title: z.string(),
    duration: z.number(),
    startTime: z.string()
  })).optional(),
  
  inPersonSessions: z.array(z.object({
    title: z.string(),
    location: z.string(),
    date: z.string(),
    duration: z.number()
  })).optional(),
  
  // Prérequis techniques
  technicalRequirements: z.string().optional(),
  
  // Options avancées
  requiresApproval: z.boolean().default(false),
  sendReminders: z.boolean().default(true),
  recordSession: z.boolean().default(false),
  provideCertificate: z.boolean().default(true),
  
  // Instructions pour les participants
  instructionsForParticipants: z.string().optional(),
});

type AdvancedSessionFormValues = z.infer<typeof advancedSessionSchema>;

interface AdvancedSessionFormProps {
  courseId: string;
  courseType: 'online' | 'in-person' | 'virtual' | 'blended';
  onAddSession: (sessionData: any) => void;
  onCancel?: () => void;
}

const AdvancedSessionForm: React.FC<AdvancedSessionFormProps> = ({ 
  courseId, 
  courseType, 
  onAddSession, 
  onCancel 
}) => {
  const [currentTab, setCurrentTab] = useState('basic');
  const [onlineModules, setOnlineModules] = useState<Array<{title: string, duration: number, startTime: string}>>([]);
  const [inPersonSessions, setInPersonSessions] = useState<Array<{title: string, location: string, date: string, duration: number}>>([]);
  const { toast } = useToast();

  const form = useForm<AdvancedSessionFormValues>({
    resolver: zodResolver(advancedSessionSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      modality: courseType === 'blended' ? 'hybrid' : 
                courseType === 'online' ? 'online' : 
                courseType === 'virtual' ? 'virtual_classroom' : 'in_person',
      physicalLocation: '',
      virtualPlatform: '',
      virtualMeetingUrl: '',
      maxParticipants: 20,
      minParticipants: 5,
      waitingList: true,
      price: 0,
      earlyBirdPrice: 0,
      technicalRequirements: '',
      requiresApproval: false,
      sendReminders: true,
      recordSession: false,
      provideCertificate: true,
      instructionsForParticipants: '',
      onlineModules: [],
      inPersonSessions: []
    }
  });

  const watchedModality = form.watch('modality');

  const addOnlineModule = () => {
    setOnlineModules(prev => [...prev, { title: '', duration: 60, startTime: '09:00' }]);
  };

  const removeOnlineModule = (index: number) => {
    setOnlineModules(prev => prev.filter((_, i) => i !== index));
  };

  const addInPersonSession = () => {
    setInPersonSessions(prev => [...prev, { title: '', location: '', date: '', duration: 120 }]);
  };

  const removeInPersonSession = (index: number) => {
    setInPersonSessions(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: AdvancedSessionFormValues) => {
    try {
      const sessionData = {
        ...data,
        courseId,
        onlineModules,
        inPersonSessions,
        id: `session-${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'scheduled'
      };

      onAddSession(sessionData);
      
      toast({
        title: "Session créée avec succès",
        description: `La session "${data.title}" a été programmée.`,
      });

      // Reset form
      form.reset();
      setOnlineModules([]);
      setInPersonSessions([]);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la session. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'online': return <Laptop className="h-4 w-4" />;
      case 'in_person': return <Building className="h-4 w-4" />;
      case 'hybrid': return <Wifi className="h-4 w-4" />;
      case 'virtual_classroom': return <Video className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case 'online': return 'E-learning';
      case 'in_person': return 'Présentiel';
      case 'hybrid': return 'Hybride';
      case 'virtual_classroom': return 'Classe virtuelle';
      default: return modality;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6" />
          Créer une Session de Formation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Informations de base</TabsTrigger>
                <TabsTrigger value="modality">Modalité</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="advanced">Options avancées</TabsTrigger>
              </TabsList>

              {/* Onglet Informations de base */}
              <TabsContent value="basic" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Détails de la session</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre de la session*</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Session Sécurité Aéroportuaire - Février 2024" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de la session</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez le contenu et les objectifs spécifiques de cette session..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de début*</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de fin*</FormLabel>
                            <FormControl>
                              <Input type="datetime-local" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Modalité */}
              <TabsContent value="modality" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getModalityIcon(watchedModality)}
                      Modalité de formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="modality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type de session*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez la modalité" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="online">
                                <div className="flex items-center gap-2">
                                  <Laptop className="h-4 w-4" />
                                  E-learning
                                </div>
                              </SelectItem>
                              <SelectItem value="in_person">
                                <div className="flex items-center gap-2">
                                  <Building className="h-4 w-4" />
                                  Présentiel
                                </div>
                              </SelectItem>
                              <SelectItem value="hybrid">
                                <div className="flex items-center gap-2">
                                  <Wifi className="h-4 w-4" />
                                  Hybride (E-learning + Présentiel)
                                </div>
                              </SelectItem>
                              <SelectItem value="virtual_classroom">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  Classe virtuelle
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Configuration spécifique selon la modalité */}
                    {(watchedModality === 'in_person' || watchedModality === 'hybrid') && (
                      <FormField
                        control={form.control}
                        name="physicalLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lieu physique*</FormLabel>
                            <FormControl>
                              <Input placeholder="Adresse complète du lieu de formation" {...field} />
                            </FormControl>
                            <FormDescription>
                              Indiquez l'adresse complète où se déroulera la formation présentielle
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {(watchedModality === 'online' || watchedModality === 'hybrid' || watchedModality === 'virtual_classroom') && (
                      <>
                        <FormField
                          control={form.control}
                          name="virtualPlatform"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plateforme virtuelle</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez la plateforme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="zoom">Zoom</SelectItem>
                                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                                  <SelectItem value="webex">Cisco Webex</SelectItem>
                                  <SelectItem value="bigbluebutton">BigBlueButton</SelectItem>
                                  <SelectItem value="custom">Plateforme personnalisée</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="virtualMeetingUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lien de la réunion virtuelle</FormLabel>
                              <FormControl>
                                <Input placeholder="https://zoom.us/j/123456789" {...field} />
                              </FormControl>
                              <FormDescription>
                                Lien d'accès qui sera communiqué aux participants
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {/* Configuration hybride avancée */}
                    {watchedModality === 'hybrid' && (
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium flex items-center gap-2">
                              <Laptop className="h-4 w-4" />
                              Modules E-learning
                            </h4>
                            <Button type="button" variant="outline" size="sm" onClick={addOnlineModule}>
                              <Plus className="h-4 w-4 mr-1" />
                              Ajouter un module
                            </Button>
                          </div>
                          
                          {onlineModules.map((module, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <Input
                                placeholder="Titre du module"
                                value={module.title}
                                onChange={(e) => {
                                  const updated = [...onlineModules];
                                  updated[index].title = e.target.value;
                                  setOnlineModules(updated);
                                }}
                              />
                              <Input
                                type="number"
                                placeholder="Durée (min)"
                                value={module.duration}
                                onChange={(e) => {
                                  const updated = [...onlineModules];
                                  updated[index].duration = parseInt(e.target.value) || 0;
                                  setOnlineModules(updated);
                                }}
                                className="w-32"
                              />
                              <Input
                                type="time"
                                value={module.startTime}
                                onChange={(e) => {
                                  const updated = [...onlineModules];
                                  updated[index].startTime = e.target.value;
                                  setOnlineModules(updated);
                                }}
                                className="w-32"
                              />
                              <Button type="button" variant="outline" size="sm" onClick={() => removeOnlineModule(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>

                        <div className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              Sessions Présentielles
                            </h4>
                            <Button type="button" variant="outline" size="sm" onClick={addInPersonSession}>
                              <Plus className="h-4 w-4 mr-1" />
                              Ajouter une session
                            </Button>
                          </div>
                          
                          {inPersonSessions.map((session, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <Input
                                placeholder="Titre de la session"
                                value={session.title}
                                onChange={(e) => {
                                  const updated = [...inPersonSessions];
                                  updated[index].title = e.target.value;
                                  setInPersonSessions(updated);
                                }}
                              />
                              <Input
                                placeholder="Lieu"
                                value={session.location}
                                onChange={(e) => {
                                  const updated = [...inPersonSessions];
                                  updated[index].location = e.target.value;
                                  setInPersonSessions(updated);
                                }}
                              />
                              <Input
                                type="date"
                                value={session.date}
                                onChange={(e) => {
                                  const updated = [...inPersonSessions];
                                  updated[index].date = e.target.value;
                                  setInPersonSessions(updated);
                                }}
                                className="w-40"
                              />
                              <Input
                                type="number"
                                placeholder="Durée (min)"
                                value={session.duration}
                                onChange={(e) => {
                                  const updated = [...inPersonSessions];
                                  updated[index].duration = parseInt(e.target.value) || 0;
                                  setInPersonSessions(updated);
                                }}
                                className="w-32"
                              />
                              <Button type="button" variant="outline" size="sm" onClick={() => removeInPersonSession(index)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Participants */}
              <TabsContent value="participants" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gestion des participants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="minParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum de participants</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                              Nombre minimum pour maintenir la session
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxParticipants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum de participants</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                            </FormControl>
                            <FormDescription>
                              Capacité maximale de la session
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="waitingList"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Liste d'attente
                            </FormLabel>
                            <FormDescription>
                              Permettre aux participants de s'inscrire sur liste d'attente si la session est complète
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Euro className="h-4 w-4" />
                        Tarification
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix standard (€)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="earlyBirdPrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix Early Bird (€)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                              </FormControl>
                              <FormDescription>
                                Prix réduit pour les inscriptions anticipées
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="earlyBirdDeadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date limite Early Bird</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormDescription>
                              Date limite pour bénéficier du tarif réduit
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="groupDiscount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Remise groupe (%)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" max="100" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                            </FormControl>
                            <FormDescription>
                              Remise accordée pour les inscriptions groupées (3+ personnes)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet Options avancées */}
              <TabsContent value="advanced" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Options avancées
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="requiresApproval"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Approbation requise
                              </FormLabel>
                              <FormDescription>
                                Les inscriptions doivent être approuvées manuellement
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="sendReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Rappels automatiques
                              </FormLabel>
                              <FormDescription>
                                Envoyer des rappels par email aux participants
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="recordSession"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Enregistrer la session
                              </FormLabel>
                              <FormDescription>
                                Enregistrer automatiquement les sessions virtuelles
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="provideCertificate"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Délivrer un certificat
                              </FormLabel>
                              <FormDescription>
                                Générer automatiquement un certificat à la fin de la formation
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="technicalRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prérequis techniques</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Spécifiez les prérequis techniques (logiciels, matériel, connexion internet...)"
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Ces informations seront communiquées aux participants avant la formation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="instructionsForParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instructions pour les participants</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Instructions spécifiques à communiquer avant le début de la session..."
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Ces instructions seront envoyées par email avant la formation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Résumé et actions */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Récapitulatif de la session</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getModalityIcon(watchedModality)}
                        {getModalityLabel(watchedModality)}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {form.watch('minParticipants')}-{form.watch('maxParticipants')} participants
                      </span>
                      <span className="flex items-center gap-1">
                        <Euro className="h-3 w-3" />
                        {form.watch('price')}€
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {onCancel && (
                      <Button type="button" variant="outline" onClick={onCancel}>
                        Annuler
                      </Button>
                    )}
                    <Button type="submit">
                      Créer la session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdvancedSessionForm; 