import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export async function GET() {
    const anonUserId = `anon-${uuidv4()}`;
    //set in cookies for 365 days
    const cookieStore = await cookies()
    cookieStore.set('anon_id', anonUserId, { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', secure: true, httpOnly: false, });

    return NextResponse.json({ anon_id: anonUserId });
}