import React from 'react';
import { Course } from '@/types';
import { MapPin, Building2, Calendar, Users, Clock, Car, Coffee, Wifi, Award, CheckCircle, Wrench, BookOpen, Phone, ShoppingCart, CreditCard, Euro, Star, Trophy, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PresentielTemplateProps {
  course: Course;
}

const PresentielTemplate: React.FC<PresentielTemplateProps> = ({ course }) => {
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
      
      {/* Centre de formation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-red-600" />
          Centre de Formation Agréé
        </h4>
        <div className="bg-red-50 rounded-xl p-6 border border-red-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-red-800 mb-3">Cabin Crew Training Institute</h5>
              <div className="space-y-2 text-red-700">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Adresse :</p>
                    <p className="text-sm">Zone Aéroportuaire, Bâtiment Formation</p>
                    <p className="text-sm">Aéroport Paris-Orly, 94390 Orly</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>01 41 75 15 15</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-red-800 mb-3">Agréments et certifications</h5>
              <ul className="space-y-2 text-red-700 text-sm">
                <li className="flex items-center gap-2">
                  <Award className="h-3 w-3" />
                  Organisme Qualiopi certifié
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-3 w-3" />
                  Agréé DGAC - Référence : FR-ATO-1234
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-3 w-3" />
                  Partenaire Air France Training
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-3 w-3" />
                  Membre réseau IATA Training
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Programme de formation */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Programme de Formation Intensive</h4>
        <div className="space-y-4">
          {[
            {
              day: "Jour 1 - Accueil et Fondamentaux",
              time: "8h30 - 17h30",
              modules: [
                "8h30 - 9h00 : Accueil et présentation du groupe",
                "9h00 - 12h00 : Réglementation aéronautique et sécurité",
                "14h00 - 17h00 : Procédures d'urgence et évacuation",
                "17h00 - 17h30 : Débriefing et questions/réponses"
              ],
              color: "bg-blue-50 border-blue-100 text-blue-700"
            },
            {
              day: "Jour 2 - Pratique et Simulations",
              time: "8h30 - 17h30",
              modules: [
                "8h30 - 12h00 : Travaux pratiques sur simulateur de cabine",
                "14h00 - 16h00 : Gestes de premiers secours",
                "16h00 - 17h00 : Manipulation équipements de sécurité",
                "17h00 - 17h30 : Évaluation des acquis du jour"
              ],
              color: "bg-green-50 border-green-100 text-green-700"
            },
            {
              day: "Jour 3 - Mise en Situation et Certification",
              time: "8h30 - 16h00",
              modules: [
                "8h30 - 12h00 : Examens pratiques individuels",
                "14h00 - 15h00 : Évaluation théorique finale",
                "15h00 - 16h00 : Remise des certificats et clôture"
              ],
              color: "bg-orange-50 border-orange-100 text-orange-700"
            }
          ].map((day, idx) => (
            <div key={idx} className={`rounded-xl p-6 border ${day.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-900">{day.day}</h5>
                <span className="text-sm bg-white px-3 py-1 rounded-full text-gray-600">
                  {day.time}
                </span>
              </div>
              <ul className="space-y-2">
                {day.modules.map((module, moduleIdx) => (
                  <li key={moduleIdx} className={`flex items-start gap-2 text-sm ${day.color.split(' ')[2]}`}>
                    <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{module}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Équipements et matériel */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-purple-600" />
          Équipements et Matériel Pédagogique
        </h4>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h5 className="font-semibold text-purple-800 mb-3">Simulateurs</h5>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Simulateur de cabine A320/B737
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Toboggan d'évacuation gonflable
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Simulateur de fumée/feu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Bassins de sauvetage en mer
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-800 mb-3">Équipements sécurité</h5>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Gilets de sauvetage dernière génération
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Masques à oxygène réels
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Extincteurs et équipements anti-feu
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Kit de premiers secours complet
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-800 mb-3">Salles de formation</h5>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Salles climatisées - 20 places
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Vidéoprojecteurs HD interactifs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  Système audiovisuel professionnel
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3" />
                  WiFi haut débit gratuit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Sessions disponibles */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-green-600" />
          Sessions Disponibles
        </h4>
        <div className="space-y-4">
          {[
            {
              title: "Session Mars 2024",
              dates: "Du 18 au 20 Mars 2024",
              schedule: "8h30 - 17h30 (pauses comprises)",
              places: "8 places disponibles / 12",
              status: "Ouvert aux inscriptions",
              statusColor: "bg-green-100 text-green-800",
              price: "3 200€ HT"
            },
            {
              title: "Session Avril 2024",
              dates: "Du 15 au 17 Avril 2024",
              schedule: "8h30 - 17h30 (pauses comprises)",
              places: "12 places disponibles / 12",
              status: "Places disponibles",
              statusColor: "bg-blue-100 text-blue-800",
              price: "3 200€ HT"
            },
            {
              title: "Session Mai 2024",
              dates: "Du 13 au 15 Mai 2024",
              schedule: "8h30 - 17h30 (pauses comprises)",
              places: "2 places disponibles / 12",
              status: "Dernières places",
              statusColor: "bg-orange-100 text-orange-800",
              price: "3 200€ HT"
            }
          ].map((session, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-gray-900">{session.title}</h5>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${session.statusColor}`}>
                      {session.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span>{session.dates}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{session.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>{session.places}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-600 mb-1">{session.price}</div>
                  <div className="text-sm text-gray-500">par participant</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Informations pratiques */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Informations Pratiques</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Car className="h-4 w-4" />
                Accès et transport
              </h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>Parking gratuit</strong> : 50 places sécurisées</li>
                <li>• <strong>RER B</strong> : Antony puis Orlyval</li>
                <li>• <strong>Tramway T7</strong> : Arrêt Aéroport d'Orly</li>
                <li>• <strong>Navettes</strong> : Depuis gares principales</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Services sur place
              </h5>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>Restauration</strong> : Repas du midi inclus</li>
                <li>• <strong>Pauses</strong> : Cafétéria et distributeurs</li>
                <li>• <strong>Hébergement</strong> : Partenariats hôtels proches</li>
                <li>• <strong>Vestiaires</strong> : Casiers sécurisés disponibles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Ce qu'il faut apporter */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Ce qu'il Faut Apporter</h4>
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Documents obligatoires
              </h5>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Pièce d'identité en cours de validité</li>
                <li>• Convocation de formation (email)</li>
                <li>• Certificat médical si requis</li>
                <li>• Attestation employeur (si formation financée)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Équipement personnel
              </h5>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• Tenue confortable pour exercices pratiques</li>
                <li>• Chaussures de sécurité fermées obligatoires</li>
                <li>• Matériel de prise de notes</li>
                <li>• Bouteille d'eau (journées intensives)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Avantages présentiel */}
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Avantages de la Formation Présentielle</h4>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Interaction directe</h5>
              <p className="text-sm text-gray-600">Échanges immédiats avec formateurs experts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full flex items-center justify-center">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Pratique réelle</h5>
              <p className="text-sm text-gray-600">Manipulation d'équipements professionnels</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Certification optimale</h5>
              <p className="text-sm text-gray-600">Taux de réussite 95% grâce à l'encadrement</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PresentielTemplate; 