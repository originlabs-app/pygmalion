import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, Award, Building, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'formation' | 'métier' | 'certification' | 'organisme' | 'category';
  category?: string;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Rechercher une formation, un métier, une certification..." 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Suggestions prédéfinies basées sur l'aviation
  const predefinedSuggestions: SearchSuggestion[] = [
    // Formations populaires
    { id: '1', text: 'Sûreté aéroportuaire', type: 'formation', category: 'Sécurité' },
    { id: '2', text: 'Manipulation matières dangereuses', type: 'formation', category: 'Cargo' },
    { id: '3', text: 'Formation pilote', type: 'formation', category: 'Pilotage' },
    { id: '4', text: 'Contrôle aérien', type: 'formation', category: 'ATC' },
    { id: '5', text: 'Maintenance aéronefs', type: 'formation', category: 'Maintenance' },
    
    // Métiers
    { id: '6', text: 'Pilote de ligne', type: 'métier' },
    { id: '7', text: 'Contrôleur aérien', type: 'métier' },
    { id: '8', text: 'Mécanicien avion', type: 'métier' },
    { id: '9', text: 'Agent de piste', type: 'métier' },
    { id: '10', text: 'Hôtesse de l\'air', type: 'métier' },
    { id: '11', text: 'Technicien aéronautique', type: 'métier' },
    
    // Certifications
    { id: '12', text: 'ATPL', type: 'certification' },
    { id: '13', text: 'Part 66', type: 'certification' },
    { id: '14', text: 'IATA DGR', type: 'certification' },
    { id: '15', text: 'Certificat médical', type: 'certification' },
    { id: '16', text: 'Qualification IR', type: 'certification' },
    { id: '17', text: 'EASA', type: 'certification' },
    
    // Organismes
    { id: '18', text: 'Air France Training', type: 'organisme' },
    { id: '19', text: 'ENAC', type: 'organisme' },
    { id: '20', text: 'CAE', type: 'organisme' },
    { id: '21', text: 'Thales Training', type: 'organisme' },
  ];

  // Charger les recherches récentes depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filtrer les suggestions en fonction de la saisie
  useEffect(() => {
    if (value.length >= 2) {
      const filtered = predefinedSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8)); // Limiter à 8 suggestions
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else if (value.length === 0 && recentSearches.length > 0) {
      // Afficher les recherches récentes quand le champ est vide
      const recentSuggestions = recentSearches.slice(0, 5).map((search, index) => ({
        id: `recent-${index}`,
        text: search,
        type: 'formation' as const
      }));
      setSuggestions(recentSuggestions);
      setShowSuggestions(false); // Ne pas afficher automatiquement
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, recentSearches]);

  // Gérer la navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : -1
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectSuggestion(suggestions[highlightedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    addToRecentSearches(suggestion.text);
  };

  const addToRecentSearches = (searchTerm: string) => {
    const newRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 10);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (value.trim()) {
      addToRecentSearches(value.trim());
    }
    onSubmit(e);
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'métier':
        return <Building className="h-4 w-4 text-blue-500" />;
      case 'certification':
        return <Award className="h-4 w-4 text-green-500" />;
      case 'organisme':
        return <Building className="h-4 w-4 text-purple-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'métier':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'certification':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'organisme':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            ref={inputRef}
            type="search"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (value.length >= 2 || recentSearches.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Délai pour permettre le clic sur les suggestions
              setTimeout(() => setShowSuggestions(false), 200);
            }}
            className="w-full pl-12 pr-12 py-4 bg-white border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-lg text-lg"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-96 overflow-y-auto"
        >
          {value.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recherches récentes
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  Effacer
                </button>
              </div>
            </div>
          )}

          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => selectSuggestion(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  index === highlightedIndex ? 'bg-blue-50' : ''
                }`}
              >
                {getTypeIcon(suggestion.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">
                      {value ? (
                        <>
                          {suggestion.text.split(new RegExp(`(${value})`, 'gi')).map((part, i) =>
                            part.toLowerCase() === value.toLowerCase() ? (
                              <span key={i} className="bg-yellow-200 font-medium">{part}</span>
                            ) : (
                              part
                            )
                          )}
                        </>
                      ) : (
                        suggestion.text
                      )}
                    </span>
                    <Badge variant="outline" className={`text-xs ${getTypeColor(suggestion.type)}`}>
                      {suggestion.type}
                    </Badge>
                  </div>
                  {suggestion.category && (
                    <div className="text-xs text-gray-500 mt-1">
                      Catégorie : {suggestion.category}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {value.length >= 2 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                Appuyez sur <kbd className="px-2 py-1 bg-white rounded border text-xs">Entrée</kbd> pour rechercher "{value}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 