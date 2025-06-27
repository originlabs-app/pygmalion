
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { AVIATION_CATEGORIES } from '@/constants/aviationCategories';

interface CourseFiltersProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  providerFilter: string;
  setProviderFilter: (value: string) => void;
}

// Mock data for providers
const mockProviders = [
  { id: 'provider-1', name: 'Sky Training Academy' },
  { id: 'provider-2', name: 'AeroLearn Institute' },
  { id: 'provider-3', name: 'Flight Safety Training' },
];

const CourseFilters: React.FC<CourseFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  providerFilter,
  setProviderFilter
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 border rounded-lg bg-muted/20">
      <div className="w-full md:w-64">
        <label className="text-sm font-medium block mb-2">Catégorie</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {AVIATION_CATEGORIES.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-64">
        <label className="text-sm font-medium block mb-2">Statut</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="published">Publiée</SelectItem>
            <SelectItem value="draft">Brouillon</SelectItem>
            <SelectItem value="archived">Archivée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-64">
        <label className="text-sm font-medium block mb-2">Fournisseur</label>
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les fournisseurs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les fournisseurs</SelectItem>
            {mockProviders.map(provider => (
              <SelectItem key={provider.id} value={provider.id}>{provider.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CourseFilters;
