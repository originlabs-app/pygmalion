import React from 'react';
import { Course } from '@/types';
import { Monitor, MapPin, Calendar, Users, Clock, BookOpen, Video, CheckCircle, Award, Laptop, Building2, ShoppingCart, CreditCard, Euro, Star, Trophy, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SemiPresentielTemplateProps {
  course: Course;
}

const SemiPresentielTemplate: React.FC<SemiPresentielTemplateProps> = ({ course }) => {
  return (
    <div className="space-y-8">
      
      {/* Informations réglementaires obligatoires */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Informations Réglementaires</h4>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <strong className="text-blue-800 min-w-0 flex-shrink-0">Langue :</strong>
                <span className="text-blue-700">{course.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-blue-800 min-w-0 flex-shrink-0">Classification :</strong>
                <span className="text-blue-700">{course.classificationNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-blue-800 min-w-0 flex-shrink-0">Durée :</strong>
                <span className="text-blue-700">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-blue-800 min-w-0 flex-shrink-0">Validation visée :</strong>
                <span className="text-blue-700">{course.targetCertification}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-green-600" />
                <strong className="text-blue-800">Taux de réussite :</strong>
                <span className="text-green-700 font-semibold">{course.successRate}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <strong className="text-blue-800">Satisfaction :</strong>
                <span className="text-blue-700 font-semibold">{course.satisfactionRate}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-purple-600" />
                <strong className="text-blue-800">Validité :</strong>
                <span className="text-blue-700">{course.validityDuration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-blue-600" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-700 border-blue-300 hover:bg-blue-50"
                  onClick={() => window.open(course.programPdfUrl, '_blank')}
                >
                  Télécharger le programme PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions principales */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Ajouter au panier
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 font-medium py-3">
            <FileText className="h-4 w-4 mr-2" />
            Demander un devis
          </Button>
          <Button variant="outline" className="border-green-300 text-green-700 font-medium py-3 hover:bg-green-50">
            <Download className="h-4 w-4 mr-2" />
            Télécharger programme
          </Button>
        </div>
      </div>

      {/* Financement */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Options de Financement</h4>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.cpfEligible && (
              <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-100">
                <CreditCard className="h-4 w-4 mr-2" />
                Financement CPF - Éligible
              </Button>
            )}
            {course.opcoEligible && (
              <Button variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                <Euro className="h-4 w-4 mr-2" />
                Prise en charge OPCO
              </Button>
            )}
          </div>
          {(course.cpfEligible || course.opcoEligible) && (
            <p className="text-sm text-gray-600 mt-4 text-center">
              💡 Cette formation peut être entièrement financée selon votre situation
            </p>
          )}
        </div>
      </div>
      
      {/* Modalité hybride */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-indigo-600" />
          Formation Hybride : Théorie + Pratique
        </h4>
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Laptop className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold text-blue-800">Partie E-Learning (60%)</h5>
              </div>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Modules théoriques interactifs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Apprentissage à votre rythme
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Quiz et évaluations en ligne
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Support pédagogique disponible
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-orange-600" />
                <h5 className="font-semibold text-orange-800">Partie Présentielle (40%)</h5>
              </div>
              <ul className="space-y-2 text-orange-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Travaux pratiques encadrés
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Mise en situation réelle
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Échanges avec formateur expert
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Évaluation pratique finale
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Programme de formation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Programme Pédagogique</h4>
        <div className="space-y-4">
          {[
            {
              phase: "Phase 1 - E-Learning",
              icon: <Laptop className="h-5 w-5 text-blue-600" />,
              duration: "4 semaines",
              bgColor: "bg-blue-50 border-blue-100",
              textColor: "text-blue-700",
              modules: [
                "Module 1 : Réglementation aéronautique (1 semaine)",
                "Module 2 : Procédures de sécurité (1 semaine)",
                "Module 3 : Études de cas théoriques (1 semaine)",
                "Module 4 : Préparation aux travaux pratiques (1 semaine)"
              ]
            },
            {
              phase: "Phase 2 - Présentiel",
              icon: <Building2 className="h-5 w-5 text-orange-600" />,
              duration: "3 jours",
              bgColor: "bg-orange-50 border-orange-100",
              textColor: "text-orange-700",
              modules: [
                "Jour 1 : Manipulation équipements spécialisés",
                "Jour 2 : Simulations et mises en situation",
                "Jour 3 : Évaluation pratique et certification"
              ]
            }
          ].map((phase, idx) => (
            <div key={idx} className={`rounded-xl p-6 border ${phase.bgColor}`}>
              <div className="flex items-center gap-2 mb-4">
                {phase.icon}
                <h5 className="font-semibold text-gray-900">{phase.phase}</h5>
                <span className="ml-auto text-sm bg-white px-3 py-1 rounded-full text-gray-600">
                  {phase.duration}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.modules.map((module, moduleIdx) => (
                  <li key={moduleIdx} className={`flex items-start gap-2 text-sm ${phase.textColor}`}>
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions présentielles */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Sessions Présentielles
        </h4>
        <div className="space-y-4">
          {[
            {
              title: "Session Paris - Centre de Formation CDG",
              address: "Zone Technique Aéroport Charles de Gaulle, 95700 Roissy",
              dates: "Du 25 au 27 Mars 2024",
              time: "8h30 - 17h30",
              places: "12 places disponibles",
              equipment: "Simulateurs, équipements réels, salle informatique"
            },
            {
              title: "Session Lyon - Centre Technique Aéronautique",
              address: "Aéroport Lyon-Saint Exupéry, 69125 Saint-Exupéry",
              dates: "Du 8 au 10 Avril 2024",
              time: "8h30 - 17h30",
              places: "8 places disponibles",
              equipment: "Plateau technique, outils spécialisés, espace pratique"
            }
          ].map((session, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-2">{session.title}</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-green-600" />
                      <span>{session.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{session.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>{session.places}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h6 className="text-xs font-medium text-gray-700 mb-1">Équipements disponibles :</h6>
                <p className="text-xs text-gray-600">{session.equipment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prérequis et préparation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Prérequis et Préparation</h4>
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Avant la formation
              </h5>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Compléter 100% des modules e-learning</li>
                <li>• Réussir les quiz intermédiaires (min 80%)</li>
                <li>• Télécharger et étudier les supports</li>
                <li>• Confirmer sa présence 48h avant</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Le jour J
              </h5>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Arriver 15 min avant le début</li>
                <li>• Apporter pièce d'identité et convocation</li>
                <li>• Tenue professionnelle recommandée</li>
                <li>• Matériel de prise de notes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Avantages modalité hybride */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Avantages de la Formation Hybride</h4>
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Flexibilité</h5>
              <p className="text-sm text-gray-600">Théorie à votre rythme, pratique encadrée</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Efficacité</h5>
              <p className="text-sm text-gray-600">Meilleur taux de réussite et mémorisation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Interaction</h5>
              <p className="text-sm text-gray-600">Échanges riches avec formateurs et pairs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suivi et évaluation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Suivi et Évaluation</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Évaluation continue</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Quiz en ligne après chaque module (20%)</li>
                <li>• Participation aux sessions présentielles (30%)</li>
                <li>• Évaluation pratique finale (50%)</li>
                <li>• Note minimale requise : 12/20</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Certification</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Attestation de formation hybride</li>
                <li>• Certificat de compétences acquises</li>
                <li>• Badge numérique vérifiable</li>
                <li>• Validité : 3 ans renouvelable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SemiPresentielTemplate; 