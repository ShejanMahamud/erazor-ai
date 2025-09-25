"use client"

import { cn } from "@/lib/utils"
import { Loader2, Sparkles, Zap } from "lucide-react"
import { useEffect, useState } from "react"

interface ProcessingOverlayProps {
    image?: string
    progress: number
    className?: string
}

export function ProcessingOverlay({ image, progress, className }: ProcessingOverlayProps) {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

    useEffect(() => {
        // Generate random particles for effect
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className={cn("relative aspect-square overflow-hidden rounded-lg bg-muted", className)}>
            {/* Background Image */}
            {image && (
                <img
                    src={image}
                    alt="Processing"
                    className="w-full h-full object-contain opacity-80"
                />
            )}

            {/* Processing Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-[1px]">
                {/* Animated Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute animate-bounce"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: '2s'
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-yellow-400 opacity-70" />
                    </div>
                ))}

                {/* Processing Indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
                            <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Removing Background
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            AI is working its magic...
                        </p>

                        {/* Progress Bar */}
                        <div className="w-48 bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500">{Math.round(progress)}% complete</p>
                    </div>
                </div>

                {/* Scanning Line Effect */}
                <div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 animate-pulse"
                    style={{
                        transform: `translateY(${progress * 3}px)`,
                        transition: 'transform 0.3s ease-out'
                    }}
                />
            </div>
        </div>
    )
}
