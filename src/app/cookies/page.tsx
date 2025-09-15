'use client';

import MainLayout from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  CheckCircle,
  Cookie,
  MessageCircle,
  Shield,
  Target
} from 'lucide-react';
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

export default function CookieSettingsPage() {
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedConsent = localStorage.getItem('erazor-cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setPreferences(parsed);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
      }
    }
    setIsLoading(false);
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

  const handleTogglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSaved(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('erazor-cookie-consent', JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <Cookie className='mx-auto mb-2 size-8 animate-spin text-orange-500' />
            <p>Loading cookie settings...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className='bg-background min-h-screen'>
        {/* Header */}
        <div className='border-b border-gray-200/50 bg-gradient-to-br from-orange-50 to-purple-50 pt-20 dark:border-gray-800/50 dark:from-orange-950/20 dark:to-purple-950/20'>
          <div className='container mx-auto px-6 py-16'>
            <div className='mx-auto max-w-4xl space-y-4 text-center'>
              <div className='mb-4 flex items-center justify-center gap-3'>
                <Cookie className='size-8 text-orange-500' />
                <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                  Cookie{' '}
                  <span className='bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent'>
                    Preferences
                  </span>
                </h1>
              </div>
              <p className='text-foreground/70 text-xl leading-relaxed'>
                Manage your cookie preferences and understand how we use cookies
                to improve your experience.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='container mx-auto bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] px-6 py-16'>
          <div className='mx-auto max-w-4xl space-y-8'>
            {/* Save Status */}
            {saved && (
              <Card className='border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'>
                <CardContent className='flex items-center gap-2 pt-6'>
                  <CheckCircle className='size-5 text-green-500' />
                  <span className='text-green-700 dark:text-green-300'>
                    Cookie preferences saved successfully!
                  </span>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Quickly accept all, reject all, or save your custom
                  preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col gap-3 sm:flex-row'>
                  <Button
                    variant='outline'
                    onClick={handleRejectAll}
                    className='flex-1'
                  >
                    Reject All
                  </Button>
                  <Button
                    variant='outline'
                    onClick={handleSavePreferences}
                    className='flex-1'
                  >
                    Save Current Settings
                  </Button>
                  <Button
                    onClick={handleAcceptAll}
                    className='flex-1 bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90'
                  >
                    Accept All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cookie Categories */}
            <div className='grid gap-6'>
              {/* Necessary Cookies */}
              <Card className='border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <Shield className='size-6 text-green-500' />
                    <div className='flex-1'>
                      <CardTitle className='flex items-center justify-between'>
                        Necessary Cookies
                        <div className='relative'>
                          <div className='relative h-6 w-12 rounded-full bg-green-500'>
                            <div className='absolute top-1 right-1 h-4 w-4 rounded-full bg-white shadow-sm' />
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Essential cookies required for basic website
                        functionality. These cannot be disabled.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-muted-foreground space-y-2 text-sm'>
                    <p>• Session management and user authentication</p>
                    <p>• Security features and CSRF protection</p>
                    <p>• Basic website functionality and navigation</p>
                    <p>• Theme preferences (dark/light mode)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Cookies */}
              <Card className='border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <BarChart3 className='size-6 text-blue-500' />
                    <div className='flex-1'>
                      <CardTitle className='flex items-center justify-between'>
                        Analytics Cookies
                        <div className='relative'>
                          <input
                            type='checkbox'
                            checked={preferences.analytics}
                            onChange={() => handleTogglePreference('analytics')}
                            className='sr-only'
                          />
                          <div
                            onClick={() => handleTogglePreference('analytics')}
                            className={cn(
                              'relative h-6 w-12 cursor-pointer rounded-full transition-colors',
                              preferences.analytics
                                ? 'bg-blue-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            )}
                          >
                            <div
                              className={cn(
                                'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                                preferences.analytics ? 'right-1' : 'left-1'
                              )}
                            />
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Help us understand how visitors use our website to
                        improve performance and user experience.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-muted-foreground space-y-2 text-sm'>
                    <p>• Google Analytics for website usage statistics</p>
                    <p>• Page views, session duration, and bounce rates</p>
                    <p>• Device and browser information (anonymized)</p>
                    <p>• Geographic location (country/city level only)</p>
                  </div>
                </CardContent>
              </Card>

              {/* Functional Cookies */}
              <Card className='border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/20'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <MessageCircle className='size-6 text-purple-500' />
                    <div className='flex-1'>
                      <CardTitle className='flex items-center justify-between'>
                        Functional Cookies
                        <div className='relative'>
                          <input
                            type='checkbox'
                            checked={preferences.functional}
                            onChange={() =>
                              handleTogglePreference('functional')
                            }
                            className='sr-only'
                          />
                          <div
                            onClick={() => handleTogglePreference('functional')}
                            className={cn(
                              'relative h-6 w-12 cursor-pointer rounded-full transition-colors',
                              preferences.functional
                                ? 'bg-purple-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            )}
                          >
                            <div
                              className={cn(
                                'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                                preferences.functional ? 'right-1' : 'left-1'
                              )}
                            />
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Enable enhanced features like chat support and
                        personalized user experience.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-muted-foreground space-y-2 text-sm'>
                    <p>• Chatwoot chat support functionality</p>
                    <p>• User preferences and settings</p>
                    <p>• Language and region preferences</p>
                    <p>• Social media integrations</p>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Cookies */}
              <Card className='border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20'>
                <CardHeader>
                  <div className='flex items-center gap-3'>
                    <Target className='size-6 text-orange-500' />
                    <div className='flex-1'>
                      <CardTitle className='flex items-center justify-between'>
                        Marketing Cookies
                        <div className='relative'>
                          <input
                            type='checkbox'
                            checked={preferences.marketing}
                            onChange={() => handleTogglePreference('marketing')}
                            className='sr-only'
                          />
                          <div
                            onClick={() => handleTogglePreference('marketing')}
                            className={cn(
                              'relative h-6 w-12 cursor-pointer rounded-full transition-colors',
                              preferences.marketing
                                ? 'bg-orange-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                            )}
                          >
                            <div
                              className={cn(
                                'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                                preferences.marketing ? 'right-1' : 'left-1'
                              )}
                            />
                          </div>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        Allow personalized advertising and promotional content
                        based on your interests.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-muted-foreground space-y-2 text-sm'>
                    <p>• Personalized advertisements</p>
                    <p>• Retargeting and remarketing campaigns</p>
                    <p>• Social media advertising pixels</p>
                    <p>• Email marketing preferences</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Save Button */}
            <Card>
              <CardContent className='pt-6'>
                <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                  <div>
                    <h3 className='font-semibold'>Save Your Preferences</h3>
                    <p className='text-muted-foreground text-sm'>
                      Your choices will be saved and applied immediately.
                    </p>
                  </div>
                  <Button
                    onClick={handleSavePreferences}
                    className='bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90'
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className='text-muted-foreground space-y-4 text-sm'>
                <p>
                  You can change your cookie preferences at any time by visiting
                  this page. Changes will take effect immediately and apply to
                  your future browsing sessions.
                </p>
                <p>
                  For more information about how we handle your data, please
                  read our{' '}
                  <a
                    href='/privacy'
                    className='text-orange-500 underline hover:text-orange-600'
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p>
                  If you have questions about our use of cookies, please contact
                  us at{' '}
                  <a
                    href='mailto:privacy@erazor.com'
                    className='text-orange-500 underline hover:text-orange-600'
                  >
                    privacy@erazor.com
                  </a>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters: any) => void;
  }
}
