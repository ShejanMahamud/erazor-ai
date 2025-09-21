import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Create Your Free Erazor AI Account | AI Background Remover',
  description:
    'Join thousands of users and create your free Erazor AI account today. Get instant access to AI-powered background removal, professional photo editing tools, and more. No credit card required.',
  keywords: [
    'sign up erazor',
    'create account',
    'free registration',
    'ai background remover account',
    'photo editing signup',
    'image editor registration',
    'background removal tool signup',
    'free ai photo editor',
    'erazor account creation',
    'professional photo editing'
  ],
  authors: [{ name: 'Erazor AI Team', url: 'https://erazor.ai' }],
  creator: 'Erazor AI',
  publisher: 'Erazor AI',
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/auth/sign-up',
    title: 'Sign Up for Erazor AI - Free AI Background Remover',
    description:
      'Create your free Erazor AI account and start removing backgrounds with AI in seconds. Join thousands of satisfied users worldwide.',
    siteName: 'Erazor AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sign up for Erazor AI - AI Background Remover',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up for Erazor AI - Free AI Background Remover',
    description:
      'Create your free account and start removing backgrounds with AI in seconds. Professional results guaranteed.',
    images: ['/og-image.jpg'],
    creator: '@erazor_ai',
    site: '@erazor_ai'
  },
  alternates: {
    canonical: '/auth/sign-up'
  },
  other: {
    'signup-benefits': 'Free account, instant access, no credit card required',
    'user-type': 'new-user-registration'
  }
};

export default async function Page() {
  return (
    <>
      {/* Structured Data for Sign-Up Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Sign Up - Erazor AI',
            description: 'User registration page for free Erazor AI background removal service',
            url: 'https://erazor.app/auth/sign-up',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            potentialAction: {
              '@type': 'RegisterAction',
              target: 'https://erazor.app/auth/sign-up',
              object: {
                '@type': 'WebApplication',
                name: 'Erazor AI Account'
              },
              result: {
                '@type': 'UserAccount',
                name: 'Free Erazor AI Account'
              }
            }
          })
        }}
      />

      {/* Free Service Offer Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Offer',
            name: 'Free Erazor AI Account',
            description: 'Create a free account for AI-powered background removal',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-01-01',
            category: 'Software Registration',
            eligibleRegion: {
              '@type': 'Place',
              name: 'Worldwide'
            },
            seller: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            itemOffered: {
              '@type': 'SoftwareApplication',
              name: 'Erazor AI Background Remover',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Web Browser'
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Credit Card Required',
                value: 'No'
              },
              {
                '@type': 'PropertyValue',
                name: 'Instant Access',
                value: 'Yes'
              },
              {
                '@type': 'PropertyValue',
                name: 'Free Trial Period',
                value: 'Unlimited'
              }
            ]
          })
        }}
      />

      {/* Registration Benefits Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Erazor AI Free Registration',
            description: 'Free account registration with instant access to AI background removal',
            provider: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            serviceType: 'User Account Creation',
            areaServed: 'Worldwide',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://erazor.app/auth/sign-up',
              servicePhone: 'N/A',
              serviceSmsNumber: 'N/A'
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Free Account Benefits',
              itemListElement: [
                {
                  '@type': 'Offer',
                  name: 'Free Background Removal',
                  description: '5 images per month at no cost'
                },
                {
                  '@type': 'Offer',
                  name: 'Image History',
                  description: 'Access to your processed images'
                },
                {
                  '@type': 'Offer',
                  name: 'User Dashboard',
                  description: 'Personal account management'
                },
                {
                  '@type': 'Offer',
                  name: 'Instant Processing',
                  description: 'AI-powered background removal in seconds'
                }
              ]
            }
          })
        }}
      />

      {/* Organization with Membership Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Erazor AI',
            url: 'https://erazor.app',
            logo: 'https://erazor.app/logo.png',
            description: 'AI-powered background removal service with free registration',
            sameAs: [
              'https://twitter.com/erazor_ai',
              'https://linkedin.com/company/erazor'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'support@erazor.app',
              contactType: 'Customer Support',
              availableLanguage: 'English'
            },
            memberOf: {
              '@type': 'Thing',
              name: 'AI Photo Editing Services'
            },
            hasCredential: {
              '@type': 'DigitalDocument',
              name: 'Free Account Registration',
              description: 'No credit card required for account creation'
            }
          })
        }}
      />

      {/* FAQ Schema for Sign-Up */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is signing up for Erazor AI free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, creating an Erazor AI account is completely free. No credit card required and you get instant access to our AI background removal tool with 5 free images per month.'
                }
              },
              {
                '@type': 'Question',
                name: 'What do I get with a free account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Free accounts include 5 background removals per month, access to your image history, user dashboard, and all basic AI-powered editing features.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do I need a credit card to sign up?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No credit card is required to create your free Erazor AI account. Simply provide your email address to get started immediately.'
                }
              },
              {
                '@type': 'Question',
                name: 'How quickly can I start using the service?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Account creation takes less than 30 seconds and you get instant access to start removing backgrounds with AI immediately after signing up.'
                }
              }
            ]
          })
        }}
      />

      <SignUpViewPage />
    </>
  );
}
