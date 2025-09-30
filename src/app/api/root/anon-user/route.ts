import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';


export async function GET() {
    const cookieStore = await cookies();
    const existingAnonId = cookieStore.get('anon_id')?.value;
    if (existingAnonId) {
        return NextResponse.json({ anon_id: existingAnonId });
    }
    const anonUserId = `anon-${uuidv4()}`;
    const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
    //set in cookies for 365 days
    cookieStore.set('anon_id', anonUserId, { maxAge: ONE_YEAR_IN_SECONDS, sameSite: 'lax', secure: true, httpOnly: false, });
    return NextResponse.json({ anon_id: anonUserId });
}