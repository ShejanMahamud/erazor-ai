"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BarChart3, Clock, Download, Eye, ImageIcon, Sparkles, TrendingUp, Upload, Users, Zap } from "lucide-react";
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
                            Welcome back! Here's what's happening with your projects.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="lg" className="gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Analytics
                        </Button>
                        <Button size="lg" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                        </Button>
                    </div>
                </div>

                <div className="grid auto-rows-[200px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Large Hero Card */}
                    <Card className="col-span-1 row-span-2 md:col-span-2 border-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
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
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Processing Speed</span>
                                            <span className="font-medium">95%</span>
                                        </div>
                                        <Progress value={95} className="h-2" />
                                    </div>
                                </div>
                                <Button className="w-fit gap-2">
                                    Start Processing
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Cards */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Images Processed</CardTitle>
                            <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,247</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-green-500">+12%</span>
                                <span>from last month</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0.8s</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Sparkles className="h-3 w-3 text-blue-500" />
                                <span className="text-blue-500">Fast</span>
                                <span>lightning speed</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">856</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-green-500">+8%</span>
                                <span>from last week</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Eye className="h-3 w-3 text-purple-500" />
                                <span className="text-purple-500">Live</span>
                                <span>right now</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Chart */}
                    <Card className="col-span-1 md:col-span-2 hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Monthly Activity</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Your processing activity over time
                                    </p>
                                </div>
                                <Badge variant="outline">September 2025</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-end justify-between h-32 gap-1">
                                    {[
                                        { day: 'Mon', value: 40, label: '120' },
                                        { day: 'Tue', value: 65, label: '195' },
                                        { day: 'Wed', value: 45, label: '135' },
                                        { day: 'Thu', value: 80, label: '240' },
                                        { day: 'Fri', value: 55, label: '165' },
                                        { day: 'Sat', value: 90, label: '270' },
                                        { day: 'Sun', value: 70, label: '210' }
                                    ].map((bar, i) => (
                                        <div key={i} className="flex-1 flex flex-col items-center group">
                                            <div className="relative w-full mb-2">
                                                <div
                                                    className="w-full bg-primary rounded-t transition-all duration-300 hover:bg-primary/80 cursor-pointer"
                                                    style={{ height: `${bar.value}%` }}
                                                />
                                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border rounded px-2 py-1 text-xs whitespace-nowrap">
                                                    {bar.label} images
                                                </div>
                                            </div>
                                            <span className="text-xs text-muted-foreground">{bar.day}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-sm pt-2 border-t">
                                    <span className="text-muted-foreground">This week</span>
                                    <div className="flex items-center gap-1 font-medium text-green-600">
                                        <TrendingUp className="h-3 w-3" />
                                        +23% vs last week
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Removals Gallery */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Recent Removals</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your latest background removal projects
                                </p>
                            </div>
                            <Button variant="ghost" className="gap-2">
                                View All
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                        <div className="w-full overflow-hidden">
                            <Stories className="w-full">
                                <StoriesContent className="-ml-2 gap-2">
                                    {stories.map((story, index) => (
                                        <Story className="aspect-[3/4] w-[180px] basis-auto flex-shrink-0" key={`${story.id}-${index}`}>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}