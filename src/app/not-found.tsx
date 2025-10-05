import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Animated 404 with gradient effect */}
        <div className="relative">
          <div className="text-9xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            404
          </div>

          {/* Decorative circles matching loading screen style */}
          <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-4 border-orange-500/20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border-4 border-purple-600/20 animate-pulse delay-300"></div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-orange-500 to-purple-600"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="javascript:history.back()">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
