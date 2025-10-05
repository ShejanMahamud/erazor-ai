import { reviews } from '@/constants/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import HeadingText from './ui/heading-text';
import { Marquee } from './ui/marquee';
const Testimonials: React.FC = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <div id='testimonials' className='bg-background w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] px-10 py-20 lg:px-20'>
      <HeadingText
        heading='What our users '
        focusText=' say'
        paragraph='Our users love us! Here are some of their testimonials.'
      />
      <div className='relative mt-10 flex w-full flex-col items-center justify-center overflow-hidden'>
        <Marquee pauseOnHover className='[--duration:20s]'>
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className='[--duration:20s]'>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className='from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r'></div>
        <div className='from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l'></div>
      </div>
    </div>
  );
};

export default Testimonials;

const ReviewCard = ({
  img,
  name,
  username,
  body
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        'relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className='flex flex-row items-center gap-2'>
        <Image
          className='rounded-full'
          width={32}
          height={32}
          alt={`${name} avatar`}
          src={img}
        />
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium dark:text-white'>
            {name}
          </figcaption>
          <p className='text-xs font-medium dark:text-white/40'>{username}</p>
        </div>
      </div>
      <blockquote className='mt-2 text-sm'>{body}</blockquote>
    </figure>
  );
};
