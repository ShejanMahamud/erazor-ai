"use client";
import { ImageEditor } from '@/components/ImageEditor';
import MainLayout from '@/components/layout/main-layout';
import { FileUpload } from '@/components/ui/file-upload';
import HeadingText from '@/components/ui/heading-text';
import { Suspense, useState } from 'react';

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
                <div className='my-24 flex flex-col items-center gap-10 px-5 py-16'>
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
