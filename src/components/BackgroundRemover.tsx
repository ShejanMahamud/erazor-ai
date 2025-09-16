'use client';

import PageContainer from '@/components/layout/page-container';
import { FileUpload } from '@/components/ui/file-upload';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useAnonImageSocket } from '@/hooks/useAnonImageSocket';
import { gsap } from 'gsap';
import { Download, Loader2, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export function BackgroundRemover() {
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
    const [userId, setUserId] = useState<string | null>(null);

    // GSAP refs
    const containerRef = useRef<HTMLDivElement>(null);
    const uploadAreaRef = useRef<HTMLDivElement>(null);
    const processingRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const beforeImageRef = useRef<HTMLImageElement>(null);
    const afterImageRef = useRef<HTMLImageElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const [imageUpdates, setImageUpdates] = useState<any[]>([]);

    // Move hook call to top level - hooks cannot be called inside useEffect
    const { imageUpdates: socketImageUpdates, clearImageUpdates } = useAnonImageSocket(userId || undefined);


    useEffect(() => {
        setImageUpdates(socketImageUpdates);
    }, [socketImageUpdates]);

    useEffect(() => {

        if (!isProcessing && !files.length) return;

        const readyImages = imageUpdates.filter(
            (img: any) => img.status === 'ready'
        );

        const failedImages = imageUpdates.filter(
            (img: any) => img.status === 'failed' || img.status === 'error'
        );

        if (readyImages.length > 0 && isProcessing) {
            // Get the most recent image that matches our current upload
            const latestImage = readyImages[readyImages.length - 1];
            setCurrentImage(latestImage);
            setIsProcessing(false);
            // Show success toast
            toast.success('Background removed successfully!', {
                description: 'Your image is ready for download.'
            });
        } else if (failedImages.length > 0 && isProcessing) {
            // Handle failed processing
            const failedImage = failedImages[failedImages.length - 1];
            console.error('Image processing failed:', failedImage);

            toast.error('Background removal failed', {
                description: failedImage.error || 'Unable to process the image. Please try again with a different image.'
            });

            setIsProcessing(false);
            // Reset states on processing failure
            setFiles([]);
            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }
            setOriginalImageUrl('');
        }
    }, [imageUpdates, isProcessing, files.length, originalImageUrl]);

    // GSAP Animation Effects
    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
        }
    }, []);

    useEffect(() => {
        if (isUploading || isProcessing) {
            if (uploadAreaRef.current) {
                gsap.to(uploadAreaRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (processingRef.current) {
                gsap.fromTo(
                    processingRef.current,
                    { opacity: 0, scale: 0.9, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
                );

                // Animated loading bar
                const progressBar =
                    processingRef.current.querySelector('.progress-bar');
                if (progressBar) {
                    gsap.fromTo(
                        progressBar,
                        { width: '0%' },
                        {
                            width: isUploading ? '30%' : '70%',
                            duration: 1.5,
                            ease: 'power2.inOut',
                            repeat: -1,
                            yoyo: true
                        }
                    );
                }
            }
        }
    }, [isUploading, isProcessing]);

    useEffect(() => {
        if (currentImage && !isProcessing && !isUploading) {
            // Hide processing view
            if (processingRef.current) {
                gsap.to(processingRef.current, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            // Show results with animation
            if (resultsRef.current) {
                gsap.fromTo(
                    resultsRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 }
                );
            }

            // Animate buttons
            if (buttonsRef.current) {
                gsap.fromTo(
                    buttonsRef.current.children,
                    { opacity: 0, x: 20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power2.out',
                        delay: 0.5
                    }
                );
            }

            // Animate images with reveal effect
            if (beforeImageRef.current) {
                gsap.fromTo(
                    beforeImageRef.current,
                    { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.6
                    }
                );
            }

            if (afterImageRef.current) {
                gsap.fromTo(
                    afterImageRef.current,
                    {
                        opacity: 0,
                        clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
                    },
                    {
                        opacity: 1,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                        duration: 0.8,
                        ease: 'power2.out',
                        delay: 0.8
                    }
                );
            }
        }
    }, [currentImage, isProcessing, isUploading]);

    const handleFileUpload = async (file: File[]) => {
        // Validate file
        if (!file || file.length === 0) {
            toast.error('No file selected', {
                description: 'Please select an image file to upload.'
            });
            return;
        }

        const selectedFile = file[0];

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(selectedFile.type)) {
            toast.error('Invalid file type', {
                description: 'Please upload a JPG, PNG, or WebP image file.'
            });
            return;
        }

        // Validate file size (e.g., max 10MB)
        const maxSize = 20 * 1024 * 1024; // 10MB in bytes
        if (selectedFile.size > maxSize) {
            toast.error('File too large', {
                description: 'Please upload an image smaller than 10MB.'
            });
            return;
        }

        // Clear any previous state first
        setCurrentImage(null);
        setFiles([selectedFile]);
        setIsUploading(true);
        setImageUpdates([]); // Clear previous image updates

        // Clear socket updates if available
        if (clearImageUpdates) {
            clearImageUpdates();
        }

        // Clear previous image URL to prevent memory leaks
        if (originalImageUrl) {
            URL.revokeObjectURL(originalImageUrl);
        }

        const imageUrl = URL.createObjectURL(selectedFile);
        setOriginalImageUrl(imageUrl);

        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            setIsProcessing(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/images/process`,
                {
                    method: 'POST',
                    credentials: "include",
                    body: formData,
                }
            );
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                const errorMessage = errorData.message || `Server error: ${res.status}`;
                throw new Error(errorMessage);
            }
            const data = await res.json();
            setUserId(data.data.anonId);
            // Show upload success toast
            toast.success('Image uploaded successfully!', {
                description: 'Processing background removal...'
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
            console.error('Upload error:', error);
            toast.error('Upload failed', {
                description: errorMessage
            });
            setIsProcessing(false);
            // Reset states on error
            setFiles([]);
            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }
            setOriginalImageUrl('');
        } finally {
            setIsUploading(false);
        }
    };

    const handleReset = () => {
        // Store the current URL for cleanup before state changes
        const currentUrl = originalImageUrl;

        // Clear state immediately to prevent showing previous results
        setFiles([]);
        setCurrentImage(null);
        setOriginalImageUrl('');
        setIsUploading(false);
        setIsProcessing(false);
        setUserId(null);
        setImageUpdates([]);

        // Clear socket updates if available
        if (clearImageUpdates) {
            clearImageUpdates();
        }

        // Clear any URLs to prevent memory leaks
        if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
        }

        // Animate out current content before reset
        if (resultsRef.current) {
            gsap.to(resultsRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    // Animate in upload area
                    if (uploadAreaRef.current) {
                        gsap.fromTo(
                            uploadAreaRef.current,
                            { opacity: 0, scale: 0.95 },
                            { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                        );
                    }

                    // Show reset success toast
                    toast.success('Ready for new image!', {
                        description: 'You can now upload another image to process.'
                    });
                }
            });
        } else {
            // Show reset success toast
            toast.success('Ready for new image!', {
                description: 'You can now upload another image to process.'
            });
        }
    };

    const handleDownload = () => {
        if (currentImage?.bgRemovedImageUrlHQ || currentImage?.bgRemovedImageUrlLQ) {
            try {
                // Add download animation
                if (buttonsRef.current) {
                    const downloadBtn = buttonsRef.current.querySelector('button');
                    if (downloadBtn) {
                        gsap.to(downloadBtn, {
                            scale: 0.95,
                            duration: 0.1,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.inOut'
                        });
                    }
                }

                const link = document.createElement('a');
                link.href = currentImage.bgRemovedImageUrlHQ || currentImage.bgRemovedImageUrlLQ;
                link.download = `${currentImage.originalFileName}_no_bg.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Show success toast
                toast.success('Download started!', {
                    description: 'Your image with removed background is being downloaded.'
                });
            } catch (error) {
                console.error('Download error:', error);
                toast.error('Download failed', {
                    description: 'Unable to download the image. Please try again.'
                });
            }
        } else {
            toast.error('Download unavailable', {
                description: 'No processed image available for download.'
            });
        }
    };

    return (
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <Suspense
                    fallback={
                        <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
                    }
                >
                    <div
                        ref={containerRef}
                        className='mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 p-8 dark:border-neutral-800'
                    >
                        {!files.length &&
                            !isUploading &&
                            !isProcessing &&
                            !currentImage && (
                                <div
                                    ref={uploadAreaRef}
                                    className='flex min-h-80 flex-col items-center justify-center'
                                >
                                    <FileUpload onChange={handleFileUpload} preview={true} />
                                    <p className='text-muted-foreground mt-4 text-sm'>
                                        Upload an image to remove its background
                                    </p>
                                </div>
                            )}

                        {(isUploading || isProcessing) && (
                            <div
                                ref={processingRef}
                                className='flex min-h-80 flex-col items-center justify-center space-y-6'
                            >
                                <div className='relative'>
                                    <Loader2 className='text-primary h-16 w-16 animate-spin' />
                                </div>
                                <div className='space-y-2 text-center'>
                                    <h3 className='text-lg font-semibold'>
                                        {isUploading
                                            ? 'Uploading image...'
                                            : 'Removing background...'}
                                    </h3>
                                    <p className='text-muted-foreground text-sm'>
                                        {isUploading
                                            ? 'Please wait while we upload your image'
                                            : 'AI is processing your image, this may take a few moments'}
                                    </p>
                                </div>
                                <div className='bg-secondary h-2 w-full max-w-xs rounded-full'>
                                    <div
                                        className='progress-bar bg-primary h-2 animate-pulse rounded-full'
                                        style={{ width: isUploading ? '30%' : '70%' }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {currentImage && originalImageUrl && (
                            <div ref={resultsRef} className='space-y-6'>


                                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                                    {/* Before */}
                                    <div className='space-y-3'>
                                        <h4 className='text-center text-sm font-medium'>Before</h4>
                                        <div className='relative flex min-h-80 items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                                            <Image
                                                ref={beforeImageRef}
                                                src={originalImageUrl || '/placeholder.svg'}
                                                alt='Original'
                                                width={500}
                                                height={400}
                                                className='max-h-72 max-w-full rounded-lg object-contain shadow-sm'
                                                priority
                                            />
                                        </div>
                                    </div>

                                    {/* After */}
                                    <div className='space-y-3'>
                                        <h4 className='text-center text-sm font-medium'>After</h4>
                                        <div
                                            className='relative flex min-h-80 items-center justify-center rounded-lg bg-transparent p-4'
                                            style={{
                                                backgroundImage: `linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)`,
                                                backgroundSize: '20px 20px',
                                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                            }}
                                        >
                                            <Image
                                                ref={afterImageRef}
                                                src={
                                                    currentImage.bgRemovedImageUrlHQ ||
                                                    currentImage.bgRemovedImageUrlLQ ||
                                                    '/placeholder.svg'
                                                }
                                                alt='Background Removed'
                                                width={500}
                                                height={400}
                                                className='max-h-72 max-w-full rounded-lg object-contain shadow-sm'
                                                priority
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='text-muted-foreground text-center text-sm'>
                                    Original filename: {currentImage.originalFileName}
                                </div>
                                <div className='w-full mx-auto flex items-center justify-between'>

                                    <div ref={buttonsRef} className='flex gap-2 w-full justify-center'>
                                        <Button
                                            onClick={handleDownload}
                                            className='flex items-center gap-2'
                                        >
                                            <Download className='h-4 w-4' />
                                            Download
                                        </Button>
                                        <Button
                                            variant='outline'
                                            onClick={handleReset}
                                            className='flex items-center gap-2 bg-transparent'
                                        >
                                            <RotateCcw className='h-4 w-4' />
                                            New Image
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Suspense>
            </div>
        </PageContainer>
    );
}
