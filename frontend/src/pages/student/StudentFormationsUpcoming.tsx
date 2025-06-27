import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentLayout from '@/components/layout/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Clock,
  Euro,
  MapPin,
  Users,
  BookOpen,
  Download,
  CheckCircle,
  AlertTriangle,
  User,
  Bell,
  CreditCard,
  Filter,
  Search,
  Star,
  Award,
  Plus,
  ExternalLink,
  CalendarPlus
} from 'lucide-react';

interface UpcomingFormation {
  id: string;
  courseId: string;
  title: string;
  provider: string;
  category: string;
  type: 'online' | 'virtual' | 'in-person' | 'blended';
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  location: string;
  instructor?: string;
  availableSeats: number;
  totalSeats: number;
  status: 'enrolled' | 'pending-payment' | 'waitlist' | 'available';
  duration: string;
  description: string;
  requirements: string[];
  benefits: string[];
  certificationLevel: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  rating: number;
  enrollmentDeadline: string;
  paymentDeadline?: string;
}

const StudentFormationsUpcoming = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('start-date');

  // Données mockées des formations à venir - basées sur le catalogue réel
  const upcomingFormations: UpcomingFormation[] = [
    {
      id: 'upcoming-1',
      courseId: '2',
      title: 'Formation Anglais Technique Aéronautique ICAO Niveau 4',
      provider: 'AeroLanguage Institute',
      category: 'Langues Techniques',
      type: 'online',
      startDate: '2024-02-05',
      endDate: '2024-04-05',
      price: 595,
      currency: 'EUR',
      location: 'Plateforme e-learning',
      availableSeats: 18,
      totalSeats: 30,
      status: 'enrolled',
      duration: '40 heures',
      description: 'Perfectionnez votre anglais technique aviation avec cette formation e-learning interactive. Préparation à l\'examen ICAO Level 4.',
      requirements: ['Niveau B1 minimum en anglais général'],
      benefits: ['Certification ICAO Level 4', 'Phraséologie aéronautique', 'Communication d\'urgence'],
      certificationLevel: 'ICAO Level 4',
      difficulty: 'Intermédiaire',
      rating: 4.6,
      enrollmentDeadline: '2024-01-30',
      paymentDeadline: '2024-01-28'
    },
    {
      id: 'upcoming-2',
      courseId: '4',
      title: 'Contrôle Aérien - Procédures d\'Approche ILS',
      provider: 'ATC Training Center',
      category: 'Contrôle Aérien',
      type: 'virtual',
      startDate: '2024-03-15',
      endDate: '2024-05-17',
      price: 2200,
      currency: 'EUR',
      location: 'Simulateur ATC Virtuel',
      instructor: 'Captain Michel Laurent - Ex-Contrôleur DGAC',
      availableSeats: 3,
      totalSeats: 8,
      status: 'available',
      duration: '60 heures (10 semaines)',
      description: 'Formation spécialisée en contrôle d\'approche aux instruments. Simulation temps réel et procédures avancées pour contrôleurs certifiés.',
      requirements: ['Licence contrôleur aérien en cours de validité'],
      benefits: ['Qualification ILS Avancée', 'Simulation haute fidélité', 'Procédures d\'urgence'],
      certificationLevel: 'Qualification ILS Avancée',
      difficulty: 'Avancé',
      rating: 4.9,
      enrollmentDeadline: '2024-03-01'
    },
    {
      id: 'upcoming-3',
      courseId: '5',
      title: 'Formation Pilote Privé (PPL) - Parcours Complet',
      provider: 'École de Pilotage Île-de-France',
      category: 'Pilotage',
      type: 'blended',
      startDate: '2024-04-01',
      endDate: '2024-09-30',
      price: 8500,
      currency: 'EUR',
      location: 'Aérodrome Lognes-Emerainville',
      instructor: 'Commandant Sarah Moreau - 15 000h de vol',
      availableSeats: 2,
      totalSeats: 6,
      status: 'waitlist',
      duration: '6 mois (150 heures)',
      description: 'Formation complète pour obtenir votre licence de pilote privé. Théorie, simulation et vols réels avec instructeur certifié.',
      requirements: ['18 ans minimum', 'Certificat médical Classe 2', 'Aucune expérience requise'],
      benefits: ['Licence PPL officielle', '45h de vol réel', 'Théorie complète', 'Examen blanc inclus'],
      certificationLevel: 'Licence de Pilote Privé (PPL)',
      difficulty: 'Débutant',
      rating: 4.8,
      enrollmentDeadline: '2024-03-15'
    }
  ];

  // Fonctions utilitaires
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'text-green-600 bg-green-100';
      case 'pending-payment': return 'text-orange-600 bg-orange-100';
      case 'waitlist': return 'text-purple-600 bg-purple-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'enrolled': return 'Inscrit';
      case 'pending-payment': return 'Paiement en attente';
      case 'waitlist': return 'Liste d\'attente';
      case 'available': return 'Disponible';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return '💻';
      case 'virtual': return '🎥';
      case 'in-person': return '🏢';
      case 'blended': return '🔄';
      default: return '📚';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'text-green-600 bg-green-100';
      case 'Intermédiaire': return 'text-orange-600 bg-orange-100';
      case 'Avancé': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDaysUntilStart = (startDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filtrage et tri
  const filteredFormations = upcomingFormations
    .filter(formation => {
      const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          formation.provider.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || formation.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || formation.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'start-date': return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'price': return a.price - b.price;
        case 'alphabetical': return a.title.localeCompare(b.title);
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  const enrolledCount = upcomingFormations.filter(f => f.status === 'enrolled').length;
  const pendingPaymentCount = upcomingFormations.filter(f => f.status === 'pending-payment').length;
  const totalBudget = upcomingFormations
    .filter(f => f.status === 'enrolled' || f.status === 'pending-payment')
    .reduce((sum, f) => sum + f.price, 0);

  return (
    <StudentLayout>
      <div className="space-y-6">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Formations À Venir</h1>
            <p className="text-gray-600">
              Planifiez votre apprentissage avec {upcomingFormations.length} formations programmées
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Calendrier
            </Button>
            <Button size="sm" asChild>
              <Link to="/courses">
                <Plus className="h-4 w-4 mr-2" />
                Découvrir Plus
              </Link>
            </Button>
          </div>
        </div>

        {/* Alertes importantes */}
        {pendingPaymentCount > 0 && (
          <Alert className="border-orange-200 bg-orange-50">
            <CreditCard className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Vous avez {pendingPaymentCount} formation{pendingPaymentCount > 1 ? 's' : ''} en attente de paiement. 
              <Button variant="link" className="p-0 h-auto ml-2 text-orange-600 underline">
                Finaliser maintenant
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* KPIs Résumé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inscriptions Confirmées</p>
                  <p className="text-3xl font-bold text-green-600">{enrolledCount}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">En Attente Paiement</p>
                  <p className="text-3xl font-bold text-orange-600">{pendingPaymentCount}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Budget Total</p>
                  <p className="text-3xl font-bold text-blue-600">{totalBudget.toLocaleString()}€</p>
                </div>
                <Euro className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Heures Planifiées</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {upcomingFormations.reduce((sum, f) => sum + parseInt(f.duration.split(' ')[0]), 0)}h
                  </p>
                </div>
                <Clock className="h-10 w-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et Recherche */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Langues Techniques">Langues Techniques</SelectItem>
                  <SelectItem value="Contrôle Aérien">Contrôle Aérien</SelectItem>
                  <SelectItem value="Pilotage">Pilotage</SelectItem>
                  <SelectItem value="Maintenance Aéronautique">Maintenance Aéronautique</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="enrolled">Inscrit</SelectItem>
                  <SelectItem value="pending-payment">Paiement en attente</SelectItem>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="waitlist">Liste d'attente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start-date">Date début</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="alphabetical">Alphabétique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des Formations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredFormations.map((formation) => {
            const daysUntilStart = getDaysUntilStart(formation.startDate);
            const daysUntilDeadline = getDaysUntilDeadline(formation.enrollmentDeadline);
            const seatsPercentage = Math.round((formation.availableSeats / formation.totalSeats) * 100);
            
            return (
              <Card key={formation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 flex items-center gap-2">
                        <span>{getTypeIcon(formation.type)}</span>
                        {formation.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {formation.provider}
                        </span>
                        <Badge variant="outline">{formation.category}</Badge>
                        <Badge className={getDifficultyColor(formation.difficulty)}>
                          {formation.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(formation.status)}>
                      {getStatusLabel(formation.status)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Informations clés */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Début: {new Date(formation.startDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{formation.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4 text-gray-400" />
                      <span>{formation.price.toLocaleString()} {formation.currency}</span>
                    </div>
                  </div>

                  {formation.instructor && (
                    <div className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded-lg">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800">{formation.instructor}</span>
                    </div>
                  )}

                  {/* Note et disponibilité */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(formation.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{formation.rating}/5</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <Users className="h-4 w-4 inline mr-1" />
                      {formation.availableSeats}/{formation.totalSeats} places
                      {seatsPercentage <= 25 && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          Dernières places !
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Countdown et urgence */}
                  {daysUntilStart > 0 && (
                    <div className={`p-3 rounded-lg ${daysUntilStart <= 7 ? 'bg-orange-50' : 'bg-blue-50'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${daysUntilStart <= 7 ? 'text-orange-600' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium ${daysUntilStart <= 7 ? 'text-orange-800' : 'text-blue-800'}`}>
                          Début dans {daysUntilStart} jour{daysUntilStart > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Deadline d'inscription */}
                  {formation.status === 'available' && daysUntilDeadline > 0 && (
                    <div className={`p-2 rounded-lg ${daysUntilDeadline <= 3 ? 'bg-red-50' : 'bg-yellow-50'}`}>
                      <div className="flex items-center gap-2">
                        <Bell className={`h-4 w-4 ${daysUntilDeadline <= 3 ? 'text-red-600' : 'text-yellow-600'}`} />
                        <span className={`text-xs ${daysUntilDeadline <= 3 ? 'text-red-800' : 'text-yellow-800'}`}>
                          Inscription jusqu'au {new Date(formation.enrollmentDeadline).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bénéfices */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-700">Certification :</div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-gray-600">{formation.certificationLevel}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {formation.status === 'enrolled' && (
                      <>
                        <Button className="flex-1" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Inscrit
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/courses/${formation.courseId}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </>
                    )}
                    
                    {formation.status === 'pending-payment' && (
                      <Button className="flex-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Finaliser Paiement
                      </Button>
                    )}
                    
                    {formation.status === 'available' && (
                      <>
                        <Button className="flex-1">
                          <Plus className="h-4 w-4 mr-2" />
                          S'inscrire
                        </Button>
                        <Button variant="outline" asChild>
                          <Link to={`/courses/${formation.courseId}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </>
                    )}
                    
                    {formation.status === 'waitlist' && (
                      <Button className="flex-1" variant="outline">
                        <Bell className="h-4 w-4 mr-2" />
                        Liste d'attente
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recommandations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Formations Recommandées
            </CardTitle>
            <CardDescription>
              Basées sur votre profil et vos formations actuelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Découvrez de nouvelles opportunités de formation</p>
              <Button asChild>
                <Link to="/courses">
                  <Search className="h-4 w-4 mr-2" />
                  Explorer le Catalogue
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
};

export default StudentFormationsUpcoming; 