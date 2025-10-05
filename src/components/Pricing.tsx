'use client';

import { PricingCard } from '@/components/PricingCard';
import { PricingHeader } from '@/components/PricingHeader';
import { PAYMENT_FREQUENCIES } from '@/config';
import { useSubscriptionStore } from '@/stores/subscription-store';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { PricingError } from './PricingError';
import { PricingSkeleton } from './PricingSkeleton';

export const Pricing = () => {
  const [selectedPaymentFreq, setSelectedPaymentFreq] = useState(
    PAYMENT_FREQUENCIES[0]
  );

  // Use custom hooks for data fetching
  const [userSubscription, plans, loading, error, fetchPlans] = useSubscriptionStore(useShallow((state) => [state.subscription, state.plans, state.loading, state.error, state.fetchPlans]));

  // Fetch plans when component mounts
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Show loading skeleton while data is being fetched
  if (loading) {
    return <PricingSkeleton />;
  }

  // Show error state if plans failed to load
  if (error) {
    return <PricingError error={error} />;
  }

  return (
    <section className='my-24 flex flex-col items-center gap-10 px-5 py-10'>
      {/* Section Header */}
      <PricingHeader
        title='Plans and '
        focusText=' Pricing'
        subtitle='Receive unlimited credits when you pay yearly, and save on your plan.'
        frequencies={PAYMENT_FREQUENCIES}
        selectedFrequency={selectedPaymentFreq}
        onFrequencyChange={setSelectedPaymentFreq}
      />

      {/* Pricing Cards */}
      <div className='flex w-full max-w-6xl justify-center'>
        <div className='w-full mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 place-items-center'>
          {plans?.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              paymentFrequency={selectedPaymentFreq}
              userSubscription={userSubscription}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
