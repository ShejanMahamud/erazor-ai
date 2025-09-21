'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { serverBaseUrl } from '@/config';
import { useAuth } from '@clerk/nextjs';
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
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your latest image processing requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading recent activity...</div>
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">No recent activity</div>
          </div>
        ) : (
          <div className='space-y-8'>
            {recentActivity.map((item) => (
              <div className='flex items-center' key={item.id}>
                <Avatar className='h-9 w-9'>
                  <AvatarFallback className={getStatusColor(item.status)}>
                    {item.originalFileName?.charAt(0)?.toUpperCase() || 'I'}
                  </AvatarFallback>
                </Avatar>
                <div className='ml-4 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {item.originalFileName || 'Unknown file'}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className='ml-auto'>
                  <Badge 
                    variant={item.status === 'ready' ? 'default' : 'secondary'}
                    className={`${getStatusColor(item.status)} text-white`}
                  >
                    {getStatusLabel(item.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
