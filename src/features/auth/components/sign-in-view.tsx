import FallingText from '@/components/FallingText';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInViewPage() {
  return (
    <div className='relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:40px_40px]',
            '[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]'
          )}
        />
        {/* Radial gradient overlay */}
        <div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <Link
          href='/'
          className='relative z-20 mb-40 flex items-center text-lg font-medium'
        >
          <Image
            src='/assets/logo.png'
            alt='Logo'
            priority={false}
            loading='lazy'
            placeholder='blur'
            blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyI+PHN0b3Agc3RvcC1jb2xvcj0iIzMzMzMzMyIgc3RvcC1vcGFjaXR5PSIwLjAzIiBvZmZzZXQ9IjIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM2NjY2NjYiIHN0b3Atb3BhY2l0eT0iMC4wNSIgb2Zmc2V0PSI1MCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMzMzMzMzIiBzdG9wLW9wYWNpdHk9IjAuMDMiIG9mZnNldD0iNzAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg=='
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            width={40}
            height={40}
          />
          <span className='ml-2'>Erazor AI</span>
        </Link>
        <FallingText
          text={`Erazor AI is an AI-powered background removal tool that simplifies image editing and enhances productivity.`}
          highlightWords={[
            'Erazor AI',
            'AI',
            'background',
            'removal',
            'tool',
            'image',
            'editing',
            'enhances',
            'productivity'
          ]}
          trigger='hover'
          backgroundColor='transparent'
          wireframes={false}
          gravity={0.56}
          fontSize='2rem'
          mouseConstraintStiffness={0.9}
        />
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;This AI-powered background removal tool has revolutionized
              my workflow and helped me deliver stunning images to my clients
              faster than ever before.&rdquo;
            </p>
            <footer className='text-sm'>Sofia Davis</footer>
          </blockquote>
        </div>
      </div>

      <div className='flex min-h-screen w-full items-center justify-center px-10 py-10 lg:min-h-0'>
        <ClerkSignInForm fallbackRedirectUrl={'/dashboard'} />
      </div>
    </div>
  );
}
