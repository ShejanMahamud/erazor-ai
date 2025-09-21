'use client';
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody
} from '@/components/ui/resizable-navbar';
import { UserButton, useUser } from '@clerk/nextjs';
import { IconHome } from '@tabler/icons-react';
import { useState } from 'react';

export function MainNavbar() {
  const navItems = [
    {
      name: 'How to use',
      link: '/how-to-use'
    },
    {
      name: 'Tools & API',
      link: '/tools-api'
    },
    {
      name: 'Pricing',
      link: '/pricing'
    },
    {
      name: 'Contact',
      link: '/contact'
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoaded } = useUser();

  return (
    <div className='absolute z-50 w-full'>
      <Navbar className='my-4'>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          {/* <NavItems items={navItems} /> */}
          <div className='flex items-center gap-4'>
            {!isLoaded ? (
              // Show loading state or nothing while auth is loading
              <div className='h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
            ) : user ? (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label='Dashboard'
                    labelIcon={<IconHome stroke={2} size={16} />}
                    href='/dashboard/overview'
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <div className='flex items-center gap-4'>
                <NavbarButton variant='secondary' href='/auth/sign-in'>
                  Log In
                </NavbarButton>
                <NavbarButton variant='primary' href='/auth/sign-up'>
                  Sign Up
                </NavbarButton>
              </div>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className='relative text-neutral-600 dark:text-neutral-300'
              >
                <span className='block'>{item.name}</span>
              </a>
            ))}
            <div className='flex w-full flex-col gap-4'>
              {!isLoaded ? (
                // Show loading state while auth is loading
                <div className='h-10 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700'></div>
              ) : user ? (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label='Dashboard'
                      labelIcon={<IconHome stroke={2} size={16} />}
                      href='/dashboard/overview'
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant='secondary'
                    className='w-full'
                    href='/auth/sign-in'
                  >
                    Log In
                  </NavbarButton>
                  <NavbarButton
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant='primary'
                    className='w-full'
                    href='/auth/sign-up'
                  >
                    Sign Up
                  </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
