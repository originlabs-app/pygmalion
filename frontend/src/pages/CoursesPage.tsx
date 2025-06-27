import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CourseGrid from '@/components/courses/CourseGrid';
import SearchBar from '@/components/courses/SearchBar';
import { useCourses } from '@/contexts/CourseContext';
import { AVIATION_CATEGORIES } from '@/constants/aviationCategories';
import useAdvancedSearch from '@/hooks/useAdvancedSearch';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  BookOpen, 
  ChevronRight, 
  LayoutGrid, 
  List,
  SlidersHorizontal,
  MapPin,
  Clock,
  Euro,
  Award,
  Users,
  TrendingUp
} from 'lucide-react';

const CoursesPage = () => {
  const { courses } = useCourses();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getFilteredAndSortedCourses, getSearchStats } = useAdvancedSearch(courses);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [certification, setCertification] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Update filtered courses when search parameters change
  useEffect(() => {
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedType && selectedType !== 'all') params.set('type', selectedType);
    setSearchParams(params);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, selectedType]);
  
  const filteredCourses = getFilteredAndSortedCourses({
    searchTerm,
    category: selectedCategory,
    type: selectedType,
    location: selectedLocation,
    priceRange,
    certification,
    sortBy
  });

  const searchStats = getSearchStats(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will update the URL and filtered courses
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLocation('all');
    setPriceRange('all');
    setCertification('all');
  };

  const activeFiltersCount = [selectedCategory, selectedType, selectedLocation, priceRange, certification].filter(value => value !== 'all').length;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Accueil</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Catalogue de formations</span>
            </div>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Catalogue Formations
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Formations Aéronautiques Certifiées
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre catalogue de formations spécialisées aviation, dispensées par des organismes 
              certifiés Qualiopi et reconnues par les professionnels du secteur.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={handleSearch}
              placeholder="Rechercher une formation, un métier, une certification..."
            />
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              
              {/* Main Filters */}
              <div className="flex flex-wrap gap-3 flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-auto min-w-[180px] bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <SelectValue placeholder="Toutes catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes catégories</SelectItem>
                    {AVIATION_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-auto min-w-[160px] bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <SelectValue placeholder="Modalité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes modalités</SelectItem>
                    <SelectItem value="online">E-Learning</SelectItem>
                    <SelectItem value="in-person">Présentiel</SelectItem>
                    <SelectItem value="virtual">Classe Virtuelle</SelectItem>
                    <SelectItem value="hybrid">Semi-présentiel</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-auto min-w-[140px] bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <SelectValue placeholder="Lieu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous lieux</SelectItem>
                    <SelectItem value="paris">Paris</SelectItem>
                    <SelectItem value="lyon">Lyon</SelectItem>
                    <SelectItem value="marseille">Marseille</SelectItem>
                    <SelectItem value="toulouse">Toulouse</SelectItem>
                    <SelectItem value="online">En ligne</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 bg-gray-50 border-gray-200 hover:bg-gray-100"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres avancés
                  {activeFiltersCount > 0 && (
                    <Badge className="bg-blue-600 text-white ml-1 px-2 py-0">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>

              {/* Right Side Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 w-8 p-0"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-auto min-w-[140px] bg-gray-50 border-gray-200">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Pertinence</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                    <SelectItem value="popular">Populaires</SelectItem>
                    <SelectItem value="recent">Plus récents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Gamme de prix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous prix</SelectItem>
                      <SelectItem value="0-500">Moins de 500€</SelectItem>
                      <SelectItem value="500-1000">500€ - 1000€</SelectItem>
                      <SelectItem value="1000-2000">1000€ - 2000€</SelectItem>
                      <SelectItem value="2000+">Plus de 2000€</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={certification} onValueChange={setCertification}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Certification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes certifications</SelectItem>
                      <SelectItem value="qualiopi">Qualiopi</SelectItem>
                      <SelectItem value="iata">IATA</SelectItem>
                      <SelectItem value="dgac">DGAC</SelectItem>
                      <SelectItem value="easa">EASA</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex gap-2">
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Effacer les filtres
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="ml-2">×</button>
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {selectedType}
                  <button onClick={() => setSelectedType('all')} className="ml-2">×</button>
                </Badge>
              )}
              {selectedLocation !== 'all' && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('all')} className="ml-2">×</button>
                </Badge>
              )}
              {priceRange !== 'all' && (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {priceRange}
                  <button onClick={() => setPriceRange('all')} className="ml-2">×</button>
                </Badge>
              )}
              {certification !== 'all' && (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  {certification}
                  <button onClick={() => setCertification('all')} className="ml-2">×</button>
                </Badge>
              )}
            </div>
          )}

          {/* Results Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {filteredCourses.length} formation{filteredCourses.length !== 1 ? 's' : ''} trouvée{filteredCourses.length !== 1 ? 's' : ''}
              </h2>
              {searchTerm && (
                <div className="space-y-1">
                  <p className="text-gray-600">
                    pour "<span className="font-medium">{searchTerm}</span>"
                  </p>
                  {searchStats && (
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      {searchStats.averagePrice > 0 && (
                        <span className="flex items-center gap-1">
                          <Euro className="h-3 w-3" />
                          Prix moyen : {Math.round(searchStats.averagePrice)}€
                        </span>
                      )}
                      {searchStats.topCategory && (
                        <span className="flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          Principalement : {searchStats.topCategory}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>98% de satisfaction</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>2,500+ apprenants formés</span>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <CourseGrid courses={filteredCourses} viewMode={viewMode} searchTerm={searchTerm} />

          {/* Pagination placeholder */}
          {filteredCourses.length > 12 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline">Précédent</Button>
                <div className="flex gap-1">
                  <Button size="sm" className="w-10">1</Button>
                  <Button size="sm" variant="outline" className="w-10">2</Button>
                  <Button size="sm" variant="outline" className="w-10">3</Button>
                </div>
                <Button variant="outline">Suivant</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default CoursesPage;
