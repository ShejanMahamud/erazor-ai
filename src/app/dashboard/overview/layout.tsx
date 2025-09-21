"use client";
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { serverBaseUrl } from '@/config';
import { EmptyState } from '@/features/overview/components/empty-state';
import { InsightsCards } from '@/features/overview/components/insights-cards';
import { useAuth } from '@clerk/nextjs';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  const { userId, getToken } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);

  const fetchData = async () => {
    if (!userId) {
      console.log('No userId available');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const token = await getToken();
      console.log('Fetching dashboard data for user:', userId);

      const response = await fetch(`${serverBaseUrl}/users/dashboard-stats/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dashboard data received:', data);
      setDashboardData(data);

      // Check if user has any data
      const totalImages = data?.data?.cards?.totalImagesProcessed || 0;
      setHasData(totalImages > 0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      console.error('Error fetching dashboard data:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]); // Fetch data when userId changes

  console.log('Current state:', { dashboardData, isLoading, error, userId });

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
          {isLoading && (
            <div className='text-sm text-muted-foreground'>
              Loading dashboard data...
            </div>
          )}
          {error && (
            <div className='text-sm text-red-500'>
              Error: {error}
            </div>
          )}
        </div>

        {/* Show empty state if no data */}
        {!isLoading && !hasData ? (
          <EmptyState />
        ) : (
          <>
            {/* Main Stats Cards */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Total Images Processed</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.totalImagesProcessed || 0).toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingUp />
                      All Time
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Total background removals <IconTrendingUp className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Since you joined on {dashboardData?.data?.userInfo?.joinedDate ? new Date(dashboardData.data.userInfo.joinedDate).toLocaleDateString() : 'N/A'}
                  </div>
                </CardFooter>
              </Card>

              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.imagesThisMonth || 0).toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      {(dashboardData?.data?.insights?.monthlyGrowth || 0) > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                      {dashboardData?.data?.insights?.monthlyGrowth ? `${dashboardData.data.insights.monthlyGrowth > 0 ? '+' : ''}${dashboardData.data.insights.monthlyGrowth}%` : '0%'}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Monthly activity {(dashboardData?.data?.insights?.monthlyGrowth || 0) > 0 ? <IconTrendingUp className='size-4' /> : <IconTrendingDown className='size-4' />}
                  </div>
                  <div className='text-muted-foreground'>
                    Last month: {(dashboardData?.data?.cards?.lastMonthImagesProcessed || 0).toLocaleString()}
                  </div>
                </CardFooter>
              </Card>

              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Subscription Status</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.subscriptionStatus?.isActive ? 'Active' : 'Free')}
                  </CardTitle>
                  <CardAction>
                    <Badge variant={dashboardData?.data?.cards?.subscriptionStatus?.isActive ? 'default' : 'outline'}>
                      {dashboardData?.data?.cards?.subscriptionStatus?.status || 'none'}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    {dashboardData?.data?.cards?.subscriptionStatus?.isActive ? 'Premium features enabled' : 'Limited usage available'}
                  </div>
                  <div className='text-muted-foreground'>
                    {dashboardData?.data?.cards?.subscriptionStatus?.currentPeriodEnd
                      ? `Expires: ${new Date(dashboardData.data.cards.subscriptionStatus.currentPeriodEnd).toLocaleDateString()}`
                      : 'No active subscription'
                    }
                  </div>
                </CardFooter>
              </Card>

              <Card className='@container/card'>
                <CardHeader>
                  <CardDescription>Daily Average</CardDescription>
                  <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                    {isLoading ? '...' : (dashboardData?.data?.insights?.averageDailyProcessing?.toFixed(1) || '0.0')}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='outline'>
                      <IconTrendingUp />
                      Per Day
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                  <div className='line-clamp-1 flex gap-2 font-medium'>
                    Most active: {dashboardData?.data?.insights?.mostActiveDay?.date ? new Date(dashboardData.data.insights.mostActiveDay.date).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className='text-muted-foreground'>
                    {(dashboardData?.data?.insights?.mostActiveDay?.count || 0).toLocaleString()} images processed
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Insights Cards */}
            {!isLoading && <InsightsCards />}

            {/* Charts Grid */}
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <div className='col-span-1 lg:col-span-4'>{bar_stats}</div>
              <div className='col-span-1 lg:col-span-3'>
                {sales}
              </div>
              <div className='col-span-1 lg:col-span-4'>{area_stats}</div>
              <div className='col-span-1 lg:col-span-3'>{pie_stats}</div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
