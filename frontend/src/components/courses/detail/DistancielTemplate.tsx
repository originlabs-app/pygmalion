import React from 'react';
import { Course } from '@/types';
import { Video, Calendar, Users, Clock, Headphones, Camera, Globe, FileText, MessageCircle, BookOpen, ShoppingCart, CreditCard, Euro, Star, Trophy, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DistancielTemplateProps {
  course: Course;
}

const DistancielTemplate: React.FC<DistancielTemplateProps> = ({ course }) => {
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
      
      {/* Classes virtuelles */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Video className="h-5 w-5 text-blue-600" />
          Classes Virtuelles en Direct
        </h4>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-blue-800 mb-3">Interaction en temps réel</h5>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Formateur expert en direct
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Questions/réponses immédiates
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Échanges avec autres apprenants
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Exercices collaboratifs
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 mb-3">Outils pédagogiques</h5>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Tableau blanc interactif
                </li>
                <li className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Partage d'écran formateur
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Salles de travail en sous-groupes
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Enregistrement des sessions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Planning des sessions */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-600" />
          Planning des Sessions
        </h4>
        <div className="space-y-4">
          {[
            {
              title: "Session 1 : Introduction et fondamentaux",
              date: "Lundi 18 Mars 2024",
              time: "14h00 - 17h00",
              duration: "3h00",
              status: "À venir",
              description: "Présentation du programme, contexte réglementaire, définitions clés"
            },
            {
              title: "Session 2 : Procédures opérationnelles",
              date: "Mercredi 20 Mars 2024", 
              time: "14h00 - 17h00",
              duration: "3h00",
              status: "À venir",
              description: "Étude de cas pratiques, analyse de situations réelles"
            },
            {
              title: "Session 3 : Évaluation et certification",
              date: "Vendredi 22 Mars 2024",
              time: "14h00 - 16h00", 
              duration: "2h00",
              status: "À venir",
              description: "QCM final, mise en situation, délivrance des certificats"
            }
          ].map((session, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-2">{session.title}</h5>
                  <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {session.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration technique */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Configuration technique requise</h4>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-orange-800 mb-3">Équipement indispensable</h5>
              <ul className="space-y-2 text-orange-700">
                <li className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Webcam HD obligatoire
                </li>
                <li className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  Micro-casque recommandé
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Connexion haut débit stable (min 5 Mbps)
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Navigateur récent avec support WebRTC
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-orange-800 mb-3">Environnement optimal</h5>
              <ul className="space-y-2 text-orange-700">
                <li>• Espace calme et bien éclairé</li>
                <li>• Écran suffisamment grand (15" minimum)</li>
                <li>• Chaise confortable pour 3h de session</li>
                <li>• Prise de notes : papier ou application</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Avantages modalité distanciel */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Avantages de la Formation Distanciel</h4>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-600 rounded-full flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-purple-800 mb-2">Accessibilité</h5>
              <p className="text-sm text-purple-600">Formation depuis n'importe où sans déplacement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-purple-800 mb-2">Interaction riche</h5>
              <p className="text-sm text-purple-600">Échanges directs avec formateur et participants</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-600 rounded-full flex items-center justify-center">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-purple-800 mb-2">Sessions enregistrées</h5>
              <p className="text-sm text-purple-600">Replay disponible pendant 3 mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support et accompagnement */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Support et Accompagnement</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Assistance technique</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Test de connexion 30 min avant chaque session</li>
                <li>• Support technique dédié pendant les cours</li>
                <li>• Guide d'installation et de configuration</li>
                <li>• Assistance par téléphone et chat</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Suivi pédagogique</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Feuille d'émargement numérique</li>
                <li>• Évaluation continue de participation</li>
                <li>• Ressources complémentaires envoyées par email</li>
                <li>• Certificat de présence automatique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DistancielTemplate; 