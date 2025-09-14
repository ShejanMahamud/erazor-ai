import SignUpViewPage from '@/features/auth/components/sign-up-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Erazor | Sign Up',
  description: 'Sign Up page for Erazor.'
};

export default async function Page() {
  return <SignUpViewPage />;
}
