
import { Course, Session } from '@/types';

export type ModalityType = 'in-person' | 'online' | 'virtual' | 'blended';

export interface ModalityDetails {
  type: ModalityType;
  accessType: 'direct' | 'scheduled' | 'physical' | 'mixed';
  requiresVerification: boolean;
  supportsMaterials: boolean;
  supportsRecording: boolean;
  accessInfo: {
    beforeSession?: string[];
    duringSession?: string[];
    afterSession?: string[];
  };
}

export interface CourseMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'link' | 'video' | 'interactive' | string;
}

export interface CourseMaterials {
  preCourse: CourseMaterial[];
  duringCourse: CourseMaterial[];
  postCourse: CourseMaterial[];
}
