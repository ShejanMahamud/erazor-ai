'use client';

import { useEffect } from 'react';

export default function BillingPage() {
    useEffect(() => {
        const fetchPortal = async () => {
            const res = await fetch('/api/portal');
            const { url } = await res.json();
            window.location.href = url;
        };
        fetchPortal();
    }, []);

    return <p className='w-full min-h-screen h-screen flex items-center justify-center dark:text-white text-black font-medium text-xl'>Redirecting to billing portal...</p>;
}
