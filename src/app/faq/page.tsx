import { FAQ } from '@/components/FAQ';
import MainLayout from '@/components/layout/main-layout';
import HeadingText from '@/components/ui/heading-text';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ - Frequently Asked Questions | Erazor AI Background Remover',
    description:
        'Get answers to frequently asked questions about Erazor AI background removal service. Learn about pricing, features, file formats, processing time, and more.',
    keywords: [
        'FAQ',
        'frequently asked questions',
        'AI background remover help',
        'background removal guide',
        'Erazor AI support',
        'image processing FAQ',
        'background remover questions',
        'AI photo editing help',
        'pricing questions',
        'file format support',
        'processing time',
        'account help',
        'subscription FAQ',
        'technical support',
        'how to use background remover'
    ],
    openGraph: {
        title: 'FAQ - Frequently Asked Questions | Erazor AI Background Remover',
        description:
            'Find answers to common questions about our AI background removal service. Get help with pricing, features, technical requirements, and more.',
        url: '/faq',
        siteName: 'Erazor AI',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Erazor AI FAQ - Get Your Questions Answered',
                type: 'image/jpeg'
            }
        ],
        type: 'website',
        locale: 'en_US'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FAQ - Frequently Asked Questions | Erazor AI Background Remover',
        description:
            'Quick answers to common questions about AI background removal. Pricing, features, technical support and more.',
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
        canonical: '/faq'
    },
    other: {
        'document-type': 'FAQ Page',
        'last-updated': 'September 23, 2025',
        'content-type': 'Help & Support',
        'support-email': 'support@erazor.app'
    }
};

export default function FAQPage() {
    return (
        <MainLayout>
            {/* FAQ Page Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        name: 'Frequently Asked Questions - Erazor AI',
                        description: 'Common questions and answers about Erazor AI background removal service',
                        url: 'https://erazor.app/faq',
                        dateModified: '2025-09-23',
                        publisher: {
                            '@type': 'Organization',
                            name: 'Erazor AI',
                            url: 'https://erazor.app',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://erazor.app/logo.png'
                            }
                        }
                    })
                }}
            />

            {/* FAQ Structured Data with Actual Questions */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How accurate is the AI background removal?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Our AI achieves 99.9% accuracy in background removal. Using advanced neural networks, it can precisely identify subjects and remove backgrounds while preserving fine details like hair, fur, and complex edges.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What file formats are supported?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'We support JPG, PNG, and WEBP formats for uploads. You can download your results as high-quality PNG files with transparency or add custom backgrounds.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'How fast is the processing time?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Most images are processed in just 3 seconds! Our optimized AI models and cloud infrastructure ensure lightning-fast results without compromising quality.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Is there a file size limit?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Free users can upload files up to 10MB. Pro users get higher limits up to 50MB, and can process 4K resolution images for professional quality output.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'What happens to my uploaded images?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Your privacy is our priority. Images are processed securely and automatically deleted from our servers after 24 hours. We never store or share your content.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I cancel my subscription anytime?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes! You can cancel your subscription at any time with no cancellation fees. Your plan remains active until the end of your billing period.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Do unused credits roll over?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Yes, for paid plans, unused credits roll over to the next month so you never lose what you\'ve paid for. Free plan credits reset monthly.'
                                }
                            },
                            {
                                '@type': 'Question',
                                name: 'Can I use this for commercial purposes?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Absolutely! All our plans include commercial usage rights. You can use the processed images for business, e-commerce, marketing, and any commercial projects.'
                                }
                            }
                        ]
                    })
                }}
            />

            {/* Service Information Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Erazor AI Background Removal Service',
                        description: 'AI-powered background removal service with fast, accurate results',
                        provider: {
                            '@type': 'Organization',
                            name: 'Erazor AI',
                            url: 'https://erazor.app',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://erazor.app/logo.png'
                            }
                        },
                        serviceType: 'AI Image Processing',
                        category: 'Background Removal',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Background Removal Plans',
                            itemListElement: [
                                {
                                    '@type': 'Offer',
                                    itemOffered: {
                                        '@type': 'Service',
                                        name: 'Free Plan'
                                    }
                                },
                                {
                                    '@type': 'Offer',
                                    itemOffered: {
                                        '@type': 'Service',
                                        name: 'Pro Plan'
                                    }
                                }
                            ]
                        },
                        availableChannel: {
                            '@type': 'ServiceChannel',
                            serviceUrl: 'https://erazor.app',
                            serviceType: 'Online Service'
                        }
                    })
                }}
            />

            {/* Organization & Contact Info Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'Erazor AI',
                        url: 'https://erazor.app',
                        logo: {
                            '@type': 'ImageObject',
                            url: 'https://erazor.app/logo.png'
                        },
                        description: 'AI-powered background removal service with advanced neural networks',
                        contactPoint: [
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
                        knowsAbout: [
                            'AI Background Removal',
                            'Image Processing',
                            'Photo Editing',
                            'E-commerce Photography',
                            'Professional Photography'
                        ]
                    })
                }}
            />

            <div className='bg-background min-h-screen'>
                {/* Header */}
                <div className='border-b border-gray-200/50 bg-gradient-to-br from-orange-50 to-purple-50 pt-20 dark:border-gray-800/50 dark:from-orange-950/20 dark:to-purple-950/20'>
                    <div className='container mx-auto px-6 py-16'>
                        <div className='mx-auto max-w-4xl space-y-4 text-center'>
                            <HeadingText
                                heading='Frequently Asked'
                                focusText=' Questions'
                                headingStyles='font-manrope'
                                paragraph="Find answers to common questions about our AI background removal service and get the help you need."
                                boxStyles='mb-16'
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className='container mx-auto bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] px-6 py-16'>
                    <FAQ showHeading={false} />
                </div>
            </div>
        </MainLayout>
    );
}
