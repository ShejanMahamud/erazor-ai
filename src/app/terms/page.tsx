import MainLayout from '@/components/layout/main-layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - AI Background Remover | Erazor AI',
  description:
    'Read the terms and conditions for using Erazor AI background removal service. Clear guidelines for acceptable use, payment terms, privacy, and user rights.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'AI background remover terms',
    'user agreement',
    'service agreement',
    'acceptable use policy',
    'background removal terms',
    'photo editing terms',
    'AI service terms',
    'subscription terms',
    'payment terms',
    'refund policy',
    'user rights',
    'service limitations',
    'legal agreement'
  ],
  openGraph: {
    title: 'Terms of Service - AI Background Remover | Erazor AI',
    description:
      'Clear and comprehensive terms of service for Erazor AI background removal. Learn about acceptable use, payment terms, and your rights as a user.',
    url: '/terms',
    siteName: 'Erazor AI',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Erazor AI Terms of Service - Legal Agreement',
        type: 'image/jpeg'
      }
    ],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - AI Background Remover | Erazor AI',
    description:
      'Transparent terms of service for AI background removal. Clear guidelines on usage, payments, and user rights.',
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
    canonical: '/terms'
  },
  other: {
    'document-type': 'Terms of Service',
    'last-updated': 'September 14, 2025',
    'governing-law': 'International',
    'refund-period': '30 days'
  }
};

