import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { getToken } = await auth()
    const token = await getToken();

    if (!token) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }
    // Fetch background remover settings from the backend

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/process`, {
        method: 'POST',
        body: req.body,
        credentials: 'include',
        // @ts-ignore - duplex is required for streaming requests
        duplex: 'half',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        return NextResponse.json('Failed to fetch background remover settings', { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}