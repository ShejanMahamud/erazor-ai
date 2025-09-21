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
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle>Processing Trend</CardTitle>
          <CardDescription>Loading trend data...</CardDescription>
        </CardHeader>
        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
          <div className="flex items-center justify-center h-[250px]">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className='@container/card'>
        <CardHeader>
          <CardTitle>Processing Trend</CardTitle>
          <CardDescription>Image processing activity over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
          <div className="flex items-center justify-center h-[250px]">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">No trend data available</div>
              <div className="text-sm text-muted-foreground">Process more images to see your trends</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Processing Trend</CardTitle>
        <CardDescription>
          Image processing activity over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12
            }}
          >
            <defs>
              <linearGradient id='fillCount' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-count)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-count)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent
                indicator='dot'
                labelFormatter={(value) => `Date: ${value}`}
                formatter={(value, name) => [`${value} images`, 'Processed']}
              />}
            />
            <Area
              dataKey='count'
              type='natural'
              fill='url(#fillCount)'
              stroke='var(--color-count)'
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              {trend.percentage > 0 ? (
                <>
                  {trend.isPositive ? 'Trending up' : 'Trending down'} by {trend.percentage.toFixed(1)}% this week{' '}
                  <IconTrendingUp className={`h-4 w-4 ${trend.isPositive ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                </>
              ) : (
                <>
                  Processing activity trend <IconTrendingUp className='h-4 w-4' />
                </>
              )}
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              Total: {totalImages.toLocaleString()} images processed
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
