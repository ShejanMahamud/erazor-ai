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
        setLoading(false);
        return;
      }

      try {
        const limit = perPage;
        const searchQuery = search || originalFileName;

        const filters = new URLSearchParams({
          limit: String(limit),
          ...(cursor && { cursor: String(cursor) }),
          ...(searchQuery && { search: String(searchQuery) }),
          ...(status && { status: String(status) })
        });

        const res = await fetch(
          `/api/images/history?${filters}`
        );

        if (!res.ok) {
          const errorData = await res.text();
          toast.error('Failed to fetch images', {
            description: errorData
          });
          return;
        }

        const responseData: ApiResponse = await res.json();
        setData(responseData);
      } catch (error) {
        toast.error('Failed to fetch images', {
          description: (error as Error).message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId, getToken, perPage, cursor, search, originalFileName, status]);

  if (loading) {
    return <p className='w-full min-h-screen h-screen flex items-center justify-center dark:text-white text-black font-medium text-xl'>Something Awesome Loading...</p>;
  }

  if (!data || !data.data) {
    return <DataNotFound />;
  }

  if (data.data.length === 0) {
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
