import React from 'react';
import { Star, Users, Eye, Heart, TrendingUp, Clock } from 'lucide-react';
import { Course } from '@/types';

interface CourseMetricsProps {
  course: Course;
}

const CourseMetrics: React.FC<CourseMetricsProps> = ({ course }) => {
  // Composant désactivé - pas de statistiques affichées
  return null;
};

export default CourseMetrics;