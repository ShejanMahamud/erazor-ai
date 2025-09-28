import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Background Remover',
    description: 'Remove backgrounds from your images instantly using AI. Upload photos and get professional results in seconds with our advanced background removal tool.',
    keywords: [
        'background remover',
        'AI background removal',
        'remove background online',
        'photo editor',
        'image editing',
        'transparent background',
        'upload image',
        'photo editing'
    ],
    openGraph: {
        title: 'Background Remover | Erazor AI Dashboard',
        description: 'Remove backgrounds from your images instantly using AI. Upload photos and get professional results in seconds.',
        type: 'website'
    },
    twitter: {
        title: 'Background Remover | Erazor AI Dashboard',
        description: 'Remove backgrounds from your images instantly using AI. Upload photos and get professional results in seconds.'
    }
};

export default function BackgroundRemoverLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
