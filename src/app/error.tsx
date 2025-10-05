"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorScreenProps {
  title?: string
  message?: string
  showRetry?: boolean
  showGoHome?: boolean
}

export default function ErrorScreen({
  title = "Something went wrong",
  message = "We encountered an unexpected error. Please try again.",
  showRetry = true,
  showGoHome = true,
}: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="relative w-20 h-20 mx-auto">
          {/* Background circle with subtle shadow */}
          <div className="absolute inset-0 rounded-full border-4 border-muted/10 shadow-lg"></div>

          {/* Error icon with gradient border effect */}
          <div className="absolute inset-0 rounded-full">
            <div
              className="w-full h-full rounded-full shadow-md"
              style={{
                background: `conic-gradient(from 0deg, #f97316 0deg, #a855f7 180deg, #9333ea 360deg)`,
                mask: `radial-gradient(circle at center, transparent 12px, black 14px)`,
                WebkitMask: `radial-gradient(circle at center, transparent 12px, black 14px)`,
              }}
            ></div>
          </div>

          {/* Inner glow effect */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-600/20 blur-sm"></div>

          {/* Error icon centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-foreground" strokeWidth={2.5} />
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground max-w-md">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-64 mx-auto">
          {showRetry && (
            <Button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white border-0"
            >
              Try Again
            </Button>
          )}
          {showGoHome && (
            <Button onClick={() => window.location.href = '/'} variant="outline" className="w-full sm:w-auto bg-transparent">
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
