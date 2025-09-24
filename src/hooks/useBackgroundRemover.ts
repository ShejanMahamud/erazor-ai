import { serverBaseUrl } from '@/config';
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
    closeSSEConnection: () => void;
    reconnectSSE: () => void;
    isSSEConnected: boolean;
    reconnectAttempts: number;
}

export const useBackgroundRemover = ({
    hasActiveSubscription,
    onAnimateReset,
    onAnimateUploadAreaIn,
    onAnimateDownloadButton,
    onUsageLimitReached
}: UseBackgroundRemoverProps): UseBackgroundRemoverReturn => {
    console.log('🚀🚀🚀 useBackgroundRemover hook called');
    console.warn('⚠️⚠️⚠️ THIS IS A WARNING FROM useBackgroundRemover');

    const { userId, getToken } = useAuth();
    console.log('👤👤👤 Auth status:', { userId: userId ? 'exists' : 'null', isLoaded: !!userId });

    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState<any>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isUsageLimitReached, setIsUsageLimitReached] = useState(false);
    const [processingTimeoutId, setProcessingTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [imageUpdates, setImageUpdates] = useState<any[]>([]);
    const [eventSource, setEventSource] = useState<EventSource | null>(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const [maxReconnectAttempts] = useState(3);

    // Function to clear image updates
    const clearImageUpdates = useCallback(() => {
        setImageUpdates([]);
    }, []);

    // SSE connection setup with reconnection logic
    const connectSSE = useCallback(() => {
        if (!userId) return;

        console.log('🔌 Setting up SSE connection for user:', userId, `(attempt ${reconnectAttempts + 1})`);

        const es = new EventSource(`${serverBaseUrl}/images/updates/${userId}`);
        setEventSource(es);

        es.onopen = () => {
            console.log('✅ SSE connection opened');
            setReconnectAttempts(0); // Reset reconnection attempts on successful connection
        };

        es.onmessage = (event) => {
            try {
                const update = JSON.parse(event.data);
                console.log('📨 SSE Update received:', update);

                // Add the update to the updates array
                setImageUpdates(prev => [...prev, update]);

                // Handle different types of updates
                switch (update.type) {
                    case 'heartbeat':
                        // Just a keep-alive message, no action needed
                        console.log('💓 SSE heartbeat received');
                        break;
                    case 'processing':
                        console.log('🔄 Image processing update:', update.message);
                        break;
                    case 'completed':
                        console.log('✅ Image processing completed:', update);
                        setCurrentImage(update.image);
                        setIsProcessing(false);

                        // Clear the processing timeout
                        if (processingTimeoutId) {
                            clearTimeout(processingTimeoutId);
                            setProcessingTimeoutId(null);
                        }
                        break;
                    case 'error':
                        console.error('❌ Image processing error:', update.error);
                        setError(update.error);
                        setIsProcessing(false);

                        // Clear the processing timeout
                        if (processingTimeoutId) {
                            clearTimeout(processingTimeoutId);
                            setProcessingTimeoutId(null);
                        }
                        break;
                    default:
                        console.log('🔄 General update:', update);
                }
            } catch (err) {
                console.error('❌ Error parsing SSE message:', err);
            }
        };

        es.onerror = (error) => {
            console.error('❌ SSE error:', error);
            es.close();
            setEventSource(null);

            // Attempt reconnection if we haven't exceeded max attempts
            if (reconnectAttempts < maxReconnectAttempts) {
                console.log(`🔄 Attempting to reconnect SSE in 2 seconds... (${reconnectAttempts + 1}/${maxReconnectAttempts})`);
                setTimeout(() => {
                    setReconnectAttempts(prev => prev + 1);
                }, 2000);
            } else {
                console.error('❌ Max reconnection attempts reached. Please refresh the page.');
                setError('Connection lost. Please refresh the page.');
            }
        };

        return es;
    }, [userId, reconnectAttempts, maxReconnectAttempts, processingTimeoutId]);

    // Initial SSE connection and reconnection effect
    useEffect(() => {
        if (!userId) return;

        const es = connectSSE();

        return () => {
            if (es) {
                console.log('🔌 Cleaning up SSE connection');
                es.close();
                setEventSource(null);
            }
        };
    }, [userId, reconnectAttempts]);

    const handleFileUpload = useCallback(async (uploadFiles: File[]): Promise<void> => {
        const file = uploadFiles[0];
        if (!file) return;

        // Clear any previous state and errors first
        setCurrentImage(null);
        setError(null);
        setIsUsageLimitReached(false);
        setReconnectAttempts(0); // Reset reconnection attempts for new upload
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

            const response = await fetch(
                `/api/tools/background-remover`,
                {
                    method: 'POST',
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
            setReconnectAttempts(0); // Reset reconnection attempts
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

    // Function to manually close SSE connection
    const closeSSEConnection = useCallback(() => {
        if (eventSource) {
            eventSource.close();
            setEventSource(null);
            console.log('🔌 SSE connection closed manually');
        }
    }, [eventSource]);

    // Function to manually reconnect SSE
    const reconnectSSE = useCallback(() => {
        if (eventSource) {
            eventSource.close();
        }
        setEventSource(null);
        setReconnectAttempts(0);
        connectSSE();
        console.log('🔄 Manual SSE reconnection triggered');
    }, [eventSource, connectSSE]);

    // Cleanup effect
    useEffect(() => {
        return () => {
            // Cleanup timeout on unmount
            if (processingTimeoutId) {
                clearTimeout(processingTimeoutId);
            }

            // Close EventSource connection
            if (eventSource) {
                eventSource.close();
            }

            if (originalImageUrl) {
                URL.revokeObjectURL(originalImageUrl);
            }
        };
    }, [originalImageUrl, processingTimeoutId, eventSource]);

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
        closeSSEConnection,
        reconnectSSE,
        isSSEConnected: !!eventSource,
        reconnectAttempts
    };
};
