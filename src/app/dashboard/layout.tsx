import ClientKBar from '@/components/kbar/client-wrapper';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard | Erazor AI - AI Background Remover',
    template: '%s | Erazor AI Dashboard'
  },
  description: 'Access your Erazor AI dashboard to remove backgrounds, edit images, view processing history, and manage your AI-powered photo editing tools.',
  keywords: [
    'dashboard',
    'AI background remover',
    'image editor',
    'photo editing tools',
    'background removal dashboard',
    'image processing history',
    'Erazor AI dashboard'
  ],
  openGraph: {
    title: 'Dashboard | Erazor AI - AI Background Remover',
    description: 'Access your Erazor AI dashboard to remove backgrounds, edit images, view processing history, and manage your AI-powered photo editing tools.',
    type: 'website'
  },
  twitter: {
    title: 'Dashboard | Erazor AI - AI Background Remover',
    description: 'Access your Erazor AI dashboard to remove backgrounds, edit images, view processing history, and manage your AI-powered photo editing tools.'
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <ClientKBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </ClientKBar>
  );
}
