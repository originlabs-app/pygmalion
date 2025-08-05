
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, MoreHorizontal, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demonstration - would come from API in real app
const mockCategories = [
  { id: 'cat1', name: 'Pilotage', coursesCount: 24, active: true },
  { id: 'cat2', name: 'Sécurité Aéroportuaire', coursesCount: 15, active: true },
  { id: 'cat3', name: 'Marchandises Dangereuses', coursesCount: 8, active: true },
  { id: 'cat4', name: 'Maintenance Aéronautique', coursesCount: 12, active: true },
  { id: 'cat5', name: 'Système de Gestion de Sécurité', coursesCount: 7, active: true },
  { id: 'cat6', name: 'Ancien Standard', coursesCount: 0, active: false },
];

const CategoriesList: React.FC = () => {
  const [categories] = useState(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<unknown>(null);
  const [categoryName, setCategoryName] = useState('');
  const { toast } = useToast();
  
  const handleOpenDialog = (category?: unknown) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName('');
    }
    setIsDialogOpen(true);
  };
  
  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie ne peut pas être vide",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: editingCategory ? "Catégorie mise à jour" : "Catégorie créée",
      description: `La catégorie "${categoryName}" a été ${editingCategory ? 'mise à jour' : 'créée'} avec succès.`,
    });
    
    setIsDialogOpen(false);
    setCategoryName('');
    setEditingCategory(null);
  };
  
  const handleCategoryAction = (categoryId: string, action: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    if (action === 'edit') {
      handleOpenDialog(category);
    } else if (action === 'toggle-status') {
      toast({
        title: category.active ? "Catégorie désactivée" : "Catégorie activée",
        description: `La catégorie "${category.name}" a été ${category.active ? 'désactivée' : 'activée'}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Catégories de Formation</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Modifier la catégorie" : "Ajouter une nouvelle catégorie"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory 
                  ? "Modifiez les détails de cette catégorie de formation." 
                  : "Créez une nouvelle catégorie de formation aéronautique."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <label htmlFor="categoryName" className="text-sm font-medium block mb-2">
                Nom de la catégorie
              </label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Ex: Pilotage, Sécurité, Maintenance..."
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveCategory}>
                {editingCategory ? "Mettre à jour" : "Créer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de la catégorie</TableHead>
              <TableHead>Formations</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <span className="font-medium">{category.name}</span>
                </TableCell>
                <TableCell>{category.coursesCount}</TableCell>
                <TableCell>
                  <span className={`inline-flex h-2 w-2 rounded-full mr-2 ${category.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  {category.active ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleCategoryAction(category.id, 'edit')}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleCategoryAction(category.id, 'toggle-status')}
                        disabled={!category.active && category.coursesCount > 0}
                        className={
                          !category.active && category.coursesCount > 0
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        }
                      >
                        {category.active ? 'Désactiver' : 'Activer'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesList;
