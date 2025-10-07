import { uploadImage } from "@/lib/api/background-remover";
import { toast } from "sonner";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { createStore } from "zustand/vanilla";

type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

interface BackgroundRemoverState {
    state: ProcessingState;
    originalImage: string | null;
    processedImage: string | null;
    progress: number;
    error: string | null;
    showUsageLimitDialog: boolean;
    eventSource: EventSource | null;


    setState: (s: ProcessingState) => void;
    setOriginalImage: (url: string | null) => void;
    setProcessedImage: (url: string | null) => void;
    setProgress: (p: number) => void;
    setError: (e: string | null) => void;
    reset: () => void;
    setShowUsageLimitDialog: (show: boolean) => void;
    connectSSE: (userId: string) => void;
    disconnectSSE: () => void;
    downloadPhoto: () => void;
    fileUpload: (files: File[]) => Promise<any>;
}

const backgroundRemoverStore = createStore<BackgroundRemoverState>((set, get) => ({
    state: "idle",
    originalImage: null,
    processedImage: null,
    progress: 0,
    error: null,
    showUsageLimitDialog: false,
    eventSource: null,


    setShowUsageLimitDialog: (show) => set({ showUsageLimitDialog: show }),
    setState: (s) => set({ state: s }),
    setOriginalImage: (url) => set({ originalImage: url }),
    setProcessedImage: (url) => set({ processedImage: url }),
    setProgress: (p) => set({ progress: p }),
    setError: (e) => set({ error: e }),
    reset: () => set({
        state: "idle",
        originalImage: null,
        processedImage: null,
        progress: 0,
        error: null,
    }),

    // connectSSE: (userId: string) => {
    //     if (typeof window === 'undefined') return null;

    //     if (!userId) {
    //         console.warn('Cannot connect SSE: No user identifier provided');
    //         return null;
    //     }

    //     // Close existing connection if any
    //     const existingConnection = get().eventSource;
    //     if (existingConnection) {
    //         console.log('Closing existing SSE connection before creating new one');
    //         existingConnection.close();
    //         set({ eventSource: null });
    //     }

    //     console.log('Establishing SSE connection for user:', userId);
    //     const es = new EventSource(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}/${userId}`, {
    //         withCredentials: true,
    //     });

    //     es.onopen = () => {
    //         console.log('SSE connection opened successfully for user:', userId);
    //     };

    //     es.onmessage = (event) => {
    //         console.log('SSE message received:', event.data);
    //         try {
    //             const data = JSON.parse(event.data);
    //             set({
    //                 processedImage: data.bgRemovedImageUrlHQ || data.bgRemovedImageUrlLQ,
    //                 state: "completed",
    //                 progress: 100
    //             });
    //         } catch (error) {
    //             console.error('Failed to parse SSE message:', error);
    //         }
    //         // Don't close the connection here - let the component manage it
    //     };

    //     es.onerror = (error) => {
    //         console.error('SSE connection error:', error);
    //         // Don't automatically close or retry - let the component handle reconnection
    //     };

    //     set({ eventSource: es });
    //     return es;
    // },
    connectSSE(userId) {
        const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}/${userId}`, { withCredentials: true });

        eventSource.onmessage = (event) => {
            const imageUpdate = JSON.parse(event.data);
            set({
                processedImage: imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ,
                state: "completed",
                progress: 100
            })
            toast.success("Background removed successfully!", {
                description: "Your image is ready for download."
            });
            if (imageUpdate.status === 'ready') {
                eventSource.close();
            }
        };


        eventSource.onerror = (err) => {
            console.error('SSE error', err);
        };

        set({ eventSource });
    },
    disconnectSSE: () => {
        const { eventSource } = get();
        if (eventSource) {
            console.log('Disconnecting SSE');
            eventSource.close();
            set({ eventSource: null });
        }
    },
    downloadPhoto: async () => {
        if (typeof window === 'undefined') return;

        const { processedImage, setError } = get();
        if (!processedImage) return

        try {
            const response = await fetch(processedImage)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "erazor_ai_bg-removed.png"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            toast.success("Image downloaded successfully!")
        } catch (err) {
            setError("Failed to download image")
            toast.error("Download failed", {
                description: "Failed to download the processed image."
            })
        }
    },
    fileUpload: async (files: File[]) => {
        if (typeof window === 'undefined') return;

        if (files.length === 0) return

        const file = files[0]

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            toast.error('Invalid file type', {
                description: 'Please upload a JPG, PNG, or WebP image file.'
            })
            return
        }

        // Validate file size (max 20MB)
        const maxSize = 20 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error('File too large', {
                description: 'Please upload an image smaller than 20MB.'
            })
            return
        }
        // Reset state
        set({
            error: null,
            processedImage: null,
            progress: 0,
            state: 'uploading',
        })

        // Create preview of original image immediately
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            set({ originalImage: imageDataUrl, state: 'processing', progress: 10 })
            toast.success('Image uploaded successfully!', {
                description: 'Processing background removal...'
            })
        }
        reader.readAsDataURL(file)

        try {
            const data = await uploadImage(file);

            let details: any;

            try {
                // If details is a stringified JSON, parse it
                details = typeof data?.details === 'string' ? JSON.parse(data.details) : data?.details;
            } catch (e) {
                details = data?.details; // fallback in case parsing fails
            }

            // Now check for your usage limit
            if (details?.message === "Free daily limit exceeded, please try again tomorrow or consider upgrading to a paid plan.") {
                toast.error("Usage limit exceeded", {
                    description: "You have reached your usage limit for background removal.",
                    action: {
                        label: 'Upgrade',
                        onClick: () => {
                            window.open('/pricing', '_blank');
                        }
                    }
                });

                set({ state: 'error', showUsageLimitDialog: true });
            }

            return data;

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            set({ error: errorMessage, state: 'error' })
            toast.error("Upload failed", {
                description: errorMessage
            })
        }
    }
}));

// Export the store for direct access to methods
export { backgroundRemoverStore };

// Hook with optional equality function
export function useBackgroundRemoverStore<T>(
    selector: (state: BackgroundRemoverState) => T,
    equals?: (a: T, b: T) => boolean
): T {
    return useStoreWithEqualityFn(backgroundRemoverStore, selector, equals);
}
