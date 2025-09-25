"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
    className?: string
}

export function BeforeAfterSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Before",
    afterLabel = "After",
    className
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
        setSliderPosition(percentage)
    }

    const handleTouchMove = (e: TouchEvent) => {
        if (!isDragging || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
        setSliderPosition(percentage)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
            document.addEventListener("touchmove", handleTouchMove)
            document.addEventListener("touchend", handleMouseUp)
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.removeEventListener("touchmove", handleTouchMove)
            document.removeEventListener("touchend", handleMouseUp)
        }
    }, [isDragging])

    return (
        <div
            ref={containerRef}
            className={cn("relative aspect-square overflow-hidden rounded-lg cursor-ew-resize select-none", className)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* Before Image (Background) */}
            <div className="absolute inset-0">
                <img
                    src={beforeImage}
                    alt={beforeLabel}
                    className="w-full h-full object-contain bg-muted"
                    draggable={false}
                />
                {/* Before Label */}
                <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {beforeLabel}
                </div>
            </div>

            {/* After Image (Clipped) */}
            <div
                className="absolute inset-0 transition-all duration-75 ease-out"
                style={{
                    clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                }}
            >
                {/* Transparent background pattern for after image */}
                <div
                    className="absolute inset-0"
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
                />
                <img
                    src={afterImage}
                    alt={afterLabel}
                    className="w-full h-full object-contain"
                    draggable={false}
                />
                {/* After Label */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {afterLabel}
                </div>
            </div>

            {/* Slider Line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg transition-all duration-75 ease-out"
                style={{ left: `${sliderPosition}%` }}
            >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
                    <div className="w-1 h-4 bg-gray-400 rounded-full" />
                </div>
            </div>
        </div>
    )
}
