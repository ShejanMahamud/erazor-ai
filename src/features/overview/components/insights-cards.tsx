'use client';

import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { serverBaseUrl } from '@/config';
import { useAuth } from '@clerk/nextjs';
import {
    IconCalendarStats,
    IconChartBar,
    IconTrendingUp,
    IconUsers
} from '@tabler/icons-react';
import * as React from 'react';

interface InsightsData {
    averageDailyProcessing: number;
    mostActiveDay: {
        date: string;
        count: number;
    } | null;
    monthlyGrowth: number;
    processingSuccessRate?: number;
    peakHour?: string;
}

export function InsightsCards() {
    const { userId, getToken } = useAuth();
    const [insights, setInsights] = React.useState<InsightsData | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchInsights = async () => {
            if (!userId) return;

            try {
                const token = await getToken();
                const response = await fetch(`${serverBaseUrl}/users/dashboard-stats/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.data?.insights) {
                        setInsights(data.data.insights);
                    }
                }
            } catch (error) {
                console.error('Error fetching insights:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInsights();
    }, [userId, getToken]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="pb-2">
                            <div className="h-4 bg-muted rounded w-2/3"></div>
                            <div className="h-8 bg-muted rounded w-1/2"></div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        );
    }

    if (!insights) {
        return null;
    }

    const insightCards = [
        {
            title: "Daily Average",
            value: insights.averageDailyProcessing.toFixed(1),
            description: "images per day",
            icon: <IconChartBar className="h-4 w-4" />,
            badge: "Average",
            badgeVariant: "outline" as "outline",
            gradient: "from-indigo-500 to-blue-600",
            bgGradient: "from-indigo-50 via-white to-indigo-50 dark:from-indigo-950/20 dark:via-background dark:to-indigo-950/20",
            iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
            iconColor: "text-indigo-600 dark:text-indigo-400",
            accentColor: "from-indigo-400 to-blue-500"
        },
        {
            title: "Most Active Day",
            value: insights.mostActiveDay?.count.toString() || "0",
            description: insights.mostActiveDay?.date
                ? new Date(insights.mostActiveDay.date).toLocaleDateString()
                : "No activity yet",
            icon: <IconCalendarStats className="h-4 w-4" />,
            badge: "Peak",
            badgeVariant: "secondary" as "secondary",
            gradient: "from-emerald-500 to-teal-600",
            bgGradient: "from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/20",
            iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
            iconColor: "text-emerald-600 dark:text-emerald-400",
            accentColor: "from-emerald-400 to-teal-500"
        },
        {
            title: "Monthly Growth",
            value: `${insights.monthlyGrowth > 0 ? '+' : ''}${insights.monthlyGrowth}%`,
            description: "compared to last month",
            icon: <IconTrendingUp className="h-4 w-4" />,
            badge: insights.monthlyGrowth >= 0 ? "Growing" : "Declining",
            badgeVariant: (insights.monthlyGrowth >= 0 ? "default" : "destructive") as "default" | "destructive",
            gradient: insights.monthlyGrowth >= 0 ? "from-green-500 to-emerald-600" : "from-red-500 to-pink-600",
            bgGradient: insights.monthlyGrowth >= 0
                ? "from-green-50 via-white to-green-50 dark:from-green-950/20 dark:via-background dark:to-green-950/20"
                : "from-red-50 via-white to-red-50 dark:from-red-950/20 dark:via-background dark:to-red-950/20",
            iconBg: insights.monthlyGrowth >= 0
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30",
            iconColor: insights.monthlyGrowth >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400",
            accentColor: insights.monthlyGrowth >= 0 ? "from-green-400 to-emerald-500" : "from-red-400 to-pink-500"
        },
        {
            title: "Success Rate",
            value: insights.processingSuccessRate ? `${insights.processingSuccessRate}%` : "N/A",
            description: "processing accuracy",
            icon: <IconUsers className="h-4 w-4" />,
            badge: "Quality",
            badgeVariant: "outline" as "outline",
            gradient: "from-purple-500 to-violet-600",
            bgGradient: "from-purple-50 via-white to-purple-50 dark:from-purple-950/20 dark:via-background dark:to-purple-950/20",
            iconBg: "bg-purple-100 dark:bg-purple-900/30",
            iconColor: "text-purple-600 dark:text-purple-400",
            accentColor: "from-purple-400 to-violet-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {insightCards.map((card, index) => (
                <Card key={index} className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br ${card.bgGradient}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="pb-3 relative z-10">
                        <CardDescription className="flex items-center justify-between">
                            <span className="font-medium text-foreground/70">{card.title}</span>
                            <div className={`p-2 rounded-lg ${card.iconBg}`}>
                                <div className={card.iconColor}>{card.icon}</div>
                            </div>
                        </CardDescription>
                        <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                            {card.value}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{card.description}</p>
                            <Badge variant={card.badgeVariant} className="text-xs font-medium">
                                {card.badge}
                            </Badge>
                        </div>
                    </CardContent>

                    {/* Animated accent bar */}
                    <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${card.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />

                    {/* Side accent */}
                    <div className={`absolute top-0 right-0 w-1 h-full bg-gradient-to-b ${card.accentColor}`} />

                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,1)_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
                </Card>
            ))}
        </div>
    );
}
