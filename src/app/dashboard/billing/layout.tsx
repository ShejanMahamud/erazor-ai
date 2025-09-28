import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Billing',
    description: 'Manage your Erazor AI subscription and billing information. View your usage, upgrade plans, and access billing portal.',
    keywords: [
        'billing',
        'subscription',
        'payment',
        'pricing plans',
        'account management',
        'billing portal',
        'subscription management'
    ],
    openGraph: {
        title: 'Billing | Erazor AI Dashboard',
        description: 'Manage your Erazor AI subscription and billing information. View your usage, upgrade plans, and access billing portal.',
        type: 'website'
    },
    twitter: {
        title: 'Billing | Erazor AI Dashboard',
        description: 'Manage your Erazor AI subscription and billing information. View your usage, upgrade plans, and access billing portal.'
    },
    robots: {
        index: false,
        follow: false
    }
};

export default function BillingLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
