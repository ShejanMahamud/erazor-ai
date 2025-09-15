import CookieConsent from '@/components/CookieConsent';
import Providers from '@/components/layout/providers';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import ClickSpark from '@/components/ui/click-spark';
import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import './theme.css';

const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b'
};

export const metadata: Metadata = {
  title: {
    default:
      'Erazor - AI-Powered Background Remover & Photo Editor | Remove Backgrounds Instantly',
    template: '%s | Erazor - AI Background Remover'
  },
  description:
    "Remove backgrounds from photos instantly with Erazor's AI-powered background remover. Professional-quality results in 3 seconds. Free online tool for e-commerce, portraits, and creative projects. No signup required.",
  keywords: [
    'background remover',
    'remove background',
    'AI background remover',
    'photo editor',
    'image editor',
    'background removal tool',
    'transparent background',
    'cut out image',
    'product photography',
    'e-commerce photos',
    'portrait editor',
    'online photo editor',
    'free background remover',
    'automatic background removal',
    'AI photo editing',
    'image cutout',
    'photo background changer',
    'remove bg',
    'background eraser',
    'professional photo editing'
  ],
  authors: [{ name: 'Erazor Team', url: 'https://erazor.johuniq.xyz' }],
  creator: 'Erazor',
  publisher: 'Erazor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://erazor.johuniq.xyz'
  ),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title:
      'Erazor - AI-Powered Background Remover | Remove Backgrounds Instantly',
    description:
      'Remove backgrounds from photos instantly with AI. Professional results in 3 seconds. Free online background remover for e-commerce, portraits, and creative projects.',
    siteName: 'Erazor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Erazor - AI Background Remover Tool',
        type: 'image/png'
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Erazor - Remove Backgrounds with AI',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erazor - AI Background Remover | Remove Backgrounds Instantly',
    description:
      'Remove backgrounds from photos instantly with AI. Professional results in 3 seconds. Free online background remover.',
    images: ['/twitter-image.png'],
    creator: '@erazor_ai',
    site: '@erazor_ai'
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5'
      }
    ]
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  category: 'technology',
  classification: 'Photo Editing Software',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Erazor',
  generator: 'Next.js',
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'facebook-domain-verification': 'your-facebook-verification-code'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link rel='preconnect' href='https://app.chatwoot.com' />

        {/* DNS prefetch for better performance */}
        <link rel='dns-prefetch' href='//www.google-analytics.com' />
        <link rel='dns-prefetch' href='//googletagmanager.com' />
        {/* Structured Data - Organization */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Erazor',
              description:
                'AI-powered background remover and photo editing tool',
              url: 'https://erazor.ai',
              logo: 'https://erazor.ai/logo.png',
              sameAs: [
                'https://twitter.com/erazor_ai',
                'https://facebook.com/erazor',
                'https://linkedin.com/company/erazor'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-XXX-XXX-XXXX',
                contactType: 'customer service',
                availableLanguage: ['English', 'Spanish']
              }
            })
          }}
        />

        {/* Structured Data - WebApplication */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Erazor Background Remover',
              description:
                'AI-powered tool to remove backgrounds from images instantly',
              url: 'https://erazor.ai',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                category: 'Free'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '10000',
                bestRating: '5',
                worstRating: '1'
              }
            })
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d,t) {
                var BASE_URL="https://app.chatwoot.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: '${process.env.NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN}',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
            `
          }}
        />
      </head>
      <body
        className={cn(
          'bg-background overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
          fontVariables
        )}
      >
        {/* Google Analytics with consent management */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-4RYFWYBPY8'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Initialize with consent denied by default (GDPR compliance)
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            
            gtag('config', 'G-4RYFWYBPY8');
          `}
        </Script>

        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              <CookieConsent />
              <ClickSpark
                sparkColor='#fff'
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                {children}
              </ClickSpark>
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
        <Analytics />
      </body>
    </html>
  );
}
