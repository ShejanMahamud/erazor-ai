import { cn } from '@/lib/utils';
import { Github, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import { NavbarLogo } from './ui/resizable-navbar';

export const Footer = () => {
  return (
    <footer className='bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] bg-background relative py-16 '>
      {/* Main Footer Container */}
      <div className='container mx-auto px-6'>
        {/* Main Footer Content */}
        <div className='mb-12 flex items-center justify-center'>
          {/* Company Info */}
          <div className='space-y-4 text-center'>
            <div className='flex justify-center'>
              <NavbarLogo />
            </div>

            <p className='text-foreground/60 text-sm leading-relaxed max-w-md'>
              AI-powered background remover that delivers professional results in seconds. Remove backgrounds from any image with precision and ease.
            </p>
            <div className='flex gap-3 justify-center'>
              <SocialButton href='https://twitter.com/erazor_ai' icon={Twitter} />
              <SocialButton href='https://github.com/erazor-ai' icon={Github} />
              <SocialButton href='mailto:support@erazor.app' icon={Mail} />
            </div>
            <div className='flex justify-center'>
              <a href="https://www.producthunt.com/products/erazor?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-erazor" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1024324&theme=dark&t=1759928055664" alt="Erazor - Erase&#0032;backgrounds&#0044;&#0032;edit&#0032;instantly&#0032;—&#0032;all&#0032;in&#0032;one&#0032;free&#0032;tool&#0046; | Product Hunt" style={{ width: 200, height: 50 }} width="250" height="54" /></a>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div
          className={cn(
            'relative flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 md:flex-row',
            'bg-background/50 backdrop-blur-sm'
          )}
        >
          <PopularBackground />
          <div className='text-foreground/60 relative z-10 text-sm'>
            © 2025 Erazor AI. All rights reserved.
          </div>
          <div className='relative z-10 flex items-center gap-4 text-sm'>
            <Link
              href='/contact'
              className='text-foreground/60 hover:text-foreground transition-colors'
            >
              Contact
            </Link>
            <Link
              href='/privacy'
              className='text-foreground/60 hover:text-foreground transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='/terms'
              className='text-foreground/60 hover:text-foreground transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/cookie-policy'
              className='text-foreground/60 hover:text-foreground transition-colors'
            >
              Cookies
            </Link>
            <Link
              href='https://monitor.erazor.app/status/heartbeat'
              target='_blank'
              rel='noopener noreferrer'
              className='text-foreground/60 hover:text-foreground transition-colors'
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Button Component
const SocialButton = ({
  href,
  icon: Icon
}: {
  href: string;
  icon: React.ComponentType<any>;
}) => (
  <Link
    href={href}
    className={cn(
      'bg-background/10 h-10 w-10 rounded-lg border backdrop-blur-sm',
      'text-foreground/60 flex items-center justify-center',
      'hover:text-foreground hover:bg-background/20 transition-all duration-200',
      'hover:scale-105'
    )}
  >
    <Icon size={18} />
  </Link>
);


const PopularBackground = () => (
  <div className='absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]' />
);
