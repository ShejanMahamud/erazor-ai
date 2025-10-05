import { serverBaseUrl } from '@/config';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const res = await fetch(`${serverBaseUrl}/images/${id}`);

    if (!res.ok) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const data = await res.json();

    return NextResponse.json(data);
}
