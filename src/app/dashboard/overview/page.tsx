"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Heading } from "@/components/ui/heading";
import { CDN_URL } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function OverviewPage() {
    const router = useRouter()
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    const useCases = [
        {
            before: `${CDN_URL}/assets/product-1.jpg`,
            after: `${CDN_URL}/assets/product-1-removed.png`
        },
        {
            before: `${CDN_URL}/assets/product-2.jpg`,
            after: `${CDN_URL}/assets/product-2-removed.png`
        },
        {
            before: `${CDN_URL}/assets/product-3.jpg`,
            after: `${CDN_URL}/assets/product-3-removed.png`
        },
        {
            before: `${CDN_URL}/assets/portrait-1.jpg`,
            after: `${CDN_URL}/assets/portrait-1-removed.png`
        },
        {
            before: `${CDN_URL}/assets/portrait-2.jpg`,
            after: `${CDN_URL}/assets/portrait-2-removed.png`
        },
        {
            before: `${CDN_URL}/assets/portrait-3.jpg`,
            after: `${CDN_URL}/assets/portrait-3-removed.png`
        },
        {
            before: `${CDN_URL}/assets/creative-1.jpg`,
            after: `${CDN_URL}/assets/creative-1-removed.png`
        },
        {
            before: `${CDN_URL}/assets/creative-2.jpg`,
            after: `${CDN_URL}/assets/creative-2-removed.png`
        },
        {
            before: `${CDN_URL}/assets/creative-3.jpg`,
            after: `${CDN_URL}/assets/creative-3-removed.png`
        },
        {
            before: `${CDN_URL}/assets/social-1.jpg`,
            after: `${CDN_URL}/assets/social-1-removed.png`
        },
        {
            before: `${CDN_URL}/assets/social-2.jpg`,
            after: `${CDN_URL}/assets/social-2-removed.png`
        },
        {
            before: `${CDN_URL}/assets/social-3.jpg`,
            after: `${CDN_URL}/assets/social-3-removed.png`
        }
    ]

    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading title="Dashboard" description="Welcome back, here's what's happening." />
                </div>

                <div className="w-full h-[400px]">
                    {/* Large Hero Card */}
                    <Card className="h-full border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                        <CardContent className="p-6 h-full">
                            <div className="flex h-full flex-col justify-between">
                                <div className="space-y-4">
                                    <Badge variant="secondary" className="w-fit gap-1">
                                        <Zap className="h-3 w-3" />
                                        AI Powered
                                    </Badge>
                                    <div>
                                        <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
                                            Remove backgrounds
                                            <br />
                                            <span className="text-primary">
                                                in seconds
                                            </span>
                                        </h2>
                                        <p className="mt-2 text-muted-foreground lg:text-base">
                                            Advanced AI technology processes your images with pixel-perfect precision
                                        </p>
                                    </div>
                                </div>
                                <Button onClick={() => router.push("/dashboard/background-remover")} className="w-fit gap-2">
                                    Start Processing
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Removals Gallery */}
                <Card className="overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Removals</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your latest background removal projects
                                </p>
                            </div>
                            <Button onClick={() => router.push("/dashboard/image-history")} variant="ghost" className="gap-2">
                                View Yours
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-2">
                        <div className="relative px-12">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full"
                            >
                                <CarouselContent className="-ml-2 md:-ml-4">
                                    {useCases.map((useCase, index) => (
                                        <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                                            <div
                                                className='group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-gray-800/50 dark:bg-black/20'
                                                onClick={() =>
                                                    setActiveImageIndex(activeImageIndex === index ? null : index)
                                                }
                                            >
                                                {/* Before/After Images */}
                                                <div className='relative aspect-[4/4] overflow-hidden'>
                                                    {/* Before Image */}
                                                    <div
                                                        className={cn(
                                                            'absolute inset-0 transition-opacity duration-500',
                                                            'group-hover:opacity-0',
                                                            activeImageIndex === index && 'opacity-0'
                                                        )}
                                                    >
                                                        <Image
                                                            src={useCase.before}
                                                            alt={`Before`}
                                                            fill
                                                            priority={false}
                                                            loading='lazy'
                                                            placeholder='blur'
                                                            blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
                                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                            className='object-cover'
                                                        />
                                                        <div className='absolute inset-0 bg-black/20' />
                                                    </div>

                                                    {/* After Image Overlay */}
                                                    <div
                                                        className={cn(
                                                            'absolute inset-0 transition-opacity duration-500',
                                                            'group-hover:opacity-100',
                                                            activeImageIndex === index ? 'opacity-100' : 'opacity-0'
                                                        )}
                                                    >
                                                        {/* Transparent Background Pattern */}
                                                        <div
                                                            className='absolute inset-0'
                                                            style={{
                                                                backgroundImage: `
                                                linear-gradient(45deg, #ccc 25%, transparent 25%),
                                                linear-gradient(-45deg, #ccc 25%, transparent 25%),
                                                linear-gradient(45deg, transparent 75%, #ccc 75%),
                                                linear-gradient(-45deg, transparent 75%, #ccc 75%)
                                              `,
                                                                backgroundSize: '20px 20px',
                                                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                                                            }}
                                                        />
                                                        <Image
                                                            src={useCase.after}
                                                            alt={`After`}
                                                            fill
                                                            priority={false}
                                                            loading='lazy'
                                                            placeholder='blur'
                                                            blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
                                                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                                            className='object-cover'
                                                        />
                                                    </div>

                                                    {/* Before/After Labels */}
                                                    <div className='absolute top-4 left-4 flex gap-2'>
                                                        <div className='rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
                                                            Before
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                'rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white transition-opacity duration-300',
                                                                'group-hover:opacity-100',
                                                                activeImageIndex === index ? 'opacity-100' : 'opacity-0',
                                                                'from-orange-500 to-purple-600'
                                                            )}
                                                        >
                                                            After
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-4 top-1/2 -translate-y-1/2" />
                                <CarouselNext className="-right-4 top-1/2 -translate-y-1/2" />
                            </Carousel>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}