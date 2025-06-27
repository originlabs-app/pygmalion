
import React from 'react';
import { CourseModule, ModuleContent } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus, FileText, Video, File, HelpCircle, BookOpen } from 'lucide-react';
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ModuleItemProps {
  module: CourseModule;
  moduleIndex: number;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onAddContent: (moduleIndex: number) => void;
  onRemoveContent: (moduleIndex: number, contentIndex: number) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
  module,
  moduleIndex,
  onEdit,
  onRemove,
  onAddContent,
  onRemoveContent
}) => {
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-red-500" />;
      case 'pdf':
        return <File className="h-5 w-5 text-amber-500" />;
      case 'quiz':
        return <HelpCircle className="h-5 w-5 text-green-500" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const getContentTypeName = (type: string) => {
    switch (type) {
      case 'text':
        return 'Texte';
      case 'video':
        return 'Vidéo';
      case 'pdf':
        return 'PDF';
      case 'quiz':
        return 'Quiz';
      default:
        return 'Contenu';
    }
  };

  return (
    <AccordionItem key={module.id} value={`module-${moduleIndex}`}>
      <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
        <div className="flex items-center text-left">
          <span className="font-medium">{module.title}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            ({module.content.length} contenus)
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="mb-3 text-sm text-muted-foreground">
          {module.description || "Aucune description"}
        </div>
        
        {/* Actions du module */}
        <div className="flex mb-4 space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(moduleIndex)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Modifier
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRemove(moduleIndex)}
            className="flex items-center text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Supprimer
          </Button>
          <Button 
            variant="default"
            size="sm"
            onClick={() => onAddContent(moduleIndex)}
            className="flex items-center ml-auto"
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter du contenu
          </Button>
        </div>
        
        {/* Liste de contenu du module */}
        <ModuleContentList 
          content={module.content}
          moduleIndex={moduleIndex}
          onRemoveContent={onRemoveContent}
          getContentIcon={getContentIcon}
          getContentTypeName={getContentTypeName}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

interface ModuleContentListProps {
  content: ModuleContent[];
  moduleIndex: number;
  onRemoveContent: (moduleIndex: number, contentIndex: number) => void;
  getContentIcon: (type: string) => JSX.Element;
  getContentTypeName: (type: string) => string;
}

const ModuleContentList: React.FC<ModuleContentListProps> = ({
  content,
  moduleIndex,
  onRemoveContent,
  getContentIcon,
  getContentTypeName
}) => {
  return (
    <div className="space-y-2 mt-4">
      <h4 className="font-medium text-sm">Contenu du module:</h4>
      
      {content.length === 0 ? (
        <div className="p-3 bg-muted/50 rounded text-sm text-center">
          Aucun contenu ajouté à ce module
        </div>
      ) : (
        <div className="space-y-2">
          {content.map((contentItem, contentIndex) => (
            <div key={contentIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded">
              <div className="flex items-center">
                {getContentIcon(contentItem.type)}
                <div className="ml-2">
                  <p className="text-sm font-medium">{contentItem.title}</p>
                  <p className="text-xs text-muted-foreground">{getContentTypeName(contentItem.type)}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemoveContent(moduleIndex, contentIndex)}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Supprimer</span>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleItem;
