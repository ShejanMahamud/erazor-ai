'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Avatar {
  imageUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls
}: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
      {avatarUrls.map((url, index) => (
        <Image
          key={index}
          priority={false}
          loading='lazy'
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyMCIgZmlsbD0iI2Y5ZmFmYiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMTYiIHI9IjYiIGZpbGw9IiNkMWQ1ZGIiLz48cGF0aCBkPSJNMzAgMzBjMC01LjUyMy00LjQ3Ny0xMC0xMC0xMHMtMTAgNC40NzctMTAgMTB2MmgyMHYtMnoiIGZpbGw9IiNkMWQ1ZGIiLz48L3N2Zz4='
          sizes='40px'
          width={40}
          height={40}
          alt={`User avatar ${index + 1}`}
          src={url.imageUrl}
          className='h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-800'
        />
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black'
          href=''
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
