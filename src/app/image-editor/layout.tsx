import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Image Editor - Background Removal & Photo Enhancement | Erazor AI',
    description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools. Edit your photos with precision and create stunning visuals in seconds.',
    keywords: [
        'image editor',
        'photo editor',
        'AI image editing',
        'photo enhancement',
        'image manipulation',
        'advanced editing tools',
        'professional photo editing',
        'online image editor',
        'background removal editor',
        'photo retouching',
        'image cropping',
        'photo filters',
        'AI photo enhancement',
        'online photo editor',
        'free image editor'
    ],
    openGraph: {
        title: 'AI Image Editor - Background Removal & Photo Enhancement | Erazor AI',
        description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools. Edit your photos with precision and create stunning visuals.',
        url: '/image-editor',
        siteName: 'Erazor AI',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Erazor AI Image Editor - AI-Powered Photo Editing',
                type: 'image/jpeg'
            }
        ],
        type: 'website',
        locale: 'en_US'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AI Image Editor - Background Removal & Photo Enhancement | Erazor AI',
        description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools. Edit your photos with precision.',
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
        canonical: '/image-editor'
    }
};

export default function ImageEditorLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
