'use client';

import { CDN_URL } from '@/constants/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import HeadingText from './ui/heading-text';

export const UseCases = () => {
  const [activeCategory, setActiveCategory] = useState('branding');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = [
    {
      id: 'branding',
      name: 'Branding',
      color: 'from-orange-500 to-purple-600'
    },
    {
      id: 'portraits',
      name: 'Portraits',
      color: 'from-orange-500 to-purple-600'
    },
    {
      id: 'creative',
      name: 'Creative',
      color: 'from-orange-500 to-purple-600'
    },
    {
      id: 'social',
      name: 'Social Media',
      color: 'from-orange-500 to-purple-600'
    }
  ];

  const useCases = {
    branding: [
      {
        before: `${CDN_URL}/assets/product-1.jpg`,
        after: `${CDN_URL}/assets/product-1-removed.png`
      },
      {
        before: `${CDN_URL}/assets/product-2.jpg`,
        after: `${CDN_URL}/assets/product-2-removed.png`
      },
      {
        before: `${CDN_URL}/assets/product-3.jpg`,
        after: `${CDN_URL}/assets/product-3-removed.png`
      }
    ],
    portraits: [
      {
        before: `${CDN_URL}/assets/portrait-1.jpg`,
        after: `${CDN_URL}/assets/portrait-1-removed.png`
      },
      {
        before: `${CDN_URL}/assets/portrait-2.jpg`,
        after: `${CDN_URL}/assets/portrait-2-removed.png`
      },
      {
        before: `${CDN_URL}/assets/portrait-3.jpg`,
        after: `${CDN_URL}/assets/portrait-3-removed.png`
      }
    ],
    creative: [
      {
        before: `${CDN_URL}/assets/creative-1.jpg`,
        after: `${CDN_URL}/assets/creative-1-removed.png`
      },
      {
        before: `${CDN_URL}/assets/creative-2.jpg`,
        after: `${CDN_URL}/assets/creative-2-removed.png`
      },
      {
        before: `${CDN_URL}/assets/creative-3.jpg`,
        after: `${CDN_URL}/assets/creative-3-removed.png`
      }
    ],
    social: [
      {
        before: `${CDN_URL}/assets/social-1.jpg`,
        after: `${CDN_URL}/assets/social-1-removed.png`
      },
      {
        before: `${CDN_URL}/assets/social-2.jpg`,
        after: `${CDN_URL}/assets/social-2-removed.png`
      },
      {
        before: `${CDN_URL}/assets/social-3.jpg`,
        after: `${CDN_URL}/assets/social-3-removed.png`
      }
    ]
  };

  const currentUseCase = useCases[activeCategory as keyof typeof useCases];
  const activeColor =
    categories.find((cat) => cat.id === activeCategory)?.color ||
    'from-orange-500 to-purple-600';

  return (
    <section className='bg-background relative overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] py-24'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-purple-600/5' />

      <div className='container mx-auto px-6'>
        {/* Header */}
        <HeadingText
          heading='Use '
          focusText=' Cases'
          paragraph='Discover how Erazor AI can transform your images across various scenarios, from e-commerce to creative projects.'
          boxStyles='mb-12'
        />

        {/* Category Tabs */}
        <div className='mb-12 flex flex-wrap justify-center gap-2'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'group relative rounded-lg px-4 py-2 font-medium transition-all duration-300',
                activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground border border-gray-200/50 bg-white/50 hover:border-orange-500/30 dark:border-gray-800/50 dark:bg-black/20'
              )}
            >
              {activeCategory === category.id && (
                <div
                  className={cn(
                    'absolute inset-0 rounded-lg bg-gradient-to-r',
                    category.color
                  )}
                />
              )}
              <div className='relative flex items-center gap-2'>
                <span className='text-sm'>{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {currentUseCase.map((useCase, index) => (
            <div
              key={`${activeCategory}-${index}`}
              className='group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-gray-800/50 dark:bg-black/20'
              onClick={() =>
                setActiveImageIndex(activeImageIndex === index ? null : index)
              }
            >
              {/* Before/After Images */}
              <div className='relative aspect-[4/4] overflow-hidden'>
                {/* Before Image */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    'group-hover:opacity-0',
                    activeImageIndex === index && 'opacity-0'
                  )}
                >
                  <Image
                    src={useCase.before}
                    alt={`Before`}
                    fill
                    priority={false}
                    loading='lazy'
                    placeholder='blur'
                    blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/20' />
                </div>

                {/* After Image Overlay */}
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    'group-hover:opacity-100',
                    activeImageIndex === index ? 'opacity-100' : 'opacity-0'
                  )}
                >
                  {/* Transparent Background Pattern */}
                  <div
                    className='absolute inset-0'
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%)
                      `,
                      backgroundSize: '20px 20px',
                      backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                    }}
                  />
                  <Image
                    src={useCase.after}
                    alt={`After`}
                    fill
                    priority={false}
                    loading='lazy'
                    placeholder='blur'
                    blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='object-cover'
                  />
                </div>

                {/* Before/After Labels */}
                <div className='absolute top-4 left-4 flex gap-2'>
                  <div className='rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm'>
                    Before
                  </div>
                  <div
                    className={cn(
                      'rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white transition-opacity duration-300',
                      'group-hover:opacity-100',
                      activeImageIndex === index ? 'opacity-100' : 'opacity-0',
                      activeColor
                    )}
                  >
                    After
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className='mt-16 text-center'>
          <div className='inline-flex items-center gap-4 rounded-2xl border border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-4 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50'>
            <div className='text-foreground/70'>
              Ready to transform your images?
            </div>
            <Button
              className={cn(
                'rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 cursor-pointer',
                activeColor
              )}
            >
              <Link className='cursor-pointer' href='/dashboard'>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
