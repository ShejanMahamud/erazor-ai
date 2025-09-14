'use client';
import HeadingText from '@/components/ui/heading-text';
import { cn } from '@/lib/utils';
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2
} from '@tabler/icons-react';
import React from 'react';
const WhyWe: React.FC = () => {
  return (
    <div className='bg-background relative w-full overflow-hidden py-20'>
      {/* Gradient Background Enhancement */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]' />

      <HeadingText
        heading='Why '
        focusText=' Erazor?'
        headingStyles='font-manrope'
        paragraph='The most powerful AI background removal tool designed for professionals, creators, and businesses who demand perfection.'
      />
      <FeaturesSection />
    </div>
  );
};

export default WhyWe;

function FeaturesSection() {
  const features = [
    {
      title: 'Lightning Fast Processing',
      description:
        'Remove backgrounds in under 3 seconds with our advanced AI technology.',
      icon: <IconTerminal2 />
    },
    {
      title: 'One-Click Simplicity',
      description:
        'Just upload, click, and download. No technical skills required.',
      icon: <IconEaseInOut />
    },
    {
      title: 'Transparent Pricing',
      description:
        'Pay per image or choose unlimited plans. No hidden fees, no surprises.',
      icon: <IconCurrencyDollar />
    },
    {
      title: '99.9% Uptime Guarantee',
      description:
        'Always available when you need it. Enterprise-grade reliability.',
      icon: <IconCloud />
    },
    {
      title: 'Batch Processing',
      description:
        'Process hundreds of images at once. Perfect for large projects.',
      icon: <IconRouteAltLeft />
    },
    {
      title: '24/7 Expert Support',
      description:
        'Get help whenever you need it. Our team is always ready to assist.',
      icon: <IconHelp />
    },
    {
      title: 'Quality Guarantee',
      description:
        'Not satisfied? Get your money back. We stand behind our results.',
      icon: <IconAdjustmentsBolt />
    },
    {
      title: 'API & Integrations',
      description:
        'Seamlessly integrate with your existing workflow and tools.',
      icon: <IconHeart />
    }
  ];
  return (
    <div className='relative z-10 mx-auto grid max-w-7xl grid-cols-1 px-10 py-10 md:grid-cols-2 lg:grid-cols-4 lg:px-20'>
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-orange-50/50 via-purple-50/30 to-transparent opacity-0 transition duration-300 group-hover/feature:opacity-100 dark:from-orange-950/20 dark:via-purple-950/10' />
      )}
      {index >= 4 && (
        <div className='pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-orange-50/50 via-purple-50/30 to-transparent opacity-0 transition duration-300 group-hover/feature:opacity-100 dark:from-orange-950/20 dark:via-purple-950/10' />
      )}
      <div className='relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400'>
        {icon}
      </div>
      <div className='relative z-10 mb-2 px-10 text-lg font-bold'>
        <div className='absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-300 group-hover/feature:h-8 group-hover/feature:bg-gradient-to-b group-hover/feature:from-orange-500 group-hover/feature:to-purple-600 dark:bg-neutral-700' />
        <span className='inline-block text-neutral-800 transition duration-300 group-hover/feature:translate-x-2 group-hover/feature:bg-gradient-to-r group-hover/feature:from-orange-500 group-hover/feature:to-purple-600 group-hover/feature:bg-clip-text group-hover/feature:text-transparent dark:text-neutral-100'>
          {title}
        </span>
      </div>
      <p className='relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300'>
        {description}
      </p>
    </div>
  );
};
