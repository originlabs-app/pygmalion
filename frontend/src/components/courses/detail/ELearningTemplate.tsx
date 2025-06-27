import React from 'react';
import { Course } from '@/types';
import { CheckCircle, Play, FileText, Award, Clock, Users, Monitor, Wifi, Download, Smartphone, ShoppingCart, CreditCard, Euro, Star, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ELearningTemplateProps {
  course: Course;
}

const ELearningTemplate: React.FC<ELearningTemplateProps> = ({ course }) => {
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
      
      {/* Plateforme E-Learning */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-green-600" />
          Plateforme E-Learning
        </h4>
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-green-800 mb-3">Accès et flexibilité</h5>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Accès immédiat 24h/7j
                </li>
                <li className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Compatible tous appareils
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Progression sauvegardée automatiquement
                </li>
                <li className="flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Fonctionne hors ligne une fois téléchargé
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-green-800 mb-3">Contenu interactif</h5>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Vidéos HD avec chapitrage
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents PDF téléchargeables
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Quiz interactifs avec feedback
                </li>
                <li className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Ressources complémentaires
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modules de formation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Modules de formation</h4>
        <div className="space-y-4">
          {[
            {
              title: "Module 1 : Fondamentaux théoriques",
              duration: "2h30",
              content: ["Vidéos explicatives", "Documents de référence", "Quiz de validation"],
              progress: 0
            },
            {
              title: "Module 2 : Cas pratiques",
              duration: "3h15",
              content: ["Simulations interactives", "Études de cas", "Exercices d'application"],
              progress: 0
            },
            {
              title: "Module 3 : Évaluation finale",
              duration: "1h30",
              content: ["QCM de certification", "Cas pratique final", "Validation des acquis"],
              progress: 0
            }
          ].map((module, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">{module.title}</h5>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{module.content.length} éléments</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">{module.progress}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <ul className="space-y-1">
                {module.content.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-3 w-3 text-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Suivi et certification */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Suivi et certification</h4>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-blue-800 mb-2">Progression temps réel</h5>
              <p className="text-sm text-blue-600">Suivez votre avancement module par module</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-blue-800 mb-2">Support pédagogique</h5>
              <p className="text-sm text-blue-600">Assistance par chat ou email</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-600 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-blue-800 mb-2">Certificat numérique</h5>
              <p className="text-sm text-blue-600">Délivré automatiquement après validation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration technique */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Configuration technique requise</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Minimum requis</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Connexion internet : 2 Mbps</li>
                <li>• Navigateur récent (Chrome, Firefox, Safari)</li>
                <li>• Écran : 1024x768 minimum</li>
                <li>• Audio : Haut-parleurs ou casque</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Recommandé</h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Connexion haut débit : 5 Mbps+</li>
                <li>• Écran HD : 1920x1080</li>
                <li>• Webcam pour certifications</li>
                <li>• Environnement calme et ergonomique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ELearningTemplate; 