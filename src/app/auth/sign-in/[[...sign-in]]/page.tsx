import SignInViewPage from '@/features/auth/components/sign-in-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - Access Your Erazor AI Account | AI Background Remover',
  description:
    'Sign in to your Erazor AI account and continue using our AI-powered background removal tool. Access your projects, history, and premium features instantly.',
  keywords: [
    'sign in erazor',
    'login erazor',
    'access account',
    'ai background remover login',
    'photo editing login',
    'image editor sign in',
    'background removal tool login',
    'erazor dashboard access',
    'user account login',
    'member login'
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
    url: '/auth/sign-in',
    title: 'Sign In to Erazor AI - AI Background Remover Dashboard',
    description:
      'Access your Erazor AI account dashboard. Continue editing photos and removing backgrounds with our AI-powered tools.',
    siteName: 'Erazor AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sign in to Erazor AI - AI Background Remover',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In to Erazor AI - AI Background Remover',
    description:
      'Access your account and continue using our AI-powered background removal tools. Professional photo editing made simple.',
    images: ['/og-image.jpg'],
    creator: '@erazor_ai',
    site: '@erazor_ai'
  },
  alternates: {
    canonical: '/auth/sign-in'
  },
  other: {
    'login-purpose': 'user-authentication',
    'dashboard-access': 'member-portal'
  }
};

export default async function Page() {
  return (
    <>
      {/* Structured Data for Sign-In Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Sign In - Erazor AI',
            description: 'User authentication page for Erazor AI background removal service',
            url: 'https://erazor.app/auth/sign-in',
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
              '@type': 'LoginAction',
              target: 'https://erazor.app/auth/sign-in',
              object: {
                '@type': 'DigitalDocument',
                name: 'User Account Dashboard'
              }
            }
          })
        }}
      />

      {/* WebSite Schema with Search Action */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Erazor AI',
            url: 'https://erazor.app',
            potentialAction: [
              {
                '@type': 'SearchAction',
                target: 'https://erazor.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              },
              {
                '@type': 'LoginAction',
                target: 'https://erazor.app/auth/sign-in',
                object: {
                  '@type': 'DigitalDocument',
                  name: 'Member Dashboard'
                }
              }
            ]
          })
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Erazor AI',
            url: 'https://erazor.app',
            logo: 'https://erazor.app/logo.png',
            description: 'AI-powered background removal service',
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
            }
          })
        }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Erazor AI Background Remover',
            description: 'AI-powered background removal tool with user authentication',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Web Browser',
            url: 'https://erazor.app',
            author: {
              '@type': 'Organization',
              name: 'Erazor AI'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              category: 'Free Tier Available'
            },
            featureList: [
              'AI Background Removal',
              'User Dashboard',
              'Image History',
              'Batch Processing',
              'API Access'
            ],
            screenshot: 'https://erazor.app/dashboard-screenshot.png',
            softwareRequirements: 'Modern Web Browser',
            permissions: 'Account Registration Required for Advanced Features'
          })
        }}
      />

      <SignInViewPage />
    </>
  );
}
