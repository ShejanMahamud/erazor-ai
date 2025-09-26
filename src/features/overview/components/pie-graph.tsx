'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { serverBaseUrl } from '@/config';
import { useAuth } from '@clerk/nextjs';

const chartConfig = {
  count: {
    label: 'Count'
  },
  ready: {
    label: 'Completed',
    color: 'rgb(34, 197, 94)' // emerald-500
  },
  processing: {
    label: 'Processing',
    color: 'rgb(59, 130, 246)' // blue-500
  },
  queue: {
    label: 'Queue',
    color: 'rgb(249, 115, 22)' // orange-500
  },
  failed: {
    label: 'Failed',
    color: 'rgb(239, 68, 68)' // red-500
  }
} satisfies ChartConfig;

export function PieGraph() {
  const { userId, getToken } = useAuth();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalImages, setTotalImages] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
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
          if (data.success && data.data?.reports?.statusDistribution?.data) {
            // Transform the data for the chart with proper gradient colors
            const transformedData = data.data.reports.statusDistribution.data.map((item: any, index: number) => {
              const gradientMap = {
                ready: `url(#pieGradient1)`,
                processing: `url(#pieGradient2)`,
                queue: `url(#pieGradient3)`,
                failed: `url(#pieGradient4)`
              };

              return {
                status: item.status,
                count: item.count,
                fill: gradientMap[item.status as keyof typeof gradientMap] || `var(--color-${item.status})`
              };
            });
            setChartData(transformedData);
            setTotalImages(data.data.reports.statusDistribution.totalImages || 0);
          }
        }
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  if (isLoading) {
    return (
      <Card className="h-full border-0 bg-gradient-to-br from-rose-50 via-white to-rose-50 dark:from-rose-950/20 dark:via-background dark:to-rose-950/20 shadow-lg animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-400/5 via-transparent to-pink-400/5 rounded-xl" />

        <CardHeader className="items-center pb-4 relative z-10">
          <div className="h-6 bg-gradient-to-r from-rose-200 to-pink-300 dark:from-rose-700 dark:to-pink-600 rounded w-3/4"></div>
          <div className="h-4 bg-rose-200 dark:bg-rose-700 rounded w-2/3 mt-2"></div>
        </CardHeader>

        <CardContent className="flex-1 pb-0 relative z-10">
          <div className="flex h-[280px] items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-rose-500 dark:text-rose-400 font-medium">Loading chart...</div>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-t-xl" />
      </Card>
    );
  }

  return (
    <Card className="h-full border-0 bg-gradient-to-br from-rose-50 via-white to-rose-50 dark:from-rose-950/20 dark:via-background dark:to-rose-950/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400/5 via-transparent to-pink-400/5 rounded-xl" />

      <CardHeader className="items-center pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30">
            <IconTrendingUp className="h-5 w-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-center">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-rose-700 to-pink-700 dark:from-rose-300 dark:to-pink-300 bg-clip-text text-transparent">
              Status Distribution
            </CardTitle>
            <CardDescription className="text-rose-600 dark:text-rose-400 font-medium">
              Current status of all processed images
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-6 relative z-10">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px] w-full"
        >
          <PieChart>
            <defs>
              <linearGradient id="pieGradient1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                <stop offset="100%" stopColor="rgb(21, 128, 61)" />
              </linearGradient>
              <linearGradient id="pieGradient2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                <stop offset="100%" stopColor="rgb(29, 78, 216)" />
              </linearGradient>
              <linearGradient id="pieGradient3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(249, 115, 22)" />
                <stop offset="100%" stopColor="rgb(194, 65, 12)" />
              </linearGradient>
              <linearGradient id="pieGradient4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(239, 68, 68)" />
                <stop offset="100%" stopColor="rgb(185, 28, 28)" />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="bg-white/95 dark:bg-slate-900/95 border border-rose-200 dark:border-rose-800 shadow-xl rounded-lg backdrop-blur-sm"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={70}
              outerRadius={120}
              strokeWidth={3}
              stroke="rgba(255,255,255,0.8)"
              className="drop-shadow-sm"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-rose-700 dark:fill-rose-300 text-3xl font-bold"
                        >
                          {totalImages.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-rose-500 dark:fill-rose-400 text-sm font-medium"
                        >
                          Total Images
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-3 text-sm relative z-10 border-t border-rose-100 dark:border-rose-800/50 pt-4">
        <div className="flex items-center gap-2 font-semibold leading-none text-rose-700 dark:text-rose-300">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"></div>
          Processing status overview <IconTrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Distribution of image processing statuses
        </div>
      </CardFooter>

      {/* Accent border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-purple-500 rounded-t-xl" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,_rgba(244,63,94,0.1)_0%,_transparent_50%)]" />
    </Card>
  );
}
