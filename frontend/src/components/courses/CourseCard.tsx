import React from 'react';
import logger from '@/services/logger.service';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/types';
import SearchHighlight from './SearchHighlight';
import { getCategoryLabel, getCategoryConfig } from '@/utils/categoryUtils';
import { Clock, Calendar, Star, Users, Award, ChevronRight, Eye, Heart, Tag, TrendingUp } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  viewMode?: 'grid' | 'list';
  searchTerm?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, viewMode = 'grid', searchTerm = '' }) => {
  // Find the earliest session date
  const earliestSession = course.sessions.length > 0 
    ? course.sessions.reduce((earliest, session) => {
        return new Date(session.startDate) < new Date(earliest.startDate) ? session : earliest;
      }, course.sessions[0])
    : null;
  
  // Format price display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };
  
  // Map course type to display config
  const courseTypeConfig = {
    'in-person': { 
      label: 'Présentiel', 
      color: 'bg-blue-500', 
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      gradient: 'from-blue-500 to-blue-600'
    },
    'online': { 
      label: 'E-Learning', 
      color: 'bg-green-500', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      gradient: 'from-green-500 to-green-600'
    },
    'virtual': { 
      label: 'Classe Virtuelle', 
      color: 'bg-purple-500', 
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      gradient: 'from-purple-500 to-purple-600'
    }
  };

  const typeConfig = courseTypeConfig[course.type] || courseTypeConfig['online'];
  
  // Variables supprimées - plus de statistiques affichées
  
  // Debug: Log seulement une fois par cours (via useMemo)
  React.useMemo(() => {
    logger.debug(`Course card rendered: ${course.title}`);
  }, [course.id]);
  
  if (viewMode === 'list') {
    return (
      <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 rounded-2xl">
        <Link to={`/courses/${course.id}`} className="flex flex-row h-[160px]">
          {/* Image section */}
          <div className="relative w-64 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.gradient} opacity-30`}></div>
            <img 
              src={course.image_url || course.image} 
              alt={course.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0 font-medium px-3 py-1 w-fit`}>
                {typeConfig.label}
              </Badge>
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm w-fit">
                {getCategoryLabel(course.category)}
              </Badge>
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <h3 className="font-bold text-xl line-clamp-2 text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  <SearchHighlight text={course.title} searchTerm={searchTerm} />
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  <SearchHighlight text={course.provider} searchTerm={searchTerm} />
                </p>
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                <SearchHighlight text={course.description} searchTerm={searchTerm} />
              </p>
            </div>

            <div className="flex items-center justify-between">
              {/* Statistiques supprimées */}

              <div className="text-right">
                {earliestSession ? (
                  <>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(earliestSession.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(earliestSession.startDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Sessions à programmer</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }
  
  return (
    <Card className="group h-full flex flex-col overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 rounded-2xl">
      <Link to={`/courses/${course.id}`} className="h-full flex flex-col">
        {/* Header with gradient background */}
        <div className="relative aspect-video overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.gradient} opacity-30`}></div>
          <img 
            src={course.image_url || course.image} 
            alt={course.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Overlay content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <Badge className={`${typeConfig.bgColor} ${typeConfig.textColor} border-0 font-medium px-3 py-1`}>
                {typeConfig.label}
              </Badge>
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                <Award className="h-4 w-4 text-orange-500" />
              </div>
            </div>
            
            <div className="text-white">
              <Badge variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-sm mb-2">
                {getCategoryLabel(course.category)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="flex-grow p-6">
          <div className="space-y-4">
            {/* Title and Provider */}
            <div>
              <h3 className="font-bold text-lg line-clamp-2 text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                <SearchHighlight text={course.title} searchTerm={searchTerm} />
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                <SearchHighlight text={course.provider} searchTerm={searchTerm} />
              </p>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
              <SearchHighlight text={course.description} searchTerm={searchTerm} />
            </p>
            
            {/* Statistiques supprimées */}
            
            {/* Tags and Difficulty */}
            {(course.tags?.length > 0 || course.difficulty_level) && (
              <div className="flex items-center gap-2 flex-wrap">
                {course.difficulty_level && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      course.difficulty_level === 'beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                      course.difficulty_level === 'intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      course.difficulty_level === 'advanced' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}
                  >
                    {course.difficulty_level === 'beginner' ? 'Débutant' :
                     course.difficulty_level === 'intermediate' ? 'Intermédiaire' :
                     course.difficulty_level === 'advanced' ? 'Avancé' : 'Expert'}
                  </Badge>
                )}
                {course.tags?.slice(0, 2).map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Quality Indicators */}
            {course.qualiopiIndicators.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">Certifications :</div>
                <div className="flex flex-wrap gap-1">
                  {course.qualiopiIndicators.slice(0, 2).map((indicator, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    >
                      {indicator}
                    </Badge>
                  ))}
                  {course.qualiopiIndicators.length > 2 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      +{course.qualiopiIndicators.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Financing Options */}
            {(course.cpf_eligible || course.cpfEligible || course.opco_eligible || course.opcoEligible) && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium">Financement possible :</div>
                <div className="flex flex-wrap gap-1">
                  {(course.cpf_eligible || course.cpfEligible) && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      CPF
                    </Badge>
                  )}
                  {(course.opco_eligible || course.opcoEligible) && (
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      OPCO
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                    Plan de formation
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-6 pt-0">
          <div className="w-full">
            {earliestSession ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPrice(earliestSession.price)}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(earliestSession.startDate).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>Voir plus</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500">Sessions à programmer</p>
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium text-sm mt-1">
                  <span>Nous contacter</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            )}
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default CourseCard;
