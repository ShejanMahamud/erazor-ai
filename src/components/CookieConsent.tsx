'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  Cookie,
  MessageCircle,
  Settings,
  Shield,
  Target,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, can't be disabled
  analytics: false,
  marketing: false,
  functional: false
};

export default function CookieConsentProvider() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('erazor-cookie-consent');
    if (!hasConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(hasConsent);
        setPreferences(saved);
        // Apply saved preferences
        applyCookiePreferences(saved);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
        ad_user_data: prefs.marketing ? 'granted' : 'denied',
        ad_personalization: prefs.marketing ? 'granted' : 'denied'
      });
    }

    // Chatwoot (functional)
    if (!prefs.functional && typeof window !== 'undefined') {
      // Disable Chatwoot if functional cookies are denied
      if (window.chatwootSDK) {
        try {
          window.chatwootSDK.toggle('close');
        } catch (e) {
          console.log('Chatwoot not available');
        }
      }
    }

    // Set cookie preferences in localStorage for other scripts to read
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'erazor-analytics-enabled',
        prefs.analytics.toString()
      );
      localStorage.setItem(
        'erazor-marketing-enabled',
        prefs.marketing.toString()
      );
      localStorage.setItem(
        'erazor-functional-enabled',
        prefs.functional.toString()
      );
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('erazor-cookie-consent', JSON.stringify(allAccepted));
    applyCookiePreferences(allAccepted);
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('erazor-cookie-consent', JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem(
      'erazor-cookie-consent',
      JSON.stringify(onlyNecessary)
    );
    applyCookiePreferences(onlyNecessary);
    setIsVisible(false);
  };

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='fixed bottom-6 left-1/2 z-[9999] w-full max-w-md -translate-x-1/2 px-6 md:left-6 md:translate-x-0 md:px-0'
      >
        <Card className='border-border bg-background/95 border shadow-xl backdrop-blur-md'>
          <CardContent className='p-6'>
            {!showDetails ? (
              // Simple banner
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <Cookie className='mt-0.5 size-6 flex-shrink-0 text-orange-500' />
                  <div className='space-y-1'>
                    <h3 className='text-foreground font-semibold'>
                      🍪 We use cookies
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                      We use cookies to enhance your experience and analyze site
                      traffic.{' '}
                      <a
                        href='/privacy'
                        className='text-orange-500 underline hover:text-orange-600'
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setShowDetails(true)}
                    className='text-muted-foreground hover:text-foreground justify-start'
                  >
                    <Settings className='mr-2 size-4' />
                    Customize preferences
                  </Button>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleRejectAll}
                      className='border-border hover:bg-muted flex-1'
                    >
                      Reject All
                    </Button>
                    <Button
                      size='sm'
                      onClick={handleAcceptAll}
                      className='flex-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90'
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Detailed preferences
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Cookie className='size-5 text-orange-500' />
                    <h3 className='text-foreground text-sm font-semibold'>
                      Cookie Preferences
                    </h3>
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setShowDetails(false)}
                    className='h-8 w-8 p-0'
                  >
                    <X className='size-4' />
                  </Button>
                </div>

                <div className='space-y-3'>
                  {/* Necessary Cookies */}
                  <div className='flex items-center justify-between rounded border border-green-200 bg-green-50/50 p-2 dark:border-green-800 dark:bg-green-950/20'>
                    <div className='flex items-center gap-2'>
                      <Shield className='size-4 text-green-500' />
                      <div>
                        <label className='text-foreground text-sm font-medium'>
                          Necessary
                        </label>
                        <p className='text-muted-foreground text-xs'>
                          Essential functionality
                        </p>
                      </div>
                    </div>
                    <div className='relative h-3 w-6 rounded-full bg-green-500'>
                      <div className='absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-white' />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className='flex items-center justify-between rounded border border-blue-200 bg-blue-50/50 p-2 dark:border-blue-800 dark:bg-blue-950/20'>
                    <div className='flex items-center gap-2'>
                      <BarChart3 className='size-4 text-blue-500' />
                      <div>
                        <label className='text-foreground text-sm font-medium'>
                          Analytics
                        </label>
                        <p className='text-muted-foreground text-xs'>
                          Usage statistics
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => handleTogglePreference('analytics')}
                      className={cn(
                        'relative h-3 w-6 cursor-pointer rounded-full transition-colors',
                        preferences.analytics
                          ? 'bg-blue-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-0.5 h-2 w-2 rounded-full bg-white transition-transform',
                          preferences.analytics ? 'right-0.5' : 'left-0.5'
                        )}
                      />
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className='flex items-center justify-between rounded border border-purple-200 bg-purple-50/50 p-2 dark:border-purple-800 dark:bg-purple-950/20'>
                    <div className='flex items-center gap-2'>
                      <MessageCircle className='size-4 text-purple-500' />
                      <div>
                        <label className='text-foreground text-sm font-medium'>
                          Functional
                        </label>
                        <p className='text-muted-foreground text-xs'>
                          Chat & support
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => handleTogglePreference('functional')}
                      className={cn(
                        'relative h-3 w-6 cursor-pointer rounded-full transition-colors',
                        preferences.functional
                          ? 'bg-purple-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-0.5 h-2 w-2 rounded-full bg-white transition-transform',
                          preferences.functional ? 'right-0.5' : 'left-0.5'
                        )}
                      />
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className='flex items-center justify-between rounded border border-orange-200 bg-orange-50/50 p-2 dark:border-orange-800 dark:bg-orange-950/20'>
                    <div className='flex items-center gap-2'>
                      <Target className='size-4 text-orange-500' />
                      <div>
                        <label className='text-foreground text-sm font-medium'>
                          Marketing
                        </label>
                        <p className='text-muted-foreground text-xs'>
                          Personalized ads
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => handleTogglePreference('marketing')}
                      className={cn(
                        'relative h-3 w-6 cursor-pointer rounded-full transition-colors',
                        preferences.marketing
                          ? 'bg-orange-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-0.5 h-2 w-2 rounded-full bg-white transition-transform',
                          preferences.marketing ? 'right-0.5' : 'left-0.5'
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={handleRejectAll}
                      className='border-border hover:bg-muted flex-1'
                    >
                      Reject All
                    </Button>
                    <Button
                      size='sm'
                      onClick={handleAcceptAll}
                      className='flex-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90'
                    >
                      Accept All
                    </Button>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleAcceptSelected}
                    className='border-border hover:bg-muted w-full'
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Type declaration for gtag and chatwoot
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: any) => void;
    chatwootSDK: {
      toggle: (action: string) => void;
    };
  }
}
