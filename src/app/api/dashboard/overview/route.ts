import { serverBaseUrl } from '@/config';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export async function GET() {
    const { userId, getToken } = await auth()
    const token = await getToken();

    try {
        const res = await fetch(`${serverBaseUrl}/users/dashboard-stats/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            return NextResponse.json('Failed to fetch data', { status: 500 });
        }

        const data = await res.json();
        console.log(data)

        return NextResponse.json(data, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json('Failed to fetch data', { status: 500 });
    }

}