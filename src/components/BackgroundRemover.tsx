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
import { Download, ImageIcon, MoreVertical, Pencil, RotateCcw } from "lucide-react"
import Image from "next/image"
import { Suspense, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { ImageEditor } from "./ImageEditor"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Heading } from "./ui/heading"
import { Comparison, ComparisonHandle, ComparisonItem } from "./ui/kibo-ui/comparison"

export function BackgroundRemover({
    showHeader = true,
}: {
    showHeader?: boolean
}) {
    const [editorOpen, setEditorOpen] = useState<boolean>(false)
    const [showUsageLimitDialog, setShowUsageLimitDialog] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [originalImage, setOriginalImage] = useState<string | null>(null)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false)
    const { imageUpdate } = useImageSocket()

    const processedImage = useMemo(() => {
        if (!imageUpdate) return null
        return imageUpdate.bgRemovedImageUrlHQ || imageUpdate.bgRemovedImageUrlLQ || null
    }, [imageUpdate])

    useEffect(() => {
        if (processedImage && isProcessing && !hasShownSuccessToast) {
            setIsProcessing(false)
            setProgress(100)
            setHasShownSuccessToast(true)
            toast.success("Background removed successfully!", {
                description: "Your image is ready for download.",
            })
        }
    }, [processedImage, isProcessing, hasShownSuccessToast])

    useEffect(() => {
        if (isProcessing) {
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev >= 90 ? prev : prev + 10
                    return newProgress
                })
            }, 500)

            return () => {
                clearInterval(progressInterval)
            }
        }
    }, [isProcessing])

    const handleFileUpload = async (files: File[]) => {
        if (files.length === 0) return

        const file = files[0]

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload a JPG, PNG, or WebP image file.",
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

        setError(null)
        setProgress(0)
        setIsProcessing(false)
        setHasShownSuccessToast(false)

        // Create preview of original image immediately
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageDataUrl = e.target?.result as string
            setOriginalImage(imageDataUrl)
            setIsProcessing(true)
            setProgress(10)
            toast.success("Image uploaded successfully!", {
                description: "Processing background removal...",
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
                setError("Upload failed")
                return toast.error("Upload failed", {
                    description: `Something went wrong: ${response.statusText}`,
                })
            }

            const data = await response.json()

            if (/USAGE_LIMIT_EXCEEDED/.test(data.details)) {
                setShowUsageLimitDialog(true)
                setIsProcessing(false)
            }

            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An error occurred"
            setError(errorMessage)
            setIsProcessing(false)
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
            a.download = "erazor_ai_bg-removed.png"
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
            toast.success("Image downloaded successfully!")
        } catch (err) {
            setError("Failed to download image")
            toast.error("Download failed", {
                description: "Failed to download the processed image.",
            })
        }
    }

    const handleReset = () => {
        setOriginalImage(null)
        setProgress(0)
        setError(null)
        setIsProcessing(false)
        setHasShownSuccessToast(false)
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
                    {showHeader && (
                        <div className="flex-1">
                            <Heading
                                title="Background Remover"
                                description="Remove the background from your images with AI precision."
                            />
                        </div>
                    )}
                </div>

                {!originalImage && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                        <Suspense>
                            <FileUpload onChange={handleFileUpload} />
                        </Suspense>
                    </div>
                )}

                {originalImage && processedImage && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Background Removal Preview</h3>
                                <div className="flex items-center gap-2">
                                    <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 w-full lg:w-auto">
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

                                    {editorOpen && <ImageEditor handleClose={handleEditorClose} imageSource={processedImage} />}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Comparison className="aspect-video" mode="drag">
                                <ComparisonItem position="left">
                                    <Image
                                        src={originalImage || "/placeholder.svg"}
                                        alt="Original"
                                        fill
                                        className="object-contain relative z-50"
                                    />
                                </ComparisonItem>
                                <ComparisonItem position="right">
                                    <Image
                                        src={processedImage || "/placeholder.svg"}
                                        alt="Processed"
                                        fill
                                        className="object-contain relative z-50"
                                    />
                                </ComparisonItem>
                                <ComparisonHandle />
                            </Comparison>
                        </CardContent>
                    </Card>
                )}

                {originalImage && !processedImage && isProcessing && (
                    <Card>
                        <CardContent className="p-6">
                            <div className="w-full h-64 flex flex-col items-center justify-center bg-muted rounded-lg">
                                <p className="text-sm text-muted-foreground mb-4">Processing background removal...</p>
                                <div className="w-full max-w-xs bg-secondary rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

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
