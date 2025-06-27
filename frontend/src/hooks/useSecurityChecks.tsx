
import { useState } from 'react';
import { toast } from 'sonner';

interface SecurityChecksState {
  identity: boolean;
  device: boolean;
  requirements: boolean;
}

export const useSecurityChecks = () => {
  const [securityChecks, setSecurityChecks] = useState<SecurityChecksState>({
    identity: false,
    device: false,
    requirements: false
  });

  const performSecurityChecks = () => {
    // Check device compatibility
    const deviceCheck = checkDeviceCompatibility();
    setSecurityChecks(prev => ({ ...prev, device: deviceCheck }));
    
    // Check security requirements
    const requirementsCheck = checkSecurityRequirements();
    setSecurityChecks(prev => ({ ...prev, requirements: requirementsCheck }));
    
    // Check identity
    const identityCheck = checkIdentityConsistency();
    setSecurityChecks(prev => ({ ...prev, identity: identityCheck }));
    
    // Show warning for failed checks
    if (!deviceCheck || !requirementsCheck || !identityCheck) {
      toast.warning("Certaines fonctionnalités de sécurité ne sont pas optimales sur votre appareil", {
        duration: 5000
      });
    }
  };

  return { securityChecks, performSecurityChecks };
};

// Security check utility functions
const checkDeviceCompatibility = () => {
  // Check if webcam is available
  const hasCamera = 'mediaDevices' in navigator;
  
  // Check if browser supports required features
  const hasRequiredAPIs = 'localStorage' in window && 
                         'sessionStorage' in window && 
                         'Notification' in window;
  
  return hasRequiredAPIs;
};

const checkSecurityRequirements = () => {
  // Check if cookies are enabled
  const cookiesEnabled = navigator.cookieEnabled;
  
  // Check if running in secure context (HTTPS)
  const isSecureContext = window.isSecureContext;
  
  return cookiesEnabled && isSecureContext;
};

const checkIdentityConsistency = () => {
  // In a real app, this would verify SSO token validity
  // For demo, assume it's valid
  return true;
};
