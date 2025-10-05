import MainLayout from '@/components/layout/main-layout';
import { Pricing } from '@/components/Pricing';
import { PricingFAQ } from '@/components/PricingFAQ';
import { Spotlight } from '@/components/ui/spotlight';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans - AI Background Remover | Erazor AI',
  description:
    'Choose the perfect plan for your background removal needs. Free plan available with 5 images per month. Pro and Business plans with unlimited processing, bulk editing, and API access. Affordable AI-powered photo editing.',
  keywords: [
    'background remover pricing',
    'AI photo editor plans',
    'background removal subscription',
    'photo editing pricing',
    'remove background cost',
    'AI image editor plans',
    'professional photo editing plans',
    'bulk background removal',
    'API background remover',
    'affordable photo editing',
    'subscription photo editor',
    'business photo editing plans',
    'e-commerce photo editing pricing',
    'portrait editing plans',
    'product photography plans'
  ],
  openGraph: {
    title: 'Pricing Plans - AI Background Remover | Erazor AI',
    description:
      'Choose from Free, Pro, and Business plans for AI background removal. Start free with 5 images per month or upgrade for unlimited processing and advanced features.',
    url: '/pricing',
    siteName: 'Erazor AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Erazor AI Pricing Plans - Background Remover',
        type: 'image/jpeg'
      }
    ],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans - AI Background Remover | Erazor AI',
    description:
      'Start free with 5 images per month. Upgrade to Pro or Business plans for unlimited AI background removal and advanced features.',
    images: ['/og-image.jpg'],
    creator: '@erazor_ai',
    site: '@erazor_ai'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: '/pricing'
  },
  other: {
    'price-range': 'Free - $29/month',
    'payment-accepted': 'Visa, Mastercard, American Express, PayPal'
  }
};

export default function PricingPage() {
  return (
    <MainLayout>
      {/* Structured Data for Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Erazor AI Background Remover',
            description: 'AI-powered background removal tool with multiple pricing plans',
            brand: {
              '@type': 'Brand',
              name: 'Erazor AI'
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Free Plan',
                description: 'Basic background removal with 5 images per month',
                price: '0',
                priceCurrency: 'USD',
                billingIncrement: 'Monthly',
                eligibleQuantity: {
                  '@type': 'QuantitativeValue',
                  value: 5,
                  unitText: 'images per month'
                }
              },
              {
                '@type': 'Offer',
                name: 'Pro Plan',
                description: 'Unlimited background removal with advanced features',
                price: '9.99',
                priceCurrency: 'USD',
                billingIncrement: 'Monthly',
                eligibleQuantity: {
                  '@type': 'QuantitativeValue',
                  value: -1,
                  unitText: 'unlimited images'
                }
              },
              {
                '@type': 'Offer',
                name: 'Business Plan',
                description: 'Enterprise solution with API access and bulk processing',
                price: '29.99',
                priceCurrency: 'USD',
                billingIncrement: 'Monthly',
                eligibleQuantity: {
                  '@type': 'QuantitativeValue',
                  value: -1,
                  unitText: 'unlimited images with API'
                }
              }
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '2547',
              bestRating: '5',
              worstRating: '1'
            }
          })
        }}
      />

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much does Erazor AI background remover cost?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Erazor AI offers a free plan with 5 images per month, Pro plan at $9.99/month for unlimited images, and Business plan at $29.99/month with API access and enterprise features.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I cancel my subscription anytime?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can cancel your subscription at any time. There are no long-term commitments or cancellation fees.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is there a free trial available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our free plan allows you to process 5 images per month without any cost. You can also try Pro and Business features with our money-back guarantee.'
                }
              },
              {
                '@type': 'Question',
                name: 'What payment methods do you accept?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and other secure payment methods through our payment processor.'
                }
              }
            ]
          })
        }}
      />
      <div className='bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] bg-background relative flex h-full w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center'>

        <Spotlight
          className='-top-40 left-0 md:-top-20 md:left-60'
          fill='white'
        />
        <Pricing />
      </div>
      <PricingFAQ />
    </MainLayout>
  );
}
