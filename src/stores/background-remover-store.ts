import { uploadImage } from "@/lib/api/background-remover";
import { toast } from "sonner";
import { create } from "zustand";

type ProcessingState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error';

interface BackgroundRemoverState {
    state: ProcessingState;
    originalImage: string | null;
    processedImage: string | null;
    progress: number;
    error: string | null;
    showUsageLimitDialog: boolean;


    setState: (s: ProcessingState) => void;
    setOriginalImage: (url: string | null) => void;
    setProcessedImage: (url: string | null) => void;
    setProgress: (p: number) => void;
    setError: (e: string | null) => void;
    reset: () => void;
    setShowUsageLimitDialog: (show: boolean) => void;
    connectSSE: (userId: string) => void;
    downloadPhoto: () => void;
    fileUpload: (files: File[]) => Promise<any>;
}

export const useBackgroundRemoverStore = create<BackgroundRemoverState>((set, get) => ({
    state: "idle",
    originalImage: null,
    processedImage: null,
    progress: 0,
    error: null,
    showUsageLimitDialog: false,


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

    connectSSE: (userId: string) => {
        if (!userId) {
            console.warn('Cannot connect SSE: No user identifier provided');
            return;
        }

        let retries = 0;
        function start() {
            const es = new EventSource(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}/${userId}`, {
                withCredentials: true,
            });
            es.onopen = () => { retries = 0 };
            es.onmessage = (event) => {
                set({ processedImage: JSON.parse(event.data).bgRemovedImageUrlHQ || JSON.parse(event.data).bgRemovedImageUrlLQ });
                set({ state: "completed" });
                set({ progress: 100 });
                es.close();
            };
            es.onerror = () => {
                es.close();
                setTimeout(start, Math.min(1000 * 2 ** retries, 30000));
                retries++;
            };
            return es;
        }
        return start();
    },
    downloadPhoto: async () => {
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
            const response = await uploadImage(file)

            const data = await response.json()

            if (/USAGE_LIMIT_EXCEEDED/.test(data.details)) {
                toast.error("Usage limit exceeded", {
                    description: "You have reached your usage limit for background removal.",
                })
                set({ state: 'error', showUsageLimitDialog: true })
            }

            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            set({ error: errorMessage, state: 'error' })
            toast.error("Upload failed", {
                description: errorMessage
            })
        }
    }
}));
