'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { FileX } from 'lucide-react';
import * as React from 'react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ready':
      return 'bg-green-500';
    case 'processing':
      return 'bg-blue-500';
    case 'queue':
      return 'bg-yellow-500';
    case 'failed':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ready':
      return 'Completed';
    case 'processing':
      return 'Processing';
    case 'queue':
      return 'In Queue';
    case 'failed':
      return 'Failed';
    default:
      return status;
  }
};

export function RecentSales() {
  const { userId, getToken } = useAuth();
  const [recentActivity, setRecentActivity] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
          if (data.success && data.data?.recentActivity) {
            setRecentActivity(data.data.recentActivity);
          }
        }
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, getToken]);

  return (
    <Card className='h-full border-0 bg-gradient-to-br from-violet-50 via-white to-violet-50 dark:from-violet-950/20 dark:via-background dark:to-violet-950/20 shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/5 via-transparent to-purple-400/5 rounded-xl" />

      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-violet-700 to-purple-700 dark:from-violet-300 dark:to-purple-300 bg-clip-text text-transparent">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-violet-600 dark:text-violet-400 font-medium mt-1">
              Your latest image processing requests
            </CardDescription>
          </div>
          <div className="p-3 rounded-lg bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30">
            <FileX className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-6 h-6 border-3 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="text-violet-500 dark:text-violet-400 font-medium">Loading recent activity...</div>
            </div>
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <FileX className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-violet-600 dark:text-violet-400 font-semibold text-lg">No recent activity</div>
              <div className="text-sm text-muted-foreground">
                Process your first image to see activity here
              </div>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            {recentActivity.map((item, index) => (
              <div className='flex items-center group hover:bg-violet-50 dark:hover:bg-violet-950/10 rounded-lg p-3 transition-colors duration-200' key={item.id}>
                <Avatar className='h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm'>
                  <AvatarFallback className={`${getStatusColor(item.status)} text-white font-bold text-lg`}>
                    {item.originalFileName?.charAt(0)?.toUpperCase() || 'I'}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1 flex-1'>
                  <p className='text-sm font-semibold leading-none text-slate-900 dark:text-slate-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors'>
                    {item.originalFileName || 'Unknown file'}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className='ml-auto'>
                  <Badge
                    variant={item.status === 'ready' ? 'default' : 'secondary'}
                    className={`${getStatusColor(item.status)} text-white border-0 font-medium px-3 py-1 shadow-sm`}
                  >
                    {getStatusLabel(item.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Accent border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 rounded-t-xl" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,_rgba(139,69,199,0.1)_0%,_transparent_50%)]" />
    </Card>
  );
}
