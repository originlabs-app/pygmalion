
import React, { useState } from 'react';
import logger from '@/services/logger.service';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCourses } from '@/contexts/CourseContext';
import { toast } from 'sonner';
import { Course, CourseMaterial, CourseModule } from '@/types';
import { courseSchema, CourseFormValues } from './types';
import BasicInfoForm from './BasicInfoForm';
import DetailedInfoForm from './DetailedInfoForm';
import ModulesForm from './ModulesForm';
import CoursePreview from './CoursePreview';

const CourseFormContainer: React.FC = () => {
  const navigate = useNavigate();
  const { addCourse } = useCourses();
  const [activeTab, setActiveTab] = useState('basic');
  const [indicators, setIndicators] = useState<string[]>([]);
  const [newIndicator, setNewIndicator] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modules, setModules] = useState<CourseModule[]>([]);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      objectives: '',
      requirements: '',
      targetAudience: '',
      program: '',
      qualiopiIndicators: [],
      type: 'in-person',
      image: '/placeholder.svg',
    },
  });

  const onAddIndicator = () => {
    if (newIndicator.trim() !== '') {
      const updatedIndicators = [...indicators, newIndicator.trim()];
      setIndicators(updatedIndicators);
      form.setValue('qualiopiIndicators', updatedIndicators);
      setNewIndicator('');
    }
  };

  const removeIndicator = (index: number) => {
    const updatedIndicators = indicators.filter((_, i) => i !== index);
    setIndicators(updatedIndicators);
    form.setValue('qualiopiIndicators', updatedIndicators);
  };

  const handleAddModule = (module: CourseModule) => {
    setModules(prev => [...prev, module]);
  };

  const handleUpdateModule = (index: number, updatedModule: CourseModule) => {
    setModules(prev => prev.map((mod, i) => i === index ? updatedModule : mod));
  };

  const handleRemoveModule = (index: number) => {
    setModules(prev => prev.filter((_, i) => i !== index));
  };

  const goToNextTab = () => {
    if (activeTab === 'basic') {
      const basicFields = ['title', 'description', 'category', 'type'];
      const validBasic = basicFields.every(field => {
        const result = form.trigger(field as keyof CourseFormValues);
        return result;
      });

      if (validBasic) {
        setActiveTab('details');
      }
    } else if (activeTab === 'details') {
      const detailFields = ['objectives', 'program', 'qualiopiIndicators'];
      const validDetails = detailFields.every(field => {
        const result = form.trigger(field as keyof CourseFormValues);
        return result;
      });

      if (validDetails) {
        setActiveTab('modules');
      }
    } else if (activeTab === 'modules') {
      // Valider que des modules ont été créés
      if (modules.length === 0) {
        toast.error('Veuillez créer au moins un module');
        return;
      }
      
      setActiveTab('preview');
    }
  };

  const goToPreviousTab = () => {
    if (activeTab === 'details') {
      setActiveTab('basic');
    } else if (activeTab === 'modules') {
      setActiveTab('details');
    } else if (activeTab === 'preview') {
      setActiveTab('modules');
    }
  };

  const onSubmit = (data: CourseFormValues) => {
    setIsSubmitting(true);
    try {
      // Ensure all required fields are explicitly passed as non-optional
      const courseData: Omit<Course, 'id' | 'provider' | 'providerId' | 'status'> = {
        title: data.title,
        description: data.description,
        category: data.category,
        objectives: data.objectives,
        requirements: data.requirements,
        targetAudience: data.targetAudience,
        program: data.program,
        qualiopiIndicators: indicators,
        type: data.type,
        image: data.image,
        modules: modules,
        sessions: [],
      };
      
      addCourse(courseData);
      toast.success('Formation créée avec succès!');
      navigate('/training-org-dashboard');
    } catch (error) {
      toast.error('Erreur lors de la création de la formation');
      logger.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="basic">Informations de base</TabsTrigger>
          <TabsTrigger value="details">Détails pédagogiques</TabsTrigger>
          <TabsTrigger value="modules">Modules & Contenu</TabsTrigger>
          <TabsTrigger value="preview">Aperçu et validation</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="basic">
              <BasicInfoForm goToNextTab={goToNextTab} />
            </TabsContent>

            <TabsContent value="details">
              <DetailedInfoForm
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
                indicators={indicators}
                setIndicators={setIndicators}
                newIndicator={newIndicator}
                setNewIndicator={setNewIndicator}
                onAddIndicator={onAddIndicator}
                removeIndicator={removeIndicator}
              />
            </TabsContent>

            <TabsContent value="modules">
              <ModulesForm
                modules={modules}
                onAddModule={handleAddModule}
                onUpdateModule={handleUpdateModule}
                onRemoveModule={handleRemoveModule}
                goToNextTab={goToNextTab}
                goToPreviousTab={goToPreviousTab}
              />
            </TabsContent>

            <TabsContent value="preview">
              <CoursePreview 
                goToPreviousTab={goToPreviousTab}
                isSubmitting={isSubmitting}
                indicators={indicators}
                modules={modules}
              />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default CourseFormContainer;
