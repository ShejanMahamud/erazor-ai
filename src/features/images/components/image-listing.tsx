'use client';

import { DataNotFound } from '@/components/ui/not-found';
import { searchParamsCache } from '@/lib/searchparams';
import { ApiResponse } from '@/types/image';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ImageTable } from './image-tables';
import { columns } from './image-tables/columns';

export default function ImageListingPage() {
  const { userId, getToken } = useAuth();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) return;

      try {
        const token = await getToken();
        const limit = searchParamsCache.get('perPage') ?? 10;
        const cursor = searchParamsCache.get('cursor');
        const search = searchParamsCache.get('search');
        const originalFileName = searchParamsCache.get('originalFileName');
        const status = searchParamsCache.get('status');

        const searchQuery = search || originalFileName;

        const filters = new URLSearchParams({
          limit: String(limit),
          ...(cursor && { cursor: String(cursor) }),
          ...(searchQuery && { search: String(searchQuery) }),
          ...(status && { status: String(status) })
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/user/${userId}?${filters}`,
          { cache: 'no-store', headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) {
          toast.error('Failed to fetch images');
          return;
        }

        const responseData: ApiResponse = await res.json();
        setData(responseData);
      } catch (error) {
        toast.error('Failed to fetch images');
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [userId, getToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
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
