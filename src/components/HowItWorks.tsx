'use client';

import { cn } from '@/lib/utils';
import { Download, Upload, Wand2 } from 'lucide-react';
import { useState } from 'react';
import HeadingText from './ui/heading-text';

export const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: 'Upload Your Image',
      description:
        'Simply drag and drop or click to upload any image with a background you want to remove.',
      features: [
        'JPG, PNG, WEBP support',
        'Up to 10MB file size',
        'Batch upload available'
      ],
      color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      bgPattern:
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent'
    },
    {
      id: 2,
      icon: Wand2,
      title: 'AI Magic Happens',
      description:
        'Our advanced neural networks analyze your image and precisely identify the subject from background.',
      features: ['99.9% accuracy', '3-second processing', 'Edge refinement'],
      color: 'bg-gradient-to-br from-orange-500 to-purple-600',
      bgPattern:
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-purple-600/10 to-transparent'
    },
    {
      id: 3,
      icon: Download,
      title: 'Download & Use',
      description:
        'Get your professional result instantly. Download as PNG with transparency or add a new background.',
      features: ['4K quality output', 'Instant download', 'Multiple formats'],
      color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
      bgPattern:
        'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-cyan-600/10 to-transparent'
    }
  ];

  return (
    <section className='bg-background relative overflow-hidden py-24'>
      {/* Subtle Background Pattern */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]' />

      <div className='container mx-auto px-6'>
        {/* Header Section */}
        <HeadingText
          heading='How It '
          focusText=' Works'
          paragraph='Transform your images in seconds with our AI-powered background removal technology'
          boxStyles='mb-12'
        />

        {/* Steps Section - Horizontal Layout */}
        <div className='relative mx-auto max-w-7xl'>
          {/* Connection Lines */}
          <div className='absolute top-1/2 right-0 left-0 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-emerald-500 via-orange-500 to-blue-500 opacity-30 lg:block' />

          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-4'>
            {steps.map((step) => {
              const isHovered = hoveredStep === step.id;

              return (
                <div
                  key={step.id}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className='group relative'
                >
                  {/* Step Card */}
                  <div
                    className={cn(
                      'relative h-full cursor-pointer rounded-3xl border p-8 transition-all duration-500',
                      'bg-white/50 backdrop-blur-sm dark:bg-black/20',
                      'border-gray-200/50 dark:border-gray-800/50',
                      'hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10',
                      'hover:-translate-y-2 hover:scale-[1.02]',
                      isHovered &&
                      '-translate-y-2 scale-[1.02] border-orange-500/50 shadow-2xl shadow-orange-500/20'
                    )}
                  >
                    {/* Background Pattern */}
                    <div
                      className={cn(
                        'absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500',
                        step.bgPattern,
                        isHovered && 'opacity-100'
                      )}
                    />

                    {/* Step Number */}
                    <div className='absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-sm font-bold text-white shadow-lg'>
                      {step.id}
                    </div>

                    {/* Modern Visual Indicator */}
                    <div className='relative mb-8'>
                      {step.id === 1 && (
                        <div className='relative'>
                          {/* Modern Upload Visualization */}
                          <div className='relative h-20 w-full'>
                            {/* Base Layer */}
                            <div className='absolute inset-0 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-teal-600/10' />

                            {/* Upload Indicator */}
                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='relative'>
                                {/* Animated Upload Arrow */}
                                <div className='flex h-8 w-8 items-center justify-center rounded-lg border-2 border-emerald-500 bg-emerald-500/10 transition-all duration-300 group-hover:bg-emerald-500/20'>
                                  <div className='h-4 w-0 transform border-l-2 border-emerald-500 transition-transform duration-300 group-hover:-translate-y-1' />
                                  <div className='absolute h-2 w-2 -translate-y-1 -rotate-45 transform border-t-2 border-r-2 border-emerald-500 transition-transform duration-300 group-hover:-translate-y-2' />
                                </div>

                                {/* Floating Particles */}
                                <div className='absolute -top-2 -right-2 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400' />
                                <div
                                  className='absolute -bottom-2 -left-2 h-1 w-1 animate-pulse rounded-full bg-emerald-300'
                                  style={{ animationDelay: '0.5s' }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.id === 2 && (
                        <div className='relative'>
                          {/* AI Processing Visualization */}
                          <div className='relative h-20 w-full'>
                            {/* Neural Network Pattern */}
                            <div className='absolute inset-0 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-purple-600/10'>
                              {/* Network Nodes */}
                              <div className='absolute top-4 left-4 h-2 w-2 animate-pulse rounded-full bg-orange-400' />
                              <div
                                className='absolute top-6 right-6 h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400'
                                style={{ animationDelay: '0.3s' }}
                              />
                              <div
                                className='absolute bottom-4 left-8 h-1 w-1 animate-pulse rounded-full bg-orange-300'
                                style={{ animationDelay: '0.6s' }}
                              />
                              <div
                                className='absolute right-4 bottom-6 h-2 w-2 animate-pulse rounded-full bg-purple-500'
                                style={{ animationDelay: '0.9s' }}
                              />

                              {/* Connecting Lines */}
                              <svg
                                className='absolute inset-0 h-full w-full'
                                viewBox='0 0 100 80'
                              >
                                <path
                                  d='M 20 20 Q 50 40 80 25'
                                  stroke='url(#gradient1)'
                                  strokeWidth='1'
                                  fill='none'
                                  className='opacity-40'
                                />
                                <path
                                  d='M 15 60 Q 45 30 85 55'
                                  stroke='url(#gradient2)'
                                  strokeWidth='1'
                                  fill='none'
                                  className='opacity-40'
                                />
                                <defs>
                                  <linearGradient
                                    id='gradient1'
                                    x1='0%'
                                    y1='0%'
                                    x2='100%'
                                    y2='0%'
                                  >
                                    <stop
                                      offset='0%'
                                      stopColor='rgb(249 115 22)'
                                    />
                                    <stop
                                      offset='100%'
                                      stopColor='rgb(147 51 234)'
                                    />
                                  </linearGradient>
                                  <linearGradient
                                    id='gradient2'
                                    x1='0%'
                                    y1='0%'
                                    x2='100%'
                                    y2='0%'
                                  >
                                    <stop
                                      offset='0%'
                                      stopColor='rgb(147 51 234)'
                                    />
                                    <stop
                                      offset='100%'
                                      stopColor='rgb(249 115 22)'
                                    />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>

                            {/* Processing Wave */}
                            <div className='absolute inset-0 -skew-x-12 transform animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-2000 group-hover:translate-x-full group-hover:animate-none' />
                          </div>
                        </div>
                      )}

                      {step.id === 3 && (
                        <div className='relative'>
                          {/* Download Complete Visualization */}
                          <div className='relative h-20 w-full'>
                            {/* Success Container */}
                            <div className='absolute inset-0 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-600/10' />

                            <div className='absolute inset-0 flex items-center justify-center'>
                              <div className='relative flex items-center gap-4'>
                                {/* Document Icon */}
                                <div className='relative'>
                                  <div className='flex h-8 w-6 flex-col justify-end rounded-sm bg-blue-500 p-1'>
                                    <div className='mb-1 h-2 w-4 rounded-sm bg-blue-400' />
                                    <div className='h-1 w-3 rounded-sm bg-blue-300' />
                                  </div>
                                  {/* Success Badge */}
                                  <div className='absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white bg-green-500'>
                                    <div className='h-1 w-1 rounded-full bg-white' />
                                  </div>
                                </div>

                                {/* Download Progress */}
                                <div className='space-y-1'>
                                  <div className='h-1 w-12 overflow-hidden rounded-full bg-blue-200'>
                                    <div className='h-full w-full transform rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:animate-pulse' />
                                  </div>
                                  <div className='h-0.5 w-8 rounded-full bg-blue-100' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className='relative z-10 space-y-4'>
                      <h3 className='text-foreground text-2xl font-bold transition-colors duration-300 group-hover:text-orange-500'>
                        {step.title}
                      </h3>

                      <p className='text-foreground/70 leading-relaxed'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
