import { useImageSocket } from '@/hooks/useImageSocket';
import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

interface UseBackgroundRemoverProps {
    hasActiveSubscription: boolean | null;
    onAnimateReset: (onComplete: () => void) => void;
    onAnimateUploadAreaIn: () => void;
    onAnimateDownloadButton: () => void;
    onUsageLimitReached?: () => void;
}

interface UseBackgroundRemoverReturn {
    files: File[];
    isUploading: boolean;
    isProcessing: boolean;
    currentImage: any;
    originalImageUrl: string;
    handleFileUpload: (files: File[]) => Promise<void>;
    handleReset: () => void;
    handleDownload: () => void;
    imageUpdates: any[];
    clearImageUpdates: () => void;
    error: string | null;
    isUsageLimitReached: boolean;
}

export const useBackgroundRemover = ({
    hasActiveSubscription,
    onAnimateReset,
    onAnimateUploadAreaIn,
    onAnimateDownloadButton,
    onUsageLimitReached
}: UseBackgroundRemoverProps): UseBackgroundRemoverReturn => {
    const { userId, getToken } = useAuth();
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isUsageLimitReached, setIsUsageLimitReached] = useState(false);

    // Only connect to socket when userId is available - use empty string to prevent connection if no userId
    const socketUserId = userId || '';
    const { imageUpdates, clearImageUpdates } = useImageSocket(socketUserId);

    // Process image updates from socket
    useEffect(() => {
        console.log('🔍 Dashboard BG Remover - Processing updates:', {
            imageUpdates: imageUpdates.length,
            isProcessing,
            filesLength: files.length,
            userId: socketUserId
        });

        // Only process image updates if we're currently processing or have files
        if (!isProcessing && !files.length) return;

        const readyImages = imageUpdates.filter(
            (img: any) => img.status === 'ready'
        );

        const failedImages = imageUpdates.filter(
            (img: any) => img.status === 'failed' || img.status === 'error'
        );

        console.log('📊 Dashboard BG Remover - Image status:', {
            ready: readyImages.length,
            failed: failedImages.length,
            allUpdates: imageUpdates
        });

        if (readyImages.length > 0 && isProcessing) {
            // Get the most recent image that matches our current upload
            const latestImage = readyImages[readyImages.length - 1];
            console.log('✅ Dashboard BG Remover - Setting current image:', latestImage);
            setCurrentImage(latestImage);
            setIsProcessing(false);

            // Clear any errors since processing was successful
            setError(null);
            setIsUsageLimitReached(false);
        } else if (failedImages.length > 0 && isProcessing) {
            // Handle failed processing
            const failedImage = failedImages[failedImages.length - 1];
            console.error('❌ Dashboard BG Remover - Image processing failed:', failedImage);
            setError('Background removal failed. Please try again.');
            setIsProcessing(false);
        }
    }, [imageUpdates, isProcessing, files.length, socketUserId]);

    const handleFileUpload = useCallback(async (uploadFiles: File[]): Promise<void> => {
        const file = uploadFiles[0];
        if (!file) return;

        // Clear any previous state and errors first
        setCurrentImage(null);
        setError(null);
        setIsUsageLimitReached(false);
        clearImageUpdates();

        setFiles([file]);
        setIsUploading(true);

        // Clear previous image URL to prevent memory leaks
        if (originalImageUrl) {
            URL.revokeObjectURL(originalImageUrl);
        }

        const imageUrl = URL.createObjectURL(file);
        setOriginalImageUrl(imageUrl);

        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsProcessing(true);
            const token = await getToken();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/images/process`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);

                // Check if it's a usage limit error
                if (response.status === 429 || (errorData && errorData.code === 'USAGE_LIMIT_REACHED')) {
                    setIsUsageLimitReached(true);
                    setError('Usage limit reached');
                    onUsageLimitReached?.();
                } else {
                    throw new Error(errorData?.message || 'Failed to upload file');
                }
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'File upload error';
            console.error('File upload error:', err);
            setError(errorMessage);
            setIsProcessing(false);
        } finally {
            setIsUploading(false);
        }
    }, [originalImageUrl, clearImageUpdates, getToken, onUsageLimitReached]);

    const handleReset = useCallback(() => {
        onAnimateReset(() => {
            // Clear all state completely
            setFiles([]);
            setCurrentImage(null);
            setOriginalImageUrl('');
            setIsUploading(false);
            setIsProcessing(false);
            setError(null);
            setIsUsageLimitReached(false);
            clearImageUpdates();

            // Clear any URLs to prevent memory leaks
            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }

            // Animate in upload area
            onAnimateUploadAreaIn();
        });
    }, [onAnimateReset, onAnimateUploadAreaIn, originalImageUrl, clearImageUpdates]);

    const handleDownload = useCallback(() => {
        if (currentImage?.bgRemovedImageUrlHQ || currentImage?.bgRemovedImageUrlLQ) {
            // Add download animation
            onAnimateDownloadButton();

            const link = document.createElement('a');
            link.href = currentImage.bgRemovedImageUrlHQ || currentImage.bgRemovedImageUrlLQ;
            link.download = `${currentImage.originalFileName}_no_bg.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [currentImage, onAnimateDownloadButton]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }
        };
    }, [originalImageUrl]);

    return {
        files,
        isUploading,
        isProcessing,
        currentImage,
        originalImageUrl,
        handleFileUpload,
        handleReset,
        handleDownload,
        imageUpdates,
        clearImageUpdates,
        error,
        isUsageLimitReached
    };
};
