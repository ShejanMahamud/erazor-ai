export const PricingError = ({ error }: { error: string }) => {
    return (
        <section className='my-32 flex flex-col items-center gap-10 py-10'>
            <div className='text-center'>
                <h2 className='mb-2 text-2xl font-bold text-red-600'>
                    Error loading plans
                </h2>
                <p className='text-gray-600'>{error}</p>
            </div>
        </section>
    );
};