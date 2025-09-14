import CTA from '@/components/CTA';
import { FAQ } from '@/components/FAQ';
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
      <div className='bg-background min-h-screen bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]'>
        <Hero />
        <HowItWorks />
        <UseCases />
        <WhyWe />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </div>
    </MainLayout>
  );
}
