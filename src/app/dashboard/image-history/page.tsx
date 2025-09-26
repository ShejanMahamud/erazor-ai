import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { Separator } from '@/components/ui/separator';
import ImageListingPage from '@/features/images/components/image-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Image History'
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
          // key={key}
          fallback={<LoadingScreen />}
        >
          <ImageListingPage />
        </Suspense>
      </div>
    </PageContainer >
  );
}
