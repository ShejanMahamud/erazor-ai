import { serverBaseUrl } from '@/config';
import { BillingPlansResponse } from '@/types/billing';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const response = await fetch(`${serverBaseUrl}/billing/plans`, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.API_KEY!
      },
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: 'Failed to fetch billing plans',
        data: [],
      });
    }

    const data: BillingPlansResponse = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching billing plans',
      data: [],
    });
  }
}
