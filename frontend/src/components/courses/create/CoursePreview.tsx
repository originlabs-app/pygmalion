
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Video, File, HelpCircle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { CourseFormValues } from './types';
import { CourseModule, ModuleContent } from '@/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

interface CoursePreviewProps {
  goToPreviousTab: () => void;
  isSubmitting: boolean;
  indicators: string[];
  modules: CourseModule[];
}

const CoursePreview: React.FC<CoursePreviewProps> = ({
  goToPreviousTab,
  isSubmitting,
  indicators,
  modules,
}) => {
  const form = useFormContext<CourseFormValues>();

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'pdf':
        return <File className="h-4 w-4 text-amber-500" />;
      case 'quiz':
        return <HelpCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
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
    <div className="space-y-6">
      <div className="bg-muted p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{form.watch('title')}</h2>
          <p className="text-muted-foreground">Catégorie: {form.watch('category')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={form.watch('image')}
              alt="Course Preview"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-sm">{form.watch('description')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Type de formation</h3>
              <p className="text-sm">
                {form.watch('type') === 'in-person'
                  ? 'Présentiel'
                  : form.watch('type') === 'online'
                  ? 'E-learning'
                  : form.watch('type') === 'virtual'
                  ? 'Classe virtuelle'
                  : 'Formation mixte'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Objectifs pédagogiques</h3>
              <p className="text-sm">{form.watch('objectives')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Programme</h3>
              <p className="text-sm">{form.watch('program')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prérequis</h3>
              <p className="text-sm">{form.watch('requirements') || 'Aucun prérequis spécifique'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Public visé</h3>
              <p className="text-sm">{form.watch('targetAudience') || 'Tous professionnels'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Indicateurs Qualiopi</h3>
              <div className="flex flex-wrap gap-2">
                {indicators.map((indicator, index) => (
                  <span key={index} className="bg-muted/70 text-xs px-2 py-1 rounded-full">
                    {indicator}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu des modules */}
      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Modules de la formation ({modules.length})</h3>
        
        {modules.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {modules.map((module, index) => (
              <AccordionItem key={module.id} value={`module-${index}`}>
                <AccordionTrigger className="hover:bg-muted/80 px-2 rounded-md">
                  <div className="flex items-center text-left">
                    <span className="font-medium">{module.title}</span>
                    <Badge variant="outline" className="ml-2">
                      {module.content.length} contenus
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4">
                  {module.description && (
                    <div className="mb-3 text-sm text-muted-foreground">
                      {module.description}
                    </div>
                  )}
                  
                  <div className="space-y-2 mt-2">
                    {module.content.length > 0 ? (
                      module.content.map((content, contentIndex) => (
                        <div key={contentIndex} className="flex items-center p-2 bg-muted/80 rounded">
                          {getContentIcon(content.type)}
                          <div className="ml-2">
                            <p className="text-sm font-medium">{content.title}</p>
                            <p className="text-xs text-muted-foreground">{getContentTypeName(content.type)}</p>
                          </div>
                          {content.type === 'quiz' && (
                            <Badge className="ml-auto" variant="secondary">
                              {content.questions?.length || 0} questions
                            </Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 bg-muted/80 rounded text-sm text-center">
                        Aucun contenu dans ce module
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="p-4 bg-muted rounded text-center text-muted-foreground">
            Aucun module créé pour cette formation
          </div>
        )}
      </div>

      <div className="bg-muted/50 p-6 rounded-lg">
        <h3 className="font-semibold mb-4">Après la création de la formation</h3>
        <p className="text-sm mb-2">
          Une fois votre formation créée, vous pourrez :
        </p>
        <ul className="space-y-1 text-sm">
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span>Ajouter des sessions (dates, prix, lieux)</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span>Télécharger des documents complémentaires</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span>Modifier les informations de la formation</span>
          </li>
          <li className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
            <span>Suivre les inscriptions et générer des rapports</span>
          </li>
        </ul>
      </div>

      <div className="pt-4 flex justify-between">
        <Button type="button" variant="outline" onClick={goToPreviousTab}>
          Modifier les modules
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Création en cours...' : 'Créer la formation'}
        </Button>
      </div>
    </div>
  );
};

export default CoursePreview;
