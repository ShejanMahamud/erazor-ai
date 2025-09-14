import CTA from '@/components/CTA';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Pricing } from '@/components/Pricing';
import Testimonials from '@/components/Testomonials';
import { UseCases } from '@/components/UseCases';
import WhyWe from '@/components/WhyWe';
import MainLayout from '@/components/layout/main-layout';

export default async function Home() {
  return (
    <MainLayout>
      <div className='min-h-screen'>
        <Hero />
        <HowItWorks />
        <UseCases />
        <WhyWe />
        <Testimonials />
        <Pricing />
        <CTA />
      </div>
    </MainLayout>
  );
}
