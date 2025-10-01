import { auth } from '@clerk/nextjs/server';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Access your Erazor AI dashboard to remove backgrounds, edit images, and manage your AI-powered photo editing tools.',
  keywords: [
    'dashboard',
    'AI background remover',
    'image editor',
    'photo editing tools',
    'background removal'
  ],
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
    redirect('/dashboard/overview');
  }
}
