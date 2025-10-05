// app/api/images/history/route.ts
import { serverBaseUrl } from '@/config';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { getToken, userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filters = searchParams.toString();

    if (!serverBaseUrl) {
        return NextResponse.json(
            { error: 'Server configuration error' },
            { status: 500 }
        );
    }

    try {
        const token = await getToken();

        const apiUrl = `${serverBaseUrl}/images/user/${userId}?${filters}`;
        const res = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-api-key': process.env.API_KEY!
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: errorText || `Failed to fetch images` },
                { status: res.status }
            );
        }

        const data = await res.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Server error while fetching images' },
            { status: 500 }
        );
    }
}