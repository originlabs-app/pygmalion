
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { EnrollmentProvider } from './contexts/EnrollmentContext';
import { CourseProvider } from './contexts/CourseContext';
import { Toaster } from '@/components/ui/sonner';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
        <EnrollmentProvider>
          <App />
          <Toaster />
        </EnrollmentProvider>
      </CourseProvider>
    </AuthProvider>
  </React.StrictMode>
);
