import { serverBaseUrl } from '@/config';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
export async function GET(
) {
  const { getToken, userId } = await auth();
  const token = await getToken();
  const subscription = await fetch(
    `${serverBaseUrl}/billing/subscription/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-api-key': process.env.API_KEY!
      }
    }
  ).then((res) => res.json());
  return NextResponse.json(subscription);
}
