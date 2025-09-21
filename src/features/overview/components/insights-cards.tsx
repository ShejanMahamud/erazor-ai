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
            badgeVariant: "outline" as "outline"
        },
        {
            title: "Most Active Day",
            value: insights.mostActiveDay?.count.toString() || "0",
            description: insights.mostActiveDay?.date
                ? new Date(insights.mostActiveDay.date).toLocaleDateString()
                : "No activity yet",
            icon: <IconCalendarStats className="h-4 w-4" />,
            badge: "Peak",
            badgeVariant: "secondary" as "secondary"
        },
        {
            title: "Monthly Growth",
            value: `${insights.monthlyGrowth > 0 ? '+' : ''}${insights.monthlyGrowth}%`,
            description: "compared to last month",
            icon: <IconTrendingUp className="h-4 w-4" />,
            badge: insights.monthlyGrowth >= 0 ? "Growing" : "Declining",
            badgeVariant: (insights.monthlyGrowth >= 0 ? "default" : "destructive") as "default" | "destructive"
        },
        {
            title: "Success Rate",
            value: insights.processingSuccessRate ? `${insights.processingSuccessRate}%` : "N/A",
            description: "processing accuracy",
            icon: <IconUsers className="h-4 w-4" />,
            badge: "Quality",
            badgeVariant: "outline" as "outline"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {insightCards.map((card, index) => (
                <Card key={index} className="relative overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardDescription className="flex items-center justify-between">
                            <span>{card.title}</span>
                            <Badge variant={card.badgeVariant}>
                                {card.badge}
                            </Badge>
                        </CardDescription>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            {card.value}
                            {card.icon}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground">{card.description}</p>
                    </CardContent>
                    <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-primary/20 to-transparent" />
                </Card>
            ))}
        </div>
    );
}