export default function TermsOfServicePage() {
  return (
    <MainLayout>
      {/* Structured Data for Terms of Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms of Service - Erazor AI',
            description: 'Terms and conditions for using Erazor AI background removal service',
            url: 'https://erazor.app/terms',
            dateModified: '2025-09-14',
            publisher: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            mainEntity: {
              '@type': 'Article',
              headline: 'Terms of Service',
              datePublished: '2025-09-14',
              dateModified: '2025-09-14',
              author: {
                '@type': 'Organization',
                name: 'Erazor AI'
              },
              publisher: {
                '@type': 'Organization',
                name: 'Erazor AI',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://erazor.app/logo.png'
                }
              }
            }
          })
        }}
      />

      {/* Service Agreement Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Erazor AI Background Removal Service',
            description: 'AI-powered background removal service with clear terms and conditions',
            provider: {
              '@type': 'Organization',
              name: 'Erazor AI',
              url: 'https://erazor.app'
            },
            termsOfService: 'https://erazor.app/terms',
            serviceType: 'AI Image Processing',
            areaServed: 'Worldwide',
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceUrl: 'https://erazor.app',
              servicePhone: 'Available via support',
              serviceSmsNumber: 'N/A'
            }
          })
        }}
      />

      {/* FAQ Structured Data for Terms */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What are the acceptable uses for Erazor AI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can use Erazor AI for e-commerce product photography, professional headshots, creative projects, social media content, marketing materials, and educational purposes. Commercial use is allowed.'
                }
              },
              {
                '@type': 'Question',
                name: 'What is your refund policy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We offer refunds for unused subscription time within 30 days of purchase. Pay-per-image charges are generally non-refundable unless there was a technical error on our part.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I use Erazor AI for commercial purposes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can use Erazor AI for commercial purposes including e-commerce, marketing, and professional photography. You retain all rights to your processed images.'
                }
              },
              {
                '@type': 'Question',
                name: 'What are the usage limits?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Free accounts have monthly processing limits. Pro and Business plans offer unlimited processing. We have rate limits on API requests and a maximum file size of 10MB per image.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can you terminate my account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We may terminate or suspend accounts that violate our Terms of Service or engage in prohibited activities such as uploading inappropriate content or exceeding usage limits.'
                }
              }
            ]
          })
        }}
      />

      {/* Legal Organization Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Erazor AI',
            url: 'https://erazor.app',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                email: 'legal@erazor.app',
                contactType: 'Legal Department',
                availableLanguage: 'English'
              },
              {
                '@type': 'ContactPoint',
                email: 'support@erazor.app',
                contactType: 'Customer Support',
                availableLanguage: 'English'
              }
            ],
            sameAs: [
              'https://twitter.com/erazor_ai',
              'https://linkedin.com/company/erazor'
            ],
            termsOfService: 'https://erazor.app/terms',
            privacyPolicy: 'https://erazor.app/privacy'
          })
        }}
      />

      <div className='bg-background min-h-screen'>
        {/* Header */}
        <div className='border-b border-gray-200/50 bg-gradient-to-br from-orange-50 to-purple-50 pt-20 dark:border-gray-800/50 dark:from-orange-950/20 dark:to-purple-950/20'>
          <div className='container mx-auto px-6 py-16'>
            <div className='mx-auto max-w-4xl space-y-4 text-center'>
              <h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
                Terms of{' '}
                <span className='bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent'>
                  Service
                </span>
              </h1>
              <p className='text-foreground/70 text-xl leading-relaxed'>
                Please read these terms carefully before using our AI background
                removal service.
              </p>
              <div className='text-foreground/60 flex items-center justify-center gap-2 text-sm'>
                <span>Last updated:</span>
                <span className='font-medium'>September 14, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='container mx-auto bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] px-6 py-16'>
          <div className='mx-auto max-w-4xl'>
            <div className='prose prose-lg dark:prose-invert max-w-none'>
              {/* Agreement */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Agreement to Terms
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  By accessing and using Erazor AI (&ldquo;we,&rdquo;
                  &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you accept and agree
                  to be bound by the terms and provision of this agreement. If
                  you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  These Terms of Service (&ldquo;Terms&rdquo;) govern your use
                  of our AI-powered background removal service available at
                  erazor.com (the &ldquo;Service&rdquo;) operated by Erazor AI.
                </p>
              </section>

              {/* Service Description */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Service Description
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Erazor AI provides an AI-powered background removal service that
                  allows users to automatically remove backgrounds from digital
                  images. Our service includes:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    Automated background removal using artificial intelligence
                  </li>
                  <li>High-quality image processing with edge refinement</li>
                  <li>Batch processing capabilities for multiple images</li>
                  <li>API access for developers and businesses</li>
                  <li>Various output formats and quality options</li>
                </ul>
              </section>

              {/* User Accounts */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  User Accounts
                </h2>
                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Account Creation
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  To access certain features of our Service, you may be required
                  to create an account. You agree to:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your password secure and confidential</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Account Suspension
                </h3>
                <p className='text-foreground/80 leading-relaxed'>
                  We reserve the right to suspend or terminate accounts that
                  violate these Terms or engage in prohibited activities.
                </p>
              </section>

              {/* Acceptable Use */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Acceptable Use Policy
                </h2>
                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Permitted Uses
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  You may use our Service for legitimate purposes including:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>E-commerce product photography</li>
                  <li>Professional headshots and portraits</li>
                  <li>Creative and artistic projects</li>
                  <li>Social media content creation</li>
                  <li>Marketing and advertising materials</li>
                  <li>Educational and research purposes</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Prohibited Uses
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  You agree NOT to use the Service for:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Illegal, harmful, or fraudulent activities</li>
                  <li>
                    Processing images you do not own or have permission to use
                  </li>
                  <li>Creating deepfakes or misleading content</li>
                  <li>Violating intellectual property rights</li>
                  <li>Harassment, abuse, or harmful content creation</li>
                  <li>Uploading malicious files or viruses</li>
                  <li>Attempting to reverse engineer our AI technology</li>
                  <li>
                    Exceeding rate limits or attempting to overload our systems
                  </li>
                </ul>
              </section>

              {/* Content and Intellectual Property */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Content and Intellectual Property
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Your Content
                </h3>
                <div className='mb-6 rounded-xl border border-blue-200/50 bg-blue-50/50 p-6 dark:border-blue-800/50 dark:bg-blue-950/20'>
                  <ul className='text-foreground/80 list-disc space-y-2 pl-6'>
                    <li>
                      <strong>Ownership:</strong> You retain all rights to
                      images you upload
                    </li>
                    <li>
                      <strong>License:</strong> You grant us a temporary license
                      to process your images
                    </li>
                    <li>
                      <strong>Responsibility:</strong> You are responsible for
                      ensuring you have rights to uploaded content
                    </li>
                    <li>
                      <strong>Deletion:</strong> We delete your images within 24
                      hours of processing
                    </li>
                  </ul>
                </div>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Our Intellectual Property
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  The Service, including our AI models, algorithms, software,
                  and related technology, is protected by intellectual property
                  laws. You agree not to:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Copy, modify, or distribute our technology</li>
                  <li>Attempt to reverse engineer our AI models</li>
                  <li>Use our trademarks without permission</li>
                  <li>Create competing services using our technology</li>
                </ul>
              </section>

              {/* Payment and Billing */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Payment and Billing
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Pricing
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Our pricing is clearly displayed on our website. We offer:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Pay-per-image processing</li>
                  <li>Monthly and annual subscription plans</li>
                  <li>Enterprise and API pricing tiers</li>
                  <li>Free tier with limited usage</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Payment Terms
                </h3>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Payment is due immediately for pay-per-use services</li>
                  <li>Subscriptions are billed in advance</li>
                  <li>All prices are in USD unless otherwise specified</li>
                  <li>We accept major credit cards and PayPal</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Refunds
                </h3>
                <p className='text-foreground/80 leading-relaxed'>
                  We offer refunds for unused subscription time within 30 days
                  of purchase. Pay-per-image charges are generally
                  non-refundable unless there was a technical error on our part.
                </p>
              </section>

              {/* Service Availability */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Service Availability and Limitations
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Uptime and Availability
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  While we strive for 99.9% uptime, we do not guarantee
                  uninterrupted service. The Service may be temporarily
                  unavailable due to:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Scheduled maintenance</li>
                  <li>Emergency repairs</li>
                  <li>Third-party service outages</li>
                  <li>Force majeure events</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Usage Limits
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  To ensure fair usage, we may implement:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Rate limits on API requests</li>
                  <li>File size restrictions (maximum 10MB per image)</li>
                  <li>Monthly processing limits for free accounts</li>
                  <li>Temporary restrictions for abuse prevention</li>
                </ul>
              </section>

              {/* Privacy and Data */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Privacy and Data Handling
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  Your privacy is important to us. Our data handling practices
                  are detailed in our Privacy Policy. Key points include:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>
                    Uploaded images are automatically deleted within 24 hours
                  </li>
                  <li>We do not use your images to train our AI models</li>
                  <li>
                    Personal data is protected according to applicable privacy
                    laws
                  </li>
                  <li>We use industry-standard security measures</li>
                </ul>
                <p className='text-foreground/80 leading-relaxed'>
                  Please review our Privacy Policy for complete information
                  about data collection and usage.
                </p>
              </section>

              {/* Disclaimers */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Disclaimers and Limitations
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Service Disclaimer
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
                  AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM
                  ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Merchantability and fitness for a particular purpose</li>
                  <li>Accuracy or completeness of results</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security of data transmission</li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Limitation of Liability
                </h3>
                <p className='text-foreground/80 leading-relaxed'>
                  IN NO EVENT SHALL ERAZOR BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
                  INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, OR
                  OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE
                  SERVICE.
                </p>
              </section>

              {/* Indemnification */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Indemnification
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  You agree to indemnify and hold harmless Erazor AI and its
                  affiliates from any claims, damages, or expenses arising from
                  your use of the Service, violation of these Terms, or
                  infringement of any third-party rights.
                </p>
              </section>

              {/* Termination */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Termination
                </h2>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Termination by You
                </h3>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  You may terminate your account at any time by contacting us or
                  using account settings. Upon termination:
                </p>
                <ul className='text-foreground/80 mb-6 list-disc space-y-2 pl-6'>
                  <li>Your access to the Service will be discontinued</li>
                  <li>Any remaining credits may be forfeited</li>
                  <li>
                    Your data will be deleted according to our retention policy
                  </li>
                </ul>

                <h3 className='text-foreground mb-4 text-xl font-semibold'>
                  Termination by Us
                </h3>
                <p className='text-foreground/80 leading-relaxed'>
                  We may terminate or suspend your account immediately if you
                  violate these Terms or engage in prohibited activities.
                </p>
              </section>

              {/* Governing Law */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Governing Law and Dispute Resolution
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  These Terms shall be governed by and construed in accordance
                  with the laws of [Your Jurisdiction], without regard to
                  conflict of law principles.
                </p>
                <p className='text-foreground/80 leading-relaxed'>
                  Any disputes arising under these Terms shall be resolved
                  through binding arbitration in [Your Jurisdiction], except for
                  intellectual property disputes which may be brought in court.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Changes to Terms
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  We reserve the right to modify these Terms at any time. We
                  will notify users of material changes via email or prominent
                  notice on our website. Continued use of the Service after
                  changes constitutes acceptance of the updated Terms.
                </p>
              </section>

              {/* Contact Information */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Contact Information
                </h2>
                <p className='text-foreground/80 mb-4 leading-relaxed'>
                  If you have questions about these Terms of Service, please
                  contact us:
                </p>

                <div className='rounded-xl border border-gray-200/50 bg-gray-50 p-6 dark:border-gray-800/50 dark:bg-gray-900/50'>
                  <div className='space-y-3'>
                    <div>
                      <strong className='text-foreground'>Email:</strong>
                      <span className='text-foreground/80 ml-2'>
                        legal@erazor.com
                      </span>
                    </div>
                    <div>
                      <strong className='text-foreground'>Support:</strong>
                      <span className='text-foreground/80 ml-2'>
                        support@erazor.com
                      </span>
                    </div>
                    <div>
                      <strong className='text-foreground'>
                        Business Hours:
                      </strong>
                      <span className='text-foreground/80 ml-2'>
                        Monday - Friday, 9 AM - 6 PM UTC
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Severability */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Severability
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  If any provision of these Terms is found to be unenforceable
                  or invalid, that provision will be limited or eliminated to
                  the minimum extent necessary so that the remaining terms will
                  remain in full force and effect.
                </p>
              </section>

              {/* Entire Agreement */}
              <section className='mb-12'>
                <h2 className='text-foreground mb-6 text-2xl font-bold'>
                  Entire Agreement
                </h2>
                <p className='text-foreground/80 leading-relaxed'>
                  These Terms of Service, together with our Privacy Policy,
                  constitute the entire agreement between you and Erazor AI
                  concerning the Service and supersede all prior agreements and
                  understandings.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
