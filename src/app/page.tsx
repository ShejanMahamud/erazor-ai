import CTA from '@/components/CTA';
import { FAQ } from '@/components/FAQ';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import Testimonials from '@/components/Testomonials';
import { UseCases } from '@/components/UseCases';
import WhyWe from '@/components/WhyWe';
import MainLayout from '@/components/layout/main-layout';

export default async function Home() {
  return (
    <MainLayout>
      {/* Homepage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Erazor AI',
            url: 'https://erazor.app',
            description: 'AI-powered background removal tool that delivers professional results in seconds',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://erazor.app/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            },
            mainEntity: {
              '@type': 'SoftwareApplication',
              name: 'Erazor AI Background Remover',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Web Browser'
            }
          })
        }}
      />

      {/* Main Software Application Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Erazor AI - AI Background Remover',
            description: 'Professional AI-powered background removal tool. Remove backgrounds from photos instantly with precision and ease. Free online tool for e-commerce, portraits, and creative projects.',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'Web Browser',
            url: 'https://erazor.app',
            downloadUrl: 'https://erazor.app',
            softwareVersion: '2.0',
            datePublished: '2025-01-01',
            dateModified: '2025-09-21',
            author: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app',
              logo: {
                '@type': 'ImageObject',
                url: 'https://erazor.app/logo.png'
              }
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Free Plan',
                price: '0',
                priceCurrency: 'USD',
                description: '5 free background removals per month'
              },
              {
                '@type': 'Offer',
                name: 'Pro Plan',
                price: '9.99',
                priceCurrency: 'USD',
                description: 'Unlimited background removal with advanced features'
              },
              {
                '@type': 'Offer',
                name: 'Business Plan',
                price: '29.99',
                priceCurrency: 'USD',
                description: 'Enterprise solution with API access'
              }
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '12547',
              bestRating: '5',
              worstRating: '1'
            },
            featureList: [
              'AI-Powered Background Removal',
              'High-Quality Edge Detection',
              'Bulk Image Processing',
              'Multiple Output Formats',
              'API Integration',
              'Real-time Preview',
              'Transparent Backgrounds',
              'Professional Results in 3 Seconds'
            ],
            screenshot: 'https://erazor.app/screenshot.png',
            softwareRequirements: 'Modern web browser with JavaScript enabled',
            memoryRequirements: '2GB RAM recommended',
            storageRequirements: 'No local storage required - cloud-based',
            permissions: 'File upload access for image processing'
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
            description: 'Leading AI-powered background removal service trusted by thousands of users worldwide',
            foundingDate: '2025-01-01',
            sameAs: [
              'https://twitter.com/erazor_ai',
              'https://linkedin.com/company/erazor',
              'https://github.com/erazor-ai'
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                email: 'support@erazor.app',
                contactType: 'Customer Support',
                availableLanguage: 'English',
                serviceArea: 'Worldwide'
              },
              {
                '@type': 'ContactPoint',
                email: 'sales@erazor.app',
                contactType: 'Sales',
                availableLanguage: 'English'
              }
            ],
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'Global',
              addressRegion: 'Worldwide Service'
            },
            areaServed: 'Worldwide',
            knowsAbout: [
              'Artificial Intelligence',
              'Image Processing',
              'Background Removal',
              'Photo Editing',
              'Computer Vision',
              'Machine Learning'
            ]
          })
        }}
      />

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'AI Background Removal Service',
            description: 'Professional background removal service using advanced AI technology',
            provider: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            serviceType: 'Image Processing',
            areaServed: 'Worldwide',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://erazor.app',
              servicePhone: 'Available via online chat',
              serviceSmsNumber: 'N/A'
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Background Removal Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  name: 'E-commerce Product Photography',
                  description: 'Professional background removal for product images'
                },
                {
                  '@type': 'Offer',
                  name: 'Portrait Photography',
                  description: 'Clean background removal for professional headshots'
                },
                {
                  '@type': 'Offer',
                  name: 'Creative Projects',
                  description: 'Artistic background removal for creative work'
                },
                {
                  '@type': 'Offer',
                  name: 'Bulk Processing',
                  description: 'Process multiple images simultaneously'
                }
              ]
            },
            serviceOutput: {
              '@type': 'DigitalDocument',
              name: 'Background-Removed Image',
              description: 'High-quality image with transparent or custom background'
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://erazor.app'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Background Remover',
                item: 'https://erazor.app/#background-remover'
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Pricing',
                item: 'https://erazor.app/pricing'
              }
            ]
          })
        }}
      />

      {/* FAQ Schema for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How does AI background removal work?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our AI analyzes your image using advanced computer vision algorithms to accurately detect the subject and remove the background while preserving fine details like hair and edges. The process takes just 3 seconds.'
                }
              },
              {
                '@type': 'Question',
                name: 'Is Erazor AI free to use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! Erazor AI offers a free plan with 5 background removals per month. For unlimited processing and advanced features, we offer Pro and Business plans starting at $9.99/month.'
                }
              },
              {
                '@type': 'Question',
                name: 'What image formats are supported?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Erazor AI supports JPEG, PNG, WebP, and other common image formats. Output is available in PNG with transparent background or JPEG with custom backgrounds.'
                }
              },
              {
                '@type': 'Question',
                name: 'How accurate is the AI background removal?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our AI achieves 99.2% accuracy in background detection and removal, with advanced edge refinement for professional-quality results. It handles complex subjects like hair, fur, and transparent objects.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I use Erazor AI for commercial projects?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Absolutely! Erazor AI is perfect for e-commerce product photography, marketing materials, professional headshots, and any commercial use. All plans include commercial usage rights.'
                }
              }
            ]
          })
        }}
      />

      <div className='bg-background min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]'>
        <Hero />
        <HowItWorks />
        <UseCases />
        <WhyWe />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
    </MainLayout>
  );
}
