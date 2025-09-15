import MainLayout from '@/components/layout/main-layout';
import { Pricing } from '@/components/Pricing';
import { PricingFAQ } from '@/components/PricingFAQ';
import { Spotlight } from '@/components/ui/spotlight';

export default function PricingPage() {
  return (
    <MainLayout>
      <div className='bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] bg-background relative flex h-full w-full overflow-hidden rounded-md antialiased md:items-center md:justify-center'>
        <Spotlight
          className='-top-40 left-0 md:-top-20 md:left-60'
          fill='white'
        />
        <Pricing />
      </div>
      <PricingFAQ />
    </MainLayout>
  );
}
