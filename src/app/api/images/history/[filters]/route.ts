// app/api/images/history/[filters]/route.ts
import { serverBaseUrl } from '@/config';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { getToken, userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract filters from query params in the request URL
    const { searchParams } = new URL(req.url);
    const filters = searchParams.toString(); // e.g. limit=10&cursor=123&status=done

    try {
        const token = await getToken();

        const res = await fetch(`${serverBaseUrl}/images/${userId}?${filters}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch images' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json(
            { error: 'Server error while fetching images' },
            { status: 500 }
        );
    }
}
