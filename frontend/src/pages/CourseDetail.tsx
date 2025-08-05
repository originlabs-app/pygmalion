import React, { useState, useEffect } from 'react';
import logger from '@/services/logger.service';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEnrollments } from '@/contexts/EnrollmentContext';
import { getCategoryLabel } from '@/utils/categoryUtils';
import { formatDate, formatPrice } from '@/utils/formatters';
import { ENROLLMENT_MESSAGES } from '@/constants/messages';
import { ModalityBadge } from '@/components/ui/ModalityBadge';
import { CheckList } from '@/components/ui/CheckList';
import { toast } from 'sonner';
import { 
  Clock, 
  Calendar, 
  MapPin,
  CheckCircle,
  Monitor,
  Wifi,
  WifiOff,
  GraduationCap,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  Target,
  FileText,
  HelpCircle,
  Package,
  UserCheck
} from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { getCourse } = useCourses();
  const { currentUser } = useAuth();
  const { enrollInCourse, getStudentEnrollments } = useEnrollments();
  const navigate = useNavigate();
  
  const [enrollingSession, setEnrollingSession] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  
  const course = getCourse(courseId || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course]);
  
  if (!course) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Formation non trouvée</h1>
          <Link to="/courses">
            <Button>Retour au catalogue</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const enrollments = currentUser ? getStudentEnrollments(currentUser.id) : [];
  const isEnrolled = enrollments.some(e => e.courseId === course.id);
  
  const handleEnroll = async () => {
    if (!currentUser) {
      toast.error(ENROLLMENT_MESSAGES.loginRequired);
      navigate('/login', { state: { redirectTo: `/courses/${courseId}` } });
      return;
    }
    
    if (!selectedSession) {
      toast.error(ENROLLMENT_MESSAGES.sessionRequired);
      return;
    }
    
    try {
      setEnrollingSession(selectedSession.id);
      await enrollInCourse(course.id, selectedSession.id);
      toast.success(ENROLLMENT_MESSAGES.success);
    } catch (error) {
      logger.error('Erreur inscription:', error);
      toast.error(ENROLLMENT_MESSAGES.error);
    } finally {
      setEnrollingSession(null);
    }
  };
  


  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link to="/courses" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </Link>
          </div>
        </div>

        {/* Header avec image */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto">
            {course.image_url && (
              <img 
                src={course.image_url} 
                alt={course.title}
                className="w-full h-80 object-cover rounded-b-2xl"
              />
            )}
            <div className="px-4 py-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{course.provider}</p>
                  <div className="flex flex-wrap gap-2">
                    <ModalityBadge type={course.course_type} />
                    <Badge variant="outline">
                      {getCategoryLabel(course.category)}
                    </Badge>
                    {course.difficulty_level && (
                      <Badge variant="outline">
                        Niveau : {course.difficulty_level}
                      </Badge>
                    )}
                    {course.duration_hours && (
                      <Badge variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration_hours} heures
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {course.description && (
                <p className="text-gray-700 leading-relaxed max-w-4xl">
                  {course.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Colonne principale avec tabs */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="bg-white rounded-lg shadow-sm">
                <TabsList className="grid w-full grid-cols-4 p-1">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Vue d'ensemble
                  </TabsTrigger>
                  <TabsTrigger value="program" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Programme
                  </TabsTrigger>
                  <TabsTrigger value="objectives" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Objectifs
                  </TabsTrigger>
                  <TabsTrigger value="infos" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Infos pratiques
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="overview" className="space-y-6 mt-0">
                    {/* Objectifs */}
                    {course.objectives && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Objectifs de la formation</h2>
                        <p className="text-gray-700 whitespace-pre-line">{course.objectives}</p>
                      </div>
                    )}

                    {/* Public cible */}
                    {course.target_audience && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Public cible</h2>
                        <p className="text-gray-700">{course.target_audience}</p>
                      </div>
                    )}

                    {/* Prérequis */}
                    {course.requirements && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Prérequis</h2>
                        <p className="text-gray-700 whitespace-pre-line">{course.requirements}</p>
                      </div>
                    )}

                    {/* Certification */}
                    {(course.certification_type || course.qualiopi_indicators?.length > 0) && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Certification</h2>
                        {course.certification_type && (
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">{course.certification_type}</span>
                            {course.certification_validity_months && (
                              <span className="text-sm text-gray-600">
                                (Validité : {course.certification_validity_months} mois)
                              </span>
                            )}
                          </div>
                        )}
                        {course.qualiopi_indicators?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {course.qualiopi_indicators.map((indicator, idx) => (
                              <Badge key={idx} variant="secondary">
                                {indicator}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="program" className="space-y-6 mt-0">
                    {/* Programme général */}
                    {course.program && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Programme</h2>
                        <p className="text-gray-700 whitespace-pre-line">{course.program}</p>
                      </div>
                    )}

                    {/* Programme détaillé */}
                    {course.detailed_program?.modules && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Programme détaillé</h2>
                        <div className="space-y-4">
                          {course.detailed_program.modules.map((module: any, idx: number) => (
                            <div key={idx} className="border-l-4 border-blue-500 pl-4">
                              <h3 className="font-semibold text-lg">{module.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">Durée : {module.duration}</p>
                              {module.content && (
                                <ul className="space-y-1">
                                  {module.content.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-gray-700">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                        {course.detailed_program.evaluation && (
                          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Évaluation</h3>
                            <p className="text-gray-700">{course.detailed_program.evaluation}</p>
                          </div>
                        )}
                        {course.detailed_program.certification && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Certification</h3>
                            <p className="text-gray-700">{course.detailed_program.certification}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="objectives" className="space-y-6 mt-0">
                    {/* Résultats d'apprentissage */}
                    {course.learning_outcomes && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Ce que vous allez apprendre</h2>
                        <div className="space-y-6">
                          {course.learning_outcomes.knowledge && course.learning_outcomes.knowledge.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-blue-600" />
                                Connaissances
                              </h3>
                              <CheckList items={course.learning_outcomes.knowledge} />
                            </div>
                          )}
                          {course.learning_outcomes.skills && course.learning_outcomes.skills.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <Target className="h-5 w-5 text-green-600" />
                                Compétences pratiques
                              </h3>
                              <CheckList items={course.learning_outcomes.skills} />
                            </div>
                          )}
                          {course.learning_outcomes.competencies && course.learning_outcomes.competencies.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <UserCheck className="h-5 w-5 text-purple-600" />
                                Compétences métier
                              </h3>
                              <CheckList items={course.learning_outcomes.competencies} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Matériel inclus */}
                    {course.included_materials && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Matériel et ressources inclus
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {course.included_materials.physical && course.included_materials.physical.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Matériel physique</h3>
                              <ul className="space-y-1">
                                {course.included_materials.physical.map((item: string, idx: number) => (
                                  <li key={idx} className="text-gray-700">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {course.included_materials.digital && course.included_materials.digital.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Ressources numériques</h3>
                              <ul className="space-y-1">
                                {course.included_materials.digital.map((item: string, idx: number) => (
                                  <li key={idx} className="text-gray-700">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {course.included_materials.equipment && course.included_materials.equipment.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Équipements</h3>
                              <ul className="space-y-1">
                                {course.included_materials.equipment.map((item: string, idx: number) => (
                                  <li key={idx} className="text-gray-700">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {course.included_materials.certification && course.included_materials.certification.length > 0 && (
                            <div>
                              <h3 className="font-medium text-gray-900 mb-2">Documents de certification</h3>
                              <ul className="space-y-1">
                                {course.included_materials.certification.map((item: string, idx: number) => (
                                  <li key={idx} className="text-gray-700">• {item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="infos" className="space-y-6 mt-0">
                    {/* FAQ */}
                    {course.faq && course.faq.length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Questions fréquentes</h2>
                        <div className="space-y-4">
                          {course.faq.map((item: any, idx: number) => (
                            <div key={idx} className="border-l-4 border-gray-200 pl-4">
                              <h3 className="font-medium text-gray-900 mb-1">{item.question}</h3>
                              <p className="text-gray-700">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Profils formateurs */}
                    {course.instructor_profiles && course.instructor_profiles.length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Équipe pédagogique</h2>
                        <div className="space-y-4">
                          {course.instructor_profiles.map((instructor: any, idx: number) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-4">
                              <h3 className="font-semibold">{instructor.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{instructor.title}</p>
                              <p className="text-gray-700 text-sm">{instructor.experience}</p>
                              {instructor.certifications && instructor.certifications.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-gray-700">Certifications :</p>
                                  <ul className="text-sm text-gray-600">
                                    {instructor.certifications.map((cert: string, i: number) => (
                                      <li key={i}>• {cert}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {instructor.specialties && instructor.specialties.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm font-medium text-gray-700">Spécialités :</p>
                                  <ul className="text-sm text-gray-600">
                                    {instructor.specialties.map((spec: string, i: number) => (
                                      <li key={i}>• {spec}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accessibilité */}
                    {course.accessibility_info && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Accessibilité</h2>
                        <div className="space-y-2">
                          {course.accessibility_info.wheelchair_access && (
                            <p className="text-gray-700">✓ Accès fauteuil roulant</p>
                          )}
                          {course.accessibility_info.hearing_loop && (
                            <p className="text-gray-700">✓ Boucle magnétique</p>
                          )}
                          {course.accessibility_info.braille_documents && (
                            <p className="text-gray-700">✓ Documents en braille disponibles</p>
                          )}
                          {course.accessibility_info.sign_language && (
                            <p className="text-gray-700">✓ Interprète en langue des signes : {course.accessibility_info.sign_language}</p>
                          )}
                          {course.accessibility_info.assistance_available && (
                            <p className="text-gray-700">✓ Assistance disponible</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {course.tags && course.tags.length > 0 && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Mots-clés</h2>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag: string, idx: number) => (
                            <Badge key={idx} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Colonne latérale - Sessions et inscription */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                
                {/* Financement */}
                {(course.cpf_eligible || course.opco_eligible || course.payment_options?.length > 0) && (
                  <div className="mb-6 pb-6 border-b">
                    {(course.cpf_eligible || course.opco_eligible) && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Financement :</p>
                        <div className="flex gap-2">
                          {course.cpf_eligible && (
                            <Badge className="bg-green-100 text-green-800">CPF</Badge>
                          )}
                          {course.opco_eligible && (
                            <Badge className="bg-purple-100 text-purple-800">OPCO</Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {course.payment_options && course.payment_options.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">Options de paiement :</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.payment_options.map((option: string, idx: number) => (
                            <li key={idx}>• {option}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {course.refund_policy && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Remboursement :</p>
                        <p className="text-sm text-gray-600">{course.refund_policy}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Capacité */}
                {(course.min_participants || course.max_participants) && (
                  <div className="mb-6 pb-6 border-b">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>
                        {course.min_participants && `Min: ${course.min_participants} participants`}
                        {course.min_participants && course.max_participants && ' • '}
                        {course.max_participants && `Max: ${course.max_participants} participants`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Réductions */}
                {(course.early_bird_discount || course.group_discount) && (
                  <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Réductions disponibles :</p>
                    {course.early_bird_discount && (
                      <p className="text-sm text-gray-600">
                        • Réduction lève-tôt : {course.early_bird_discount}%
                      </p>
                    )}
                    {course.group_discount && (
                      <div className="text-sm text-gray-600 mt-1">
                        <p>• Réductions de groupe :</p>
                        <ul className="ml-4">
                          {Object.entries(course.group_discount).map(([key, value]) => {
                            const label = key.replace(/_/g, '-').replace('personnes', ' personnes');
                            return <li key={key}>{label} : {value}%</li>;
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Sessions */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Sessions disponibles</h3>
                  {course.sessions?.length > 0 ? (
                    <div className="space-y-3">
                      {course.sessions.map((session) => (
                        <div 
                          key={session.id}
                          onClick={() => setSelectedSession(session)}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedSession?.id === session.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-sm mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-medium">
                              {formatDate(session.startDate)}
                            </span>
                          </div>
                          {session.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <MapPin className="h-4 w-4" />
                              <span>{session.location}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold">
                              {formatPrice(session.price)}
                            </span>
                            <span className="text-sm text-gray-600">
                              {session.availableSeats} places
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Aucune session programmée</p>
                  )}
                </div>

                {/* Bouton inscription */}
                {!isEnrolled && (
                  <Button 
                    onClick={handleEnroll}
                    disabled={!selectedSession || enrollingSession !== null}
                    className="w-full"
                  >
                    {enrollingSession ? 'Inscription...' : 'S\'inscrire'}
                  </Button>
                )}
                
                {isEnrolled && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">Vous êtes inscrit</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;