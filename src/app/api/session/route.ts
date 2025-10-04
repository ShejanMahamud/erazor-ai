import { auth, clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const cookieStore = await cookies();
    const { userId, sessionId } = await auth();

    if (userId && sessionId) {
        const client = await clerkClient();
        const session = await client.sessions.getSession(sessionId);

        if (session?.expireAt) {
            const expireDate = new Date(session.expireAt).getTime();
            const now = Date.now();
            const maxAge = Math.max(0, Math.floor((expireDate - now) / 1000));

            cookieStore.set('user_id', userId, {
                maxAge,
                sameSite: 'lax',
                secure: true,
                httpOnly: false,
            });

            return NextResponse.json({
                user_id: userId,
                cookie_expires_in: maxAge,
            });
        } else {
            // session invalid → clear user_id before anonymous handling
            cookieStore.delete('user_id');
        }
    } else {
        // not logged in → clear user_id if it exists
        cookieStore.delete('user_id');
    }

    // handle anonymous users
    const existingAnonId = cookieStore.get('anon_id')?.value;
    if (existingAnonId) {
        return NextResponse.json({ anon_id: existingAnonId });
    }

    const anonUserId = `anon-${uuidv4()}`;
    cookieStore.set('anon_id', anonUserId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    });

    return NextResponse.json({ anon_id: anonUserId });

}
