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
    isSocketConnected: boolean;
}

export const useBackgroundRemover = ({
    hasActiveSubscription,
    onAnimateReset,
    onAnimateUploadAreaIn,
    onAnimateDownloadButton,
    onUsageLimitReached
}: UseBackgroundRemoverProps): UseBackgroundRemoverReturn => {

    const { userId, getToken } = useAuth();
    const { connected: isSocketConnected, imageUpdate } = useImageSocket(userId || '');

    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isUsageLimitReached, setIsUsageLimitReached] = useState(false);
    const [processingTimeoutId, setProcessingTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [imageUpdates, setImageUpdates] = useState<any[]>([]);

    // Function to clear image updates
    const clearImageUpdates = useCallback(() => {
        setImageUpdates([]);
    }, []);

    // Handle socket image updates
    useEffect(() => {
        if (!imageUpdate) return;

        console.log('📨 Socket Update received:', imageUpdate);

        // Add the update to the updates array
        setImageUpdates(prev => [...prev, imageUpdate]);

        // Handle different types of updates based on your socket implementation
        switch (imageUpdate.type || imageUpdate.status) {
            case 'processing':
                console.log('🔄 Image processing update:', imageUpdate.message || imageUpdate.data);
                break;
            case 'completed':
            case 'success':
                console.log('✅ Image processing completed:', imageUpdate);
                if (imageUpdate.image || imageUpdate.data) {
                    setCurrentImage(imageUpdate.image || imageUpdate.data);
                }
                setIsProcessing(false);

                // Clear the processing timeout
                if (processingTimeoutId) {
                    clearTimeout(processingTimeoutId);
                    setProcessingTimeoutId(null);
                }
                break;
            case 'error':
            case 'failed':
                console.error('❌ Image processing error:', imageUpdate.error || imageUpdate.message);
                setError(imageUpdate.error || imageUpdate.message || 'Processing failed');
                setIsProcessing(false);

                // Clear the processing timeout
                if (processingTimeoutId) {
                    clearTimeout(processingTimeoutId);
                    setProcessingTimeoutId(null);
                }
                break;
            default:
                console.log('🔄 General socket update:', imageUpdate);
        }
    }, [imageUpdate, processingTimeoutId]);

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

            // Set a timeout to prevent infinite processing
            const timeoutId = setTimeout(() => {
                console.warn('⏰ Processing timeout - no response received after 2 minutes');
                setError('Processing timed out. Please try again.');
                setIsProcessing(false);
            }, 120000); // 2 minutes

            setProcessingTimeoutId(timeoutId);

            // Get auth token for the request
            const token = await getToken();

            const response = await fetch(
                `/api/tools/background-remover`,
                {
                    method: 'POST',
                    headers: {
                        ...(token && { Authorization: `Bearer ${token}` })
                    },
                    body: formData,
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
            } else {
                // File uploaded successfully, processing will be handled via SSE
                console.log('✅ File uploaded successfully, waiting for SSE updates...');
            }
        } catch (err) {
            // Clear the timeout on error
            if (processingTimeoutId) {
                clearTimeout(processingTimeoutId);
                setProcessingTimeoutId(null);
            }

            const errorMessage = err instanceof Error ? err.message : 'File upload error';
            console.error('File upload error:', err);
            setError(errorMessage);
            setIsProcessing(false);
        } finally {
            setIsUploading(false);
        }
    }, [originalImageUrl, clearImageUpdates, getToken, onUsageLimitReached, processingTimeoutId]);

    const handleReset = useCallback(() => {
        // Clear any existing timeout
        if (processingTimeoutId) {
            clearTimeout(processingTimeoutId);
            setProcessingTimeoutId(null);
        }

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
    }, [onAnimateReset, onAnimateUploadAreaIn, originalImageUrl, clearImageUpdates, processingTimeoutId]);

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
            // Cleanup timeout on unmount
            if (processingTimeoutId) {
                clearTimeout(processingTimeoutId);
            }

            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }
        };
    }, [originalImageUrl, processingTimeoutId]);

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
        isUsageLimitReached,
        isSocketConnected
    };
};
