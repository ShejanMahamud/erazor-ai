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
    color: 'hsl(var(--chart-1))'
  },
  processing: {
    label: 'Processing',
    color: 'hsl(var(--chart-2))'
  },
  queue: {
    label: 'Queue',
    color: 'hsl(var(--chart-3))'
  },
  failed: {
    label: 'Failed',
    color: 'hsl(var(--chart-4))'
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
            // Transform the data for the chart
            const transformedData = data.data.reports.statusDistribution.data.map((item: any) => ({
              status: item.status,
              count: item.count,
              fill: `var(--color-${item.status})`
            }));
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
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Image Status Distribution</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex h-[250px] items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Image Status Distribution</CardTitle>
        <CardDescription>Current status of all processed images</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalImages.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Processing status overview <IconTrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Distribution of image processing statuses
        </div>
      </CardFooter>
    </Card>
  );
}
