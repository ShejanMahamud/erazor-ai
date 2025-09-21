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
      <Card>
        <CardHeader>
          <CardTitle>Image Processing Activity</CardTitle>
          <CardDescription>Loading activity data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Image Processing Activity</CardTitle>
          <CardDescription>Last 30 days of activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            <div className="text-center">
              <div className="text-muted-foreground mb-2">No activity data available</div>
              <div className="text-sm text-muted-foreground">Start processing images to see your activity here</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Processing Activity</CardTitle>
        <CardDescription>Daily processing activity (Last 30 days)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
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
                indicator="dashed"
                labelFormatter={(value) => `Date: ${value}`}
                formatter={(value, name) => [`${value} images`, 'Processed']}
              />}
            />
            <Bar dataKey="images" fill="var(--color-images)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total: {totalImages.toLocaleString()} images processed <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {totalImages > 0
            ? `Most active day: ${chartData.reduce((max, item) => item.images > max.images ? item : max, { images: 0, date: 'None' }).date}`
            : 'Start processing images to see your activity trends'
          }
        </div>
      </CardFooter>
    </Card>
  );
}
