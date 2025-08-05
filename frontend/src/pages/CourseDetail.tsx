import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { toast } from 'sonner';
import { 
  FileText, 
  Clock, 
  Calendar, 
  Users, 
  Shield, 
  ArrowRight, 
  Heart, 
  Share,
  Award,
  Star,
  CheckCircle,
  Monitor,
  Wifi,
  WifiOff,
  PlaneTakeoff,
  GraduationCap,
  ShoppingCart,
  CreditCard,
  Play,
  Download,
  Euro,
  MapPin,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SearchHighlight from '@/components/courses/SearchHighlight';

// Import refactored components
import CourseHeader from '@/components/courses/detail/CourseHeader';
import CourseSidebar from '@/components/courses/detail/CourseSidebar';
import CourseDetailsTab from '@/components/courses/detail/CourseDetailsTab';
import CourseSessionsTab from '@/components/courses/detail/CourseSessionsTab';
import CourseEnrollmentTab from '@/components/courses/detail/CourseEnrollmentTab';
import ELearningTemplate from '@/components/courses/detail/ELearningTemplate';
import DistancielTemplate from '@/components/courses/detail/DistancielTemplate';
import SemiPresentielTemplate from '@/components/courses/detail/SemiPresentielTemplate';
import PresentielTemplate from '@/components/courses/detail/PresentielTemplate';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourse } = useCourses();
  const { currentUser } = useAuth();
  const { enrollInCourse, getStudentEnrollments, loading } = useEnrollments();
  const navigate = useNavigate();
  
  const [enrollingSession, setEnrollingSession] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  
  // Log pour débogage
  logger.info(`Affichage du cours avec ID: ${courseId}`);
  
  const course = getCourse(courseId || '');
  
  useEffect(() => {
    // Log pour débogage
    logger.info('Course data:', course);
    
    // Scroll to top when course changes
    window.scrollTo(0, 0);
  }, [course]);
  
  if (!course) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Formation non trouvée</h1>
          <p className="text-muted-foreground mb-6">
            La formation que vous recherchez n'existe pas ou a été supprimée.
          </p>
          <Link to="/courses">
            <Button>
              <ArrowRight className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const enrollments = currentUser ? getStudentEnrollments(currentUser.id) : [];
  const userEnrollments = enrollments.filter(e => e.courseId === course.id);
  const isEnrolled = userEnrollments.length > 0;
  
  const handleEnroll = async (sessionId: string) => {
    if (!currentUser) {
      toast.error('Veuillez vous connecter pour vous inscrire aux formations');
      navigate('/login', { state: { redirectTo: `/courses/${courseId}` } });
      return;
    }
    
    try {
      setEnrollingSession(sessionId);
      await enrollInCourse(course.id, sessionId);
      toast.success('Inscription réussie !');
      setActiveTab('enrolled');
    } catch (error) {
      logger.error('Erreur lors de l\'inscription:', error);
      toast.error('L\'inscription a échoué. Veuillez réessayer.');
    } finally {
      setEnrollingSession(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const navigateToSessions = () => {
    setActiveTab('sessions');
    const sessionsTab = document.querySelector('[data-value="sessions"]') as HTMLElement | null;
    if (sessionsTab) {
      sessionsTab.click();
    }
  };

  // Configuration selon le type de formation
  const getModalityConfig = (type: string) => {
    switch (type) {
      case 'online':
        return {
          icon: <Monitor className="h-5 w-5" />,
          label: 'E-Learning',
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          description: 'Formation entièrement en ligne avec accès 24h/7j',
          features: ['Accès immédiat', 'Rythme personnalisé', 'Support technique', 'Certificat numérique']
        };
      case 'virtual':
        return {
          icon: <Wifi className="h-5 w-5" />,
          label: 'Classe Virtuelle',
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          description: 'Formation en direct avec formateur et interaction temps réel',
          features: ['Sessions live programmées', 'Interaction directe', 'Enregistrements disponibles', 'Groupe restreint']
        };
      case 'blended':
        return {
          icon: <PlaneTakeoff className="h-5 w-5" />,
          label: 'Semi-présentiel',
          color: 'bg-orange-500',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          description: 'Combinaison théorie en ligne et pratique sur site',
          features: ['Flexibilité théorie', 'Pratique encadrée', 'Suivi personnalisé', 'Matériel fourni']
        };
      case 'in-person':
        return {
          icon: <WifiOff className="h-5 w-5" />,
          label: 'Présentiel',
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          description: 'Formation entièrement en présentiel avec équipements professionnels',
          features: ['Interaction maximale', 'Équipements pros', 'Networking', 'Certification immédiate']
        };
      default:
        return {
          icon: <GraduationCap className="h-5 w-5" />,
          label: 'Formation',
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          description: 'Formation professionnelle certifiante',
          features: []
        };
    }
  };

  const modalityConfig = getModalityConfig(course.type);
  const earliestSession = course.sessions.length > 0 
    ? course.sessions.reduce((earliest, session) => {
        return new Date(session.startDate) < new Date(earliest.startDate) ? session : earliest;
      }, course.sessions[0])
    : null;

  // Fonction pour rendre le template spécialisé selon le type de formation
  const renderModalityTemplate = (course: any) => {
    // Mappage entre les types existants et les nouveaux templates
    switch (course.type) {
      case 'online':
        return <ELearningTemplate course={course} />;
      case 'virtual':
        return <DistancielTemplate course={course} />;
      case 'blended':
        return <SemiPresentielTemplate course={course} />;
      case 'in-person':
        return <PresentielTemplate course={course} />;
      default:
        return <ELearningTemplate course={course} />; // fallback
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-[1600px] mx-auto px-4 py-8">
          
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/courses" className="hover:text-blue-600 transition-colors">Formations</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate max-w-md">{course.title}</span>
            </div>
          </nav>

          {/* Header Formation */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
            <div className="relative">
              {/* Image de couverture */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Badges flottants */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <Badge className={`${modalityConfig.bgColor} ${modalityConfig.textColor} border-0 font-medium px-4 py-2 text-sm`}>
                    {modalityConfig.icon}
                    <span className="ml-2">{modalityConfig.label}</span>
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm px-4 py-2">
                    {course.category}
                  </Badge>
                </div>

                {/* Actions rapides */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Contenu header */}
              <div className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Informations principales */}
                  <div className="lg:col-span-2">
                    <div className="mb-6">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        <SearchHighlight text={course.title} searchTerm="" />
                      </h1>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        <SearchHighlight text={course.description} searchTerm="" />
                      </p>
                    </div>

                    {/* Informations organisme */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-1">Proposée par</p>
                      <p className="font-semibold text-lg text-gray-900">
                        <SearchHighlight text={course.provider} searchTerm="" />
                      </p>
                    </div>

                    {/* Indicateurs qualité */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.qualiopiIndicators.map((indicator, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="bg-blue-50 text-blue-700 border-blue-200 font-medium px-3 py-1"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {indicator}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats formation */}
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-800">4.8</span>
                        <span>(127 avis)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>1,240 inscrits</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Dernière mise à jour : Jan 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Carte inscription */}
                  <div className="lg:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      
                      {/* Prix */}
                      {earliestSession && (
                        <div className="mb-6">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-3xl font-bold text-gray-900">
                              {formatPrice(earliestSession.price)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Prochaine session : {formatDate(earliestSession.startDate)}
                          </p>
                        </div>
                      )}

                      {/* Modalité info */}
                      <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className={`${modalityConfig.color} p-2 rounded-lg text-white`}>
                            {modalityConfig.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{modalityConfig.label}</h4>
                            <p className="text-sm text-gray-600 mb-3">{modalityConfig.description}</p>
                            <ul className="space-y-1">
                              {modalityConfig.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          S'inscrire maintenant
                        </Button>
                        <Button variant="outline" className="w-full border-gray-300 text-gray-700 font-medium py-3">
                          <FileText className="h-4 w-4 mr-2" />
                          Demander un devis
                        </Button>
                        <Button variant="outline" className="w-full border-gray-300 text-gray-700 font-medium py-3">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Financement CPF/OPCO
                        </Button>
                      </div>

                      {/* Garanties */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Certification officielle incluse</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Support technique inclus</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Accès ressources à vie</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Onglets détaillés */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 px-12">
                <TabsList className="grid w-full max-w-2xl grid-cols-5 bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 py-4 px-6 rounded-none"
                  >
                    Vue d'ensemble
                  </TabsTrigger>
                  <TabsTrigger 
                    value="program" 
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 py-4 px-6 rounded-none"
                  >
                    Programme
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sessions" 
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 py-4 px-6 rounded-none"
                  >
                    Sessions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="instructor" 
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 py-4 px-6 rounded-none"
                  >
                    Formateur
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 py-4 px-6 rounded-none"
                  >
                    Avis
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-12">
                <TabsContent value="overview" className="space-y-8 mt-0">
                  
                  {/* Objectifs */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Objectifs de la formation</h3>
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {course.objectives}
                      </p>
                    </div>
                  </div>

                  {/* Informations pratiques */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Prérequis */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Prérequis</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-gray-700">{course.requirements}</p>
                      </div>
                    </div>

                    {/* Public cible */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Public concerné</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <p className="text-gray-700">{course.targetAudience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Template spécialisé selon la modalité */}
                  {renderModalityTemplate(course)}

                </TabsContent>

                <TabsContent value="program" className="mt-0">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Programme détaillé</h3>
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {course.program}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sessions" className="mt-0">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Sessions disponibles</h3>
                    <div className="space-y-4">
                      {course.sessions.map((session) => (
                        <div 
                          key={session.id} 
                          className={`bg-white rounded-xl p-6 border-2 transition-colors cursor-pointer ${
                            selectedSessionId === session.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedSessionId(session.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center gap-3">
                                  <Calendar className="h-5 w-5 text-blue-600" />
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      {formatDate(session.startDate)}
                                    </p>
                                    <p className="text-sm text-gray-600">Date de début</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-5 w-5 text-green-600" />
                                  <div>
                                    <p className="font-semibold text-gray-900">{session.location}</p>
                                    <p className="text-sm text-gray-600">Lieu</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Users className="h-5 w-5 text-purple-600" />
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      {session.availableSeats} places
                                    </p>
                                    <p className="text-sm text-gray-600">Disponibles</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <p className="text-2xl font-bold text-gray-900">
                                {formatPrice(session.price)}
                              </p>
                              <Button 
                                className={`mt-2 ${
                                  selectedSessionId === session.id 
                                    ? 'bg-blue-600 hover:bg-blue-700' 
                                    : 'bg-gray-600 hover:bg-gray-700'
                                }`}
                              >
                                Sélectionner
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="instructor" className="mt-0">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">À propos du formateur</h3>
                    <div className="bg-gray-50 rounded-xl p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                          {course.provider.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{course.provider}</h4>
                          <p className="text-gray-600 mb-4">
                            Organisme de formation spécialisé dans le secteur aéronautique avec plus de 15 ans d'expérience. 
                            Nos formateurs sont des professionnels certifiés avec une expertise terrain reconnue.
                          </p>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-blue-600" />
                              <span>Certifié Qualiopi</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-green-600" />
                              <span>12,000+ apprenants formés</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span>4.9/5 en moyenne</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-0">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Avis des apprenants</h3>
                    <div className="space-y-6">
                      
                      {/* Résumé des avis */}
                      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center gap-8">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">4.8</div>
                            <div className="flex items-center gap-1 mb-1">
                              {[1,2,3,4,5].map((star) => (
                                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">127 avis</div>
                          </div>
                          <div className="flex-1">
                            <div className="space-y-2">
                              {[5,4,3,2,1].map((rating) => (
                                <div key={rating} className="flex items-center gap-3">
                                  <span className="w-3 text-sm text-gray-600">{rating}</span>
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ width: rating === 5 ? '85%' : rating === 4 ? '12%' : '3%' }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600 w-8">
                                    {rating === 5 ? '85%' : rating === 4 ? '12%' : '3%'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Avis individuels */}
                      <div className="space-y-4">
                        {[
                          {
                            name: "Sophie M.",
                            role: "Agent de sûreté",
                            rating: 5,
                            date: "Il y a 2 semaines",
                            comment: "Formation excellente qui m'a permis d'obtenir ma certification rapidement. Les modules sont clairs et bien structurés."
                          },
                          {
                            name: "Marc L.",
                            role: "Technicien maintenance",
                            rating: 5,
                            date: "Il y a 1 mois",
                            comment: "Contenu très professionnel et formateurs compétents. Je recommande vivement cette formation."
                          },
                          {
                            name: "Amélie D.",
                            role: "Contrôleuse aérienne",
                            rating: 4,
                            date: "Il y a 2 mois",
                            comment: "Bonne formation dans l'ensemble. Seul bémol : j'aurais aimé plus d'exercices pratiques."
                          }
                        ].map((review, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{review.name}</p>
                                  <p className="text-sm text-gray-600">{review.role}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  {[1,2,3,4,5].map((star) => (
                                    <Star 
                                      key={star} 
                                      className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-gray-600">{review.date}</p>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </TabsContent>
              </div>

            </Tabs>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
