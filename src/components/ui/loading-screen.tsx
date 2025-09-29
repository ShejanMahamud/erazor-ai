"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + Math.random() * 10
            })
        }, 300)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center space-y-8">
                <div className="relative w-20 h-20 mx-auto">
                    {/* Background circle with subtle shadow */}
                    <div className="absolute inset-0 rounded-full border-4 border-muted/10 shadow-lg"></div>

                    {/* Animated gradient spinner with improved styling */}
                    <div className="absolute inset-0 rounded-full animate-spin duration-1000">
                        <div
                            className="w-full h-full rounded-full shadow-md"
                            style={{
                                background: `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, #f97316 270deg, #a855f7 300deg, #9333ea 360deg)`,
                                mask: `radial-gradient(circle at center, transparent 12px, black 14px)`,
                                WebkitMask: `radial-gradient(circle at center, transparent 12px, black 14px)`,
                            }}
                        ></div>
                    </div>

                    {/* Inner glow effect */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-orange-500/20 to-purple-600/20 blur-sm"></div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">
                        {progress < 30 && "Initializing..."}
                        {progress >= 30 && progress < 70 && "Loading AI models..."}
                        {progress >= 70 && progress < 95 && "Almost ready..."}
                        {progress >= 95 && "Ready!"}
                    </p>
                    <p className="text-sm text-muted-foreground">Preparing your workspace</p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 mx-auto">
                    <div className="w-full bg-muted rounded-full h-2">
                        <div
                            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
                </div>
            </div>
        </div>
    )
}
