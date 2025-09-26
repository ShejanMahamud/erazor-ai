// app/api/images/history/route.ts
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

    console.log('API Route - userId:', userId);
    console.log('API Route - filters:', filters);
    console.log('API Route - serverBaseUrl:', serverBaseUrl);

    if (!serverBaseUrl) {
        console.error('serverBaseUrl is not configured');
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
    }

    try {
        const token = await getToken();

        const apiUrl = `${serverBaseUrl}/images/${userId}?${filters}`;
        console.log('API Route - Making request to:', apiUrl);

        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('External API Error:', {
                status: res.status,
                statusText: res.statusText,
                body: errorText
            });
            return NextResponse.json(
                { error: 'Failed to fetch images' },
                { status: res.status }
            );
        }

        const data = await res.json();
        console.log('API Route - Received data:', {
            success: data.success,
            dataLength: data.data?.length || 0,
            meta: data.meta
        });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json(
            { error: 'Server error while fetching images' },
            { status: 500 }
        );
    }
}
