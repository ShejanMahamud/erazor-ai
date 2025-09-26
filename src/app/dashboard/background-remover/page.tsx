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
import { BeforeAfterSlider } from "@/components/ui/before-after-slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import { Heading } from "@/components/ui/heading"
import { ProcessingOverlay } from "@/components/ui/processing-overlay"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useImageSocket } from "@/hooks/useImageSocket"
import { useAuth } from "@clerk/nextjs"
import { Download, ImageIcon, Loader2, RotateCcw } from "lucide-react"
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner"

export default function BackgroundRemoverPage() {
  const [showUsageLimitDialog, setShowUsageLimitDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const { userId } = useAuth()
  const { imageUpdate, connected } = useImageSocket(userId!)

  useEffect(() => {
    if (imageUpdate) {
      console.log("📸 Image update received in page:", imageUpdate)
      if (imageUpdate.status === "processing") {
        setProgress(imageUpdate.progress || 0)
        setIsProcessing(true)
      } else if (imageUpdate.status === "completed") {
        setProcessedImage(imageUpdate?.bgRemovedImageUrlHQ || imageUpdate?.bgRemovedImageUrlLQ)
        setIsProcessing(false)
        setProgress(100)
        setShowResults(true)
        toast.success("Background removed successfully!", {
          description: "Your image is ready for download."
        })
      } else if (imageUpdate.status === "error") {
        setError(imageUpdate.error || "Processing failed")
        setIsProcessing(false)
        toast.error("Processing failed", {
          description: imageUpdate.error || "Something went wrong while processing your image."
        })
      }
    }
  }, [imageUpdate])


  const handleFileUpload = async (files: File[]) => {
    if (!connected) {
      toast.error("Connection error", {
        description: "Please wait for the connection to establish and try again."
      })
      return
    }
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
      setOriginalImage(e.target?.result as string)
      setIsUploading(false)
      setIsProcessing(true)
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
        const errorData = await response.json().catch(() => null)
        if (response.status === 429 || (errorData && errorData.code === "USAGE_LIMIT_REACHED")) {
          setShowUsageLimitDialog(true)
          setIsProcessing(false)
          return
        } else {
          throw new Error(errorData?.message || "Failed to upload file")
        }
      }

      const data = await response.json()
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
      a.download = "background-removed.png"
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

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex items-start justify-between">
          <Heading title="Background Remover" description="Remove the background from your images with AI precision." />
          {originalImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              New Image
            </Button>
          )}
        </div>
        <Separator />

        {
          imageUpdate && (
            <div className="text-sm text-muted-foreground">
              <p>{
                imageUpdate} </p>
            </div>
          )
        }

        {/* Upload Section */}
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
            {isProcessing && !showResults && (
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
                        <img
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
            {showResults && originalImage && processedImage && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-600">Background Removed Successfully!</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleDownload} className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Before/After Slider */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Interactive Comparison - Drag to compare
                    </h4>
                    <BeforeAfterSlider
                      beforeImage={originalImage}
                      afterImage={processedImage}
                      beforeLabel="Original"
                      afterLabel="Background Removed"
                      className="max-w-2xl mx-auto"
                    />
                  </div>

                  {/* Separate Images */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Original Image</h4>
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                        <img
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
                        <img
                          src={processedImage}
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
