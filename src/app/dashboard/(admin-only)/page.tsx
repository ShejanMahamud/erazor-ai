import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Erazor',
  description: 'Administrative dashboard for managing Erazor application.'
};

export default function AdminOnlyPage() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      <p className='text-muted-foreground'>
        This page is for admin users only.
      </p>
    </div>
  );
}
