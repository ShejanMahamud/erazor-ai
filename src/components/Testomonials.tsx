import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import HeadingText from './ui/heading-text';
import { Marquee } from './ui/marquee';
const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Chen',
      username: '@sarahdesigns',
      body: 'Game changer for my e-commerce store! Background removal that used to take me hours now takes seconds. The quality is incredible.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iI2Y0NzA2NiIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Marcus Rodriguez',
      username: '@marcusphoto',
      body: "As a photographer, I'm blown away by the precision. It handles complex hair and edges better than expensive desktop software.",
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzNiODJmNiIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TTwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Emily Watson',
      username: '@emilycreates',
      body: 'Perfect for social media content creation. The AI is so smart - it even preserves fine details like jewelry and accessories.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzEwYjk4MSIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RTwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'David Park',
      username: '@davidstudio',
      body: 'I run a small design agency and this tool has 10x our productivity. Clients love the quick turnaround times.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iI2Y1OWU0YiIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RDwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Lisa Thompson',
      username: '@lisashop',
      body: 'Switched from expensive alternatives and never looked back. The batch processing feature saves me so much time for product photos.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iI2VmNDQ0NCIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TDwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Alex Kumar',
      username: '@alexmarketing',
      body: 'The API integration was seamless. We process thousands of images daily and the consistency is remarkable. Highly recommend!',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzg4NTVmNiIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QTwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Rachel Green',
      username: '@rachelcontent',
      body: 'Finally, a background removal tool that actually works on mobile! Perfect for creating content on the go.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzA2YjZkNCIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UjwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Tom Wilson',
      username: '@tomdigital',
      body: "The before/after quality blew my mind. It's like having a professional photo editor in your pocket. Worth every penny.",
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzY0NzQ4YiIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+VDwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Priya Patel',
      username: '@priyatech',
      body: 'Integrated this into our workflow and cut editing time by 80%. The AI handles complex backgrounds flawlessly.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iI2ZiN2M4NSIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UDwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Jake Morrison',
      username: '@jakecreative',
      body: 'Best investment for my freelance business. Clients are impressed with the lightning-fast delivery and professional results.',
      img: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzIyZDNlZSIvPjx0ZXh0IHg9IjE2IiB5PSIyMSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SjwvdGV4dD48L3N2Zz4='
    }
  ];
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
