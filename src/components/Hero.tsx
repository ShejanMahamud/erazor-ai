'use client';

import { Button } from '@/components/ui/button';
import { avatars } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CurvedLoop from './CurvedLoop';
import { AvatarCircles } from './magicui/avatar-circles';
import { AnimatedGradientText } from './ui/animated-gradient-text';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import CircularText from './ui/circular-text';
import { MainBackground } from './ui/main-background';
import { PointerHighlight } from './ui/pointer-highlight';

export const Hero = () => {
  const { isSignedIn } = useAuth();
  const [imageState, setImageState] = useState<'before' | 'after'>('before');

  return (
    <section className='bg-background font-manrope relative inset-0 min-h-screen overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] pt-40'>
      {/* Background Effects */}
      <MainBackground />

      <div className='container mx-auto px-6 pb-16 lg:pl-32'>
        <div className='grid min-h-[80vh] grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Left Column - Content */}
          <div className='space-y-4'>
            {/* Simple Badge */}
            <div className='flex items-start gap-2'>
              <div className='group relative flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]'>
                <span
                  className={cn(
                    'animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]'
                  )}
                  style={{
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'destination-out',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'subtract',
                    WebkitClipPath: 'padding-box'
                  }}
                />
                <div className='flex items-center gap-1'>
                  🎉
                  <AnimatedGradientText className='text-sm font-medium'>
                    Introducing Erazor
                  </AnimatedGradientText>
                  <ChevronRight className='size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5' />
                </div>
              </div>
            </div>

            {/* Clean Main Heading */}
            <div className='space-y-4'>
              <h1 className='text-5xl leading-[1.1] font-bold tracking-tight lg:text-7xl'>
                Remove
                <br />
                <PointerHighlight>
                  <span className='bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent'>
                    Backgrounds
                  </span>
                </PointerHighlight>
                {/* <br /> */}
                Instantly
              </h1>

              <p className='text-foreground/70 max-w-lg text-xl leading-relaxed'>
                Professional AI background removal in seconds. Perfect for
                e-commerce, portraits, and creative projects.
              </p>
            </div>

            {/* Simple Features */}
            <div className='text-foreground/60 flex flex-wrap gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-green-500' />
                <AnimatedShinyText>3-second processing</AnimatedShinyText>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-blue-500' />
                <AnimatedShinyText>99.9% accuracy</AnimatedShinyText>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-purple-500' />
                <AnimatedShinyText>4K quality output</AnimatedShinyText>
              </div>
            </div>

            {/* Clean CTAs */}
            <div className='flex flex-col gap-4 pt-4 sm:flex-row'>
              <Link
                href={
                  isSignedIn ? '/dashboard/background-remover' : '/auth/sign-up'
                }
              >
                <Button
                  asChild
                  size='lg'
                  className={cn(
                    'h-12 rounded-full px-8 text-base',
                    'bg-gradient-to-r from-orange-500 to-purple-600',
                    'hover:shadow-lg hover:shadow-purple-500/25',
                    'text-white transition-all duration-300 hover:scale-105'
                  )}
                >
                  {isSignedIn ? 'Start Now' : 'Try Free'}
                </Button>
              </Link>
            </div>

            <div className='flex flex-col items-start gap-2 lg:flex-row lg:items-center'>
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
              <span className='text-foreground/50 text-sm'>
                Trusted by 10,000+ users worldwide
              </span>
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className='relative'>
            {/* Minimal Demo Container */}
            <div className='group relative'>
              {/* Main Image Container */}
              <div
                className={`relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl shadow-2xl`}
              >
                <Image
                  src={
                    imageState === 'before'
                      ? '/assets/before.jpg'
                      : '/assets/after.png'
                  }
                  alt={
                    imageState === 'before'
                      ? 'Original image'
                      : 'Background removed'
                  }
                  priority={false}
                  fill
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  className='object-cover transition-all duration-700 ease-out'
                />

                {/* Subtle overlay for after state */}
                {imageState === 'after' && (
                  <div className='absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5' />
                )}

                {/* Floating Toggle */}
                <div className='absolute top-4 left-1/2 -translate-x-1/2'>
                  <div
                    className={cn(
                      'flex items-center gap-1 rounded-full p-1',
                      'bg-white/80 backdrop-blur-md dark:bg-black/80',
                      'border border-white/20 shadow-lg'
                    )}
                  >
                    <button
                      onClick={() => setImageState('before')}
                      className={cn(
                        'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                        imageState === 'before'
                          ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                          : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                      )}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setImageState('after')}
                      className={cn(
                        'rounded-full px-4 py-2 text-xs font-medium transition-all duration-300',
                        imageState === 'after'
                          ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                          : 'text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white'
                      )}
                    >
                      After
                    </button>
                  </div>
                </div>
              </div>

              {/* Minimal Action Button */}
              <div className='absolute -bottom-6 left-1/2 -translate-x-1/2'>
                <CircularText
                  text={`${imageState === 'before' ? 'ORIGINAL*IMAGE*' : 'BACKGROUND*REMOVED*'}`}
                  onHover='speedUp'
                  spinDuration={20}
                  className='text-2xl lg:text-xs'
                />
              </div>
            </div>

            {/* Ambient Background Effects */}
            <div className='absolute inset-0 -z-10'>
              <div className='absolute top-1/4 -left-12 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl' />
              <div className='absolute -right-12 bottom-1/4 h-40 w-40 rounded-full bg-purple-600/10 blur-2xl' />
            </div>
          </div>
        </div>
        <CurvedLoop
          marqueeText='Remove ✦ Backgrounds ✦ Instantly ✦'
          speed={3}
          curveAmount={50}
          direction='right'
          interactive={true}
        />
      </div>
    </section>
  );
};
