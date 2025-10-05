export const PricingSkeleton = () => {
    return (
        <section className='my-32 flex flex-col items-center gap-10 px-10 py-10'>
            {/* Header Skeleton */}
            <div className='animate-pulse text-center'>
                <div className='mx-auto mb-4 h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-700'></div>
                <div className='bg-gray-150 mx-auto h-4 w-96 rounded dark:bg-gray-600'></div>
            </div>

            {/* Frequency Toggle Skeleton */}
            <div className='animate-pulse'>
                <div className='h-12 w-48 rounded-full bg-gray-200 dark:bg-gray-700'></div>
            </div>

            {/* Pricing Cards Skeleton */}
            <div className='flex w-full max-w-6xl justify-center'>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className='bg-background relative flex min-h-[400px] animate-pulse flex-col gap-8 overflow-hidden rounded-2xl border p-6 shadow'
                        >
                            {/* Card Header Skeleton */}
                            <div className='flex items-center gap-3'>
                                <div className='h-6 w-16 rounded bg-gray-200 dark:bg-gray-700'></div>
                                {i === 2 && (
                                    <div className='h-5 w-20 rounded-full bg-orange-200 dark:bg-orange-800'></div>
                                )}
                            </div>

                            {/* Price Section Skeleton */}
                            <div className='space-y-2'>
                                <div className='bg-gray-150 h-4 w-20 rounded dark:bg-gray-600'></div>
                                <div className='flex items-baseline gap-3'>
                                    <div className='h-12 w-24 rounded bg-gray-200 dark:bg-gray-700'></div>
                                    {i > 0 && (
                                        <div className='h-6 w-16 rounded-full bg-green-200 dark:bg-green-800'></div>
                                    )}
                                </div>
                                <div className='bg-gray-150 h-3 w-16 rounded dark:bg-gray-600'></div>
                            </div>

                            {/* Description Skeleton */}
                            <div className='bg-gray-150 h-4 w-32 rounded dark:bg-gray-600'></div>

                            {/* Features List Skeleton */}
                            <div className='flex-1 space-y-3'>
                                {[...Array(5)].map((_, featureIndex) => (
                                    <div key={featureIndex} className='flex items-center gap-2'>
                                        <div className='h-4 w-4 rounded bg-gray-200 dark:bg-gray-700'></div>
                                        <div
                                            className={`bg-gray-150 h-3 rounded dark:bg-gray-600 ${featureIndex === 0
                                                ? 'w-28'
                                                : featureIndex === 1
                                                    ? 'w-24'
                                                    : featureIndex === 2
                                                        ? 'w-32'
                                                        : featureIndex === 3
                                                            ? 'w-20'
                                                            : 'w-16'
                                                }`}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button Skeleton */}
                            <div className='h-11 w-full rounded-lg bg-gray-200 dark:bg-gray-700'></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};