import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import ImageListingPage from '@/features/images/components/image-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Image History',
  description: 'View and manage your previously processed images. Access your complete history of AI-powered background removal and image editing operations.',
  keywords: [
    'image history',
    'processed images',
    'background removal history',
    'image gallery',
    'edited photos',
    'photo archive',
    'image management'
  ],
  openGraph: {
    title: 'Image History | Erazor AI Dashboard',
    description: 'View and manage your previously processed images. Access your complete history of AI-powered background removal operations.',
    type: 'website'
  },
  twitter: {
    title: 'Image History | Erazor AI Dashboard',
    description: 'View and manage your previously processed images. Access your complete history of AI-powered background removal operations.'
  }
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Image History'
            description='Manage and view your previously processed images.'
          />
        </div>
        <Separator />
        <Suspense
          fallback={<p className='w-full min-h-screen h-screen flex items-center justify-center dark:text-white text-black font-medium text-xl'>Something Awesome Loading...</p>}
        >
          <ImageListingPage />
        </Suspense>
      </div>
    </PageContainer >
  );
}
