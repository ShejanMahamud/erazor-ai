"use client";
import { ImageEditor } from '@/components/ImageEditor';
import PageContainer from '@/components/layout/page-container';
import { FileUpload } from '@/components/ui/file-upload';
import { Heading } from '@/components/ui/heading';
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

        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-6">
                <div className="flex items-end justify-between">

                    <div className="flex-1">
                        <Heading title="Background Remover" description="Remove the background from your images with AI precision." />
                    </div>

                </div>
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
        </PageContainer>
    );

}
