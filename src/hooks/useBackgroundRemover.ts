import { useImageSocket } from '@/hooks/useImageSocket';
import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

interface UseBackgroundRemoverProps {
    hasActiveSubscription: boolean | null;
    onAnimateReset: (onComplete: () => void) => void;
    onAnimateUploadAreaIn: () => void;
    onAnimateDownloadButton: () => void;
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
}

export const useBackgroundRemover = ({
    hasActiveSubscription,
    onAnimateReset,
    onAnimateUploadAreaIn,
    onAnimateDownloadButton
}: UseBackgroundRemoverProps): UseBackgroundRemoverReturn => {
    const { userId, getToken } = useAuth();
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');

    const { imageUpdates, clearImageUpdates } = useImageSocket(userId!);

    // Process image updates from socket
    useEffect(() => {
        // Only process image updates if we're currently processing or have files
        if (!isProcessing && !files.length) return;

        const readyImages = imageUpdates.filter(
            (img: any) => img.status === 'ready'
        );

        if (readyImages.length > 0 && isProcessing) {
            // Get the most recent image that matches our current upload
            const latestImage = readyImages[readyImages.length - 1];
            setCurrentImage(latestImage);
            setIsProcessing(false);
        }
    }, [imageUpdates, isProcessing, files.length]);

    const handleFileUpload = useCallback(async (uploadFiles: File[]): Promise<void> => {
        // Check subscription before allowing upload
        if (!hasActiveSubscription) {
            // Don't upload if no active subscription - banner will show the message
            return;
        }

        const file = uploadFiles[0];
        if (!file) return;

        // Clear any previous state first
        setCurrentImage(null);
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
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error('File upload error:', error);
            setIsProcessing(false);
            // Could add error state here if needed
        } finally {
            setIsUploading(false);
        }
    }, [hasActiveSubscription, originalImageUrl, clearImageUpdates, getToken]);

    const handleReset = useCallback(() => {
        onAnimateReset(() => {
            // Clear all state completely
            setFiles([]);
            setCurrentImage(null);
            setOriginalImageUrl('');
            setIsUploading(false);
            setIsProcessing(false);
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
        clearImageUpdates
    };
};
