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
                        <h1 className="text-4xl font-bold tracking-tight">
                            Dashboard
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Your background removal workspace
                        </p>
                    </div>
                    <Button size="lg" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Image
                    </Button>
                </div>

                <div className="grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Large Hero Card */}
                    <Card className="col-span-1 row-span-2 p-6 md:col-span-2">
                        <div className="flex h-full flex-col justify-between">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    <Zap className="h-3 w-3" />
                                    AI Powered
                                </div>
                                <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
                                    Remove backgrounds
                                    <br />
                                    <span className="text-primary">
                                        in seconds
                                    </span>
                                </h2>
                                <p className="text-sm text-muted-foreground lg:text-base">
                                    Advanced AI technology processes your images with pixel-perfect precision
                                </p>
                            </div>
                            <Button variant="ghost" className="w-fit gap-2 text-primary hover:text-primary/80">
                                Start Processing
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>

                    {/* Stats Card 1 */}
                    <Card className="p-6">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <ImageIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600">
                                    <TrendingUp className="h-3 w-3" />
                                    +12%
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold">1,247</p>
                                <p className="text-sm text-muted-foreground">Images processed</p>
                            </div>
                        </div>
                    </Card>

                    {/* Stats Card 2 */}
                    <Card className="p-6">
                        <div className="flex h-full flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="rounded-lg bg-secondary p-2">
                                    <Clock className="h-5 w-5 text-secondary-foreground" />
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600">
                                    <Sparkles className="h-3 w-3" />
                                    Fast
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold">0.8s</p>
                                <p className="text-sm text-muted-foreground">Avg processing time</p>
                            </div>
                        </div>
                    </Card>

                    {/* Activity Card */}
                    <Card className="col-span-1 p-6 md:col-span-2">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">This Month</h3>
                                <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                                    March 2025
                                </div>
                            </div>
                            <div className="flex items-end gap-2 h-24">
                                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                                    <div key={i} className="flex-1">
                                        <div
                                            className="w-full rounded-t bg-primary"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Daily activity</span>
                                <span className="flex items-center gap-1 font-medium text-green-600">
                                    <TrendingUp className="h-3 w-3" />
                                    +23% vs last month
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Removals Gallery */}
                <div className="w-full">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Recent Removals</h2>
                            <p className="mt-1 text-sm text-muted-foreground">Your latest background removal projects</p>
                        </div>
                        <Button variant="ghost" className="gap-2">
                            View All
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="w-full ">
                        <Stories className="w-full">
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
                        </Stories>
                    </div>
                </div>
            </div>
        </div>
    )
}