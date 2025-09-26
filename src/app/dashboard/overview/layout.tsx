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
          <div>
            <h2 className='text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent'>
              Hi, Welcome back 👋
            </h2>
            <p className="text-muted-foreground mt-1">Here's an overview of your image processing activity</p>
          </div>
          {isLoading && (
            <div className='text-sm text-muted-foreground flex items-center gap-2'>
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              Loading dashboard data...
            </div>
          )}
          {error && (
            <div className='text-sm text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-lg border border-red-200 dark:border-red-800'>
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
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4'>
              <Card className='@container/card relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950/20 dark:via-background dark:to-blue-950/20'>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">Total Images Processed</CardDescription>
                  <CardTitle className='text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.totalImagesProcessed || 0).toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary' className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                      <IconTrendingUp className="w-3 h-3 mr-1" />
                      All Time
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-2 text-sm relative z-10'>
                  <div className='line-clamp-1 flex gap-2 font-medium text-blue-700 dark:text-blue-300'>
                    Total background removals <IconTrendingUp className='size-4' />
                  </div>
                  <div className='text-muted-foreground'>
                    Since you joined on {dashboardData?.data?.userInfo?.joinedDate ? new Date(dashboardData.data.userInfo.joinedDate).toLocaleDateString() : 'N/A'}
                  </div>
                </CardFooter>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500" />
              </Card>

              <Card className='@container/card relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-green-950/20 dark:via-background dark:to-green-950/20'>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <CardDescription className="text-green-600 dark:text-green-400 font-medium">This Month</CardDescription>
                  <CardTitle className='text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.imagesThisMonth || 0).toLocaleString()}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary' className={`${(dashboardData?.data?.insights?.monthlyGrowth || 0) > 0
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                      }`}>
                      {(dashboardData?.data?.insights?.monthlyGrowth || 0) > 0 ? <IconTrendingUp className="w-3 h-3 mr-1" /> : <IconTrendingDown className="w-3 h-3 mr-1" />}
                      {dashboardData?.data?.insights?.monthlyGrowth ? `${dashboardData.data.insights.monthlyGrowth > 0 ? '+' : ''}${dashboardData.data.insights.monthlyGrowth}%` : '0%'}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-2 text-sm relative z-10'>
                  <div className='line-clamp-1 flex gap-2 font-medium text-green-700 dark:text-green-300'>
                    Monthly activity {(dashboardData?.data?.insights?.monthlyGrowth || 0) > 0 ? <IconTrendingUp className='size-4' /> : <IconTrendingDown className='size-4' />}
                  </div>
                  <div className='text-muted-foreground'>
                    Last month: {(dashboardData?.data?.cards?.lastMonthImagesProcessed || 0).toLocaleString()}
                  </div>
                </CardFooter>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-500" />
              </Card>

              <Card className='@container/card relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-purple-950/20 dark:via-background dark:to-purple-950/20'>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-transparent to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <CardDescription className="text-purple-600 dark:text-purple-400 font-medium">Subscription Status</CardDescription>
                  <CardTitle className='text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    {isLoading ? '...' : (dashboardData?.data?.cards?.subscriptionStatus?.isActive ? 'Active' : 'Free')}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary' className={`${dashboardData?.data?.cards?.subscriptionStatus?.isActive
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                      : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                      }`}>
                      {dashboardData?.data?.cards?.subscriptionStatus?.status || 'none'}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-2 text-sm relative z-10'>
                  <div className='line-clamp-1 flex gap-2 font-medium text-purple-700 dark:text-purple-300'>
                    {dashboardData?.data?.cards?.subscriptionStatus?.isActive ? 'Premium features enabled' : 'Limited usage available'}
                  </div>
                  <div className='text-muted-foreground'>
                    {dashboardData?.data?.cards?.subscriptionStatus?.currentPeriodEnd
                      ? `Expires: ${new Date(dashboardData.data.cards.subscriptionStatus.currentPeriodEnd).toLocaleDateString()}`
                      : 'No active subscription'
                    }
                  </div>
                </CardFooter>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500" />
              </Card>

              <Card className='@container/card relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-orange-950/20 dark:via-background dark:to-orange-950/20'>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 via-transparent to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="relative z-10">
                  <CardDescription className="text-orange-600 dark:text-orange-400 font-medium">Daily Average</CardDescription>
                  <CardTitle className='text-3xl font-bold tabular-nums @[250px]/card:text-4xl bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent'>
                    {isLoading ? '...' : (dashboardData?.data?.insights?.averageDailyProcessing?.toFixed(1) || '0.0')}
                  </CardTitle>
                  <CardAction>
                    <Badge variant='secondary' className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800">
                      <IconTrendingUp className="w-3 h-3 mr-1" />
                      Per Day
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-2 text-sm relative z-10'>
                  <div className='line-clamp-1 flex gap-2 font-medium text-orange-700 dark:text-orange-300'>
                    Most active: {dashboardData?.data?.insights?.mostActiveDay?.date ? new Date(dashboardData.data.insights.mostActiveDay.date).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className='text-muted-foreground'>
                    {(dashboardData?.data?.insights?.mostActiveDay?.count || 0).toLocaleString()} images processed
                  </div>
                </CardFooter>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-orange-400 to-amber-500" />
              </Card>
            </div>

            {/* Insights Cards */}
            {!isLoading && <InsightsCards />}

            {/* Charts Grid */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-7'>
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
