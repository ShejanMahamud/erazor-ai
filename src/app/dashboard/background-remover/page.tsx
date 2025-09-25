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
import { Card, CardContent } from "@/components/ui/card"
import { FileUpload } from "@/components/ui/file-upload"
import { Heading } from "@/components/ui/heading"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useImageSocket } from "@/hooks/useImageSocket"
import { useAuth } from "@clerk/nextjs"
import { Download, ImageIcon, Loader2 } from "lucide-react"
import { Suspense, useEffect, useState } from "react"

export default function BackgroundRemoverPage() {
  const [showUsageLimitDialog, setShowUsageLimitDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const { userId } = useAuth()
  const { imageUpdate, connected } = useImageSocket(userId!)

  useEffect(() => {
    if (imageUpdate) {
      if (imageUpdate.status === "processing") {
        setProgress(imageUpdate.progress || 0)
      } else if (imageUpdate.status === "completed") {
        setProcessedImage(imageUpdate?.bgRemovedImageUrlHQ || imageUpdate?.bgRemovedImageUrlLQ)
        setIsProcessing(false)
        setProgress(100)
      } else if (imageUpdate.status === "error") {
        setError(imageUpdate.error || "Processing failed")
        setIsProcessing(false)
      }
    }
  }, [imageUpdate])

  const handleFileUpload = async (files: File[]) => {
    if (!connected) return
    if (files.length === 0) return

    setError(null)
    setProcessedImage(null)
    setProgress(0)
    setIsProcessing(true)

    // Create preview of original image
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
    }
    reader.readAsDataURL(files[0])

    const formData = new FormData()
    formData.append("file", files[0])

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
      setError(err instanceof Error ? err.message : "An error occurred")
      setIsProcessing(false)
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
    } catch (err) {
      setError("Failed to download image")
    }
  }

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Background Remover" description="Remove the background from your images." />
        </div>
        <Separator />

        <Suspense>
          <FileUpload onChange={handleFileUpload} />
        </Suspense>

        {isProcessing && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Loader2 className="h-6 w-6 animate-spin" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Processing your image...</p>
                  <Progress value={progress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 text-destructive">
                <ImageIcon className="h-5 w-5" />
                <p className="text-sm font-medium">Error: {error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {(originalImage || processedImage) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {originalImage && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium mb-3">Original Image</h3>
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={originalImage || "/placeholder.svg"}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {processedImage && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Background Removed</h3>
                    <Button size="sm" onClick={handleDownload} className="h-8">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                    <img
                      src={processedImage || "/placeholder.svg"}
                      alt="Background removed"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
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
