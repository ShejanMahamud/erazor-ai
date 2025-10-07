"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileUpload } from "@/components/ui/file-upload";
import { ProcessingOverlay } from "@/components/ui/processing-overlay";
import { Progress } from "@/components/ui/progress";
import { useBackgroundRemoverStore } from "@/stores/background-remover-store";
import { useSession } from "@/stores/session-store";
import { CheckCircle, Download, Loader2, MoreVertical, Pencil, RotateCcw, Sparkle } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { useShallow } from "zustand/shallow";
import PageContainer from "./layout/page-container";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Heading } from "./ui/heading";
import { ImageComparison, ImageComparisonImage, ImageComparisonSlider } from "./ui/image-comparison";

const ImageEditor = dynamic(
    () => import('./ImageEditor').then(mod => ({ default: mod.ImageEditor })),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center p-4">Loading editor...</div>
    }
);

export function BackgroundRemover({
    showHeader = true,
}: {
    showHeader?: boolean
}) {
    const [editorOpen, setEditorOpen] = useState<boolean>(false)

    const router = useRouter()
    const session = useSession(useShallow((state) => state));
    const [
        state,
        originalImage,
        processedImage,
        progress,
        error,
        showUsageLimitDialog,
        setShowUsageLimitDialog,
        fileUpload,
        downloadPhoto,
        reset,
        connectSSE,
        disconnectSSE,
        setProgress,
        setProcessedImage,
        setState
    ] = useBackgroundRemoverStore(useShallow((s) => ([
        s.state,
        s.originalImage,
        s.processedImage,
        s.progress,
        s.error,
        s.showUsageLimitDialog,
        s.setShowUsageLimitDialog,
        s.fileUpload,
        s.downloadPhoto,
        s.reset,
        s.connectSSE,
        s.disconnectSSE,
        s.setProgress,
        s.setProcessedImage,
        s.setState
    ])));

    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_IMAGE_WS_URL}/${session.userId || session.anonId}`, { withCredentials: true });

    eventSource.onmessage = (event) => {
        const imageUpdate = JSON.parse(event.data);
        setProcessedImage(imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ);
        setState('completed');
        setProgress(100);
        toast.success("Background removed successfully!", {
            description: "Your image is ready for download."
        });
        if (imageUpdate.status === 'ready') {
            eventSource.close();
        }
    };
    eventSource.onerror = (err) => {
        eventSource.close();
    };

    // useEffect(() => {
    //     if (!session.userId && !session.anonId) return;

    //     const eventSource = new EventSource(
    //         `${process.env.NEXT_PUBLIC_IMAGE_WS_URL}/${session.userId || session.anonId}`,
    //         { withCredentials: true }
    //     );

    //     eventSource.onmessage = (event) => {
    //         const imageUpdate = JSON.parse(event.data);

    //         setProcessedImage(imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ);
    //         setState("completed");
    //         setProgress(100);

    //         toast.success("Background removed successfully!", {
    //             description: "Your image is ready for download.",
    //         });

    //         if (imageUpdate.status === "ready") {
    //             eventSource.close();
    //         }
    //     };

    //     eventSource.onerror = (err) => {
    //         console.error("SSE error", err);
    //         toast.error("Error connecting to image processing service", {
    //             description: "Failed to connect to image processing service. Please try again later.",
    //         });
    //         eventSource.close();
    //     };

    //     return () => {
    //         eventSource.close();
    //     };
    // }, [session.userId, session.anonId, setProcessedImage]);

    // Simulate progress when processing starts
    useEffect(() => {
        if (state === 'processing') {
            const progressInterval = setInterval(() => {
                const currentProgress = progress;
                const newProgress = currentProgress >= 90 ? currentProgress : currentProgress + 10;
                setProgress(newProgress);
            }, 500);

            return () => {
                clearInterval(progressInterval);
            };
        }
    }, [state, progress, setProgress]);

    const handleFileUpload = async (files: File[]) => {
        fileUpload(files)
    }

    const handleDownload = async () => {
        downloadPhoto()
    }

    const handleReset = () => {
        reset()
        toast.info("Ready for new image")
    }

    const handleEditorOpen = () => {
        setEditorOpen(true)
    }

    const handleEditorClose = () => {
        setEditorOpen(false)
    }

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col space-y-6">
                <div className="flex items-end justify-between">
                    {
                        showHeader && <div className="flex-1">
                            <Heading title="Background Remover" description="Remove the background from your images with AI precision." />
                        </div>
                    }
                </div>

                {!originalImage && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                        <Suspense>
                            <FileUpload onChange={handleFileUpload} />
                        </Suspense>
                    </div>
                )}

                {/* Processing or Results Section */}
                {originalImage && (
                    <div className="space-y-6">
                        {/* Upload Loading State */}
                        {state === 'uploading' && (
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-center space-x-4">
                                        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium">Uploading image...</p>
                                            <p className="text-xs text-muted-foreground">Preparing for background removal</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Processing State */}
                        {state === 'processing' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                                        Processing Your Image
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Original Image */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium text-muted-foreground">Original Image</h4>
                                            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                                                <Image
                                                    src={originalImage}
                                                    alt="Original"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Processing Overlay */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium text-muted-foreground">AI Processing</h4>
                                            {originalImage && (
                                                <ProcessingOverlay
                                                    image={originalImage}
                                                    progress={progress}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{Math.round(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Results State */}
                        {state === 'completed' && processedImage && (
                            <Card className="border shadow-sm">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center lg:justify-between justify-center flex-col lg:flex-row gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                <CheckCircle className="h-4 w-4 text-foreground" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-foreground">
                                                    Background Removed Successfully
                                                </CardTitle>
                                                <p className="text-sm text-muted-foreground">
                                                    Your image is ready for download
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={handleDownload}
                                                className="bg-primary hover:bg-primary/90 w-full lg:w-auto"
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">More options</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => router.push('pricing')}>
                                                        <div className="flex items-center gap-2">
                                                            <Sparkle className="h-4 w-4 mr-2" />
                                                            <span className="text-sm font-medium">
                                                                Download HD
                                                            </span>
                                                        </div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={handleEditorOpen}>
                                                        <Pencil className="h-4 w-4 mr-2" />
                                                        Edit Image
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={handleReset}>
                                                        <RotateCcw className="h-4 w-4 mr-2" />
                                                        New Image
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            {editorOpen && processedImage && (
                                                <ImageEditor
                                                    handleClose={handleEditorClose}
                                                    imageSource={processedImage}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">

                                    {/* Separate Images */}
                                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium">Original Image</h4>
                                            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                                                <Image
                                                    src={originalImage}
                                                    alt="Original"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium">Background Removed</h4>
                                            <div
                                                className="aspect-square relative overflow-hidden rounded-lg"
                                                style={{
                                                    backgroundImage: `
                            linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                          `,
                                                    backgroundSize: '20px 20px',
                                                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                                }}
                                            >
                                                <Image
                                                    src={processedImage}
                                                    alt="Background removed"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    <ImageComparison className="aspect-square w-full rounded-lg" enableHover>
                                        <ImageComparisonImage
                                            src={originalImage}
                                            alt="Original Image"
                                            position="left"
                                        />
                                        <ImageComparisonImage
                                            src={processedImage}
                                            alt="Processed Image"
                                            position="right"
                                        />
                                        <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs">
                                            <div className="absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
                                        </ImageComparisonSlider>
                                    </ImageComparison>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Card className="w-full max-w-md border-red-200 bg-red-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center space-y-3 text-center">
                                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <span className="text-red-600 text-xl">⚠️</span>
                                </div>
                                <div>
                                    <h3 className="font-medium text-red-900">Upload Failed</h3>
                                    <p className="text-sm text-red-600 mt-1">Something went wrong while uploading your image. Please try again.</p>
                                </div>
                                <Button
                                    onClick={handleReset}
                                    variant="outline"
                                    className="border-red-200 text-red-700 hover:bg-red-100"
                                    size="sm"
                                >
                                    Try Again
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <AlertDialog open={showUsageLimitDialog} onOpenChange={setShowUsageLimitDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Usage Limit Reached</AlertDialogTitle>
                            <AlertDialogDescription>
                                You have reached your usage limit for background removal. Please upgrade your plan or try again later.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.push('/pricing')}>Upgrade Plan</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </PageContainer>
    )
}
