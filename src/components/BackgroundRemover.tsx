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
import { Download, ImageIcon, Loader2, RotateCcw, Sparkles } from "lucide-react"
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
    const { imageUpdate } = useImageSocket()

    console.log("[v0] imageUpdate:", imageUpdate)
    console.log("[v0] originalImage:", originalImage)

    const processedImage = useMemo(() => {
        if (!imageUpdate) {
            console.log("[v0] No imageUpdate, returning null")
            return null
        }
        const result = imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ || null
        console.log("[v0] processedImage computed:", result)
        return result
    }, [imageUpdate])

    console.log("[v0] processedImage:", processedImage)
    console.log("[v0] isUploading:", isUploading)

    useEffect(() => {
        if (processedImage && !hasShownToastRef.current) {
            hasShownToastRef.current = true
            toast.success("Background removed!", {
                description: "Your image is ready to download.",
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

        // Reset state
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
                return
            }

            const data = await response.json()

            if (/USAGE_LIMIT_EXCEEDED/.test(data.details)) {
                setShowUsageLimitDialog(true)
            }

            return data
        } catch (err) {
            setIsUploading(false)
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
            a.download = "background-removed.png"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            toast.success("Downloaded!")
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

    const isProcessing = originalImage && !processedImage && !isUploading
    const showResults = originalImage && processedImage

    return (
        <PageContainer scrollable={false}>
            <div className="flex flex-1 flex-col">
                {!originalImage && (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
                        <div className="max-w-2xl w-full text-center space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                                    <Sparkles className="w-8 h-8 text-primary" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Remove Image Background</h1>
                                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                                    100% automatic and free. Remove backgrounds from images in seconds with AI precision.
                                </p>
                            </div>

                            <Suspense>
                                <FileUpload onChange={handleFileUpload} />
                            </Suspense>

                            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground pt-4">
                                <div className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" />
                                    <span>JPG, PNG, WebP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    <span>AI-Powered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
                        <div className="max-w-4xl w-full space-y-8">
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted">
                                <Image src={originalImage || "/placeholder.svg"} alt="Processing" fill className="object-contain" />
                                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                                    <div className="text-center space-y-4">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
                                        <div className="space-y-2">
                                            <p className="text-lg font-medium">Removing background...</p>
                                            <p className="text-sm text-muted-foreground">This usually takes a few seconds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showResults && (
                    <div className="flex flex-col min-h-[calc(100vh-200px)] px-4 py-8">
                        <div className="max-w-6xl w-full mx-auto space-y-6">
                            {/* Action bar */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Your Result</h2>
                                    <p className="text-sm text-muted-foreground">Drag the slider to compare</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button onClick={handleReset} variant="outline">
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        New Image
                                    </Button>
                                    <Button onClick={handleDownload} size="lg" className="bg-primary hover:bg-primary/90">
                                        <Download className="h-4 w-4 mr-2" />
                                        Download HD
                                    </Button>
                                </div>
                            </div>

                            {/* Comparison slider */}
                            <div className="relative rounded-2xl overflow-hidden border bg-card shadow-lg">
                                <Comparison className="aspect-video" mode="drag">
                                    <ComparisonItem position="left">
                                        <div className="relative w-full h-full bg-muted">
                                            <Image src={originalImage || "/placeholder.svg"} alt="Original" fill className="object-contain" />
                                        </div>
                                        <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium border">
                                            Original
                                        </div>
                                    </ComparisonItem>
                                    <ComparisonItem position="right">
                                        <div className="relative w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat bg-[length:20px_20px]">
                                            <Image
                                                src={processedImage || "/placeholder.svg"}
                                                alt="Background Removed"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
                                            Background Removed
                                        </div>
                                    </ComparisonItem>
                                    <ComparisonHandle />
                                </Comparison>
                            </div>

                            {/* Info cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">AI Precision</p>
                                            <p className="text-xs text-muted-foreground">Advanced edge detection</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Download className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">High Quality</p>
                                            <p className="text-xs text-muted-foreground">Full resolution output</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <ImageIcon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">PNG Format</p>
                                            <p className="text-xs text-muted-foreground">Transparent background</p>
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
