"use client";
import MainLayout from '@/components/layout/main-layout';
import { FileUpload } from '@/components/ui/file-upload';
import HeadingText from '@/components/ui/heading-text';
import { Spotlight } from '@/components/ui/spotlight';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

// Dynamically import ImageEditor to avoid SSR issues
const ImageEditor = dynamic(
    () => import('@/components/ImageEditor').then(mod => ({ default: mod.ImageEditor })),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center p-8">Loading editor...</div>
    }
);

export default function ImageEditorPage() {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editorOpen, setEditorOpen] = useState<boolean>(false);
    const [resetFileUpload, setResetFileUpload] = useState(false);

    const handleFileUpload = async (files: File[]) => {
        if (files.length === 0) return;

        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            setOriginalImage(imageDataUrl);
            setEditorOpen(true);
        };
        reader.readAsDataURL(file);
    };


    const handleEditorClose = () => {
        setEditorOpen(false);
        setOriginalImage(null);
        setResetFileUpload(true);
        setTimeout(() => setResetFileUpload(false), 0);
    };


    return (

        <MainLayout>
            <div className='bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] bg-background relative flex h-full w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center'>
                <Spotlight
                    className='-top-40 left-0 md:-top-20 md:left-60'
                    fill='white'
                />
                <div className='my-24 flex flex-col items-center gap-10 px-5 py-20'>
                    <HeadingText heading='Image ' focusText=' Editor' paragraph="Edit your images online in a second." />
                    {
                        originalImage && editorOpen ? (
                            <div className='w-full h-full flex items-center justify-center'>
                                <ImageEditor handleClose={handleEditorClose} imageSource={originalImage} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                                <Suspense>
                                    <FileUpload onChange={handleFileUpload} reset={resetFileUpload} preview />
                                </Suspense>
                            </div>
                        )
                    }
                </div>

            </div>
        </MainLayout>
    );

}
