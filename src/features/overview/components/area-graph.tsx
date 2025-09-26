'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
    label: 'Images Processed',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  const { userId, getToken } = useAuth();
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [totalImages, setTotalImages] = React.useState(0);
  const [trend, setTrend] = React.useState<{ percentage: number; isPositive: boolean }>({
    percentage: 0,
    isPositive: true
  });

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

          if (data.success && data.data?.reports?.imageActivity?.data) {
            // Process the last 30 days of data for area chart
            const activityData = data.data.reports.imageActivity.data
              .slice(-30) // Last 30 days
              .map((item: any) => ({
                date: new Date(item.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                }),
                count: item.count
              }));

            setChartData(activityData);
            setTotalImages(data.data.reports.imageActivity.totalCount || 0);

            // Calculate trend (growth from previous week)
            if (activityData.length >= 14) {
              const lastWeek = activityData.slice(-7).reduce((sum: number, item: any) => sum + item.count, 0);
              const previousWeek = activityData.slice(-14, -7).reduce((sum: number, item: any) => sum + item.count, 0);

              if (previousWeek > 0) {
                const percentage = ((lastWeek - previousWeek) / previousWeek) * 100;
                setTrend({
                  percentage: Math.abs(percentage),
                  isPositive: percentage >= 0
                });
              }
            }
          } else {
            setChartData([]);
            setTotalImages(0);
          }
        }
      } catch (error) {
        console.error('Error fetching area chart data:', error);
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
      <Card className='@container/card h-full border-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/20 shadow-lg animate-pulse'>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-teal-400/5 rounded-xl" />

        <CardHeader className="relative z-10">
          <div className="h-6 bg-gradient-to-r from-emerald-200 to-teal-300 dark:from-emerald-700 dark:to-teal-600 rounded w-1/2"></div>
          <div className="h-4 bg-emerald-200 dark:bg-emerald-700 rounded w-3/4 mt-2"></div>
        </CardHeader>

        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 relative z-10'>
          <div className="flex items-center justify-center h-[280px]">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-emerald-500 dark:text-emerald-400 font-medium">Loading trend data...</div>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-t-xl" />
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className='@container/card h-full border-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/20 shadow-lg'>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-teal-400/5 rounded-xl" />

        <CardHeader className="relative z-10">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
            Processing Trend
          </CardTitle>
          <CardDescription className="text-emerald-600 dark:text-emerald-400 font-medium">
            Image processing activity over the last 30 days
          </CardDescription>
        </CardHeader>

        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 relative z-10'>
          <div className="flex items-center justify-center h-[280px]">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                <IconTrendingUp className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-emerald-600 dark:text-emerald-400 font-medium text-lg mb-2">No trend data available</div>
                <div className="text-sm text-muted-foreground">Process more images to see your trends</div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-t-xl" />
      </Card>
    );
  }
  return (
    <Card className='@container/card h-full border-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/20 dark:via-background dark:to-emerald-950/20 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-teal-400/5 rounded-xl" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent">
              Processing Trend
            </CardTitle>
            <CardDescription className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              Image processing activity over the last 30 days
            </CardDescription>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30">
            <IconTrendingUp className={`h-5 w-5 ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400 rotate-180'}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6 relative z-10'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[280px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12
            }}
          >
            <defs>
              <linearGradient id='fillCount' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='rgb(16, 185, 129)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='50%'
                  stopColor='rgb(5, 150, 105)'
                  stopOpacity={0.4}
                />
                <stop
                  offset='95%'
                  stopColor='rgb(4, 120, 87)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="currentColor"
              className="opacity-20"
            />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
              fontSize={11}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              fontSize={11}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator='dot'
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value, name) => [`${value} images`, 'Processed']}
                  className="bg-white/95 dark:bg-slate-900/95 border border-emerald-200 dark:border-emerald-800 shadow-xl rounded-lg backdrop-blur-sm"
                />
              }
            />
            <Area
              dataKey='count'
              type='natural'
              fill='url(#fillCount)'
              stroke='rgb(16, 185, 129)'
              strokeWidth={3}
              className="drop-shadow-sm"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="relative z-10 border-t border-emerald-100 dark:border-emerald-800/50 pt-4">
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-3'>
            <div className='flex items-center gap-2 leading-none font-semibold text-emerald-700 dark:text-emerald-300'>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              {trend.percentage > 0 ? (
                <>
                  {trend.isPositive ? 'Trending up' : 'Trending down'} by {trend.percentage.toFixed(1)}% this week{' '}
                  <IconTrendingUp className={`h-4 w-4 ${trend.isPositive ? 'text-emerald-500' : 'text-red-500 rotate-180'}`} />
                </>
              ) : (
                <>
                  Processing activity trend <IconTrendingUp className='h-4 w-4 text-emerald-500' />
                </>
              )}
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              Total: {totalImages.toLocaleString()} images processed
            </div>
          </div>
        </div>
      </CardFooter>

      {/* Accent border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-t-xl" />
    </Card>
  );
}
