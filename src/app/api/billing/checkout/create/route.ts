import { serverBaseUrl } from '@/config';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { getToken } = await auth();
    const token = await getToken();
    const body = await request.json();
    const { productId, clerkId } = body;

    // Validate required fields
    if (!productId || !clerkId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: productId and clerkId are required'
        },
        { status: 400 }
      );
    }

    // Make request to your backend
    const response = await fetch(`${serverBaseUrl}/billing/checkout/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if needed
        Authorization: `Bearer ${token}`,
        'x-api-key': process.env.API_KEY!
      },
      body: JSON.stringify({
        productId,
        clerkId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || 'Failed to create checkout session'
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
