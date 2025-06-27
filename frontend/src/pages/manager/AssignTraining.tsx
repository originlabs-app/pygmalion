import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ManagerLayout from '@/components/layout/ManagerLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Target,
  Users,
  GraduationCap,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  MapPin,
  BookOpen,
  Shield,
  Plane,
  Building,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Info,
  Zap,
  Award,
  User
} from 'lucide-react';

const AssignTraining = () => {
  const [searchParams] = useSearchParams();
  const preselectedMember = searchParams.get('member');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState(preselectedMember ? [preselectedMember] : []);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Données hardcodées pour la démo
  const availableCourses = [
    {
      id: '1',
      title: 'Sûreté Aéroportuaire - Niveau 2',
      description: 'Formation obligatoire pour le personnel travaillant en zone de sûreté à accès réglementé',
      category: 'Sécurité',
      duration: '16h',
      modality: 'Présentiel',
      level: 'Intermédiaire',
      price: 450,
      rating: 4.8,
      enrollments: 1243,
      provider: 'MBAVIATION Formation',
      isRequired: true,
      nextSession: {
        id: 'session1',
        startDate: '2025-01-15',
        endDate: '2025-01-17',
        location: 'Centre de Formation CDG',
        instructor: 'Pierre Dubois',
        availableSpots: 8,
        totalSpots: 12
      },
      sessions: [
        {
          id: 'session1',
          startDate: '2025-01-15',
          endDate: '2025-01-17',
          location: 'Centre de Formation CDG',
          instructor: 'Pierre Dubois',
          availableSpots: 8,
          totalSpots: 12,
          price: 450
        },
        {
          id: 'session2',
          startDate: '2025-02-10',
          endDate: '2025-02-12',
          location: 'Centre de Formation CDG',
          instructor: 'Marie Rousseau',
          availableSpots: 12,
          totalSpots: 12,
          price: 450
        }
      ]
    },
    {
      id: '2',
      title: 'Matières Dangereuses ADR - Recyclage',
      description: 'Formation de recyclage pour le transport des matières dangereuses par voie aérienne',
      category: 'Réglementation',
      duration: '8h',
      modality: 'E-learning',
      level: 'Avancé',
      price: 280,
      rating: 4.6,
      enrollments: 892,
      provider: 'DGAC Formation',
      isRequired: true,
      nextSession: {
        id: 'session3',
        startDate: '2025-01-20',
        endDate: '2025-01-20',
        location: 'Formation en ligne',
        instructor: 'Système automatisé',
        availableSpots: 50,
        totalSpots: 50
      },
      sessions: [
        {
          id: 'session3',
          startDate: '2025-01-20',
          endDate: '2025-01-20',
          location: 'Formation en ligne',
          instructor: 'Système automatisé',
          availableSpots: 50,
          totalSpots: 50,
          price: 280
        }
      ]
    },
    {
      id: '3',
      title: 'Permis de Conduire Piste',
      description: 'Formation pour l\'obtention du permis de conduire sur les aires de trafic',
      category: 'Conduite',
      duration: '24h',
      modality: 'Hybride',
      level: 'Débutant',
      price: 650,
      rating: 4.9,
      enrollments: 567,
      provider: 'Aéroports de Paris',
      isRequired: false,
      nextSession: {
        id: 'session4',
        startDate: '2025-01-25',
        endDate: '2025-01-27',
        location: 'Piste école CDG',
        instructor: 'Jean-Claude Martin',
        availableSpots: 4,
        totalSpots: 8
      },
      sessions: [
        {
          id: 'session4',
          startDate: '2025-01-25',
          endDate: '2025-01-27',
          location: 'Piste école CDG',
          instructor: 'Jean-Claude Martin',
          availableSpots: 4,
          totalSpots: 8,
          price: 650
        }
      ]
    },
    {
      id: '4',
      title: 'Radiotelephonie Aéronautique',
      description: 'Formation à la radiotelephonie pour les opérations au sol',
      category: 'Communication',
      duration: '12h',
      modality: 'Présentiel',
      level: 'Intermédiaire',
      price: 380,
      rating: 4.7,
      enrollments: 423,
      provider: 'ENAC Formation',
      isRequired: false,
      nextSession: {
        id: 'session5',
        startDate: '2025-02-01',
        endDate: '2025-02-02',
        location: 'Centre ENAC Toulouse',
        instructor: 'Sophie Lemaire',
        availableSpots: 6,
        totalSpots: 10
      },
      sessions: [
        {
          id: 'session5',
          startDate: '2025-02-01',
          endDate: '2025-02-02',
          location: 'Centre ENAC Toulouse',
          instructor: 'Sophie Lemaire',
          availableSpots: 6,
          totalSpots: 10,
          price: 380
        }
      ]
    }
  ];

  const teamMembers = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Martin',
      position: 'Agent de Piste Senior',
      department: 'Handling',
      complianceScore: 98,
      email: 'sarah.martin@airfrance.fr',
      hasPrerequisites: true,
      conflictingSessions: [],
      recommendedFor: ['1', '4']
    },
    {
      id: '2',
      firstName: 'Marc',
      lastName: 'Dubois',
      position: 'Coordinateur Handling',
      department: 'Handling',
      complianceScore: 85,
      email: 'marc.dubois@airfrance.fr',
      hasPrerequisites: true,
      conflictingSessions: ['session1'],
      recommendedFor: ['2']
    },
    {
      id: '3',
      firstName: 'Julie',
      lastName: 'Rousseau',
      position: 'Agent de Piste',
      department: 'Handling',
      complianceScore: 92,
      email: 'julie.rousseau@airfrance.fr',
      hasPrerequisites: false,
      conflictingSessions: [],
      recommendedFor: ['1', '3']
    },
    {
      id: '4',
      firstName: 'Pierre',
      lastName: 'Laurent',
      position: 'Responsable Bagage',
      department: 'Bagage',
      complianceScore: 95,
      email: 'pierre.laurent@airfrance.fr',
      hasPrerequisites: true,
      conflictingSessions: [],
      recommendedFor: ['3']
    }
  ];

  const categories = ['Tous', 'Sécurité', 'Réglementation', 'Conduite', 'Communication'];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleMemberToggle = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const getModalityIcon = (modality) => {
    switch (modality) {
      case 'Présentiel':
        return <Building className="h-4 w-4" />;
      case 'E-learning':
        return <BookOpen className="h-4 w-4" />;
      case 'Hybride':
        return <Zap className="h-4 w-4" />;
      default:
        return <GraduationCap className="h-4 w-4" />;
    }
  };

  const calculateTotalCost = () => {
    if (!selectedSession || !selectedMembers.length) return 0;
    return selectedSession.price * selectedMembers.length;
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step < currentStep ? <Check className="h-5 w-5" /> : step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 mx-2 ${
                step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const StepTitles = () => {
    const titles = [
      'Sélectionner Formation',
      'Choisir Session',
      'Sélectionner Équipe',
      'Validation'
    ];
    
    return (
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Étape {currentStep}: {titles[currentStep - 1]}
        </h2>
        <p className="text-gray-600">
          {currentStep === 1 && "Choisissez la formation à assigner à votre équipe"}
          {currentStep === 2 && "Sélectionnez la session qui convient le mieux"}
          {currentStep === 3 && "Choisissez les membres de l'équipe à inscrire"}
          {currentStep === 4 && "Vérifiez et validez l'assignation"}
        </p>
      </div>
    );
  };

  return (
    <ManagerLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
                         <div>
               <h1 className="text-3xl font-bold text-gray-900">Assigner une Formation (Manager)</h1>
               <p className="text-gray-600">Assignez des formations à votre équipe en quelques étapes (niveau Manager)</p>
             </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/manager-dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au Dashboard
            </Link>
          </Button>
        </div>

        {/* Step Indicator */}
        <StepIndicator />
        <StepTitles />

        {/* Step 1: Sélection Formation */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher une formation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Formations List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <Card 
                  key={course.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedCourse?.id === course.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant={course.isRequired ? "destructive" : "secondary"}>
                          {course.isRequired ? "Obligatoire" : "Optionnelle"}
                        </Badge>
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getModalityIcon(course.modality)}
                        <span className="text-sm">{course.modality}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{course.price}€</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{course.enrollments} inscrits</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Prochaine session</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">
                            {new Date(course.nextSession.startDate).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="text-xs text-gray-600">{course.nextSession.location}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {course.nextSession.availableSpots}/{course.nextSession.totalSpots} places
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setCurrentStep(2)} 
                disabled={!selectedCourse}
                className="min-w-32"
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Sélection Session */}
        {currentStep === 2 && selectedCourse && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Sessions disponibles pour "{selectedCourse.title}"
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCourse.sessions.map(session => (
                  <Card 
                    key={session.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedSession?.id === session.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-medium">
                                Du {new Date(session.startDate).toLocaleDateString('fr-FR')} 
                                au {new Date(session.endDate).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {session.location}
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            Formateur: {session.instructor}
                          </div>
                        </div>
                        
                        <div className="text-right space-y-2">
                          <div className="text-lg font-bold text-blue-600">{session.price}€</div>
                          <Badge 
                            variant={session.availableSpots > 5 ? "default" : session.availableSpots > 0 ? "secondary" : "destructive"}
                          >
                            {session.availableSpots > 0 
                              ? `${session.availableSpots} places disponibles`
                              : "Complet"
                            }
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button 
                onClick={() => setCurrentStep(3)} 
                disabled={!selectedSession}
                className="min-w-32"
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Sélection Équipe */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Sélectionner les membres de l'équipe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map(member => {
                  const isRecommended = member.recommendedFor.includes(selectedCourse.id);
                  const hasConflicts = member.conflictingSessions.includes(selectedSession.id);
                  
                  return (
                    <Card 
                      key={member.id}
                      className={`transition-all duration-200 ${
                        selectedMembers.includes(member.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={selectedMembers.includes(member.id)}
                            onCheckedChange={() => handleMemberToggle(member.id)}
                            disabled={hasConflicts}
                          />
                          
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                              {member.firstName[0]}{member.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">
                                {member.firstName} {member.lastName}
                              </span>
                              {isRecommended && (
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  <Award className="h-3 w-3 mr-1" />
                                  Recommandé
                                </Badge>
                              )}
                              {hasConflicts && (
                                <Badge variant="destructive">
                                  <X className="h-3 w-3 mr-1" />
                                  Conflit planning
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {member.position} - {member.department}
                            </div>
                            <div className="text-sm text-gray-500">
                              Conformité: {member.complianceScore}% | 
                              Prérequis: {member.hasPrerequisites ? "✓ Validés" : "⚠ Manquants"}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium">{selectedSession?.price}€</div>
                            <div className="text-xs text-gray-500">par personne</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button 
                onClick={() => setCurrentStep(4)} 
                disabled={selectedMembers.length === 0}
                className="min-w-32"
              >
                Suivant
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Validation */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Récapitulatif de l'assignation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Formation sélectionnée */}
                <div>
                  <h3 className="font-semibold mb-3">Formation sélectionnée</h3>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{selectedCourse?.title}</div>
                          <div className="text-sm text-gray-600">{selectedCourse?.description}</div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Durée: {selectedCourse?.duration}</span>
                            <span>Modalité: {selectedCourse?.modality}</span>
                            <span>Catégorie: {selectedCourse?.category}</span>
                          </div>
                        </div>
                        <Badge variant={selectedCourse?.isRequired ? "destructive" : "secondary"}>
                          {selectedCourse?.isRequired ? "Obligatoire" : "Optionnelle"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Session sélectionnée */}
                <div>
                  <h3 className="font-semibold mb-3">Session sélectionnée</h3>
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Dates</div>
                          <div className="font-medium">
                            Du {new Date(selectedSession?.startDate).toLocaleDateString('fr-FR')} 
                            au {new Date(selectedSession?.endDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Lieu</div>
                          <div className="font-medium">{selectedSession?.location}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Formateur</div>
                          <div className="font-medium">{selectedSession?.instructor}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Places</div>
                          <div className="font-medium">
                            {selectedSession?.availableSpots} disponibles sur {selectedSession?.totalSpots}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Membres sélectionnés */}
                <div>
                  <h3 className="font-semibold mb-3">Membres sélectionnés ({selectedMembers.length})</h3>
                  <div className="space-y-2">
                    {selectedMembers.map(memberId => {
                      const member = teamMembers.find(m => m.id === memberId);
                      return (
                        <Card key={memberId} className="bg-gray-50">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                                    {member.firstName[0]}{member.lastName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{member.firstName} {member.lastName}</div>
                                  <div className="text-sm text-gray-600">{member.position}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{selectedSession?.price}€</div>
                                <div className="text-xs text-gray-500">Coût formation</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                {/* Coût total */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-lg">Coût total de l'assignation</div>
                        <div className="text-sm text-gray-600">
                          {selectedMembers.length} participants × {selectedSession?.price}€
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {calculateTotalCost()}€
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <div className="flex gap-3">
                <Button variant="outline">
                  Sauvegarder brouillon
                </Button>
                <Button className="min-w-32">
                  <Check className="h-4 w-4 mr-2" />
                  Confirmer l'assignation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default AssignTraining;
