import { auth } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { getToken } = await auth()
        const token = await getToken();
        const cookieStore = await cookies()

        // Get the request body as form data or JSON
        const contentType = req.headers.get('content-type') || '';
        let body;
        let headers: HeadersInit = {}

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            headers['Anonymous-User'] = cookieStore.get('anon_id')?.value!;
        }

        if (contentType.includes('multipart/form-data')) {
            // For file uploads, forward the form data
            const formData = await req.formData();
            body = formData;
        } else if (contentType.includes('application/json')) {
            // For JSON requests
            const jsonData = await req.json();
            body = JSON.stringify(jsonData);
            headers['Content-Type'] = 'application/json';
        } else {
            // For other content types, use the raw body
            body = await req.text();
            if (contentType) {
                headers['Content-Type'] = contentType;
            }
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/process`, {
            method: 'POST',
            body: body,
            credentials: 'include',
            // @ts-ignore - duplex is required for streaming requests
            duplex: 'half',
            headers: headers
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json(
                { error: 'Failed to process image', details: errorText },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}