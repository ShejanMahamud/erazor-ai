import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    return redirect('/auth/sign-in');
  } else {
    redirect('/dashboard/background-remover');
  }
}
