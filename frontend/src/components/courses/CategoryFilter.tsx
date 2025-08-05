import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCategoryConfig, getMainCategories, type CategoryMapping } from '@/utils/categoryUtils';
import { ChevronDown, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
  courseCounts?: Record<string, number>;
  variant?: 'badges' | 'dropdown' | 'pills';
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  courseCounts = {},
  variant = 'badges'
}) => {
  const categories = getMainCategories();
  const totalCourses = Object.values(courseCounts).reduce((sum, count) => sum + count, 0);

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            {selectedCategory ? getCategoryConfig(selectedCategory).label : 'Toutes catégories'}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuItem 
            onClick={() => onCategoryChange(undefined)}
            className={!selectedCategory ? 'bg-accent' : ''}
          >
            <div className="flex justify-between items-center w-full">
              <span>Toutes les catégories</span>
              <Badge variant="secondary">{totalCourses}</Badge>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={selectedCategory === category.key ? 'bg-accent' : ''}
            >
              <div className="flex justify-between items-center w-full">
                <span>{category.label}</span>
                <Badge variant="secondary">
                  {courseCounts[category.key] || 0}
                </Badge>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'pills') {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          variant={!selectedCategory ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(undefined)}
          className="rounded-full"
        >
          Toutes ({totalCourses})
        </Button>
        {categories.map((category) => (
          <Button
            key={category.key}
            variant={selectedCategory === category.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.key)}
            className="rounded-full"
          >
            {category.label} ({courseCounts[category.key] || 0})
          </Button>
        ))}
      </div>
    );
  }

  // Default: badges variant
  return (
    <div className="flex flex-wrap gap-3">
      <Badge
        variant={!selectedCategory ? 'default' : 'outline'}
        className={`cursor-pointer transition-all hover:scale-105 px-4 py-2 ${
          !selectedCategory 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
            : 'hover:bg-gray-100'
        }`}
        onClick={() => onCategoryChange(undefined)}
      >
        Toutes ({totalCourses})
      </Badge>
      
      {categories.map((category) => {
        const isSelected = selectedCategory === category.key;
        const count = courseCounts[category.key] || 0;
        
        return (
          <Badge
            key={category.key}
            variant={isSelected ? 'default' : 'outline'}
            className={`cursor-pointer transition-all hover:scale-105 px-4 py-2 ${
              isSelected 
                ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg` 
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onCategoryChange(category.key)}
          >
            <span className="flex items-center gap-2">
              {category.label}
              <span className="text-xs opacity-75">({count})</span>
            </span>
          </Badge>
        );
      })}
    </div>
  );
};

export default CategoryFilter;