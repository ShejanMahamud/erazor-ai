'use client';

import PageContainer from '@/components/layout/page-container';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { useBackgroundRemover } from '@/hooks/useBackgroundRemover';
import { useBackgroundRemoverAnimations } from '@/hooks/useBackgroundRemoverAnimations';
import { useSubscription } from '@/hooks/useSubscription';
import { AlertTriangle, Download, Loader2, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { Suspense, useCallback, useRef, useState } from 'react';

export default function BackgroundRemoverPage() {
  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const beforeImageRef = useRef<HTMLImageElement>(null);
  const afterImageRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const refs = {
    containerRef,
    uploadAreaRef,
    processingRef,
    resultsRef,
    beforeImageRef,
    afterImageRef,
    buttonsRef,
    bannerRef
  };

  // Custom hooks
  const subscription = useSubscription();

  // State to control banner visibility after usage limit is reached
  const [showUsageLimitBanner, setShowUsageLimitBanner] = useState(false);

  // Callback for when usage limit is reached
  const handleUsageLimitReached = useCallback(() => {
    setShowUsageLimitBanner(true);
  }, []); const animations = useBackgroundRemoverAnimations({
    refs,
    isUploading: false, // Will be updated with actual values
    isProcessing: false, // Will be updated with actual values
    currentImage: null, // Will be updated with actual values
    hasActiveSubscription: subscription.hasActiveSubscription,
    subscriptionChecked: subscription.subscriptionChecked
  });

  const backgroundRemover = useBackgroundRemover({
    hasActiveSubscription: subscription.hasActiveSubscription,
    onAnimateReset: (onComplete) => {
      // Clear the usage limit banner when resetting
      setShowUsageLimitBanner(false);
      animations.animateReset(onComplete);
    },
    onAnimateUploadAreaIn: animations.animateUploadAreaIn,
    onAnimateDownloadButton: animations.animateDownloadButton,
    onUsageLimitReached: handleUsageLimitReached
  });

  // Update animations with actual values from backgroundRemover
  useBackgroundRemoverAnimations({
    refs,
    isUploading: backgroundRemover.isUploading,
    isProcessing: backgroundRemover.isProcessing,
    currentImage: backgroundRemover.currentImage,
    hasActiveSubscription: subscription.hasActiveSubscription,
    subscriptionChecked: subscription.subscriptionChecked
  });

  // Determine what banner to show and when
  const shouldShowBanner = subscription.subscriptionChecked && (
    // Show usage limit banner if user has reached limit (regardless of subscription status)
    (showUsageLimitBanner || backgroundRemover.isUsageLimitReached) ||
    // Show subscription banner only if user has no subscription AND hasn't reached usage limit yet
    (subscription.hasActiveSubscription === false && !showUsageLimitBanner && !backgroundRemover.isUsageLimitReached)
  );

  const bannerType = (showUsageLimitBanner || backgroundRemover.isUsageLimitReached) ? 'usage-limit' : 'subscription';

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Subscription Banner */}
        <SubscriptionBanner
          ref={bannerRef}
          show={shouldShowBanner}
          type={bannerType}
        />

        <div className='flex items-start justify-between'>
          <Heading
            title='Remove Background'
            description='Easily remove backgrounds from images.'
          />
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <div
            ref={containerRef}
            className='mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black'
          >
            {!backgroundRemover.files.length &&
              !backgroundRemover.isUploading &&
              !backgroundRemover.isProcessing &&
              !backgroundRemover.currentImage && (
                <div
                  ref={uploadAreaRef}
                  className='flex min-h-80 flex-col items-center justify-center'
                >
                  <div className={(showUsageLimitBanner || backgroundRemover.isUsageLimitReached) ? 'opacity-50 pointer-events-none' : ''}>
                    <FileUpload onChange={backgroundRemover.handleFileUpload} preview={true} />
                  </div>
                  <p className='text-muted-foreground mt-4 text-sm'>
                    {(showUsageLimitBanner || backgroundRemover.isUsageLimitReached)
                      ? 'You have reached your usage limit. Subscribe to continue removing backgrounds.'
                      : subscription.hasActiveSubscription === false
                        ? 'Upload an image to remove its background'
                        : 'Upload an image to remove its background'
                    }
                  </p>
                </div>
              )}

            {(backgroundRemover.isUploading || backgroundRemover.isProcessing) && (
              <div
                ref={processingRef}
                className='flex min-h-80 flex-col items-center justify-center space-y-6'
              >
                <div className='relative'>
                  <Loader2 className='text-primary h-16 w-16 animate-spin' />
                </div>
                <div className='space-y-2 text-center'>
                  <h3 className='text-lg font-semibold'>
                    {backgroundRemover.isUploading
                      ? 'Uploading image...'
                      : 'Removing background...'}
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    {backgroundRemover.isUploading
                      ? 'Please wait while we upload your image'
                      : 'AI is processing your image, this may take a few moments'}
                  </p>
                </div>
                <div className='bg-secondary h-2 w-full max-w-xs rounded-full'>
                  <div
                    className='progress-bar bg-primary h-2 animate-pulse rounded-full'
                    style={{ width: backgroundRemover.isUploading ? '30%' : '70%' }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {backgroundRemover.error && !backgroundRemover.isUsageLimitReached && (
              <div className='flex min-h-80 flex-col items-center justify-center space-y-4'>
                <div className='rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950'>
                  <div className='flex items-center space-x-3'>
                    <div className='rounded-full bg-red-100 p-2 dark:bg-red-900'>
                      <AlertTriangle className='h-5 w-5 text-red-600 dark:text-red-400' />
                    </div>
                    <div>
                      <h3 className='font-medium text-red-800 dark:text-red-200'>
                        Processing Failed
                      </h3>
                      <p className='text-sm text-red-600 dark:text-red-400'>
                        {backgroundRemover.error}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant='outline'
                  onClick={backgroundRemover.handleReset}
                  className='flex items-center gap-2'
                >
                  <RotateCcw className='h-4 w-4' />
                  Try Again
                </Button>
              </div>
            )}

            {backgroundRemover.currentImage && backgroundRemover.originalImageUrl && (
              <div ref={resultsRef} className='space-y-6'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold'>
                    Background Removed Successfully!
                  </h3>
                  <div ref={buttonsRef} className='flex gap-2'>
                    <Button
                      onClick={backgroundRemover.handleDownload}
                      className='flex items-center gap-2'
                    >
                      <Download className='h-4 w-4' />
                      Download
                    </Button>
                    <Button
                      variant='outline'
                      onClick={backgroundRemover.handleReset}
                      className='flex items-center gap-2 bg-transparent'
                    >
                      <RotateCcw className='h-4 w-4' />
                      New Image
                    </Button>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                  {/* Before */}
                  <div className='space-y-3'>
                    <h4 className='text-center text-sm font-medium'>Before</h4>
                    <div className='relative flex min-h-80 items-center justify-center rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                      <Image
                        ref={beforeImageRef}
                        src={backgroundRemover.originalImageUrl || '/placeholder.svg'}
                        alt='Original'
                        width={500}
                        height={400}
                        className='max-h-72 max-w-full rounded-lg object-contain shadow-sm'
                        priority
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className='space-y-3'>
                    <h4 className='text-center text-sm font-medium'>After</h4>
                    <div
                      className='relative flex min-h-80 items-center justify-center rounded-lg bg-transparent p-4'
                      style={{
                        backgroundImage: `linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)`,
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                      }}
                    >
                      <Image
                        ref={afterImageRef}
                        src={
                          backgroundRemover.currentImage.bgRemovedImageUrlHQ ||
                          backgroundRemover.currentImage.bgRemovedImageUrlLQ ||
                          '/placeholder.svg'
                        }
                        alt='Background Removed'
                        width={500}
                        height={400}
                        className='max-h-72 max-w-full rounded-lg object-contain shadow-sm'
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className='text-muted-foreground text-center text-sm'>
                  Original filename: {backgroundRemover.currentImage.originalFileName}
                </div>
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </PageContainer>
  );
}
