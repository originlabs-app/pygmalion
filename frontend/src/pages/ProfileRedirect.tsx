import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const ProfileRedirect = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rediriger les managers vers leur page de paramètres
  if (currentUser.role === 'manager' || currentUser.role === 'airport_manager') {
    return <Navigate to="/manager/settings" replace />;
  }

  // Pour tous les autres utilisateurs, importer et afficher UserProfile
  return <Navigate to="/user-profile" replace />;
};

export default ProfileRedirect; 