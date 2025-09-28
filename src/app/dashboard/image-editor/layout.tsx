import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Image Editor',
    description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools. Edit your photos with precision.',
    keywords: [
        'image editor',
        'photo editor',
        'AI image editing',
        'photo enhancement',
        'image manipulation',
        'advanced editing tools',
        'professional photo editing',
        'online image editor'
    ],
    openGraph: {
        title: 'Image Editor | Erazor AI Dashboard',
        description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools.',
        type: 'website'
    },
    twitter: {
        title: 'Image Editor | Erazor AI Dashboard',
        description: 'Advanced AI-powered image editor with background removal, photo enhancement, and professional editing tools.'
    }
};

export default function ImageEditorLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
