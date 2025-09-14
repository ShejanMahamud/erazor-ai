'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import HeadingText from './ui/heading-text';

export const UseCases = () => {
  const [activeCategory, setActiveCategory] = useState('ecommerce');

  const categories = [
    {
      id: 'ecommerce',
      name: 'E-commerce',
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
    ecommerce: [
      {
        title: 'Fashion Product',
        description: 'Clean product shots for online stores',
        before:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Clothing', 'Clean Background', 'Professional']
      },
      {
        title: 'Electronics',
        description: 'Tech products with consistent backgrounds',
        before:
          'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Gadgets', 'White Background', 'Catalog']
      },
      {
        title: 'Jewelry',
        description: 'Luxury items with premium presentation',
        before:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Luxury', 'Detailed', 'High-end']
      }
    ],
    portraits: [
      {
        title: 'Professional Headshots',
        description: 'Corporate profiles and LinkedIn photos',
        before:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Business', 'Professional', 'Corporate']
      },
      {
        title: 'Creative Portraits',
        description: 'Artistic and personal photography',
        before:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Artistic', 'Personal', 'Creative']
      },
      {
        title: 'Team Photos',
        description: 'Consistent team member presentations',
        before:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Team', 'Consistent', 'Group']
      }
    ],
    creative: [
      {
        title: 'Digital Art',
        description: 'Fantasy and creative compositions',
        before:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Art', 'Digital', 'Fantasy']
      },
      {
        title: 'Photo Manipulation',
        description: 'Advanced editing and composites',
        before:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Composite', 'Advanced', 'Creative']
      },
      {
        title: 'Brand Assets',
        description: 'Marketing materials and graphics',
        before:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Branding', 'Marketing', 'Graphics']
      }
    ],
    social: [
      {
        title: 'Instagram Posts',
        description: 'Eye-catching social media content',
        before:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Instagram', 'Social', 'Viral']
      },
      {
        title: 'Story Content',
        description: 'Engaging stories and reels',
        before:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Stories', 'Reels', 'Engaging']
      },
      {
        title: 'Profile Pictures',
        description: 'Perfect avatars for all platforms',
        before:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
        after:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&bg-remove=true',
        tags: ['Avatar', 'Profile', 'Personal']
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
                <div className='absolute inset-0 transition-transform duration-700 group-hover:scale-105'>
                  <Image
                    src={useCase.before}
                    alt={`${useCase.title} - Before`}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/20' />
                </div>

                {/* After Image Overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <div className='absolute top-0 right-0 h-full w-1/2'>
                    <Image
                      src={useCase.after}
                      alt={`${useCase.title} - After`}
                      fill
                      className='object-cover'
                    />
                  </div>
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
