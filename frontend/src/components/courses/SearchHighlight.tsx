import React from 'react';

interface SearchHighlightProps {
  text: string;
  searchTerm: string;
  className?: string;
}

const SearchHighlight: React.FC<SearchHighlightProps> = ({ text, searchTerm, className = '' }) => {
  if (!searchTerm || !text) {
    return <span className={className}>{text}</span>;
  }

  // Créer une regex pour trouver toutes les occurrences du terme de recherche (insensible à la casse)
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  
  // Diviser le texte en parties, en alternant entre les parties correspondantes et non-correspondantes
  const parts = text.split(regex);
  
  return (
    <span className={className}>
      {parts.map((part, index) => 
        regex.test(part) ? (
          <mark 
            key={index} 
            className="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded font-medium"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default SearchHighlight; 