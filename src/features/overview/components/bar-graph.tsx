'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import * as React from 'react';

const chartConfig = {
  images: {
    label: 'Images Processed',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function BarGraph() {
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
          console.log('Dashboard data:', data);

          if (data.success && data.data?.reports?.imageActivity?.data) {
            // Use the correct API structure
            const activityData = data.data.reports.imageActivity.data.map((item: any) => ({
              date: new Date(item.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }),
              images: item.count
            }));

            setChartData(activityData);
            setTotalImages(data.data.reports.imageActivity.totalCount || 0);
          } else {
            // Fallback for empty data
            setChartData([]);
            setTotalImages(0);
          }
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
        setTotalImages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  if (isLoading) {
    return (
      <Card className="h-full border-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950/20 dark:via-background dark:to-slate-950/20 shadow-lg animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 rounded-xl" />

        <CardHeader className="relative z-10">
          <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded w-2/3"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mt-2"></div>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex items-center justify-center h-[280px]">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-slate-500 dark:text-slate-400 font-medium">Loading chart data...</div>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-t-xl" />
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="h-full border-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950/20 dark:via-background dark:to-slate-950/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 rounded-xl" />

        <CardHeader className="relative z-10">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
            Image Processing Activity
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">
            Last 30 days of activity
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <div className="flex items-center justify-center h-[250px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-2">No activity data available</div>
                <div className="text-sm text-muted-foreground">Start processing images to see your activity here</div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-t-xl" />
      </Card>
    );
  }

  return (
    <Card className="h-full border-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950/20 dark:via-background dark:to-slate-950/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 rounded-xl" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white bg-clip-text text-transparent">
              Image Processing Activity
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400 font-medium mt-1">
              Daily processing activity over the last 30 days
            </CardDescription>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="currentColor"
              className="opacity-20"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              fontSize={11}
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={11}
              className="text-slate-600 dark:text-slate-400"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dashed"
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value, name) => [`${value} images`, 'Processed']}
                  className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl rounded-lg backdrop-blur-sm"
                />
              }
            />
            <Bar
              dataKey="images"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              className="drop-shadow-sm"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3 text-sm relative z-10 border-t border-slate-100 dark:border-slate-800/50 pt-4">
        <div className="flex gap-2 font-semibold leading-none text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            Total: {totalImages.toLocaleString()} images processed
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
        </div>
        <div className="leading-none text-muted-foreground">
          {totalImages > 0
            ? `Most active day: ${chartData.reduce((max, item) => item.images > max.images ? item : max, { images: 0, date: 'None' }).date}`
            : 'Start processing images to see your activity trends'
          }
        </div>
      </CardFooter>

      {/* Accent border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-t-xl" />
    </Card>
  );
}
