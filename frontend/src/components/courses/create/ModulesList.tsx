
import React from 'react';
import { Accordion } from "@/components/ui/accordion";
import { CourseModule } from '@/types';
import ModuleItem from './ModuleItem';

interface ModulesListProps {
  modules: CourseModule[];
  onEditModule: (index: number) => void;
  onRemoveModule: (index: number) => void;
  onAddContent: (moduleIndex: number) => void;
  onRemoveContent: (moduleIndex: number, contentIndex: number) => void;
}

const ModulesList: React.FC<ModulesListProps> = ({
  modules,
  onEditModule,
  onRemoveModule,
  onAddContent,
  onRemoveContent
}) => {
  if (modules.length === 0) {
    return (
      <div className="text-center p-6 bg-muted rounded-lg">
        <p className="text-muted-foreground">Aucun module n'a encore été ajouté</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {modules.map((module, moduleIndex) => (
        <ModuleItem 
          key={module.id}
          module={module}
          moduleIndex={moduleIndex}
          onEdit={onEditModule}
          onRemove={onRemoveModule}
          onAddContent={onAddContent}
          onRemoveContent={onRemoveContent}
        />
      ))}
    </Accordion>
  );
};

export default ModulesList;
