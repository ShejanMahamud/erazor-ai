import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Dashboard overview with analytics, statistics, and insights about your AI image processing activities on Erazor AI.',
  keywords: [
    'dashboard overview',
    'analytics',
    'statistics',
    'usage insights',
    'performance metrics',
    'image processing stats'
  ],
  openGraph: {
    title: 'Overview | Erazor AI Dashboard',
    description: 'Dashboard overview with analytics, statistics, and insights about your AI image processing activities.',
    type: 'website'
  },
  twitter: {
    title: 'Overview | Erazor AI Dashboard',
    description: 'Dashboard overview with analytics, statistics, and insights about your AI image processing activities.'
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}