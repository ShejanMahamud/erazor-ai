'use client';

import { DataNotFound } from '@/components/ui/not-found';
import { ApiResponse } from '@/types/image';
import { useAuth } from '@clerk/nextjs';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ImageTable } from './image-tables';
import { columns } from './image-tables/columns';

export default function ImageListingPage() {
  const { userId, getToken } = useAuth();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Use client-side nuqs hooks
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [cursor] = useQueryState('cursor', parseAsString);
  const [search] = useQueryState('search', parseAsString);
  const [originalFileName] = useQueryState('originalFileName', parseAsString);
  const [status] = useQueryState('status', parseAsString);

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) {
        console.log('No userId available, skipping fetch');
        setLoading(false);
        return;
      }

      console.log('Starting to fetch images for userId:', userId);

      try {
        const token = await getToken();
        console.log('Got token:', token ? 'Token received' : 'No token');

        const limit = perPage;
        const searchQuery = search || originalFileName;

        const filters = new URLSearchParams({
          limit: String(limit),
          ...(cursor && { cursor: String(cursor) }),
          ...(searchQuery && { search: String(searchQuery) }),
          ...(status && { status: String(status) })
        }); console.log('Fetching images with filters:', filters.toString());
        console.log('Request URL:', `/api/images/history?${filters}`);

        const res = await fetch(
          `/api/images/history?${filters}`
        );

        console.log('API Response status:', res.status);
        console.log('API Response headers:', res.headers);

        if (!res.ok) {
          const errorData = await res.text();
          console.error('API Error:', errorData);
          toast.error('Failed to fetch images');
          return;
        }

        const responseData: ApiResponse = await res.json();
        console.log('Client - Received data:', {
          success: responseData.success,
          dataLength: responseData.data?.length || 0,
          meta: responseData.meta
        });
        setData(responseData);
      } catch (error) {
        toast.error('Failed to fetch images', {
          description: (error as Error).message
        });
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId, getToken, perPage, cursor, search, originalFileName, status]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.data) {
    console.log('No data available:', data);
    return <DataNotFound />;
  }

  if (data.data.length === 0) {
    console.log('Data array is empty');
    return <DataNotFound />;
  }

  return (
    <ImageTable
      data={data.data}
      totalItems={data.meta.count}
      columns={columns}
    />
  );
}
