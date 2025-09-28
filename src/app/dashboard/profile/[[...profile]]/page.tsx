import ProfileViewPage from '@/features/profile/components/profile-view-page';

export const metadata = {
  title: 'Profile',
  description: 'Manage your Erazor AI account profile, preferences, and personal information. Update your settings and view account details.',
  keywords: [
    'profile',
    'account settings',
    'user profile',
    'account management',
    'personal information',
    'profile settings'
  ],
  openGraph: {
    title: 'Profile | Erazor AI Dashboard',
    description: 'Manage your Erazor AI account profile, preferences, and personal information.',
    type: 'website'
  },
  twitter: {
    title: 'Profile | Erazor AI Dashboard',
    description: 'Manage your Erazor AI account profile, preferences, and personal information.'
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function Page() {
  return <ProfileViewPage />;
}
