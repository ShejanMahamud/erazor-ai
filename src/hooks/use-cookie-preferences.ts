'use client';

import { useEffect, useState } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false
};

export function useCookiePreferences() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check if user has made a choice
    const savedConsent = localStorage.getItem('erazor-cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
        setHasConsent(true);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        setHasConsent(false);
      }
    } else {
      setHasConsent(false);
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('erazor-cookie-consent', JSON.stringify(updated));
    setHasConsent(true);

    // Apply to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: updated.analytics ? 'granted' : 'denied',
        ad_storage: updated.marketing ? 'granted' : 'denied',
        ad_user_data: updated.marketing ? 'granted' : 'denied',
        ad_personalization: updated.marketing ? 'granted' : 'denied'
      });
    }
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    // Helper methods
    canUseAnalytics: preferences.analytics,
    canUseMarketing: preferences.marketing,
    canUseFunctional: preferences.functional
  };
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: any) => void;
  }
}
