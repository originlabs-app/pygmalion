import { useState, useEffect, useCallback } from 'react';
import logger from '@/services/logger.service';
import { toast } from 'sonner';

interface FraudDetectionOptions {
  preventTabSwitching?: boolean;
  monitorKeyboard?: boolean;
  preventCopyPaste?: boolean;
  detectMultiplePersons?: boolean;
}

export const useFraudDetection = (isActive: boolean, options: FraudDetectionOptions = {}) => {
  const [tabFocused, setTabFocused] = useState(true);
  const [suspiciousActivity, setSuspiciousActivity] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [securityEvents, setSecurityEvents] = useState<string[]>([]);

  const {
    preventTabSwitching = true,
    monitorKeyboard = false,
    preventCopyPaste = false,
    detectMultiplePersons = false,
  } = options;

  // Record security event
  const recordSecurityEvent = useCallback((eventType: string, details: string = '') => {
    const timestamp = new Date().toISOString();
    const eventData = `${eventType} at ${timestamp}${details ? `: ${details}` : ''}`;
    
    setSecurityEvents(prev => [...prev, eventData]);
    logger.info(`Security event recorded: ${eventData}`);
    
    // In a real implementation, this would send data to the backend
  }, []);

  // Tab focus/blur detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && preventTabSwitching) {
        const isVisible = document.visibilityState === 'visible';
        setTabFocused(isVisible);
        
        if (!isVisible) {
          recordSecurityEvent('TAB_SWITCH');
          setSuspiciousActivity(true);
          setWarnings(w => w + 1);
          
          toast.warning("Attention: Quitter cette page pendant l'évaluation peut être considéré comme une tentative de fraude", {
            duration: 5000,
            id: "tab-change-warning"
          });
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, preventTabSwitching, recordSecurityEvent]);

  // Copy/paste prevention
  useEffect(() => {
    if (!isActive || !preventCopyPaste) return;
    
    const handleCopy = (e: ClipboardEvent) => {
      if (isActive) {
        e.preventDefault();
        recordSecurityEvent('COPY_ATTEMPT');
        toast.warning("La copie de contenu n'est pas autorisée pendant l'évaluation", {
          duration: 3000,
          id: "copy-warning"
        });
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (isActive) {
        e.preventDefault();
        recordSecurityEvent('PASTE_ATTEMPT');
        setSuspiciousActivity(true);
        setWarnings(w => w + 1);
        toast.warning("Le collage de contenu n'est pas autorisé pendant l'évaluation", {
          duration: 3000,
          id: "paste-warning"
        });
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
    };
  }, [isActive, preventCopyPaste, recordSecurityEvent]);

  // Keyboard monitoring for suspicious patterns
  useEffect(() => {
    if (!isActive || !monitorKeyboard) return;
    
    let keySequence: string[] = [];
    const suspiciousKeys = ['F12', 'Control', 'Alt'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.push(e.key);
      
      // Keep only the last 5 keys
      if (keySequence.length > 5) {
        keySequence.shift();
      }
      
      // Check for suspicious combinations
      if (suspiciousKeys.some(key => e.key === key)) {
        // Check for developer tools attempt (F12, Ctrl+Shift+I, etc)
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
          e.preventDefault();
          recordSecurityEvent('DEV_TOOLS_ATTEMPT');
          setSuspiciousActivity(true);
          setWarnings(w => w + 1);
          toast.warning("L'accès aux outils de développement n'est pas autorisé", {
            duration: 3000
          });
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, monitorKeyboard, recordSecurityEvent]);

  // In a real implementation, we would integrate with face detection API
  useEffect(() => {
    if (!isActive || !detectMultiplePersons) return;
    
    // Simulate periodic face detection checks
    const faceDetectionInterval = setInterval(() => {
      // This would be a real API call to check for multiple faces
      const randomDetection = Math.random() > 0.95; // 5% chance of fake detection for demo
      
      if (randomDetection) {
        recordSecurityEvent('MULTIPLE_PERSONS_DETECTED');
        setSuspiciousActivity(true);
        setWarnings(w => w + 1);
        toast.warning("Plusieurs personnes détectées. L'évaluation doit être passée individuellement.", {
          duration: 5000
        });
      }
    }, 15000);
    
    return () => {
      clearInterval(faceDetectionInterval);
    };
  }, [isActive, detectMultiplePersons, recordSecurityEvent]);

  return { 
    tabFocused,
    suspiciousActivity,
    warnings,
    securityEvents
  };
};
