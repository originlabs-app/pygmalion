
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AuthCallback from '@/components/auth/AuthCallback';
import { useCourses } from '@/contexts/CourseContext';
import HeroSection from '@/components/home/HeroSection';
import TrustedBySection from '@/components/home/TrustedBySection';
import FeaturedCoursesSection from '@/components/home/FeaturedCoursesSection';
import CategoriesCarouselSection from '@/components/home/CategoriesCarouselSection';
import PopularCoursesSection from '@/components/home/PopularCoursesSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import UserTypesSection from '@/components/home/UserTypesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import { AVIATION_CATEGORIES } from '@/contexts/CourseContext';

const Index = () => {
  const { getFilteredCourses } = useCourses();
  const location = useLocation();
  const [isAuthCallback, setIsAuthCallback] = useState(false);
  
  // Vérifier si nous avons un callback d'authentification Supabase
  useEffect(() => {
    const hasAuthTokens = location.hash && 
      location.hash.includes('access_token') && 
      location.hash.includes('type=signup');
    
    setIsAuthCallback(hasAuthTokens);
  }, [location.hash]);

  // Si c'est un callback d'authentification, afficher le composant AuthCallback
  if (isAuthCallback) {
    return <AuthCallback />;
  }
  
  // Sinon, afficher la page d'accueil normale
  const featuredCourses = getFilteredCourses().slice(0, 6);
  const popularCourses = getFilteredCourses().slice(0, 4);
  
  return (
    <Layout>
      <HeroSection />
      <TrustedBySection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <CategoriesCarouselSection categories={AVIATION_CATEGORIES} />
      <PopularCoursesSection courses={popularCourses} />
      <BenefitsSection />
      <UserTypesSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
