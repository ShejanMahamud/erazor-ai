"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Stories,
    StoriesContent,
    Story,
    StoryAuthor,
    StoryAuthorImage,
    StoryAuthorName,
    StoryImage,
    StoryOverlay,
    StoryTitle,
} from "@/components/ui/kibo-ui/stories";
import { ArrowRight, Clock, ImageIcon, Sparkles, TrendingUp, Upload, Zap } from "lucide-react";
export default function OverviewPage() {
    const stories = [
        {
            id: 1,
            author: "Alex Johnson",
            avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            fallback: "AJ",
            preview:
                "https://images.unsplash.com/photo-1753731683731-1032f9457b02?w=1636&fit=crop",
            title: "Mountain Adventure",
        },
        {
            id: 2,
            author: "Sarah Chen",
            avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
            fallback: "SC",
            preview:
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=533&fit=crop",
            title: "Ocean Waves",
        },
        {
            id: 3,
            author: "Mike Rodriguez",
            avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            fallback: "MR",
            preview:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=533&fit=crop",
            title: "Forest Trail",
        },
        {
            id: 4,
            author: "Emma Wilson",
            avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            fallback: "EW",
            preview:
                "https://images.unsplash.com/photo-1541336032412-2048a678540d?w=300&h=533&fit=crop",
            title: "City Lights",
        },
        {
            id: 5,
            author: "David Kim",
            avatar:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
            fallback: "DK",
            preview:
                "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&fit=crop",
            title: "Desert Road",
        },
    ];
    return (
        <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-[1600px] space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent animate-in fade-in slide-in-from-bottom-3 duration-700">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">
                            Your background removal workspace
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        <Upload className="relative mr-2 h-4 w-4" />
                        <span className="relative">Upload Image</span>
                    </Button>
                </div>

                <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Large Hero Card - Enhanced with glassmorphism and better animations */}
                    <Card className="group relative col-span-1 row-span-2 overflow-hidden border-border/50 bg-gradient-to-br from-orange-500/10 via-purple-600/5 to-background p-6 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 md:col-span-2">
                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow-lg shadow-orange-500/30 transition-all group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-orange-500/40">
                                    <Zap className="h-3 w-3 animate-pulse" />
                                    AI Powered
                                </div>
                                <h2 className="text-3xl font-bold leading-tight transition-all group-hover:translate-x-1 lg:text-4xl">
                                    Remove backgrounds
                                    <br />
                                    <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-purple-600 bg-clip-text text-transparent">
                                        in seconds
                                    </span>
                                </h2>
                                <p className="text-sm text-muted-foreground transition-all group-hover:text-foreground/80 lg:text-base">
                                    Advanced AI technology processes your images with pixel-perfect precision
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-fit gap-2 text-orange-500 transition-all hover:translate-x-2 hover:text-orange-600"
                            >
                                Start Processing
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                        {/* Enhanced decorative gradient orbs */}
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-orange-500/30 to-purple-600/30 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:from-orange-500/40 group-hover:to-purple-600/40" />
                        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr from-purple-600/20 to-orange-500/20 blur-3xl transition-all duration-700 group-hover:scale-110" />
                    </Card>

                    {/* Stats Card 1 - Enhanced with progress ring and better animations */}
                    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-orange-500/50 hover:bg-card hover:shadow-xl hover:shadow-orange-500/20">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 p-2.5 shadow-lg shadow-orange-500/20 transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-orange-500/30">
                                    <ImageIcon className="h-5 w-5 text-orange-500" />
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                    <TrendingUp className="h-3 w-3" />
                                    +12%
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold transition-all group-hover:scale-105">1,247</p>
                                <p className="text-sm text-muted-foreground">Images processed</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/20 to-transparent blur-2xl transition-all group-hover:scale-125" />
                        {/* Animated border gradient */}
                        <div
                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 opacity-0 transition-opacity group-hover:opacity-100"
                            style={{ maskImage: "linear-gradient(to bottom, transparent, black 2px, transparent)" }}
                        />
                    </Card>

                    {/* Stats Card 2 - Enhanced with animated elements */}
                    <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-600/50 hover:bg-card hover:shadow-xl hover:shadow-purple-600/20">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-700/10 p-2.5 shadow-lg shadow-purple-600/20 transition-all group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-600/30">
                                    <Clock className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500">
                                    <Sparkles className="h-3 w-3" />
                                    Fast
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold transition-all group-hover:scale-105">0.8s</p>
                                <p className="text-sm text-muted-foreground">Avg processing time</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-32 w-32 rounded-full bg-gradient-to-br from-purple-600/20 to-transparent blur-2xl transition-all group-hover:scale-125" />
                    </Card>

                    {/* Activity Card - Enhanced with better chart and glassmorphism */}
                    <Card className="group relative col-span-1 overflow-hidden border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/30 hover:bg-card hover:shadow-xl md:col-span-2">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">This Month</h3>
                                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    March 2025
                                </div>
                            </div>
                            <div className="flex items-end gap-2 h-24">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                                    <div key={i} className="group/bar relative flex-1 transition-all hover:scale-110">
                                        <div
                                            className="w-full rounded-t-md bg-gradient-to-t from-orange-500 via-orange-400 to-purple-600 shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40"
                                            style={{ height: `${height}%` }}
                                        />
                                        {/* Tooltip on hover */}
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/bar:opacity-100">
                                            {Math.round(height * 1.5)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Daily activity</span>
                                <span className="flex items-center gap-1 font-medium text-green-500">
                                    <TrendingUp className="h-3 w-3" />
                                    +23% vs last month
                                </span>
                            </div>
                        </div>
                        {/* Decorative gradient */}
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-orange-500/10 to-purple-600/10 blur-3xl transition-all group-hover:scale-125" />
                    </Card>

                    {/* Quick Action Card 1 - Enhanced with better effects */}
                    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-6 text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-2">
                                <div className="inline-flex rounded-xl bg-white/20 p-2.5 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
                                    <Upload className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Single Upload</h3>
                                <p className="text-xs text-white/80">Process one image at a time</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-fit bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
                            >
                                Upload
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        {/* Animated gradient orb */}
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:scale-125" />
                    </Card>

                    {/* Quick Action Card 2 - Enhanced with better effects */}
                    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-6 text-white shadow-xl shadow-purple-600/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/50">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-2">
                                <div className="inline-flex rounded-xl bg-white/20 p-2.5 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold">Batch Process</h3>
                                <p className="text-xs text-white/80">Upload multiple images</p>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-fit bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/30"
                            >
                                Start
                                <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                        </div>
                        {/* Animated gradient orb */}
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-all group-hover:scale-125" />
                    </Card>
                </div>

                {/* Recent Removals Gallery - Enhanced */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Recent Removals</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Your latest background removal projects</p>
                        </div>
                        <Button variant="ghost" className="group gap-2 text-muted-foreground hover:text-foreground">
                            View All
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <Stories>
                        <StoriesContent>
                            {stories.map((story) => (
                                <Story className="aspect-[3/4] w-[200px]" key={story.id}>
                                    <StoryImage alt={story.title} src={story.preview} />
                                    <StoryOverlay side="top" />
                                    <StoryOverlay side="bottom" />
                                    <StoryTitle className="truncate font-medium text-sm">
                                        {story.title}
                                    </StoryTitle>
                                    <StoryAuthor>
                                        <StoryAuthorImage
                                            fallback={story.fallback}
                                            name={story.author}
                                            src={story.avatar}
                                        />
                                        <StoryAuthorName>{story.author}</StoryAuthorName>
                                    </StoryAuthor>
                                </Story>
                            ))}
                        </StoriesContent>
                    </Stories>;
                </div>
            </div>
        </div>
    )
}