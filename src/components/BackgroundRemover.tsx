"use client"
import PageContainer from "@/components/layout/page-container"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FileUpload } from "@/components/ui/file-upload"
import { ProcessingOverlay } from "@/components/ui/processing-overlay"
import { Progress } from "@/components/ui/progress"
import { useImageSocket } from "@/hooks/useImageSocket"
import { CheckCircle, Download, ImageIcon, Loader2, MoreVertical, Pencil, RotateCcw } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner"
import { ImageEditor } from "./ImageEditor"
import { Heading } from "./ui/heading"


export function BackgroundRemover({
    showHeader = true,
}: {
    showHeader?: boolean
}) {
    const [editorOpen, setEditorOpen] = useState<boolean>(false)
    const [showUsageLimitDialog, setShowUsageLimitDialog] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [processedImage, setProcessedImage] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const { imageUpdate } = useImageSocket()
    const router = useRouter()
    useEffect(() => {
        if (!imageUpdate) return;

        // Server ensures imageUpdate is always "ready" status
        const processedImageUrl = imageUpdate?.bgRemovedImageUrlHQ || imageUpdate?.bgRemovedImageUrlLQ;

        if (processedImageUrl) {
            setProcessedImage(processedImageUrl);
            setIsProcessing(false);
            setProgress(100);
            setShowResults(true);
            toast.success("Background removed successfully!", {
                description: "Your image is ready for download."
            });
        }
    }, [imageUpdate]);

    // Simulate progress when processing starts
    useEffect(() => {
        if (isProcessing && !showResults) {
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev >= 90 ? prev : prev + 10;
                    return newProgress;
                });
            }, 500);

            return () => {
                clearInterval(progressInterval);
            };
        }
    }, [isProcessing, showResults]);

    const handleFileUpload = async (files: File[]) => {
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

        // Reset states
        setError(null)
        setProcessedImage(null)
        setProgress(0)
        setIsProcessing(false)
        setShowResults(false)
        setIsUploading(true)

        // Create preview of original image immediately
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string;
            setOriginalImage(imageDataUrl)
            setIsUploading(false)
            setIsProcessing(true)
            setProgress(10) // Start with initial progress
            toast.success('Image uploaded successfully!', {
                description: 'Processing background removal...'
            })
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/tools/background-remover", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                setIsProcessing(false)
                setIsUploading(false)
                setError("Upload failed")
                return toast.error("Upload failed", {
                    description: `Something went wrong: ${response.statusText}`
                })
            }

            const data = await response.json()

            if (/USAGE_LIMIT_EXCEEDED/.test(data.details)) {
                toast.error("Usage limit exceeded", {
                    description: "You have reached your usage limit for background removal.",
                    action: {
                        label: "Upgrade Plan",
                        onClick: () => router.push("/pricing")
                    }
                })
                setIsProcessing(false)
                setIsUploading(false)
                setShowUsageLimitDialog(true)
            }

            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            setError(errorMessage)
            setIsProcessing(false)
            setIsUploading(false)
            toast.error("Upload failed", {
                description: errorMessage
            })
        }
    }

    const handleDownload = async () => {
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
    }

    const handleReset = () => {
        setOriginalImage(null)
        setProcessedImage(null)
        setProgress(0)
        setError(null)
        setIsProcessing(false)
        setIsUploading(false)
        setShowResults(false)
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

                {imageUpdate && <Image
                    src={imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ}
                    alt="Processed"
                    className="w-full h-full object-contain"
                />}


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
                        {isUploading && (
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
                        {!imageUpdate && (
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
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>

                                        {/* Processing Overlay */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium text-muted-foreground">AI Processing</h4>
                                            <ProcessingOverlay
                                                image={originalImage}
                                                progress={progress}
                                            />
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
                        {imageUpdate && (
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
                                                        <Pencil className="h-4 w-4 mr-2" />
                                                        Download HD
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

                                            {editorOpen && (
                                                <ImageEditor
                                                    handleClose={handleEditorClose}
                                                    imageSource={imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">

                                    {/* Separate Images */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium">Original Image</h4>
                                            <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                                                <Image
                                                    src={originalImage}
                                                    alt="Original"
                                                    className="w-full h-full object-contain"
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
                                                    src={imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ}
                                                    alt="Background removed"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Card className="border-destructive">
                        <CardContent className="p-6">
                            <div className="flex items-center space-x-2 text-destructive">
                                <ImageIcon className="h-5 w-5" />
                                <div>
                                    <p className="text-sm font-medium">Error: {error}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Please try again or contact support if the problem persists.
                                    </p>
                                </div>
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
                            <AlertDialogAction>Upgrade Plan</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </PageContainer>
    )
}
