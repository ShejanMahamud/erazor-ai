'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import HeadingText from './ui/heading-text';

export const UseCases = () => {
  const [activeCategory, setActiveCategory] = useState('branding');

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
        before: '/assets/product-1.jpg',
        after: '/assets/product-1-removed.png'
      },
      {
        before:
          'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&bg-remove=true'
      }
    ],
    portraits: [
      {
        before:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1757589815261-89c790bb3241?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1757589815261-89c790bb3241?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&bg-remove=true'
      }
    ],
    creative: [
      {
        before:
          'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&bg-remove=true'
      }
    ],
    social: [
      {
        before:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&bg-remove=true'
      },
      {
        before:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&bg-remove=true'
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
          paragraph='Discover how Erazor can transform your images across various scenarios, from e-commerce to creative projects.'
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
              className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 dark:border-gray-800/50 dark:bg-black/20'
            >
              {/* Before/After Images */}
              <div className='relative aspect-[4/4] overflow-hidden'>
                {/* Before Image */}
                <div className='absolute inset-0 transition-opacity duration-500 group-hover:opacity-0'>
                  <Image
                    src={useCase.before}
                    alt={`Before`}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/20' />
                </div>

                {/* After Image Overlay */}
                <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
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
                      'rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100',
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
            <div
              className={cn(
                'rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105',
                activeColor
              )}
            >
              Try It Free
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
