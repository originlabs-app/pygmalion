import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
  setCurrentPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  getPageNumbers: () => number[];
}

/**
 * Hook personnalisé pour gérer la pagination
 * @param totalItems - Nombre total d'éléments
 * @param itemsPerPage - Nombre d'éléments par page (défaut: 9)
 * @param initialPage - Page initiale (défaut: 1)
 * @returns Objet avec les méthodes et propriétés de pagination
 */
export const usePagination = ({
  totalItems,
  itemsPerPage = 9,
  initialPage = 1
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );
  
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(current => current + 1);
    }
  };
  
  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(current => current - 1);
    }
  };
  
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Si peu de pages, les montrer toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Pagination avec ellipses
      if (currentPage <= 3) {
        // Début : 1 2 3 4 ... last
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // -1 représente l'ellipse
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Fin : 1 ... last-3 last-2 last-1 last
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu : 1 ... current-1 current current+1 ... last
        pages.push(1);
        pages.push(-1);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  // S'assurer que la page actuelle est valide
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }
  
  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    setCurrentPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    getPageNumbers
  };
};