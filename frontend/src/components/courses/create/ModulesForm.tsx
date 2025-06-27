
import React, { useState } from 'react';
import { CourseModule, ModuleContent } from '@/types';
import ModuleHeader from './ModuleHeader';
import ModuleFormCard from './ModuleFormCard';
import ModulesList from './ModulesList';
import ModuleContentForm from './ModuleContentForm';
import ModulesFormNavigation from './ModulesFormNavigation';
import { toast } from 'sonner';

interface ModulesFormProps {
  modules: CourseModule[];
  onAddModule: (module: CourseModule) => void;
  onUpdateModule: (index: number, module: CourseModule) => void;
  onRemoveModule: (index: number) => void;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
}

const ModulesForm: React.FC<ModulesFormProps> = ({
  modules,
  onAddModule,
  onUpdateModule,
  onRemoveModule,
  goToNextTab,
  goToPreviousTab
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [activeModuleIndex, setActiveModuleIndex] = useState<number | null>(null);

  const handleAddModule = () => {
    if (!title.trim()) {
      toast.error('Le titre du module est obligatoire');
      return;
    }

    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title,
      description,
      content: []
    };
    
    onAddModule(newModule);
    setTitle('');
    setDescription('');
    toast.success('Module ajouté avec succès');
  };

  const handleSaveEdits = () => {
    if (editingModuleIndex !== null) {
      if (!title.trim()) {
        toast.error('Le titre du module est obligatoire');
        return;
      }

      const updatedModule = {
        ...modules[editingModuleIndex],
        title,
        description
      };
      
      onUpdateModule(editingModuleIndex, updatedModule);
      setEditingModuleIndex(null);
      setTitle('');
      setDescription('');
      toast.success('Module mis à jour avec succès');
    }
  };

  const handleEditModule = (index: number) => {
    setTitle(modules[index].title);
    setDescription(modules[index].description || '');
    setEditingModuleIndex(index);
  };

  const handleAddContent = (moduleIndex: number, content: ModuleContent) => {
    const updatedModule = { 
      ...modules[moduleIndex],
      content: [...modules[moduleIndex].content, content]
    };
    
    onUpdateModule(moduleIndex, updatedModule);
    setIsAddingContent(false);
    toast.success('Contenu ajouté avec succès');
  };

  const handleRemoveContent = (moduleIndex: number, contentIndex: number) => {
    const updatedContent = modules[moduleIndex].content.filter((_, i) => i !== contentIndex);
    const updatedModule = { 
      ...modules[moduleIndex],
      content: updatedContent
    };
    
    onUpdateModule(moduleIndex, updatedModule);
    toast.success('Contenu supprimé avec succès');
  };

  const handleCancelEdit = () => {
    setEditingModuleIndex(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <ModuleHeader title="Modules et contenu du cours" />

      {/* Formulaire d'ajout/édition de module */}
      <ModuleFormCard
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        onSubmit={editingModuleIndex !== null ? handleSaveEdits : handleAddModule}
        onCancel={handleCancelEdit}
        isEditing={editingModuleIndex !== null}
      />

      {/* Liste des modules */}
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Modules ({modules.length})</h3>
        <ModulesList
          modules={modules}
          onEditModule={handleEditModule}
          onRemoveModule={onRemoveModule}
          onAddContent={(moduleIndex) => {
            setActiveModuleIndex(moduleIndex);
            setIsAddingContent(true);
          }}
          onRemoveContent={handleRemoveContent}
        />
      </div>

      {/* Formulaire d'ajout de contenu */}
      {isAddingContent && activeModuleIndex !== null && (
        <ModuleContentForm
          onAddContent={(content) => handleAddContent(activeModuleIndex, content)}
          onCancel={() => setIsAddingContent(false)}
        />
      )}

      {/* Navigation */}
      <ModulesFormNavigation
        goToPreviousTab={goToPreviousTab}
        goToNextTab={goToNextTab}
      />
    </div>
  );
};

export default ModulesForm;
