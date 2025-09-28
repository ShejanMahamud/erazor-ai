import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import ImageViewPage from '@/features/images/components/image-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Image Details',
  description: 'View detailed information about your processed image, including before and after comparison, processing settings, and download options.',
  keywords: [
    'image details',
    'processed image',
    'image comparison',
    'before and after',
    'image download',
    'processing history'
  ],
  openGraph: {
    title: 'Image Details | Erazor AI Dashboard',
    description: 'View detailed information about your processed image, including before and after comparison and download options.',
    type: 'website'
  },
  twitter: {
    title: 'Image Details | Erazor AI Dashboard',
    description: 'View detailed information about your processed image, including before and after comparison and download options.'
  },
  robots: {
    index: false,
    follow: false
  }
};

type PageProps = { params: Promise<{ imageId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ImageViewPage imageId={params.imageId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
