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
import { FileUpload } from "@/components/ui/file-upload"
import { useImageSocket } from "@/hooks/useImageSocket"
import { Download, ImageIcon, Loader2, RotateCcw, Sparkles, Zap } from "lucide-react"
import Image from "next/image"
import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Comparison, ComparisonHandle, ComparisonItem } from "./ui/kibo-ui/comparison"

export function BackgroundRemover({
    showHeader = true,
}: {
    showHeader?: boolean
}) {
    const [showUsageLimitDialog, setShowUsageLimitDialog] = useState(false)
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const hasShownToastRef = useRef(false)

    const { imageUpdate, connected } = useImageSocket()

    const processedImage = useMemo(() => {
        if (!imageUpdate) return null
        return imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ || null
    }, [imageUpdate])

    useEffect(() => {
        if (processedImage && !hasShownToastRef.current) {
            hasShownToastRef.current = true
            toast.success("Background removed!", {
                description: "Your image is ready to download.",
                duration: 3000,
            })
        }
    }, [processedImage])

    const handleFileUpload = async (files: File[]) => {
        if (files.length === 0) return

        const file = files[0]

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload a JPG, PNG, or WebP image.",
            })
            return
        }

        // Validate file size (max 20MB)
        const maxSize = 20 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error("File too large", {
                description: "Please upload an image smaller than 20MB.",
            })
            return
        }

        hasShownToastRef.current = false
        setIsUploading(true)

        // Create preview of original image
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string
            setOriginalImage(imageDataUrl)
        }
        reader.readAsDataURL(file)

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/api/tools/background-remover", {
                method: "POST",
                body: formData,
            })

            setIsUploading(false)

            if (!response.ok) {
                toast.error("Upload failed", {
                    description: `Something went wrong: ${response.statusText}`,
                })
                setOriginalImage(null)
                return
            }

            const data = await response.json()

            if (/USAGE_LIMIT_EXCEEDED/.test(data.details)) {
                setShowUsageLimitDialog(true)
                setOriginalImage(null)
            }

            return data
        } catch (err) {
            setIsUploading(false)
            setOriginalImage(null)
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            toast.error("Upload failed", {
                description: errorMessage,
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
            a.download = `background-removed-${Date.now()}.png`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            toast.success("Downloaded!", {
                description: "Image saved to your device.",
            })
        } catch (err) {
            toast.error("Download failed", {
                description: "Failed to download the image.",
            })
        }
    }

    const handleReset = () => {
        setOriginalImage(null)
        hasShownToastRef.current = false
    }

    const isProcessing = originalImage && !processedImage
    const showResults = originalImage && processedImage

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col bg-gradient-to-b from-background to-muted/20">
                {!originalImage && (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
                        <div className="max-w-3xl w-full text-center space-y-10 animate-in fade-in duration-700">
                            {/* Hero section */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 animate-in zoom-in duration-500">
                                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                                    Remove Background
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    100% automatic and free. Remove backgrounds from images in seconds with AI precision.
                                </p>
                            </div>

                            {/* Upload area */}
                            <div className="animate-in slide-in-from-bottom-4 duration-700 delay-150">
                                <Suspense>
                                    <FileUpload onChange={handleFileUpload} />
                                </Suspense>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-6 animate-in fade-in duration-700 delay-300">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    <span>JPG, PNG, WebP</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
                                    <Zap className="w-4 h-4 text-primary" />
                                    <span>Lightning Fast</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span>AI-Powered</span>
                                </div>
                            </div>

                            {/* Socket status indicator */}
                            {!connected && (
                                <div className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                                    <span>Connecting to server...</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12 animate-in fade-in duration-500">
                        <div className="max-w-5xl w-full space-y-8">
                            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-muted shadow-2xl border">
                                <Image
                                    src={originalImage || "/placeholder.svg"}
                                    alt="Processing"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                                <div className="absolute inset-0 bg-background/90 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
                                    <div className="text-center space-y-6 px-4">
                                        <div className="relative">
                                            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse" />
                                            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto relative" />
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-2xl font-semibold">Removing background...</p>
                                            <p className="text-base text-muted-foreground">AI is analyzing your image</p>
                                        </div>
                                        {/* Progress bar */}
                                        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden mx-auto">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full animate-[shimmer_2s_ease-in-out_infinite]"
                                                style={{ width: "70%" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showResults && (
                    <div className="flex flex-col min-h-[calc(100vh-200px)] px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="max-w-7xl w-full mx-auto space-y-8">
                            {/* Action bar */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-bold">Your Result</h2>
                                    <p className="text-sm text-muted-foreground">Drag the slider to compare original and processed</p>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <Button
                                        onClick={handleReset}
                                        variant="outline"
                                        size="lg"
                                        className="flex-1 sm:flex-none bg-transparent"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        New Image
                                    </Button>
                                    <Button
                                        onClick={handleDownload}
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none shadow-lg shadow-primary/25"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download HD
                                    </Button>
                                </div>
                            </div>

                            {/* Comparison slider */}
                            <div className="relative rounded-3xl overflow-hidden border-2 bg-card shadow-2xl animate-in zoom-in duration-500">
                                <Comparison className="aspect-video" mode="drag">
                                    <ComparisonItem position="left">
                                        <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted/50">
                                            <Image
                                                src={originalImage || "/placeholder.svg"}
                                                alt="Original"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-background/95 backdrop-blur-md rounded-full text-sm font-semibold border shadow-lg">
                                            Original
                                        </div>
                                    </ComparisonItem>
                                    <ComparisonItem position="right">
                                        <div
                                            className="relative w-full h-full"
                                            style={{
                                                backgroundImage: `
                        linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                        linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                      `,
                                                backgroundSize: "20px 20px",
                                                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                                            }}
                                        >
                                            <Image
                                                src={processedImage || "/placeholder.svg"}
                                                alt="Background Removed"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </div>
                                        <div className="absolute top-6 right-6 px-4 py-2 bg-primary/95 backdrop-blur-md rounded-full text-sm font-semibold text-primary-foreground shadow-lg">
                                            Background Removed
                                        </div>
                                    </ComparisonItem>
                                    <ComparisonHandle />
                                </Comparison>
                            </div>

                            {/* Info cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-150">
                                <div className="group p-6 rounded-2xl border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">AI Precision</p>
                                            <p className="text-sm text-muted-foreground">Advanced edge detection</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group p-6 rounded-2xl border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Download className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">High Quality</p>
                                            <p className="text-sm text-muted-foreground">Full resolution output</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group p-6 rounded-2xl border bg-gradient-to-br from-card to-card/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <ImageIcon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base">PNG Format</p>
                                            <p className="text-sm text-muted-foreground">Transparent background</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
