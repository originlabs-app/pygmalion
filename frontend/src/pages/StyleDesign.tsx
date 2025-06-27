import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Plane, Award, BookOpen, Target, Users, Shield, 
  TrendingUp, Heart, Star, Quote, ArrowRight,
  Sparkles, Zap, CheckCircle, ChevronDown, Menu, Search,
  GraduationCap, Building2, BarChart3, Trophy, Phone,
  Radar, Clock, FileText, AlertTriangle, Settings,
  Activity, Download, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StyleDesign = () => {
  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            PYGMALION Design System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Source de vérité pour tous les éléments de branding, couleurs, typographie 
            et composants utilisés dans la plateforme PYGMALION.
          </p>
        </div>

        {/* Table des matières */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Table des matières</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#colors" className="text-blue-600 hover:text-blue-700 font-medium">1. Palette de couleurs</a>
            <a href="#typography" className="text-blue-600 hover:text-blue-700 font-medium">2. Typographie</a>
            <a href="#buttons" className="text-blue-600 hover:text-blue-700 font-medium">3. Boutons</a>
            <a href="#cards" className="text-blue-600 hover:text-blue-700 font-medium">4. Cards</a>
            <a href="#badges" className="text-blue-600 hover:text-blue-700 font-medium">5. Badges</a>
            <a href="#navigation" className="text-blue-600 hover:text-blue-700 font-medium">6. Navigation & Liens</a>
            <a href="#gradients" className="text-blue-600 hover:text-blue-700 font-medium">7. Gradients</a>
            <a href="#icons" className="text-blue-600 hover:text-blue-700 font-medium">8. Iconographie</a>
            <a href="#sections" className="text-blue-600 hover:text-blue-700 font-medium">9. Sections types</a>
            <a href="#spacing" className="text-blue-600 hover:text-blue-700 font-medium">10. Système d'espacement</a>
            <a href="#new-patterns" className="text-blue-600 hover:text-blue-700 font-medium">11. Nouveaux Patterns (Pages Spécialisées)</a>
            <a href="#enterprise-patterns" className="text-blue-600 hover:text-blue-700 font-medium">12. Patterns Entreprise (ForCompanies)</a>
            <a href="#airport-patterns" className="text-blue-600 hover:text-blue-700 font-medium">13. Patterns Aéroports (ForAirports)</a>
          </div>
        </div>

        {/* 1. PALETTE DE COULEURS */}
        <section id="colors" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">1. Palette de couleurs</h2>
          
          {/* Couleurs principales */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs principales</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Blue 600</div>
                <div className="text-sm opacity-90">#2563EB</div>
                <div className="text-xs mt-2">Primary Brand</div>
              </div>
              <div className="bg-blue-700 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Blue 700</div>
                <div className="text-sm opacity-90">#1D4ED8</div>
                <div className="text-xs mt-2">Primary Hover</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-blue-900 text-center border border-blue-100">
                <div className="text-lg font-bold mb-2">Blue 50</div>
                <div className="text-sm opacity-75">#EFF6FF</div>
                <div className="text-xs mt-2">Background Light</div>
              </div>
              <div className="bg-indigo-50 rounded-2xl p-6 text-indigo-900 text-center border border-indigo-100">
                <div className="text-lg font-bold mb-2">Indigo 50</div>
                <div className="text-sm opacity-75">#EEF2FF</div>
                <div className="text-xs mt-2">Background Alt</div>
              </div>
            </div>
          </div>

          {/* Couleurs secondaires */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs secondaires</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-orange-500 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Orange 500</div>
                <div className="text-sm opacity-90">#F97316</div>
                <div className="text-xs mt-2">Accent</div>
              </div>
              <div className="bg-green-500 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Green 500</div>
                <div className="text-sm opacity-90">#10B981</div>
                <div className="text-xs mt-2">Success</div>
              </div>
              <div className="bg-purple-500 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Purple 500</div>
                <div className="text-sm opacity-90">#8B5CF6</div>
                <div className="text-xs mt-2">Special</div>
              </div>
              <div className="bg-yellow-400 rounded-2xl p-6 text-yellow-900 text-center">
                <div className="text-lg font-bold mb-2">Yellow 400</div>
                <div className="text-sm opacity-75">#FBBF24</div>
                <div className="text-xs mt-2">Warning/Star</div>
              </div>
              <div className="bg-red-500 rounded-2xl p-6 text-white text-center">
                <div className="text-lg font-bold mb-2">Red 500</div>
                <div className="text-sm opacity-90">#EF4444</div>
                <div className="text-xs mt-2">Error</div>
              </div>
            </div>
          </div>

          {/* Couleurs grises */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Couleurs neutres</h3>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-white rounded-2xl p-4 text-gray-900 text-center border border-gray-200">
                <div className="font-bold mb-1">White</div>
                <div className="text-sm">#FFFFFF</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4 text-gray-900 text-center border border-gray-200">
                <div className="font-bold mb-1">Gray 50</div>
                <div className="text-sm">#F9FAFB</div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-4 text-gray-900 text-center">
                <div className="font-bold mb-1">Gray 100</div>
                <div className="text-sm">#F3F4F6</div>
              </div>
              <div className="bg-gray-600 rounded-2xl p-4 text-white text-center">
                <div className="font-bold mb-1">Gray 600</div>
                <div className="text-sm">#4B5563</div>
              </div>
              <div className="bg-gray-900 rounded-2xl p-4 text-white text-center">
                <div className="font-bold mb-1">Gray 900</div>
                <div className="text-sm">#111827</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHIE */}
        <section id="typography" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">2. Typographie</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Titres principaux</h3>
              <div className="space-y-6">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">Titre H1 - Hero</h1>
                  <code className="text-sm text-gray-600 mt-2 block">text-5xl lg:text-6xl font-bold text-gray-900</code>
                </div>
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Titre H2 - Section</h2>
                  <code className="text-sm text-gray-600 mt-2 block">text-4xl lg:text-5xl font-bold text-gray-900</code>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Titre H3 - Sous-section</h3>
                  <code className="text-sm text-gray-600 mt-2 block">text-2xl lg:text-3xl font-bold text-gray-900</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Textes de contenu</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Paragraphe large - Utilisé pour les descriptions principales des sections
                  </p>
                  <code className="text-sm text-gray-600 mt-2 block">text-xl text-gray-600 leading-relaxed</code>
                </div>
                <div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Paragraphe moyen - Pour le contenu des cards et descriptions secondaires
                  </p>
                  <code className="text-sm text-gray-600 mt-2 block">text-lg text-gray-700 leading-relaxed</code>
                </div>
                <div>
                  <p className="text-base text-gray-600">
                    Texte standard - Pour le contenu général et les détails
                  </p>
                  <code className="text-sm text-gray-600 mt-2 block">text-base text-gray-600</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BOUTONS */}
        <section id="buttons" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">3. Boutons</h2>
          
          {/* Boutons Landing Page */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boutons Landing Page</h3>
              <div className="space-y-4">
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                    Bouton Principal
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">bg-blue-600 hover:bg-blue-700 + hover:scale-105 + shadow-lg</code>
                </div>
                <div>
                  <Button variant="outline" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 hover:scale-105">
                    Bouton Secondaire
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">border-2 border-blue-600 hover:bg-blue-600 + hover:scale-105</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boutons avec icônes</h3>
              <div className="space-y-4">
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 group flex items-center gap-2">
                    Découvrir
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">group + group-hover:translate-x-1</code>
                </div>
                <div>
                  <Button variant="outline" className="gap-3 px-8 py-4 rounded-xl border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group">
                    Voir plus
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">border-blue-200 hover:bg-blue-50</code>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons Navbar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boutons Navbar (Auth)</h3>
              <div className="space-y-4">
                <div>
                  <Button 
                    variant="outline" 
                    className="px-6 py-3 h-12 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-all duration-200"
                  >
                    Connexion
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">h-12 + bg-transparent + border-gray-300</code>
                </div>
                <div>
                  <Button 
                    className="px-6 py-3 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    S'inscrire
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">h-12 + shadow-lg hover:shadow-xl (navbar style)</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boutons Premium (Background Sombres)</h3>
              <div className="space-y-4">
                {/* Fond sombre pour démonstration */}
                <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-800 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Bouton Principal Premium
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-3 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 px-6 py-3 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Bouton Secondaire Premium
                    </Button>
                  </div>
                </div>
                <code className="text-sm text-gray-600 mt-2 block">
                  Boutons optimisés pour backgrounds sombres : shadow-2xl + transform + backdrop-blur
                </code>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Boutons utilitaires</h3>
              <div className="space-y-4">
                <div>
                  <Button 
                    variant="outline"
                    className="gap-3 px-4 py-2 h-12 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      PB
                    </div>
                    <span>Menu utilisateur</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </Button>
                  <code className="text-sm text-gray-600 mt-2 block">Menu style avec avatar + dropdown</code>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="p-2 h-10 w-10 bg-gray-50 border-gray-200 hover:bg-gray-100 rounded-xl"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <span className="text-sm text-gray-600 flex items-center">Bouton mobile (carré 40x40px)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CARDS */}
        <section id="cards" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">4. Cards</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Card standard */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Card Standard</h3>
                <p className="text-gray-600 leading-relaxed">
                  Card avec hover effect de translation et shadow
                </p>
              </div>
            </div>

            {/* Card avec gradient */}
            <div className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Card Premium</h3>
                <p className="text-gray-600 leading-relaxed">
                  Card avec gradient et animation d'icône
                </p>
              </div>
            </div>

            {/* Card avec background coloré */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Card Active</span>
                </div>
                <h3 className="text-xl font-bold">Card Colorée</h3>
                <p className="text-blue-100 leading-relaxed">
                  Card avec background gradient et indicateur de status
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-4">Code CSS Cards :</h4>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`// Card Standard
.card-standard {
  @apply bg-white rounded-2xl p-8 border border-gray-100 shadow-sm 
         hover:shadow-xl hover:-translate-y-2 transition-all duration-300;
}

// Card avec groupe hover
.card-group {
  @apply group bg-white rounded-2xl p-8 border border-gray-100 shadow-lg 
         hover:shadow-2xl hover:-translate-y-2 transition-all duration-300;
}`}
            </pre>
          </div>
        </section>

        {/* 5. BADGES */}
        <section id="badges" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">5. Badges</h2>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Badges de sections</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Sparkles className="h-4 w-4" />
                  Sélection Premium
                </div>
                <code className="text-xs text-gray-600">bg-blue-100 text-blue-800</code>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <TrendingUp className="h-4 w-4" />
                  Les Plus Demandées
                </div>
                <code className="text-xs text-gray-600">bg-orange-100 text-orange-800</code>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <CheckCircle className="h-4 w-4" />
                  Avantages Exclusifs
                </div>
                <code className="text-xs text-gray-600">bg-green-100 text-green-800</code>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
                  <Zap className="h-4 w-4" />
                  Pour Tous les Profils
                </div>
                <code className="text-xs text-gray-600">bg-purple-100 text-purple-800</code>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Badges utilitaires</h3>
            <div className="flex flex-wrap gap-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                ✓ Vérifié
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                🏆 Populaire
              </span>
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                🔥 Nouveau
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                📈 Trending
              </span>
            </div>
          </div>
        </section>

        {/* 6. NAVIGATION & LIENS */}
        <section id="navigation" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">6. Navigation & Liens</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Liens de navigation</h3>
              <div className="space-y-4">
                <div>
                  <Link 
                    to="#" 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group inline-block"
                  >
                    Formations
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                  <code className="text-sm text-gray-600 mt-2 block">Avec underline animation</code>
                </div>
                
                <div>
                  <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Lien standard
                  </Link>
                  <code className="text-sm text-gray-600 mt-2 block">text-blue-600 hover:text-blue-700</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Search Bar</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Rechercher une formation..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                  />
                </div>
                <code className="text-sm text-gray-600 block">
                  bg-gray-50 focus:bg-white + ring-blue-500/20
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 7. GRADIENTS */}
        <section id="gradients" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">7. Gradients</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Background Light</h3>
                <code className="text-sm text-gray-600">bg-gradient-to-br from-blue-50 to-indigo-50</code>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Background Subtle</h3>
                <code className="text-sm text-gray-600">bg-gradient-to-br from-gray-50 to-white</code>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-bold mb-2">Background Dark</h3>
                <code className="text-sm text-blue-100">bg-gradient-to-br from-blue-600 to-blue-800</code>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <h3 className="text-lg font-bold mb-2">Accent Gradient</h3>
                <code className="text-sm text-orange-100">bg-gradient-to-br from-orange-500 to-orange-600</code>
              </div>
            </div>
          </div>
        </section>

        {/* 8. ICONOGRAPHIE */}
        <section id="icons" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">8. Iconographie</h2>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Icônes principales Lucide React</h3>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-3">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Plane</div>
                <div className="text-xs text-gray-600">Aviation</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Award</div>
                <div className="text-xs text-gray-600">Certifications</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-3">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">BookOpen</div>
                <div className="text-xs text-gray-600">Formations</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-3">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Target</div>
                <div className="text-xs text-gray-600">Objectifs</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-3">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Users</div>
                <div className="text-xs text-gray-600">Équipes</div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-3">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-medium">Shield</div>
                <div className="text-xs text-gray-600">Sécurité</div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SECTIONS TYPES */}
        <section id="sections" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">9. Sections types</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Structure standard des sections</h3>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`<section className="py-20 px-8 bg-gradient-to-br from-gray-50 to-white">
  <div className="max-w-[1600px] mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
        <Icon className="h-4 w-4" />
        Badge Section
      </div>
      
      <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
        Titre Principal Section
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Description de la section avec texte explicatif
      </p>
    </div>
    
    {/* Contenu */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cards ou contenu */}
    </div>
  </div>
</section>`}
              </pre>
            </div>

            {/* Exemple section complète */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Exemple de section complète (réutilisable)</h3>
              
              {/* Mini section démo */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4" />
                    Section Démo
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Titre de la Section
                  </h2>
                  
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Description de la section avec texte explicatif pour montrer la structure type.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl mb-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Élément 1</h3>
                    <p className="text-sm text-gray-600">Description courte</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl mb-4">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Élément 2</h3>
                    <p className="text-sm text-gray-600">Description courte</p>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl mb-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Élément 3</h3>
                    <p className="text-sm text-gray-600">Description courte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. SYSTÈME D'ESPACEMENT */}
        <section id="spacing" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">10. Système d'espacement</h2>
          
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Marges et espacements standard</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Conteneur principal :</h4>
                <code className="text-blue-600">max-w-[1600px] mx-auto px-8</code>
                <p className="text-sm text-gray-600 mt-1">Largeur max 1600px, centré, padding horizontal 2rem</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Navbar & Footer :</h4>
                <code className="text-blue-600">max-w-[1800px] mx-auto px-4</code>
                <p className="text-sm text-gray-600 mt-1">Largeur max 1800px pour effet premium, padding horizontal 1rem</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Sections verticales :</h4>
                <code className="text-blue-600">py-20</code>
                <p className="text-sm text-gray-600 mt-1">Padding vertical 5rem (80px) pour toutes les sections</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Header de section :</h4>
                <code className="text-blue-600">mb-16</code>
                <p className="text-sm text-gray-600 mt-1">Margin bottom 4rem (64px) entre header et contenu</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Espacement titres :</h4>
                <code className="text-blue-600">mb-6</code>
                <p className="text-sm text-gray-600 mt-1">Margin bottom 1.5rem (24px) après les titres H2</p>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Grille de cards :</h4>
                <code className="text-blue-600">gap-8</code>
                <p className="text-sm text-gray-600 mt-1">Gap 2rem (32px) entre les éléments de grille</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-2">Buttons padding :</h4>
                <div className="space-y-2">
                  <div><code className="text-blue-600">px-8 py-4</code> <span className="text-sm text-gray-600">- Boutons landing page (grands)</span></div>
                  <div><code className="text-blue-600">px-6 py-3</code> <span className="text-sm text-gray-600">- Boutons navbar</span></div>
                  <div><code className="text-blue-600">px-4 py-2</code> <span className="text-sm text-gray-600">- Boutons petits/badges</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. NOUVEAUX PATTERNS - Pages spécialisées */}
        <section id="new-patterns" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">11. Nouveaux Patterns (Pages Spécialisées)</h2>
          
          {/* Hero Sections Spécialisés */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Hero Sections Spécialisés</h3>
            
            {/* Hero Standard (Index) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Hero Standard (Page d'accueil)</h4>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-4">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      Excellence en Formation
                      <span className="block text-blue-600">Aéronautique</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                      Développez vos compétences aviation. Formations certifiantes.
                    </p>
                    <div className="flex gap-4">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                        Commencer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-2 border-gray-300">
                        Parcourir
                      </Button>
                    </div>
                  </div>
                  <div className="text-center text-6xl opacity-30">🎓</div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Hero Standard Pattern
<section className="bg-gradient-to-br from-blue-50 to-indigo-50">
  <div className="max-w-[1600px] mx-auto">
    <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[60vh] px-8 py-4">
      {/* Left Content */}
      <div className="space-y-6">
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
          Titre Principal
          <span className="block text-blue-600">Texte Accentué</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">Description</p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-4">Primary</Button>
          <Button variant="outline" className="border-2 border-gray-300">Secondary</Button>
        </div>
      </div>
      
      {/* Right Visual avec floating badges */}
    </div>
  </div>
</section>`}
              </pre>
            </div>

            {/* Hero Dark (ForLearners) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Hero Dark Business (ForLearners)</h4>
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-xl p-8 mb-4 text-white">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                    <GraduationCap className="h-4 w-4" />
                    Votre Parcours Étudiant
                  </div>
                  
                  <h1 className="text-3xl font-bold">
                    Développez vos
                    <span className="block text-blue-300">Compétences Aviation</span>
                  </h1>
                  
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Accédez à plus de 150 formations certifiantes avec certificats tokenisés blockchain.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-6 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">2,500+</div>
                      <div className="text-xs text-blue-200">Apprenants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">98%</div>
                      <div className="text-xs text-blue-200">Réussite</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">4.9/5</div>
                      <div className="text-xs text-blue-200">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Hero Dark Business Pattern
<section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
  <div className="relative max-w-[1600px] mx-auto px-8 py-20">
    <div className="text-white space-y-8">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm 
                      text-white px-4 py-2 rounded-full text-sm">
        <Icon className="h-4 w-4" />
        Badge contextuel
      </div>
      
      <h1 className="text-5xl lg:text-6xl font-bold">
        Titre Principal
        <span className="block text-blue-300">Texte Accentué</span>
      </h1>
      
      {/* Stats intégrées */}
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold">Chiffre</div>
          <div className="text-sm text-blue-200">Label</div>
        </div>
      </div>
    </div>
  </div>
</section>`}
              </pre>
            </div>

            {/* Hero Corporate (ForTrainingOrganizations) */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Hero Corporate Premium (ForTrainingOrganizations)</h4>
              <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 rounded-xl p-8 mb-4 text-white">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
                    <Building2 className="h-4 w-4" />
                    Partenariat B2B
                  </div>
                  
                  <h1 className="text-4xl font-bold">
                    Développez Votre
                    <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                      Business Formation
                    </span>
                  </h1>
                  
                  <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">400+</div>
                      <div className="text-xs text-blue-200">Apprenants</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">5j</div>
                      <div className="text-xs text-blue-200">Validation</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">0€</div>
                      <div className="text-xs text-blue-200">Frais Fixes</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
                      <div className="text-xl font-bold">24h</div>
                      <div className="text-xs text-blue-200">Support</div>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Hero Corporate Premium Pattern
<section className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800">
  <div className="relative max-w-[1400px] mx-auto px-8 py-24">
    <div className="text-center space-y-8">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
        Titre Principal
        <span className="block bg-gradient-to-r from-blue-300 to-purple-300 
                        bg-clip-text text-transparent">
          Texte Gradient
        </span>
      </h1>
      
      {/* Stats en cards avec backdrop-blur */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-white">Chiffre</div>
          <div className="text-sm text-blue-200">Label</div>
        </div>
      </div>
    </div>
  </div>
</section>`}
              </pre>
            </div>
          </div>

          {/* Process Timeline Patterns */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Process Timeline Patterns</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Timeline Horizontale (ForLearners)</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[1,2,3,4].map((step) => (
                    <div key={step} className="relative text-center">
                      {step < 4 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200"></div>
                      )}
                      <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-sm font-bold text-blue-600 mb-2">0{step}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Étape {step}</h3>
                        <p className="text-sm text-gray-600">Description de l'étape</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Timeline Horizontale Pattern
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  {steps.map((step, index) => (
    <div key={index} className="relative text-center">
      {/* Connecteur */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-200"></div>
      )}
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-sm font-bold text-blue-600 mb-2">{step.number}</div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
        <p className="text-sm text-gray-600">{step.description}</p>
      </div>
    </div>
  ))}
</div>`}
              </pre>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Timeline Alternée (ForTrainingOrganizations)</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="space-y-12">
                  {[1,2].map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={step} className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-blue-600">ÉTAPE 0{step}</div>
                              <h3 className="text-lg font-bold text-gray-900">Titre Étape</h3>
                            </div>
                          </div>
                          <p className="text-gray-600">Description détaillée de l'étape avec informations complémentaires.</p>
                        </div>
                        <div className="flex-1">
                          <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <span className="text-gray-400">Preview Visuel</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Timeline Alternée Pattern
<div className="space-y-16">
  {steps.map((step, index) => {
    const isEven = index % 2 === 0;
    return (
      <div className={\`flex items-center gap-12 \${isEven ? 'flex-row' : 'flex-row-reverse'}\`}>
        {/* Contenu */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-blue-600">ÉTAPE {step.number}</div>
              <h3 className="text-2xl font-bold">{step.title}</h3>
            </div>
          </div>
          <p className="text-lg text-gray-600">{step.description}</p>
        </div>
        
        {/* Visuel */}
        <div className="flex-1">
          <div className="aspect-video bg-white rounded-lg">Preview</div>
        </div>
      </div>
    );
  })}
</div>`}
              </pre>
            </div>
          </div>

          {/* Cards Advanced Patterns */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Cards Patterns Avancés</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cards avec Stats Intégrées (Témoignages)</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1,2,3].map((card) => (
                    <div key={card} className="bg-white rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            JD
                          </div>
                          <div>
                            <div className="font-semibold text-sm">John Doe</div>
                            <div className="text-xs text-gray-600">Directeur</div>
                          </div>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Secteur</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">250</div>
                          <div className="text-xs text-gray-600">Étudiants</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">+180%</div>
                          <div className="text-xs text-gray-600">Croissance</div>
                        </div>
                      </div>
                      
                      <blockquote className="text-sm text-gray-700 italic">
                        "Témoignage complet avec expérience détaillée..."
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Cards avec Stats Pattern
<div className="bg-white rounded-xl p-6">
  {/* Header avec avatar et badge */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                      rounded-full flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{position}</div>
      </div>
    </div>
    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Secteur</div>
  </div>
  
  {/* Stats grid */}
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="text-center p-3 bg-blue-50 rounded-lg">
      <div className="text-2xl font-bold text-blue-600">{stat1}</div>
      <div className="text-xs text-gray-600">{label1}</div>
    </div>
    <div className="text-center p-3 bg-green-50 rounded-lg">
      <div className="text-2xl font-bold text-green-600">{stat2}</div>
      <div className="text-xs text-gray-600">{label2}</div>
    </div>
  </div>
  
  {/* Content */}
  <blockquote className="text-gray-700 italic">"{quote}"</blockquote>
</div>`}
              </pre>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cards avec Preview (Fonctionnalités)</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1,2].map((card) => (
                    <div key={card} className="bg-white rounded-xl p-6 group hover:shadow-lg transition-all">
                      <div className="flex items-start gap-6">
                        <div className="bg-blue-100 group-hover:bg-blue-200 transition-colors p-3 rounded-xl">
                          <BarChart3 className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-gray-900">Dashboard Avancé</h3>
                          <p className="text-gray-600">Analytics complètes avec toutes les métriques importantes.</p>
                          <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            📊 Vue 360° de votre activité
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Cards avec Preview Pattern
<div className="bg-white rounded-xl p-8 group hover:shadow-xl transition-all">
  <div className="flex items-start gap-6">
    <div className="bg-blue-100 group-hover:bg-blue-200 transition-colors p-3 rounded-xl">
      <Icon className="h-8 w-8 text-blue-600" />
    </div>
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 
                      rounded-full text-sm font-medium">
        {preview}
      </div>
    </div>
  </div>
</div>`}
              </pre>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Éléments Flottants & Décoratifs</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Badges Flottants & Info Cards</h4>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-4 relative">
                {/* Exemple avec éléments flottants */}
                <div className="text-center relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Contenu Principal</h3>
                  <p className="text-gray-600 mb-6">Description avec éléments décoratifs</p>
                  
                  {/* Badges flottants simulés */}
                  <div className="absolute -top-4 -right-4 bg-green-500 rounded-xl p-3 shadow-xl">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="absolute -top-4 -left-4 bg-blue-500 rounded-xl p-3 shadow-xl">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  
                  {/* Info cards flottantes */}
                  <div className="absolute top-12 -left-16 bg-white rounded-xl p-3 shadow-xl border border-gray-100 text-left">
                    <p className="text-xs font-semibold text-gray-900">Formation certifiante</p>
                    <p className="text-xs text-gray-600">100% Conforme</p>
                  </div>
                  
                  <div className="absolute top-12 -right-16 bg-white rounded-xl p-3 shadow-xl border border-gray-100 text-left">
                    <p className="text-xs font-semibold text-gray-900">Expert Aviation</p>
                    <p className="text-xs text-gray-600">Spécialisé</p>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Floating Elements Pattern
<div className="relative">
  {/* Contenu principal */}
  <div className="text-center">
    <h3>Titre Principal</h3>
    <p>Description</p>
  </div>
  
  {/* Badges flottants */}
  <div className="absolute -top-6 -left-6 bg-green-500 rounded-xl p-4 shadow-xl">
    <Icon className="h-6 w-6 text-white" />
  </div>
  
  <div className="absolute -top-6 -right-6 bg-blue-500 rounded-xl p-4 shadow-xl">
    <Icon className="h-6 w-6 text-white" />
  </div>
  
  {/* Info cards flottantes */}
  <div className="absolute -top-16 left-8 bg-white rounded-xl p-4 shadow-xl border">
    <p className="text-sm font-semibold text-gray-900">{title}</p>
    <p className="text-xs text-gray-600">{subtitle}</p>
  </div>
  
  {/* Éléments décoratifs */}
  <div className="absolute top-20 right-32 w-4 h-4 bg-blue-400 rounded-full"></div>
  <div className="absolute bottom-32 right-16 text-2xl">✨</div>
</div>`}
              </pre>
            </div>
          </div>

          {/* Background Patterns */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Background Patterns Avancés</h3>
            
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Backgrounds avec Overlay</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
                    <div className="absolute inset-0 bg-black/10 rounded-xl"></div>
                    <div className="relative">
                      <h3 className="font-bold mb-2">Overlay Subtil</h3>
                      <p className="text-sm text-blue-100">bg-black/10</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800 rounded-xl p-6 text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 rounded-xl"></div>
                    <div className="relative">
                      <h3 className="font-bold mb-2">Gradient Overlay</h3>
                      <p className="text-sm text-blue-100">from-black/50 to-black/30</p>
                    </div>
                  </div>
                  
                  <div className="relative bg-blue-600 rounded-xl p-6 text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-8 w-16 h-16 rounded-full bg-blue-400 blur-xl"></div>
                      <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-purple-400 blur-xl"></div>
                    </div>
                    <div className="relative">
                      <h3 className="font-bold mb-2">Blur Decoratif</h3>
                      <p className="text-sm text-blue-100">blur-xl + opacity-10</p>
                    </div>
                  </div>
                </div>
                <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
{`// Background Patterns
// 1. Overlay subtil
<div className="relative bg-gradient-to-r from-blue-600 to-blue-800">
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="relative">{content}</div>
</div>

// 2. Gradient overlay
<div className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-blue-800">
  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
  <div className="relative">{content}</div>
</div>

// 3. Éléments décoratifs flous
<div className="relative bg-blue-600 overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-32 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
    <div className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-purple-400 blur-3xl"></div>
  </div>
  <div className="relative">{content}</div>
</div>`}
                </pre>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Backdrop Blur Cards</h4>
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center text-white">
                      <div className="text-2xl font-bold">400+</div>
                      <div className="text-sm text-blue-200">Apprenants</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center text-white">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-blue-200">Satisfaction</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center text-white">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-blue-200">Support</div>
                    </div>
                  </div>
                </div>
                <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto mt-4">
{`// Backdrop Blur Cards Pattern
<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
  <div className="text-2xl font-bold text-white">{stat}</div>
  <div className="text-sm text-blue-200">{label}</div>
</div>

// Classes clés :
// bg-white/10        - Background semi-transparent
// backdrop-blur-sm   - Effet de flou d'arrière-plan
// border-white/20    - Bordure semi-transparente`}
                </pre>
              </div>
            </div>
          </div>

          {/* Text Gradient Pattern */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Text Gradient Pattern</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="text-center space-y-6 mb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  Développez Votre
                  <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Business Formation
                  </span>
                </h1>
                
                <h2 className="text-3xl font-bold">
                  Formation
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    Aéronautique
                  </span>
                </h2>
                
                <h3 className="text-2xl font-bold">
                  Compétences
                  <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                    Aviation
                  </span>
                </h3>
              </div>
              
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Text Gradient Pattern
<h1 className="text-4xl font-bold text-gray-900">
  Titre Normal
  <span className="block bg-gradient-to-r from-blue-300 to-purple-300 
                  bg-clip-text text-transparent">
    Texte avec Gradient
  </span>
</h1>

// Gradients disponibles :
from-blue-300 to-purple-300    - Bleu vers violet (corporate)
from-orange-500 to-red-500     - Orange vers rouge (dynamique)  
from-green-500 to-teal-500     - Vert vers turquoise (nature)
from-purple-500 to-pink-500    - Violet vers rose (créatif)

// Classes essentielles :
bg-gradient-to-r   - Gradient horizontal
bg-clip-text       - Applique le gradient au texte
text-transparent   - Rend le texte transparent pour voir le gradient`}
              </pre>
            </div>
          </div>

        </section>

        {/* 12. PATTERNS ENTREPRISE SPÉCIALISÉS */}
        <section id="enterprise-patterns" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">12. Patterns Entreprise Spécialisés (ForCompanies)</h2>
          
          {/* Management Levels Pattern */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Niveaux de Management Alternés</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Pattern Responsabilités Alternées</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="space-y-8">
                  {[1,2].map((level, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={level} className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                              <Target className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">Manager Niveau {level}</h3>
                              <p className="text-sm text-gray-600">Description du rôle</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Responsabilité 1</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Responsabilité 2</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="aspect-video bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <span className="text-gray-400">Interface Preview</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Management Levels Pattern
<div className="space-y-8">
  {managementLevels.map((level, index) => {
    const isEven = index % 2 === 0;
    
    return (
      <div className={\`flex items-center gap-12 \${isEven ? 'flex-row' : 'flex-row-reverse'}\`}>
        {/* Contenu */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{level.title}</h3>
              <p className="text-gray-600">{level.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {level.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visuel */}
        <div className="flex-1">
          <div className="aspect-video bg-white rounded-lg border-2">
            {level.preview}
          </div>
        </div>
      </div>
    );
  })}
</div>`}
              </pre>
            </div>
          </div>

          {/* Company Types Pattern */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Types d'Entreprises avec Gradients</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cards Entreprises avec Features</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { title: "Compagnies Aériennes", gradient: "from-blue-500 to-blue-600", icon: "✈️" },
                    { title: "Gestionnaires Aéroports", gradient: "from-purple-500 to-purple-600", icon: "🏢" },
                    { title: "Prestataires", gradient: "from-green-500 to-green-600", icon: "👥" }
                  ].map((type, index) => (
                    <div key={index} className="relative overflow-hidden h-full group hover:shadow-xl transition-all duration-300 bg-white rounded-xl p-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                      <div className="relative">
                        <div className={`w-16 h-16 bg-gradient-to-br ${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{type.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                        <p className="text-gray-600 mb-4">Description du type d'entreprise avec besoins spécifiques</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Besoin spécifique 1</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Besoin spécifique 2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Company Types Pattern
<div className="grid lg:grid-cols-3 gap-8">
  {companyTypes.map((type, index) => {
    const IconComponent = type.icon;
    return (
      <div key={index} className="relative overflow-hidden h-full group hover:shadow-xl transition-all duration-300 bg-white rounded-xl">
        <div className={\`absolute inset-0 bg-gradient-to-br \${type.gradient} opacity-5 group-hover:opacity-10 transition-opacity\`}></div>
        <div className="relative p-8">
          <div className={\`w-16 h-16 bg-gradient-to-br \${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300\`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold">{type.title}</h3>
          <p className="text-gray-600 mb-4">{type.description}</p>
          {type.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>

// Gradients entreprise recommandés :
from-blue-500 to-blue-600      - Compagnies aériennes (confiance)
from-purple-500 to-purple-600  - Gestionnaires (premium)  
from-green-500 to-green-600    - Prestataires (croissance)
from-orange-500 to-orange-600  - Formation/Éducation (énergie)
from-teal-500 to-teal-600      - Technologie/Innovation`}
              </pre>
            </div>
          </div>

          {/* Business Advantages Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Avantages Business Grid</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Grid 3x2 avec Hover Effects</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Tableau de Bord", description: "Pilotez avec des stats temps réel", icon: BarChart3, color: "bg-blue-500" },
                    { title: "Gestion Équipes", description: "Gérez apprenants et progressions", icon: Users, color: "bg-green-500" },
                    { title: "Budget Avancé", description: "Contrôlez budgets et dépenses", icon: Target, color: "bg-purple-500" },
                    { title: "Alertes Conformité", description: "Anticipez échéances formation", icon: Shield, color: "bg-orange-500" },
                    { title: "Rapports Auto", description: "Générez rapports détaillés", icon: Award, color: "bg-teal-500" },
                    { title: "Sécurité", description: "Respectez réglementations", icon: BookOpen, color: "bg-red-500" }
                  ].map((advantage, index) => {
                    const IconComponent = advantage.icon;
                    return (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                        <div className={`inline-flex items-center justify-center w-16 h-16 ${advantage.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {advantage.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Business Advantages Grid Pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {businessAdvantages.map((advantage, index) => {
    const IconComponent = advantage.icon;
    return (
      <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
        <div className={\`inline-flex items-center justify-center w-16 h-16 \${advantage.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300\`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {advantage.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {advantage.description}
        </p>
      </div>
    );
  })}
</div>

// Structure optimale : 3 colonnes en LG, 2 en MD, 1 en mobile
// Couleurs cohérentes avec iconographie métier
// Hover effects pour engagement utilisateur`}
              </pre>
            </div>
          </div>

          {/* Testimonials avec Métriques */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Témoignages Entreprise avec Métriques</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cards Témoignages B2B</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { company: "Air France", manager: "Jean Dupont", employees: 850, savings: "-35%", sector: "Compagnie" },
                    { company: "ADP", manager: "Marie Martin", employees: 1200, savings: "-40%", sector: "Aéroport" },
                    { company: "Swissport", manager: "Paul Durand", employees: 650, savings: "-25%", sector: "Handling" }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.manager.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{testimonial.manager}</div>
                            <div className="text-sm text-gray-600">Directeur Formation</div>
                          </div>
                        </div>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{testimonial.sector}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{testimonial.employees}</div>
                          <div className="text-xs text-gray-600">Employés</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{testimonial.savings}</div>
                          <div className="text-xs text-gray-600">Économies</div>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{testimonial.company}</h4>
                      <blockquote className="text-gray-700 leading-relaxed italic text-sm">
                        "PYGMALION nous a permis de centraliser toute notre gestion formation..."
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Testimonials B2B Pattern
<div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
  {/* Header avec avatar et secteur */}
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                      rounded-full flex items-center justify-center text-white font-bold">
        {initials}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{manager}</div>
        <div className="text-sm text-gray-600">{position}</div>
      </div>
    </div>
    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{sector}</div>
  </div>
  
  {/* Métriques business */}
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div className="text-center p-3 bg-blue-50 rounded-lg">
      <div className="text-2xl font-bold text-blue-600">{employees}</div>
      <div className="text-xs text-gray-600">Employés</div>
    </div>
    <div className="text-center p-3 bg-green-50 rounded-lg">
      <div className="text-2xl font-bold text-green-600">{savings}</div>
      <div className="text-xs text-gray-600">Économies</div>
    </div>
  </div>
  
  {/* Contenu */}
  <h4 className="text-lg font-bold text-gray-900 mb-2">{company}</h4>
  <blockquote className="text-gray-700 leading-relaxed italic">
    "{quote}"
  </blockquote>
</div>`}
              </pre>
            </div>
          </div>

          {/* CTA Section Enterprise */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">CTA Section Entreprise</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">CTA avec Garanties Business</h4>
              <div className="bg-blue-600 rounded-xl p-8 text-center text-white mb-4">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Optimisez votre Gestion Formation
                    </h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                      Rejoignez les entreprises leaders qui ont choisi PYGMALION pour piloter leurs équipes.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-xl"
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      Créer mon compte entreprise
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-bold"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Demander une démo
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white font-semibold">Conformité Garantie</div>
                      <div className="text-blue-100 text-sm">Respect réglementations IATA</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white font-semibold">ROI Mesurable</div>
                      <div className="text-blue-100 text-sm">Jusqu'à -35% coûts formation</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white font-semibold">Support Dédié</div>
                      <div className="text-blue-100 text-sm">Accompagnement équipes</div>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// CTA Enterprise Pattern
<section className="py-24 px-8 bg-blue-600">
  <div className="max-w-[1200px] mx-auto text-center">
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Titre CTA Entreprise
        </h2>
        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
          Message de valeur pour décideurs
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 text-lg font-bold shadow-2xl">
          <Icon className="mr-2 h-5 w-5" />
          Action Principale
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button variant="outline" className="border-3 border-white text-white bg-white/15 backdrop-blur-sm hover:bg-white hover:text-blue-600 px-10 py-5 text-lg font-bold">
          <Icon className="mr-2 h-5 w-5" />
          Action Secondaire
        </Button>
      </div>

      {/* Garanties Business */}
      <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full">
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div className="text-white font-semibold">Garantie</div>
          <div className="text-blue-100 text-sm">Description</div>
        </div>
      </div>
    </div>
  </div>
</section>`}
              </pre>
            </div>
          </div>

        </section>

        {/* 13. PATTERNS AÉROPORTS SPÉCIALISÉS */}
        <section id="airport-patterns" className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">13. Patterns Aéroports Spécialisés (ForAirports)</h2>
          
          {/* Hero Supervision */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Hero Supervision Aéroportuaire</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Hero Dark avec Gradient Text Bicolore</h4>
              <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 rounded-xl p-8 mb-4 text-white">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                    <Radar className="h-4 w-4" />
                    Supervision Aéroportuaire
                  </div>
                  
                  <h1 className="text-4xl font-bold">
                    Supervisez la Conformité
                    <span className="block bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
                      de votre Aéroport
                    </span>
                  </h1>
                  
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    Monitoring temps réel de tous vos prestataires. Conformité sûreté garantie.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-lg font-bold">47</div>
                      <div className="text-xs text-blue-200">Prestataires</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">97.8%</div>
                      <div className="text-xs text-blue-200">Conformité</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">24/7</div>
                      <div className="text-xs text-blue-200">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Hero Supervision Pattern
<section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800">
  <div className="relative max-w-[1400px] mx-auto px-8 py-24">
    <div className="text-white space-y-8">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        <Icon className="h-4 w-4" />
        Badge supervision
      </div>
      
      <h1 className="text-5xl lg:text-6xl font-bold">
        Titre Principal
        <span className="block bg-gradient-to-r from-blue-300 to-green-300 
                        bg-clip-text text-transparent">
          Texte Gradient Bicolore
        </span>
      </h1>
      
      {/* Métriques supervisions intégrées */}
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">Chiffre</div>
          <div className="text-sm text-blue-200">Label</div>
        </div>
      </div>
    </div>
  </div>
</section>

// Gradient bicolore spécial supervision :
from-blue-300 to-green-300   - Supervision/Monitoring (technologique + conformité)
from-slate-900 via-blue-900 to-slate-800 - Background premium surveillance`}
              </pre>
            </div>
          </div>

          {/* Défis Multi-challenges */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Section Défis avec Background Alert</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Grid 6 Défis avec Gradient Alert</h4>
              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Multiples Prestataires", icon: Users, color: "bg-orange-500" },
                    { title: "Sûreté & Sécurité", icon: Shield, color: "bg-red-500" },
                    { title: "Surveillance Continue", icon: Clock, color: "bg-blue-500" },
                    { title: "Reporting Complexe", icon: FileText, color: "bg-purple-500" },
                    { title: "Gestion des Risques", icon: AlertTriangle, color: "bg-yellow-500" },
                    { title: "Coordination", icon: Settings, color: "bg-green-500" }
                  ].map((challenge, index) => {
                    const IconComponent = challenge.icon;
                    return (
                      <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group">
                        <div className={`inline-flex items-center justify-center w-12 h-12 ${challenge.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Description du défi spécifique aux aéroports
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Section Défis Aéroports Pattern
<section className="py-24 px-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
      Défis de la Supervision Aéroportuaire
    </h2>
    <p className="text-xl text-gray-600">
      Message expliquant la complexité spécifique aux aéroports
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {challenges.map((challenge, index) => (
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
        <div className={\`inline-flex items-center justify-center w-16 h-16 \${challenge.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300\`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{challenge.title}</h3>
        <p className="text-gray-600">{challenge.description}</p>
      </div>
    ))}
  </div>
</section>

// Background Alert spécial aéroports :
from-red-50 via-orange-50 to-yellow-50 - Gradient d'alerte progressive`}
              </pre>
            </div>
          </div>

          {/* Prestataires Supervisés */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Cards Prestataires avec Métriques</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Grid 3x2 Prestataires avec Stats</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Compagnies Aériennes", icon: Plane, compliance: "98%", employees: "2,500+", color: "from-blue-500 to-blue-600" },
                    { title: "Services de Handling", icon: Users, compliance: "95%", employees: "1,800+", color: "from-green-500 to-green-600" },
                    { title: "Sécurité & Sûreté", icon: Shield, compliance: "99%", employees: "650+", color: "from-red-500 to-red-600" }
                  ].map((contractor, index) => {
                    const IconComponent = contractor.icon;
                    return (
                      <div key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white rounded-xl p-6">
                        <div className={`absolute inset-0 bg-gradient-to-br ${contractor.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                        <div className="relative">
                          <div className={`w-12 h-12 bg-gradient-to-br ${contractor.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-lg font-bold mb-2">{contractor.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">Description des services</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 bg-green-50 rounded">
                              <div className="text-lg font-bold text-green-600">{contractor.compliance}</div>
                              <div className="text-xs text-gray-600">Conformité</div>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded">
                              <div className="text-lg font-bold text-blue-600">{contractor.employees}</div>
                              <div className="text-xs text-gray-600">Employés</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Prestataires Supervisés Pattern
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {contractorTypes.map((contractor, index) => {
    const IconComponent = contractor.icon;
    return (
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
        <div className={\`absolute inset-0 bg-gradient-to-br \${contractor.color} opacity-5 group-hover:opacity-10 transition-opacity\`}></div>
        <CardHeader className="relative">
          <div className={\`w-16 h-16 bg-gradient-to-br \${contractor.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300\`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <CardTitle>{contractor.title}</CardTitle>
          <p className="text-gray-600">{contractor.description}</p>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{contractor.compliance}</div>
              <div className="text-xs text-gray-600">Conformité</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{contractor.employees}</div>
              <div className="text-xs text-gray-600">Employés</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>

// Métriques supervision spécialisées :
- Conformité : Affichage pourcentage avec code couleur
- Employés : Nombre total supervisés par prestataire  
- Design : Background gradient subtil + hover opacity`}
              </pre>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Preview Supervision</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Mockup Dashboard Aéroport</h4>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 mb-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  {/* Header Dashboard */}
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Aéroport Charles de Gaulle</h3>
                        <p className="text-gray-600 text-sm">Vue d'ensemble conformité - {new Date().toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <Activity className="h-3 w-3" />
                        Site Conforme 97.8%
                      </div>
                    </div>
                  </div>

                  {/* Métriques Dashboard */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { title: "Vue d'Ensemble", metric: "96.5%", trend: "+2.1%", color: "bg-blue-500" },
                      { title: "Prestataires", metric: "47", trend: "+3", color: "bg-green-500" },
                      { title: "Employés", metric: "8,400+", trend: "+12%", color: "bg-purple-500" },
                      { title: "Alertes", metric: "2", trend: "-5", color: "bg-orange-500" }
                    ].map((feature, index) => (
                      <div key={index} className={`${feature.color} rounded-lg p-4 text-white`}>
                        <div className="text-2xl font-bold mb-1">{feature.metric}</div>
                        <div className="text-xs opacity-90 mb-1">{feature.title}</div>
                        <div className="text-xs opacity-75 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {feature.trend}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Dashboard */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Alertes de Conformité</h4>
                      <div className="space-y-2">
                        {[
                          { label: "Formations à échéance", value: "23", status: "warning" },
                          { label: "Prestataires conformes", value: "45/47", status: "success" }
                        ].map((metric, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                            <span>{metric.label}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{metric.value}</span>
                              <div className={`w-2 h-2 rounded-full ${metric.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Actions Rapides</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 bg-blue-50 text-blue-700 rounded text-sm flex items-center gap-2">
                          <Download className="h-3 w-3" />
                          Exporter rapport conformité
                        </button>
                        <button className="w-full text-left p-2 bg-green-50 text-green-700 rounded text-sm flex items-center gap-2">
                          <Search className="h-3 w-3" />
                          Rechercher un prestataire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Dashboard Preview Pattern
<div className="bg-white rounded-2xl shadow-2xl p-8">
  {/* Header avec badge de statut */}
  <div className="border-b border-gray-200 pb-6 mb-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Nom Aéroport</h3>
        <p className="text-gray-600">Vue d'ensemble conformité - Date</p>
      </div>
      <Badge className="bg-green-100 text-green-800">
        <Activity className="h-4 w-4 mr-2" />
        Site Conforme X%
      </Badge>
    </div>
  </div>

  {/* Métriques en cards colorées */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {dashboardFeatures.map((feature, index) => (
      <div className={\`\${feature.color} rounded-xl p-6 text-white\`}>
        <div className="text-3xl font-bold mb-2">{feature.metric}</div>
        <div className="text-sm opacity-90 mb-2">{feature.title}</div>
        <div className="text-xs opacity-75 flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          {feature.trend} ce mois
        </div>
      </div>
    ))}
  </div>

  {/* Actions et alertes en grid 2 colonnes */}
  <div className="grid lg:grid-cols-2 gap-8">
    <div>
      <h4>Alertes de Conformité</h4>
      {/* Liste avec statuts visuels */}
    </div>
    <div>
      <h4>Actions Rapides</h4>
      {/* Boutons d'actions avec icônes */}
    </div>
  </div>
</div>`}
              </pre>
            </div>
          </div>

          {/* Témoignages Aéroports */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Témoignages Aéroports avec Localisation</h3>
            
            <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Cards avec Badge Localisation</h4>
              <div className="bg-gray-50 rounded-xl p-8 mb-4">
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    { airport: "Aéroport Charles de Gaulle", manager: "Christine Dubois", contractors: 52, compliance: "97.8%", location: "Roissy-CDG", avatar: "CD" },
                    { airport: "Aéroport de Lyon", manager: "Michel Lefebvre", contractors: 28, compliance: "98.2%", location: "Lyon-Saint Exupéry", avatar: "ML" },
                    { airport: "Aéroport de Toulouse", manager: "Sarah Martin", contractors: 19, compliance: "96.5%", location: "Toulouse-Blagnac", avatar: "SM" }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{testimonial.manager}</div>
                            <div className="text-xs text-gray-600">Directrice Sûreté</div>
                          </div>
                        </div>
                        <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">{testimonial.contractors}</div>
                          <div className="text-xs text-gray-600">Prestataires</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">{testimonial.compliance}</div>
                          <div className="text-xs text-gray-600">Conformité</div>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-gray-900 mb-2 text-sm">{testimonial.airport}</h4>
                      <blockquote className="text-gray-700 text-xs italic">
                        "Témoignage sur l'efficacité de la supervision..."
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
              <pre className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto">
{`// Témoignages Aéroports Pattern
<div className="grid lg:grid-cols-3 gap-8">
  {testimonials.map((testimonial, index) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 
                            rounded-full flex items-center justify-center text-white font-bold">
              {testimonial.avatar}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{testimonial.manager}</div>
              <div className="text-sm text-gray-600">{testimonial.position}</div>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {testimonial.location}
          </Badge>
        </div>
        
        {/* Métriques aéroport spécifiques */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{testimonial.contractors}</div>
            <div className="text-xs text-gray-600">Prestataires</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{testimonial.compliance}</div>
            <div className="text-xs text-gray-600">Conformité</div>
          </div>
        </div>
        
        <CardTitle>{testimonial.airport}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <blockquote className="text-gray-700 italic">"{testimonial.quote}"</blockquote>
      </CardContent>
    </Card>
  ))}
</div>

// Spécificités aéroports :
- Badge localisation avec icône MapPin
- Métriques : Prestataires supervisés + % Conformité
- Avatar avec initiales du responsable
- Focus sur la supervision multi-entreprises`}
              </pre>
            </div>
          </div>

        </section>

        {/* Footer de la page */}
        <div className="text-center py-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            PYGMALION Design System
          </h2>
          <p className="text-gray-600 mb-8">
            Version 2.0 - Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Retour à l'accueil
          </Link>
        </div>

      </div>
    </Layout>
  );
};

export default StyleDesign; 