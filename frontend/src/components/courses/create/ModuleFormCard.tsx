
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ModuleFormCardProps {
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isEditing: boolean;
}

const ModuleFormCard: React.FC<ModuleFormCardProps> = ({
  title,
  description,
  setTitle,
  setDescription,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEditing ? 'Modifier le module' : 'Ajouter un nouveau module'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="moduleTitle">Titre du module*</Label>
          <Input
            id="moduleTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Introduction à l'aviation civile"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="moduleDescription">Description du module</Label>
          <Textarea
            id="moduleDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description détaillée du contenu du module..."
            rows={3}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {isEditing && onCancel && (
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Annuler
          </Button>
        )}
        <Button
          onClick={onSubmit}
          type="button"
        >
          {isEditing ? 'Enregistrer les modifications' : 'Ajouter le module'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleFormCard;
