
import { Course, Session } from '@/types';
import { isSessionAccessible, isSessionEnded, isSessionUpcoming } from './sessionStatus';
import { CourseMaterials } from './types';

/**
 * Récupère le matériel de cours disponible en fonction du type et de l'état de la session
 */
export const getCourseMaterials = (course: Course, session: Session): CourseMaterials => {
  const materials: CourseMaterials = {
    preCourse: [],
    duringCourse: [],
    postCourse: []
  };
  
  // Simulation de matériaux disponibles selon le type de cours
  // Dans une implémentation réelle, cela viendrait d'une API
  
  if (isSessionUpcoming(session)) {
    // Matériaux disponibles avant la session
    if (course.type === 'in-person') {
      materials.preCourse = [
        { id: '1', name: 'Plan d\'accès', type: 'pdf' },
        { id: '2', name: 'Agenda de la journée', type: 'pdf' }
      ];
    } else if (course.type === 'virtual') {
      materials.preCourse = [
        { id: '3', name: 'Guide de connexion', type: 'pdf' },
        { id: '4', name: 'Prérequis techniques', type: 'pdf' }
      ];
    } else if (course.type === 'blended') {
      materials.preCourse = [
        { id: '5', name: 'Programme détaillé', type: 'pdf' },
        { id: '6', name: 'Calendrier des modules', type: 'pdf' }
      ];
    }
  } else if (isSessionAccessible(session)) {
    // Matériaux disponibles pendant la session
    if (course.type === 'in-person') {
      materials.duringCourse = [
        { id: '5', name: 'Support de cours', type: 'pdf' },
        { id: '6', name: 'Exercices pratiques', type: 'pdf' }
      ];
    } else if (course.type === 'virtual') {
      materials.duringCourse = [
        { id: '7', name: 'Lien de la classe virtuelle', type: 'link' },
        { id: '8', name: 'Support de présentation', type: 'pdf' }
      ];
    } else if (course.type === 'online') {
      materials.duringCourse = [
        { id: '9', name: 'Module interactif', type: 'interactive' },
        { id: '10', name: 'Ressources complémentaires', type: 'pdf' }
      ];
    } else if (course.type === 'blended') {
      materials.duringCourse = [
        { id: '11', name: 'Modules e-learning', type: 'interactive' },
        { id: '12', name: 'Supports présentiels', type: 'pdf' },
        { id: '13', name: 'Liens classes virtuelles', type: 'link' }
      ];
    }
  } else if (isSessionEnded(session)) {
    // Matériaux disponibles après la session
    materials.postCourse = [
      { id: '11', name: 'Attestation de présence', type: 'pdf' },
      { id: '12', name: 'Support complet', type: 'pdf' }
    ];
    
    if (course.type === 'virtual' || course.type === 'blended') {
      materials.postCourse.push({ id: '13', name: 'Enregistrement de la session', type: 'video' });
    }
  }
  
  return materials;
};
