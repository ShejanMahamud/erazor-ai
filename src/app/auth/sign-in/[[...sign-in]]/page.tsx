import SignInViewPage from '@/features/auth/components/sign-in-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Erazor | Sign In',
  description: 'Sign In page for Erazor.'
};

export default async function Page() {
  return <SignInViewPage />;
}
