import { useState, useMemo } from 'react';
import { Course } from '@/types';

interface SearchOptions {
  searchTerm: string;
  category?: string;
  type?: string;
  location?: string;
  priceRange?: string;
  certification?: string;
  sortBy?: string;
}

const useAdvancedSearch = (courses: Course[]) => {
  // Fonction de recherche fuzzy simple
  const fuzzyMatch = (text: string, searchTerm: string): number => {
    if (!searchTerm) return 1;
    
    const term = searchTerm.toLowerCase();
    const target = text.toLowerCase();
    
    // Correspondance exacte
    if (target.includes(term)) {
      const index = target.indexOf(term);
      const isWordStart = index === 0 || target[index - 1] === ' ';
      return isWordStart ? 1 : 0.8;
    }
    
    // Correspondance par mots-clés
    const termWords = term.split(' ');
    const targetWords = target.split(' ');
    let matchCount = 0;
    
    termWords.forEach(termWord => {
      if (targetWords.some(targetWord => targetWord.includes(termWord))) {
        matchCount++;
      }
    });
    
    const wordMatchRatio = matchCount / termWords.length;
    return wordMatchRatio > 0.5 ? wordMatchRatio * 0.6 : 0;
  };

  // Fonction de calcul du score de pertinence
  const calculateRelevanceScore = (course: Course, searchTerm: string): number => {
    if (!searchTerm) return 1;
    
    const scores = {
      title: fuzzyMatch(course.title, searchTerm) * 3, // Poids le plus élevé pour le titre
      description: fuzzyMatch(course.description, searchTerm) * 2,
      category: fuzzyMatch(course.category, searchTerm) * 2.5,
      provider: fuzzyMatch(course.provider, searchTerm) * 1.5,
      tags: course.qualiopiIndicators ? 
        Math.max(...course.qualiopiIndicators.map(tag => fuzzyMatch(tag, searchTerm))) * 1.8 : 0
    };
    
    // Bonification pour les métiers et certifications spécifiques
    const aviationKeywords = {
      métiers: ['pilote', 'contrôleur', 'mécanicien', 'agent de piste', 'hôtesse', 'steward', 'technicien'],
      certifications: ['atpl', 'part 66', 'iata', 'dgr', 'easa', 'dgac', 'qualification']
    };
    
    let bonus = 0;
    const searchLower = searchTerm.toLowerCase();
    
    if (aviationKeywords.métiers.some(metier => searchLower.includes(metier))) {
      bonus += fuzzyMatch(course.title + ' ' + course.description, searchTerm) * 0.5;
    }
    
    if (aviationKeywords.certifications.some(cert => searchLower.includes(cert))) {
      bonus += course.qualiopiIndicators ? 
        course.qualiopiIndicators.filter(indicator => 
          indicator.toLowerCase().includes(searchLower)
        ).length * 0.3 : 0;
    }
    
    return Math.max(...Object.values(scores)) + bonus;
  };

  // Fonction de filtrage avancé
  const getFilteredAndSortedCourses = (options: SearchOptions): Course[] => {
    const {
      searchTerm,
      category,
      type,
      location,
      priceRange,
      certification,
      sortBy = 'relevance'
    } = options;
    
    let filtered = courses.filter(course => {
      // Filtre par recherche textuelle avec score de pertinence
      if (searchTerm) {
        const relevanceScore = calculateRelevanceScore(course, searchTerm);
        if (relevanceScore < 0.1) return false;
        (course as any).relevanceScore = relevanceScore; // Stocker le score pour le tri
      }
      
      // Filtre par catégorie
      if (category && category !== 'all' && course.category !== category) {
        return false;
      }
      
      // Filtre par type/modalité
      if (type && type !== 'all' && course.type !== type) {
        return false;
      }
      
      // Filtre par gamme de prix
      if (priceRange && priceRange !== 'all') {
        const price = course.sessions[0]?.price || 0;
        switch (priceRange) {
          case '0-500':
            if (price >= 500) return false;
            break;
          case '500-1000':
            if (price < 500 || price >= 1000) return false;
            break;
          case '1000-2000':
            if (price < 1000 || price >= 2000) return false;
            break;
          case '2000+':
            if (price < 2000) return false;
            break;
        }
      }
      
      // Filtre par certification
      if (certification && certification !== 'all') {
        const hasCertification = course.qualiopiIndicators?.some(indicator =>
          indicator.toLowerCase().includes(certification.toLowerCase())
        );
        if (!hasCertification) return false;
      }
      
      return true;
    });
    
    // Tri des résultats
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          if (searchTerm) {
            return ((b as any).relevanceScore || 0) - ((a as any).relevanceScore || 0);
          }
          return 0;
          
        case 'price-asc':
          const priceA = a.sessions[0]?.price || 0;
          const priceB = b.sessions[0]?.price || 0;
          return priceA - priceB;
          
        case 'price-desc':
          const priceDescA = a.sessions[0]?.price || 0;
          const priceDescB = b.sessions[0]?.price || 0;
          return priceDescB - priceDescA;
          
        case 'rating':
          // Mock rating pour demo - en production, utiliser la vraie note
          const ratingA = 4.5 + Math.random() * 0.5;
          const ratingB = 4.5 + Math.random() * 0.5;
          return ratingB - ratingA;
          
        case 'popular':
          // Mock popularité - en production, utiliser le nombre d'inscrits
          const popularityA = Math.random();
          const popularityB = Math.random();
          return popularityB - popularityA;
          
        case 'recent':
          // Tri par ordre alphabétique pour simuler - en production, utiliser la date de création
          return b.title.localeCompare(a.title);
          
        default:
          return 0;
      }
    });
    
    return filtered;
  };

  // Suggestions basées sur la saisie actuelle
  const getSearchSuggestions = (searchTerm: string): string[] => {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    const suggestions = new Set<string>();
    
    courses.forEach(course => {
      // Suggestions depuis les titres
      if (course.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(course.title);
      }
      
      // Suggestions depuis les catégories
      if (course.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(course.category);
      }
      
      // Suggestions depuis les providers
      if (course.provider.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.add(course.provider);
      }
      
      // Suggestions depuis les certifications
      course.qualiopiIndicators?.forEach(indicator => {
        if (indicator.toLowerCase().includes(searchTerm.toLowerCase())) {
          suggestions.add(indicator);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  };

  // Statistiques de recherche
  const getSearchStats = (searchTerm: string) => {
    if (!searchTerm) return null;
    
    const matchingCourses = courses.filter(course => 
      calculateRelevanceScore(course, searchTerm) > 0.1
    );
    
    const avgPrice = matchingCourses.reduce((sum, course) => 
      sum + (course.sessions[0]?.price || 0), 0
    ) / matchingCourses.length;
    
    const categoriesDistribution = matchingCourses.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalResults: matchingCourses.length,
      averagePrice: avgPrice,
      categories: categoriesDistribution,
      topCategory: Object.entries(categoriesDistribution)
        .sort(([,a], [,b]) => b - a)[0]?.[0]
    };
  };

  return {
    getFilteredAndSortedCourses,
    getSearchSuggestions,
    getSearchStats,
    calculateRelevanceScore
  };
};

export default useAdvancedSearch; 